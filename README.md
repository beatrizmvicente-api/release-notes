# Release Notes — API4COM

Repositório de comunicação das releases do produto. Cada release lançada vira uma comunicação **objetiva**, que mostra o **antes e depois** e explica o **mínimo necessário** para entender a feature.

## Como funciona

Cada release vive em uma pasta própria dentro de [`releases/`](releases/), nomeada com data e slug da feature:

```
releases/
  2026-07-01-nome-da-feature/
    interno.md    → comunicação para o time (comercial, suporte, CS)
    externo.md    → comunicação para clientes / usuários finais
    visual.json   → (opcional) o antes e depois em imagem
    antes.webp    → print da tela como era
    depois.webp   → print da tela como ficou
```

As duas versões saem da **mesma base de fatos** (o que mudou), mas com tom diferente:

- **Interno** → direto ao ponto: o que muda pra você, o que muda pro cliente, o que falar.
- **Externo** → benefício e uso: o que melhorou e como aproveitar.

## Para criar uma nova comunicação

1. Copie a pasta [`templates/`](templates/) para `releases/AAAA-MM-DD-slug-da-feature/`.
2. Preencha `interno.md` e `externo.md`.
3. Siga o [Guia de tom](guia-de-tom.md) — é o que garante consistência entre releases.

Ou, direto:

```
node scripts/novo.js "Nome da feature"            →  só o texto
node scripts/novo.js "Nome da feature" --visual   →  já com o antes/depois em imagem
```

## O antes e depois em imagem

Release que muda uma tela ganha um comparador: as duas versões lado a lado, e uma
"câmera" que vai ao mesmo ponto nos dois lados a cada passo, acende a região e
explica o que mudou ali. É opcional — sem `visual.json`, a release continua igual,
só com o texto.

**O print do "antes" só existe antes de a mudança subir.** Tire ele primeiro; depois
do merge não há como recuperar. É o único passo com hora marcada.

### 1. Os dois prints

O [`scripts/print.js`](scripts/print.js) usa o Chrome que você já tem, sem instalar nada:

```
node scripts/print.js http://localhost:8080/contratar releases/<slug>/antes.webp --largura=1000
node scripts/print.js http://localhost:8080/contratar releases/<slug>/depois.webp --largura=1000
```

- Pega a **página inteira**, não só o que cabe na janela.
- Prefira `.webp` — os arquivos vão pro git, e ele fica umas 5x menor que `.png`.
- `--largura=1000` mantém as duas capturas na mesma régua. Use a mesma nos dois lados.
- `--seletor=#app` recorta só um pedaço; `--preparo=arquivo.js` roda um JS na página
  antes do print (esconder um banner, abrir um menu, preencher um formulário).

### 2. As regiões de foco

Cada passo aponta um retângulo da imagem. O próprio print mede pra você:

```
node scripts/print.js <url> depois.webp --medir=#resumo,#lista,#botao
```

Ele devolve `[x, y, largura, altura]` em **fração da imagem** (0 a 1), já pronto
pra colar no `foco`. Sem seletor à mão, dá pra estimar no olho: um bloco que começa
a meia altura e ocupa um quinto da página é `[0.04, 0.5, 0.92, 0.2]`.

### 3. O `visual.json`

Copie de [`templates/visual.json`](templates/visual.json). O essencial:

```json
{
  "titulo": "A tela de contratação, antes e depois",
  "antes":  { "src": "antes.webp",  "rotulo": "Contratar Plano — como era" },
  "depois": { "src": "depois.webp", "rotulo": "Revise a assinatura da sua equipe" },
  "passos": [
    { "chip": "A tela inteira", "titulo": "A página inteira",
      "foco": "tudo",
      "antes": "Cinco blocos empilhados...", "depois": "A decisão e a conta na mesma tela..." },

    { "chip": "Resumo e total", "titulo": "Onde o cliente vê quanto vai pagar",
      "foco": { "antes": [0.04, 0.80, 0.92, 0.17], "depois": [0.66, 0.20, 0.32, 0.42] },
      "antes": "O resumo fica <b>no fim da página</b>.", "depois": "Resumo <b>fixo ao lado</b>." }
  ]
}
```

| Campo | O que faz |
|---|---|
| `foco` | `"tudo"` mostra a página inteira; `{ antes, depois }` aponta a região de cada lado |
| `semAntes` | Passo que nasceu agora: o painel esquerdo vira um aviso com esse texto |
| `antes` / `depois` | A legenda do passo. Aceita `<b>`, `<i>` e `<code>` |

Regras que valem a pena saber:

- Num passo com região dos dois lados, **os dois painéis usam a mesma escala** — é o
  que deixa um comparável com o outro. Na visão geral, não: cada página aparece
  inteira, e a diferença de altura entre elas já diz alguma coisa.
- O comparador fica **acima das abas**, porque a tela é a mesma para os dois públicos.
  Escreva a legenda de um jeito que sirva ao time e ao cliente.
- Faltou um arquivo, ou o JSON quebrou? O build avisa no log e a release sai só com o
  texto. Nunca derruba o site.
- Setas ← e → andam pelos passos. Quem tem *reduzir animações* ligado não vê o player
  se mover sozinho.

## Para revisar e ajustar o texto

```
npm start        →  http://localhost:4123
```

Com o servidor local rodando, cada release ganha um botão **Editar** no topo (ele não existe no site publicado). Ali dá pra:

- reescrever o markdown com **prévia lado a lado**, atualizada enquanto você digita;
- ajustar título, data, ticket e tags direto no formulário;
- salvar com **Ctrl+S** — o texto vai direto pro `.md` da pasta, sem passar por lugar nenhum.

`Ctrl+E` abre e fecha o editor, `Esc` descarta. A edição só funciona a partir da própria máquina (`localhost`); acessos de fora ficam somente leitura.

## Índice de releases

<!-- Adicione uma linha por release, mais recente no topo -->
| Data | Feature | Interno | Externo |
|------|---------|---------|---------|
| _(ainda vazio)_ | | | |
