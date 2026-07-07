'use strict';

/* Estado */
let releases = [];
let current = null;
let audience = 'interno';
let loaded = { interno: '', externo: '' };
let readState = loadRead();

const $ = (s) => document.querySelector(s);

/* ---------- Estado de leitura (por usuário, via localStorage) ---------- */
function loadRead() {
  try { return JSON.parse(localStorage.getItem('rn-read') || '{}') || {}; }
  catch (e) { return {}; }
}
function saveRead() { localStorage.setItem('rn-read', JSON.stringify(readState)); }
function isRead(slug) { return !!readState[slug]; }
function setRead(slug, val) {
  if (val) readState[slug] = Date.now();
  else delete readState[slug];
  saveRead();
  refreshReadUI();
}
function unreadCount() { return releases.filter((r) => !isRead(r.slug)).length; }

/* Atualiza pill do topo, lista lateral, home e botão de leitura */
function refreshReadUI() {
  const n = unreadCount();
  const pill = $('#unreadPill');
  if (n > 0) { pill.hidden = false; pill.textContent = `${n} não lida${n === 1 ? '' : 's'}`; }
  else { pill.hidden = true; }
  renderList(currentFilter());
  if (!$('#home').hidden) renderHome();
  updateReadBtn();
}
function updateReadBtn() {
  const btn = $('#readBtn');
  if (!btn || !current) return;
  const read = isRead(current);
  btn.classList.toggle('is-read', read);
  btn.querySelector('.read-label').textContent = read ? 'Lido' : 'Marcar como lido';
}
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

/* Escapa HTML (NÃO usar o escape() nativo do JS, que faz URL-encoding) */
function escape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- Tema ---------- */
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('rn-theme', t);
  $('#themeToggle').textContent = t === 'dark' ? '☀' : '◐';
}
function initTheme() {
  const saved = localStorage.getItem('rn-theme');
  const t = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(t);
}

/* ---------- Boot ---------- */
async function boot() {
  initTheme();
  const res = await fetch('data/releases.json');
  releases = await res.json();
  renderList(currentFilter());

  $('#search').addEventListener('input', () => renderList(currentFilter()));

  document.querySelectorAll('.seg').forEach((btn) => {
    btn.addEventListener('click', () => setAudience(btn.dataset.tab));
  });

  $('#copyBtn').addEventListener('click', copyCurrent);
  $('#themeToggle').addEventListener('click', () => {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
  $('#menuToggle').addEventListener('click', () => $('#sidebar').classList.toggle('open'));

  $('#readBtn').addEventListener('click', () => {
    if (!current) return;
    const nowRead = !isRead(current);
    setRead(current, nowRead);
    toast(nowRead ? 'Release marcada como lida' : 'Marcada como não lida');
  });
  $('#markAllBtn').addEventListener('click', () => {
    releases.forEach((r) => { readState[r.slug] = Date.now(); });
    saveRead();
    refreshReadUI();
    toast('Todas as releases marcadas como lidas');
  });
  $('#homeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (location.hash) location.hash = '';
    else showHome();
  });

  window.addEventListener('keydown', onKey);
  window.addEventListener('hashchange', routeFromHash);
  refreshReadUI();
  routeFromHash();
}

/* ---------- Lista (agrupada por mês) ---------- */
function currentFilter() {
  const q = $('#search').value.trim().toLowerCase();
  if (!q) return releases;
  return releases.filter((r) => [r.feature, r.versao, r.data, ...(r.tags || [])].join(' ').toLowerCase().includes(q));
}

function monthLabel(sortable) {
  const m = /^(\d{4})-(\d{2})/.exec(sortable || '');
  if (!m) return 'Sem data';
  return `${MESES[parseInt(m[2], 10) - 1]} ${m[1]}`;
}

function renderList(items) {
  const list = $('#list');
  $('#count').textContent = `${items.length} release${items.length === 1 ? '' : 's'}`;
  list.innerHTML = '';
  if (!items.length) {
    list.innerHTML = '<div class="count" style="padding:14px 6px;text-transform:none;letter-spacing:0">Nada encontrado. Ajuste a busca ou crie uma release em <code>releases/</code>.</div>';
    return;
  }
  let group = null;
  for (const r of items) {
    const g = monthLabel(r.dataSortable);
    if (g !== group) {
      group = g;
      const h = document.createElement('div');
      h.className = 'group-label';
      h.textContent = g;
      list.appendChild(h);
    }
    const el = document.createElement('button');
    const unread = !isRead(r.slug);
    el.className = 'item' + (current === r.slug ? ' active' : '') + (unread ? ' unread' : '');
    const dots = (r.tags || []).map((t) => `<span class="tag-dot" style="background:${tagColor(t)}" title="${escape(t)}"></span>`).join('');
    el.innerHTML =
      `<span class="item-mark${unread ? '' : ' is-read'}" title="${unread ? 'Marcar como lido' : 'Marcar como não lido'}"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></span>` +
      `<div class="title">${unread ? '<span class="unread-dot" title="Não lido"></span>' : ''}${escape(r.feature)}</div>` +
      `<div class="sub"><span class="date">${escape(r.data || 's/ data')}</span>` +
      (r.versao ? `<span class="ver">${escape(r.versao)}</span>` : '') +
      (dots ? `<span class="tag-dots">${dots}</span>` : '') + `</div>`;
    el.addEventListener('click', () => { location.hash = r.slug; });
    el.querySelector('.item-mark').addEventListener('click', (e) => {
      e.stopPropagation();
      setRead(r.slug, !isRead(r.slug));
    });
    list.appendChild(el);
  }
}

/* Cor estável por tag (hue derivado do texto) */
function tagColor(tag) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) % 360;
  return `hsl(${h} 65% 55%)`;
}

/* ---------- Abrir release ---------- */
async function open(slug) {
  current = slug;
  const res = await fetch('data/' + encodeURIComponent(slug) + '.json');
  if (!res.ok) return;
  const data = await res.json();
  loaded = { interno: data.interno, externo: data.externo };

  $('#home').hidden = true;
  $('#content').hidden = false;
  updateReadBtn();

  const m = data.meta;
  const tags = (m.tags || []).map((t) =>
    `<span class="chip"><span class="tag-dot" style="background:${tagColor(t)}"></span>${escape(t)}</span>`).join('');
  $('#meta-bar').innerHTML =
    `<div class="feature">${escape(m.feature || slug)}</div>` +
    `<div class="info">` +
    (m.data ? `<span class="chip"><svg class="chip-ico" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>${escape(m.data)}</span>` : '') +
    (m.versao ? `<span class="chip ver">${escape(m.versao)}</span>` : '') +
    tags + `</div>`;

  renderDoc();
  renderList(currentFilter());
  $('#main').scrollTop = 0;
  $('#sidebar').classList.remove('open');
}

/* ---------- Página inicial (home) ---------- */
function showHome() {
  current = null;
  $('#content').hidden = true;
  $('#home').hidden = false;
  renderHome();
  renderList(currentFilter());
  $('#main').scrollTop = 0;
  $('#sidebar').classList.remove('open');
}

function renderHome() {
  const grid = $('#homeGrid');
  const n = unreadCount();
  $('#homeSub').textContent = n > 0
    ? `Você tem ${n} release${n === 1 ? '' : 's'} não lida${n === 1 ? '' : 's'}. Abra, leia e marque como lido.`
    : 'Tudo em dia — você já leu todas as releases.';
  $('#markAllBtn').hidden = n === 0;
  grid.innerHTML = '';
  for (const r of releases) {
    const unread = !isRead(r.slug);
    const card = document.createElement('button');
    card.className = 'home-card' + (unread ? ' unread' : '');
    const dots = (r.tags || []).map((t) => `<span class="tag-dot" style="background:${tagColor(t)}" title="${escape(t)}"></span>`).join('');
    card.innerHTML =
      `<div class="home-card-top">` +
        `<span class="home-badge ${unread ? 'is-unread' : 'is-read'}">${unread ? 'Não lido' : 'Lido'}</span>` +
        (r.versao ? `<span class="ver">${escape(r.versao)}</span>` : '') +
      `</div>` +
      `<div class="home-card-title">${escape(r.feature)}</div>` +
      `<div class="home-card-sub"><span class="date">${escape(r.data || 's/ data')}</span>` +
        (dots ? `<span class="tag-dots">${dots}</span>` : '') + `</div>`;
    card.addEventListener('click', () => { location.hash = r.slug; });
    grid.appendChild(card);
  }
}

function setAudience(a) {
  audience = a;
  document.querySelectorAll('.seg').forEach((b) => b.classList.toggle('active', b.dataset.tab === a));
  renderDoc();
  if (current) history.replaceState(null, '', `#${current}/${a}`);
}

function renderDoc() {
  const md = loaded[audience] || '_(sem conteúdo para esta versão)_';
  const doc = $('#doc');
  doc.innerHTML = marked.parse(md);
  enhance(doc);
}

/* Realça "Em uma frase" e tabelas Antes→Depois */
function enhance(container) {
  const nodes = Array.from(container.childNodes);
  container.innerHTML = '';
  let section = null;
  for (const node of nodes) {
    if (node.nodeName === 'H2') {
      section = document.createElement('section');
      section.className = 'doc-section';
      if (node.textContent.trim().toLowerCase() === 'em uma frase') section.classList.add('lead-section');
      container.appendChild(section);
      section.appendChild(node);
    } else if (section) {
      section.appendChild(node);
    } else {
      container.appendChild(node);
    }
  }
  container.querySelectorAll('table').forEach((tb) => {
    const ths = tb.querySelectorAll('thead th');
    if (ths.length === 2 &&
        ths[0].textContent.trim().toLowerCase() === 'antes' &&
        ths[1].textContent.trim().toLowerCase() === 'depois') {
      tb.classList.add('before-after');
    }
  });

  // Transforma a lista de "mudanças" em accordion (cards expansíveis)
  container.querySelectorAll('.doc-section').forEach((sec) => {
    const h = sec.querySelector('h2');
    if (!h || !/mudan[çc]a/i.test(h.textContent)) return;
    const ol = sec.querySelector(':scope > ol');
    if (!ol) return;
    const wrap = document.createElement('div');
    wrap.className = 'changes';
    let n = 0;
    Array.from(ol.children).forEach((li) => {
      if (li.nodeName !== 'LI') return;
      n += 1;
      const nested = Array.from(li.children).filter((c) => c.nodeName === 'UL' || c.nodeName === 'OL');
      const clone = li.cloneNode(true);
      clone.querySelectorAll(':scope > ul, :scope > ol').forEach((x) => x.remove());
      const num = `<span class="change-num">${n}</span>`;
      const title = `<span class="change-title">${clone.innerHTML.trim()}</span>`;
      if (nested.length) {
        const det = document.createElement('details');
        det.className = 'change';
        const sum = document.createElement('summary');
        sum.innerHTML = num + title;
        det.appendChild(sum);
        const body = document.createElement('div');
        body.className = 'change-body';
        nested.forEach((x) => body.appendChild(x));
        det.appendChild(body);
        wrap.appendChild(det);
      } else {
        const flat = document.createElement('div');
        flat.className = 'change change-flat';
        flat.innerHTML = num + title;
        wrap.appendChild(flat);
      }
    });
    if (wrap.children.length) ol.replaceWith(wrap);
  });
}

/* ---------- Copiar (rich + texto) ---------- */
async function copyCurrent() {
  const md = loaded[audience] || '';
  if (!md) return;
  const html = `<div>${marked.parse(md)}</div>`;
  const btn = $('#copyBtn');
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([md], { type: 'text/plain' }),
      })]);
    } else {
      await navigator.clipboard.writeText(md);
    }
    btn.classList.add('done');
    btn.querySelector('.copy-label').textContent = 'Copiado';
    toast(`Versão ${audience} copiada — cole no e-mail ou Slack`);
    setTimeout(() => { btn.classList.remove('done'); btn.querySelector('.copy-label').textContent = 'Copiar'; }, 1600);
  } catch (e) {
    toast('Não foi possível copiar');
  }
}

let toastTimer = null;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- Roteamento por hash (#slug ou #slug/externo) ---------- */
function routeFromHash() {
  const raw = decodeURIComponent(location.hash.replace(/^#/, ''));
  if (!raw) { showHome(); return; }
  const [slug, aud] = raw.split('/');
  if (aud === 'interno' || aud === 'externo') audience = aud;
  document.querySelectorAll('.seg').forEach((b) => b.classList.toggle('active', b.dataset.tab === audience));
  if (slug && slug !== current) open(slug);
  else if (slug) renderDoc();
}

/* ---------- Teclado ---------- */
function onKey(e) {
  const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
  if (e.key === '/' && !typing) { e.preventDefault(); $('#search').focus(); return; }
  if (e.key === 'Escape' && typing) { document.activeElement.blur(); return; }
  if (typing) return;

  const items = currentFilter();
  if (!items.length) return;
  const idx = items.findIndex((r) => r.slug === current);
  if (e.key === 'j' || e.key === 'ArrowDown') {
    e.preventDefault();
    location.hash = items[Math.min(idx + 1, items.length - 1)].slug;
  } else if (e.key === 'k' || e.key === 'ArrowUp') {
    e.preventDefault();
    location.hash = items[Math.max(idx - 1, 0)].slug;
  } else if (e.key === 'i' && current) {
    setAudience('interno');
  } else if (e.key === 'e' && current) {
    setAudience('externo');
  }
}

boot();
