## Em uma frase
Cada chamada passa a registrar no CDR qual CRM está integrado — dando visibilidade de qual CRM está gerando as ligações, inclusive nas **integrações externas** (feitas por parceiros ou terceiros, não pela gente).

## Antes → Depois
| Antes | Depois |
|-------|--------|
| A chamada não guardava qual CRM estava integrado | O CDR de cada chamada registra o CRM usado |
| Sem forma simples de saber qual CRM movia as ligações de uma conta | Dá pra cruzar chamadas com o CRM — inclusive nas integrações externas |

## Por que importa
Algumas integrações de CRM não são desenvolvidas pela API4COM: são as **integrações externas** (feitas por parceiros ou pelo próprio cliente sobre a nossa API), diferente das **integrações oficiais**, que a gente mesmo desenvolve. Até agora não tínhamos visibilidade de qual CRM estava por trás das ligações nas externas.

Com o CRM gravado no CDR, passamos a enxergar de qual CRM cada chamada sai — base pra medir a adoção das integrações (inclusive de parceiros), investigar falhas de sincronização e alimentar relatórios.

## Detalhes importantes
- Vale pra contas com integração externa (o que a documentação técnica chama de Classe B).
- Melhoria de bastidor: sem mudança de tela, é base pra relatórios e diagnóstico.

## O que muda no dia a dia
- **Pro Suporte:** ao investigar uma falha de integração, o CRM vinculado já aparece no CDR da chamada — sem consultar outra tela.
- **Pro Comercial/Produto:** dados pra saber quais CRMs (nossos e de parceiros) realmente geram ligações.
- **Pro cliente:** nada muda na tela — é melhoria de bastidor.
