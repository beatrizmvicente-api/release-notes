## O que mudou
Consultas de chamadas sem período informado passam a trazer os últimos 30 dias.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Uma consulta sem período varria todo o histórico de chamadas e podia deixar os relatórios lentos | Sem período informado, a busca traz os **últimos 30 dias** |
| O filtro de duração "entre X e Y segundos" ignorava o segundo limite e trazia chamadas fora do intervalo | O filtro respeita os **dois limites** |

## Como usar
1. Precisa de um período específico? Informe a data inicial e a final — você recebe o intervalo completo, inclusive um ano inteiro.
2. Não informou período? A resposta vem com os últimos 30 dias.
3. Filtrou por duração? Confira o resultado: ele agora respeita o limite de baixo e o de cima.

## Bom saber
- A janela de 30 dias só entra quando **nenhum período** é informado — ela não corta quem pediu um intervalo maior.
- Vale para os relatórios de chamadas no portal e para as consultas feitas pela API.
- Relatórios gerados antes de hoje não são recalculados.
