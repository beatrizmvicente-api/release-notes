## Em uma frase
Consulta de chamadas sem período informado passa a trazer os últimos 30 dias.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Consulta sem período varria **a base inteira de chamadas** — e a lentidão sobrava pra todo mundo, não só pra quem consultou | Sem período informado, a busca traz os **últimos 30 dias** |


## Por que importa
Um cliente rodando um relatório sem filtro segurava o banco — e quem sentia era todo mundo que estivesse com o dashboard aberto naquele minuto. Ninguém conseguia ligar o efeito à causa: a plataforma "ficava lenta" e pronto.

- **A lentidão não tinha dono.** O relatório pesado era de um cliente; a conta era paga por todos os que estavam usando dashboard ou relatório ao mesmo tempo.

Resultado: a consulta pesada deixa de existir por padrão, e o número que sai do filtro passa a ser o número certo.

## As mudanças
1. **Consulta sem período recebe os últimos 30 dias** — vale para relatórios, dashboard e os endpoints usados pelo portal de parceiros.
   - Quem informa o período continua recebendo exatamente o que pediu, inclusive um ano inteiro.
2. **Filtro de duração passa a respeitar os dois limites** — "entre X e Y segundos" deixava o teto de fora e trazia chamadas acima dele.
3. **Os dois caminhos internos de consulta passam a responder igual** — antes, a mesma pergunta podia voltar diferente conforme quem a atendeu.

## Detalhe importante
- A janela de 30 dias **só entra quando nenhum período é informado**. Ela não corta quem pediu um intervalo maior.


## O que muda no dia a dia
- **Pro Suporte:** *"meu relatório veio com menos chamadas"* — se o cliente não informou período, é a janela de 30 dias. Peça o intervalo desejado e ele volta ao normal.
- **Pro Suporte (o inverso):** relatório filtrado por duração que der número diferente do de ontem é esperado — o de hoje é o certo, o de ontem trazia chamadas fora do intervalo.
- **Pro CS:** cliente que reclamava de dashboard lento sem explicação tende a parar de sentir isso.
- **Pro cliente:** nenhum comunicado automático. Quem consulta chamadas pela API percebe na primeira busca sem período.
