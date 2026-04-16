param(
  [int]$Port = 3000
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$healthUrl = "http://127.0.0.1:$Port/api/health"

try {
  $health = Invoke-WebRequest -UseBasicParsing $healthUrl -TimeoutSec 5
  $data = $health.Content | ConvertFrom-Json
} catch {
  Write-Error "Cannot reach $healthUrl . Start the server first with .\start-uranai.ps1 -Port $Port"
  exit 1
}

if (-not $data.setup) {
  Write-Host "Health URL: $healthUrl" -ForegroundColor Cyan
  Write-Host "This server is running, but it is an older build." -ForegroundColor Red
  Write-Host "Restart the app from the project folder so the latest server.js is loaded." -ForegroundColor Red
  exit 2
}

Write-Host "Health URL: $healthUrl" -ForegroundColor Cyan
Write-Host ("OpenAI: " + ($(if ($data.openaiKeyConfigured) { 'ready' } else { 'missing' }))) -ForegroundColor Green
Write-Host ("Anthropic: " + ($(if ($data.anthropicKeyConfigured) { 'ready' } else { 'missing' }))) -ForegroundColor Green
Write-Host ("Google login: " + ($(if ($data.setup.googleClientConfigured) { 'ready' } else { 'missing GOOGLE_CLIENT_ID' }))) -ForegroundColor Green
Write-Host ("Stripe checkout: " + ($(if ($data.stripeCheckoutReady) { 'ready' } else { 'missing STRIPE_SECRET_KEY / STRIPE_PRICE_ID_MONTHLY' }))) -ForegroundColor Green
Write-Host ("Stripe webhook: " + ($(if ($data.stripeWebhookReady) { 'ready' } else { 'missing STRIPE_WEBHOOK_SECRET' }))) -ForegroundColor Green
Write-Host ("Auth session secret: " + ($(if ($data.setup.authSessionPersistent) { 'ready' } else { 'set AUTH_SESSION_SECRET' }))) -ForegroundColor Green
Write-Host ("Member session secret: " + ($(if ($data.setup.memberSessionPersistent) { 'ready' } else { 'set MEMBER_SESSION_SECRET' }))) -ForegroundColor Green

if ($data.setup.webhookUrl) {
  Write-Host ("Stripe webhook URL: " + $data.setup.webhookUrl) -ForegroundColor Yellow
}
if ($data.setup.checkoutSuccessUrl) {
  Write-Host ("Stripe success URL: " + $data.setup.checkoutSuccessUrl) -ForegroundColor Yellow
}
if ($data.setup.checkoutCancelUrl) {
  Write-Host ("Stripe cancel URL: " + $data.setup.checkoutCancelUrl) -ForegroundColor Yellow
}

if (@($data.setup.issues).Count -gt 0) {
  Write-Host ("Missing or placeholder values: " + ((@($data.setup.issues) | ForEach-Object { [string]$_ }) -join ', ')) -ForegroundColor Red
  Write-Host "Quick env helper: .\setup-google-stripe.ps1 -Port $Port" -ForegroundColor DarkYellow
  Write-Host "Next external setup:" -ForegroundColor DarkYellow
  Write-Host "1. Google Cloud Console: add http://127.0.0.1:$Port to Authorized JavaScript origins" -ForegroundColor DarkYellow
  Write-Host "2. Stripe Dashboard: register the webhook URL shown above" -ForegroundColor DarkYellow
  Write-Host "3. Stripe events: checkout.session.completed, customer.subscription.created, customer.subscription.updated, customer.subscription.deleted" -ForegroundColor DarkYellow
  exit 2
}

Write-Host "Production-related env values look ready." -ForegroundColor Green
exit 0
