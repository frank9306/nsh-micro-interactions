param([Parameter(Mandatory)][string]$Destination)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$target = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($Destination)
if (Test-Path -LiteralPath $target) { throw "Destination already exists: $target" }

$files = @(
    'index.ts', 'model.ts', 'glyphs.ts',
    'ports/ButtonMotion.tsx', 'ports/MotionSelect.tsx', 'ports/SeriesChart.tsx',
    'LICENSE', 'LICENSE-LUCIDE.txt', 'LICENSE-NSH.txt', 'NOTICE.txt'
)
foreach ($file in $files) {
    if (-not (Test-Path -LiteralPath (Join-Path $root $file) -PathType Leaf)) {
        throw "Missing bundle source: $file"
    }
}
New-Item -ItemType Directory -Path $target | Out-Null
New-Item -ItemType Directory -Path (Join-Path $target 'ports') | Out-Null
foreach ($file in $files) {
    Copy-Item -LiteralPath (Join-Path $root $file) -Destination (Join-Path $target $file)
}
