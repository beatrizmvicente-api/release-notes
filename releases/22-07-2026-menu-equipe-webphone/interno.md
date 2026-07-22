## Em uma frase
O Webphone V2 ganhou uma aba **Equipe**: lista dos colegas, busca por nome, ligar no clique e escuta (*66) num botão. Antes, ligar ou escutar dependia de saber o ramal e discar código na mão.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Pra ligar pra um colega, o usuário tinha que saber o ramal e digitar | Aba **Equipe** lista os colegas ativos e liga no clique |
| Escutar uma ligação era discar **`*66` + ramal** de cabeça | Botão de escuta em cada colega faz a "carona" sem decorar código |
| Não havia visão das pessoas do time | Lista paginada e buscável dos colegas ativos |

## Por que importa
Escuta é ferramenta de gestão e treinamento — supervisor ou par acompanhando a ligação ao vivo. Só que o caminho era um código escondido (`*66` + ramal): quem não sabia de cor não usava, e ligar pra um colega dependia de decorar ramal. A feature tira o time da dependência de código decorado e coloca ligar e escutar a um clique — mais adesão à escuta, menos atrito no dia a dia.

## Detalhes importantes
- Vale pro **Webphone V2 (5.6.0)**.
- A aba lista **colegas ativos**, com **paginação** e **busca por nome**.
- Dois botões por membro: **ligar** (click-to-call) e **escutar** (`*66` + ramal, a "carona").
- A escuta só conecta se o ramal-alvo estiver **em ligação**. Fora de ligação, aparece o toast *"Este usuário não está em ligação no momento"*.

## Como validar
1. No Webphone V2, abra a aba **Equipe** — a lista carrega os colegas ativos.
2. Toque no **fone de ouvido** de um usuário **em ligação** — a escuta inicia.
3. Faça a escuta (`*66`) de um usuário **fora de ligação** — deve aparecer o toast de aviso.

## O que muda no dia a dia
- **Pro cliente (gestor/supervisor):** acompanha ligações ao vivo pela aba Equipe, sem decorar `*66` + ramal.
- **Pro Suporte:** "como eu escuto/faço carona numa ligação?" → antes era orientar o código `*66` + ramal; agora é **aba Equipe > botão de escuta**. Lembrar que só conecta com o colega em ligação.
- **Pro Comercial/CS:** argumento de gestão e treinamento — supervisão de ligações ficou a um clique no Webphone.
