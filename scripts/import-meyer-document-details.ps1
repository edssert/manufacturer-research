$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$groups = Get-Content -Raw (Join-Path $repo 'raw-data/catalog-inventory/my-import-groups.json') | ConvertFrom-Json
$indexPath = Join-Path $repo 'raw-data/official-docs/my/speakers/references/documentation-index-en.html'
$indexHtml = Get-Content -Raw $indexPath
$docsBase = 'https://docs.meyersound.com/products/en/'

function Resolve-OfficialUrl([string]$value, [string]$pageUrl) {
  if ($value -match '^https?://') { return $value }
  return ([uri]::new([uri]$pageUrl, ($value -replace '&amp;', '&'))).AbsoluteUri
}

function Safe-Name([string]$url) {
  $leaf = [uri]::UnescapeDataString(([uri]$url).Segments[-1]) -replace '\?.*$', ''
  return ($leaf -replace '[^A-Za-z0-9._-]', '-')
}

$allLinks = [regex]::Matches($indexHtml, 'href="([^"]+\.html)"') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique

foreach ($group in $groups) {
  $tokens = @($group.slug) + @($group.productIds | ForEach-Object { $_ -replace '^spk-my-', '' })
  $detailLinks = $allLinks | Where-Object {
    $link = $_
    ($link -match '^(?:datasheet|operating-instructions|architectural-specification|product-information|preliminary-product-information|quick-reference-guide)') -and
      ($tokens | Where-Object { $link -like "*$($_)*" } | Select-Object -First 1)
  }
  $docsDir = Join-Path $repo "raw-data/official-docs/my/speakers/$($group.series)"
  $assetDir = Join-Path $repo "raw-data/raw-assets/my/speakers/$($group.series)/$($group.slug)"
  New-Item -ItemType Directory -Force $docsDir, $assetDir | Out-Null
  foreach ($link in $detailLinks) {
    $pageUrl = Resolve-OfficialUrl $link $docsBase
    $pagePath = Join-Path $docsDir $link
    if (-not (Test-Path $pagePath)) { Invoke-WebRequest -UseBasicParsing $pageUrl -OutFile $pagePath }
  }
}
