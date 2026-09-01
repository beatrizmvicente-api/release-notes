## Em uma frase
Portal e webphone prepararam o terreno para o recurso de ditado por voz do IA4COM.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| O painel do IA4COM roda embutido num quadro **sem permissão de microfone**: qualquer botão de gravação nasceria bloqueado pelo navegador | Portal e extensão **declaram a permissão** para esse quadro |
| No webphone, o quadro não herdava o microfone que a própria extensão já usa na ligação | O quadro **herda** a permissão que a extensão já tem |
| Nada de ditado aparecia para o vendedor | **Continua não aparecendo**: o recurso ainda não foi implementado no IA4COM |

## Por que importa
É metade do caminho entregue, e a metade que o cliente vê ainda não subiu, mas a fundação já está pronta.

- **A permissão sozinha não faz nada.** Sem ela, o botão de ditado nasceria bloqueado pelo navegador; com ela, ele só funciona quando existir.
- **O TEL-2277 ainda não foi 100% entregue.** Quem olhar o card e visualizar o portal e extensão entregues pode achar que o ditado está no ar. Não está.

Conclusão: o terreno está pronto, o recurso não, **e ninguém deve prometê-lo**.

## Detalhes importantes
- **Nenhum botão novo aparece para o cliente**, nem no portal nem na extensão.
- **Não há caixa de permissão nova.** O portal só destrava a porta; a extensão repassa o microfone que já usa na ligação.
- **Falta a frente do próprio IA4COM**, a implementação do ditado em si. Não há commit no repositório do app, e não há data.
- **Risco a registrar para quando o recurso existir:** o microfone da ligação e o do ditado são independentes. Ditar **durante uma chamada em andamento** faz o cliente do outro lado ouvir o que está sendo ditado — a extensão não silencia a chamada.

## Como validar
Confirmar que o painel do IA4COM continua abrindo normalmente no portal e na extensão, sem regressão visual ou de carregamento. Não há botão de microfone para testar: ele depende da parte pendente no IA4COM.

## O que muda no dia a dia
- **Pro Suporte:** nada muda na tela. Se perguntarem por *"ditado por voz no IA4COM"*, a resposta é que o recurso **ainda não está disponível**.
- **Pro CS:** não anunciar ditado por voz em nenhuma conta: a parte que o cliente usa não subiu.
- **Pro Comercial:** fora do pitch e fora de proposta. Não há data para a frente do IA4COM.
- **Pro Produto:** o TEL-2277 segue aberto no IA4COM. O comportamento de ditar com chamada em curso precisa de decisão antes de liberar.
- **Pro cliente:** nenhum comunicado. Nada muda na tela.
