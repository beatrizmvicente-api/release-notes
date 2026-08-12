'use strict';

/**
 * Gera o site estático em public/ para hospedar na Vercel.
 * - Copia a interface (app/) para public/
 * - Gera public/data/releases.json e public/data/<slug>.json
 * A Vercel roda `node build.js` e serve public/ (ver vercel.json).
 */

const fs = require('fs');
const path = require('path');
const { readReleases, readOne } = require('./lib');

const ROOT = __dirname;
const APP_DIR = path.join(ROOT, 'app');
const OUT = path.join(ROOT, 'public');

function rmrf(p) { fs.rmSync(p, { recursive: true, force: true }); }

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function writeJSON(file, obj) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(obj));
}

// 1. Limpa e recria public/
rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });

// 2. index.html na raiz + assets em public/app/ (mesma estrutura que o server local)
//    O editor é ferramenta local: o markup entre <!-- editor:start --> e
//    <!-- editor:end --> sai do HTML, e editor.js/editor.css não são copiados.
//    O site publicado é somente leitura, sem nenhum código de edição.
const html = fs.readFileSync(path.join(APP_DIR, 'index.html'), 'utf8');
const publicHtml = html.replace(/[ \t]*<!--\s*editor:start\s*-->[\s\S]*?<!--\s*editor:end\s*-->\n?/g, '');
if (/editor:(start|end)/.test(publicHtml) || /editor\.(js|css)/.test(publicHtml)) {
  console.error('Build abortado: sobrou referência ao editor em index.html');
  process.exit(1);
}
fs.writeFileSync(path.join(OUT, 'index.html'), publicHtml, 'utf8');

for (const name of ['style.css', 'app.js', 'vendor']) {
  const s = path.join(APP_DIR, name);
  const d = path.join(OUT, 'app', name);
  if (fs.statSync(s).isDirectory()) copyDir(s, d);
  else { fs.mkdirSync(path.dirname(d), { recursive: true }); fs.copyFileSync(s, d); }
}

// 3. Dados: índice + um arquivo por release
const releases = readReleases();
writeJSON(path.join(OUT, 'data', 'releases.json'), releases);
for (const r of releases) {
  const one = readOne(r.slug);
  if (one) writeJSON(path.join(OUT, 'data', `${r.slug}.json`), one);
}

console.log(`Build ok: ${releases.length} release(s) geradas em public/`);
