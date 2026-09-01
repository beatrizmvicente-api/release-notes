'use strict';

/**
 * Tira o print de uma página (ou de um pedaço dela) em PNG, no tamanho exato.
 * Usa o Chrome/Edge que já está instalado, em modo headless, pelo DevTools Protocol.
 * Zero dependências — só módulos nativos do Node 18+ (usa o WebSocket global).
 *
 * É a ferramenta que gera o antes.png / depois.png de uma release. O mesmo comando
 * também mede regiões da tela e devolve os retângulos já normalizados, prontos para
 * colar no campo "foco" do visual.json.
 *
 * Uso:
 *   node scripts/print.js <url-ou-arquivo> <saida.png> [opções]
 *
 * Opções:
 *   --largura=1000      largura da janela, em px de CSS (padrão: 1000)
 *   --altura=900        altura da janela; a captura passa dela (padrão: 900)
 *   --escala=2          densidade do print — 2 = retina (padrão: 2)
 *   --qualidade=88      só para .webp/.jpg — 0 a 100 (padrão: 88)
 *   --seletor=#app      captura só esse elemento, em vez da página inteira
 *   --espera=600        ms de espera depois do load, para animação assentar (padrão: 600)
 *   --preparo=arq.js    roda esse JS na página antes de medir e capturar
 *   --semente=arq.js    roda esse JS ANTES de a página carregar, a cada navegação — é
 *                       assim que se semeia o token de uma tela que exige login
 *   --medir=#a,#b       além do print, imprime o retângulo normalizado de cada
 *                       seletor ([x, y, largura, altura] em fração da imagem)
 *
 * O formato sai da extensão da saída: .png (sem perda) ou .webp/.jpg (bem mais leve).
 * Como esses arquivos vão pro git junto com a release, prefira .webp.
 *
 * Exemplos:
 *   node scripts/print.js http://localhost:8080/contratar antes.webp --largura=1000
 *   node scripts/print.js depois.html depois.webp --medir=#resumo,#lista
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

/* ---------- argumentos ---------- */

const argv = process.argv.slice(2);
const posicionais = argv.filter((a) => !a.startsWith('--'));
const flag = (nome, padrao) => {
  const hit = argv.find((a) => a.startsWith(`--${nome}=`));
  return hit ? hit.slice(nome.length + 3) : padrao;
};

const alvo = posicionais[0];
const saida = posicionais[1];
if (!alvo || !saida) {
  console.error('Uso: node scripts/print.js <url-ou-arquivo> <saida.png> [--largura=1000] [--seletor=#id] [--medir=#a,#b]');
  process.exit(1);
}

const LARGURA = parseInt(flag('largura', '1000'), 10);
const ALTURA = parseInt(flag('altura', '900'), 10);
const ESCALA = parseFloat(flag('escala', '2'));
const SELETOR = flag('seletor', null);
const ESPERA = parseInt(flag('espera', '600'), 10);
const PREPARO = flag('preparo', null);
const SEMENTE = flag('semente', null);
const MEDIR = (flag('medir', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
const QUALIDADE = parseInt(flag('qualidade', '88'), 10);

const FORMATOS = { '.png': 'png', '.webp': 'webp', '.jpg': 'jpeg', '.jpeg': 'jpeg' };
const FORMATO = FORMATOS[path.extname(saida).toLowerCase()];
if (!FORMATO) {
  console.error('A saída precisa terminar em .png, .webp ou .jpg');
  process.exit(1);
}

// Caminho local vira file:// — URL passa direto.
const url = /^https?:|^file:/.test(alvo) ? alvo : 'file:///' + path.resolve(alvo).replace(/\\/g, '/');

/* ---------- achar o navegador ---------- */

function acharNavegador() {
  const candidatos = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  const achado = candidatos.find((c) => fs.existsSync(c));
  if (!achado) {
    console.error('Não achei o Chrome nem o Edge. Aponte com a variável CHROME_PATH.');
    process.exit(1);
  }
  return achado;
}

/* ---------- cliente mínimo do DevTools Protocol ---------- */

function conectar(wsUrl) {
  return new Promise((ok, falhou) => {
    const ws = new WebSocket(wsUrl);
    let seq = 0;
    const pendentes = new Map();
    const ouvintes = [];

    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pendentes.has(msg.id)) {
        const p = pendentes.get(msg.id);
        pendentes.delete(msg.id);
        if (msg.error) p.falhou(new Error(msg.error.message));
        else p.ok(msg.result);
      } else if (msg.method) {
        ouvintes.slice().forEach((fn) => fn(msg));
      }
    });
    ws.addEventListener('error', () => falhou(new Error('Falha ao falar com o navegador')));
    ws.addEventListener('open', () => ok({
      envia(metodo, params, sessionId) {
        const id = ++seq;
        return new Promise((r, j) => {
          pendentes.set(id, { ok: r, falhou: j });
          ws.send(JSON.stringify({ id, method: metodo, params: params || {}, sessionId }));
        });
      },
      espera(metodo) {
        return new Promise((r) => {
          const fn = (m) => {
            if (m.method !== metodo) return;
            const i = ouvintes.indexOf(fn);
            if (i >= 0) ouvintes.splice(i, 1);
            r(m.params);
          };
          ouvintes.push(fn);
        });
      },
      fecha() { ws.close(); },
    }));
  });
}

// Sobe o navegador e devolve o endereço do DevTools que ele anuncia no stderr.
function abrirNavegador() {
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'rn-print-'));
  const proc = spawn(acharNavegador(), [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--remote-debugging-port=0',
    `--user-data-dir=${perfil}`,
    'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  return new Promise((ok, falhou) => {
    let buf = '';
    const limite = setTimeout(() => falhou(new Error('O navegador não respondeu a tempo')), 20000);
    proc.stderr.on('data', (c) => {
      buf += c.toString();
      const m = /ws:\/\/[^\s]+/.exec(buf);
      if (m) { clearTimeout(limite); ok({ proc, perfil, wsUrl: m[0] }); }
    });
    proc.on('exit', () => { clearTimeout(limite); falhou(new Error('O navegador fechou sozinho')); });
  });
}

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- captura ---------- */

async function main() {
  const { proc, perfil, wsUrl } = await abrirNavegador();
  const cdp = await conectar(wsUrl);

  const { targetId } = await cdp.envia('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.envia('Target.attachToTarget', { targetId, flatten: true });
  const chama = (metodo, params) => cdp.envia(metodo, params, sessionId);

  await chama('Page.enable');
  await chama('Runtime.enable');
  await chama('Emulation.setDeviceMetricsOverride', {
    width: LARGURA, height: ALTURA, deviceScaleFactor: ESCALA, mobile: false,
  });

  // --semente roda ANTES de qualquer script da página, em toda navegação. É o gancho para
  // telas que exigem login: semear o token que o app lê no boot. O --preparo não serve aqui,
  // porque ele só roda depois que o app já bootou — e já redirecionou para o login.
  if (SEMENTE) {
    const js = fs.readFileSync(path.resolve(SEMENTE), 'utf8');
    await chama('Page.addScriptToEvaluateOnNewDocument', { source: js });
  }

  const carregou = cdp.espera('Page.loadEventFired');
  await chama('Page.navigate', { url });
  await Promise.race([carregou, espera(15000)]);

  // Fontes carregadas + um respiro para animação/layout assentar.
  await chama('Runtime.evaluate', {
    expression: 'document.fonts && document.fonts.ready ? document.fonts.ready.then(()=>1) : 1',
    awaitPromise: true,
  });
  await espera(ESPERA);

  if (PREPARO) {
    const js = fs.readFileSync(path.resolve(PREPARO), 'utf8');
    const r = await chama('Runtime.evaluate', { expression: js, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error('Erro no --preparo: ' + r.exceptionDetails.text);
    await espera(200);
  }

  // Retângulo a capturar: o elemento do --seletor, ou a página inteira.
  const medir = () => chama('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const sel = ${JSON.stringify(SELETOR)};
      const alvos = ${JSON.stringify(MEDIR)};
      const rolaX = window.scrollX, rolaY = window.scrollY;
      const caixa = (el) => { const r = el.getBoundingClientRect();
        return { x: r.left + rolaX, y: r.top + rolaY, w: r.width, h: r.height }; };
      let base;
      if (sel) {
        const el = document.querySelector(sel);
        if (!el) return { erro: 'Não achei o seletor ' + sel };
        base = caixa(el);
      } else {
        const d = document.documentElement, b = document.body;
        base = { x: 0, y: 0,
          w: Math.max(d.scrollWidth, b ? b.scrollWidth : 0),
          h: Math.max(d.scrollHeight, b ? b.scrollHeight : 0) };
      }
      const medidos = {};
      for (const s of alvos) {
        const el = document.querySelector(s);
        if (!el) { medidos[s] = null; continue; }
        const c = caixa(el);
        medidos[s] = [
          +((c.x - base.x) / base.w).toFixed(4),
          +((c.y - base.y) / base.h).toFixed(4),
          +(c.w / base.w).toFixed(4),
          +(c.h / base.h).toFixed(4),
        ];
      }
      return { base, medidos };
    })()`,
  });

  const leitura = async () => {
    const r = (await medir()).result.value;
    if (!r || r.erro) throw new Error(r ? r.erro : 'Não consegui medir a página');
    return r;
  };

  let { base, medidos } = await leitura();

  // O que fica abaixo da dobra não é pintado. Cresce a janela até o conteúdo e
  // mede de novo — o layout pode ter mudado com a altura nova.
  const precisa = Math.ceil(base.y + base.h) + 20;
  if (precisa > ALTURA) {
    await chama('Emulation.setDeviceMetricsOverride', {
      width: LARGURA, height: Math.min(precisa, 16384), deviceScaleFactor: ESCALA, mobile: false,
    });
    await espera(400);
    ({ base, medidos } = await leitura());
  }

  const tiro = await chama('Page.captureScreenshot', {
    format: FORMATO,
    captureBeyondViewport: true,
    ...(FORMATO === 'png' ? {} : { quality: QUALIDADE }),
    clip: { x: base.x, y: base.y, width: base.w, height: base.h, scale: 1 },
  });

  fs.mkdirSync(path.dirname(path.resolve(saida)), { recursive: true });
  fs.writeFileSync(path.resolve(saida), Buffer.from(tiro.data, 'base64'));

  await chama('Page.close').catch(() => {});
  cdp.fecha();
  proc.kill();
  // O navegador ainda segura o perfil por um instante; se não der, o SO limpa depois.
  await espera(300);
  try { fs.rmSync(perfil, { recursive: true, force: true }); } catch (e) { /* tudo bem */ }

  const kb = Math.round(fs.statSync(path.resolve(saida)).size / 1024);
  console.log(`${saida} — ${Math.round(base.w)}x${Math.round(base.h)} css px, ${ESCALA}x, ${kb} kB`);
  if (MEDIR.length) {
    console.log('\nfoco (já normalizado, cole no visual.json):');
    for (const s of MEDIR) {
      console.log(`  ${s.padEnd(14)} ${medidos[s] ? JSON.stringify(medidos[s]) : '— não encontrado'}`);
    }
  }
}

main().catch((e) => { console.error('Falhou:', e.message); process.exit(1); });
