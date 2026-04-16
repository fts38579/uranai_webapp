param(
  [int]$Port = 3000
)

function Test-PlaceholderEnvValue {
  param(
    [string]$Value
  )
  if ([string]::IsNullOrWhiteSpace($Value)) {
    return $true
  }
  return $Value -match 'replace-with|xxxxxxxx|your-|example|sample|dummy|changeme|todo'
}

function Get-HealthData {
  param(
    [string]$Url
  )
  try {
    $res = Invoke-WebRequest -UseBasicParsing $Url -TimeoutSec 3
    return @{
      ok = $true
      response = $res
      data = ($res.Content | ConvertFrom-Json)
    }
  } catch {
    return @{
      ok = $false
      response = $null
      data = $null
    }
  }
}

function Get-PortProcessIds {
  param(
    [int]$TargetPort
  )
  try {
    return @(Get-NetTCPConnection -LocalPort $TargetPort -State Listen -ErrorAction Stop | Select-Object -ExpandProperty OwningProcess -Unique)
  } catch {
    return @()
  }
}

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Error "Node.js was not found. Install Node.js and try again."
  exit 1
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
$env:PORT = [string]$Port

$envFile = Join-Path $root '.env'
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith('#')) {
      return
    }
    $parts = $line -split '=', 2
    if ($parts.Count -ne 2) {
      return
    }
    $key = $parts[0].Trim()
    $value = $parts[1].Trim().Trim('"').Trim("'")
    $currentValue = ''
    if (Test-Path "Env:$key") {
      $currentValue = [string](Get-Item "Env:$key").Value
    }
    if ($key -and -not [string]::IsNullOrWhiteSpace($value) -and (Test-PlaceholderEnvValue $currentValue)) {
      Set-Item -Path "Env:$key" -Value $value
    }
  }
}

Write-Host "Check the final key status in the server.js log or via /api/health after startup." -ForegroundColor DarkYellow

$healthUrl = "http://127.0.0.1:$Port/api/health"
$existing = Get-HealthData -Url $healthUrl
if ($existing.ok) {
  Write-Host "A server is already responding on http://127.0.0.1:$Port" -ForegroundColor Yellow
  Write-Host "Health: $($existing.response.Content)" -ForegroundColor Green
  if ($existing.data.setup) {
    Write-Host "Open: http://127.0.0.1:$Port/uranai-v5.html" -ForegroundColor Green
    exit 0
  }
  $pids = Get-PortProcessIds -TargetPort $Port
  Write-Host "An older server build is still running on this port. Stop it and run again." -ForegroundColor Red
  if ($pids.Count -gt 0) {
    Write-Host ("Listening PID(s): " + ($pids -join ', ')) -ForegroundColor Red
    Write-Host ("Stop command: Stop-Process -Id " + ($pids -join ',') ) -ForegroundColor DarkYellow
  }
  exit 2
}

Write-Host "Starting star reader server: http://127.0.0.1:$Port" -ForegroundColor Cyan
$proc = Start-Process -FilePath $node.Source -ArgumentList '.\server.js','--port',"$Port" -WorkingDirectory $root -PassThru -WindowStyle Hidden
$health = $null
$started = $false

for ($i = 0; $i -lt 20; $i++) {
  Start-Sleep -Milliseconds 300
  if ($proc.HasExited) {
    break
  }
  try {
    $health = Invoke-WebRequest -UseBasicParsing $healthUrl -TimeoutSec 2
    $started = $true
    break
  } catch {
  }
}

if (-not $started) {
  $existingAfter = Get-HealthData -Url $healthUrl
  if ($existingAfter.ok) {
    Write-Host "A server is already responding on http://127.0.0.1:$Port" -ForegroundColor Yellow
    Write-Host "Health: $($existingAfter.response.Content)" -ForegroundColor Green
    if ($existingAfter.data.setup) {
      Write-Host "Open: http://127.0.0.1:$Port/uranai-v5.html" -ForegroundColor Green
      exit 0
    }
    $pids = Get-PortProcessIds -TargetPort $Port
    Write-Host "An older server build is still running on this port. Stop it and run again." -ForegroundColor Red
    if ($pids.Count -gt 0) {
      Write-Host ("Listening PID(s): " + ($pids -join ', ')) -ForegroundColor Red
      Write-Host ("Stop command: Stop-Process -Id " + ($pids -join ',') ) -ForegroundColor DarkYellow
    }
    exit 2
  }
  if ($proc -and -not $proc.HasExited) {
    Stop-Process -Id $proc.Id -Force
  }
  Write-Error "Server failed to stay up. Try: node .\server.js --port $Port"
  exit 1
}

Write-Host "Server PID: $($proc.Id)" -ForegroundColor Green
Write-Host "Health: $($health.Content)" -ForegroundColor Green
try {
  $healthData = $health.Content | ConvertFrom-Json
  if ($healthData.setup) {
    Write-Host ("Google login: " + ($(if ($healthData.setup.googleClientConfigured) { 'ready' } else { 'missing GOOGLE_CLIENT_ID' }))) -ForegroundColor Cyan
    Write-Host ("Stripe checkout: " + ($(if ($healthData.stripeCheckoutReady) { 'ready' } else { 'missing STRIPE_SECRET_KEY / STRIPE_PRICE_ID_MONTHLY' }))) -ForegroundColor Cyan
    Write-Host ("Stripe webhook: " + ($(if ($healthData.stripeWebhookReady) { 'ready' } else { 'missing STRIPE_WEBHOOK_SECRET' }))) -ForegroundColor Cyan
    Write-Host ("Auth sessions: " + ($(if ($healthData.setup.authSessionPersistent) { 'persistent' } else { 'set AUTH_SESSION_SECRET' }))) -ForegroundColor Cyan
    if ($healthData.setup.webhookUrl) {
      Write-Host ("Stripe webhook URL: " + $healthData.setup.webhookUrl) -ForegroundColor DarkCyan
    }
    if ($healthData.setup.issues -and $healthData.setup.issues.Count -gt 0) {
      Write-Host ("Setup issues: " + (($healthData.setup.issues | ForEach-Object { [string]$_ }) -join ', ')) -ForegroundColor Yellow
    }
  }
} catch {
}
Write-Host "Open: http://127.0.0.1:$Port/uranai-v5.html" -ForegroundColor Green
exit 0
