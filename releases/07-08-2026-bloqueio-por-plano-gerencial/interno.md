## Em uma frase
O bloqueio por plano passa a valer também para o usuário Gerencial.

## Antes → Depois
| Antes | Depois |
|-------|--------|
| Com o bloqueio por plano ligado, o **Gerencial continuava discando** | O Gerencial é bloqueado junto com os demais |
| Desligar o bloqueio podia deixar **trava presa** no usuário | Todas as travas saem **na hora** |
| Quem estourou a cota de voz ficava travado até a virada do ciclo | Desligar o bloqueio libera **também** o bloqueio por cota estourada |
| Falha ao aplicar a trava passava batido | A conta mantém a pendência e é **reprocessada no dia seguinte** |

## Por que importa
O Gerencial é o plano do gestor: entra sem custo e **não tem minutos de voz** — por regra, não deveria ligar. O bloqueio por plano existe justamente pra garantir isso. Só que ele não estava alcançando o Gerencial.

**Exemplo.** Conta com 10 usuários, sendo **3 no Gerencial**. O cliente liga o "bloqueio por plano" esperando que os gestores parem de discar:
- **Antes:** os 7 pagantes eram travados certinho. Os **3 Gerenciais seguiam ligando** normalmente — minuto saindo de quem não tem plano que cubra.
- **Agora:** os 3 entram no bloqueio junto com o resto.

E na volta o problema era o oposto: o cliente **desligava** o bloqueio por plano pra liberar geral, e um usuário continuava travado — a trava antiga ficava presa. Ele abria chamado dizendo "desliguei e não liberou". Isso também acabou.

## Detalhes importantes
- A falha existe **desde 01/07**, quando o bloqueio por plano foi ao ar. Não é regressão nova.
- O bloqueio dos Gerenciais **passa a valer a partir do próximo ciclo**, não no instante do deploy.
- Desligar o bloqueio por plano agora libera **na hora** o bloqueio por estouro de cota de voz — antes o usuário ficava preso até a virada do ciclo.
- Se a aplicação da trava falhar, nada fica pela metade: a conta guarda a pendência e volta a ser processada no dia seguinte, sem travar o lote das outras.
- **Nenhuma remediação de cobrança.** As ligações que saíram indevidamente não são reprocessadas nem estornadas.

## O que muda no dia a dia
- **Pro Suporte:** chamado *"desliguei o bloqueio e o usuário continua travado"* deve sumir. Se voltar, é caso novo.
- **Pro CS (avise antes):** contas com bloqueio por plano ligado vão ver os Gerenciais pararem de discar no próximo ciclo. Pro cliente isso é **perda de capacidade**, mesmo sendo o comportamento correto — vale alinhar antes de virar reclamação.
- **Pro Comercial:** o bloqueio por plano passa a valer em todos os planos, sem exceção. Não prometa Gerencial discando.
- **Pro cliente:** nenhum comunicado automático. Ele descobre quando um usuário Gerencial não completar a ligação.
