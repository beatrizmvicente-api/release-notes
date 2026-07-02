## Em uma frase
Contas no modelo **Plano** passam a ter cobrança e consumo geridos **por usuário**: o cliente adiciona usuário sozinho com cobrança proporcional, dá pra trocar de plano com regra clara, e quem fica sem minutos tem as ligações realmente bloqueadas.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Cliente adicionava usuário e, se ninguém rodasse análise manual e cobrasse, aquilo não era faturado | Todo usuário adicionado gera cobrança proporcional automática, na hora |
| Uso acima do plano não era cobrado nem bloqueado | Sem minutos, a ligação é bloqueada no webphone, com aviso de upgrade |
| Sem visão de consumo/plano por usuário no portal | Consumo, plano e valor visíveis por usuário |
| Liberar pagamento dependia da confirmação automática | Suporte libera na hora, com comprovante e registro de quem fez |

## Por que importa
**Hoje há dinheiro na mesa.** Quando o cliente adiciona um usuário, a cobrança só acontece se alguém da API4COM rodar uma análise manual, perceber a diferença e acionar o cliente — na prática, muita coisa passa e nunca é faturada. E como não é cobrado, também não é bloqueado: o cliente usa além do plano sem limite. Estas mudanças fecham os dois vazamentos de uma vez — a cobrança do novo usuário passa a ser **automática e proporcional**, e o consumo acima do plano passa a **bloquear**. É recuperação direta de receita que hoje escapa, sem depender de ninguém olhar conta a conta.

## As 6 mudanças
1. **Convite de usuário com cobrança proporcional** — o cliente adiciona usuário no portal, escolhe o plano e o sistema gera a cobrança pró-rata (do dia até o fim do ciclo). O usuário nasce em *Aguardando pagamento* e vira *Ativo* quando a cobrança é paga. Não pagou em 7 dias → cobrança cancelada e usuário desativado.
2. **Upgrade / downgrade de plano** — upgrade cobra só a diferença proporcional e **só troca quando o cliente paga**; downgrade não cobra agora e vale **no próximo ciclo**. Trocar para o mesmo plano ou fora de assinatura ativa é recusado.
3. **Pagamento manual** — o Suporte libera uma cobrança pendente na hora, com **observação obrigatória** e comprovante opcional; fica registrado quem liberou e quando. Em cobrança já paga, o botão nem aparece.
4. **Bloqueio por consumo de minutos** — no Suporte Admin, define-se o plano de cada usuário e liga-se o bloqueio por consumo. Só salva com todos os usuários verificados e com plano atribuído.
5. **Consumo e plano na listagem** — no menu *8 - Usuários da Organização*, cada usuário passa a mostrar consumo (ex.: 120 min / 300 min), plano e valor.
6. **Bloqueio das ligações no webphone** — sem minutos, o webphone bloqueia a ligação e mostra aviso de upgrade. O Suporte pode revogar o bloqueio manualmente.

## O que muda no dia a dia
- **Pro cliente (contas Plano):** autonomia pra adicionar usuário e visão clara de consumo, plano e valor; as ligações param quando o plano estoura.
- **Pro time:** cai o volume de pedido manual de "adiciona usuário / troca plano". **Direcione o cliente pro self-service** em vez de abrir chamado interno — é mais rápido pra ele e é onde a cobrança proporcional é gerada certa. Upgrade, downgrade e bloqueio seguem regra fixa: não precisa negociar caso a caso.

## O que falar (e o que não falar)
- **Pode dizer:** "Agora você adiciona usuários e acompanha o consumo direto no portal, e a cobrança é proporcional aos dias que faltam no ciclo."
- **Cuidado com:** vale **só para contas no modelo Plano** — contas Recarga não têm nada disso, e isso não é erro. Depois de mudança de plano ou configuração, o cliente precisa **sair e entrar de novo** no portal pra ver a atualização.

## Detalhe que só importa se perguntarem
- Reflete apenas em contas **Plano** (não Recarga).
- O plano de cada usuário é efetivamente registrado na configuração de **bloqueio por consumo** (Suporte Admin).
- Após configurar ou alterar, é preciso **reconectar** no portal para aplicar.
- Upgrade muda só após o pagamento; downgrade e mudanças de "próximo ciclo" não aparecem na fatura atual.
