## Em uma frase
Agora o Suporte Admin contrata assinatura para uma conta que **já existe** — rodando o mesmo fluxo do Portal do Cliente, ponta a ponta.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Adicionar assinatura numa conta existente dependia do cliente contratar pelo Portal ou de alguém lançar manual no Asaas | O Suporte Admin monta a assinatura pela própria ferramenta, com resultado **igual ao do Portal** |
| O que era lançado direto no Asaas **não ficava registrado no billing** — e isso travava adicionar usuário ou trocar plano depois | A contratação assistida cai no billing e reflete no Asaas — a conta fica consistente dos dois lados |

## Por que importa
O problema não era contratar — era o **rastro que ficava faltando**. Contratação feita direto no Asaas não tinha estado de cobrança no nosso sistema, e isso cobrava a fatura depois: na hora de **adicionar um usuário** ou **editar o plano** de alguém, dava inconsistência porque o registro da assinatura não existia.

- **O time ficava sem caminho oficial.** Pra montar assinatura em conta existente, ou dependia do cliente ir no Portal, ou lançava na mão no Asaas — fora do billing.
- **A conta nascia torta.** O que entrava só pelo Asaas ficava sem o registro que o resto do produto (usuários, plano, cotas) precisa pra funcionar.

Agora a contratação de conta existente é **assistida pelo time e idêntica à do cliente** — mesma cobrança, mesma criação de assinatura, mesmas cotas, mesma ativação no pagamento.

## As mudanças
Tudo saiu como **uma entrega só** (TEL-2050). Os itens abaixo são as regras dessa contratação:

1. **Nova ação "Adicionar assinatura"** no Suporte Admin (conta modelo Recarga) — lista os usuários ativos, deixa **escolher um plano por usuário** e **editar o valor** de cada plano.
2. **Mesmo fluxo do Portal, reaproveitado inteiro** — geração da cobrança, cálculo dos valores, criação da assinatura, preparo de cotas/status e a **virada pro modelo de plano quando o pagamento é reconhecido**. O Asaas é atualizado com o que foi gerado aqui.
3. **Data da 1ª cobrança (opcional)** — dá pra definir o vencimento da primeira cobrança na contratação, e ele é respeitado **à risca**: a fatura sai na data informada, sem gerar cobrança pro dia da criação quando o vencimento aponta pro futuro _(TEL-2078)_.
4. **IA padrão certa desde o nascimento** — a assinatura já vincula o modelo **"Resumo gerencial + SPIN"**.
5. **Descrição salva no nosso lado** — a descrição da contratação (nome + "Itens da assinatura") fica **salva e visível no próprio Suporte Admin**, espelhando exatamente o que vai pro Asaas _(TEL-2072)_.
6. **Trava do Gerencial ("não realiza ligações") aplicada no pagamento** — igual ao fluxo do cliente, não na criação da assinatura ainda pendente.

## O que muda no dia a dia
- **Pro Suporte:** nova ação **"Adicionar assinatura"** na conta (modelo Recarga).
- **Pro CS:** dá pra **regularizar no billing** contas que hoje têm assinatura só no Asaas — some a dor de "adicionei usuário / troquei plano e deu inconsistência" nesses casos.
- **Pro Comercial:** monta ou ajusta a assinatura de uma conta existente **na hora**, sem depender do cliente nem de lançamento manual — menos atrito pra expandir usuários e planos.
- **Pro cliente:** nenhum comunicado. A contratação assistida sai **idêntica** à que ele faria sozinho no Portal.
