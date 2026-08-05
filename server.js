'use strict';

/**
 * Servidor local do repositório de release notes.
 * Zero dependências: usa só módulos nativos do Node.
 * Lê as pastas em releases/ (via lib.js) e serve a interface com live-reload:
 * os dados são gerados a cada request, então editar um .md e recarregar já reflete.
 *
 * Os endpoints de dados usam o mesmo caminho que a Vercel serve estático
 * (/data/releases.json e /data/<slug>.json), então o cliente é idêntico nos dois.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { readReleases, readOne } = require('./lib');

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

function sendJSON(res, code, obj) {
  res.writeHead(code, { 'Content-Type': MIME['.json'] });
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
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

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
