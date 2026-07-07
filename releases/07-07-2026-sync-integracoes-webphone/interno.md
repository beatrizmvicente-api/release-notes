## Em uma frase
As integrações de CRM passam a sincronizar sozinhas no WebPhone — a cada abertura e a cada reload da extensão. Antes, o usuário tinha que ir na mão em **Ajustes > Atualizar integrações** pra integração de fato funcionar.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Ativou a integração no portal, mas ela só passava a funcionar depois de o usuário ir em **Ajustes > Atualizar integrações** na mão | Sincroniza automaticamente a cada abertura do WebPhone e a cada reload da extensão |
| WebPhone podia ficar com a integração desatualizada sem o usuário saber | Flag de integração sempre atual, sem passo manual |

## Por que importa
O cliente ativava a integração no portal e, no WebPhone, nada acontecia. Pra funcionar de verdade, ele tinha que descobrir e clicar em **Ajustes > Atualizar integrações** — um passo escondido que virava ticket de "ativei o CRM e não funciona".

Agora a sincronização roda sozinha nos dois momentos que importam (abrir o WebPhone e recarregar a extensão), então a integração simplesmente funciona — sem o cliente precisar saber que esse passo existia.

## O que muda no dia a dia
- **Pro cliente:** ativou/desativou integração no portal? O WebPhone reflete na próxima abertura, sem passar por Ajustes.
- **Pro Suporte:** "ativei o CRM, configurei, mas não tá conectando na extensão/WebPhone pra ligar" → antes a orientação era "vá em Ajustes > Atualizar integrações"; agora é só fechar/abrir o WebPhone (ou recarregar a extensão). O passo manual deixou de ser necessário.

## Detalhes importantes
- Vale pro WebPhone v5 (5.5.0).
- A sincronização dispara em dois momentos: abertura do WebPhone e reload da extensão.
- **"Reload" aqui = F5** (recarregar a página/extensão) — não precisa reinstalar nada.
