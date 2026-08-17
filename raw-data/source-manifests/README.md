# Source manifest contract

Each manufacturer uses one `<manufacturerId>.json` file with this shape:

```json
{
  "schemaVersion": 1,
  "manufacturerId": "example",
  "scope": "loudspeakers",
  "files": [
    {
      "path": "raw-data/official-docs/example/speakers/model/datasheet.pdf",
      "productIds": ["spk-example-model"],
      "role": "datasheet",
      "sourcePage": "https://manufacturer.example/product/model",
      "sourceAsset": "https://manufacturer.example/download/model.pdf",
      "retrievedAt": "YYYY-MM-DD",
      "sha256": "lowercase sha256",
      "bytes": 1234,
      "mimeType": "application/pdf"
    }
  ]
}
```

Paths are repository-relative, use `/`, and are sorted in ascending order. Roles distinguish product/list images, canonical specs, product/series/download snapshots, datasheets, brochures, catalogues, manuals, rigging/system/application guides, whitepapers, technical documents/drawings, lifecycle records, and media/data archives. The audit script is the machine-readable role vocabulary.
