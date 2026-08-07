## Em uma frase
A personificação parou de quebrar as telas do cliente assim que o atendente entrava.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| O atendente entrava na conta e **três telas caíam na hora** com "sessão expirada" | As telas carregam durante toda a sessão de 3h |
| O código do cliente era válido, mas a **sessão já nascia vencida** | A sessão dura o tempo prometido |
| Código realmente expirado devolvia **erro genérico** | *"Sessão indisponível — peça ao cliente para gerar um novo código"* |

## Por que importa
A personificação foi lançada em 07/07 pra acabar com o acesso remoto. Só que ela quebrava logo no primeiro clique — e ficou assim um mês.

- **O recurso existia e não dava pra usar.** Quem tentava caía nas telas de Usuários, Histórico de chamadas e Contratar Plano, todas com erro.
- **O atendimento voltava pro caminho antigo:** agendar, pedir pro cliente abrir uma ferramenta, compartilhar tela.
- **E a culpa parecia do cliente.** "Sessão expirada" sugere código velho, então o atendente pedia outro código — que quebrava igual.

Resultado: o recurso volta a valer o que foi prometido na hora do lançamento.

## Detalhes importantes
- **Nada mudou na regra da sessão:** continuam sendo **3h**, o cliente segue gerando o código na tela de Suporte e encerrando quando quiser.
- **A causa era o relógio da sessão**, não o código do cliente — pedir um código novo nunca resolvia.
- **Janela do problema: 07/07 a 06/08.** Chamados desse período sobre "sessão expirada durante personificação" podem ser fechados como corrigidos.
- **A mensagem de código inválido agora é literal.** Se ela aparecer, o código foi mesmo consumido ou expirou — aí sim peça outro.
- O rollout continua controlado: nem todo mundo do time interno tem o recurso liberado.

## Como validar
1. Gerar um código com o cliente, entrar na conta e abrir **Usuários da Organização**, **Histórico de chamadas** e **Contratar Plano** — nenhuma deve dar erro de sessão.
2. Tentar entrar de novo com um código já usado — deve aparecer a mensagem pedindo um código novo, não erro genérico.

## O que muda no dia a dia
- **Pro Suporte:** volte a usar personificação nos atendimentos — pare de agendar acesso remoto por causa disso.
- **Pro Suporte (chamado):** *"as telas quebram quando o suporte entra na minha conta"* entre 07/07 e 06/08 — corrigido, pode fechar.
- **Pro CS:** oriente o cliente a gerar o código na tela de Suporte, como no lançamento. Agora funciona de ponta a ponta.
- **Pro Comercial:** o argumento de "o suporte entra na conta sem acesso remoto e sem pedir senha" volta a valer na prática.
- **Pro cliente:** nenhum comunicado. Ele gera o código do mesmo jeito de sempre.
