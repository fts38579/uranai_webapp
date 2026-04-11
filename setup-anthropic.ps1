param(
  [string]$ApiKey,
  [int]$Port = 3000
)

function Read-PlainSecret([string]$Prompt) {
  $secure = Read-Host $Prompt -AsSecureString
  if (-not $secure) { return '' }
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  } finally {
    if ($bstr -ne [IntPtr]::Zero) {
      [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
  }
}

function Set-Or-AddEnvLine(
  [System.Collections.Generic.List[string]]$Lines,
  [string]$Key,
  [string]$Value
) {
  $prefix = "$Key="
  for ($i = 0; $i -lt $Lines.Count; $i++) {
    if ($Lines[$i] -match "^\s*$([regex]::Escape($Key))=") {
      $Lines[$i] = "$prefix$Value"
      return
    }
  }
  $Lines.Add("$prefix$Value") | Out-Null
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not $ApiKey) {
  $ApiKey = Read-PlainSecret 'Anthropic API key を入力してください'
}

if ([string]::IsNullOrWhiteSpace($ApiKey)) {
  Write-Error 'API key が空です。'
  exit 1
}

if (-not $ApiKey.StartsWith('sk-ant-')) {
  Write-Error 'Anthropic API key の形式に見えません。通常は sk-ant- から始まります。'
  exit 1
}

$envFile = Join-Path $root '.env'
$lines = [System.Collections.Generic.List[string]]::new()
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object { $lines.Add($_) | Out-Null }
}

Set-Or-AddEnvLine -Lines $lines -Key 'ANTHROPIC_API_KEY' -Value $ApiKey
if (-not ($lines -match '^\s*PORT=')) {
  Set-Or-AddEnvLine -Lines $lines -Key 'PORT' -Value ([string]$Port)
}
if (-not ($lines -match '^\s*HOST=')) {
  Set-Or-AddEnvLine -Lines $lines -Key 'HOST' -Value '127.0.0.1'
}

Set-Content -LiteralPath $envFile -Value $lines -Encoding UTF8

Write-Host ".env を更新しました: $envFile" -ForegroundColor Green
Write-Host "Anthropic API key を保存しました。" -ForegroundColor Green
Write-Host "接続確認を行います..." -ForegroundColor Cyan

$proc = Start-Process -FilePath powershell -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File','.\\start-uranai.ps1','-Port',"$Port" -WorkingDirectory $root -PassThru -WindowStyle Hidden
try {
  Start-Sleep -Seconds 4
  $health = Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:$Port/api/health" -TimeoutSec 10
  $json = $health.Content | ConvertFrom-Json
  if ($json.anthropicKeyConfigured) {
    Write-Host "Claude 接続準備OK: http://127.0.0.1:$Port/uranai-v5.html" -ForegroundColor Green
  } else {
    Write-Warning 'server.js は起動しましたが、ANTHROPIC_API_KEY を認識できていません。'
  }
  $health.Content | Write-Output
} finally {
  if ($proc -and -not $proc.HasExited) {
    Stop-Process -Id $proc.Id -Force
  }
}

Write-Host ""
Write-Host "次に使うときは:" -ForegroundColor Cyan
Write-Host "  .\\start-uranai.ps1 -Port $Port" -ForegroundColor White
Write-Host "そのあと http://127.0.0.1:$Port/uranai-v5.html を開いてください。" -ForegroundColor White
