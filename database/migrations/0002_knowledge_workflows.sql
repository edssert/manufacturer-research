BEGIN;

CREATE TYPE catalog.requirement_operator AS ENUM ('eq', 'neq', 'gte', 'lte', 'between', 'contains', 'supports');
CREATE TYPE catalog.evaluation_status AS ENUM ('satisfies', 'fails', 'insufficient_evidence', 'not_applicable', 'needs_review');
CREATE TYPE catalog.date_precision AS ENUM ('day', 'month', 'year', 'range', 'unknown');
CREATE TYPE catalog.event_kind AS ENUM ('organization', 'product', 'technology');

CREATE TABLE catalog.project (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  name text NOT NULL,
  owner_user_id uuid REFERENCES catalog.app_user(id),
  status text NOT NULL DEFAULT 'draft',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.procurement_notice (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel text NOT NULL,
  external_id text NOT NULL,
  title text NOT NULL,
  agency_name text,
  notice_status text NOT NULL,
  published_at timestamptz,
  closes_at timestamptz,
  canonical_url text NOT NULL,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (channel, external_id)
);

CREATE TABLE catalog.notice_version (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notice_id uuid NOT NULL REFERENCES catalog.procurement_notice(id) ON DELETE CASCADE,
  version_number integer NOT NULL CHECK (version_number > 0),
  content_sha256 text NOT NULL CHECK (content_sha256 ~ '^[0-9a-f]{64}$'),
  captured_at timestamptz NOT NULL,
  raw_payload jsonb NOT NULL,
  UNIQUE (notice_id, version_number),
  UNIQUE (notice_id, content_sha256)
);

CREATE TABLE catalog.requirement_document (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES catalog.project(id) ON DELETE CASCADE,
  notice_version_id uuid REFERENCES catalog.notice_version(id) ON DELETE CASCADE,
  source_id uuid NOT NULL REFERENCES catalog.source_document(id),
  document_role text NOT NULL,
  extraction_status catalog.verification_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (num_nonnulls(project_id, notice_version_id) = 1)
);

CREATE TABLE catalog.requirement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES catalog.requirement_document(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES catalog.requirement(id),
  stable_key text NOT NULL,
  original_text text NOT NULL,
  attribute_definition_id uuid REFERENCES catalog.attribute_definition(id),
  operator catalog.requirement_operator,
  normalized_value jsonb,
  unit_code text REFERENCES catalog.unit(code),
  mandatory boolean NOT NULL DEFAULT true,
  verification catalog.verification_status NOT NULL DEFAULT 'pending',
  locator_id uuid REFERENCES catalog.source_locator(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (document_id, stable_key),
  CHECK (parent_id IS NULL OR parent_id <> id)
);

CREATE TABLE catalog.candidate_system (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES catalog.project(id) ON DELETE CASCADE,
  name text NOT NULL,
  schema_version integer NOT NULL DEFAULT 1,
  generated_from_snapshot text NOT NULL,
  created_by uuid REFERENCES catalog.app_user(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.candidate_component (
  system_id uuid NOT NULL REFERENCES catalog.candidate_system(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES catalog.product(id),
  quantity numeric NOT NULL CHECK (quantity > 0),
  role text NOT NULL,
  configuration jsonb NOT NULL DEFAULT '{}'::jsonb,
  PRIMARY KEY (system_id, product_id, role)
);

CREATE TABLE catalog.requirement_evaluation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requirement_id uuid NOT NULL REFERENCES catalog.requirement(id) ON DELETE CASCADE,
  product_id uuid REFERENCES catalog.product(id),
  candidate_system_id uuid REFERENCES catalog.candidate_system(id),
  status catalog.evaluation_status NOT NULL,
  observed_value jsonb,
  explanation text NOT NULL,
  assertion_ids uuid[] NOT NULL DEFAULT '{}',
  evaluator_version text NOT NULL,
  evaluated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (num_nonnulls(product_id, candidate_system_id) = 1)
);

CREATE TABLE catalog.venue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  name text NOT NULL,
  country_code text,
  city text,
  official_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.venue_space (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid NOT NULL REFERENCES catalog.venue(id) ON DELETE CASCADE,
  name text NOT NULL,
  space_type text NOT NULL,
  seat_count integer CHECK (seat_count IS NULL OR seat_count >= 0),
  standing_capacity integer CHECK (standing_capacity IS NULL OR standing_capacity >= 0),
  indoor boolean,
  dimensions jsonb,
  UNIQUE (venue_id, name)
);

CREATE TABLE catalog.application_case (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  title text NOT NULL,
  venue_space_id uuid REFERENCES catalog.venue_space(id),
  installed_on date,
  purpose text,
  verification catalog.verification_status NOT NULL DEFAULT 'pending',
  inference_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.deployed_component (
  application_case_id uuid NOT NULL REFERENCES catalog.application_case(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES catalog.product(id),
  quantity numeric CHECK (quantity IS NULL OR quantity > 0),
  deployment_role text NOT NULL,
  configuration jsonb NOT NULL DEFAULT '{}'::jsonb,
  evidence_locator_id uuid REFERENCES catalog.source_locator(id),
  PRIMARY KEY (application_case_id, product_id, deployment_role)
);

CREATE TABLE catalog.technology_concept (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  preferred_name text NOT NULL,
  definition text NOT NULL,
  broader_concept_id uuid REFERENCES catalog.technology_concept(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (broader_concept_id IS NULL OR broader_concept_id <> id)
);

CREATE TABLE catalog.manufacturer_technology (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer_id uuid NOT NULL REFERENCES catalog.manufacturer(id),
  concept_id uuid NOT NULL REFERENCES catalog.technology_concept(id),
  official_name text NOT NULL,
  description text,
  verification catalog.verification_status NOT NULL DEFAULT 'pending',
  UNIQUE (manufacturer_id, official_name)
);

CREATE TABLE catalog.technology_support (
  manufacturer_technology_id uuid NOT NULL REFERENCES catalog.manufacturer_technology(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  support_level text NOT NULL,
  version_constraint text,
  locator_id uuid REFERENCES catalog.source_locator(id),
  PRIMARY KEY (manufacturer_technology_id, product_id)
);

CREATE TABLE catalog.timeline_event (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  manufacturer_id uuid NOT NULL REFERENCES catalog.manufacturer(id),
  kind catalog.event_kind NOT NULL,
  title text NOT NULL,
  summary text,
  occurred_on date,
  occurred_to date,
  date_precision catalog.date_precision NOT NULL,
  product_id uuid REFERENCES catalog.product(id),
  technology_id uuid REFERENCES catalog.manufacturer_technology(id),
  verification catalog.verification_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (occurred_to IS NULL OR occurred_on IS NULL OR occurred_to >= occurred_on),
  CHECK ((kind <> 'product') OR product_id IS NOT NULL),
  CHECK ((kind <> 'technology') OR technology_id IS NOT NULL)
);

CREATE TABLE catalog.event_evidence (
  event_id uuid NOT NULL REFERENCES catalog.timeline_event(id) ON DELETE CASCADE,
  locator_id uuid NOT NULL REFERENCES catalog.source_locator(id),
  PRIMARY KEY (event_id, locator_id)
);

CREATE INDEX procurement_notice_schedule_idx ON catalog.procurement_notice (notice_status, closes_at);
CREATE INDEX requirement_attribute_idx ON catalog.requirement (attribute_definition_id, operator);
CREATE INDEX requirement_evaluation_status_idx ON catalog.requirement_evaluation (status, requirement_id);
CREATE INDEX application_case_space_idx ON catalog.application_case (venue_space_id, installed_on);
CREATE INDEX timeline_manufacturer_date_idx ON catalog.timeline_event (manufacturer_id, occurred_on, kind);

COMMIT;
