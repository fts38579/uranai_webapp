const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const root = process.cwd();
const htmlPath = path.join(root, 'uranai-v5.html');
const appJsPath = path.join(root, 'app.js');

const htmlRaw = fs.readFileSync(htmlPath, 'utf8');
const appJs = fs.readFileSync(appJsPath, 'utf8');

const sanitizedHtml = htmlRaw
  .replace(/<script src="https:\/\/accounts\.google\.com\/gsi\/client"[^>]*><\/script>/i, '')
  .replace(/<script src="(?:\/)?app\.js"><\/script>/i, `<script>${appJs}</script>`);

const fakeJsonResponse = payload => ({
  ok: true,
  status: 200,
  json: async () => payload,
  text: async () => JSON.stringify(payload),
});

async function main() {
  const errors = [];
  const dom = new JSDOM(sanitizedHtml, {
    url: 'http://127.0.0.1:3000/uranai-v5.html',
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    beforeParse(window) {
      window.fetch = async (url, options = {}) => {
        const href = String(url);
        if (href.includes('/api/health')) {
          return fakeJsonResponse({
            ok: true,
            anthropicKeyConfigured: true,
            openaiKeyConfigured: true,
            googleClientConfigured: false,
            mode: 'provider-router',
            vaultEnabled: true,
            paidTestMode: true,
            memberCodeConfigured: false,
            memberSessionPersistent: false,
            stripeCheckoutReady: false,
            stripePortalReady: false,
            stripeWebhookReady: false,
          });
        }
        if (href.includes('/api/member/status')) {
          return fakeJsonResponse({
            ok: true,
            active: false,
            source: 'none',
            googleClientConfigured: false,
            stripeCheckoutReady: false,
            stripePortalReady: false,
            codeConfigured: false,
          });
        }
        if (href.includes('/api/vault/history/query')) {
          return fakeJsonResponse({ ok: true, records: [] });
        }
        if (href.includes('/api/vault/history/save')) {
          return fakeJsonResponse({ ok: true });
        }
        if (href.includes('/api/vault/history/clear')) {
          return fakeJsonResponse({ ok: true });
        }
        if (href.includes('/solar-term-boundaries.json')) {
          return fakeJsonResponse({});
        }
        if (href.includes('/api/stripe/checkout-session')) {
          return fakeJsonResponse({ ok: false, error: 'STRIPE_NOT_CONFIGURED' });
        }
        if (href.includes('/api/stripe/portal-session')) {
          return fakeJsonResponse({ ok: false, error: 'STRIPE_NOT_CONFIGURED' });
        }
        return fakeJsonResponse({});
      };
      window.scrollTo = () => {};
      window.alert = () => {};
      window.print = () => {};
      window.open = () => null;
      window.console.error = (...args) => errors.push(args.map(String).join(' '));
    },
  });

  await new Promise(resolve => {
    dom.window.addEventListener('load', () => setTimeout(resolve, 400), { once: true });
  });

  const { document } = dom.window;
  const state = () => ({
    activeScreens: [...document.querySelectorAll('.screen.active')].map(node => node.id),
    modalOn: document.getElementById('member-access-modal')?.classList.contains('on') || false,
    progress: document.getElementById('progress')?.style.width || '',
  });

  const result = {
    initial: {
      topPaid: !!document.querySelector('.btn-top.btn-paid'),
      topFree: !!document.querySelector('.btn-top.btn-free'),
      bottomPrimary: !!document.querySelector('#premium-entry .today-cta'),
      bottomFree: !!document.querySelector('#premium-entry .premium-entry-subbtn'),
      hasStartFlow: typeof dom.window.startFlow,
      hasOpenMemberAccessModal: typeof dom.window.openMemberAccessModal,
      state: state(),
    },
    clicks: [],
    errors,
  };

  const clickAndWait = async (selector, label, check) => {
    const node = document.querySelector(selector);
    if (!node) {
      result.clicks.push({ label, ok: false, reason: 'missing-node', state: state() });
      return;
    }
    node.click();
    await new Promise(resolve => setTimeout(resolve, 250));
    result.clicks.push({ label, ok: !!check(), state: state() });
  };

  await clickAndWait('.btn-top.btn-free', 'topFree', () => document.getElementById('s-input')?.classList.contains('active'));
  if (typeof dom.window.gotoTop === 'function') dom.window.gotoTop();
  await clickAndWait('.btn-top.btn-paid', 'topPaid', () => {
    return document.getElementById('s-input')?.classList.contains('active')
      || document.getElementById('member-access-modal')?.classList.contains('on');
  });
  if (typeof dom.window.gotoTop === 'function') dom.window.gotoTop();
  await clickAndWait('#premium-entry .premium-entry-subbtn', 'bottomFree', () => document.getElementById('s-input')?.classList.contains('active'));
  if (typeof dom.window.gotoTop === 'function') dom.window.gotoTop();
  await clickAndWait('#premium-entry .today-cta', 'bottomPrimary', () => {
    return document.getElementById('s-input')?.classList.contains('active')
      || document.getElementById('member-access-modal')?.classList.contains('on');
  });

  result.final = state();
  result.ok = result.clicks.every(entry => entry.ok);
  console.log(JSON.stringify(result, null, 2));
}

main().catch(error => {
  console.error(JSON.stringify({
    ok: false,
    error: error?.message || String(error),
    stack: error?.stack || '',
  }, null, 2));
  process.exitCode = 1;
});
