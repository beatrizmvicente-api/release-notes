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
1. **Convite com cobrança proporcional** — precisa de mais um no time? O próprio cliente adiciona o usuário, escolhe o plano e o sistema já calcula a conta proporcional — sem passar pelo comercial.
   - Entra como *Aguardando pagamento* e vira *Ativo* assim que a cobrança é paga.
   - Deixou vencer (7 dias)? A cobrança se cancela sozinha e o usuário sai — nada fica "pendurado".
   - **Plano Gerencial é grátis:** dá pra incluir gestores sem cobrar nada — o assento é criado, mas ninguém paga por ele.
2. **Crescer ou enxugar o time, na hora** — o cliente mexe nos usuários sozinho, sem abrir chamado.
   - **Subir de plano (upgrade):** só pra plano maior, feito **no portal**; paga só a diferença e a troca vale quando o pagamento cai.
   - **Trazer alguém de volta:** reativar um usuário é só reescolher o plano — cobrança proporcional, igual a um convite.
   - **Tirar alguém (downsell):** sai do uso na hora, mas segue no plano até o fim do ciclo já pago (**sem estorno**). A economia começa no próximo ciclo.
   - **Baixar o plano de quem está ativo?** Ainda não tem botão: o caminho é **desativar e reativar num plano menor** (ou chamar o suporte).
   - Mudou de plano? Os benefícios (como o **acesso à IA**) e a cota de minutos se ajustam sozinhos na troca.
   - Tentou trocar pro mesmo plano ou sem assinatura ativa? O sistema barra.
3. **Pagamento manual** — cliente pagou por fora do link? O Suporte libera na mão, com observação obrigatória (comprovante opcional) e registro de quem fez. Cobrança já paga nem mostra o botão — sem risco de liberar duas vezes.
4. **Bloqueio por consumo de minutos** — acabaram os minutos do plano? Agora a ligação para de sair **de verdade** — não só aparece na fatura.
   - Bloqueia quando o plano **não tem minutos de voz** ou a **franquia do ciclo acabou**.
   - **Ninguém é pego de surpresa:** no deploy, a base atual nasce **desbloqueada**; só as contas **novas** já nascem com o bloqueio ligado.
   - Na base, o **CS liga conta a conta**, confirmando o plano certo de cada usuário.
   - Ligar o bloqueio? Vale **no próximo ciclo**. Desligar? **Na hora**.
5. **Consumo e plano na listagem** — chega de achismo: no menu *8 - Usuários da Organização* dá pra ver quanto cada usuário gastou.
   - Mostra consumo (ex.: 120 / 300 min), plano e valor por usuário.
   - Quem está aguardando pagamento aparece com **"-"** (ainda não conta).
6. **Aviso de bloqueio no webphone** — o usuário sem minutos não fica no escuro: em vez de a ligação falhar calada, o webphone avisa.
   - Sem minutos, a ligação é bloqueada e aparece o aviso de upgrade — nas duas versões (**azul** e **branca**). O Suporte pode revogar quando precisar.
   - O aviso só aparece com a **extensão atualizada** (v3 4.34.0 / v5 5.3.0) — ela se atualiza sozinha pela loja do Chrome, mas pode demorar algumas horas.

## O que muda no dia a dia
- **Pro cliente (contas Plano):** adiciona usuário sozinho e enxerga consumo, plano e valor. Sem minutos, é a **próxima ligação** que é bloqueada — **chamadas em andamento não caem** (a checagem é feita ao iniciar cada ligação).
- **Pro time:** menos pedido manual de "adiciona usuário / troca plano". **Mande o cliente pro self-service** — é mais rápido e é onde a cobrança sai certa. Regras de upgrade, desativação e bloqueio são fixas: sem negociar caso a caso.

## Detalhes importantes
- Vale só para contas **Plano** (não Recarga).
- Depois de configurar ou mudar algo, **saia e entre de novo** no portal para aplicar.
- Upgrade muda só após o pagamento; desativação e mudanças de "próximo ciclo" não entram na fatura atual.
