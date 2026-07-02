'use strict';

/**
 * Leitura das releases a partir das pastas em releases/.
 * Compartilhado pelo servidor local (server.js) e pelo build estático (build.js).
 * Zero dependências.
 */

const fs = require('fs');
const path = require('path');

const RELEASES_DIR = path.join(__dirname, 'releases');

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

module.exports = { RELEASES_DIR, toSortable, readReleases, readOne };
