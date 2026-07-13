## Em uma frase
Três bugs de cobrança em contas antigas resolvidos: cliente preso, bloqueio que não aplicava e valor errado na tela.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Convidar alguém pro plano Gerencial (grátis) numa conta legada travava o usuário em "Aguardando Pagamento" — sem fatura pra pagar | O plano grátis é ativado na hora: o usuário entra **ATIVO** |
| O Suporte não conseguia aplicar o Bloqueio por Consumo de Minutos em conta migrada — dava erro e não deixava concluir | O bloqueio conclui normalmente nas contas migradas |
| O Menu 8 mostrava o preço de tabela do plano (R$ 199,90) mesmo quando o cliente pagava outro valor (R$ 189,90) | O total do cabeçalho mostra o valor real pago; a coluna por usuário foi ocultada |

## Por que importa
Os três bugs vêm do mesmo lugar: **as contas antigas não tinham estado de cobrança conhecido pelo sistema**. Isso vazava de três jeitos:

- **O cliente ficava num beco sem saída.** Convidado pro plano grátis, entrava como "Aguardando Pagamento" — sem fatura pra quitar.
- **O time interno ficava sem ferramenta.** O Suporte não conseguia aplicar o bloqueio em conta migrada. O cliente nem via o erro; quem travou foi a gente.
- **A tela contradizia o contrato.** Cliente com desconto negociado via o preço cheio de tabela — número errado sobre o que ele mesmo paga.

## As mudanças
1. **Convite de plano grátis não trava mais** (TEL-2051) — plano custa zero, convite é ativado na hora, sem fatura. Virou tudo-ou-nada: se a cobrança falha, nada de e-mail nem conta pela metade.
2. **Bloqueio por Consumo de Minutos funciona em conta migrada** (TEL-2055) — o sistema descobre o ciclo pela data de vencimento da assinatura. De quebra, a recorrência dessas contas volta a virar fatura.
3. **Menu 8 para de exibir valor falso** (TEL-2060) — o total usa o valor real da assinatura. A coluna por usuário, fonte do número errado, foi ocultada até termos o valor real de cada um.

## Detalhes importantes
- "Conta legada" = contratação antiga, assinatura só no Asaas. "Conta migrada" = conta adotada do Asaas na migração. Os dois primeiros bugs só aconteciam nesses casos.
- A coluna de valor por usuário no Menu 8 volta quando der pra buscar o valor real de cada um sem pesar a tela.

## O que muda no dia a dia
- **Pro Suporte:** três sintomas resolvidos — usuário parado em "Aguardando Pagamento", erro ao aplicar bloqueio em conta migrada, valor divergente no Menu 8.
- **Pro Suporte (avise o cliente):** a coluna de valor sumiu do Menu 8 de propósito — ela mostrava tabela, não o cobrado. O total do cabeçalho está certo.
- **Pro CS:** contas que já travaram **não se corrigem sozinhas** — reconvide quem ficou preso e reaplique o bloqueio nas migradas. Achou um caso? Avise o dev.
- **Pro Comercial:** plano Gerencial (grátis) voltou a funcionar em cliente antigo, e o Menu 8 parou de contradizer o valor negociado. Some o "por que aqui mostra R$ 199,90 se eu pago R$ 189,90?".
- **Pro cliente:** nenhum comunicado. Quem travou destrava; quem não travou não percebe nada.
