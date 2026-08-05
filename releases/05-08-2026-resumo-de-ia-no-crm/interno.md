## Em uma frase
O resumo de IA chega ao CRM mesmo quando a conexão está vencida.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Com a **conexão do CRM vencida**, o negócio ficava sem nota — mesmo com o resumo pronto no Portal | A conexão **se renova sozinha** e o resumo é gravado na primeira tentativa |
| A integração só voltava quando alguém **reconectava na mão** | A recuperação é automática |
| O log não dizia o motivo — registrava `[object Object]` | O **erro real do CRM** aparece, com mensagem e código |

## Por que importa
Toda conexão com CRM tem uma **chave de acesso que vence de tempos em tempos** — é assim em todos eles. A renovação deveria ser automática e invisível. Não era: no momento em que a chave vencia, o resumo daquela ligação se perdia.

Isso importa porque o resumo é o entregável da IA. É por ele que o gestor não precisa ouvir a ligação inteira e o vendedor não precisa digitar o que conversou. Quando ele não chega, o cliente **paga pela IA e não recebe nada** — sem nenhum aviso.

**Exemplo.** O vendedor liga pro lead, conversa 8 minutos, encerra e segue pra próxima. Naquele momento a chave de acesso do CRM tinha acabado de vencer:
- **Antes:** a ligação ficava registrada no Portal, com áudio e resumo. Mas o negócio no CRM ficava **sem nota nenhuma** — como se a conversa não tivesse acontecido. Sem alerta, sem erro na tela: o gestor só descobria dias depois, ao abrir o negócio pra revisar. E seguia assim até alguém reconectar a integração na mão.
- **Agora:** a conexão se renova sozinha e o resumo é gravado no negócio logo depois da chamada.

**Por que a renovação falhava:** cada ligação gera **dois resumos ao mesmo tempo** (resumo gerencial e metodologia de vendas). Com a chave vencida, os dois pediam renovação **na mesma hora** — e uma derrubava a outra. Nenhuma valia, e os dois resumos se perdiam.

Caso que abriu o ticket: duas ligações de julho de um mesmo cliente, sem resumo no Pipedrive.

## As mudanças
1. **Renovação única e compartilhada** — os dois resumos da mesma ligação esperam a mesma renovação da chave, em vez de disputarem.
2. **Erro real do CRM no log** — em vez de `[object Object]`, vem a mensagem e o código (ex.: *"Activity not found (status: 404)"*). Diagnóstico direto, sem reproduzir.
3. **Tempo limite nas chamadas ao CRM** — a integração não fica pendurada esperando resposta que não vem.
4. **Nota fantasma no Pipedrive** — havia um caso em que a nota era criada mesmo depois de dar erro. Corrigido.

Vale para **Pipedrive, HubSpot, Kommo, Zoho, Salesforce e GoHighLevel**.

## Detalhes importantes
- **Não era em toda ligação.** A falha acontecia só nas ligações feitas com a chave de acesso já vencida — por isso o problema aparecia em blocos, e não de forma contínua.
- **Os resumos que não chegaram não voltam sozinhos.** Não há reprocessamento automático — se o cliente precisar do histórico, precisa ser escalado.
- A ligação e o resumo **sempre estiveram no Portal**. O que falhava era só a gravação no CRM.
- Vale para as duas saídas de IA: resumo gerencial e metodologia de vendas.
- Quantos clientes ficaram sem resumo ainda **não foi levantado** — o caso conhecido é um só.

## O que muda no dia a dia
- **Pro Suporte:** chamado *"não recebi o resumo no CRM"* deve cair. Se voltar, o log já traz a mensagem real do CRM — dá pra dizer o que aconteceu sem reproduzir.
- **Pro Suporte:** parou de ser necessário **mandar o cliente reconectar a integração** como primeiro passo. A recuperação agora é sozinha.
- **Pro CS:** cliente reclamando de resumo faltando em ligações antigas — o histórico **não volta sozinho**. Escale antes de prometer.
- **Pro Comercial:** a integração de IA com CRM volta a ser argumento firme nos seis CRMs suportados.
- **Pro cliente:** nenhum comunicado. Ele simplesmente volta a ver os resumos no CRM.
