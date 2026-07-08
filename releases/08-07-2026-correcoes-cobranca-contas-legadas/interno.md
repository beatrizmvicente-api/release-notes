## Em uma frase
Três correções que destravam cobrança nas contas antigas — convite de plano grátis que prendia o usuário, bloqueio por consumo que o Suporte não conseguia aplicar, e valor de cobrança errado na tela do cliente.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Convidar alguém pro plano Gerencial (grátis) numa conta legada travava o usuário em "Aguardando Pagamento" — sem fatura pra pagar | O plano grátis é ativado na hora: o usuário entra **ATIVO** |
| O Suporte não conseguia aplicar o Bloqueio por Consumo de Minutos em conta migrada — dava erro e não deixava concluir | O bloqueio conclui normalmente nas contas migradas |
| O Menu 8 mostrava o preço de tabela do plano (R$ 199,90) mesmo quando o cliente pagava outro valor (R$ 189,90) | O total do cabeçalho mostra o valor real pago; a coluna por usuário foi ocultada |

## Por que importa
Os três bugs vêm do mesmo lugar: **as contas antigas não tinham estado de cobrança conhecido pelo sistema**. Isso vazava de três jeitos.

- **O cliente ficava preso.** Convidado pro plano Gerencial (grátis), entrava marcado como "Aguardando Pagamento" — sem fatura pra quitar. Não tinha saída.
- **O time interno ficava sem ferramenta.** O Suporte não conseguia aplicar o Bloqueio por Consumo de Minutos em conta migrada. O cliente nunca viu esse erro; quem travou foi a gente.
- **A tela contradizia o contrato.** Cliente com desconto negociado via o preço cheio de tabela — número financeiro errado sobre o que ele mesmo paga.

## As mudanças
1. **Convite de plano grátis não trava mais** (TEL-2051) — quando o plano custa zero, o convite é ativado na hora, sem gerar fatura. E o convite virou tudo-ou-nada: se a cobrança falha, nada de e-mail enviado nem conta pela metade.
2. **Bloqueio por Consumo de Minutos funciona em conta migrada** (TEL-2055) — o sistema passa a descobrir o ciclo de cobrança pela data de vencimento da assinatura. De quebra, a cobrança recorrente dessas contas volta a virar fatura.
3. **Menu 8 para de exibir valor falso** (TEL-2060) — o total do cabeçalho passa a usar o valor real da assinatura. A coluna de valor por usuário, que era a fonte do número errado, foi ocultada até conseguirmos o valor real de cada um.

## O que muda no dia a dia
- **Pro Suporte:** três sintomas que agora estão resolvidos — (1) usuário do plano Gerencial parado em "Aguardando Pagamento" sem fatura; (2) erro ao aplicar o bloqueio por plano no Suporte Admin em conta migrada; (3) valor de cobrança divergente no Menu 8. Se o cliente estranhar que **a coluna de valor sumiu** no Menu 8: é proposital — ela mostrava o preço de tabela, não o cobrado. O total do cabeçalho está correto.
- **Pro CS:** as contas que já travaram **não se corrigem sozinhas**. Vale reconvidar os usuários que ficaram presos em "Aguardando Pagamento" e reaplicar o bloqueio nas contas migradas que ficaram sem ele. Se topar com um desses casos, avise o time de desenvolvimento.
- **Pro Comercial:** o plano Gerencial (grátis) voltou a funcionar em cliente antigo — menos atrito pra expandir usuários dentro da conta. E o Menu 8 parou de contradizer o valor negociado: some o risco de "por que aqui mostra R$ 199,90 se eu pago R$ 189,90?".
- **Pro cliente:** nenhum comunicado. Quem estava travado destrava; quem não estava não percebe nada.

## Detalhes importantes
- "Conta legada" = contratação antiga, com assinatura só no Asaas. "Conta migrada" = conta adotada do Asaas na migração. Os dois primeiros bugs só aconteciam nesses casos.
- A coluna de valor por usuário no Menu 8 está no radar pra voltar, quando der pra buscar o valor real de cada usuário sem pesar a tela.
