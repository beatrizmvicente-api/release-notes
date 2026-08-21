## Em uma frase
O resumo da IA sai de dentro do CRM e chega à tela de Relatórios.

## Por que importa
O resumo é o entregável da IA — é por ele que o gestor não precisa ouvir a ligação inteira. Só que, até ontem, o único lugar onde ele existia era dentro do CRM, colado no negócio.

- **Quem não integrou CRM pagava pela IA e não tinha onde ler.** O resumo era gerado, cobrado, e ficava invisível para o cliente.
- **Quem integrou lia uma ligação por vez.** Para comparar cinco atendimentos do dia, eram cinco negócios abertos, um a um.
- **E a taxa de atendimento não estava em tela nenhuma.** Para saber quem atende e quem deixa tocar, o cliente exportava o histórico bruto e montava a conta no Excel.

Resultado: o que o cliente paga na IA passa a ser visível onde ele já olha as ligações.

## As mudanças
1. **Resumo gerencial** e **Análise qualitativa** viram colunas do relatório de Chamadas. Cada linha tem um botão **Ver**; o texto abre ali mesmo, sem sair da tabela.
   - Abrir um dos dois já traz o outro — é uma consulta só.
   - Dá para **filtrar primeiro e ler depois**: só as não atendidas, só as de um usuário, só as acima de 3 minutos.
2. **Novo relatório de Usuários**, no seletor ao lado de Chamadas — uma linha por pessoa, com total de chamadas, atendidas, taxa de atendimento, contatos únicos, rediscagem, tempo total e tempo médio.
   - **Contatos únicos** conta números diferentes: ligar 3x para o mesmo cliente conta 1.
   - Tem filtro de **Status** (Ativo, Pendente, Inativo) próprio.
3. **Filtro aplica ao clicar** — saíram os botões "Aplicar" e "Limpar", e os "Filtros Avançados" deixaram de ficar escondidos atrás de um botão. Cada filtro ativo vira uma etiqueta com ✕.
4. **Engrenagem de colunas** em cada relatório: o cliente escolhe o que aparece, e o CSV sai com exatamente essas colunas.
5. **"Causa do desligamento" virou "Motivo do desligamento"**, e o menu lateral virou **"Relatórios"** (era "Relatório de Chamadas").

## Detalhes importantes
- **As colunas de IA só existem para conta com IA ativa.** Sem o recurso, não aparecem nem na engrenagem — não há botão morto na tela.
- **O botão "Ver" aparece em toda linha, mas nem toda ligação tem resumo.** Chamada não atendida, ou anterior à contratação da IA, abre com *"Esta chamada não tem resumo gerado pela IA."* Não é erro.
- **O CSV de Chamadas não leva as colunas de IA.** O texto é buscado ao clicar, linha a linha; no arquivo, quase toda linha sairia vazia.
- **O filtro de período tem teto de 30 dias na tela**, e a exportação recusa acima de um mês corrido. Quem puxava três meses de uma vez vai esbarrar nisso.
- **Busca interrompida no meio não exporta.** Antes, um erro no meio do carregamento gerava arquivo truncado sem aviso.
- **A conta continua sendo feita no backend.** A tela só mostra.

## O que muda no dia a dia
- **Pro Comercial:** é o argumento da IA virando demonstração. Abre a tela, filtra as ligações de ontem, clica em Ver — o cliente lê o resumo sem CRM nenhum no meio.
- **Pro CS:** no onboarding de quem contratou IA, mostre essa tela antes de falar de integração. O valor aparece no primeiro acesso, não depois de conectar o CRM.
- **Pro Suporte:** *"cliquei em Ver e não veio resumo"* — confira se a chamada foi atendida e se é posterior à contratação da IA. *"meu relatório não aceita o período"* — é o teto de 30 dias.
- **Pro cliente:** nenhum comunicado. Ele encontra a tela nova no próximo acesso a Relatórios.
