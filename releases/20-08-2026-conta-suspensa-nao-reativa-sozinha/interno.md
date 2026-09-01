## Em uma frase
Conta suspensa por inadimplência não volta mais sozinha por aviso repetido do gateway.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| O Asaas manda **dois avisos** da mesma cobrança — um quando o cliente paga, outro quando o dinheiro cai (no cartão, uns **30 dias** depois) — e a conta era ativada nos dois | A ativação só acontece na virada real de **não paga → paga** |
| Suspendeu a conta por inadimplência? O segundo aviso podia **reativá-la sozinha**, dias ou semanas depois | Aviso repetido é ignorado — fica só o registro no log |

## Por que importa
O CS suspendia uma conta por inadimplência e, sem ninguém pedir, ela voltava a funcionar. Uma decisão de cobrança era desfeita por um aviso técnico que ninguém vê.

- **A suspensão não se sustentava.** No cartão o segundo aviso chega uns 30 dias depois; no parcelado, é um aviso por parcela. Qualquer um deles caindo no meio da suspensão desfazia o bloqueio.
- **E voltava calado.** Não havia alerta nenhum — o CS só descobria se fosse olhar a conta de novo.
- **Ficou de pé por cinco meses.** O comportamento existe desde **19/03/2026** e vai até o deploy de hoje.

Resultado: quem suspende é quem decide quando a conta volta.

## As mudanças
1. **A ativação só roda na virada real de "não paga" para "paga"** — segundo aviso e reenvio do gateway passam direto, apenas registrados.
2. **Duas situações continuam ativando de propósito** — liberação manual e fatura que já nasce paga.
   - Nesses casos, reaplicar conserta uma liberação que tenha falhado pela metade.

## Detalhes importantes
- **Não é retroativo.** Conta que já voltou sozinha continua ativa — a correção só impede que aconteça de novo.
- **Pendente:** não dá pra saber, pelo sistema, quantas contas voltaram sozinhas entre 19/03 e hoje. O cruzamento entre suspensões manuais por inadimplência e avisos de pagamento recebidos no período está com **CS + financeiro**.

## O que muda no dia a dia
- **Pro CS:** a suspensão por inadimplência agora fica de pé. Conta que você suspendeu e viu voltar sozinha desde março era este bug — vale revisar essas suspensões.
- **Pro Suporte:** *"minha conta voltou a funcionar sozinha"* deixa de acontecer. De hoje em diante, a conta só muda de estado com pagamento de verdade ou ação de alguém do time.
- **Pro cliente:** nenhum comunicado. Quem estiver usando uma conta reativada por engano pode perder o acesso quando o caso for revisado — avise antes de mexer.
