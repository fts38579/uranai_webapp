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
  const aiResponses = [
    '■ 背景と現状\nいまは状況を一気に決め切るより、流れを見直す段階です。\n\n■ 核心の読み\n中心にあるのは迷いではなく、確認不足です。\n\n■ ズバリ次の行動\n今日中に確認したい条件を3つ書き出してください。',
    '■ 背景の流れ\n気持ちを整えるより先に、考えを言葉にすることが必要です。\n\n■ 本質の読み\n無理に前向きになるより、違和感の正体を見抜くほうが合っています。\n\n■ 整え方\n今日は判断保留にしても構いません。',
    '■ 最終結論\n急いで決めるより、条件を言語化してから動くほうが良い流れです。\n\n■ 判断の軸\n続けた先に意味が残るか、負担と見返りが釣り合うかを見てください。\n\n■ 行動計画\n1. 今日中に不安要素を3つ書く\n2. 明日、確認先を1つ決める\n3. 今週中に比較表を作る',
  ];
  let aiIndex = 0;
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
        if (href.includes('/api/vault/history/query')) return fakeJsonResponse({ ok: true, records: [] });
        if (href.includes('/api/vault/history/save')) return fakeJsonResponse({ ok: true });
        if (href.includes('/api/vault/history/clear')) return fakeJsonResponse({ ok: true });
        if (href.includes('/solar-term-boundaries.json')) return fakeJsonResponse({});
        if (href.includes('/api/ai/generate')) {
          const payload = aiResponses[Math.min(aiIndex, aiResponses.length - 1)];
          aiIndex += 1;
          return fakeJsonResponse({ content: [{ text: payload }] });
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
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const state = () => ({
    activeScreens: [...document.querySelectorAll('.screen.active')].map(node => node.id),
    lenCount: document.querySelectorAll('#len-cards-grid .result-card').length,
    orcCount: document.querySelectorAll('#orc-cards-grid .result-card').length,
    lenText: document.getElementById('r-len-block')?.textContent?.trim() || '',
    orcText: document.getElementById('r-orc-block')?.textContent?.trim() || '',
    integrationText: document.getElementById('r-integration')?.textContent?.trim() || '',
    shareVisible: document.getElementById('share-x-btn')?.style?.display || '',
  });

  const result = { steps: [], errors };

  await dom.window.startFlow('free');
  result.steps.push({ step: 'startFlowFree', state: state() });

  dom.window.skipInput();
  await wait(50);
  result.steps.push({ step: 'skipInput', state: state() });

  dom.window.stopLen();
  await wait(50);
  result.steps.push({ step: 'stopLen', state: state() });

  dom.window.goToOrc();
  await wait(50);
  result.steps.push({ step: 'goToOrc', state: state() });

  dom.window.stopOrc();
  await wait(50);
  result.steps.push({ step: 'stopOrc', state: state() });

  const orcCard = document.querySelector('#orc-card-grid .sel-card');
  if (orcCard) {
    orcCard.click();
    await wait(20);
  }
  result.steps.push({ step: 'selectOracle', selectedCount: document.getElementById('orc-sel-count')?.textContent || '', state: state() });

  dom.window.confirmOrcSelection();
  await wait(50);
  result.steps.push({ step: 'confirmOrcSelection', state: state() });

  dom.window.goToResult();
  await wait(1200);
  result.steps.push({ step: 'goToResult', state: state() });

  result.final = state();
  result.ok = result.final.activeScreens.includes('s-result')
    && result.final.lenText.includes('背景')
    && result.final.orcText.includes('背景')
    && result.final.integrationText.includes('最終結論');

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
