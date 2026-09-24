## Em uma frase
Pagar a fatura deixa de apagar a integração de IA personalizada (webhook) do cliente.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| O webhook de IA próprio deixava de funcionar **a cada fatura paga** | Conta com webhook de IA personalizada não é mais sobrescrita |
| O mesmo acontecia em troca de plano e em troca manual de modelo de IA | Nenhum desses caminhos mexe na configuração personalizada |
| O Suporte trocava o modelo de IA e **a tela dizia que deu certo** sem ter aplicado nada | A tentativa responde um aviso explícito: esta conta não pode ser alterada por aqui |

## Por que importa
O cliente montava a integração dele e a gente desfazia — todo mês, na hora em que ele pagava.

- **Era silencioso dos dois lados.** Nada avisava: nem ele, nem a gente. Ele reconfigurava, pagava, e perdia de novo.
- **Ficou 4 meses no ar**, desde 08/05.
- **E o Suporte não tinha como saber.** A troca de modelo respondia sucesso sem aplicar, então o atendimento era encerrado achando que resolveu.

Resultado: quem personalizou a IA não perde mais o que configurou.

## Detalhes importantes
- **As contas existentes já estão protegidas.** Um script rodou em produção e marcou **65 contas** com personalização real — essas não são mais sobrescritas.
- **Conta que configurar webhook próprio de agora em diante já nasce protegida.**
- **Não há levantamento de quantas vezes** cada conta teve a configuração revertida nesses 4 meses. Se algum cliente reclamou disso no passado, o chamado dele conta mais que o nosso registro.
- **Falta confirmar a tela do Suporte Admin.** A recusa passou a voltar com mensagem própria, mas não foi validado se o Suporte Admin já exibe essa mensagem ou ainda mostra erro genérico.

## Como validar
Numa conta com IA personalizada, tentar trocar o modelo de IA pelo Suporte Admin: deve aparecer o aviso de conta personalizada, e o webhook e os prompts devem seguir intactos.

## O que muda no dia a dia
- **Pro Suporte:** pare de trocar o modelo de IA de conta com integração personalizada — a troca é recusada de propósito e o caso vai para o time de desenvolvimento. Se a tela mostrar erro genérico em vez do aviso, sinalize: essa parte ainda não foi conferida.
- **Pro CS:** cliente que já reclamou de *"minha integração de IA voltou ao padrão"* pode ser avisado de que a causa foi corrigida e a conta dele está protegida.
- **Pro cliente:** nenhum comunicado. As 65 contas afetadas já foram protegidas, sem ação da parte delas.
