## Em uma frase
O painel "Últimas ligações" do Webphone passa a exibir o botão de campanha.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Campanha só era divulgada no **Portal** | Aparece também no **Webphone**, em "Últimas ligações" |
| O operador de vendas, que passa o dia no Webphone, **não via nada** | Vê a campanha entre uma ligação e outra |
| — | **Qualquer campanha** cadastrada nasce nos dois canais de uma vez |

## Por que importa
O público da campanha é quem usa o telefone o dia inteiro — e esse público quase não abre o Portal. A campanha estava exposta justamente onde ele não passa.

**Exemplo.** Hoje o espaço roda o **API Indica**. Amanhã pode rodar outra campanha, com outro nome e outro link:
- **Antes:** o Webphone não tinha onde exibir nada. Divulgar pro operador dependia de e-mail ou do Portal.
- **Agora:** a campanha é cadastrada uma vez no Suporte Admin e aparece **no header do Portal e no Webphone**, cada um com seu UTM.

## Detalhes importantes
- O botão fica no painel **"Últimas ligações"**, acima dos contatos de suporte e comercial.
- **Texto, descrição, cor e ícone são os mesmos nos dois canais** — a campanha tem um título só. O que muda por canal é apenas o **UTM**.
- **Editar a campanha não exige atualizar a extensão.** O Webphone lê a campanha da API, então texto, cor, ícone e link novos valem sem nenhuma publicação na loja do Chrome.
- **A campanha é buscada quando o painel abre.** Como o operador deixa o Webphone aberto o dia todo, uma edição feita no meio do expediente só aparece pra ele depois de sair e entrar de novo.
- O título é livre: texto mais longo que a largura da coluna **quebra em duas linhas** em vez de ser cortado.
- Se cor ou ícone não forem informados, o botão usa o padrão — fundo amarelo e ícone de presente.
- **Link sem HTTPS esconde o botão**, igual ao Portal, e sem mensagem de erro.
- Sem campanha vigente, o botão não aparece.
- Se a consulta falhar por instabilidade, a extensão **tenta de novo** (30 s, 2 min e 5 min) — o botão não some pelo resto da sessão.
- Chega pelo **Webphone V2**, com a atualização automática da extensão. Isso vale só pra **o botão passar a existir**: enquanto a extensão não atualiza, o Webphone simplesmente não tem o botão — não é campanha diferente.

## O que muda no dia a dia
- **Pro Marketing:** a campanha passa a alcançar quem mais liga — é onde ela tende a converter mais. E o UTM diz se o clique veio do Webphone ou do Portal.
- **Pro Marketing (atenção):** o título é **um só para os dois canais** — escreva pensando nos dois. Trocar a campanha não depende de deploy nem de atualização da extensão; no Webphone, o operador vê o novo texto ao reabrir a sessão.
- **Pro Suporte:** cliente perguntando do botão novo no Webphone — é a campanha vigente, a mesma do Portal. Se não aparecer: extensão ainda não atualizou, não há campanha vigente, ou o link foi cadastrado sem HTTPS.
- **Pro CS:** gancho pronto pra falar da campanha com contas de operação grande, onde o Webphone fica aberto o dia todo.
- **Pro cliente:** o botão aparece sozinho quando a extensão atualizar. Sem comunicado.
