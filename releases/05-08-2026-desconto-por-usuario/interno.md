## Em uma frase
O desconto negociado passa a ser digitado por usuário, não no total da assinatura.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| O desconto ficava no **valor total** da assinatura | Campo de desconto **por usuário**, nas duas telas do Suporte Admin |
| Desativar um usuário tirava o **preço de tabela** — fatura errada | Sai **o valor real daquele usuário** |
| Normalizar **somava** os planos ao valor já cobrado | O valor final é o **somatório da tela** |
| Normalizar conta migrada travava com erro de gateway | Conclui — e o que barrar vem com o motivo explicado |

## Por que importa
O desconto era registrado num lugar e cobrado de outro: aplicado no total da assinatura, mas subtraído pelo **preço de tabela** na hora de mexer nos usuários. Toda alteração de time abria uma diferença entre o combinado e o cobrado.

**Exemplo.** Cliente com **3 usuários Ilimitado negociados por R$ 300** (R$ 100 cada; tabela é R$ 200) desativa um usuário:
- **Antes:** saía o preço de tabela, R$ 200. A assinatura caía pra **R$ 100** — dois usuários pelo preço de um.
- **Agora:** sai o valor real do usuário, R$ 100. A assinatura fica em **R$ 200**, o combinado.

Do outro lado, a normalização somava os planos escolhidos ao valor já cobrado: o mesmo cliente de R$ 300 normalizado para uma composição de R$ 400 terminava em **R$ 700**. Agora vale o valor da tela.

## As mudanças
1. **Campo de desconto em "+ Adicionar assinatura"** — o operador digita **só o desconto**; o valor vem do catálogo do plano.
   - Valor do usuário = preço de tabela − desconto.
   - Desconto em branco aqui **herda o desconto do item** — não zera.
2. **Campo de desconto na modal "Bloqueio por Consumo de Minutos"** — mesmo padrão, por usuário. A tela mostra o **valor negociado atual** de cada um antes de confirmar.
   - Desconto em branco aqui **vira zero**: o usuário é re-precificado pelo catálogo.
   - É a diferença que mais gera erro de operação: **mesmo campo, comportamentos opostos quando fica vazio**.
3. **Desativação e downgrade passam a ler o valor do usuário** — vale pela desativação feita pelo cliente no Portal e pelo downgrade feito no Suporte Admin.
4. **Aviso ao editar o valor total** — continua possível, mas avisa que gera divergência no próximo downgrade. O desconto no total está **descontinuado**.

## Detalhes importantes
- **Nenhuma fatura é recalculada por causa do deploy.** O valor cobrado hoje continua o mesmo.
- A mudança mexe **só no usuário tocado** e preserva o desconto do resto da conta — **615 das 1.048 assinaturas** têm o desconto no total, e recalcular do zero sobrecobraria todas.
- **Trocar o plano de um usuário não transporta o desconto.** Se a negociação continua valendo, precisa ser digitada de novo.
- **Desconto maior que o valor do plano** é recusado antes de gravar, e a mensagem diz **de qual usuário**.
- **Total abaixo de R$ 5** é bloqueado com mensagem clara — é o mínimo do Asaas. O caminho é cancelar a assinatura.
- A correção vale **daqui pra frente**: fatura já emitida com valor errado não é reemitida nem estornada.

## O que muda no dia a dia
- **Pro CS:** digite o desconto **no usuário**, nas duas telas. Pare de usar o valor total da assinatura.
- **Pro CS (chamado):** *"minha fatura veio diferente do combinado"* — se a conta passou por normalização ou desativação entre **01/07 e 04/08**, confira o valor no Asaas antes de tratar como negociação nova.
- **Pro CS (chamado):** *"perdi meu desconto"* — provável normalização confirmada com o campo vazio. A correção é reaplicar o desconto no usuário.
- **Pro Comercial:** dá pra fechar **preço diferente por usuário na mesma conta**, e a matemática se mantém quando o time cresce ou encolhe.
- **Pro Financeiro:** faturas erradas do período **não são reemitidas automaticamente** — auditoria, se houver, é manual.
- **Pro cliente:** nenhum comunicado. Ele não vê nem edita valores, e a cobrança não muda no dia do deploy.
