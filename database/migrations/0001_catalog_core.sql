BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS catalog;

CREATE TYPE catalog.lifecycle_status AS ENUM ('draft', 'current', 'legacy', 'discontinued', 'archived');
CREATE TYPE catalog.verification_status AS ENUM ('pending', 'verified', 'disputed', 'rejected');
CREATE TYPE catalog.null_semantics AS ENUM ('known', 'unknown', 'not_applicable', 'not_published');
CREATE TYPE catalog.value_kind AS ENUM ('text', 'number', 'boolean', 'enum', 'quantity', 'range', 'json');
CREATE TYPE catalog.media_role AS ENUM ('primary', 'hover', 'front', 'rear', 'side', 'perspective', 'array', 'detail', 'document');
CREATE TYPE catalog.change_status AS ENUM ('draft', 'submitted', 'approved', 'rejected', 'applied', 'cancelled');
CREATE TYPE catalog.app_role AS ENUM ('owner', 'maintainer', 'editor', 'reviewer');

CREATE TABLE catalog.manufacturer (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE CHECK (stable_key ~ '^[a-z0-9][a-z0-9-]*$'),
  display_name text NOT NULL,
  legal_name text,
  website_url text,
  lifecycle catalog.lifecycle_status NOT NULL DEFAULT 'current',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.product_family (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  manufacturer_id uuid REFERENCES catalog.manufacturer(id),
  domain text NOT NULL CHECK (domain IN ('speaker', 'amplifier', 'dsp', 'software', 'accessory', 'brand')),
  display_name text NOT NULL,
  schema_version integer NOT NULL DEFAULT 1 CHECK (schema_version > 0),
  attribute_template jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.product_group (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  manufacturer_id uuid NOT NULL REFERENCES catalog.manufacturer(id),
  family_id uuid NOT NULL REFERENCES catalog.product_family(id),
  display_name text NOT NULL,
  official_series_name text,
  display_order integer,
  varies_by text[] NOT NULL DEFAULT '{}',
  lifecycle catalog.lifecycle_status NOT NULL DEFAULT 'current',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.product (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE CHECK (stable_key ~ '^[a-z0-9][a-z0-9-]*$'),
  manufacturer_id uuid NOT NULL REFERENCES catalog.manufacturer(id),
  family_id uuid NOT NULL REFERENCES catalog.product_family(id),
  group_id uuid REFERENCES catalog.product_group(id),
  parent_id uuid REFERENCES catalog.product(id),
  display_name text NOT NULL,
  model_code text,
  slug text NOT NULL,
  variant_axes jsonb NOT NULL DEFAULT '{}'::jsonb,
  lifecycle catalog.lifecycle_status NOT NULL DEFAULT 'current',
  verification catalog.verification_status NOT NULL DEFAULT 'pending',
  first_published_on date,
  discontinued_on date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (manufacturer_id, slug),
  CHECK (parent_id IS NULL OR parent_id <> id),
  CHECK (discontinued_on IS NULL OR first_published_on IS NULL OR discontinued_on >= first_published_on)
);

CREATE UNIQUE INDEX product_variant_axes_unique
  ON catalog.product (group_id, variant_axes)
  WHERE group_id IS NOT NULL AND variant_axes <> '{}'::jsonb;

CREATE TABLE catalog.unit (
  code text PRIMARY KEY,
  symbol text NOT NULL,
  dimension text NOT NULL,
  factor_to_base numeric NOT NULL CHECK (factor_to_base > 0)
);

CREATE TABLE catalog.attribute_definition (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE CHECK (code ~ '^[a-z][a-z0-9_.-]*$'),
  label text NOT NULL,
  value_kind catalog.value_kind NOT NULL,
  canonical_unit_code text REFERENCES catalog.unit(code),
  cardinality text NOT NULL DEFAULT 'one' CHECK (cardinality IN ('one', 'many')),
  enum_values jsonb,
  constraints_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  searchable boolean NOT NULL DEFAULT false,
  facetable boolean NOT NULL DEFAULT false,
  sortable boolean NOT NULL DEFAULT false,
  comparable boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.product_attribute (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  definition_id uuid NOT NULL REFERENCES catalog.attribute_definition(id),
  ordinal integer NOT NULL DEFAULT 0 CHECK (ordinal >= 0),
  semantics catalog.null_semantics NOT NULL DEFAULT 'known',
  text_value text,
  number_value numeric,
  boolean_value boolean,
  json_value jsonb,
  unit_code text REFERENCES catalog.unit(code),
  original_text text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, definition_id, ordinal),
  CHECK (
    (semantics <> 'known' AND text_value IS NULL AND number_value IS NULL AND boolean_value IS NULL AND json_value IS NULL)
    OR
    (semantics = 'known' AND num_nonnulls(text_value, number_value, boolean_value, json_value) = 1)
  )
);

CREATE TABLE catalog.source_document (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  title text NOT NULL,
  source_url text,
  object_key text,
  sha256 text CHECK (sha256 IS NULL OR sha256 ~ '^[0-9a-f]{64}$'),
  byte_size bigint CHECK (byte_size IS NULL OR byte_size >= 0),
  mime_type text,
  published_on date,
  retrieved_at timestamptz,
  verification catalog.verification_status NOT NULL DEFAULT 'pending',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (source_url IS NOT NULL OR object_key IS NOT NULL)
);

CREATE TABLE catalog.source_locator (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES catalog.source_document(id) ON DELETE CASCADE,
  page_from integer CHECK (page_from IS NULL OR page_from > 0),
  page_to integer CHECK (page_to IS NULL OR page_to >= page_from),
  section text,
  table_label text,
  quote_excerpt text,
  selector text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.assertion (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_kind text NOT NULL,
  entity_id uuid NOT NULL,
  field_path text NOT NULL,
  asserted_value jsonb NOT NULL,
  status catalog.verification_status NOT NULL DEFAULT 'pending',
  valid_from date,
  valid_to date,
  reviewed_at timestamptz,
  reviewed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to >= valid_from)
);

CREATE TABLE catalog.assertion_evidence (
  assertion_id uuid NOT NULL REFERENCES catalog.assertion(id) ON DELETE CASCADE,
  locator_id uuid NOT NULL REFERENCES catalog.source_locator(id),
  evidence_order integer NOT NULL DEFAULT 0,
  PRIMARY KEY (assertion_id, locator_id)
);

CREATE TABLE catalog.relation_type (
  code text PRIMARY KEY,
  directed boolean NOT NULL DEFAULT true,
  inverse_code text REFERENCES catalog.relation_type(code),
  requires_evidence boolean NOT NULL DEFAULT true
);

CREATE TABLE catalog.product_relation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type_code text NOT NULL REFERENCES catalog.relation_type(code),
  from_product_id uuid NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  to_product_id uuid NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  status catalog.verification_status NOT NULL DEFAULT 'pending',
  valid_from date,
  valid_to date,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (type_code, from_product_id, to_product_id),
  CHECK (from_product_id <> to_product_id),
  CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to >= valid_from)
);

CREATE TABLE catalog.relation_evidence (
  relation_id uuid NOT NULL REFERENCES catalog.product_relation(id) ON DELETE CASCADE,
  locator_id uuid NOT NULL REFERENCES catalog.source_locator(id),
  PRIMARY KEY (relation_id, locator_id)
);

CREATE TABLE catalog.media_asset (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  object_key text NOT NULL UNIQUE,
  original_filename text NOT NULL,
  sha256 text NOT NULL CHECK (sha256 ~ '^[0-9a-f]{64}$'),
  byte_size bigint NOT NULL CHECK (byte_size > 0),
  mime_type text NOT NULL,
  width integer CHECK (width IS NULL OR width > 0),
  height integer CHECK (height IS NULL OR height > 0),
  has_alpha boolean,
  background_policy text,
  rights_status text NOT NULL DEFAULT 'unknown',
  source_id uuid REFERENCES catalog.source_document(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.media_placement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  media_id uuid NOT NULL REFERENCES catalog.media_asset(id),
  role catalog.media_role NOT NULL,
  ordinal integer NOT NULL DEFAULT 0 CHECK (ordinal >= 0),
  alt_text text NOT NULL,
  download_filename text NOT NULL,
  focal_point jsonb,
  is_downloadable boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, role, ordinal)
);

CREATE TABLE catalog.app_user (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_provider text NOT NULL DEFAULT 'supabase' CHECK (auth_provider = 'supabase'),
  auth_subject uuid NOT NULL UNIQUE,
  display_name text NOT NULL,
  email text,
  disabled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE catalog.assertion
  ADD CONSTRAINT assertion_reviewer_fk FOREIGN KEY (reviewed_by) REFERENCES catalog.app_user(id);

CREATE TABLE catalog.user_role (
  user_id uuid NOT NULL REFERENCES catalog.app_user(id) ON DELETE CASCADE,
  role catalog.app_role NOT NULL,
  granted_by uuid REFERENCES catalog.app_user(id),
  granted_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role)
);

CREATE TABLE catalog.change_request (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  status catalog.change_status NOT NULL DEFAULT 'draft',
  author_id uuid NOT NULL REFERENCES catalog.app_user(id),
  rationale text NOT NULL,
  idempotency_key text NOT NULL UNIQUE,
  submitted_at timestamptz,
  applied_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.change_operation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES catalog.change_request(id) ON DELETE CASCADE,
  ordinal integer NOT NULL CHECK (ordinal >= 0),
  entity_kind text NOT NULL,
  entity_id uuid,
  operation text NOT NULL CHECK (operation IN ('insert', 'update', 'retire', 'restore')),
  before_value jsonb,
  after_value jsonb,
  source_locator_ids uuid[] NOT NULL DEFAULT '{}',
  UNIQUE (request_id, ordinal)
);

CREATE TABLE catalog.approval (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES catalog.change_request(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES catalog.app_user(id),
  decision text NOT NULL CHECK (decision IN ('approved', 'rejected')),
  note text,
  decided_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (request_id, reviewer_id)
);

CREATE TABLE catalog.audit_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  actor_id uuid REFERENCES catalog.app_user(id),
  request_id uuid REFERENCES catalog.change_request(id),
  action text NOT NULL,
  entity_kind text NOT NULL,
  entity_id uuid,
  before_value jsonb,
  after_value jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  request_context jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE FUNCTION catalog.reject_audit_mutation() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'catalog.audit_log is append-only';
END;
$$;

CREATE TRIGGER audit_log_append_only
BEFORE UPDATE OR DELETE ON catalog.audit_log
FOR EACH ROW EXECUTE FUNCTION catalog.reject_audit_mutation();

CREATE INDEX product_manufacturer_family_idx ON catalog.product (manufacturer_id, family_id);
CREATE INDEX product_attribute_number_idx ON catalog.product_attribute (definition_id, number_value) WHERE number_value IS NOT NULL;
CREATE INDEX product_attribute_text_idx ON catalog.product_attribute (definition_id, text_value) WHERE text_value IS NOT NULL;
CREATE INDEX assertion_entity_idx ON catalog.assertion (entity_kind, entity_id, field_path);
CREATE INDEX relation_from_idx ON catalog.product_relation (from_product_id, type_code);
CREATE INDEX relation_to_idx ON catalog.product_relation (to_product_id, type_code);
CREATE INDEX media_placement_product_idx ON catalog.media_placement (product_id, ordinal);

COMMIT;
