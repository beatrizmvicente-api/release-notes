'use strict';

/**
 * Cria o esqueleto de uma nova release a partir dos templates.
 * Uso:  node scripts/novo.js "Nome da feature"
 *       node scripts/novo.js "Nome da feature" --data 05-07-2026
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TEMPLATES = path.join(ROOT, 'templates');
const RELEASES = path.join(ROOT, 'releases');

const args = process.argv.slice(2);
const feature = args.find((a) => !a.startsWith('--'));
if (!feature) {
  console.error('Uso: node scripts/novo.js "Nome da feature" [--data DD-MM-AAAA]');
  process.exit(1);
}

const dataFlagIdx = args.indexOf('--data');
let data;
if (dataFlagIdx !== -1 && args[dataFlagIdx + 1]) {
  data = args[dataFlagIdx + 1];
} else {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  data = `${dd}-${mm}-${d.getFullYear()}`;
}

const slug = feature
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const folderName = `${data}-${slug}`;
const dir = path.join(RELEASES, folderName);

if (fs.existsSync(dir)) {
  console.error(`Já existe: releases/${folderName}`);
  process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });

const meta = { feature, data, versao: '', tags: [] };
fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
fs.copyFileSync(path.join(TEMPLATES, 'interno.md'), path.join(dir, 'interno.md'));
fs.copyFileSync(path.join(TEMPLATES, 'externo.md'), path.join(dir, 'externo.md'));

console.log(`Criado: releases/${folderName}`);
console.log('  meta.json  interno.md  externo.md');
