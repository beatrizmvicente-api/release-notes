## Em uma frase
Agora dá pra agendar o fim de uma assinatura — na data, o sistema encerra sozinho.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Contrato com fim acordado dependia de **alguém lembrar da data** e cancelar na mão, no Suporte Admin e no Asaas | Preenche a **"Data de fim de assinatura"** e o encerramento fica agendado |
| Tirar o Plano ilimitado e a IA dos usuários era trabalho manual | Na data, o sistema remove a **IA de todos os usuários** e a conta **volta pra Recarga, com saldo zerado** |
| A recorrência seguia gerando cobrança até alguém interromper | Nenhuma cobrança nova com vencimento depois da data |

## Por que importa
Encerrar contrato era processo de memória: alguém tinha que lembrar da data certa e desfazer tudo na mão, em dois sistemas.

- **Esquecer custa dinheiro.** A recorrência não para sozinha — cobrança emitida depois do fim do contrato vira estorno e desgaste com o cliente.
- **E o cliente ficava com o que já não contratou.** Plano ilimitado e IA seguiam ligados até alguém desligar um a um.
- **É pré-requisito do desligamento do Asaas.** Os contratos vigentes que já têm data de término acordada precisavam de um jeito de programar o fim.

Resultado: o encerramento é combinado uma vez, na conversa com o cliente, e acontece sozinho.

## As mudanças
1. **Campo "Data de fim de assinatura"** na modal de assinatura do Suporte Admin — opcional, vale na criação e na edição.
   - Em branco, nada muda: a assinatura renova indefinidamente. **Nenhuma assinatura existente muda de comportamento.**
2. **Ao salvar, a data já vai pro Asaas** — ele para de emitir cobrança com vencimento posterior a ela.
   - Nesse momento nenhum benefício é removido. A trava passa a existir dos dois lados.
3. **Na data, o encerramento roda sozinho** — retira a IA de todos os usuários do domínio, desliga o Plano ilimitado da conta e marca a assinatura como **Cancelada**.
   - Com a assinatura Cancelada, a conta **volta pro modelo Recarga e com saldo zerado**. Sem recarregar, não sai ligação.
4. **Dá pra desfazer antes da data** — limpar o campo derruba o agendamento nos dois lados e a assinatura volta a renovar.
   - Depois que a data passa, reverter é manual: recriar a assinatura e religar os benefícios.

## Detalhes importantes
- **A conta não fica só sem ilimitado — ela para de ligar.** Cancelada, volta pro modelo **Recarga com saldo zerado**: enquanto o cliente não recarregar, nenhuma chamada sai.
- **O corte é na madrugada da própria data informada, não no fim dela.** Preencher 31/12 significa que o cliente perde IA e ilimitado **na virada para o dia 31/12**. Para ele usar até o último dia pago, preencha **o dia seguinte** ao fim do ciclo.
- **Não existe aviso ao cliente.** Nenhum e-mail, banner ou notificação — ele descobre ao tentar usar. A comunicação é do CS.
- **Cobrança já emitida não é cancelada.** A data fim impede cobranças **novas**; o que já foi gerado continua devido.
- A assinatura **continua visível no Asaas**, com a data fim preenchida e o histórico de cobranças intacto.
- Só encerra assinatura **Ativa**. Assinatura **Pendente** (aguardando o primeiro pagamento) com data fim agendada não é encerrada.
- Se algum passo falhar, a assinatura continua **Ativa** e é reprocessada no dia seguinte — nunca fica cancelada com o Plano ainda ligado.

## Como validar
1. Numa assinatura de teste, preencher a data de fim e salvar. No Asaas, a assinatura deve **continuar existindo**, agora exibindo a data fim.
2. Antes da data: a assinatura segue **Ativa** e os usuários mantêm IA e Plano normalmente.
3. Depois da virada do dia da data: assinatura **Cancelada**, usuários sem IA, conta em **Recarga com saldo zerado** e nenhuma cobrança nova gerada.

## O que muda no dia a dia
- **Pro Suporte:** novo campo **"Data de fim de assinatura"** na modal de assinatura — ao adicionar e ao editar.
- **Pro Suporte (chamado novo):** *"não consigo mais ligar"* / *"minha IA parou"* — antes de tratar como incidente, confira se a conta tinha data de fim agendada. Se tinha e a data passou, é o esperado: a conta está em Recarga, zerada.
- **Pro CS:** encerramento combinado na conversa já sai agendado, sem depender de lembrete. Se o cliente voltar atrás **antes** da data, basta limpar o campo.
- **Pro CS (avise antes):** o produto não avisa ninguém, e o cliente **para de ligar** na virada do dia. Agendar sem combinar é derrubar a operação dele sem aviso.
- **Pro Comercial:** dá pra fechar contrato com **prazo determinado** e garantir que a cobrança para na data combinada. Não muda: cobrança já emitida não é cancelada, e o corte é sempre à meia-noite do dia informado — não existe fim no meio do ciclo.
- **Pro Financeiro:** assinatura encerrada por data fim **fica no Asaas**, com a data preenchida e o histórico de cobranças completo para conferência.
- **Pro cliente:** nenhum comunicado automático. Na data, perde IA e ilimitado e cai pra Recarga zerada — só volta a ligar recarregando. Se foi combinado, o aviso vem do CS.
