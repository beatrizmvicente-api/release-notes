## Em uma frase
O Suporte agora acessa a conta do cliente temporariamente **com autorização dele e direto pelo portal**: o cliente gera um código, passa pro atendente, e o atendente entra na conta por até 3h — sem acesso remoto.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Pra ver o que o cliente vê, o suporte fazia acesso remoto — agendar, o cliente instalar/abrir uma ferramenta e compartilhar a tela | Cliente gera um código e o suporte entra direto na conta, pelo próprio portal, sem instalar nada |
| Nenhum registro do que o atendente mexeu durante o atendimento | Toda ação de escrita do suporte fica auditada (quem, quando, o quê) |
| Cliente não sabia se o suporte ainda estava na conta | Barra permanente avisa a sessão ativa; o cliente encerra quando quiser |

## Por que importa
Pra reproduzir um problema, o suporte precisava fazer **acesso remoto**: agendar com o cliente, pedir pra ele instalar/abrir uma ferramenta de acesso e compartilhar a tela. É lento, depende do cliente ter a ferramenta na mão e não deixa registro do que foi feito.

A personificação fecha isso: o atendente entra na conta direto pelo portal, vê o que o cliente vê e reproduz o problema na hora — com auditoria completa de tudo que foi alterado. Vira argumento de qualidade de suporte pro comercial.

## Como funciona
- Cliente pede o código na tela de **Suporte** do portal → código de 12 caracteres (ex.: `K7M3 QP9X ZB42`), gerado no pbxapi e nunca salvo em texto puro.
- Atendente informa o código na tela de suporte e **entra na personificação**.
- A sessão dura **até 3h** ou até o cliente encerrar na mão.
- Gerou um código novo? A personificação anterior é revogada — nunca há duas sessões ativas.
- Durante a sessão, barra/aviso permanente no portal, com botão de encerrar (com confirmação).

## Detalhes importantes
- **Rollout controlado (interno):** o cliente já vê o menu e consegue gerar o código normalmente — o controle (flag `account-impersonation`) é de **qual pessoa do time interno** pode usar o recurso pra entrar na conta do cliente. Ainda não está liberado pra todo o time.
- A sessão expira sozinha em 3h; o cliente também encerra a qualquer momento.
- Já saiu com os ajustes finos (TEL-2010): aviso de sessão mais visível, modal de confirmação ao encerrar e timer de expiração mais confiável.

## O que muda no dia a dia
- **Pro Suporte:** peça o código ao cliente, valide na tela de suporte e entre. Toda ação de escrita fica auditada — **não faça nada fora do escopo do atendimento**.
- **Pro CS:** em caso difícil de descrever por texto, oriente o cliente a gerar o código na tela de Suporte e passar ao atendente.
- **Pro Comercial:** use como diferencial — suporte mais ágil e seguro, sem pedir senha do cliente.
