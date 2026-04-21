const http = require('http');
const https = require('https');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const VAULT_DIR = path.join(DATA_DIR, 'vault-history');
const MEMBER_DIR = path.join(DATA_DIR, 'member-access');
const STRIPE_EVENT_DIR = path.join(DATA_DIR, 'stripe-events');
const USER_DIR = path.join(DATA_DIR, 'users');
const LOG_DIR = path.join(DATA_DIR, 'logs');
const AI_USAGE_LOG_DIR = path.join(LOG_DIR, 'ai-usage');
const CLIENT_ERROR_LOG_DIR = path.join(LOG_DIR, 'client-errors');

function applyDotEnv(rootDir) {
  const envPath = path.join(rootDir, '.env');
  if (!fs.existsSync(envPath)) return;

  const raw = fs.readFileSync(envPath, 'utf8');
  raw.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex <= 0) return;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!key || !value) return;
    const current = String(process.env[key] || '').trim();
    const currentLooksPlaceholder = /replace-with|xxxxxxxx|your-|example|sample|dummy|changeme|todo/i.test(current);
    if (!current || currentLooksPlaceholder) {
      process.env[key] = value;
    }
  });
}

applyDotEnv(ROOT_DIR);

function normalizeEnvValue(value) {
  return String(value || '').trim();
}

function isPlaceholderEnvValue(value) {
  const normalized = normalizeEnvValue(value).toLowerCase();
  if (!normalized) return true;
  return /replace-with|xxxxxxxx|your-|example|sample|dummy|changeme|todo/.test(normalized);
}

function isConfiguredAnthropicKey(value) {
  const normalized = normalizeEnvValue(value);
  return /^sk-ant-[a-z0-9_-]{10,}$/i.test(normalized) && !isPlaceholderEnvValue(normalized);
}

function isConfiguredOpenAIKey(value) {
  const normalized = normalizeEnvValue(value);
  return /^sk-[a-z0-9_-]{10,}$/i.test(normalized) && !isPlaceholderEnvValue(normalized);
}

function isConfiguredGoogleClientId(value) {
  const normalized = normalizeEnvValue(value);
  return /\.apps\.googleusercontent\.com$/i.test(normalized) && !isPlaceholderEnvValue(normalized);
}

function isConfiguredStripeSecretKey(value) {
  const normalized = normalizeEnvValue(value);
  return /^sk_(test|live)_[a-z0-9_]+$/i.test(normalized) && !isPlaceholderEnvValue(normalized);
}

function isConfiguredStripeWebhookSecret(value) {
  const normalized = normalizeEnvValue(value);
  return /^whsec_[a-z0-9_]+$/i.test(normalized) && !isPlaceholderEnvValue(normalized);
}

function isConfiguredStripePriceId(value) {
  const normalized = normalizeEnvValue(value);
  return /^price_[a-z0-9_]+$/i.test(normalized) && !isPlaceholderEnvValue(normalized);
}

function isConfiguredAppSecret(value) {
  const normalized = normalizeEnvValue(value);
  return normalized.length >= 24 && !isPlaceholderEnvValue(normalized);
}

function readCliArg(flag) {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === flag) {
      return args[i + 1] || '';
    }
    if (args[i].startsWith(`${flag}=`)) {
      return args[i].slice(flag.length + 1);
    }
  }
  return '';
}

const HOST = readCliArg('--host') || process.env.HOST || '127.0.0.1';
const PORT = parseInt(readCliArg('--port') || process.env.PORT || '3000', 10);
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const STRIPE_PRICE_ID_MONTHLY = process.env.STRIPE_PRICE_ID_MONTHLY || '';
const STRIPE_SUCCESS_PATH = process.env.STRIPE_SUCCESS_PATH || '/uranai-v5.html?stripe_success=1&session_id={CHECKOUT_SESSION_ID}';
const STRIPE_CANCEL_PATH = process.env.STRIPE_CANCEL_PATH || '/uranai-v5.html?stripe_cancel=1';
const STRIPE_PORTAL_RETURN_PATH = process.env.STRIPE_PORTAL_RETURN_PATH || '/uranai-v5.html';
const STRIPE_SUBSCRIPTION_NAME = process.env.STRIPE_SUBSCRIPTION_NAME || '深掘り鑑定メンバー';
const MEMBER_ACCESS_CODES = new Set(
  String(process.env.MEMBER_ACCESS_CODE || process.env.MEMBER_ACCESS_CODES || '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean)
);
const DEFAULT_DEVELOPER_ACCESS_EMAILS = ['tekechannnel@gmail.com', 'fts38579@gmail.com'];
const DEVELOPER_ACCESS_EMAILS = new Set(
  [...DEFAULT_DEVELOPER_ACCESS_EMAILS, ...String(process.env.DEVELOPER_ACCESS_EMAILS || '')
    .split(',')
    .map(value => value.trim().toLowerCase())
    .filter(Boolean)]
);
const MEMBER_SESSION_COOKIE = 'uranai_member_session';
const AUTH_SESSION_COOKIE = 'uranai_auth_session';
const MEMBER_SESSION_DAYS = Math.max(1, parseInt(process.env.MEMBER_SESSION_DAYS || '30', 10) || 30);
const AUTH_SESSION_DAYS = Math.max(1, parseInt(process.env.AUTH_SESSION_DAYS || String(MEMBER_SESSION_DAYS), 10) || MEMBER_SESSION_DAYS);
const MEMBER_SESSION_SECRET = process.env.MEMBER_SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const AUTH_SESSION_SECRET = process.env.AUTH_SESSION_SECRET || process.env.MEMBER_SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const ANTHROPIC_KEY_CONFIGURED = isConfiguredAnthropicKey(ANTHROPIC_API_KEY);
const OPENAI_KEY_CONFIGURED = isConfiguredOpenAIKey(OPENAI_API_KEY);
const GOOGLE_CLIENT_CONFIGURED = isConfiguredGoogleClientId(GOOGLE_CLIENT_ID);
const STRIPE_SECRET_CONFIGURED = isConfiguredStripeSecretKey(STRIPE_SECRET_KEY);
const STRIPE_WEBHOOK_CONFIGURED = isConfiguredStripeWebhookSecret(STRIPE_WEBHOOK_SECRET);
const STRIPE_PRICE_CONFIGURED = isConfiguredStripePriceId(STRIPE_PRICE_ID_MONTHLY);
const MEMBER_SESSION_PERSISTENT = isConfiguredAppSecret(process.env.MEMBER_SESSION_SECRET || '');
const AUTH_SESSION_PERSISTENT = isConfiguredAppSecret(process.env.AUTH_SESSION_SECRET || process.env.MEMBER_SESSION_SECRET || '');
const MAX_JSON_BYTES = 1024 * 1024;
const STRIPE_WEBHOOK_TOLERANCE_SEC = Math.max(60, parseInt(process.env.STRIPE_WEBHOOK_TOLERANCE_SEC || '300', 10) || 300);
const LOCAL_HOSTS = new Set(['127.0.0.1', 'localhost', '::1', '[::1]']);
const GOOGLE_ISSUERS = new Set(['accounts.google.com', 'https://accounts.google.com']);
let GOOGLE_JWK_CACHE = { expiresAt: 0, keys: [] };
const RATE_LIMIT_STATE = new Map();
const RATE_LIMIT_RULES = {
  ai: { windowMs: 10 * 60 * 1000, max: 24 },
  google_auth: { windowMs: 10 * 60 * 1000, max: 12 },
  member_session: { windowMs: 10 * 60 * 1000, max: 20 },
  stripe_checkout: { windowMs: 10 * 60 * 1000, max: 8 },
  stripe_portal: { windowMs: 10 * 60 * 1000, max: 20 },
  client_log: { windowMs: 10 * 60 * 1000, max: 80 },
};
const PAID_MODELS = new Set([
  'claude-opus-4-6',
  'claude-opus-4-1',
  'claude-opus-4-1-20250805',
  'claude-opus-4-0',
  'claude-opus-4-20250514',
  'claude-sonnet-4-20250514',
  'gpt-5.4',
  'gpt-5.4-pro',
]);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const ALLOWED_MODELS = {
  anthropic: new Set([
    'claude-opus-4-6',
    'claude-opus-4-1',
    'claude-opus-4-1-20250805',
    'claude-opus-4-0',
    'claude-opus-4-20250514',
    'claude-sonnet-4-20250514',
    'claude-3-5-haiku-latest',
    'claude-3-5-haiku-20241022',
    'claude-haiku-4-5-20251001',
  ]),
  openai: new Set([
    'gpt-5.4',
    'gpt-5.4-pro',
    'gpt-5.4-mini',
    'gpt-5.4-nano',
    'gpt-5.1',
    'gpt-5',
    'gpt-5-mini',
    'gpt-5-nano',
  ]),
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(JSON.stringify(payload));
}

function sendText(res, statusCode, body, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(body);
}

function getAllowedCorsOrigin(req) {
  const origin = String(req?.headers?.origin || '').trim();
  if (!origin) return '';
  if (origin === 'null') return 'null';
  try {
    const url = new URL(origin);
    if (LOCAL_HOSTS.has(String(url.hostname || '').toLowerCase())) return origin;
    const requestOrigin = getRequestOrigin(req);
    if (requestOrigin && requestOrigin === origin) return origin;
  } catch (_error) {}
  return '';
}

function applyCorsHeaders(req, res) {
  const origin = getAllowedCorsOrigin(req);
  if (!origin) return;
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Uranai-Developer-Email');
  res.setHeader('Vary', 'Origin');
}

function getRequestHost(req) {
  const hostHeader = String(req?.headers?.host || '').trim().toLowerCase();
  return hostHeader.split(':')[0];
}

function isLocalRequest(req) {
  return LOCAL_HOSTS.has(getRequestHost(req));
}

function getClientAddress(req) {
  const forwarded = String(req?.headers?.['x-forwarded-for'] || '').trim();
  if (forwarded) return forwarded.split(',')[0].trim();
  return String(req?.socket?.remoteAddress || '').trim() || 'unknown';
}

function consumeRateLimit(req, bucket) {
  if (isLocalRequest(req)) return { ok: true, remaining: 999 };
  const rule = RATE_LIMIT_RULES[bucket];
  if (!rule) return { ok: true, remaining: 999 };
  const now = Date.now();
  const key = `${bucket}:${getClientAddress(req)}`;
  const entries = (RATE_LIMIT_STATE.get(key) || []).filter(timestamp => now - timestamp < rule.windowMs);
  if (entries.length >= rule.max) {
    const retryAfterMs = Math.max(1000, rule.windowMs - (now - entries[0]));
    RATE_LIMIT_STATE.set(key, entries);
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.ceil(retryAfterMs / 1000),
    };
  }
  entries.push(now);
  RATE_LIMIT_STATE.set(key, entries);
  return {
    ok: true,
    remaining: Math.max(0, rule.max - entries.length),
  };
}

function sendRateLimitExceeded(res, result, message) {
  const retryAfter = Math.max(1, Number(result?.retryAfterSec || 60) || 60);
  res.setHeader('Retry-After', String(retryAfter));
  sendJson(res, 429, {
    error: 'RATE_LIMITED',
    message: message || 'Too many requests. Please retry later.',
    retryAfterSec: retryAfter,
  });
}

function isPaidModel(model) {
  return PAID_MODELS.has(String(model || '').trim());
}

function getRequestProto(req) {
  const forwarded = String(req?.headers?.['x-forwarded-proto'] || '').trim().toLowerCase();
  if (forwarded) return forwarded.split(',')[0].trim() || 'http';
  return req?.socket?.encrypted ? 'https' : 'http';
}

function getRequestOrigin(req) {
  const host = String(req?.headers?.['x-forwarded-host'] || req?.headers?.host || '').trim();
  if (!host) return '';
  return `${getRequestProto(req)}://${host}`;
}

function makeAbsoluteUrl(req, pathValue) {
  const origin = getRequestOrigin(req);
  if (!origin) return pathValue || '';
  if (String(pathValue || '').startsWith('http://') || String(pathValue || '').startsWith('https://')) {
    return String(pathValue);
  }
  return new URL(String(pathValue || '/'), origin).toString();
}

function stripeReady() {
  return !!(STRIPE_SECRET_CONFIGURED && STRIPE_PRICE_CONFIGURED);
}

function stripePortalReady() {
  return !!STRIPE_SECRET_CONFIGURED;
}

function stripeWebhookReady() {
  return !!(STRIPE_SECRET_CONFIGURED && STRIPE_WEBHOOK_CONFIGURED);
}

function getRuntimeSetupStatus(req) {
  const issues = [];
  if (!OPENAI_KEY_CONFIGURED) issues.push('OPENAI_API_KEY');
  if (!ANTHROPIC_KEY_CONFIGURED) issues.push('ANTHROPIC_API_KEY');
  if (!GOOGLE_CLIENT_CONFIGURED) issues.push('GOOGLE_CLIENT_ID');
  if (!STRIPE_SECRET_CONFIGURED) issues.push('STRIPE_SECRET_KEY');
  if (!STRIPE_PRICE_CONFIGURED) issues.push('STRIPE_PRICE_ID_MONTHLY');
  if (!STRIPE_WEBHOOK_CONFIGURED) issues.push('STRIPE_WEBHOOK_SECRET');
  if (!MEMBER_SESSION_PERSISTENT) issues.push('MEMBER_SESSION_SECRET');
  if (!AUTH_SESSION_PERSISTENT) issues.push('AUTH_SESSION_SECRET');
  return {
    googleClientConfigured: GOOGLE_CLIENT_CONFIGURED,
    stripeSecretConfigured: STRIPE_SECRET_CONFIGURED,
    stripePriceConfigured: STRIPE_PRICE_CONFIGURED,
    stripeWebhookConfigured: STRIPE_WEBHOOK_CONFIGURED,
    memberSessionPersistent: MEMBER_SESSION_PERSISTENT,
    authSessionPersistent: AUTH_SESSION_PERSISTENT,
    productionReady: issues.length === 0,
    issues,
    webhookPath: '/api/stripe/webhook',
    webhookUrl: makeAbsoluteUrl(req, '/api/stripe/webhook'),
    checkoutSuccessUrl: makeAbsoluteUrl(req, STRIPE_SUCCESS_PATH),
    checkoutCancelUrl: makeAbsoluteUrl(req, STRIPE_CANCEL_PATH),
    customerPortalReturnUrl: makeAbsoluteUrl(req, STRIPE_PORTAL_RETURN_PATH),
  };
}

function safeCompareText(left, right) {
  const leftBuffer = Buffer.from(String(left || ''), 'utf8');
  const rightBuffer = Buffer.from(String(right || ''), 'utf8');
  if (!leftBuffer.length || leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function toBase64Url(value) {
  return Buffer.from(String(value || ''), 'utf8').toString('base64url');
}

function fromBase64Url(value) {
  return Buffer.from(String(value || ''), 'base64url').toString('utf8');
}

function parseCookies(req) {
  const header = String(req?.headers?.cookie || '');
  return header.split(';').reduce((acc, entry) => {
    const [rawKey, ...rest] = entry.split('=');
    const key = String(rawKey || '').trim();
    if (!key) return acc;
    acc[key] = decodeURIComponent(rest.join('=').trim());
    return acc;
  }, {});
}

function appendSetCookie(res, cookieValue) {
  const current = res.getHeader('Set-Cookie');
  if (!current) {
    res.setHeader('Set-Cookie', cookieValue);
    return;
  }
  const next = Array.isArray(current) ? [...current, cookieValue] : [current, cookieValue];
  res.setHeader('Set-Cookie', next);
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`Path=${options.path || '/'}`);
  if (options.maxAge != null) parts.push(`Max-Age=${Math.max(0, Math.floor(options.maxAge))}`);
  if (options.httpOnly !== false) parts.push('HttpOnly');
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.secure) parts.push('Secure');
  if (options.expires instanceof Date) parts.push(`Expires=${options.expires.toUTCString()}`);
  return parts.join('; ');
}

function signMemberToken(encodedPayload) {
  return crypto.createHmac('sha256', MEMBER_SESSION_SECRET).update(encodedPayload).digest('base64url');
}

function signAuthToken(encodedPayload) {
  return crypto.createHmac('sha256', AUTH_SESSION_SECRET).update(encodedPayload).digest('base64url');
}

function createMemberSessionPayload(source, maxAgeSeconds, claims = {}) {
  const issuedAt = Date.now();
  return {
    v: 1,
    sub: 'member',
    source,
    iat: issuedAt,
    exp: issuedAt + (maxAgeSeconds * 1000),
    ...claims,
  };
}

function issueMemberSession(res, options = {}) {
  const source = options.source || 'access_code';
  const maxAgeSeconds = Math.max(60, Math.floor(options.maxAgeSeconds || (MEMBER_SESSION_DAYS * 24 * 60 * 60)));
  const payload = createMemberSessionPayload(source, maxAgeSeconds, options.claims || {});
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = signMemberToken(encodedPayload);
  const token = `${encodedPayload}.${signature}`;
  appendSetCookie(res, serializeCookie(MEMBER_SESSION_COOKIE, token, {
    path: '/',
    maxAge: maxAgeSeconds,
    sameSite: 'Lax',
    httpOnly: true,
  }));
  return payload;
}

function clearMemberSession(res) {
  appendSetCookie(res, serializeCookie(MEMBER_SESSION_COOKIE, '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    sameSite: 'Lax',
    httpOnly: true,
  }));
}

function issueAuthSession(res, options = {}) {
  const source = options.source || 'google';
  const maxAgeSeconds = Math.max(60, Math.floor(options.maxAgeSeconds || (AUTH_SESSION_DAYS * 24 * 60 * 60)));
  const payload = createMemberSessionPayload(source, maxAgeSeconds, options.claims || {});
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = signAuthToken(encodedPayload);
  const token = `${encodedPayload}.${signature}`;
  appendSetCookie(res, serializeCookie(AUTH_SESSION_COOKIE, token, {
    path: '/',
    maxAge: maxAgeSeconds,
    sameSite: 'Lax',
    httpOnly: true,
  }));
  return payload;
}

function clearAuthSession(res) {
  appendSetCookie(res, serializeCookie(AUTH_SESSION_COOKIE, '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    sameSite: 'Lax',
    httpOnly: true,
  }));
}

function readMemberSession(req) {
  const token = parseCookies(req)[MEMBER_SESSION_COOKIE];
  if (!token) return null;
  const [encodedPayload, signature] = String(token).split('.');
  if (!encodedPayload || !signature) return null;
  const expectedSignature = signMemberToken(encodedPayload);
  if (!safeCompareText(signature, expectedSignature)) return null;
  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload));
    if (payload?.sub !== 'member') return null;
    if (!payload?.exp || Number(payload.exp) <= Date.now()) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

function readAuthSession(req) {
  const token = parseCookies(req)[AUTH_SESSION_COOKIE];
  if (!token) return null;
  const [encodedPayload, signature] = String(token).split('.');
  if (!encodedPayload || !signature) return null;
  const expectedSignature = signAuthToken(encodedPayload);
  if (!safeCompareText(signature, expectedSignature)) return null;
  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload));
    if (!payload?.sub || payload.sub !== 'member') return null;
    if (!payload?.exp || Number(payload.exp) <= Date.now()) return null;
    return payload;
  } catch (_error) {
    return null;
  }
}

function normalizeMemberId(memberId) {
  const value = String(memberId || '').trim();
  if (!value || !/^[A-Za-z0-9_-]{3,80}$/.test(value)) return '';
  return value;
}

function getIsoDayStamp(dateValue = new Date()) {
  return new Date(dateValue).toISOString().slice(0, 10);
}

function clipText(value, maxLength = 400) {
  const normalized = String(value || '').replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength)}…` : normalized;
}

function getMemberFilePath(memberId) {
  const safeId = normalizeMemberId(memberId);
  if (!safeId) return '';
  return path.join(MEMBER_DIR, `${safeId}.json`);
}

async function readMemberRecord(memberId) {
  const filePath = getMemberFilePath(memberId);
  if (!filePath) return null;
  try {
    const raw = await fsp.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw || '{}');
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (error) {
    if (error && error.code === 'ENOENT') return null;
    throw error;
  }
}

async function writeMemberRecord(memberId, record) {
  const filePath = getMemberFilePath(memberId);
  if (!filePath) throw new Error('INVALID_MEMBER_ID');
  await ensureDir(MEMBER_DIR);
  await fsp.writeFile(filePath, JSON.stringify(record, null, 2), 'utf8');
}

async function listMemberRecords() {
  try {
    const entries = await fsp.readdir(MEMBER_DIR, { withFileTypes: true });
    const items = [];
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
      const fullPath = path.join(MEMBER_DIR, entry.name);
      try {
        const raw = await fsp.readFile(fullPath, 'utf8');
        const parsed = JSON.parse(raw || '{}');
        if (parsed && typeof parsed === 'object') items.push(parsed);
      } catch (_error) {}
    }
    return items;
  } catch (error) {
    if (error && error.code === 'ENOENT') return [];
    throw error;
  }
}

async function findMemberRecordBySubscriptionId(subscriptionId) {
  const safeSubId = String(subscriptionId || '').trim();
  if (!safeSubId) return null;
  const records = await listMemberRecords();
  return records.find(record => String(record?.stripeSubscriptionId || '').trim() === safeSubId) || null;
}

function normalizeUserId(userId) {
  const value = String(userId || '').trim();
  if (!value || !/^[A-Za-z0-9._-]{3,128}$/.test(value)) return '';
  return value;
}

function getUserFilePath(userId) {
  const safeId = normalizeUserId(userId);
  if (!safeId) return '';
  return path.join(USER_DIR, `${safeId}.json`);
}

async function readUserRecord(userId) {
  const filePath = getUserFilePath(userId);
  if (!filePath) return null;
  try {
    const raw = await fsp.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw || '{}');
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (error) {
    if (error && error.code === 'ENOENT') return null;
    throw error;
  }
}

async function writeUserRecord(userId, record) {
  const filePath = getUserFilePath(userId);
  if (!filePath) throw new Error('INVALID_USER_ID');
  await ensureDir(USER_DIR);
  await fsp.writeFile(filePath, JSON.stringify(record, null, 2), 'utf8');
}

async function listUserRecords() {
  try {
    const entries = await fsp.readdir(USER_DIR, { withFileTypes: true });
    const items = [];
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
      const fullPath = path.join(USER_DIR, entry.name);
      try {
        const raw = await fsp.readFile(fullPath, 'utf8');
        const parsed = JSON.parse(raw || '{}');
        if (parsed && typeof parsed === 'object') items.push(parsed);
      } catch (_error) {}
    }
    return items;
  } catch (error) {
    if (error && error.code === 'ENOENT') return [];
    throw error;
  }
}

async function findUserRecordByStripeCustomerId(customerId) {
  const safeId = String(customerId || '').trim();
  if (!safeId) return null;
  const users = await listUserRecords();
  return users.find(user => String(user?.stripeCustomerId || '').trim() === safeId) || null;
}

async function findUserRecordByStripeSubscriptionId(subscriptionId) {
  const safeId = String(subscriptionId || '').trim();
  if (!safeId) return null;
  const users = await listUserRecords();
  return users.find(user => String(user?.stripeSubscriptionId || '').trim() === safeId) || null;
}

async function findUserRecordByEmail(email) {
  const normalized = normalizeCustomerEmail(email);
  if (!normalized) return null;
  const users = await listUserRecords();
  return users.find(user => normalizeCustomerEmail(user?.email || '') === normalized) || null;
}

function normalizeGoogleProfile(profile = {}) {
  const sub = normalizeUserId(profile.sub);
  if (!sub) return null;
  return {
    userId: sub,
    googleSub: sub,
    email: normalizeCustomerEmail(profile.email || ''),
    emailVerified: !!profile.email_verified,
    name: String(profile.name || '').trim(),
    givenName: String(profile.given_name || '').trim(),
    familyName: String(profile.family_name || '').trim(),
    picture: String(profile.picture || '').trim(),
    locale: String(profile.locale || '').trim(),
  };
}

function buildUserRecordFromGoogleProfile(profile, existing = null) {
  const safeProfile = normalizeGoogleProfile(profile);
  if (!safeProfile) throw new Error('INVALID_GOOGLE_PROFILE');
  const now = new Date().toISOString();
  return {
    userId: safeProfile.userId,
    googleSub: safeProfile.googleSub,
    email: safeProfile.email || existing?.email || '',
    emailVerified: safeProfile.emailVerified,
    name: safeProfile.name || existing?.name || '',
    givenName: safeProfile.givenName || existing?.givenName || '',
    familyName: safeProfile.familyName || existing?.familyName || '',
    picture: safeProfile.picture || existing?.picture || '',
    locale: safeProfile.locale || existing?.locale || '',
    stripeCustomerId: existing?.stripeCustomerId || '',
    stripeSubscriptionId: existing?.stripeSubscriptionId || '',
    stripeSubscriptionStatus: existing?.stripeSubscriptionStatus || '',
    currentPeriodEnd: existing?.currentPeriodEnd || '',
    cancelAtPeriodEnd: !!existing?.cancelAtPeriodEnd,
    latestCheckoutSessionId: existing?.latestCheckoutSessionId || '',
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

function normalizeCustomerEmail(email) {
  const value = String(email || '').trim().toLowerCase();
  return value.includes('@') ? value : '';
}

function readDeveloperEmailFromHeader(req) {
  if (!isLocalRequest(req)) return '';
  const email = normalizeCustomerEmail(req?.headers?.['x-uranai-developer-email'] || '');
  return emailHasDeveloperAccess(email) ? email : '';
}

function normalizeStripeSubscriptionStatus(status) {
  return String(status || '').trim().toLowerCase();
}

function stripeSubscriptionGrantsAccess(status) {
  return new Set(['active', 'trialing']).has(normalizeStripeSubscriptionStatus(status));
}

function emailHasDeveloperAccess(email) {
  const normalized = normalizeCustomerEmail(email);
  return !!(normalized && DEVELOPER_ACCESS_EMAILS.has(normalized));
}

function userRecordHasDeveloperAccess(userRecord) {
  return !!(userRecord && userRecord.emailVerified && emailHasDeveloperAccess(userRecord.email));
}

async function ensureDeveloperUserRecord(email, name = '') {
  const normalizedEmail = normalizeCustomerEmail(email);
  if (!normalizedEmail || !emailHasDeveloperAccess(normalizedEmail)) return null;
  const existingByEmail = await findUserRecordByEmail(normalizedEmail);
  if (existingByEmail?.userId) {
    if (!existingByEmail.emailVerified) {
      const next = {
        ...existingByEmail,
        emailVerified: true,
        updatedAt: new Date().toISOString(),
      };
      await writeUserRecord(existingByEmail.userId, next);
      return next;
    }
    return existingByEmail;
  }
  const stableId = `dev_${crypto.createHash('sha256').update(normalizedEmail).digest('hex').slice(0, 24)}`;
  const now = new Date().toISOString();
  const record = {
    userId: stableId,
    googleSub: stableId,
    email: normalizedEmail,
    emailVerified: true,
    name: String(name || '').trim() || normalizedEmail,
    givenName: '',
    familyName: '',
    picture: '',
    locale: 'ja',
    stripeCustomerId: '',
    stripeSubscriptionId: '',
    stripeSubscriptionStatus: '',
    currentPeriodEnd: '',
    cancelAtPeriodEnd: false,
    latestCheckoutSessionId: '',
    createdAt: now,
    updatedAt: now,
  };
  await writeUserRecord(stableId, record);
  return record;
}

function buildMemberRecordFromStripe(data = {}, existing = null) {
  const now = new Date().toISOString();
  const customerId = String(data.customerId || existing?.customerId || existing?.stripeCustomerId || '').trim();
  const subscriptionId = String(data.subscriptionId || existing?.stripeSubscriptionId || '').trim();
  const subscriptionStatus = normalizeStripeSubscriptionStatus(data.subscriptionStatus || existing?.subscriptionStatus || '');
  return {
    memberId: customerId,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    stripeSubscriptionStatus: subscriptionStatus,
    customerEmail: normalizeCustomerEmail(data.customerEmail || existing?.customerEmail || ''),
    customerName: String(data.customerName || existing?.customerName || '').trim(),
    latestCheckoutSessionId: String(data.checkoutSessionId || existing?.latestCheckoutSessionId || '').trim(),
    productLabel: String(data.productLabel || existing?.productLabel || STRIPE_SUBSCRIPTION_NAME).trim(),
    currentPeriodEnd: data.currentPeriodEnd || existing?.currentPeriodEnd || '',
    cancelAtPeriodEnd: !!(data.cancelAtPeriodEnd ?? existing?.cancelAtPeriodEnd),
    source: String(data.source || existing?.source || 'stripe').trim(),
    active: stripeSubscriptionGrantsAccess(subscriptionStatus),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

function buildUserRecordFromStripe(data = {}, existing = null) {
  const safeUserId = normalizeUserId(data.userId || existing?.userId || existing?.googleSub || '');
  if (!safeUserId) return null;
  const now = new Date().toISOString();
  const subscriptionStatus = normalizeStripeSubscriptionStatus(data.subscriptionStatus || existing?.stripeSubscriptionStatus || '');
  return {
    userId: safeUserId,
    googleSub: safeUserId,
    email: normalizeCustomerEmail(data.customerEmail || existing?.email || ''),
    emailVerified: existing?.emailVerified ?? true,
    name: String(data.customerName || existing?.name || '').trim(),
    givenName: existing?.givenName || '',
    familyName: existing?.familyName || '',
    picture: existing?.picture || '',
    locale: existing?.locale || '',
    stripeCustomerId: String(data.customerId || existing?.stripeCustomerId || '').trim(),
    stripeSubscriptionId: String(data.subscriptionId || existing?.stripeSubscriptionId || '').trim(),
    stripeSubscriptionStatus: subscriptionStatus,
    currentPeriodEnd: data.currentPeriodEnd || existing?.currentPeriodEnd || '',
    cancelAtPeriodEnd: !!(data.cancelAtPeriodEnd ?? existing?.cancelAtPeriodEnd),
    latestCheckoutSessionId: String(data.checkoutSessionId || existing?.latestCheckoutSessionId || '').trim(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

async function buildMemberStatus(req, sessionPayload = null) {
  const hasSessionOverrides = !!(sessionPayload && typeof sessionPayload === 'object' && (
    Object.prototype.hasOwnProperty.call(sessionPayload, 'memberSession')
    || Object.prototype.hasOwnProperty.call(sessionPayload, 'authSession')
  ));
  const memberSession = hasSessionOverrides
    ? (Object.prototype.hasOwnProperty.call(sessionPayload, 'memberSession') ? sessionPayload.memberSession : readMemberSession(req))
    : (sessionPayload || readMemberSession(req));
  const authSession = hasSessionOverrides
    ? (Object.prototype.hasOwnProperty.call(sessionPayload, 'authSession') ? sessionPayload.authSession : readAuthSession(req))
    : readAuthSession(req);
  const userRecord = authSession?.userId ? await readUserRecord(authSession.userId) : null;
  const memberRecord = userRecord?.stripeCustomerId ? await readMemberRecord(userRecord.stripeCustomerId) : null;
  const headerDeveloperEmail = !userRecord ? readDeveloperEmailFromHeader(req) : '';
  const headerDeveloperRecord = headerDeveloperEmail ? (await findUserRecordByEmail(headerDeveloperEmail)) : null;
  const stripeStatus = normalizeStripeSubscriptionStatus(userRecord?.stripeSubscriptionStatus || memberRecord?.stripeSubscriptionStatus || '');
  const authLoggedIn = !!(authSession && userRecord) || !!headerDeveloperEmail;
  const developerAccess = (authLoggedIn && userRecordHasDeveloperAccess(userRecord)) || !!headerDeveloperEmail;
  const hasStripeAccess = authLoggedIn && stripeSubscriptionGrantsAccess(stripeStatus);
  const hasLocalPreview = !!(memberSession && memberSession.source === 'local_preview' && isLocalRequest(req));
  const hasAccessCode = !!(memberSession && memberSession.source === 'access_code');
  const active = developerAccess || hasLocalPreview || hasAccessCode || hasStripeAccess;
  const source = developerAccess
    ? 'developer'
    : hasLocalPreview
    ? 'local_preview'
    : hasAccessCode
      ? 'access_code'
      : hasStripeAccess
        ? 'stripe'
        : (authLoggedIn ? 'google' : '');
  const expiresAt = hasLocalPreview || hasAccessCode
    ? (memberSession?.exp ? new Date(memberSession.exp).toISOString() : '')
    : (authSession?.exp ? new Date(authSession.exp).toISOString() : '');
  return {
    ok: true,
    active,
    source,
    expiresAt,
    localTestMode: isLocalRequest(req),
    codeConfigured: MEMBER_ACCESS_CODES.size > 0,
    sessionPersistent: MEMBER_SESSION_PERSISTENT,
    authLoggedIn,
    authProvider: authLoggedIn ? (developerAccess ? 'developer' : 'google') : '',
    authSessionPersistent: AUTH_SESSION_PERSISTENT,
    developerAccess,
    googleClientConfigured: GOOGLE_CLIENT_CONFIGURED,
    googleClientId: GOOGLE_CLIENT_CONFIGURED ? GOOGLE_CLIENT_ID : '',
    userId: userRecord?.userId || headerDeveloperRecord?.userId || '',
    userName: userRecord?.name || headerDeveloperRecord?.name || '',
    userEmail: userRecord?.email || headerDeveloperEmail || '',
    userPicture: userRecord?.picture || '',
    stripeEnabled: stripeReady(),
    stripeCheckoutReady: stripeReady(),
    stripePortalReady: stripePortalReady(),
    stripeWebhookReady: stripeWebhookReady(),
    subscriptionStatus: stripeStatus,
    customerEmail: userRecord?.email || headerDeveloperEmail || memberRecord?.customerEmail || '',
    customerName: userRecord?.name || headerDeveloperRecord?.name || memberRecord?.customerName || '',
    productLabel: memberRecord?.productLabel || STRIPE_SUBSCRIPTION_NAME,
    currentPeriodEnd: userRecord?.currentPeriodEnd || memberRecord?.currentPeriodEnd || '',
    cancelAtPeriodEnd: !!(userRecord?.cancelAtPeriodEnd ?? memberRecord?.cancelAtPeriodEnd),
    manageBillingAvailable: !!(authLoggedIn && userRecord?.stripeCustomerId && stripePortalReady()),
  };
}

async function hasPaidAccess(req) {
  if (readDeveloperEmailFromHeader(req)) return true;
  const memberSession = readMemberSession(req);
  if (memberSession?.source === 'local_preview') return isLocalRequest(req);
  if (memberSession?.source === 'access_code') return true;
  const authSession = readAuthSession(req);
  if (!authSession?.userId) return false;
  const userRecord = await readUserRecord(authSession.userId);
  if (userRecordHasDeveloperAccess(userRecord)) return true;
  return !!(userRecord && stripeSubscriptionGrantsAccess(userRecord.stripeSubscriptionStatus));
}

async function ensureDir(dirPath) {
  await fsp.mkdir(dirPath, { recursive: true });
}

async function appendJsonlRecord(dirPath, prefix, record) {
  await ensureDir(dirPath);
  const filePath = path.join(dirPath, `${prefix}-${getIsoDayStamp()}.jsonl`);
  await fsp.appendFile(filePath, `${JSON.stringify(record)}\n`, 'utf8');
}

function extractUsageMetrics(provider, raw) {
  if (provider === 'anthropic') {
    const usage = raw?.usage || {};
    return {
      inputTokens: Number(usage?.input_tokens || 0) || 0,
      outputTokens: Number(usage?.output_tokens || 0) || 0,
      cacheReadInputTokens: Number(usage?.cache_read_input_tokens || 0) || 0,
      cacheCreationInputTokens: Number(usage?.cache_creation_input_tokens || 0) || 0,
    };
  }
  if (provider === 'openai') {
    const usage = raw?.usage || {};
    return {
      inputTokens: Number(usage?.input_tokens || 0) || 0,
      outputTokens: Number(usage?.output_tokens || 0) || 0,
      totalTokens: Number(usage?.total_tokens || 0) || 0,
    };
  }
  return {};
}

async function writeAiUsageLog(entry) {
  await appendJsonlRecord(AI_USAGE_LOG_DIR, 'ai-usage', entry);
}

async function writeClientErrorLog(entry) {
  await appendJsonlRecord(CLIENT_ERROR_LOG_DIR, 'client-errors', entry);
}

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    let size = 0;

    req.setEncoding('utf8');
    req.on('data', chunk => {
      size += Buffer.byteLength(chunk);
      if (size > MAX_JSON_BYTES) {
        reject(new Error('BODY_TOO_LARGE'));
        req.destroy();
        return;
      }
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch (error) {
        reject(new Error('INVALID_JSON'));
      }
    });
    req.on('error', reject);
  });
}

async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_JSON_BYTES) {
        reject(new Error('BODY_TOO_LARGE'));
        req.destroy();
        return;
      }
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function getAllowedStaticPath(urlPath) {
  const pathname = decodeURIComponent((urlPath || '/').split('?')[0]);
  if (pathname === '/' || pathname === '/uranai-v5.html') {
    return path.join(ROOT_DIR, 'uranai-v5.html');
  }
  if (pathname === '/app.js') {
    return path.join(ROOT_DIR, 'app.js');
  }
  if (pathname === '/solar-term-boundaries.json') {
    return path.join(ROOT_DIR, 'solar-term-boundaries.json');
  }
  if (!pathname.startsWith('/images/')) return null;

  const relativePath = pathname.replace(/^\/+/, '');
  const resolvedPath = path.resolve(ROOT_DIR, relativePath);
  const imagesRoot = path.resolve(ROOT_DIR, 'images');
  if (!resolvedPath.startsWith(imagesRoot)) return null;
  return resolvedPath;
}

function pathnameIsImage(urlPath) {
  const pathname = decodeURIComponent((urlPath || '').split('?')[0]);
  return pathname.startsWith('/images/');
}

async function serveStatic(req, res) {
  const filePath = getAllowedStaticPath(req.url);
  if (!filePath) {
    sendText(res, 404, 'Not Found');
    return;
  }

  try {
    const stat = await fsp.stat(filePath);
    if (!stat.isFile()) {
      sendText(res, 404, 'Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': pathnameIsImage(req.url) ? 'public, max-age=86400' : 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      sendText(res, 404, 'Not Found');
      return;
    }
    sendText(res, 500, 'Internal Server Error');
  }
}

function normalizeVaultIdentity(identity) {
  const raw = identity && typeof identity === 'object' ? identity : {};
  const fullname = typeof raw.fullname === 'string' ? raw.fullname.trim().replace(/\s+/g, ' ') : '';
  const gender = typeof raw.gender === 'string' ? raw.gender.trim().toLowerCase() : '';
  const year = Number(raw.year);
  const month = Number(raw.month);
  const dayRaw = raw.day;
  const day = dayRaw === null || dayRaw === undefined || dayRaw === '' || dayRaw === 'unknown'
    ? 'unknown'
    : String(parseInt(dayRaw, 10) || 'unknown');

  if (!fullname || !Number.isFinite(year) || !Number.isFinite(month)) {
    return null;
  }

  return {
    fullname: fullname.toLowerCase(),
    gender: gender || 'unknown',
    year: String(Math.trunc(year)),
    month: String(Math.trunc(month)),
    day,
  };
}

function makeVaultKey(identity) {
  const normalized = normalizeVaultIdentity(identity);
  if (!normalized) return '';
  const seed = [
    normalized.fullname,
    normalized.gender,
    normalized.year,
    normalized.month,
    normalized.day,
  ].join('|');
  return crypto.createHash('sha256').update(seed).digest('hex');
}

function makeUserVaultKey(userId) {
  const safeUserId = normalizeUserId(userId);
  if (!safeUserId) return '';
  return crypto.createHash('sha256').update(`user:${safeUserId}`).digest('hex');
}

function getVaultFilePath(vaultKey) {
  if (!vaultKey) return '';
  return path.join(VAULT_DIR, `${vaultKey}.json`);
}

async function readVaultRecords(vaultKey) {
  if (!vaultKey) return [];
  const filePath = getVaultFilePath(vaultKey);
  try {
    const raw = await fsp.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeVaultRecords(vaultKey, records) {
  if (!vaultKey) {
    throw new Error('VAULT_KEY_MISSING');
  }
  await ensureDir(VAULT_DIR);
  const filePath = getVaultFilePath(vaultKey);
  await fsp.writeFile(filePath, JSON.stringify(records, null, 2), 'utf8');
}

function mergeVaultRecordLists(...recordLists) {
  const merged = [];
  const seen = new Set();
  recordLists.flat().forEach(record => {
    if (!record || typeof record !== 'object' || !record.id || seen.has(record.id)) return;
    seen.add(record.id);
    merged.push(record);
  });
  merged.sort((a, b) => {
    const aTime = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
    const bTime = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
    return bTime - aTime;
  });
  return merged.slice(0, 48);
}

async function resolveVaultContext(req, identity) {
  const authSession = readAuthSession(req);
  const authUserId = normalizeUserId(authSession?.userId || '');
  if (authUserId) {
    const userRecord = await readUserRecord(authUserId);
    if (userRecord?.userId) {
      const primaryKey = makeUserVaultKey(userRecord.userId);
      const legacyKey = makeVaultKey(identity);
      return {
        mode: 'google-user',
        userId: userRecord.userId,
        vaultKey: primaryKey,
        legacyVaultKey: legacyKey && legacyKey !== primaryKey ? legacyKey : '',
      };
    }
  }

  const vaultKey = makeVaultKey(identity);
  if (!vaultKey) return null;
  return {
    mode: 'profile',
    userId: '',
    vaultKey,
    legacyVaultKey: '',
  };
}

function mergeVaultRecord(records, record) {
  const safeRecords = Array.isArray(records) ? records : [];
  const next = safeRecords.filter(item => item && item.id && item.id !== record.id);
  next.unshift(record);
  next.sort((a, b) => {
    const aTime = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
    const bTime = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
    return bTime - aTime;
  });
  return next.slice(0, 48);
}

function sanitizeVaultRecord(record) {
  if (!record || typeof record !== 'object') {
    throw new Error('INVALID_RECORD');
  }
  if (!record.id || typeof record.id !== 'string') {
    throw new Error('INVALID_RECORD');
  }
  return record;
}

function sanitizePayload(body) {
  const provider = body && body.provider === 'openai' ? 'openai' : 'anthropic';
  const model = typeof body.model === 'string' ? body.model.trim() : '';
  const system = typeof body.system === 'string' ? body.system : '';
  const maxTokens = Number(body.max_tokens);
  const reasoningEffort = typeof body.reasoning_effort === 'string' ? body.reasoning_effort.trim() : '';
  const taskKey = typeof body.task_key === 'string' ? body.task_key.trim().slice(0, 40) : '';
  const plan = typeof body.plan === 'string' ? body.plan.trim().slice(0, 20) : '';
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const images = Array.isArray(body.images) ? body.images : [];

  if (!ALLOWED_MODELS[provider]?.has(model)) {
    throw new Error('MODEL_NOT_ALLOWED');
  }
  if (!Number.isFinite(maxTokens) || maxTokens <= 0 || maxTokens > 8192) {
    throw new Error('INVALID_MAX_TOKENS');
  }
  if (!messages.length) {
    throw new Error('MISSING_MESSAGES');
  }

  const safeMessages = messages
    .map(message => ({
      role: message && message.role === 'assistant' ? 'assistant' : 'user',
      content: typeof message?.content === 'string' ? message.content : '',
    }))
    .filter(message => message.content);

  if (!safeMessages.length) {
    throw new Error('EMPTY_MESSAGES');
  }

  const payload = {
    provider,
    model,
    max_tokens: Math.floor(maxTokens),
    system,
    messages: safeMessages,
    task_key: taskKey,
    plan,
    images: images.slice(0, 20).map(image => ({
      path: typeof image?.path === 'string' ? image.path.trim() : '',
      detail: image?.detail === 'high' ? 'high' : 'low',
      label: typeof image?.label === 'string' ? image.label.trim() : '',
    })).filter(image => image.path),
  };

  if (reasoningEffort) {
    const allowedEfforts = new Set(['minimal', 'low', 'medium', 'high']);
    if (!allowedEfforts.has(reasoningEffort)) {
      throw new Error('INVALID_REASONING_EFFORT');
    }
    payload.reasoning_effort = reasoningEffort;
  }

  return payload;
}

async function readLocalImageAsDataUrl(relativePath) {
  const cleanPath = relativePath.replace(/^\/+/, '');
  const resolvedPath = path.resolve(ROOT_DIR, cleanPath);
  const imagesRoot = path.resolve(ROOT_DIR, 'images');
  if (!resolvedPath.startsWith(imagesRoot)) {
    throw new Error('IMAGE_PATH_NOT_ALLOWED');
  }

  const ext = path.extname(resolvedPath).toLowerCase();
  const mime = MIME_TYPES[ext];
  if (!mime || !mime.startsWith('image/')) {
    throw new Error('IMAGE_TYPE_NOT_ALLOWED');
  }

  const buffer = await fsp.readFile(resolvedPath);
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

async function readLocalImageAsset(relativePath) {
  const cleanPath = relativePath.replace(/^\/+/, '');
  const resolvedPath = path.resolve(ROOT_DIR, cleanPath);
  const imagesRoot = path.resolve(ROOT_DIR, 'images');
  if (!resolvedPath.startsWith(imagesRoot)) {
    throw new Error('IMAGE_PATH_NOT_ALLOWED');
  }

  const ext = path.extname(resolvedPath).toLowerCase();
  const mime = MIME_TYPES[ext];
  if (!mime || !mime.startsWith('image/')) {
    throw new Error('IMAGE_TYPE_NOT_ALLOWED');
  }

  const buffer = await fsp.readFile(resolvedPath);
  return {
    mime,
    base64: buffer.toString('base64'),
  };
}

function makeHttpsRequest(url, options, payload) {
  return new Promise((resolve, reject) => {
    const request = https.request(url, options, response => {
      let raw = '';
      response.setEncoding('utf8');
      response.on('data', chunk => {
        raw += chunk;
      });
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode || 500,
          body: raw,
          headers: response.headers,
        });
      });
    });

    request.on('error', reject);
    request.write(JSON.stringify(payload));
    request.end();
  });
}

function makeHttpsTextRequest(url, options, payload = '') {
  return new Promise((resolve, reject) => {
    const hasExplicitOptions = options && Object.keys(options).length > 0;
    const request = hasExplicitOptions
      ? https.request(url, options, response => {
          let raw = '';
          response.setEncoding('utf8');
          response.on('data', chunk => {
            raw += chunk;
          });
          response.on('end', () => {
            resolve({
              statusCode: response.statusCode || 500,
              body: raw,
              headers: response.headers,
            });
          });
        })
      : https.request(url, response => {
          let raw = '';
          response.setEncoding('utf8');
          response.on('data', chunk => {
            raw += chunk;
          });
          response.on('end', () => {
            resolve({
              statusCode: response.statusCode || 500,
              body: raw,
              headers: response.headers,
            });
          });
        });

    request.on('error', reject);
    if (payload) request.write(payload);
    request.end();
  });
}

async function stripeApiRequest(method, requestPath, params = null) {
  if (!STRIPE_SECRET_KEY) {
    const error = new Error('STRIPE_SECRET_KEY_MISSING');
    error.statusCode = 503;
    throw error;
  }
  const upperMethod = String(method || 'GET').trim().toUpperCase();
  let body = '';
  let pathWithQuery = requestPath;
  const headers = {
    Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
  };
  if (upperMethod === 'GET') {
    const query = params instanceof URLSearchParams
      ? params.toString()
      : (params && typeof params === 'object' ? new URLSearchParams(params).toString() : '');
    if (query) pathWithQuery += (requestPath.includes('?') ? '&' : '?') + query;
  } else if (params instanceof URLSearchParams) {
    body = params.toString();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    headers['Content-Length'] = Buffer.byteLength(body);
  } else if (params && typeof params === 'object') {
    body = new URLSearchParams(params).toString();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    headers['Content-Length'] = Buffer.byteLength(body);
  }

  const upstream = await makeHttpsTextRequest({
    protocol: 'https:',
    hostname: 'api.stripe.com',
    path: pathWithQuery,
    method: upperMethod,
    headers,
  }, null, body);

  let parsed = null;
  try {
    parsed = JSON.parse(upstream.body || '{}');
  } catch (_error) {}
  if (upstream.statusCode < 200 || upstream.statusCode >= 300) {
    const error = new Error(parsed?.error?.message || parsed?.message || 'Stripe API request failed.');
    error.code = 'STRIPE_UPSTREAM_ERROR';
    error.statusCode = 502;
    error.upstreamStatus = upstream.statusCode;
    error.raw = parsed;
    throw error;
  }
  return parsed;
}

function decodeJwtPart(value) {
  return JSON.parse(Buffer.from(String(value || ''), 'base64url').toString('utf8'));
}

async function fetchGoogleJwks() {
  const now = Date.now();
  if (GOOGLE_JWK_CACHE.expiresAt > now && Array.isArray(GOOGLE_JWK_CACHE.keys) && GOOGLE_JWK_CACHE.keys.length) {
    return GOOGLE_JWK_CACHE.keys;
  }
  const upstream = await makeHttpsTextRequest('https://www.googleapis.com/oauth2/v3/certs', null, '');
  if (upstream.statusCode < 200 || upstream.statusCode >= 300) {
    const error = new Error('GOOGLE_JWKS_FETCH_FAILED');
    error.statusCode = 502;
    throw error;
  }
  let parsed = {};
  try {
    parsed = JSON.parse(upstream.body || '{}');
  } catch (_error) {}
  const keys = Array.isArray(parsed?.keys) ? parsed.keys : [];
  const cacheControl = String(upstream.headers?.['cache-control'] || '');
  const maxAgeMatch = cacheControl.match(/max-age=(\d+)/i);
  const maxAgeSeconds = maxAgeMatch ? Math.max(60, parseInt(maxAgeMatch[1], 10) || 3600) : 3600;
  GOOGLE_JWK_CACHE = {
    expiresAt: now + (maxAgeSeconds * 1000),
    keys,
  };
  return keys;
}

async function verifyGoogleIdToken(idToken) {
  const token = String(idToken || '').trim();
  if (!token) throw new Error('GOOGLE_ID_TOKEN_REQUIRED');
  if (!GOOGLE_CLIENT_CONFIGURED) throw new Error('GOOGLE_CLIENT_ID_MISSING');
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('GOOGLE_ID_TOKEN_INVALID');
  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const header = decodeJwtPart(encodedHeader);
  const payload = decodeJwtPart(encodedPayload);
  if (header?.alg !== 'RS256' || !header?.kid) throw new Error('GOOGLE_ID_TOKEN_INVALID');
  if (!GOOGLE_ISSUERS.has(String(payload?.iss || '').trim())) throw new Error('GOOGLE_ID_TOKEN_ISSUER_INVALID');
  if (String(payload?.aud || '').trim() !== GOOGLE_CLIENT_ID) throw new Error('GOOGLE_ID_TOKEN_AUDIENCE_INVALID');
  if (!payload?.sub) throw new Error('GOOGLE_ID_TOKEN_SUB_MISSING');
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Number(payload?.exp || 0) <= nowSeconds) throw new Error('GOOGLE_ID_TOKEN_EXPIRED');
  const jwks = await fetchGoogleJwks();
  const jwk = jwks.find(item => item?.kid === header.kid && item?.kty === 'RSA');
  if (!jwk) throw new Error('GOOGLE_JWK_NOT_FOUND');
  const publicKey = crypto.createPublicKey({ key: jwk, format: 'jwk' });
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(`${encodedHeader}.${encodedPayload}`);
  verifier.end();
  const valid = verifier.verify(publicKey, Buffer.from(encodedSignature, 'base64url'));
  if (!valid) throw new Error('GOOGLE_ID_TOKEN_SIGNATURE_INVALID');
  if (payload?.nbf && Number(payload.nbf) > nowSeconds + 30) throw new Error('GOOGLE_ID_TOKEN_NOT_YET_VALID');
  return payload;
}

function sameOriginRequest(req) {
  const origin = String(req?.headers?.origin || '').trim();
  if (!origin) return true;
  if (origin === 'null' && isLocalRequest(req)) return true;
  try {
    const originUrl = new URL(origin);
    return originUrl.host.toLowerCase() === String(req?.headers?.host || '').trim().toLowerCase();
  } catch (_error) {
    return false;
  }
}

function unixToIso(value) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return '';
  return new Date(seconds * 1000).toISOString();
}

async function retrieveStripeSubscription(subscriptionId) {
  const safeId = String(subscriptionId || '').trim();
  if (!safeId) return null;
  return stripeApiRequest('GET', `/v1/subscriptions/${encodeURIComponent(safeId)}`);
}

async function retrieveStripeCheckoutSession(sessionId) {
  const safeId = String(sessionId || '').trim();
  if (!safeId) return null;
  return stripeApiRequest('GET', `/v1/checkout/sessions/${encodeURIComponent(safeId)}`, {
    'expand[]': 'subscription',
  });
}

async function upsertMemberRecordFromStripeSession(session) {
  const customerId = String(session?.customer || '').trim();
  const subscriptionRaw = session?.subscription;
  const subscriptionId = typeof subscriptionRaw === 'string'
    ? subscriptionRaw
    : String(subscriptionRaw?.id || '').trim();
  if (!customerId || !subscriptionId) {
    throw new Error('STRIPE_SESSION_INCOMPLETE');
  }
  const subscription = typeof subscriptionRaw === 'object' && subscriptionRaw?.status
    ? subscriptionRaw
    : await retrieveStripeSubscription(subscriptionId);
  const existing = await readMemberRecord(customerId);
  const metadataUserId = normalizeUserId(session?.metadata?.user_id || subscription?.metadata?.user_id || session?.client_reference_id || '');
  const next = buildMemberRecordFromStripe({
    customerId,
    subscriptionId,
    subscriptionStatus: subscription?.status || '',
    customerEmail: session?.customer_details?.email || session?.customer_email || existing?.customerEmail || '',
    customerName: session?.customer_details?.name || existing?.customerName || '',
    checkoutSessionId: session?.id || '',
    currentPeriodEnd: unixToIso(subscription?.current_period_end),
    cancelAtPeriodEnd: !!subscription?.cancel_at_period_end,
    source: 'stripe',
  }, existing);
  await writeMemberRecord(customerId, next);
  if (metadataUserId) {
    const existingUser = await readUserRecord(metadataUserId);
    const nextUser = buildUserRecordFromStripe({
      userId: metadataUserId,
      customerId,
      subscriptionId,
      subscriptionStatus: subscription?.status || '',
      customerEmail: session?.customer_details?.email || session?.customer_email || existingUser?.email || '',
      customerName: session?.customer_details?.name || existingUser?.name || '',
      checkoutSessionId: session?.id || '',
      currentPeriodEnd: unixToIso(subscription?.current_period_end),
      cancelAtPeriodEnd: !!subscription?.cancel_at_period_end,
    }, existingUser);
    if (nextUser) await writeUserRecord(metadataUserId, nextUser);
  }
  return next;
}

async function updateMemberRecordFromStripeSubscription(subscription) {
  const customerId = String(subscription?.customer || '').trim();
  const subscriptionId = String(subscription?.id || '').trim();
  if (!customerId || !subscriptionId) return null;
  const existing = await readMemberRecord(customerId) || await findMemberRecordBySubscriptionId(subscriptionId);
  const metadataUserId = normalizeUserId(subscription?.metadata?.user_id || '');
  const next = buildMemberRecordFromStripe({
    customerId,
    subscriptionId,
    subscriptionStatus: subscription?.status || '',
    currentPeriodEnd: unixToIso(subscription?.current_period_end),
    cancelAtPeriodEnd: !!subscription?.cancel_at_period_end,
    source: 'stripe',
  }, existing);
  await writeMemberRecord(customerId, next);
  const userId = metadataUserId || (await findUserRecordByStripeCustomerId(customerId))?.userId || (await findUserRecordByStripeSubscriptionId(subscriptionId))?.userId || '';
  if (userId) {
    const existingUser = await readUserRecord(userId);
    const nextUser = buildUserRecordFromStripe({
      userId,
      customerId,
      subscriptionId,
      subscriptionStatus: subscription?.status || '',
      currentPeriodEnd: unixToIso(subscription?.current_period_end),
      cancelAtPeriodEnd: !!subscription?.cancel_at_period_end,
      customerEmail: existingUser?.email || next?.customerEmail || '',
      customerName: existingUser?.name || next?.customerName || '',
    }, existingUser);
    if (nextUser) await writeUserRecord(userId, nextUser);
  }
  return next;
}

function parseStripeSignatureHeader(header) {
  return String(header || '').split(',').reduce((acc, part) => {
    const [key, value] = String(part || '').split('=');
    if (!key || !value) return acc;
    if (!acc[key]) acc[key] = [];
    acc[key].push(value);
    return acc;
  }, {});
}

function verifyStripeWebhookSignature(rawBody, signatureHeader) {
  if (!STRIPE_WEBHOOK_SECRET) return false;
  const parsed = parseStripeSignatureHeader(signatureHeader);
  const timestamp = Number(parsed?.t?.[0]);
  const signatures = parsed?.v1 || [];
  if (!Number.isFinite(timestamp) || !signatures.length) return false;
  if (Math.abs(Math.floor(Date.now() / 1000) - timestamp) > STRIPE_WEBHOOK_TOLERANCE_SEC) return false;
  const payload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', STRIPE_WEBHOOK_SECRET).update(payload).digest('hex');
  return signatures.some(value => safeCompareText(value, expected));
}

async function markStripeEventHandled(eventId) {
  if (!eventId) return;
  await ensureDir(STRIPE_EVENT_DIR);
  await fsp.writeFile(path.join(STRIPE_EVENT_DIR, `${eventId}.json`), JSON.stringify({ id: eventId, handledAt: new Date().toISOString() }), 'utf8');
}

async function stripeEventAlreadyHandled(eventId) {
  if (!eventId) return false;
  try {
    await fsp.access(path.join(STRIPE_EVENT_DIR, `${eventId}.json`));
    return true;
  } catch (_error) {
    return false;
  }
}

function extractOpenAIText(data) {
  if (!data) return '';
  if (typeof data.output_text === 'string' && data.output_text) return data.output_text;
  const outputs = Array.isArray(data.output) ? data.output : [];
  const chunks = [];
  outputs.forEach(item => {
    const contents = Array.isArray(item?.content) ? item.content : [];
    contents.forEach(content => {
      const value = content?.text || content?.output_text || '';
      if (value) chunks.push(value);
    });
  });
  return chunks.join('\n').trim();
}

function normalizeSuccess(provider, model, text, raw) {
  return {
    provider,
    model,
    content: [{ text: text || '' }],
    raw,
  };
}

function extractAnthropicText(data) {
  const contents = Array.isArray(data?.content) ? data.content : [];
  return contents
    .filter(item => item?.type === 'text' && typeof item?.text === 'string')
    .map(item => item.text)
    .join('\n')
    .trim();
}

async function callAnthropic(payload) {
  if (!ANTHROPIC_KEY_CONFIGURED) {
    throw Object.assign(new Error('ANTHROPIC_API_KEY_MISSING'), { statusCode: 500 });
  }

  const firstMessage = payload.messages[0];
  const messageContent = [];
  if (payload.images?.length) {
    for (const image of payload.images) {
      const asset = await readLocalImageAsset(image.path);
      messageContent.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: asset.mime,
          data: asset.base64,
        },
      });
      if (image.label) {
        messageContent.push({
          type: 'text',
          text: `参考画像ラベル: ${image.label}`,
        });
      }
    }
  }
  if (firstMessage?.content) {
    messageContent.push({ type: 'text', text: firstMessage.content });
  }

  const upstream = await makeHttpsRequest(
    'https://api.anthropic.com/v1/messages',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
    },
    {
      model: payload.model,
      max_tokens: payload.max_tokens,
      system: payload.system,
      messages: [
        {
          role: firstMessage?.role || 'user',
          content: messageContent.length ? messageContent : [{ type: 'text', text: firstMessage?.content || '' }],
        },
        ...payload.messages.slice(1).map(message => ({
          role: message.role,
          content: [{ type: 'text', text: message.content }],
        })),
      ],
    }
  );

  let parsed = null;
  try {
    parsed = JSON.parse(upstream.body || '{}');
  } catch (_error) {}

  if (upstream.statusCode < 200 || upstream.statusCode >= 300) {
    const error = new Error(parsed?.error?.message || parsed?.message || 'Anthropic API request failed.');
    error.code = 'ANTHROPIC_UPSTREAM_ERROR';
    error.statusCode = 502;
    error.provider = 'anthropic';
    error.upstreamStatus = upstream.statusCode;
    throw error;
  }

  const text = extractAnthropicText(parsed);
  return normalizeSuccess('anthropic', payload.model, text, parsed);
}

async function callOpenAI(payload) {
  if (!OPENAI_KEY_CONFIGURED) {
    throw Object.assign(new Error('OPENAI_API_KEY_MISSING'), { statusCode: 500 });
  }

  const firstMessage = payload.messages[0];
  const inputContent = [];
  if (firstMessage?.content) {
    inputContent.push({ type: 'input_text', text: firstMessage.content });
  }
  if (payload.images?.length) {
    for (const image of payload.images) {
      const imageUrl = await readLocalImageAsDataUrl(image.path);
      inputContent.push({
        type: 'input_image',
        image_url: imageUrl,
        detail: image.detail || 'low',
      });
      if (image.label) {
        inputContent.push({
          type: 'input_text',
          text: `参考画像ラベル: ${image.label}`,
        });
      }
    }
  }

  const upstreamPayload = {
    model: payload.model,
    input: [
      {
        role: firstMessage?.role || 'user',
        content: inputContent,
      },
      ...payload.messages.slice(1).map(message => ({
        role: message.role,
        content: [{ type: 'input_text', text: message.content }],
      })),
    ],
    max_output_tokens: payload.max_tokens,
  };

  if (payload.system) {
    upstreamPayload.instructions = payload.system;
  }

  if (payload.reasoning_effort) {
    upstreamPayload.reasoning = { effort: payload.reasoning_effort };
  }

  const upstream = await makeHttpsRequest(
    'https://api.openai.com/v1/responses',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    },
    upstreamPayload
  );

  let parsed = null;
  try {
    parsed = JSON.parse(upstream.body || '{}');
  } catch (_error) {}

  if (upstream.statusCode < 200 || upstream.statusCode >= 300) {
    const error = new Error(parsed?.error?.message || parsed?.message || 'OpenAI API request failed.');
    error.code = 'OPENAI_UPSTREAM_ERROR';
    error.statusCode = 502;
    error.provider = 'openai';
    error.upstreamStatus = upstream.statusCode;
    throw error;
  }

  const text = extractOpenAIText(parsed);
  return normalizeSuccess('openai', payload.model, text, parsed);
}

async function handleAiProxy(req, res) {
  const rate = consumeRateLimit(req, 'ai');
  if (!rate.ok) {
    sendRateLimitExceeded(res, rate, 'AI request limit reached. Please wait and retry.');
    return;
  }
  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    const statusCode = error.message === 'BODY_TOO_LARGE' ? 413 : 400;
    sendJson(res, statusCode, {
      error: error.message,
      message: 'Request body could not be parsed.',
    });
    return;
  }

  let payload;
  try {
    payload = sanitizePayload(body);
  } catch (error) {
    sendJson(res, 400, {
      error: error.message,
      message: 'Invalid AI payload.',
    });
    return;
  }

  if (isPaidModel(payload.model) && !(await hasPaidAccess(req))) {
    sendJson(res, 403, {
      error: isLocalRequest(req) ? 'PAID_SESSION_REQUIRED' : 'PAID_AUTH_REQUIRED',
      provider: payload.provider,
      model: payload.model,
      localTestMode: isLocalRequest(req),
      message: isLocalRequest(req)
        ? 'Local paid testing requires a signed preview session first.'
        : 'Paid access requires Google login plus an active subscription.',
    });
    return;
  }

  const startedAt = Date.now();
  const authSession = readAuthSession(req);
  const memberSession = readMemberSession(req);
  const developerEmail = readDeveloperEmailFromHeader(req);
  try {
    const data = payload.provider === 'openai'
      ? await callOpenAI(payload)
      : await callAnthropic(payload);
    try {
      await writeAiUsageLog({
        at: new Date().toISOString(),
        durationMs: Date.now() - startedAt,
        provider: payload.provider,
        model: payload.model,
        taskKey: payload.task_key || '',
        plan: payload.plan || '',
        maxTokens: payload.max_tokens,
        imageCount: Array.isArray(payload.images) ? payload.images.length : 0,
        userId: authSession?.userId || '',
        memberSource: memberSession?.source || '',
        developerEmail,
        promptPreview: clipText(payload.messages?.[0]?.content || '', 220),
        ...extractUsageMetrics(payload.provider, data?.raw),
        ok: true,
      });
    } catch (_error) {}
    sendJson(res, 200, data);
  } catch (error) {
    try {
      await writeAiUsageLog({
        at: new Date().toISOString(),
        durationMs: Date.now() - startedAt,
        provider: payload.provider,
        model: payload.model,
        taskKey: payload.task_key || '',
        plan: payload.plan || '',
        maxTokens: payload.max_tokens,
        imageCount: Array.isArray(payload.images) ? payload.images.length : 0,
        userId: authSession?.userId || '',
        memberSource: memberSession?.source || '',
        developerEmail,
        promptPreview: clipText(payload.messages?.[0]?.content || '', 220),
        ok: false,
        error: error.code || error.message || 'AI_PROXY_ERROR',
        upstreamStatus: error.upstreamStatus || 0,
      });
    } catch (_error) {}
    const missingKey = error.message === 'ANTHROPIC_API_KEY_MISSING' || error.message === 'OPENAI_API_KEY_MISSING';
    sendJson(res, error.statusCode || 502, {
      error: missingKey ? error.message : (error.code || 'AI_PROXY_ERROR'),
      provider: error.provider || payload.provider,
      status: error.upstreamStatus || undefined,
      message: missingKey
        ? `Server-side ${error.message.replace('_MISSING', '')} is not configured.`
        : (error.message || 'AI provider request failed.'),
    });
  }
}

async function handleVaultQuery(req, res) {
  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, {
      error: error.message || 'INVALID_JSON',
      message: 'Vault query payload could not be parsed.',
    });
    return;
  }

  const vaultContext = await resolveVaultContext(req, body?.identity);
  if (!vaultContext?.vaultKey) {
    sendJson(res, 400, {
      error: 'IDENTITY_REQUIRED',
      message: 'Vault identity or an active Google session is required.',
    });
    return;
  }

  const records = mergeVaultRecordLists(
    await readVaultRecords(vaultContext.vaultKey),
    vaultContext.legacyVaultKey ? await readVaultRecords(vaultContext.legacyVaultKey) : []
  );
  sendJson(res, 200, {
    ok: true,
    records,
    vaultMode: vaultContext.mode,
    userId: vaultContext.userId || '',
  });
}

async function handleVaultSave(req, res) {
  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, {
      error: error.message || 'INVALID_JSON',
      message: 'Vault save payload could not be parsed.',
    });
    return;
  }

  const vaultContext = await resolveVaultContext(req, body?.identity);
  if (!vaultContext?.vaultKey) {
    sendJson(res, 400, {
      error: 'IDENTITY_REQUIRED',
      message: 'Vault identity or an active Google session is required.',
    });
    return;
  }

  let record;
  try {
    record = sanitizeVaultRecord(body?.record);
  } catch (error) {
    sendJson(res, 400, {
      error: error.message || 'INVALID_RECORD',
      message: 'Vault record is invalid.',
    });
    return;
  }

  const existingPrimary = await readVaultRecords(vaultContext.vaultKey);
  const existingLegacy = vaultContext.legacyVaultKey ? await readVaultRecords(vaultContext.legacyVaultKey) : [];
  const mergedBase = mergeVaultRecordLists(existingPrimary, existingLegacy);
  const merged = mergeVaultRecord(mergedBase, record);
  await writeVaultRecords(vaultContext.vaultKey, merged);
  sendJson(res, 200, {
    ok: true,
    count: merged.length,
    vaultMode: vaultContext.mode,
    userId: vaultContext.userId || '',
  });
}

async function handleVaultClear(req, res) {
  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, {
      error: error.message || 'INVALID_JSON',
      message: 'Vault clear payload could not be parsed.',
    });
    return;
  }

  const vaultContext = await resolveVaultContext(req, body?.identity);
  if (!vaultContext?.vaultKey) {
    sendJson(res, 400, {
      error: 'IDENTITY_REQUIRED',
      message: 'Vault identity or an active Google session is required.',
    });
    return;
  }

  const filePaths = [
    getVaultFilePath(vaultContext.vaultKey),
    vaultContext.legacyVaultKey ? getVaultFilePath(vaultContext.legacyVaultKey) : '',
  ].filter(Boolean);
  for (const filePath of filePaths) {
    try {
      await fsp.unlink(filePath);
    } catch (error) {
      if (!error || error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  sendJson(res, 200, {
    ok: true,
    vaultMode: vaultContext.mode,
    userId: vaultContext.userId || '',
  });
}

async function runProviderProbe(provider) {
  if (provider === 'openai') {
    if (!OPENAI_KEY_CONFIGURED) {
      return { configured: false, ok: false, message: 'OPENAI_API_KEY missing' };
    }
    try {
      await callOpenAI({
        provider: 'openai',
        model: 'gpt-5.4-mini',
        max_tokens: 16,
        system: 'Return OK only.',
        messages: [{ role: 'user', content: 'OK only.' }],
        images: [],
      });
      return { configured: true, ok: true, message: 'reachable', model: 'gpt-5.4-mini' };
    } catch (error) {
      return {
        configured: true,
        ok: false,
        message: error?.message || 'OpenAI probe failed.',
        status: error?.upstreamStatus || undefined,
        model: 'gpt-5.4-mini',
      };
    }
  }

  if (!ANTHROPIC_KEY_CONFIGURED) {
    return { configured: false, ok: false, message: 'ANTHROPIC_API_KEY missing' };
  }
  try {
    await callAnthropic({
      provider: 'anthropic',
      model: 'claude-opus-4-6',
      max_tokens: 16,
      system: 'Return OK only.',
      messages: [{ role: 'user', content: 'OK only.' }],
      images: [],
    });
    return { configured: true, ok: true, message: 'reachable', model: 'claude-opus-4-6' };
  } catch (error) {
    return {
      configured: true,
      ok: false,
      message: error?.message || 'Anthropic probe failed.',
      status: error?.upstreamStatus || undefined,
      model: 'claude-opus-4-6',
    };
  }
}

async function handleProviderCheck(req, res) {
  if (!isLocalRequest(req)) {
    sendJson(res, 403, {
      error: 'LOCAL_ONLY_ENDPOINT',
      message: 'Provider check is limited to local test runtime.',
    });
    return;
  }
  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
  const provider = url.searchParams.get('provider') || 'both';
  const openai = provider === 'both' || provider === 'openai'
    ? await runProviderProbe('openai')
    : null;
  const anthropic = provider === 'both' || provider === 'anthropic'
    ? await runProviderProbe('anthropic')
    : null;

  sendJson(res, 200, {
    ok: true,
    checkedAt: new Date().toISOString(),
    openai,
    anthropic,
  });
}

async function handleMemberStatus(req, res) {
  sendJson(res, 200, await buildMemberStatus(req));
}

async function handleMemberSession(req, res) {
  const rate = consumeRateLimit(req, 'member_session');
  if (!rate.ok) {
    sendRateLimitExceeded(res, rate, 'Too many member session requests. Please wait and retry.');
    return;
  }
  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, {
      error: error.message || 'INVALID_JSON',
      message: 'Member session payload could not be parsed.',
    });
    return;
  }

  const mode = String(body?.mode || '').trim().toLowerCase();
  if (mode === 'local_preview') {
    if (!isLocalRequest(req)) {
      sendJson(res, 403, {
        error: 'LOCAL_ONLY_MEMBER_PREVIEW',
        message: 'Local preview sessions can only be issued from localhost.',
      });
      return;
    }
    const session = issueMemberSession(res, {
      source: 'local_preview',
      maxAgeSeconds: 3 * 24 * 60 * 60,
    });
    sendJson(res, 200, await buildMemberStatus(req, session));
    return;
  }

  if (mode === 'developer') {
    if (!isLocalRequest(req)) {
      sendJson(res, 403, {
        error: 'DEVELOPER_LOCAL_ONLY',
        message: 'Developer access can only be issued from localhost.',
      });
      return;
    }
    const developerEmail = String(body?.email || '').trim().toLowerCase();
    if (!developerEmail) {
      sendJson(res, 400, {
        error: 'DEVELOPER_EMAIL_REQUIRED',
        message: 'A developer email is required.',
      });
      return;
    }
    const userRecord = await ensureDeveloperUserRecord(developerEmail, body?.name || '');
    if (!userRecord?.userId) {
      sendJson(res, 403, {
        error: 'DEVELOPER_EMAIL_DENIED',
        message: 'This email is not allowed for developer access.',
      });
      return;
    }
    const authSession = issueAuthSession(res, {
      source: 'developer',
      claims: {
        userId: userRecord.userId,
        googleSub: userRecord.googleSub || userRecord.userId,
      },
    });
    sendJson(res, 200, await buildMemberStatus(req, {
      memberSession: readMemberSession(req),
      authSession,
    }));
    return;
  }

  const accessCode = String(body?.accessCode || '').trim();
  if (!accessCode) {
    sendJson(res, 400, {
      error: 'ACCESS_CODE_REQUIRED',
      message: 'An access code is required.',
    });
    return;
  }
  if (!MEMBER_ACCESS_CODES.size) {
    sendJson(res, 503, {
      error: 'ACCESS_CODE_DISABLED',
      message: 'No member access code is configured on the server.',
    });
    return;
  }

  const validCode = [...MEMBER_ACCESS_CODES].some(code => safeCompareText(code, accessCode));
  if (!validCode) {
    sendJson(res, 401, {
      error: 'ACCESS_CODE_INVALID',
      message: 'The access code was not accepted.',
    });
    return;
  }

  const session = issueMemberSession(res, {
    source: 'access_code',
    maxAgeSeconds: MEMBER_SESSION_DAYS * 24 * 60 * 60,
  });
  sendJson(res, 200, await buildMemberStatus(req, session));
}

async function handleMemberLogout(req, res) {
  clearAuthSession(res);
  clearMemberSession(res);
  sendJson(res, 200, await buildMemberStatus(req, {
    memberSession: null,
    authSession: null,
  }));
}

async function handleClientLog(req, res) {
  const rate = consumeRateLimit(req, 'client_log');
  if (!rate.ok) {
    sendRateLimitExceeded(res, rate, 'Client log limit reached. Please wait and retry.');
    return;
  }
  if (!sameOriginRequest(req) && !isLocalRequest(req)) {
    sendJson(res, 403, {
      error: 'ORIGIN_NOT_ALLOWED',
      message: 'Client logs are limited to same-origin requests.',
    });
    return;
  }
  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, {
      error: error.message || 'INVALID_JSON',
      message: 'Client log payload could not be parsed.',
    });
    return;
  }

  const authSession = readAuthSession(req);
  const memberSession = readMemberSession(req);
  const record = {
    at: new Date().toISOString(),
    level: clipText(body?.level || 'error', 16),
    type: clipText(body?.type || 'client', 48),
    message: clipText(body?.message || '', 400),
    stack: clipText(body?.stack || '', 1200),
    href: clipText(body?.href || '', 300),
    source: clipText(body?.source || '', 120),
    userId: authSession?.userId || '',
    memberSource: memberSession?.source || '',
    meta: body?.meta && typeof body.meta === 'object' ? body.meta : {},
  };

  try {
    await writeClientErrorLog(record);
  } catch (error) {
    sendJson(res, 500, {
      error: 'CLIENT_LOG_WRITE_FAILED',
      message: error.message || 'Client log could not be written.',
    });
    return;
  }

  sendJson(res, 200, { ok: true });
}

async function handleGoogleAuth(req, res) {
  const rate = consumeRateLimit(req, 'google_auth');
  if (!rate.ok) {
    sendRateLimitExceeded(res, rate, 'Too many Google sign-in requests. Please wait and retry.');
    return;
  }
  if (!sameOriginRequest(req)) {
    sendJson(res, 403, {
      error: 'ORIGIN_NOT_ALLOWED',
      message: 'Google login is limited to same-origin requests.',
    });
    return;
  }
  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, {
      error: error.message || 'INVALID_JSON',
      message: 'Google login payload could not be parsed.',
    });
    return;
  }
  if (!GOOGLE_CLIENT_CONFIGURED) {
    sendJson(res, 503, {
      error: 'GOOGLE_CLIENT_ID_MISSING',
      message: 'Google login is not configured on the server.',
    });
    return;
  }
  try {
    const payload = await verifyGoogleIdToken(body?.credential);
    const profile = normalizeGoogleProfile(payload);
    if (!profile) {
      sendJson(res, 400, {
        error: 'GOOGLE_PROFILE_INVALID',
        message: 'Google profile is incomplete.',
      });
      return;
    }
    const existing = await readUserRecord(profile.userId);
    const next = buildUserRecordFromGoogleProfile(profile, existing);
    await writeUserRecord(profile.userId, next);
    const authSession = issueAuthSession(res, {
      source: 'google',
      claims: {
        userId: profile.userId,
        googleSub: profile.googleSub,
      },
    });
    sendJson(res, 200, await buildMemberStatus(req, {
      memberSession: readMemberSession(req),
      authSession,
    }));
  } catch (error) {
    sendJson(res, 401, {
      error: error.code || error.message || 'GOOGLE_AUTH_FAILED',
      message: 'Google sign-in could not be verified.',
    });
  }
}

function buildStripeCheckoutUrls(req) {
  return {
    successUrl: makeAbsoluteUrl(req, STRIPE_SUCCESS_PATH),
    cancelUrl: makeAbsoluteUrl(req, STRIPE_CANCEL_PATH),
    portalReturnUrl: makeAbsoluteUrl(req, STRIPE_PORTAL_RETURN_PATH),
  };
}

async function handleStripeCheckoutSessionCreate(req, res) {
  const rate = consumeRateLimit(req, 'stripe_checkout');
  if (!rate.ok) {
    sendRateLimitExceeded(res, rate, 'Too many Stripe checkout attempts. Please wait and retry.');
    return;
  }
  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, {
      error: error.message || 'INVALID_JSON',
      message: 'Stripe checkout payload could not be parsed.',
    });
    return;
  }

  if (!stripeReady()) {
    sendJson(res, 503, {
      error: 'STRIPE_NOT_CONFIGURED',
      message: 'Stripe checkout is not configured on the server.',
    });
    return;
  }
  const authSession = readAuthSession(req);
  const userRecord = authSession?.userId ? await readUserRecord(authSession.userId) : null;
  if (!userRecord) {
    sendJson(res, 403, {
      error: 'AUTH_REQUIRED',
      message: 'Google login is required before starting Stripe checkout.',
    });
    return;
  }

  const urls = buildStripeCheckoutUrls(req);
  const intent = String(body?.intent || '').trim() || 'start-paid';
  const params = new URLSearchParams();
  params.set('mode', 'subscription');
  params.set('success_url', urls.successUrl);
  params.set('cancel_url', urls.cancelUrl);
  params.set('locale', 'ja');
  params.set('allow_promotion_codes', 'true');
  params.set('billing_address_collection', 'auto');
  params.set('line_items[0][price]', STRIPE_PRICE_ID_MONTHLY);
  params.set('line_items[0][quantity]', '1');
  params.set('client_reference_id', userRecord.userId);
  params.set('metadata[intent]', intent);
  params.set('metadata[user_id]', userRecord.userId);
  params.set('subscription_data[metadata][intent]', intent);
  params.set('subscription_data[metadata][user_id]', userRecord.userId);
  params.set('subscription_data[metadata][app]', 'uranai');
  if (userRecord.stripeCustomerId) {
    params.set('customer', userRecord.stripeCustomerId);
  } else if (userRecord.email) {
    params.set('customer_email', userRecord.email);
  }

  try {
    const session = await stripeApiRequest('POST', '/v1/checkout/sessions', params);
    sendJson(res, 200, {
      ok: true,
      url: session?.url || '',
      id: session?.id || '',
    });
  } catch (error) {
    sendJson(res, error.statusCode || 502, {
      error: error.code || error.message || 'STRIPE_CHECKOUT_CREATE_FAILED',
      message: error.message || 'Stripe checkout session could not be created.',
    });
  }
}

async function handleStripePortalSessionCreate(req, res) {
  const rate = consumeRateLimit(req, 'stripe_portal');
  if (!rate.ok) {
    sendRateLimitExceeded(res, rate, 'Too many Stripe portal requests. Please wait and retry.');
    return;
  }
  const authSession = readAuthSession(req);
  const userRecord = authSession?.userId ? await readUserRecord(authSession.userId) : null;
  if (!userRecord) {
    sendJson(res, 403, {
      error: 'STRIPE_PORTAL_AUTH_REQUIRED',
      message: 'A signed-in Google account is required to open the billing portal.',
    });
    return;
  }
  if (!stripePortalReady()) {
    sendJson(res, 503, {
      error: 'STRIPE_NOT_CONFIGURED',
      message: 'Stripe billing portal is not configured on the server.',
    });
    return;
  }
  const customerId = String(userRecord?.stripeCustomerId || '').trim();
  if (!customerId) {
    sendJson(res, 404, {
      error: 'STRIPE_CUSTOMER_NOT_FOUND',
      message: 'No Stripe customer was found for this member session.',
    });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (_error) {
    body = {};
  }
  const returnUrl = body?.returnUrl
    ? makeAbsoluteUrl(req, String(body.returnUrl || '/'))
    : buildStripeCheckoutUrls(req).portalReturnUrl;
  const params = new URLSearchParams();
  params.set('customer', customerId);
  params.set('return_url', returnUrl);

  try {
    const portal = await stripeApiRequest('POST', '/v1/billing_portal/sessions', params);
    sendJson(res, 200, {
      ok: true,
      url: portal?.url || '',
    });
  } catch (error) {
    sendJson(res, error.statusCode || 502, {
      error: error.code || error.message || 'STRIPE_PORTAL_CREATE_FAILED',
      message: error.message || 'Stripe billing portal session could not be created.',
    });
  }
}

async function handleStripeCheckoutComplete(req, res) {
  if (!stripeReady()) {
    sendJson(res, 503, {
      error: 'STRIPE_NOT_CONFIGURED',
      message: 'Stripe checkout is not configured on the server.',
    });
    return;
  }
  const url = new URL(req.url, makeAbsoluteUrl(req, '/'));
  const sessionId = String(url.searchParams.get('session_id') || '').trim();
  if (!sessionId) {
    sendJson(res, 400, {
      error: 'SESSION_ID_REQUIRED',
      message: 'A Stripe Checkout session id is required.',
    });
    return;
  }

  try {
    const session = await retrieveStripeCheckoutSession(sessionId);
    const subscriptionRaw = session?.subscription;
    const subscription = typeof subscriptionRaw === 'object' && subscriptionRaw?.status
      ? subscriptionRaw
      : await retrieveStripeSubscription(typeof subscriptionRaw === 'string' ? subscriptionRaw : '');
    const subscriptionStatus = normalizeStripeSubscriptionStatus(subscription?.status || '');
    const memberRecord = await upsertMemberRecordFromStripeSession({
      ...session,
      subscription,
    });
    const userId = normalizeUserId(session?.metadata?.user_id || subscription?.metadata?.user_id || '');
    if (stripeSubscriptionGrantsAccess(subscriptionStatus)) {
      if (userId) {
        const authSession = issueAuthSession(res, {
          source: 'google',
          claims: { userId, googleSub: userId },
        });
        sendJson(res, 200, await buildMemberStatus(req, {
          memberSession: readMemberSession(req),
          authSession,
        }));
        return;
      }
      sendJson(res, 200, await buildMemberStatus(req, {
        memberSession: readMemberSession(req),
        authSession: readAuthSession(req),
      }));
      return;
    }
    sendJson(res, 409, {
      error: 'STRIPE_SUBSCRIPTION_NOT_ACTIVE',
      message: 'Stripe checkout completed but the subscription is not active yet.',
      subscriptionStatus,
    });
  } catch (error) {
    sendJson(res, error.statusCode || 502, {
      error: error.code || error.message || 'STRIPE_CHECKOUT_COMPLETE_FAILED',
      message: error.message || 'Stripe checkout completion could not be confirmed.',
    });
  }
}

async function handleStripeWebhook(req, res) {
  if (!stripeWebhookReady()) {
    sendJson(res, 503, {
      error: 'STRIPE_WEBHOOK_NOT_CONFIGURED',
      message: 'Stripe webhook secret is not configured on the server.',
    });
    return;
  }
  let rawBuffer;
  try {
    rawBuffer = await readRawBody(req);
  } catch (error) {
    sendJson(res, 400, {
      error: error.message || 'INVALID_BODY',
      message: 'Stripe webhook body could not be read.',
    });
    return;
  }
  const rawBody = rawBuffer.toString('utf8');
  const signatureHeader = req.headers['stripe-signature'];
  if (!verifyStripeWebhookSignature(rawBody, signatureHeader)) {
    sendJson(res, 400, {
      error: 'STRIPE_SIGNATURE_INVALID',
      message: 'Stripe webhook signature verification failed.',
    });
    return;
  }

  let event;
  try {
    event = JSON.parse(rawBody || '{}');
  } catch (_error) {
    sendJson(res, 400, {
      error: 'INVALID_JSON',
      message: 'Stripe webhook payload is not valid JSON.',
    });
    return;
  }
  if (await stripeEventAlreadyHandled(event?.id)) {
    sendJson(res, 200, { ok: true, duplicate: true });
    return;
  }

  try {
    const eventType = String(event?.type || '').trim();
    const object = event?.data?.object || {};
    if (eventType === 'checkout.session.completed' && object?.mode === 'subscription') {
      await upsertMemberRecordFromStripeSession(object);
    }
    if (eventType === 'customer.subscription.created' || eventType === 'customer.subscription.updated' || eventType === 'customer.subscription.deleted') {
      await updateMemberRecordFromStripeSubscription(object);
    }
    await markStripeEventHandled(event?.id);
    sendJson(res, 200, { ok: true, received: true });
  } catch (error) {
    sendJson(res, 500, {
      error: error.code || error.message || 'STRIPE_WEBHOOK_PROCESS_FAILED',
      message: error.message || 'Stripe webhook could not be processed.',
    });
  }
}

async function handleRequest(req, res) {
  if (!req.url) {
    sendText(res, 400, 'Bad Request');
    return;
  }

  applyCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/api/health')) {
    const setup = getRuntimeSetupStatus(req);
    sendJson(res, 200, {
      ok: true,
      anthropicKeyConfigured: ANTHROPIC_KEY_CONFIGURED,
      openaiKeyConfigured: OPENAI_KEY_CONFIGURED,
      googleClientConfigured: GOOGLE_CLIENT_CONFIGURED,
      mode: 'provider-router',
      vaultEnabled: true,
      paidTestMode: isLocalRequest(req),
      memberCodeConfigured: MEMBER_ACCESS_CODES.size > 0,
      memberSessionPersistent: MEMBER_SESSION_PERSISTENT,
      stripeCheckoutReady: stripeReady(),
      stripePortalReady: stripePortalReady(),
      stripeWebhookReady: stripeWebhookReady(),
      setup,
    });
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/api/member/status')) {
    await handleMemberStatus(req, res);
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/auth/google')) {
    await handleGoogleAuth(req, res);
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/member/session')) {
    await handleMemberSession(req, res);
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/member/logout')) {
    await handleMemberLogout(req, res);
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/client-log')) {
    await handleClientLog(req, res);
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/api/provider-check')) {
    await handleProviderCheck(req, res);
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/stripe/checkout-session')) {
    await handleStripeCheckoutSessionCreate(req, res);
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/api/stripe/checkout/complete')) {
    await handleStripeCheckoutComplete(req, res);
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/stripe/portal-session')) {
    await handleStripePortalSessionCreate(req, res);
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/stripe/webhook')) {
    await handleStripeWebhook(req, res);
    return;
  }

  if (req.method === 'POST' && (req.url.startsWith('/api/ai/generate') || req.url.startsWith('/api/anthropic/messages'))) {
    await handleAiProxy(req, res);
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/vault/history/query')) {
    await handleVaultQuery(req, res);
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/vault/history/save')) {
    await handleVaultSave(req, res);
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/vault/history/clear')) {
    await handleVaultClear(req, res);
    return;
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    await serveStatic(req, res);
    return;
  }

  sendText(res, 405, 'Method Not Allowed');
}

function createServer() {
  return http.createServer((req, res) => {
    handleRequest(req, res).catch(error => {
      sendJson(res, 500, {
        error: 'UNEXPECTED_SERVER_ERROR',
        message: error.message || 'Unexpected server error.',
      });
    });
  });
}

if (require.main === module) {
  const server = createServer();
  server.on('error', error => {
    if (error && error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Try a different port, for example: .\\start-uranai.ps1 -Port 3001`);
      process.exit(1);
    }
    console.error(error);
    process.exit(1);
  });
  server.listen(PORT, HOST, () => {
    console.log(`Star reader app running at http://${HOST}:${PORT}`);
    console.log(`Anthropic proxy: ${ANTHROPIC_KEY_CONFIGURED ? 'configured' : 'missing ANTHROPIC_API_KEY'}`);
    console.log(`OpenAI proxy: ${OPENAI_KEY_CONFIGURED ? 'configured' : 'missing OPENAI_API_KEY'}`);
  });
}

module.exports = {
  createServer,
};
