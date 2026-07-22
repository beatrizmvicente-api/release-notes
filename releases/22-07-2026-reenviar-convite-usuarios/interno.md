## Em uma frase
Convite de usuário expirado agora tem botão **Reenviar convite** — sem recorrer a bloquear/desbloquear.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Sem botão de reenviar, o admin **bloqueava e desbloqueava** o usuário pra destravar o acesso | Ação **Reenviar convite** gera novo token de 15 min e redispara o e-mail padrão |
| O desbloqueio era lido como **nova contratação** → cobrança pró-rata indevida, mesmo com o usuário já pago | Reenviar convite **não gera cobrança** |
| Usuário **Desativado** aparecia como "convite pendente" | Desativado deixa de ser tratado como convite pendente |

## Por que importa
O convite de um usuário expira em **15 minutos**. Sem um botão pra reenviar, o admin dava um jeito: bloqueava e desbloqueava o usuário pra destravar o acesso. Só que o desbloqueio era lido como **nova contratação** — e gerava **cobrança pró-rata** mesmo quando o usuário já tinha pago.

Ou seja: a gambiarra pra resolver um convite expirado virava **fatura errada**. Resultado agora: convite expirado deixa de custar dinheiro.

## As mudanças
1. **Nova ação "Reenviar convite"** na listagem "Usuários da Organização", para convites **pendentes ou expirados** — gera novo token de 15 min, redispara o e-mail padrão e **não cobra pró-rata**.
2. **Usuário Desativado deixa de ser tratado como "convite pendente"** — some o falso estado que confundia a tela.

## Como validar
1. Na tela de **Usuários**, um usuário com convite pendente mostra a ação **"Reenviar convite"**.
2. Ao clicar, o usuário recebe um **novo e-mail de ativação** funcional.
3. Nenhuma **cobrança pró-rata** é gerada.

## O que muda no dia a dia
- **Pro Suporte:** orientar o admin a usar **"Reenviar convite"** na tela de Usuários — e **parar de recomendar** o bloquear/desbloquear como saída pra convite expirado.
- **Pro CS/Faturamento:** some a pró-rata indevida que nascia desse workaround; menos disputa de fatura.
- **Pro cliente (admin da organização):** reenvia o convite expirado **num clique**, sem efeito colateral na cobrança.
