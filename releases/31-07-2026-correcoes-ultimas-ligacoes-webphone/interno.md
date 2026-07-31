## Em uma frase
A ligação feita pelo CRM volta a aparecer na hora em "Últimas ligações" do Webphone.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Ligou pelo CRM (modo **"Discar primeiro número"**) e a ligação não entrava no painel — só surgia depois da discagem seguinte | A ligação entra em **"Últimas ligações"** assim que a chamada termina |
| Ligação recusada pelo sistema (saldo, status do usuário, número inválido) deixava um registro fantasma, que voltava depois **com o horário de outra ligação** | Ligação que não saiu é descartada na hora — nada aparece no painel |
| Queda de rede ao discar: **nada acontecia na tela**, e o registro podia sumir mesmo com a ligação tendo saído | Aviso na tela, e o registro é **mantido** com o horário real da discagem |

## Por que importa
"Últimas ligações" é o comprovante imediato do operador: ele disca, olha o painel e confirma que ligou. Com o painel errado, ele perde essa referência — e a reação natural é discar de novo.

- **O painel mentia pra quem vende.** Quem disca pelo CRM integrado não via a própria ligação. Na dúvida, ligava outra vez: cliente atendendo duas vezes, minuto gasto à toa.
- **Aparecia ligação que nunca aconteceu.** Chamada barrada por saldo ou número inválido voltava depois, colada no horário de outra — o operador via no painel uma ligação que ele não fez.
- **Falha de rede era silêncio.** Clicava em discar e a tela não mudava. Sem saber se saiu ou não, discava de novo.

Resultado: o painel volta a ser confiável — o que está lá aconteceu, na hora que diz.

## As mudanças
1. **A ligação pelo CRM aparece na hora** — o registro é revelado no fim da chamada, mesmo quando ela não passa pelos eventos da telefonia.
   - Vale para os três modos: discagem manual sem CRM, manual integrada e "Discar primeiro número".
2. **Fim do registro fantasma** — ligação que comprovadamente não foi originada é descartada na hora.
   - O descarte passou a ser só do registro daquela discagem — antes podia apagar do painel uma ligação real em andamento.
3. **Falha de rede agora avisa** — mensagem nova: *"Não foi possível confirmar sua chamada. Verifique sua conexão: se o ramal tocar, a ligação foi iniciada normalmente."*
   - A redação é proposital: nesses casos a ligação **pode** ter saído. É incerteza, não falha confirmada.

## Detalhes importantes
- O painel "Últimas ligações" é **local do navegador** e mostra só o dia atual. Nunca gravou nada no servidor.
- Por isso **histórico do Portal, relatórios, CDR e tarifação sempre estiveram corretos** — nada foi perdido e não há nada a corrigir retroativamente.
- Os registros errados que sobraram no navegador do usuário somem sozinhos na virada do dia.
- O problema existia **desde o fim de junho**, sempre limitado ao painel do Webphone.
- A correção chega quando a **extensão atualizar** — automática pela Chrome Web Store, com tempo de propagação variável.

## Como validar
1. Com o Webphone integrado ao CRM em **"Discar primeiro número"**: ligar, encerrar e conferir que a ligação aparece **na hora** em "Últimas ligações", com o horário certo.
2. Repetir nos modos **manual sem CRM** e **manual integrado**.
3. Forçar uma discagem recusada (ex.: número inválido) e conferir que **nenhum** registro fica no painel — nem na hora, nem na ligação seguinte.

## O que muda no dia a dia
- **Pro cliente:** nenhum comunicado. A ligação volta a aparecer em "Últimas ligações" assim que a extensão atualizar.
- **Pro Suporte:** "a ligação não aparece nas Últimas ligações" e "apareceu ligação com horário errado" devem parar. Se voltarem, é caso novo — avise o dev.
- **Pro Suporte (mensagem nova):** *"Não foi possível confirmar sua chamada..."* quer dizer que **não dá pra saber** se a ligação saiu. Oriente o usuário a checar se o ramal tocou antes de discar de novo, pra não duplicar.
- **Pro CS:** cliente que reclamou de ligação sumida ou horário errado pode ser tranquilizado — o histórico do Portal sempre esteve certo; o erro era só na exibição do painel.
