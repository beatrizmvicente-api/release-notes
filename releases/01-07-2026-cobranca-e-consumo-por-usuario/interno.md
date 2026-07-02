## Em uma frase
Nas contas **Plano**, cobrança e consumo passam a ser **por usuário**: adicionar usuário gera cobrança proporcional automática, e quem fica sem minutos tem as ligações bloqueadas.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Usuário adicionado só era cobrado se alguém checasse na mão | Todo usuário adicionado já gera cobrança proporcional |
| Uso acima do plano não era cobrado nem bloqueado | Sem minutos, a ligação é bloqueada (com aviso de upgrade) |
| Consumo e plano por usuário não apareciam no portal | Consumo, plano e valor visíveis por usuário |
| Liberar pagamento dependia da confirmação automática | Suporte libera na hora, com registro de quem fez |

## Por que importa
**Hoje há dinheiro na mesa.** Quando o cliente adiciona um usuário, só é cobrado se alguém da API4COM perceber na mão e acionar — muita coisa nunca é faturada. E o que não é cobrado também não é bloqueado: o cliente usa além do plano sem limite.

Estas mudanças fecham os dois vazamentos: a cobrança vira **automática e proporcional**, e o excesso passa a **bloquear**. Receita recuperada sem depender de olhar conta a conta.

## As 6 mudanças
1. **Convite de usuário com cobrança proporcional** — o cliente adiciona usuário e escolhe o plano no portal; a cobrança proporcional (do dia até o fim do ciclo) é gerada na hora.
   - Nasce em *Aguardando pagamento* e vira *Ativo* ao pagar.
   - Sem pagamento em 7 dias: cobrança cancelada e usuário desativado.
2. **Mudança de plano**
   - **Upgrade** (só para plano maior): o cliente faz **no portal**; cobra a diferença proporcional e **só troca ao pagar**.
   - **Downgrade**: só pelo **Suporte Admin**; sem cobrança agora, vale **no próximo ciclo**.
   - Mesmo plano ou fora de assinatura ativa: recusado.
3. **Pagamento manual** — o Suporte libera uma cobrança pendente na hora, com observação obrigatória (comprovante opcional) e registro de quem liberou. Em cobrança já paga, o botão nem aparece.
4. **Bloqueio por consumo de minutos** — no Suporte Admin, o CS define o plano de cada usuário e liga o bloqueio.
   - É para a base que já usa plano sem bloqueio: o parâmetro nasce *false* e o CS ativa **um a um**.
   - Só salva com todos os usuários verificados e com plano atribuído.
5. **Consumo e plano na listagem** — no menu *8 - Usuários da Organização*, cada usuário mostra consumo (ex.: 120 / 300 min), plano e valor.
6. **Bloqueio de ligações no webphone** — sem minutos, o webphone bloqueia a ligação e mostra aviso de upgrade. Vale nas duas versões (**azul** e **branca**); o Suporte pode revogar manualmente.

## O que muda no dia a dia
- **Pro cliente (contas Plano):** adiciona usuário sozinho e enxerga consumo, plano e valor. Sem minutos, é a **próxima ligação** que é bloqueada — **chamadas em andamento não caem** (a checagem é feita ao iniciar cada ligação).
- **Pro time:** menos pedido manual de "adiciona usuário / troca plano". **Mande o cliente pro self-service** — é mais rápido e é onde a cobrança sai certa. Regras de upgrade, downgrade e bloqueio são fixas: sem negociar caso a caso.

## Detalhes importantes
- Vale só para contas **Plano** (não Recarga).
- Depois de configurar ou mudar algo, **saia e entre de novo** no portal para aplicar.
- Upgrade muda só após o pagamento; downgrade e "próximo ciclo" não entram na fatura atual.
