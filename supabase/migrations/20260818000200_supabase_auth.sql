BEGIN;

-- Supabase-specific adapter. Core catalog tables stay in the private catalog schema;
-- this foreign key prevents an application user from pointing at a nonexistent identity.
ALTER TABLE catalog.app_user
  ADD CONSTRAINT app_user_supabase_identity_fk
  FOREIGN KEY (auth_subject) REFERENCES auth.users(id) ON DELETE RESTRICT;

-- PostgREST roles must not receive canonical table access accidentally. The Workers
-- runtime uses a separately provisioned least-privilege database login and approved
-- functions; its password is never stored in a migration.
REVOKE ALL ON SCHEMA catalog FROM PUBLIC, anon, authenticated;
REVOKE ALL ON ALL TABLES IN SCHEMA catalog FROM PUBLIC, anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA catalog FROM PUBLIC, anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA catalog FROM PUBLIC, anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA catalog
  REVOKE ALL ON TABLES FROM PUBLIC, anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA catalog
  REVOKE ALL ON SEQUENCES FROM PUBLIC, anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA catalog
  REVOKE ALL ON FUNCTIONS FROM PUBLIC, anon, authenticated;

COMMIT;
