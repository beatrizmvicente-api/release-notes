## Em uma frase
Usuários que não tiveram chamadas atendidas aparecem informação de "-" ao invés de 0s.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Vendedor que não teve chamada atendidas aparecia como **`0s`** | Aparece **`—`**, o mesmo símbolo de "não houve" do resto da tabela |
| "Não teve o que medir" induzia o leitor de que o vendedor não tinha paciência | O traço não induz errado a leitura do relatório |

## Por que importa
Número no lugar de vazio faz o leitor parar pra decidir se aquilo é dado ou defeito.

- Numa tabela de desempenho, `0s` no meio de tempos reais lê como resultado — e não é.
- Coluna com `0s` em vários vendedores parece cálculo quebrado, e vira pergunta pro suporte.

## Detalhes importantes
- **Ajuste de exibição.** O cálculo e o dado gravado são os mesmos de sempre.
- Vale para a tabela **Desempenho por Usuário**, do Dashboard.
- Quem teve chamadas atendidas continua vendo o tempo normalmente.

## Como validar
Abrir Dashboard → Desempenho por Usuário, filtrar um período ou vendedor sem ligações atendidas e conferir que a coluna mostra o traço.

## O que muda no dia a dia
- **Pro Suporte:** *"a coluna de espera zerou"* deixa de ser sintoma — o traço já diz que não houve registro no recorte.
- **Pro CS:** um item a menos pra explicar quando apresenta o Desempenho por Usuário.
- **Pro Comercial:** nada muda.
- **Pro cliente:** nenhum comunicado. Aparece no próximo acesso ao Dashboard.
