## Em uma frase
O botão do header do Portal vira um espaço de campanha, montado no Suporte Admin.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Um botão **fixo no código**, com o texto do API Indica | Um **espaço de campanha** — nome, texto, ícone e link são configurados |
| Trocar uma palavra exigia PR, review e **deploy** | A alteração aparece pro cliente **na hora** |
| O botão aparecia sempre | Campanha tem **período de vigência** — fora dele, não aparece |
| Um link único pra todo lugar | **UTM separado por canal** — dá pra saber de onde veio o clique |

## Por que importa
O header é o ponto mais visto do Portal, e estava ocupado por um botão que só o desenvolvimento conseguia mexer. Trocar uma palavra ali custava um deploy — na prática, campanha andava no ritmo da fila de dev.

**Exemplo.** Hoje o espaço roda o **API Indica**. Amanhã pode rodar outra campanha — outro nome, outro texto, outro ícone, outro link e outra cor — sem passar por código:
- **Antes:** abrir ticket, esperar dev, review e deploy. Dias entre a decisão e o cliente ver.
- **Agora:** cadastra a campanha no Suporte Admin, define a vigência, e ela entra no ar.

Resultado: o header deixou de ser um botão e virou um canal.

## As mudanças
1. **Tela de campanha no Suporte Admin** — título, descrição, link, ícone, cor de fundo e cor do texto.
2. **Período de vigência** — a campanha tem começo e fim. Sem campanha vigente, o botão simplesmente **não é exibido**.
3. **UTM por canal** — um para o Portal e outro para o Webphone, pra medir de onde veio o clique.

## Detalhes importantes
- **A campanha vigente hoje é o API Indica, com recompensa de R$ 200.** Nada muda pro cliente neste deploy — só onde a configuração vive.
- **Sem campanha vigente cadastrada, o botão some do header.** Não é falha — é a vigência funcionando.
- **O link precisa ser HTTPS.** Cadastrado sem `https://`, o botão **não aparece** — e não há mensagem de erro. É a causa mais provável de "configurei e não apareceu".
- **Durante o onboarding o botão não é exibido**, mesmo com campanha vigente. Ele aparece quando a conta conclui o onboarding.
- A mesma configuração alimenta o botão do **Webphone**. Editar aqui muda nos dois canais — **texto, cor e ícone são únicos**; só o UTM é separado por canal.
- É **uma campanha por vez** no espaço — não é uma lista rotativa.

## O que muda no dia a dia
- **Pro Marketing:** campanha no header deixa de depender de deploy. Texto, cor, link e vigência mudam no Suporte Admin e valem na hora — e o UTM por canal diz se o clique veio do Portal ou do Webphone.
- **Pro Marketing:** o espaço não é exclusivo do API Indica. Dá pra usar em qualquer campanha que valha o ponto mais visível do Portal.
- **Pro CS:** cliente dizendo que o botão sumiu? Cheque nesta ordem: **vigência** da campanha, **link com HTTPS** e se a conta ainda está em **onboarding**. As três escondem o botão sem dar erro.
- **Pro CS:** o que responder sobre a campanha é o que estiver cadastrado como vigente. Confira antes.
- **Pro cliente:** o botão continua no mesmo lugar, com a mesma campanha de sempre. Nenhum comunicado.
