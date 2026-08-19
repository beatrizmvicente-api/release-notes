'use strict';

/**
 * Leitura das releases a partir das pastas em releases/.
 * Compartilhado pelo servidor local (server.js) e pelo build estático (build.js).
 * Zero dependências.
 */

const fs = require('fs');
const path = require('path');

const RELEASES_DIR = path.join(__dirname, 'releases');

// Imagens do antes/depois que moram na pasta da release.
const IMAGEM = /\.(png|webp|jpe?g|gif|svg)$/i;

// Converte "DD-MM-AAAA" em ordenável "AAAA-MM-DD" (retorna '' se inválido).
function toSortable(data) {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec((data || '').trim());
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

/**
 * Lê o visual.json da release — o antes/depois em imagem, com os passos da comparação.
 * É opcional: release sem ele continua funcionando igual, só com o texto.
 * Volta null se estiver ausente, quebrado ou incompleto — nunca derruba o build.
 */
function readVisual(dir) {
  const arquivo = path.join(dir, 'visual.json');
  if (!fs.existsSync(arquivo)) return null;
  let v;
  try {
    v = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
  } catch (e) {
    console.warn(`visual.json inválido em ${path.basename(dir)}: ${e.message}`);
    return null;
  }
  const lado = (l) => (l && typeof l.src === 'string' && IMAGEM.test(l.src)
    ? { src: l.src, rotulo: l.rotulo || '' } : null);
  const antes = lado(v.antes);
  const depois = lado(v.depois);
  const passos = (Array.isArray(v.passos) ? v.passos : []).filter((p) => p && p.titulo);
  // Sem os dois lados ou sem nenhum passo não há comparação para mostrar.
  if (!antes || !depois || !passos.length) {
    console.warn(`visual.json incompleto em ${path.basename(dir)}: precisa de antes.src, depois.src e ao menos um passo`);
    return null;
  }
  // O arquivo citado tem que existir, senão o player abre com painel quebrado.
  for (const [nome, l] of [['antes', antes], ['depois', depois]]) {
    if (!fs.existsSync(path.join(dir, l.src))) {
      console.warn(`visual.json em ${path.basename(dir)}: não achei ${nome}.src (${l.src})`);
      return null;
    }
  }
  return {
    titulo: v.titulo || '',
    resumo: v.resumo || '',
    antes,
    depois,
    passos: passos.map((p) => ({
      chip: p.chip || p.titulo,
      titulo: p.titulo,
      foco: p.foco || null,
      antes: p.antes || '',
      depois: p.depois || '',
      semAntes: p.semAntes || '',
    })),
  };
}

// Nomes dos arquivos de imagem da release (o que server e build precisam servir).
function mediaFiles(slug) {
  const dir = releaseDir(slug);
  if (!dir) return [];
  return fs.readdirSync(dir).filter((f) => IMAGEM.test(f));
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
      temVisual: fs.existsSync(path.join(dir, 'visual.json')),
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
  return { meta, interno: readMd('interno.md'), externo: readMd('externo.md'), visual: readVisual(dir) };
}

/* ---------- Escrita (usada só pelo servidor local, nunca pelo build) ---------- */

// Resolve a pasta de uma release, bloqueando path traversal. null se não existir.
function releaseDir(slug) {
  if (!/^[\w .+-]+$/.test(slug || '')) return null;
  const dir = path.join(RELEASES_DIR, slug);
  if (!dir.startsWith(RELEASES_DIR) || !fs.existsSync(dir)) return null;
  return dir;
}

// Grava interno.md / externo.md de uma release. Lança se slug ou tipo inválido.
function writeDoc(slug, kind, content) {
  if (kind !== 'interno' && kind !== 'externo') throw new Error('tipo inválido');
  const dir = releaseDir(slug);
  if (!dir) throw new Error('release não encontrada');
  fs.writeFileSync(path.join(dir, `${kind}.md`), String(content), 'utf8');
}

// Grava meta.json preservando só os campos conhecidos.
function writeMeta(slug, meta) {
  const dir = releaseDir(slug);
  if (!dir) throw new Error('release não encontrada');
  const clean = {
    feature: String(meta.feature || '').trim(),
    data: String(meta.data || '').trim(),
    versao: String(meta.versao || '').trim(),
    tags: (Array.isArray(meta.tags) ? meta.tags : []).map((t) => String(t).trim()).filter(Boolean),
  };
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(clean, null, 2) + '\n', 'utf8');
  return clean;
}

module.exports = {
  RELEASES_DIR, IMAGEM, toSortable,
  readReleases, readOne, readVisual, mediaFiles, releaseDir,
  writeDoc, writeMeta,
};
