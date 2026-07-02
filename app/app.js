'use strict';

let releases = [];
let current = null;
let activeTab = 'interno';
let loaded = { interno: '', externo: '' };

const $ = (sel) => document.querySelector(sel);

async function boot() {
  const res = await fetch('/api/releases');
  releases = await res.json();
  renderList(releases);

  $('#search').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const filtered = !q ? releases : releases.filter((r) => {
      const hay = [r.feature, r.versao, r.data, ...(r.tags || [])].join(' ').toLowerCase();
      return hay.includes(q);
    });
    renderList(filtered);
  });

  document.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b === btn));
      renderDoc();
    });
  });
}

function renderList(items) {
  const list = $('#list');
  $('#count').textContent = `${items.length} release${items.length === 1 ? '' : 's'}`;
  list.innerHTML = '';
  if (!items.length) {
    list.innerHTML = '<div class="count" style="padding:12px 2px">Nenhuma release ainda. Crie a primeira em releases/.</div>';
    return;
  }
  for (const r of items) {
    const el = document.createElement('button');
    el.className = 'item' + (current === r.slug ? ' active' : '');
    const tags = (r.tags || []).map((t) => `<span class="tag">${escape(t)}</span>`).join(' ');
    el.innerHTML =
      `<div class="title">${escape(r.feature)}</div>` +
      `<div class="sub"><span>${escape(r.data || 's/ data')}</span>` +
      (r.versao ? `<span>${escape(r.versao)}</span>` : '') + tags + `</div>`;
    el.addEventListener('click', () => open(r.slug));
    list.appendChild(el);
  }
}

async function open(slug) {
  current = slug;
  const res = await fetch('/api/release/' + encodeURIComponent(slug));
  if (!res.ok) return;
  const data = await res.json();
  loaded = { interno: data.interno, externo: data.externo };

  $('#empty').hidden = true;
  $('#content').hidden = false;

  const m = data.meta;
  $('#meta-bar').innerHTML =
    `<div class="feature">${escape(m.feature || slug)}</div>` +
    `<div class="info"><span>${escape(m.data || '')}</span>` +
    (m.versao ? `<span>Versão ${escape(m.versao)}</span>` : '') +
    ((m.tags || []).length ? `<span>${(m.tags).map(escape).join(', ')}</span>` : '') +
    `</div>`;

  renderDoc();
  renderList(currentFilter());
}

function currentFilter() {
  const q = $('#search').value.trim().toLowerCase();
  if (!q) return releases;
  return releases.filter((r) => [r.feature, r.versao, r.data, ...(r.tags || [])].join(' ').toLowerCase().includes(q));
}

function renderDoc() {
  const md = loaded[activeTab] || '_(sem conteúdo para esta versão)_';
  $('#doc').innerHTML = marked.parse(md);
}

function escape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

boot();
