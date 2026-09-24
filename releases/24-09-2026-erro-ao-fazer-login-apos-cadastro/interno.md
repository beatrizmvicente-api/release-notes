## Em uma frase
Corrigido o erro de login que alguns clientes encontravam depois de se cadastrar.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Alguns clientes se cadastravam e, ao tentar entrar, **esbarravam num erro de login** | O login funciona |
| Tentar de novo **não resolvia** — e nada na tela dizia por quê | A conta se completa sozinha, sem o cliente fazer nada |
| Destravar dependia de a equipe técnica limpar registros à mão | Uma varredura de hora em hora reprocessa o que ficou preso |

## Por que importa
Não era corriqueiro — mas quando pegava, pegava no pior momento possível: o cliente acabou de se cadastrar e não consegue entrar.

- **O sintoma chegava como "não consigo fazer login".** Na prática era sempre o primeiro acesso depois do cadastro, e é isso que ligava um caso ao outro.
- **A causa ficava escondida atrás do login.** O cadastro tinha falhado no meio e respondido como se tivesse dado certo: a conta existia para a telefonia e não existia no cadastro central. Ninguém sabia disso na hora.
- **E não tinha saída pelo autoatendimento.** O cliente tentava de novo e dava no mesmo, porque o sistema recusava recriar o que já tinha ficado pela metade. Virava chamado técnico no primeiro contato dele com o produto.

Resultado: conta que nasce incompleta se completa sozinha em até uma hora, em vez de virar chamado.

## Detalhes importantes
- **Quantos clientes passaram por isso, não sabemos.** O caso foi reproduzido em ambiente local em 11/07; não existe levantamento de produção. Vale cruzar chamados antigos com o sintoma "me cadastrei e não consigo entrar".
- **A varredura vale daqui para frente**, sobre as contas criadas nos últimos 7 dias. Conta que travou antes disso não é alcançada — se houver cliente parado nessa situação, ele precisa ser tratado à mão.

## Como validar
Forçar a falha numa etapa do cadastro e conferir que a segunda tentativa conclui sem limpeza manual; conferir que a conta presa sai da fila na varredura seguinte e que o login passa a funcionar.

## O que muda no dia a dia
- **Pro Suporte:** *"me cadastrei e não consigo fazer login"* passa a se resolver sozinho em até 1 hora. Se passar disso, é caso novo — abra ticket.
- **Pro CS:** cliente novo travado no primeiro acesso não depende mais de chamado técnico. Vale procurar chamado antigo com esse sintoma que tenha ficado parado.
- **Pro Comercial:** o primeiro acesso deixa de ser o ponto frágil da entrada.
- **Pro cliente:** nenhum comunicado.
