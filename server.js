const http = require('http');
const https = require('https');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

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

const ROOT_DIR = __dirname;
const HOST = readCliArg('--host') || process.env.HOST || '127.0.0.1';
const PORT = parseInt(readCliArg('--port') || process.env.PORT || '3000', 10);
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const MAX_JSON_BYTES = 1024 * 1024;

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

function getAllowedStaticPath(urlPath) {
  const pathname = decodeURIComponent((urlPath || '/').split('?')[0]);
  if (pathname === '/' || pathname === '/uranai-v5.html') {
    return path.join(ROOT_DIR, 'uranai-v5.html');
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

function sanitizePayload(body) {
  const provider = body && body.provider === 'openai' ? 'openai' : 'anthropic';
  const model = typeof body.model === 'string' ? body.model.trim() : '';
  const system = typeof body.system === 'string' ? body.system : '';
  const maxTokens = Number(body.max_tokens);
  const reasoningEffort = typeof body.reasoning_effort === 'string' ? body.reasoning_effort.trim() : '';
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
  if (!ANTHROPIC_API_KEY) {
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
  if (!OPENAI_API_KEY) {
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

  try {
    const data = payload.provider === 'openai'
      ? await callOpenAI(payload)
      : await callAnthropic(payload);
    sendJson(res, 200, data);
  } catch (error) {
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

async function handleRequest(req, res) {
  if (!req.url) {
    sendText(res, 400, 'Bad Request');
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/api/health')) {
    sendJson(res, 200, {
      ok: true,
      anthropicKeyConfigured: !!ANTHROPIC_API_KEY,
      openaiKeyConfigured: !!OPENAI_API_KEY,
      mode: 'provider-router',
    });
    return;
  }

  if (req.method === 'POST' && (req.url.startsWith('/api/ai/generate') || req.url.startsWith('/api/anthropic/messages'))) {
    await handleAiProxy(req, res);
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
    console.log(`Anthropic proxy: ${ANTHROPIC_API_KEY ? 'configured' : 'missing ANTHROPIC_API_KEY'}`);
    console.log(`OpenAI proxy: ${OPENAI_API_KEY ? 'configured' : 'missing OPENAI_API_KEY'}`);
  });
}

module.exports = {
  createServer,
};
