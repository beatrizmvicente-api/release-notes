## Em uma frase
A tela de Relatórios agora responde quem atende, e não só quais chamadas houve.

## Por que importa
A taxa de atendimento é o que a API4COM vende — e até ontem ela não estava em lugar nenhum da tela. Para saber quem no time atende e quem deixa tocar, o cliente exportava o histórico bruto e montava a conta no Excel.

- **A pergunta que o cliente faz não era a que a tela respondia.** Ele não quer a lista de ligações; quer saber quem está produzindo. A tela entregava linha por linha e deixava a conclusão por conta dele.
- **E era a última tela no visual antigo.** O dashboard já tinha o novo padrão. Relatórios continuava sendo "Histórico de Chamadas", num card de outra época — e é uma das telas mais abertas do portal.
- **Filtrar era um ritual.** Escolher o período, abrir "Filtros Avançados", preencher, clicar em Aplicar. Toda vez.

Resultado: a taxa de atendimento vira coluna na tela, não exercício de planilha.

## As mudanças
1. **Novo relatório de Usuários**, no seletor ao lado de Chamadas — uma linha por pessoa, com total de chamadas, atendidas, taxa de atendimento, contatos únicos, rediscagem, tempo total e tempo médio em atendimento.
   - **Contatos únicos** conta números diferentes: ligar 3x para o mesmo cliente conta 1.
   - Tem filtro de **Status** (Ativo, Pendente, Inativo) próprio.
2. **Filtro aplica ao clicar** — saíram os botões "Aplicar" e "Limpar", e os "Filtros Avançados" deixaram de ficar escondidos atrás de um botão. Cada filtro ativo vira uma etiqueta com ✕ para remover.
3. **Engrenagem de colunas** em cada relatório: o cliente escolhe o que aparece na tela, e o CSV sai com exatamente essas colunas.
4. **Ordenação por coluna** direto no cabeçalho da tabela, nos dois relatórios.
5. **"Causa do desligamento" virou "Motivo do desligamento"**, "Atendente" virou "Usuário", e o menu lateral virou **"Relatórios"** (era "Relatório de Chamadas").

## Detalhes importantes
- **O filtro de período agora tem teto de 30 dias na tela** — e a exportação recusa acima de um mês corrido. Quem puxava três meses de uma vez vai esbarrar nisso: oriente a quebrar em partes.
- **Busca interrompida no meio não exporta.** Antes, um erro no meio do carregamento deixava meio relatório na tela e gerava um arquivo truncado sem aviso nenhum.
- **Exportar sem nenhuma coluna marcada não baixa mais o catálogo inteiro** — a tela pede para marcar ao menos uma.
- **A conta continua sendo feita no backend.** A tela só mostra.

## O que muda no dia a dia
- **Pro CS:** é a tela para abrir na reunião de acompanhamento. A taxa de atendimento por pessoa é o número da conversa.
- **Pro Comercial:** dá para mostrar em uma tela o que a bina inteligente faz pelo cliente — sem exportar nada.
- **Pro Suporte:** *"meu relatório não aceita o período"* — é o teto de 30 dias. *"a tela mudou de lugar"* — o menu virou "Relatórios", mesma posição.
- **Pro cliente:** nenhum comunicado. Ele encontra a tela nova no próximo acesso a Relatórios.
