param([switch]$DownloadAssets)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$groups = Get-Content -Raw (Join-Path $repo 'raw-data/catalog-inventory/my-import-groups.json') | ConvertFrom-Json
$base = 'https://meyersound.com'
$docsBase = 'https://docs.meyersound.com/products/en'

function Resolve-OfficialUrl([string]$value, [string]$pageUrl) {
  if ($value -match '^https?://') { return $value }
  return ([uri]::new([uri]$pageUrl, ($value -replace '&amp;', '&'))).AbsoluteUri
}

function Safe-Name([string]$url) {
  $leaf = [uri]::UnescapeDataString(([uri]$url).Segments[-1]) -replace '\?.*$', ''
  return ($leaf -replace '[^A-Za-z0-9._-]', '-')
}

foreach ($group in $groups) {
  $docsDir = Join-Path $repo "raw-data/official-docs/my/speakers/$($group.series)"
  $assetDir = Join-Path $repo "raw-data/raw-assets/my/speakers/$($group.series)/$($group.slug)"
  New-Item -ItemType Directory -Force $docsDir, $assetDir | Out-Null

  $productUrl = "$base/product/$($group.slug)/"
  $docsUrl = "$docsBase/$($group.slug).html"
  $productPage = Join-Path $docsDir "$($group.slug)-product-page.html"
  $docsPage = Join-Path $docsDir "$($group.slug)-documentation.html"
  try { Invoke-WebRequest -UseBasicParsing $productUrl -OutFile $productPage } catch { Write-Warning "No product page for $($group.slug): $($_.Exception.Message)" }
  try { Invoke-WebRequest -UseBasicParsing $docsUrl -OutFile $docsPage } catch { Write-Warning "No docs root for $($group.slug): $($_.Exception.Message)" }

  if (-not $DownloadAssets) { continue }
  $pages = @($productPage, $docsPage) | Where-Object { Test-Path $_ }
  foreach ($page in $pages) {
    $pageUrl = if ($page -eq $productPage) { $productUrl } else { $docsUrl }
    $html = Get-Content -Raw $page
    $refs = [regex]::Matches($html, '(?:href|src)="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
    $media = $refs | Where-Object { $_ -match '\.(?:png|jpe?g|webp)(?:\?|$)' } | ForEach-Object { Resolve-OfficialUrl $_ $pageUrl } | Sort-Object -Unique
    $documents = $refs | Where-Object { $_ -match '\.(?:pdf|zip)(?:\?|$)' } | ForEach-Object { Resolve-OfficialUrl $_ $pageUrl } | Sort-Object -Unique
    foreach ($url in $media) {
      if ($url -notmatch 'meyersound\.com/' -or $url -match '/accessories/|favicon|logo|icon|safety|blue-rule|note\.') { continue }
      $dest = Join-Path $assetDir (Safe-Name $url)
      if (-not (Test-Path $dest)) { try { Invoke-WebRequest -UseBasicParsing $url -OutFile $dest } catch { Write-Warning "Image failed: $url" } }
    }
    foreach ($url in $documents) {
      if ($url -notmatch 'docs\.meyersound\.com/' -or $url -match '/compliance/') { continue }
      $dest = Join-Path $docsDir (Safe-Name $url)
      if (-not (Test-Path $dest)) { try { Invoke-WebRequest -UseBasicParsing $url -OutFile $dest } catch { Write-Warning "Document failed: $url" } }
    }
  }
}
