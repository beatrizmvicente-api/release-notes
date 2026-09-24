## Em uma frase
Quem troca de plano para de ser bloqueado pela franquia do plano antigo.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| O usuário ia para o Ilimitado e era bloqueado ao passar dos **90 minutos do plano anterior** | A medição passa a ser a do plano atual |
| O CS liberava e o bloqueio **voltava na madrugada seguinte**, todo dia, até a virada do ciclo | O desbloqueio fica de pé |
| Troca de faixa 90 → 300: o cliente de 300 minutos era bloqueado aos 90 | Uma franquia só, a do plano em que ele está |

## Por que importa
O cliente pagou para ligar mais e foi impedido de ligar — todos os dias, pela mesma causa.

- **Era a pior combinação possível:** bloqueio indevido, reincidente, e que voltava de madrugada sem ninguém mexer.
- **O CS gastava o dia desfazendo o que a rotina refazia à noite.** Sempre a mesma conta, sempre no dia seguinte.
- **Pegava qualquer conta que paga por boleto.** A janela entre a emissão e o pagamento é de uns 13 dias por mês, e é nela que a troca de plano cai.

Resultado: a franquia é a do plano em que o usuário está hoje, não a da foto tirada quando o boleto nasceu.

## As mudanças
1. **O pagamento olha o plano atual.** A franquia do plano antigo não volta mais junto com a fatura paga.
2. **A rotina da meia-noite conserta em vez de reaplicar.** Ela libera o usuário e remove a franquia que não é do plano; se falta a do plano certo, cria.
3. **Troca agendada para plano com minutos passa a criar a franquia.** Antes ela procurava uma franquia anterior para converter, não achava nada e seguia sem criar — o usuário entraria no plano novo sem medição nenhuma. Pego em homologação e fechado antes de chegar a qualquer cliente.

## Detalhes importantes
- **As contas nessa situação se acertam sozinhas na primeira madrugada.** Não precisa de intervenção uma a uma.
- **Para destravar alguém hoje**, o caminho manual continua valendo — e a ordem importa: liberar no core primeiro, remover a franquia depois.
- **Não sabemos quantas contas ficaram assim.** A varredura prevista no ticket ainda não rodou.
- Comportamento antigo, não é regressão recente.

## Como validar
Numa conta com o sintoma, conferir na madrugada seguinte que a franquia que não é do plano sumiu e que o usuário deixou de ser bloqueado, sem o CS liberar de novo.

## O que muda no dia a dia
- **Pro CS:** chamados de *"estou no Ilimitado e fui bloqueado"* ou *"liberei e voltou de madrugada"* podem ser reavaliados — a causa foi corrigida e a conta se normaliza na primeira madrugada. Se voltar depois disso, é caso novo.
- **Pro Comercial:** upgrade para plano sem limite de minutos passa a valer no mesmo dia, sem efeito colateral na semana seguinte.
- **Pro cliente:** vale avisar quem abriu chamado disso — ele volta a ligar sem depender da gente.
