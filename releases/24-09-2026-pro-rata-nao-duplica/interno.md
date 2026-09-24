## Em uma frase
Adicionar usuário deixa de gerar duas cobranças proporcionais pela mesma vaga.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Uma única adição de usuário podia gerar **duas cobranças proporcionais** no gateway | Uma adição, uma cobrança — mesmo com a tela travada ou clique repetido |
| Trocar de plano duas vezes sem pagar a primeira **travava com erro técnico em inglês** | A cobrança anterior é cancelada sozinha e fica só a nova |
| A trava existia no código; dois pedidos ao mesmo tempo passavam pelos dois lados | A trava vive no banco — duas proporcionais em aberto para o mesmo convite não existem |

## Por que importa
Cobrança em dobro é o erro que o cliente encontra no extrato, não no atendimento.

- **Aconteceu de verdade.** Domínio `nummuscashback.api4com.com`, 27/07: um usuário adicionado, duas proporcionais cobradas.
- **Ninguém via do nosso lado.** O erro aparecia na fatura, já do lado do cliente.
- **A causa era espera sem fim.** A chamada ao gateway não tinha prazo: quem chamou desistia, tentava de novo, e o primeiro pedido seguia vivo cobrando.

Resultado: uma vaga, uma cobrança.

## As mudanças
1. **Convite pago cobra uma vez.** A trava no banco impede duas proporcionais em aberto para o mesmo convidado.
2. **Segundo upgrade cancela o primeiro.** Em vez de recusar a troca, o sistema cancela a cobrança anterior e gera a nova.
3. **Cobrança órfã é absorvida.** Cobrança criada no gateway e perdida por timeout é reconhecida, não duplicada.

## Detalhes importantes
- **Não é retroativo.** O problema está no ar desde 23/06. Há 1 caso confirmado; não existe levantamento dos demais nem estorno automático — levantar e estornar é do financeiro.
- **Falta uma mensagem na tela.** Quando já existe cobrança em aberto, o Portal não avisa nada. A cobrança anterior **é** cancelada e a nova sai correta — só o aviso não aparece. Ajuste já mapeado.

## Como validar
Adicionar 1 usuário e conferir que sai uma cobrança proporcional só; trocar de plano duas vezes sem pagar a primeira e conferir que a segunda passa, sem erro em inglês na tela.

## O que muda no dia a dia
- **Pro Suporte:** *"fui cobrado duas vezes pelo mesmo usuário"* deixa de acontecer. No segundo upgrade a tela não avisa que a cobrança anterior foi cancelada — ela foi. É esperado por ora, não abra ticket.
- **Pro CS:** cliente que reclamar de proporcional em dobro de antes de hoje é caso a caso com o financeiro — não existe correção automática.
- **Pro cliente:** nenhum comunicado. Ele percebe na próxima inclusão de usuário.
