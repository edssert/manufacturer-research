# Official series order

Each manufacturer file records the order exposed by its current official products page or catalogue. The application uses this evidence before any editorial fallback such as flagship size or product type.

```json
{
  "schemaVersion": 1,
  "manufacturerId": "example",
  "sourcePage": "https://manufacturer.example/products",
  "retrievedAt": "YYYY-MM-DD",
  "seriesOrder": ["Flagship Series", "Compact Series"],
  "basis": "official-products-page"
}
```
