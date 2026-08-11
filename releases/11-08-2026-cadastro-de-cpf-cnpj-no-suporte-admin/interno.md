## Em uma frase
Inserir ou alterar CPF/CNPJ pelo Suporte Admin deixa de travar com erro genérico.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| A ação de inserir/alterar o documento falhava com um erro genérico — e, sem documento, não dava pra gerar a cobrança do cliente | A ação completa; e, se algo barrar de verdade, a tela diz o motivo |
| A causa ficava invisível: a operação tinha **10 segundos** para percorrer Asaas, Omie e o core, e o que passasse disso morria no meio | Agora são **45 segundos** — tempo de sobra pro encadeamento terminar |

## Por que importa
O CPF/CNPJ é a porta de entrada da cobrança: sem ele no lugar, não se gera fatura pro cliente. E era exatamente aí que o operador esbarrava.

- **A conta ficava parada.** O operador tentava cadastrar o documento, tomava erro, tentava de novo e tomava erro de novo — enquanto isso, o cliente seguia sem cobrança.
- **O erro não dizia nada.** Não dava pra saber se o CPF era inválido, se o Asaas recusou ou se a conta já existia. Sem pista, sobrava abrir chamado.
- **A causa era tempo, não dado.** A operação passa por Asaas, Omie e core em sequência; com teto de 10 segundos, bastava um deles estar lento pra tudo cair — e o erro genérico escondia isso.

Resultado: a ação que destrava a cobrança volta a completar.

## As mudanças
1. **Inserir/alterar documento para de cair por demora** — o tempo limite da operação sobe de 10s para 45s, folga suficiente pro encadeamento com Asaas, Omie e core terminar.
2. **O erro volta com o motivo real** — em vez de uma falha genérica, aparece a recusa do serviço que barrou.
3. **Unificar contas ganhou o mesmo tratamento** — é o outro fluxo que passava pelo mesmo caminho.
4. **O e-mail financeiro que o operador informa é o que vale** — o já configurado na conta (ou o do admin da organização) só entra quando nenhum é informado.
5. **A orquestração saiu do BFF e passou pro pbxapi** — reorganização interna; telas e resultado continuam iguais.

## Detalhes importantes
- Vale para as duas ações do Suporte Admin: **adicionar/alterar documento (CPF/CNPJ)** e **unificar contas**.
- O cadastro público (signup) não foi tocado — quem se cadastra sozinho segue pelo mesmo caminho de antes.
- Nada muda na tela: mesmos campos, mesmos passos, mesmo resultado.

## O que muda no dia a dia
- **Pro Comercial:** é quem mais cadastra e corrige CPF/CNPJ — a ação para de morrer no erro genérico. Venda que ficou parada por falta de documento destrava refazendo o cadastro.
- **Pro CS:** conta que seguia sem cobrança por causa do documento travado passa a ser resolvida na hora, sem escalar.
- **Pro Suporte:** quando algo barrar de verdade, a mensagem diz o motivo — dá pra orientar direto, em vez de abrir chamado.
- **Pro cliente:** nenhum comunicado. Ele não percebe diferença.
