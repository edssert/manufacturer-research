import pg from "pg";

const LOCAL_DATABASE_URL = "postgresql://postgres:postgres@127.0.0.1:54322/postgres";

export function databaseUrlFromArgs(argv = process.argv.slice(2)) {
  const explicitIndex = argv.indexOf("--db-url");
  if (explicitIndex >= 0) {
    const value = argv[explicitIndex + 1];
    if (!value) throw new Error("--db-url requires a value");
    return value;
  }
  if (argv.includes("--local")) return LOCAL_DATABASE_URL;
  if (process.env.CATALOG_DATABASE_URL) return process.env.CATALOG_DATABASE_URL;
  throw new Error("Set CATALOG_DATABASE_URL or pass --local for the Supabase local database");
}

export function createCatalogClient(connectionString) {
  return new pg.Client({ connectionString, application_name: "sound-systems-index-catalog-importer" });
}

export async function upsertReturningId(client, sql, values) {
  const result = await client.query(sql, values);
  if (result.rowCount !== 1 || !result.rows[0]?.id) throw new Error("Expected one row with an id");
  return result.rows[0].id;
}
