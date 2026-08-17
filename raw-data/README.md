# Raw research archive

The application keeps source evidence separate from deployable runtime assets.

- `official-docs/<manufacturer>/`: downloaded manufacturer datasheets, manuals, rigging guides, catalogues, and technical papers.
- `raw-assets/<manufacturer>/`: original manufacturer images and media archives before any runtime optimization.
- `raw-specs/<manufacturer>/`: one canonical, card-facing evidence note per complete product record.
- `research-gaps/<manufacturer>/`: reviewed products that remain incomplete because an independent official specification is unavailable.
- `source-manifests/<manufacturer>.json`: machine-readable provenance for every downloaded document and original media file.

Files under this directory are research inputs and are excluded from the GitHub Pages `dist` artifact. Runtime images live under `public/assets/img` and must keep their own audited provenance.
