## Em uma frase
Cobrança com desconto agora vira nota fiscal pelo valor que o cliente pagou.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Cobrança com desconto saía com **nota fiscal pelo valor cheio** — imposto recolhido sobre dinheiro que não entrou | A nota sai pelo **valor efetivamente pago** |
| O desconto ia **separado** para o Asaas, que só o aplica a quem paga adiantado: pagou um dia depois do vencimento, o abatimento evaporava | O valor já vai **com o desconto embutido** — atraso não derruba o combinado |
| Fatura com líquido abaixo de R$ 5 estourava um **erro genérico do gateway** | Bloqueia antes, com o motivo escrito |

## Por que importa
O desconto era combinado num lugar e cobrado em outro. Duas contas saíam erradas ao mesmo tempo, e nenhuma das duas aparecia pra quem concedeu o desconto.

- **A nota fiscal cobrava imposto sobre dinheiro que não entrou.** Cobrança de R$ 99,90 com R$ 50,00 de desconto: o cliente paga R$ 49,90 e a nota sai por R$ 99,90. A empresa recolhe imposto sobre o valor cheio, e o cliente recebe um documento fiscal que não bate com o extrato dele. **30 notas** saíram assim desde 01/01/2026 — em 28 delas, a diferença é exatamente o desconto concedido.
- **O desconto tinha prazo escondido.** No Asaas, desconto separado só vale até o vencimento. O cliente que negociou abatimento e pagou um dia atrasado voltava a dever o valor cheio — e ligava pro atendimento perguntando por quê.

Resultado: o valor negociado passa a ser o valor cobrado, o valor pago e o valor da nota.

## As mudanças
1. **Nota fiscal emitida pelo valor pago** — a nota deixa de usar a "foto" do valor tirada na criação da cobrança e passa a usar o que o Asaas informa como pago.
   - Sem um valor de pagamento confiável, a emissão é **interrompida** em vez de sair errada.
2. **Desconto embutido no valor enviado ao gateway** — vale para edição de fatura e para a edição de assinatura que se propaga às faturas pendentes.
   - Valor bruto e desconto continuam registrados na nossa base; muda só o que o gateway enxerga.
3. **Piso de R$ 5,00 bloqueado com mensagem clara** — fatura cujo líquido fique abaixo do mínimo do Asaas é recusada com erro de negócio, não com erro do gateway.

## Detalhes importantes
- **Vale para cobranças pagas a partir de hoje.** Não é retroativo.
- **As 30 notas divergentes não são reemitidas automaticamente.** Não há, até agora, processo de reemissão, nota complementar ou estorno de imposto definido — caso apareça, é escalar pro financeiro.
- Editar uma assinatura com desconto **propaga a mesma regra** para as faturas pendentes dela.
- Não se sabe ainda quantas contas usam desconto em fatura ou assinatura — o tamanho real do universo afetado está em levantamento.

## O que muda no dia a dia
- **Pro Suporte:** *"o valor da minha nota fiscal não bate com o que paguei"* — se a cobrança foi paga **antes de hoje** e tinha desconto, é esperado. Registrar e escalar pro financeiro, sem prometer reemissão.
- **Pro Suporte (a partir de hoje):** nota com valor divergente em cobrança paga de hoje em diante é regressão — escalar.
- **Pro CS:** o desconto que você concede **não expira mais no vencimento** — pare de avisar que o cliente precisa pagar em dia pra manter o abatimento.
- **Pro CS (limite):** desconto que derrube a fatura abaixo de **R$ 5,00** é recusado na hora, com o motivo na tela.
- **Pro Comercial:** o valor negociado é o que sai na nota — sem ajuste manual depois.
- **Pro cliente:** nenhum comunicado automático. Ele percebe na próxima nota fiscal.
