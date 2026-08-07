## Em uma frase
Agora dá pra adiar a próxima cobrança e liberar o acesso do cliente mesmo assim.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Cliente que só ia pagar dali a alguns meses era montado **na mão, direto no Asaas** | Campo **"Vencimento da próxima cobrança"** na assinatura do Suporte Admin |
| Dava pra escolher só o **dia do mês** — nunca "daqui a 60 dias" | Data cheia: dia, mês e ano |
| Liberar o acesso antes do pagamento não existia: ou pagava, ou ficava sem | Botão **"Liberar Benefícios da assinatura"** — acesso liberado, fatura segue pendente |
| Quem liberou, e por quê, ficava no acordo verbal | **Justificativa obrigatória**, com autor e data gravados na assinatura |

## Por que importa
A venda com carência já era feita — só não cabia na ferramenta. O cliente entrava com saldo alto, combinava começar a pagar dali a uns meses, e alguém montava isso na mão no Asaas.

- **O que é feito só no Asaas não existe pro nosso lado.** A assinatura fica sem o registro que o resto do produto usa — e a inconsistência aparece depois, na hora de mexer em usuário ou plano.
- **E o cliente esperava.** Enquanto o acordo era montado manualmente, ele ficava sem IA e sem ilimitado, tendo comprado.
- **Ninguém sabia quem tinha liberado o quê.** Acesso concedido por acordo comercial não deixava rastro.

Resultado: a carência combinada na venda é montada na própria assinatura — com data, motivo e nome de quem liberou.

## As mudanças
1. **Campo "Vencimento da próxima cobrança"** — a data cheia da próxima fatura, não só o dia do mês.
   - A cobrança em aberto é empurrada junto; **as demais faturas pendentes ficam como estão**.
   - Não aceita data no passado.
   - Quando a cobrança é gerada, a data avança sozinha um ciclo — a tela nunca mostra o vencimento da fatura atual no lugar da próxima.
2. **Botão "Liberar Benefícios da assinatura"** — ativa a assinatura e libera IA, minutos e acesso do domínio **sem quitar a fatura**.
   - A fatura continua **pendente** para a data combinada.
   - Justificativa obrigatória; grava quem liberou e quando.
   - Só vale pra assinatura **Pendente**. Ativa ou Cancelada devolve erro.
3. **Adiar a cobrança não libera o acesso.** São duas ações, em dois lugares — a data só empurra a fatura.

## Detalhes importantes
- **Adiar ≠ liberar.** É o erro de operação mais provável: informar a data e achar que o cliente já está liberado. Se ele diz que combinou e continua sem acesso, provavelmente faltou o segundo clique.
- **A justificativa fica visível na assinatura.** Escreva o acordo de um jeito que outra pessoa entenda daqui a três meses.
- **Assinatura criada com a cobrança adiada pode não trazer o link de pagamento na hora** — é esperado. A cobrança só nasce no Asaas na data agendada; o link aparece na listagem de faturas.
- **Vencimento em branco ("—")** em assinatura antiga ou cancelada é esperado: o campo se preenche quando a próxima cobrança for gerada. Não é chamado.
- **Cobrança vencida não se remarca por aqui.** O sistema recusa data no passado — o caminho continua sendo o fluxo de fatura.
- **Nenhuma assinatura existente muda de comportamento** por causa do deploy.

## Como validar
1. Numa assinatura de teste, informar vencimento para daqui a 60 dias: **nenhuma fatura é gerada no mês corrente** e a data aparece na assinatura.
2. Clicar em **"Liberar Benefícios"** com justificativa: a assinatura fica **Ativa**, o cliente acessa o produto e a fatura continua **pendente** para a data escolhida.
3. Tentar liberar uma assinatura já Ativa: erro esperado, não é falha.

## O que muda no dia a dia
- **Pro CS:** dá pra montar a carência na própria assinatura — informa o **vencimento da próxima cobrança** e, se o cliente já pode usar, clica em **"Liberar Benefícios"**. Pare de pedir ajuste manual no Asaas.
- **Pro CS (chamado):** *"combinei com o comercial e continuo sem acesso"* — confira se a liberação foi feita. Só adiar a cobrança não solta nada.
- **Pro Suporte:** vencimento **"—"** em assinatura antiga e **assinatura nova sem link de pagamento** são comportamentos esperados — não abrir chamado.
- **Pro Comercial:** dá pra fechar com **carência** ("começa a pagar em X") e o cliente usa o produto desde o primeiro dia, com a fatura já agendada.
- **Pro Financeiro:** acesso liberado **não é fatura quitada** — ela segue pendente para a data combinada. Toda liberação tem autor, data e justificativa.
- **Pro cliente:** nenhum comunicado. Ele passa a acessar normalmente e a cobrança chega na data combinada.
