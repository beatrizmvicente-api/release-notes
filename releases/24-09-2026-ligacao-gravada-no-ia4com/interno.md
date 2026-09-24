## Em uma frase
Um clique no relatório abre a ligação gravada dentro do assistente IA4COM.

![O relatório de Chamadas com o painel do IA4COM aberto ao lado da ligação selecionada](media/24-09-2026-ligacao-gravada-no-ia4com/portal-relatorio-painel.png)

*No Portal: o botão da faísca abre o assistente ao lado da lista, sem sair do relatório.*

![A aba Histórico do webphone, com o botão do IA4COM em cada ligação com gravação](media/24-09-2026-ligacao-gravada-no-ia4com/webphone-historico.png)

*No webphone: o mesmo botão na aba Histórico — chega ao cliente quando a extensão for publicada na loja.*

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Para analisar uma ligação com o assistente, o vendedor **baixava a gravação e anexava** | Um clique no botão da ligação abre o assistente ao lado, já com a conversa carregada |
| O assistente recebia a conversa como **texto corrido**, sem saber quem falou o quê | A transcrição chega separada por falante |
| Ligação antiga ficava de fora | Qualquer ligação gravada funciona, sem corte de data |

## Por que importa
O caminho tinha atrito suficiente para ninguém percorrer: sair da tela, baixar áudio, voltar, anexar.

- **O uso mais óbvio do assistente era o mais trabalhoso.** Analisar a própria ligação é o que o vendedor quer fazer, e era o que dava mais passos.
- **Sem saber quem falou, a resposta saía embaralhada.** Pergunta sobre a objeção do cliente vinha misturada com a fala do vendedor.

Resultado: o vendedor pergunta sobre a ligação sem sair do relatório.

## As mudanças
1. **Botão com faísca no relatório de Chamadas**, ao lado do Copiar — em ligação atendida e com gravação.
2. **Painel lateral** abre o assistente ao lado da lista, com data, hora e vendedor da ligação no topo.
3. **Mesmo botão na aba Histórico do webphone** — mas ele só chega ao cliente depois de a nova versão da extensão ser publicada na Chrome Web Store e o navegador de cada pessoa atualizar. Até lá, o caminho é o relatório do Portal.
4. **Ligação antiga é preparada no primeiro clique** — leva algumas dezenas de segundos, com "preparando a ligação…" na tela. Da segunda vez em diante abre na hora, para qualquer pessoa da conta.

## Detalhes importantes
- **É liberação controlada.** O botão só aparece para quem está no grupo de liberação `ia4com`. Para todo o resto, a tela é idêntica à de ontem — nem o botão existe.
- **ADMIN abre qualquer ligação do domínio; os outros perfis, só as próprias.** Inclusive no plano Gerencial, que vê as ligações do time no relatório mas não tem o botão nelas. É decisão de produto para esta entrega, não falha — e é o ajuste mais provável de ser pedido.
- **O resumo do CRM pode sair redigido diferente, e isso vale para todas as contas** — não só para o grupo de liberação. A transcrição passou a ser feita com separação de falante: em gravação de um canal o texto é praticamente idêntico ao de antes; em gravação de dois canais fica de 81% a 90% igual, e a diferença é fala que o modo anterior perdia. Não é erro, e a tendência é conteúdo mais completo.
- **Cada primeira abertura de uma ligação gera uma transcrição paga.** Há trava para não pagar duas vezes pela mesma ligação, e limite de aberturas por minuto — mas não existe projeção de custo total nesta entrega.
- **Mensagens que o cliente pode ver:**
  - *"preparando a ligação…"* — primeira abertura daquela ligação. Normal, some sozinho.
  - *"a plataforma ainda está processando esta ligação…"* — ligação recente, ainda no processamento normal. Tentar de novo em alguns minutos.
  - *"a ligação ainda está sendo preparada"* — o preparo passou de 3 minutos e a tela parou de esperar; o preparo continua, reabrir costuma resolver.
  - *"muitas ligações abertas seguidas"* — mais de 20 aberturas no mesmo minuto. É proteção, não bloqueio da conta; passa sozinho.

## Como validar
Com um usuário do grupo de liberação: abrir uma ligação nunca aberta e conferir que aparece "preparando a ligação…" e depois a transcrição, sem recarregar a página; abrir a mesma ligação de novo e conferir que abre na hora. Com um usuário fora do grupo, o relatório precisa estar idêntico ao de antes.

## O que muda no dia a dia
- **Pro Suporte:** *"por que eu não vejo esse botão?"* é liberação controlada — só o grupo `ia4com` tem. *"demorou para abrir"* é a primeira abertura preparando a transcrição, e a segunda é instantânea. *"o resumo mudou de texto"* acontece em ligação gravada em dois canais e não é erro. A lista de mensagens acima é o roteiro.
- **Pro CS:** cliente que pediu "quero analisar a ligação com a IA sem baixar o áudio" está atendido — desde que esteja no grupo de liberação. Se um cliente do plano Gerencial reclamar de não ter o botão nas ligações do time, registre o pedido: é a próxima evolução natural.
- **Pro Comercial:** o caminho de demonstração é relatório de Chamadas → botão da faísca → painel com a conversa transcrita. Não prometer para conta fora do grupo de liberação, nem prometer o webphone antes da publicação na loja.
- **Pro cliente:** nenhum comunicado geral por enquanto — a funcionalidade está em liberação controlada. O comunicado externo sai quando ela abrir para todas as contas.
