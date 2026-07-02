'use strict';

/**
 * Servidor local do repositório de release notes.
 * Zero dependências: usa só módulos nativos do Node.
 * Lê as pastas em releases/ e serve uma interface de busca/visualização.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const RELEASES_DIR = path.join(ROOT, 'releases');
const APP_DIR = path.join(ROOT, 'app');
const PORT = process.env.PORT || 4123;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

// Converte "DD-MM-AAAA" em ordenável "AAAA-MM-DD" (retorna '' se inválido).
function toSortable(data) {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec((data || '').trim());
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

function readReleases() {
  if (!fs.existsSync(RELEASES_DIR)) return [];
  const out = [];
  for (const entry of fs.readdirSync(RELEASES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(RELEASES_DIR, entry.name);
    const metaPath = path.join(dir, 'meta.json');
    if (!fs.existsSync(metaPath)) continue;
    let meta = {};
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    } catch (e) {
      console.warn(`meta.json inválido em ${entry.name}: ${e.message}`);
      continue;
    }
    out.push({
      slug: entry.name,
      feature: meta.feature || entry.name,
      data: meta.data || '',
      dataSortable: toSortable(meta.data),
      versao: meta.versao || '',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
    });
  }
  // Mais recente primeiro; sem data cai pro fim.
  out.sort((a, b) => (b.dataSortable || '0').localeCompare(a.dataSortable || '0'));
  return out;
}

function readOne(slug) {
  // Bloqueia path traversal.
  if (!/^[\w .+-]+$/.test(slug)) return null;
  const dir = path.join(RELEASES_DIR, slug);
  if (!dir.startsWith(RELEASES_DIR) || !fs.existsSync(dir)) return null;
  const metaPath = path.join(dir, 'meta.json');
  if (!fs.existsSync(metaPath)) return null;
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const readMd = (name) => {
    const p = path.join(dir, name);
    return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
  };
  return { meta, interno: readMd('interno.md'), externo: readMd('externo.md') };
}

function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': MIME['.json'] });
  res.end(body);
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
  if (pathname === '/api/releases') {
    return sendJSON(res, 200, readReleases());
  }
  if (pathname.startsWith('/api/release/')) {
    const slug = pathname.slice('/api/release/'.length);
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
