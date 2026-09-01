'use strict';

/* Estado */
let releases = [];
let current = null;
let currentMeta = null;
let audience = 'interno';
let loaded = { interno: '', externo: '' };

/* Edição: só existe rodando local (npm start). No site publicado fica desligada. */
let canEdit = false;
let editing = false;
let dirty = false;
let pendingEdit = false;

const $ = (s) => document.querySelector(s);

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

  $('#homeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (location.hash) location.hash = '';
    else showHome();
  });

  // O editor (app/editor.js) só existe rodando local — o build da Vercel não o inclui.
  if (typeof initEditor === 'function') initEditor();

  window.addEventListener('keydown', onKey);
  window.addEventListener('hashchange', routeFromHash);
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
    el.className = 'item' + (current === r.slug ? ' active' : '');
    const dots = (r.tags || []).map((t) => `<span class="tag-dot" style="background:${tagColor(t)}" title="${escape(t)}"></span>`).join('');
    el.innerHTML =
      `<div class="title">${escape(r.feature)}</div>` +
      `<div class="sub"><span class="date">${escape(r.data || 's/ data')}</span>` +
      (r.versao ? `<span class="ver">${escape(r.versao)}</span>` : '') +
      (dots ? `<span class="tag-dots">${dots}</span>` : '') + `</div>`;
    el.addEventListener('click', () => { location.hash = r.slug; });
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
  currentMeta = data.meta || {};

  $('#home').hidden = true;
  $('#content').hidden = false;

  renderMetaBar(currentMeta, slug);
  renderVisual(data.visual, slug);
  renderDoc();
  renderList(currentFilter());
  $('#main').scrollTop = 0;
  $('#sidebar').classList.remove('open');

  if (pendingEdit) { pendingEdit = false; startEdit(); }
}

function renderMetaBar(m, slug) {
  const tags = (m.tags || []).map((t) =>
    `<span class="chip"><span class="tag-dot" style="background:${tagColor(t)}"></span>${escape(t)}</span>`).join('');
  $('#meta-bar').innerHTML =
    `<div class="feature">${escape(m.feature || slug || '')}</div>` +
    `<div class="info">` +
    (m.data ? `<span class="chip"><svg class="chip-ico" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>${escape(m.data)}</span>` : '') +
    (m.versao ? `<span class="chip ver">${escape(m.versao)}</span>` : '') +
    tags + `</div>`;
}

/* ============================================================
   Antes e depois — o player visual
   ------------------------------------------------------------
   Duas imagens da mesma tela, antes e depois, lado a lado. A cada
   passo a "câmera" vai para o mesmo ponto nos dois lados, acende a
   região e troca a legenda. É opcional: release sem visual.json
   não mostra nada aqui.
   ============================================================ */

const BA_DURACAO = 7000;   // ms por passo no modo automático
let baPlayer = null;

/* As legendas vêm do visual.json, escrito por quem publica a release, e aceitam
   ênfase simples. Passa por uma peneira de tags para não virar porta de HTML solto. */
function textoRico(s) {
  return escape(String(s || '')).replace(/&lt;(\/?)(b|strong|i|em|code|br)&gt;/g, '<$1$2>');
}

function renderVisual(v, slug) {
  const host = $('#visual');
  if (baPlayer) { baPlayer.destruir(); baPlayer = null; }
  host.innerHTML = '';
  host.hidden = !v;
  if (v) baPlayer = montarPlayer(host, v, slug);
}

/* Qual região da imagem esse passo olha. null = a tela inteira. */
function focoDe(passo, lado) {
  const f = passo.foco;
  if (!f || f === 'tudo') return null;
  if (Array.isArray(f)) return f.length === 4 ? f : null;
  const r = f[lado];
  return Array.isArray(r) && r.length === 4 ? r : null;
}

const ICONE = {
  prev: '<svg viewBox="0 0 24 24"><path d="M18 6 8 12l10 6z"/><rect x="5" y="6" width="2" height="12" rx="1"/></svg>',
  next: '<svg viewBox="0 0 24 24"><path d="M6 6l10 6-10 6z"/><rect x="17" y="6" width="2" height="12" rx="1"/></svg>',
  play: '<path d="M7 5l12 7-12 7z"/>',
  pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
};

function montarPlayer(host, v, slug) {
  const media = (nome) => `media/${encodeURIComponent(slug)}/${encodeURIComponent(nome)}`;
  const painel = (lado, rotulo, img) => `
    <figure class="ba-pane ba-pane--${lado}">
      <figcaption class="ba-bar">
        <span class="ba-tag">${lado === 'antes' ? 'Antes' : 'Depois'}</span>
        <span class="ba-rot">${escape(img.rotulo || rotulo)}</span>
      </figcaption>
      <div class="ba-screen">
        <div class="ba-scaler"><img src="${media(img.src)}" alt="${escape(rotulo)}" /><i class="ba-spot"></i></div>
        ${lado === 'antes' ? '<div class="ba-void"><span class="ba-eyebrow">Sem equivalente</span><p></p></div>' : ''}
      </div>
    </figure>`;

  const sec = document.createElement('section');
  sec.className = 'ba';
  sec.innerHTML = `
    <div class="ba-head">
      <span class="ba-eyebrow">Antes e depois</span>
      ${v.titulo ? `<h2 class="ba-title">${escape(v.titulo)}</h2>` : ''}
      ${v.resumo ? `<p class="ba-lead">${escape(v.resumo)}</p>` : ''}
    </div>
    <ul class="ba-steps"></ul>
    <div class="ba-caption">
      <div class="ba-cap-head">
        <span class="ba-eyebrow ba-passo"></span>
        <h3 class="ba-cap-title"></h3>
      </div>
      <div class="ba-cap-cols">
        <div class="ba-cap ba-cap--antes"><h4>Antes</h4><p></p></div>
        <div class="ba-cap ba-cap--depois"><h4>Depois</h4><p></p></div>
      </div>
    </div>
    <div class="ba-stage">
      ${painel('antes', 'Como era', v.antes)}
      ${painel('depois', 'Como ficou', v.depois)}
    </div>
    <div class="ba-controls">
      <button class="ba-btn" data-acao="prev" aria-label="Passo anterior">${ICONE.prev}</button>
      <button class="ba-btn ba-btn--play" data-acao="play" aria-label="Reproduzir"><svg viewBox="0 0 24 24">${ICONE.play}</svg></button>
      <button class="ba-btn" data-acao="next" aria-label="Próximo passo">${ICONE.next}</button>
      <div class="ba-track"><i></i></div>
      <span class="ba-counter"></span>
    </div>`;
  host.appendChild(sec);

  const q = (s) => sec.querySelector(s);
  const painéis = { antes: q('.ba-pane--antes'), depois: q('.ba-pane--depois') };
  const fill = q('.ba-track > i');
  const btnPlay = q('.ba-btn--play');
  const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let idx = 0, tocando = false, raf = null, inicio = 0, manual = false;

  /* --- chips dos passos --- */
  const listaSteps = q('.ba-steps');
  v.passos.forEach((p, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = `<span class="ba-n">${i + 1}</span>${escape(p.chip)}`;
    b.addEventListener('click', () => { manual = true; pausar(); ir(i); });
    li.appendChild(b);
    listaSteps.appendChild(li);
  });
  const chips = listaSteps.querySelectorAll('button');

  /* --- a câmera ---
     Escala 1 = a imagem ocupando a largura do painel. A partir daí a câmera
     aproxima até a região pedida caber com folga, sem passar do limite que
     embaça o print. Os dois lados andam sempre na MESMA escala: é o que deixa
     um painel comparável com o outro. */
  const MARGEM = 22, ZOOM_MAX = 3;

  function medidas(pane) {
    const tela = pane.querySelector('.ba-screen');
    const img = pane.querySelector('img');
    const L = tela.clientWidth, A = tela.clientHeight;
    if (!L || !img.naturalWidth) return null;
    return { L, A, alturaPapel: L * (img.naturalHeight / img.naturalWidth) };
  }

  function escalaPara(pane, rect) {
    const m = medidas(pane);
    if (!m) return null;
    const cabeInteira = Math.min(1, m.A / m.alturaPapel);
    if (!rect) return cabeInteira;
    const s = Math.min((m.L - 2 * MARGEM) / (rect[2] * m.L), (m.A - 2 * MARGEM) / (rect[3] * m.alturaPapel));
    return Math.max(cabeInteira, Math.min(s, ZOOM_MAX));
  }

  function posicionar(pane, rect, s) {
    const m = medidas(pane);
    if (!m || s == null) return;
    const { L, A, alturaPapel } = m;
    const scaler = pane.querySelector('.ba-scaler');
    const spot = pane.querySelector('.ba-spot');

    let x, y;
    if (!rect) {
      x = (L - L * s) / 2;
      y = 0;
    } else {
      const rx = rect[0] * L, ry = rect[1] * alturaPapel;
      const rl = rect[2] * L, ra = rect[3] * alturaPapel;
      // Centraliza a região; nas bordas, encosta na imagem em vez de mostrar vazio.
      y = ry - (A - s * ra) / (2 * s);
      y = alturaPapel * s <= A ? 0 : Math.max(0, Math.min(y, alturaPapel - A / s));
      x = (L - s * rl) / 2 - s * rx;
      x = L * s <= L ? (L - L * s) / 2 : Math.max(L - L * s, Math.min(0, x));
    }
    scaler.style.transform = `translateX(${x}px) scale(${s}) translateY(${-y}px)`;

    if (rect) {
      spot.style.left = rect[0] * 100 + '%';
      spot.style.top = rect[1] * 100 + '%';
      spot.style.width = rect[2] * 100 + '%';
      spot.style.height = rect[3] * 100 + '%';
    }
    spot.classList.toggle('is-on', !!rect);
  }

  function ir(i) {
    idx = (i + v.passos.length) % v.passos.length;
    const p = v.passos[idx];

    // Quem tem região a mostrar anda na MESMA escala dos dois lados. Um lado sem
    // região (visão geral, ou o painel vazio) fica no tamanho que couber, e não
    // puxa o outro junto — na visão geral, a diferença de altura entre as duas
    // páginas já é parte do que se quer ver.
    const rA = focoDe(p, 'antes'), rD = focoDe(p, 'depois');
    const usaA = !!rA && !p.semAntes;
    const juntas = [usaA ? escalaPara(painéis.antes, rA) : null, rD ? escalaPara(painéis.depois, rD) : null]
      .filter((e) => e != null);
    const s = juntas.length ? Math.min(...juntas) : null;
    posicionar(painéis.antes, rA, usaA && s != null ? s : escalaPara(painéis.antes, rA));
    posicionar(painéis.depois, rD, rD && s != null ? s : escalaPara(painéis.depois, rD));

    // Passo que só existe no depois: o lado esquerdo assume que não há equivalente.
    painéis.antes.classList.toggle('is-void', !!p.semAntes);
    if (p.semAntes) painéis.antes.querySelector('.ba-void p').innerHTML = textoRico(p.semAntes);

    chips.forEach((c, k) => c.setAttribute('aria-current', k === idx ? 'true' : 'false'));
    q('.ba-passo').textContent = `Passo ${idx + 1} de ${v.passos.length}`;
    q('.ba-cap-title').textContent = p.titulo;
    q('.ba-cap--antes p').innerHTML = textoRico(p.antes);
    q('.ba-cap--depois p').innerHTML = textoRico(p.depois);
    q('.ba-counter').textContent = `${idx + 1} / ${v.passos.length}`;
    inicio = 0;
    fill.style.width = '0%';
  }

  /* --- modo automático --- */
  function passo(ts) {
    if (!tocando) return;
    if (!inicio) inicio = ts;
    const p = (ts - inicio) / BA_DURACAO;
    fill.style.width = Math.min(100, p * 100) + '%';
    if (p >= 1) { ir(idx + 1); inicio = ts; }
    raf = requestAnimationFrame(passo);
  }
  function tocar() {
    if (tocando) return;
    tocando = true;
    btnPlay.querySelector('svg').innerHTML = ICONE.pause;
    btnPlay.setAttribute('aria-label', 'Pausar');
    inicio = 0;
    raf = requestAnimationFrame(passo);
  }
  function pausar() {
    tocando = false;
    if (raf) cancelAnimationFrame(raf);
    btnPlay.querySelector('svg').innerHTML = ICONE.play;
    btnPlay.setAttribute('aria-label', 'Reproduzir');
    fill.style.width = '0%';
  }

  q('.ba-controls').addEventListener('click', (e) => {
    const b = e.target.closest('.ba-btn');
    if (!b) return;
    manual = true;
    const acao = b.dataset.acao;
    if (acao === 'play') { tocando ? pausar() : tocar(); return; }
    pausar();
    ir(acao === 'next' ? idx + 1 : idx - 1);
  });

  /* --- só roda enquanto está na tela; para de rodar assim que sai --- */
  const observador = new IntersectionObserver((entradas) => {
    const visivel = entradas[0].isIntersecting;
    if (visivel && !manual && !reduzido) tocar();
    else if (!visivel) pausar();
  }, { threshold: 0.3 });
  observador.observe(sec);

  /* --- a legenda vem antes das imagens: reserva a altura do passo mais longo,
         senão trocar de passo empurra as telas pra cima e pra baixo --- */
  function reservarAltura() {
    const cap = q('.ba-caption');
    const titulo = q('.ba-cap-title');
    const [pa, pd] = [q('.ba-cap--antes p'), q('.ba-cap--depois p')];
    cap.style.minHeight = '';
    let maior = 0;
    for (const p of v.passos) {
      titulo.textContent = p.titulo;
      pa.innerHTML = textoRico(p.antes);
      pd.innerHTML = textoRico(p.depois);
      maior = Math.max(maior, cap.offsetHeight);
    }
    cap.style.minHeight = `${maior}px`;
  }

  /* --- a régua muda de tamanho: recalcula a câmera e a altura da legenda --- */
  let t = null;
  const aoRedimensionar = () => {
    clearTimeout(t);
    t = setTimeout(() => { reservarAltura(); ir(idx); }, 120);
  };
  window.addEventListener('resize', aoRedimensionar);

  // As imagens podem chegar depois; sem o tamanho real não dá para posicionar.
  sec.querySelectorAll('img').forEach((img) => {
    if (!img.complete) img.addEventListener('load', () => ir(idx), { once: true });
  });

  if (reduzido) sec.classList.add('ba-sem-animacao');
  reservarAltura();
  ir(0);

  return {
    anterior() { manual = true; pausar(); ir(idx - 1); },
    proximo() { manual = true; pausar(); ir(idx + 1); },
    destruir() {
      pausar();
      observador.disconnect();
      window.removeEventListener('resize', aoRedimensionar);
      clearTimeout(t);
    },
  };
}

/* ---------- Página inicial (home) ---------- */
function showHome() {
  current = null;
  if (baPlayer) { baPlayer.destruir(); baPlayer = null; }
  $('#content').hidden = true;
  $('#home').hidden = false;
  renderHome();
  renderList(currentFilter());
  $('#main').scrollTop = 0;
  $('#sidebar').classList.remove('open');
}

/* "2026-07-22" -> "22 de Julho de 2026" */
function dayLabel(sortable, fallback) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(sortable || '');
  if (!m) return fallback || 'Sem data';
  return `${parseInt(m[3], 10)} de ${MESES[parseInt(m[2], 10) - 1]} de ${m[1]}`;
}

/* Data local do navegador em "AAAA-MM-DD" */
function todayISO() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function renderHome() {
  const grid = $('#homeGrid');
  grid.innerHTML = '';

  // Agrupa por dia, preservando a ordem de releases[] (mais recente primeiro).
  const groups = [];
  const byKey = new Map();
  for (const r of releases) {
    const key = r.dataSortable || 'sem-data';
    let g = byKey.get(key);
    if (!g) { g = { sortable: r.dataSortable, data: r.data, items: [] }; byKey.set(key, g); groups.push(g); }
    g.items.push(r);
  }

  const today = todayISO();
  groups.forEach((g, gi) => {
    const isLatest = gi === 0 && !!g.sortable;
    const isToday = !!g.sortable && g.sortable === today;

    const section = document.createElement('section');
    section.className = 'day-group' + (isLatest ? ' is-latest' : '');

    const badge = isToday ? '<span class="day-badge">Hoje</span>'
      : isLatest ? '<span class="day-badge">Mais recente</span>' : '';
    const n = g.items.length;
    const head = document.createElement('div');
    head.className = 'day-head';
    head.innerHTML =
      `<span class="day-label">${escape(dayLabel(g.sortable, g.data))}</span>` + badge +
      `<span class="day-count">${n} release${n === 1 ? '' : 's'}</span>`;
    section.appendChild(head);

    const col = document.createElement('div');
    col.className = 'day-list';
    for (const r of g.items) {
      const wrap = document.createElement('div');
      wrap.className = 'home-card-wrap';

      const card = document.createElement('button');
      card.className = 'home-card';
      const dots = (r.tags || []).map((t) => `<span class="tag-dot" style="background:${tagColor(t)}" title="${escape(t)}"></span>`).join('');
      card.innerHTML =
        (r.versao ? `<div class="home-card-top"><span class="ver">${escape(r.versao)}</span></div>` : '') +
        `<div class="home-card-title">${escape(r.feature)}</div>` +
        `<div class="home-card-sub"><span class="date">${escape(r.data || 's/ data')}</span>` +
          (r.temVisual ? '<span class="visual-badge" title="Tem antes e depois em imagem">▣ antes e depois</span>' : '') +
          (dots ? `<span class="tag-dots">${dots}</span>` : '') + `</div>`;
      card.addEventListener('click', () => { location.hash = r.slug; });
      wrap.appendChild(card);

      // Gancho do editor local; no site publicado a função não existe.
      if (typeof decorateCardForEdit === 'function') decorateCardForEdit(wrap, r);

      col.appendChild(wrap);
    }
    section.appendChild(col);
    grid.appendChild(section);
  });
}

function setAudience(a) {
  if (a === audience) return;
  if (editing && dirty && !confirm('Descartar as alterações não salvas?')) return;
  audience = a;
  document.querySelectorAll('.seg').forEach((b) => b.classList.toggle('active', b.dataset.tab === a));
  if (editing) fillEditor(); else renderDoc();
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

  // ---- Camadas de leitura ----
  // Camada 2: "O que muda no dia a dia" ganha filtro por papel.
  // Camada 3: aprofundamento (Por que importa / As mudanças / Detalhes) colapsa.
  Array.from(container.querySelectorAll('.doc-section')).forEach((sec) => {
    const h = sec.querySelector(':scope > h2');
    if (!h) return;
    const t = h.textContent.trim().toLowerCase();
    if (/dia a dia/.test(t)) buildRoleFilter(sec);
    else if (/por que importa/.test(t) || /mudan[çc]a/.test(t) || /detalhe/.test(t)) collapseSection(sec, h);
  });
}

/* Camada 3 — colapsa a seção inteira num <details> (fechado por padrão) */
function collapseSection(sec, h) {
  const det = document.createElement('details');
  det.className = 'doc-collapse';
  const sum = document.createElement('summary');
  sum.innerHTML = `<span class="collapse-title">${h.innerHTML}</span>`;
  det.appendChild(sum);
  const body = document.createElement('div');
  body.className = 'collapse-body';
  Array.from(sec.childNodes).forEach((n) => { if (n !== h) body.appendChild(n); });
  det.appendChild(body);
  sec.innerHTML = '';
  sec.appendChild(det);
  sec.classList.add('is-collapsed');
}

/* Camada 2 — extrai o papel de "**Pro X:** ..." em cada item */
function roleLabel(li) {
  const strong = li.querySelector('strong');
  const raw = strong ? strong.textContent : (li.textContent.split(/[:：]/)[0] || '');
  return raw.replace(/^\s*pro\s+/i, '').replace(/\([^)]*\)/g, '').replace(/[:：].*$/, '').trim();
}
function buildRoleFilter(sec) {
  const ul = sec.querySelector(':scope > ul');
  if (!ul) return;
  const items = Array.from(ul.children).filter((li) => li.nodeName === 'LI');
  if (items.length < 2) return;
  const roles = [];
  items.forEach((li) => {
    const r = roleLabel(li);
    li.dataset.role = r;
    if (r && !roles.includes(r)) roles.push(r);
  });
  if (roles.length < 2) return; // sem papéis distintos, não vale filtro
  const bar = document.createElement('div');
  bar.className = 'role-filter';
  const mk = (label, value) => {
    const b = document.createElement('button');
    b.className = 'role-chip';
    b.textContent = label;
    b.dataset.role = value;
    b.addEventListener('click', () => selectRole(sec, value, false));
    return b;
  };
  bar.appendChild(mk('Todos', '*'));
  roles.forEach((r) => bar.appendChild(mk(r, r)));
  sec.insertBefore(bar, ul);
  const saved = localStorage.getItem('rn-role') || '*';
  selectRole(sec, roles.includes(saved) ? saved : '*', true);
}
function selectRole(sec, value, silent) {
  sec.querySelectorAll(':scope > .role-filter .role-chip').forEach((c) =>
    c.classList.toggle('active', c.dataset.role === value));
  sec.querySelectorAll(':scope > ul > li').forEach((li) => {
    li.hidden = !(value === '*' || li.dataset.role === value);
  });
  if (!silent) localStorage.setItem('rn-role', value);
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
  if (editing) {
    const want = `#${current}/${audience}`;
    if (location.hash === want) return;            // veio da nossa própria restauração
    if (dirty && !confirm('Você tem alterações não salvas. Sair mesmo assim?')) {
      location.hash = want;
      return;
    }
    stopEdit();
  }
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
  const mod = e.ctrlKey || e.metaKey;
  if (mod && e.key.toLowerCase() === 's') {
    if (!editing) return;
    e.preventDefault();
    saveEdit();
    return;
  }
  if (mod && e.key.toLowerCase() === 'e') {
    if (!canEdit || !current) return;
    e.preventDefault();
    editing ? cancelEdit() : startEdit();
    return;
  }
  if (e.key === 'Escape' && editing) { e.preventDefault(); cancelEdit(); return; }

  const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
  if (e.key === '/' && !typing) { e.preventDefault(); $('#search').focus(); return; }
  if (e.key === 'Escape' && typing) { document.activeElement.blur(); return; }
  if (typing) return;

  // Setas laterais andam pelos passos do antes/depois, quando a release tem um.
  if (baPlayer && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
    e.preventDefault();
    e.key === 'ArrowRight' ? baPlayer.proximo() : baPlayer.anterior();
    return;
  }

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
