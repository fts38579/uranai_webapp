const BASE_URL = process.env.VERIFY_BASE_URL || 'http://127.0.0.1:3000';
const DEV_EMAIL = process.env.VERIFY_DEV_EMAIL || 'tekechannnel@gmail.com';
const DEV_NAME = process.env.VERIFY_DEV_NAME || '開発者';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function readJson(response) {
  const text = await response.text();
  let data = null;
  try {
    data = JSON.parse(text || '{}');
  } catch (_error) {
    data = null;
  }
  return { text, data };
}

function extractCookie(setCookieHeader = '') {
  return String(setCookieHeader || '').split(';')[0].trim();
}

async function fetchJson(pathname, options = {}) {
  const response = await fetch(`${BASE_URL}${pathname}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  });
  const parsed = await readJson(response);
  return {
    response,
    ...parsed,
  };
}

async function main() {
  const results = {
    baseUrl: BASE_URL,
    checks: {},
  };

  const health = await fetchJson('/api/health', { cache: 'no-store' });
  assert(health.response.ok, `/api/health failed: ${health.text}`);
  assert(health.data?.ok === true, 'Health payload did not report ok=true.');
  assert(health.data?.googleClientConfigured, 'Google login is not ready.');
  assert(health.data?.stripeCheckoutReady, 'Stripe checkout is not ready.');
  assert(health.data?.stripeWebhookReady, 'Stripe webhook is not ready.');
  results.checks.health = {
    ok: true,
    google: health.data.googleClientConfigured,
    stripeCheckout: health.data.stripeCheckoutReady,
    stripeWebhook: health.data.stripeWebhookReady,
  };

  const html = await fetch(`${BASE_URL}/uranai-v5.html`, { cache: 'no-store' }).then(res => res.text());
  const hasTopPaid = html.includes('会員で深掘り鑑定') && html.includes('data-flow-target="paid"');
  const hasTopFree = html.includes('無料1回を試す') && html.includes('data-flow-target="free"');
  assert(hasTopPaid, 'Top paid CTA was not found in HTML.');
  assert(hasTopFree, 'Top free CTA was not found in HTML.');
  results.checks.html = {
    ok: true,
    hasTopPaid,
    hasTopFree,
  };

  const memberSession = await fetchJson('/api/member/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'developer',
      email: DEV_EMAIL,
      name: DEV_NAME,
    }),
  });
  assert(memberSession.response.ok, `/api/member/session failed: ${memberSession.text}`);
  assert(memberSession.data?.active === true, 'Developer session did not become active.');
  const rawSetCookie = memberSession.response.headers.get('set-cookie') || '';
  const authCookie = extractCookie(rawSetCookie);
  assert(authCookie.startsWith('uranai_auth_session='), 'Auth session cookie was not issued.');
  results.checks.developerSession = {
    ok: true,
    active: memberSession.data.active,
    source: memberSession.data.source,
    authProvider: memberSession.data.authProvider,
    userEmail: memberSession.data.userEmail,
  };

  const memberStatus = await fetchJson('/api/member/status', {
    headers: {
      Cookie: authCookie,
    },
    cache: 'no-store',
  });
  assert(memberStatus.response.ok, `/api/member/status failed: ${memberStatus.text}`);
  assert(memberStatus.data?.active === true, 'Member status is not active after developer session.');
  assert(memberStatus.data?.authLoggedIn === true, 'Member status did not recognize the auth session.');
  results.checks.memberStatus = {
    ok: true,
    active: memberStatus.data.active,
    source: memberStatus.data.source,
    authLoggedIn: memberStatus.data.authLoggedIn,
    userId: memberStatus.data.userId,
  };

  const stripeCheckout = await fetchJson('/api/stripe/checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: authCookie,
    },
    body: JSON.stringify({ intent: 'start-paid' }),
  });
  assert(stripeCheckout.response.ok, `/api/stripe/checkout-session failed: ${stripeCheckout.text}`);
  assert(/^cs_/.test(String(stripeCheckout.data?.id || '')), 'Stripe checkout session id is missing.');
  assert(/^https:\/\/checkout\.stripe\.com\//.test(String(stripeCheckout.data?.url || '')), 'Stripe checkout URL is invalid.');
  results.checks.stripeCheckout = {
    ok: true,
    id: stripeCheckout.data.id,
    urlPreview: String(stripeCheckout.data.url || '').slice(0, 80),
  };

  const freeAi = await fetchJson('/api/ai/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: 'openai',
      model: 'gpt-5.4-mini',
      max_tokens: 60,
      task_key: 'free',
      plan: 'free',
      messages: [
        {
          role: 'user',
          content: '30代女性です。在職中に動くべきか迷っています。短く核心だけ返してください。',
        },
      ],
    }),
  });
  results.checks.freeAi = {
    ok: freeAi.response.ok && !!String(freeAi.data?.content?.[0]?.text || '').trim(),
    status: freeAi.response.status,
    provider: freeAi.data?.provider || 'openai',
    model: freeAi.data?.model || 'gpt-5.4-mini',
    text: String(freeAi.data?.content?.[0]?.text || '').trim(),
    error: freeAi.data?.error || '',
    message: freeAi.data?.message || '',
  };

  const paidAi = await fetchJson('/api/ai/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: authCookie,
    },
    body: JSON.stringify({
      provider: 'anthropic',
      model: 'claude-opus-4-6',
      max_tokens: 80,
      task_key: 'paid',
      plan: 'paid',
      messages: [
        {
          role: 'user',
          content: '40代女性です。逃げではない現実的な助言を、短く核心だけ返してください。',
        },
      ],
    }),
  });
  results.checks.paidAi = {
    ok: paidAi.response.ok && !!String(paidAi.data?.content?.[0]?.text || '').trim(),
    status: paidAi.response.status,
    provider: paidAi.data?.provider || 'anthropic',
    model: paidAi.data?.model || 'claude-opus-4-6',
    text: String(paidAi.data?.content?.[0]?.text || '').trim(),
    error: paidAi.data?.error || '',
    message: paidAi.data?.message || '',
  };

  const portalSession = await fetchJson('/api/stripe/portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: authCookie,
    },
    body: JSON.stringify({ returnUrl: '/uranai-v5.html' }),
  });
  results.checks.portalSession = {
    ok: portalSession.response.ok,
    status: portalSession.response.status,
    error: portalSession.data?.error || '',
    message: portalSession.data?.message || '',
  };

  console.log(JSON.stringify({
    ok: true,
    ...results,
  }, null, 2));
}

main().catch(error => {
  console.error(JSON.stringify({
    ok: false,
    error: error?.message || String(error),
    stack: error?.stack || '',
  }, null, 2));
  process.exitCode = 1;
});
