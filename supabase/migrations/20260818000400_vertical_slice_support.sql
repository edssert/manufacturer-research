BEGIN;

ALTER TABLE catalog.product
  ADD COLUMN display_order integer CHECK (display_order IS NULL OR display_order >= 0);

ALTER TABLE catalog.media_placement
  ADD COLUMN delivery_path text NOT NULL,
  ADD CONSTRAINT media_placement_delivery_path_relative CHECK (
    delivery_path ~ '^public/assets/img/'
    AND delivery_path !~ '(^|/)\.\.(/|$)'
  );

CREATE UNIQUE INDEX media_placement_delivery_path_product_unique
  ON catalog.media_placement (product_id, delivery_path);

CREATE TABLE catalog.import_run (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  importer_version integer NOT NULL CHECK (importer_version > 0),
  source_sha256 text NOT NULL CHECK (source_sha256 ~ '^[0-9a-f]{64}$'),
  evidence_sha256 text NOT NULL CHECK (evidence_sha256 ~ '^[0-9a-f]{64}$'),
  status text NOT NULL CHECK (status IN ('started', 'completed', 'failed')),
  result_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  CHECK (
    (status = 'completed' AND completed_at IS NOT NULL)
    OR (status <> 'completed' AND completed_at IS NULL)
  )
);

REVOKE ALL ON TABLE catalog.import_run FROM PUBLIC, anon, authenticated, service_role;

COMMIT;
