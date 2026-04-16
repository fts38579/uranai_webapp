const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const ROOT = __dirname;
const PORT = Number.parseInt(process.argv[2] || process.env.SMOKE_TEST_PORT || '3116', 10);
const HOST = '127.0.0.1';
const BASE_URL = process.env.SMOKE_TEST_BASE_URL || `http://${HOST}:${PORT}`;
const AUTH_SESSION_COOKIE = 'uranai_auth_session';
const USER_ID = 'smoke_google_user';
const AUTH_SECRET = 'smoke-auth-secret';
const MEMBER_SECRET = 'smoke-member-secret';
const USE_EXISTING_SERVER = process.env.SMOKE_TEST_USE_EXISTING_SERVER === '1';
const TEST_IDENTITY = {
  fullname: 'Smoke Tester',
  gender: 'other',
  year: 1991,
  month: 6,
  day: 15,
};

function applyDotEnv(rootDir) {
  const envPath = path.join(rootDir, '.env');
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && value && !process.env[key]) process.env[key] = value;
  }
}

function toBase64Url(value) {
  return Buffer.from(String(value), 'utf8').toString('base64url');
}

function makeAuthCookie(userId) {
  const issuedAt = Date.now();
  const payload = {
    v: 1,
    sub: 'member',
    source: 'google',
    iat: issuedAt,
    exp: issuedAt + (24 * 60 * 60 * 1000),
    userId,
    googleSub: userId,
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(encodedPayload).digest('base64url');
  return `${AUTH_SESSION_COOKIE}=${encodeURIComponent(`${encodedPayload}.${signature}`)}`;
}

function makeRecord(id, theme, plan = 'free') {
  const now = new Date().toISOString();
  return {
    id,
    createdAt: now,
    updatedAt: now,
    plan,
    memberSnapshot: plan === 'paid',
    input: {
      fullname: TEST_IDENTITY.fullname,
      gender: TEST_IDENTITY.gender,
      year: TEST_IDENTITY.year,
      month: TEST_IDENTITY.month,
      day: TEST_IDENTITY.day,
      hour: 12,
      cat: '仕事',
      theme,
      reactionAnswers: {},
    },
    selLen: [18, 22, 35],
    selOrc: [31],
    outputs: {
      len: 'len',
      orc: 'orc',
      integration: 'integration',
    },
  };
}

async function waitForServer() {
  const started = Date.now();
  while (Date.now() - started < 15000) {
    try {
      const res = await fetch(`${BASE_URL}/api/health`, { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch (_error) {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('Server did not start in time.');
}

async function postJson(pathname, body, headers = {}) {
  const res = await fetch(`${BASE_URL}${pathname}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text || '{}');
  } catch (_error) {}
  return { res, data, text };
}

async function ensure(condition, message) {
  if (!condition) throw new Error(message);
}

async function writeTestUserRecord() {
  const userDir = path.join(ROOT, 'data', 'users');
  await fsp.mkdir(userDir, { recursive: true });
  const record = {
    userId: USER_ID,
    googleSub: USER_ID,
    email: 'smoke@example.com',
    emailVerified: true,
    name: 'Smoke User',
    givenName: 'Smoke',
    familyName: 'User',
    picture: '',
    locale: 'ja',
    stripeCustomerId: 'cus_smoke_user',
    stripeSubscriptionId: 'sub_smoke_user',
    stripeSubscriptionStatus: 'active',
    currentPeriodEnd: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString(),
    cancelAtPeriodEnd: false,
    latestCheckoutSessionId: 'cs_smoke_user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const filePath = path.join(userDir, `${USER_ID}.json`);
  await fsp.writeFile(filePath, JSON.stringify(record, null, 2), 'utf8');
  return filePath;
}

async function main() {
  applyDotEnv(ROOT);
  const env = {
    ...process.env,
    HOST,
    PORT: String(PORT),
    AUTH_SESSION_SECRET: AUTH_SECRET,
    MEMBER_SESSION_SECRET: MEMBER_SECRET,
  };

  const proc = USE_EXISTING_SERVER ? null : spawn(process.execPath, ['server.js', '--port', String(PORT)], {
    cwd: ROOT,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });

  let stdout = '';
  let stderr = '';
  if (proc) {
    proc.stdout.on('data', chunk => { stdout += chunk.toString('utf8'); });
    proc.stderr.on('data', chunk => { stderr += chunk.toString('utf8'); });
  }

  const cleanupPaths = [];
  try {
    const health = await waitForServer();
    await ensure(health && health.ok === true, 'Health check failed.');

    const html = await fetch(`${BASE_URL}/uranai-v5.html`).then(res => res.text());
    await ensure(html.includes('前回の続きから読む'), 'Top history card missing.');
    await ensure(html.includes('読み返しと記録'), 'Member vault card missing.');
    await ensure(html.includes('無料で見えた向きを、進路の判断材料まで落とし込む'), 'Premium entry missing.');

    await postJson('/api/vault/history/clear', { identity: TEST_IDENTITY });
    const anonRecord = makeRecord('smoke-anon-record', '匿名の履歴');
    const anonSave = await postJson('/api/vault/history/save', {
      identity: TEST_IDENTITY,
      record: anonRecord,
    });
    await ensure(anonSave.res.ok, `Anonymous vault save failed: ${anonSave.text}`);

    const anonQuery = await postJson('/api/vault/history/query', { identity: TEST_IDENTITY });
    await ensure(anonQuery.res.ok, `Anonymous vault query failed: ${anonQuery.text}`);
    await ensure(Array.isArray(anonQuery.data?.records) && anonQuery.data.records.some(record => record.id === anonRecord.id), 'Anonymous vault record was not returned.');

    const userFile = await writeTestUserRecord();
    cleanupPaths.push(userFile);
    const authCookie = makeAuthCookie(USER_ID);

    const memberStatusRes = await fetch(`${BASE_URL}/api/member/status`, {
      headers: { Cookie: authCookie },
    });
    const memberStatus = await memberStatusRes.json();
    await ensure(memberStatusRes.ok, 'Member status request failed.');
    await ensure(memberStatus.authLoggedIn === true, 'Google auth session was not recognized.');
    await ensure(memberStatus.userId === USER_ID, 'Google user id did not round-trip.');

    const migratedQuery = await postJson('/api/vault/history/query', { identity: TEST_IDENTITY }, { Cookie: authCookie });
    await ensure(migratedQuery.res.ok, `Google vault query failed: ${migratedQuery.text}`);
    await ensure(migratedQuery.data?.vaultMode === 'google-user', 'Vault did not switch to google-user mode.');
    await ensure(migratedQuery.data.records.some(record => record.id === anonRecord.id), 'Legacy profile history was not visible after Google binding.');

    const userRecord = makeRecord('smoke-google-record', 'Googleに紐づく履歴', 'paid');
    const userSave = await postJson('/api/vault/history/save', {
      record: userRecord,
    }, { Cookie: authCookie });
    await ensure(userSave.res.ok, `Google vault save failed: ${userSave.text}`);

    const userQuery = await postJson('/api/vault/history/query', {
      identity: TEST_IDENTITY,
    }, { Cookie: authCookie });
    await ensure(userQuery.res.ok, `Google vault re-query failed: ${userQuery.text}`);
    await ensure(userQuery.data.records.some(record => record.id === userRecord.id), 'Google-bound vault record was not returned.');
    await ensure(userQuery.data.records.some(record => record.id === anonRecord.id), 'Merged legacy record disappeared from Google-bound vault.');

    const clearResult = await postJson('/api/vault/history/clear', {
      identity: TEST_IDENTITY,
    }, { Cookie: authCookie });
    await ensure(clearResult.res.ok, `Vault clear failed: ${clearResult.text}`);

    const afterClear = await postJson('/api/vault/history/query', {
      identity: TEST_IDENTITY,
    }, { Cookie: authCookie });
    await ensure(afterClear.res.ok, `Post-clear query failed: ${afterClear.text}`);
    await ensure(Array.isArray(afterClear.data?.records) && afterClear.data.records.length === 0, 'Vault clear did not remove records.');

    console.log('SMOKE TEST PASSED');
    console.log(JSON.stringify({
      health,
      memberStatus: {
        authLoggedIn: memberStatus.authLoggedIn,
        active: memberStatus.active,
        userId: memberStatus.userId,
        subscriptionStatus: memberStatus.subscriptionStatus,
      },
      checks: {
        html: true,
        anonymousVault: true,
        googleBoundVault: true,
        clear: true,
      },
    }, null, 2));
  } finally {
    if (proc) proc.kill();
    for (const filePath of cleanupPaths) {
      try {
        await fsp.unlink(filePath);
      } catch (_error) {}
    }
    if (stdout.trim()) process.stderr.write(stdout);
    if (stderr.trim()) process.stderr.write(stderr);
  }
}

main().catch(error => {
  console.error('SMOKE TEST FAILED');
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
