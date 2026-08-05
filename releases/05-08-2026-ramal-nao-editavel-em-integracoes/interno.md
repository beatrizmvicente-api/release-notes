## Em uma frase
O campo Ramal, em Integrações, deixa de ser editável pelo cliente.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Em **Integrações > Ramal**, o usuário escolhia outro ramal e vinculava ao próprio login | O ramal continua visível, mas o campo **não é editável** |
| Troca equivocada virava **consumo de cota inesperado** | O vínculo criado com o usuário se mantém |
| Havia clientes com **o mesmo ramal em mais de um usuário** | Deixa de ser possível chegar nesse estado pela tela |

## Por que importa
Era um campo de autonomia que quase ninguém usava certo. O usuário abria Integrações, via uma lista de ramais e trocava achando que estava "escolhendo o dele" — e passava a consumir a cota de outra pessoa.

**Exemplo.** Uma consulta na base encontrou contas com **o mesmo ramal vinculado a dois usuários**:
- **Antes:** dois operadores gastando o mesmo saldo, a cota estourando antes do previsto e ninguém entendendo por quê. O chamado chegava como "consumo errado", e a causa real era uma troca feita meses antes.
- **Agora:** o campo trava e o problema para de nascer.

Resultado: um atalho que virava chamado deixou de existir.

## Detalhes importantes
- Mensagem exibida no campo: *"O ramal é vinculado na criação do usuário. Para alterá-lo, entre em contato com o suporte."*
- O ramal continua **visível** — o que sai é só a edição.
- **O ramal é definido na criação do usuário.** Esse é o caminho normal, e ele não muda.
- Trocar o ramal de um usuário já criado é **exceção rara**, liberada caso a caso pelo rollout `extension-change`. **Ninguém tem por padrão.**
- É fail-closed: se o rollout não existir ou a consulta falhar, o campo fica **travado**.

## O que muda no dia a dia
- **Pro Suporte:** o campo travado deve **reduzir** chamado, não criar. Se aparecer pedido de troca, trate como exceção — o caminho normal é o ramal definido na criação. **Falta definir** quem autoriza a liberação do rollout e se ele é revogado depois.
- **Pro CS:** chamado de cota estourada sem explicação tende a cair — era comum ser ramal trocado por engano.
- **Pro Comercial:** nada muda na venda. A vinculação do ramal continua acontecendo na criação do usuário.
- **Pro cliente:** ele vê o campo travado com a orientação na tela. Sem comunicado prévio.
