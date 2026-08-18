BEGIN;

DROP INDEX catalog.assertion_entity_idx;

ALTER TABLE catalog.assertion
  DROP COLUMN entity_kind,
  DROP COLUMN entity_id,
  ADD COLUMN product_id uuid REFERENCES catalog.product(id) ON DELETE CASCADE,
  ADD COLUMN manufacturer_id uuid REFERENCES catalog.manufacturer(id) ON DELETE CASCADE,
  ADD COLUMN relation_id uuid REFERENCES catalog.product_relation(id) ON DELETE CASCADE,
  ADD COLUMN media_id uuid REFERENCES catalog.media_asset(id) ON DELETE CASCADE,
  ADD CONSTRAINT assertion_exactly_one_entity CHECK (
    num_nonnulls(product_id, manufacturer_id, relation_id, media_id) = 1
  );

CREATE INDEX assertion_product_idx ON catalog.assertion (product_id, field_path)
  WHERE product_id IS NOT NULL;
CREATE INDEX assertion_manufacturer_idx ON catalog.assertion (manufacturer_id, field_path)
  WHERE manufacturer_id IS NOT NULL;
CREATE INDEX assertion_relation_idx ON catalog.assertion (relation_id, field_path)
  WHERE relation_id IS NOT NULL;
CREATE INDEX assertion_media_idx ON catalog.assertion (media_id, field_path)
  WHERE media_id IS NOT NULL;

ALTER TABLE catalog.change_operation
  DROP COLUMN source_locator_ids;

CREATE TABLE catalog.change_operation_source_locator (
  operation_id uuid NOT NULL REFERENCES catalog.change_operation(id) ON DELETE CASCADE,
  locator_id uuid NOT NULL REFERENCES catalog.source_locator(id),
  evidence_order integer NOT NULL DEFAULT 0 CHECK (evidence_order >= 0),
  PRIMARY KEY (operation_id, locator_id)
);

CREATE FUNCTION catalog.enforce_change_request_transition() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status = OLD.status THEN
    RETURN NEW;
  END IF;

  IF NOT (
    (OLD.status = 'draft' AND NEW.status IN ('submitted', 'cancelled'))
    OR (OLD.status = 'submitted' AND NEW.status IN ('approved', 'rejected', 'cancelled'))
    OR (OLD.status = 'rejected' AND NEW.status = 'draft')
    OR (OLD.status = 'approved' AND NEW.status IN ('applied', 'cancelled'))
  ) THEN
    RAISE EXCEPTION 'illegal change request transition: % -> %', OLD.status, NEW.status
      USING ERRCODE = 'check_violation';
  END IF;

  IF NEW.status = 'submitted' AND NEW.submitted_at IS NULL THEN
    NEW.submitted_at := now();
  END IF;

  IF NEW.status = 'applied' THEN
    NEW.applied_at := COALESCE(NEW.applied_at, now());
  ELSIF NEW.applied_at IS NOT NULL THEN
    RAISE EXCEPTION 'applied_at is only valid for applied requests'
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER change_request_legal_transition
BEFORE UPDATE OF status, submitted_at, applied_at ON catalog.change_request
FOR EACH ROW EXECUTE FUNCTION catalog.enforce_change_request_transition();

CREATE FUNCTION catalog.enforce_approval_separation() RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE
  request_author uuid;
  request_status catalog.change_status;
BEGIN
  SELECT author_id, status
    INTO request_author, request_status
    FROM catalog.change_request
   WHERE id = NEW.request_id
   FOR UPDATE;

  IF request_author IS NULL THEN
    RAISE EXCEPTION 'change request does not exist'
      USING ERRCODE = 'foreign_key_violation';
  END IF;

  IF request_status <> 'submitted' THEN
    RAISE EXCEPTION 'only submitted requests can be reviewed'
      USING ERRCODE = 'check_violation';
  END IF;

  IF request_author = NEW.reviewer_id THEN
    RAISE EXCEPTION 'authors cannot review their own change requests'
      USING ERRCODE = 'check_violation';
  END IF;

  IF NOT EXISTS (
    SELECT 1
      FROM catalog.user_role
     WHERE user_id = NEW.reviewer_id
       AND role = 'reviewer'
  ) THEN
    RAISE EXCEPTION 'reviewer role required'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER approval_separation
BEFORE INSERT OR UPDATE ON catalog.approval
FOR EACH ROW EXECUTE FUNCTION catalog.enforce_approval_separation();

CREATE FUNCTION catalog.apply_approval_decision() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  UPDATE catalog.change_request
     SET status = CASE
       WHEN NEW.decision = 'approved' THEN 'approved'::catalog.change_status
       ELSE 'rejected'::catalog.change_status
     END,
         updated_at = now()
   WHERE id = NEW.request_id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER approval_updates_request
AFTER INSERT ON catalog.approval
FOR EACH ROW EXECUTE FUNCTION catalog.apply_approval_decision();

CREATE TRIGGER audit_log_no_truncate
BEFORE TRUNCATE ON catalog.audit_log
FOR EACH STATEMENT EXECUTE FUNCTION catalog.reject_audit_mutation();

CREATE SCHEMA api;

CREATE FUNCTION catalog.current_enabled_user(required_roles catalog.app_role[] DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, catalog
AS $$
DECLARE
  actor_id uuid;
BEGIN
  SELECT id
    INTO actor_id
    FROM catalog.app_user
   WHERE auth_subject = auth.uid()
     AND disabled_at IS NULL;

  IF actor_id IS NULL THEN
    RAISE EXCEPTION 'enabled application user required'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  IF required_roles IS NOT NULL AND NOT EXISTS (
    SELECT 1
      FROM catalog.user_role
     WHERE user_id = actor_id
       AND role = ANY(required_roles)
  ) THEN
    RAISE EXCEPTION 'required application role is missing'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  RETURN actor_id;
END;
$$;

CREATE FUNCTION api.create_change_request(
  request_title text,
  request_rationale text,
  request_idempotency_key text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, catalog
AS $$
DECLARE
  actor_id uuid;
  result_id uuid;
  existing_author uuid;
  existing_title text;
  existing_rationale text;
BEGIN
  actor_id := catalog.current_enabled_user(
    ARRAY['owner', 'maintainer', 'editor']::catalog.app_role[]
  );

  IF NULLIF(btrim(request_title), '') IS NULL
     OR NULLIF(btrim(request_rationale), '') IS NULL
     OR NULLIF(btrim(request_idempotency_key), '') IS NULL THEN
    RAISE EXCEPTION 'title, rationale, and idempotency key are required'
      USING ERRCODE = 'not_null_violation';
  END IF;

  INSERT INTO catalog.change_request (title, author_id, rationale, idempotency_key)
  VALUES (request_title, actor_id, request_rationale, request_idempotency_key)
  ON CONFLICT (idempotency_key) DO NOTHING
  RETURNING id INTO result_id;

  IF result_id IS NOT NULL THEN
    RETURN result_id;
  END IF;

  SELECT id, author_id, title, rationale
    INTO result_id, existing_author, existing_title, existing_rationale
    FROM catalog.change_request
   WHERE idempotency_key = request_idempotency_key;

  IF existing_author <> actor_id
     OR existing_title <> request_title
     OR existing_rationale <> request_rationale THEN
    RAISE EXCEPTION 'idempotency key was reused with a different request'
      USING ERRCODE = 'unique_violation';
  END IF;

  RETURN result_id;
END;
$$;

CREATE FUNCTION api.submit_change_request(request_id uuid) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, catalog
AS $$
DECLARE
  actor_id uuid;
BEGIN
  actor_id := catalog.current_enabled_user(
    ARRAY['owner', 'maintainer', 'editor']::catalog.app_role[]
  );

  UPDATE catalog.change_request
     SET status = 'submitted', updated_at = now()
   WHERE id = request_id
     AND author_id = actor_id
     AND status = 'draft';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'draft request owned by the current user was not found'
      USING ERRCODE = 'insufficient_privilege';
  END IF;
END;
$$;

CREATE FUNCTION api.review_change_request(
  request_id uuid,
  review_decision text,
  review_note text DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, catalog
AS $$
DECLARE
  actor_id uuid;
BEGIN
  actor_id := catalog.current_enabled_user(ARRAY['reviewer']::catalog.app_role[]);

  IF review_decision NOT IN ('approved', 'rejected') THEN
    RAISE EXCEPTION 'review decision must be approved or rejected'
      USING ERRCODE = 'check_violation';
  END IF;

  INSERT INTO catalog.approval (request_id, reviewer_id, decision, note)
  VALUES (request_id, actor_id, review_decision, review_note);
END;
$$;

REVOKE ALL ON SCHEMA api FROM PUBLIC;
GRANT USAGE ON SCHEMA api TO authenticated;
GRANT EXECUTE ON FUNCTION api.create_change_request(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION api.submit_change_request(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION api.review_change_request(uuid, text, text) TO authenticated;

REVOKE ALL ON FUNCTION catalog.current_enabled_user(catalog.app_role[]) FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA catalog FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA catalog FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA catalog FROM PUBLIC, anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA catalog
  REVOKE ALL ON TABLES FROM PUBLIC, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA catalog
  REVOKE ALL ON SEQUENCES FROM PUBLIC, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA catalog
  REVOKE ALL ON FUNCTIONS FROM PUBLIC, anon, authenticated, service_role;

COMMIT;
