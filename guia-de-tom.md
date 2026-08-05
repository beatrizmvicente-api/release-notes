# Guia de tom

Regras que valem para **toda** comunicação de release. O objetivo é que qualquer pessoa entenda a feature em menos de 1 minuto — e que a leitura seja **leve**, não uma parede de texto.

## Princípios

1. **Objetivo acima de tudo.** Sem enrolação, sem adjetivo de marketing vazio ("incrível", "revolucionário"). Frase curta, voz ativa.
2. **Antes e depois sempre.** Toda comunicação mostra o que era e o que passou a ser. É o que dá clareza do valor.
3. **Mínimo necessário.** Explique só o que a pessoa precisa para entender e usar. Detalhe técnico só quando muda a decisão de quem lê.
4. **Foco no impacto, não na implementação.** "Você economiza X" vale mais que "reescrevemos o módulo Y".
5. **Uma ideia por linha.** Frases curtas; casos e regras viram sub-itens, nunca parágrafo corrido. O leitor tem que pegar por varredura.
6. **Por que importa = negócio.** No interno, lidere pela dor/valor de negócio (quanto se ganha, o que para de vazar) — não pela mecânica. Esse contexto normalmente não está no material de QA/dev; puxe com quem trouxe a feature.

## Leveza: como não pesar a leitura

O que torna um release moroso não é o assunto — é o formato. Cinco regras que mantêm a leitura leve:

1. **"Em uma frase" é uma frase de verdade.** No máximo ~14 palavras, uma ideia só. Se você usou "e", travessão ou vírgula pra emendar uma segunda ideia, quebrou a regra — corte ou mande pro corpo. É o gancho: tem que caber num respiro.
2. **Linha curta, não bloco.** Se uma linha passa de ~2 linhas na tela, ela virou parágrafo. Quebre em sub-itens. Vale principalmente pras seções por papel ("O que muda no dia a dia"): cada papel = 1 linha, no máximo 2.
3. **Leveza vem de imagem concreta, não de adjetivo.** "O cliente ficava num beco sem saída — preso, sem fatura pra pagar" pesa menos e gruda mais que "havia um problema de bloqueio no fluxo de cobrança". Concreto e humano ≠ marketing. Adjetivo vazio continua proibido; imagem concreta é bem-vinda.
4. **Corte o que o leitor já deduz.** Se a linha só repete o que o título ou o antes/depois já disseram, apague. Densidade cansa mais que tamanho.
5. **Um fecho leve por item, quando couber.** Uma "moral" de meia linha fecha a ideia sem inflar: "resultado: ninguém mais trava". Opcional — só quando ajuda, nunca de enfeite.

## Tom por público

| | Interno | Externo |
|---|---------|---------|
| Quem lê | Comercial, suporte, CS | Cliente / usuário final |
| Foco | O que muda pra você e pro cliente | Benefício e como usar |
| Linguagem | Direta, pode usar termo interno | Simples, sem jargão de time |
| Fechamento | "O que fazer com isso" | "Como começar a usar" |

## Palavras a evitar

Revolucionário, incrível, disruptivo, simplesmente, apenas (minimizando esforço do usuário), "estamos felizes em anunciar".

## Checklist antes de publicar

- [ ] Dá pra entender a feature lendo só o título + antes/depois?
- [ ] O "Em uma frase" tem uma ideia só e cabe num respiro (~14 palavras)?
- [ ] Nenhuma linha virou parágrafo? Casos complexos em sub-itens?
- [ ] O "Por que importa" do interno lidera pela dor/valor de negócio?
- [ ] Onde dá, troquei descrição genérica por imagem concreta (sem cair em marketing)?
- [ ] Removi todo detalhe técnico — e toda linha redundante — que não muda nada pra quem lê?
- [ ] Interno diz claramente o que o time deve fazer (e o que parar de fazer)?
- [ ] Externo diz claramente como usar — sem narrativa interna (ex.: "antes você não pagava")?
