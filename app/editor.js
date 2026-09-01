'use strict';

/* ---------- Edição no navegador (só local) ----------
   O servidor local expõe /api/local e /api/release/<slug>/<parte>.
   Na Vercel esses caminhos não existem, então o botão nunca aparece. */
async function initEditor() {
  try {
    const r = await fetch('api/local');
    if (!r.ok) return;
    const info = await r.json();
    canEdit = !!info.editable;
  } catch (e) {
    return; // site publicado: segue somente leitura
  }
  if (!canEdit) return;

  document.body.classList.add('can-edit');
  $('#editBtn').hidden = false;
  $('#localBadge').hidden = false;
  renderHome(); // reexibe os cards já com o lápis de edição
  $('#editBtn').addEventListener('click', () => (editing ? stopEdit() : startEdit()));
  $('#edCancel').addEventListener('click', cancelEdit);
  $('#edSave').addEventListener('click', saveEdit);
  $('#edText').addEventListener('input', () => { setDirty(true); updatePreview(); });
  ['#edFeature', '#edData', '#edVersao', '#edTags'].forEach((s) =>
    $(s).addEventListener('input', () => setDirty(true)));

  window.addEventListener('beforeunload', (e) => {
    if (!dirty) return;
    e.preventDefault();
    e.returnValue = '';
  });
}

/* Lápis no canto do card da home (chamado por renderHome, em app.js) */
function decorateCardForEdit(wrap, r) {
  if (!canEdit) return;
  const pen = document.createElement('button');
  pen.className = 'card-edit';
  pen.title = 'Editar o texto desta release';
  pen.setAttribute('aria-label', `Editar ${r.feature}`);
  pen.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14.5 6.5l3 3"/></svg>';
  pen.addEventListener('click', (e) => { e.stopPropagation(); openForEdit(r.slug); });
  wrap.appendChild(pen);
}

/* Abre a release já no editor (lápis dos cards da home) */
function openForEdit(slug) {
  if (!canEdit) return;
  if (current === slug && !$('#content').hidden) { startEdit(); return; }
  pendingEdit = true;
  location.hash = slug;
}

function setDirty(v) {
  dirty = v;
  $('#edStatus').textContent = v ? 'alterações não salvas' : '';
  $('#edStatus').classList.toggle('is-dirty', v);
}

function fillEditor() {
  $('#edFeature').value = currentMeta.feature || '';
  $('#edData').value = currentMeta.data || '';
  $('#edVersao').value = currentMeta.versao || '';
  $('#edTags').value = (currentMeta.tags || []).join(', ');
  $('#edText').value = loaded[audience] || '';
  $('#edFile').textContent = `releases/${current}/${audience}.md`;
  updatePreview();
  setDirty(false);
}

function updatePreview() {
  $('#edPreview').innerHTML = marked.parse($('#edText').value || '');
}

function startEdit() {
  if (!canEdit || !current) return;
  editing = true;
  $('#content').classList.add('is-editing');
  $('#doc').hidden = true;
  $('#editor').hidden = false;
  $('#editBtn').querySelector('.edit-label').textContent = 'Fechar editor';
  fillEditor();
  $('#edText').focus();
}

function stopEdit() {
  editing = false;
  $('#content').classList.remove('is-editing');
  $('#editor').hidden = true;
  $('#doc').hidden = false;
  $('#editBtn').querySelector('.edit-label').textContent = 'Editar';
  setDirty(false);
  renderDoc();
}

function cancelEdit() {
  if (dirty && !confirm('Descartar as alterações não salvas?')) return;
  stopEdit();
}

async function saveEdit() {
  if (!editing || !current) return;
  const md = $('#edText').value;
  const meta = {
    feature: $('#edFeature').value.trim(),
    data: $('#edData').value.trim(),
    versao: $('#edVersao').value.trim(),
    tags: $('#edTags').value.split(',').map((t) => t.trim()).filter(Boolean),
  };
  if (meta.data && !/^\d{2}-\d{2}-\d{4}$/.test(meta.data)) {
    toast('Data precisa estar no formato DD-MM-AAAA');
    return;
  }
  const base = 'api/release/' + encodeURIComponent(current) + '/';
  try {
    const r1 = await fetch(base + audience, {
      method: 'PUT',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: md,
    });
    const r2 = await fetch(base + 'meta', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meta),
    });
    if (!r1.ok || !r2.ok) throw new Error('falha ao gravar');
  } catch (e) {
    toast('Não foi possível salvar — o servidor local está rodando?');
    return;
  }

  loaded[audience] = md;
  currentMeta = meta;
  setDirty(false);
  renderMetaBar(meta, current);

  // Título, data e tags mudam a lista lateral e a home.
  releases = await (await fetch('data/releases.json')).json();
  renderList(currentFilter());

  toast(`Salvo em releases/${current}/${audience}.md`);
}
