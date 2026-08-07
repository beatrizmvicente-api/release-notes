## Em uma frase
O valor combinado no Suporte Admin passa a ser sempre o valor cobrado na fatura.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Editar **só a descrição** não reenviava o valor — o Asaas seguia cobrando o antigo | Qualquer edição reafirma o valor no Asaas |
| O desconto configurado no Asaas era aplicado **por cima** do valor já líquido | O desconto no gateway vai sempre zerado — o abatimento já está no valor |
| O combinado na tela e o cobrado na fatura podiam **não bater**, e ninguém percebia | Os dois lados batem |

## Por que importa
A divergência era silenciosa: nada errado aparecia no Suporte Admin. Só a fatura do cliente sabia.

- **Errava pros dois lados.** Ou o cliente continuava pagando o valor antigo, ou pagava a menos por um desconto contado duas vezes.
- **A descoberta era sempre pelo cliente.** O chamado chegava como "minha fatura veio diferente do que combinei" — e o time não tinha como saber sem abrir o Asaas.
- **A janela é longa: 21/05 a 06/08**, praticamente desde que existe edição de assinatura.

Resultado: o que é acordado na tela é o que sai na cobrança.

## Detalhes importantes
- **Nenhuma fatura antiga é reemitida ou estornada.** A correção vale daqui pra frente.
- **Reeditar a assinatura já resincroniza.** Se aparecer divergência numa conta do período, salvar a assinatura de novo alinha os dois lados.
- **Não houve varredura na base.** Não dá pra dizer quantas assinaturas ficaram com valor divergente entre 21/05 e 06/08 — o levantamento em produção está em aberto.
- O campo "desconto" do Asaas é **desconto por pagamento antecipado**, não abatimento de negociação. Por isso ele passa a ir sempre zerado: o desconto negociado já está embutido no valor enviado.

## Como validar
1. Alterar o valor de uma assinatura de teste no Suporte Admin e conferir no Asaas: o valor da cobrança bate com o configurado, sem desconto extra por cima.
2. Editar **só a descrição** de outra assinatura e conferir que o valor no Asaas continua correto.

## O que muda no dia a dia
- **Pro CS:** cliente contestando o valor da fatura com alteração feita entre **21/05 e 06/08** — confira o valor no Asaas antes de tratar como negociação nova. Reeditar a assinatura corrige.
- **Pro CS (chamado):** *"paguei menos/mais que o combinado"* — se a conta teve o valor editado no período, é o cenário deste bug.
- **Pro Financeiro:** pode haver assinatura cobrando a mais **ou a menos** no período. Não houve auditoria retroativa; se for necessária, é levantamento manual.
- **Pro Comercial:** o valor negociado chega íntegro na fatura — sem desconto duplicado nem valor antigo persistindo.
- **Pro cliente:** nenhum comunicado. Fatura já emitida não muda.
