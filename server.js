'use strict';

/**
 * Servidor local do repositório de release notes.
 * Zero dependências: usa só módulos nativos do Node.
 * Lê as pastas em releases/ (via lib.js) e serve a interface com live-reload:
 * os dados são gerados a cada request, então editar um .md e recarregar já reflete.
 *
 * Os endpoints de dados usam o mesmo caminho que a Vercel serve estático
 * (/data/releases.json e /data/<slug>.json), então o cliente é idêntico nos dois.
 *
 * Só aqui existe /api/* (edição). Na Vercel esses caminhos não existem, então o
 * botão "Editar" da interface simplesmente não aparece no site publicado.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { readReleases, readOne, writeDoc, writeMeta } = require('./lib');

const ROOT = __dirname;
const APP_DIR = path.join(ROOT, 'app');
const PORT = process.env.PORT || 4123;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

// Servidor de trabalho: nada pode ficar em cache, senão editar um arquivo e
// recarregar não reflete (e o navegador serve app.js/style.css velhos).
const NO_CACHE = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

function sendJSON(res, code, obj) {
  res.writeHead(code, { 'Content-Type': MIME['.json'], ...NO_CACHE });
  res.end(JSON.stringify(obj));
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Não encontrado');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', ...NO_CACHE });
    res.end(data);
  });
}

// Só quem está na própria máquina pode gravar arquivo.
function isLoopback(req) {
  const a = (req.socket.remoteAddress || '').replace(/^::ffff:/, '');
  return a === '127.0.0.1' || a === '::1';
}

function readBody(req, cb) {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', (c) => { data += c; });
  req.on('end', () => cb(data));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

  // Marca de "estou rodando local" — a interface usa isso pra mostrar o editor.
  if (pathname === '/api/local') {
    return sendJSON(res, 200, { local: true, editable: isLoopback(req) });
  }

  // PUT /api/release/<slug>/<interno|externo|meta>
  if (pathname.startsWith('/api/release/')) {
    if (req.method !== 'PUT') return sendJSON(res, 405, { error: 'use PUT' });
    if (!isLoopback(req)) return sendJSON(res, 403, { error: 'edição só na máquina local' });
    const parts = pathname.slice('/api/release/'.length).split('/');
    if (parts.length !== 2) return sendJSON(res, 400, { error: 'caminho inválido' });
    const [slug, kind] = parts;
    return readBody(req, (body) => {
      try {
        if (kind === 'meta') {
          const meta = writeMeta(slug, JSON.parse(body));
          return sendJSON(res, 200, { ok: true, meta });
        }
        writeDoc(slug, kind, body);
        return sendJSON(res, 200, { ok: true });
      } catch (e) {
        return sendJSON(res, 400, { error: e.message });
      }
    });
  }

  if (pathname === '/' || pathname === '/index.html') {
    return sendFile(res, path.join(APP_DIR, 'index.html'));
  }
  if (pathname === '/data/releases.json') {
    return sendJSON(res, 200, readReleases());
  }
  if (pathname.startsWith('/data/') && pathname.endsWith('.json')) {
    const slug = pathname.slice('/data/'.length, -'.json'.length);
    const one = readOne(slug);
    return one ? sendJSON(res, 200, one) : sendJSON(res, 404, { error: 'não encontrado' });
  }
  if (pathname.startsWith('/app/')) {
    const rel = pathname.slice('/app/'.length);
    const filePath = path.join(APP_DIR, rel);
    if (!filePath.startsWith(APP_DIR)) {
      res.writeHead(403); return res.end();
    }
    return sendFile(res, filePath);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Não encontrado');
});

server.listen(PORT, () => {
  console.log('');
  console.log('  Release Notes — API4COM');
  console.log(`  Rodando em:  http://localhost:${PORT}`);
  console.log('  Ctrl+C para parar.');
  console.log('');
});
