BEGIN;

CREATE EXTENSION IF NOT EXISTS pgtap WITH SCHEMA extensions;
SELECT plan(20);

SELECT has_table('catalog', 'change_operation_source_locator', 'operation evidence uses a junction table');
SELECT hasnt_column('catalog', 'change_operation', 'source_locator_ids', 'UUID evidence arrays are removed');
SELECT hasnt_column('catalog', 'assertion', 'entity_id', 'canonical assertions do not use polymorphic UUIDs');
SELECT col_is_fk('catalog', 'assertion', 'product_id', 'product assertions use a real foreign key');
SELECT has_function('api', 'create_change_request', ARRAY['text', 'text', 'text'], 'idempotent create RPC exists');
SELECT has_function('api', 'submit_change_request', ARRAY['uuid'], 'submit RPC exists');
SELECT has_function('api', 'review_change_request', ARRAY['uuid', 'text', 'text'], 'review RPC exists');

SELECT ok(NOT has_schema_privilege('anon', 'catalog', 'USAGE'), 'anon cannot use canonical schema');
SELECT ok(NOT has_schema_privilege('authenticated', 'catalog', 'USAGE'), 'authenticated cannot use canonical schema');
SELECT ok(NOT has_schema_privilege('service_role', 'catalog', 'USAGE'), 'service_role cannot use canonical schema');
SELECT ok(NOT has_table_privilege('anon', 'catalog.product', 'INSERT'), 'anon cannot insert canonical products');
SELECT ok(NOT has_table_privilege('authenticated', 'catalog.product', 'UPDATE'), 'authenticated cannot update canonical products');
SELECT ok(NOT has_table_privilege('service_role', 'catalog.product', 'DELETE'), 'service_role cannot delete canonical products');

INSERT INTO auth.users (id, email)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'editor@example.test'),
  ('10000000-0000-0000-0000-000000000002', 'reviewer@example.test');

INSERT INTO catalog.app_user (id, auth_subject, display_name, email)
VALUES
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Editor', 'editor@example.test'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Reviewer', 'reviewer@example.test');

INSERT INTO catalog.user_role (user_id, role)
VALUES
  ('20000000-0000-0000-0000-000000000001', 'editor'),
  ('20000000-0000-0000-0000-000000000001', 'reviewer'),
  ('20000000-0000-0000-0000-000000000002', 'reviewer');

SELECT set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000001', true);
SET LOCAL ROLE authenticated;

SELECT is(
  api.create_change_request('Rename K1', 'Use the official model name', 'idem-k1-rename'),
  api.create_change_request('Rename K1', 'Use the official model name', 'idem-k1-rename'),
  'same idempotency key and payload return the same request'
);

SELECT throws_ok(
  $$SELECT api.create_change_request('Different title', 'Use the official model name', 'idem-k1-rename')$$,
  '23505',
  'idempotency key was reused with a different request',
  'same idempotency key rejects a different payload'
);

RESET ROLE;

SELECT throws_ok(
  $$UPDATE catalog.change_request SET status = 'applied' WHERE idempotency_key = 'idem-k1-rename'$$,
  '23514',
  'illegal change request transition: draft -> applied',
  'illegal state transition is rejected'
);

UPDATE catalog.change_request
   SET status = 'submitted'
 WHERE idempotency_key = 'idem-k1-rename';

SELECT throws_ok(
  $$INSERT INTO catalog.approval (request_id, reviewer_id, decision)
    SELECT id, author_id, 'approved' FROM catalog.change_request
     WHERE idempotency_key = 'idem-k1-rename'$$,
  '23514',
  'authors cannot review their own change requests',
  'author cannot approve their own request'
);

INSERT INTO catalog.audit_log (action, entity_kind)
VALUES ('test', 'test');

SELECT throws_ok(
  $$UPDATE catalog.audit_log SET action = 'changed'$$,
  'P0001',
  'catalog.audit_log is append-only',
  'audit update is rejected'
);

SELECT throws_ok(
  $$DELETE FROM catalog.audit_log$$,
  'P0001',
  'catalog.audit_log is append-only',
  'audit delete is rejected'
);

SELECT throws_ok(
  $$TRUNCATE catalog.audit_log$$,
  'P0001',
  'catalog.audit_log is append-only',
  'audit truncate is rejected'
);

SELECT * FROM finish();
ROLLBACK;
