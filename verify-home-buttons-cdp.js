const CDP_PORT = Number.parseInt(process.env.CDP_PORT || '9222', 10);
const TARGET_URL = process.env.TARGET_URL || 'http://127.0.0.1:3120/uranai-v5.html';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchJson(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Request failed: ${url} (${res.status})`);
  }
  return res.json();
}

async function waitForTarget() {
  const endpoint = `http://127.0.0.1:${CDP_PORT}/json`;
  const started = Date.now();
  while (Date.now() - started < 15000) {
    try {
      const targets = await fetchJson(endpoint);
      const page = (Array.isArray(targets) ? targets : []).find(item =>
        item?.type === 'page' && String(item.url || '').startsWith(TARGET_URL)
      );
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch (_error) {}
    await sleep(250);
  }
  throw new Error('CDP target was not found.');
}

function makeCdpClient(wsUrl) {
  let nextId = 0;
  const pending = new Map();
  const socket = new WebSocket(wsUrl);

  socket.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    if (!data.id) return;
    const slot = pending.get(data.id);
    if (!slot) return;
    pending.delete(data.id);
    if (data.error) slot.reject(new Error(data.error.message || 'CDP error'));
    else slot.resolve(data.result);
  });

  const ready = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  return {
    ready,
    async send(method, params = {}) {
      await ready;
      const id = ++nextId;
      const payload = JSON.stringify({ id, method, params });
      const result = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
      socket.send(payload);
      return result;
    },
    close() {
      socket.close();
    },
  };
}

async function evaluate(client, expression) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result?.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || 'Runtime evaluation failed.');
  }
  return result?.result?.value;
}

async function poll(client, expression, timeoutMs = 5000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const value = await evaluate(client, expression);
    if (value) return value;
    await sleep(150);
  }
  return null;
}

async function clickAndVerify(client, clickExpression, verifyExpression, label) {
  await evaluate(client, clickExpression);
  const value = await poll(client, verifyExpression, 6000);
  if (!value) {
    throw new Error(`${label} did not transition as expected.`);
  }
  return value;
}

async function main() {
  const wsUrl = await waitForTarget();
  const client = makeCdpClient(wsUrl);
  try {
    await client.ready;
    await client.send('Runtime.enable');

    const initial = await evaluate(client, `({
      topPaid: !!document.querySelector('.btn-top.btn-paid'),
      topFree: !!document.querySelector('.btn-top.btn-free'),
      bottomPrimary: !!document.querySelector('#premium-entry .today-cta'),
      bottomFree: !!document.querySelector('#premium-entry .premium-entry-subbtn'),
      hasStartFlow: typeof window.startFlow,
      hasOpenMemberAccessModal: typeof window.openMemberAccessModal
    })`);

    const topFree = await clickAndVerify(
      client,
      `document.querySelector('.btn-top.btn-free')?.click(); true;`,
      `document.getElementById('s-input')?.classList.contains('active')`,
      'Top free button'
    );

    await evaluate(client, `if(window.gotoTop) window.gotoTop(); true;`);

    const topPaid = await clickAndVerify(
      client,
      `document.querySelector('.btn-top.btn-paid')?.click(); true;`,
      `document.getElementById('s-input')?.classList.contains('active') || document.getElementById('member-access-modal')?.classList.contains('on')`,
      'Top paid button'
    );

    await evaluate(client, `if(window.gotoTop) window.gotoTop(); true;`);

    const bottomFree = await clickAndVerify(
      client,
      `document.querySelector('#premium-entry .premium-entry-subbtn')?.click(); true;`,
      `document.getElementById('s-input')?.classList.contains('active')`,
      'Bottom free button'
    );

    await evaluate(client, `if(window.gotoTop) window.gotoTop(); true;`);

    const bottomPrimary = await clickAndVerify(
      client,
      `document.querySelector('#premium-entry .today-cta')?.click(); true;`,
      `document.getElementById('s-input')?.classList.contains('active') || document.getElementById('member-access-modal')?.classList.contains('on')`,
      'Bottom primary button'
    );

    const postState = await evaluate(client, `({
      activeScreen: [...document.querySelectorAll('.screen.active')].map(node=>node.id),
      progressWidth: document.getElementById('progress')?.style.width || '',
      modalOn: document.getElementById('member-access-modal')?.classList.contains('on') || false,
      premiumPrimaryText: document.querySelector('#premium-entry .today-cta')?.textContent?.trim() || '',
      premiumFreeText: document.querySelector('#premium-entry .premium-entry-subbtn')?.textContent?.trim() || ''
    })`);

    console.log(JSON.stringify({
      ok: true,
      initial,
      clicks: {
        topFree,
        topPaid,
        bottomFree,
        bottomPrimary,
      },
      postState,
    }, null, 2));
  } finally {
    client.close();
  }
}

main().catch(error => {
  console.error(JSON.stringify({
    ok: false,
    error: error?.message || String(error),
    stack: error?.stack || '',
  }, null, 2));
  process.exitCode = 1;
});
