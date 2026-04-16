param(
  [int]$Port = 3000
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
$envPath = Join-Path $root '.env'

function Get-EnvMap {
  $map = @{}
  if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
      $line = $_
      if (-not $line -or $line.Trim().StartsWith('#') -or -not ($line -match '=')) { return }
      $parts = $line -split '=', 2
      $map[$parts[0].Trim()] = $parts[1]
    }
  }
  return $map
}

function Set-EnvValue {
  param(
    [string]$Key,
    [string]$Value
  )
  $lines = @()
  if (Test-Path $envPath) { $lines = Get-Content $envPath }
  $written = $false
  $next = foreach ($line in $lines) {
    if ($line -match "^\s*$([Regex]::Escape($Key))=") {
      $written = $true
      "$Key=$Value"
    } else {
      $line
    }
  }
  if (-not $written) { $next += "$Key=$Value" }
  Set-Content -Path $envPath -Value $next -Encoding UTF8
}

function New-RandomSecret {
  param([int]$Length = 48)
  $chars = (48..57) + (65..90) + (97..122)
  return -join ($chars | Get-Random -Count $Length | ForEach-Object { [char]$_ })
}

$current = Get-EnvMap

$googleClientId = Read-Host "GOOGLE_CLIENT_ID"
$stripeSecret = Read-Host "STRIPE_SECRET_KEY"
$stripePrice = Read-Host "STRIPE_PRICE_ID_MONTHLY"
$stripeWebhook = Read-Host "STRIPE_WEBHOOK_SECRET"

if ($googleClientId) { Set-EnvValue -Key 'GOOGLE_CLIENT_ID' -Value $googleClientId }
if ($stripeSecret) { Set-EnvValue -Key 'STRIPE_SECRET_KEY' -Value $stripeSecret }
if ($stripePrice) { Set-EnvValue -Key 'STRIPE_PRICE_ID_MONTHLY' -Value $stripePrice }
if ($stripeWebhook) { Set-EnvValue -Key 'STRIPE_WEBHOOK_SECRET' -Value $stripeWebhook }

if (-not $current['MEMBER_SESSION_SECRET']) {
  Set-EnvValue -Key 'MEMBER_SESSION_SECRET' -Value (New-RandomSecret)
}
if (-not $current['AUTH_SESSION_SECRET']) {
  Set-EnvValue -Key 'AUTH_SESSION_SECRET' -Value (New-RandomSecret)
}

Write-Host "Saved .env values." -ForegroundColor Green
Write-Host "Next:" -ForegroundColor Cyan
Write-Host "1. Google Cloud Console: add http://127.0.0.1:$Port to Authorized JavaScript origins" -ForegroundColor Cyan
Write-Host "2. Stripe webhook URL: http://127.0.0.1:$Port/api/stripe/webhook" -ForegroundColor Cyan
Write-Host "3. Stripe events: checkout.session.completed, customer.subscription.created, customer.subscription.updated, customer.subscription.deleted" -ForegroundColor Cyan
