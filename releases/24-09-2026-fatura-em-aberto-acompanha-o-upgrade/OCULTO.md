# Não publicar — comportamento ainda ocorre em produção

Status em **24/09/2026**: apesar de TEL-2297 e TEL-2177 estarem como "Done" no Jira e
terem subido no deploy de 16/09, o problema **continua acontecendo em produção**.

Por isso o `meta.json` foi renomeado para `meta.json.oculto`: sem ele, o build e o
servidor local ignoram esta pasta, então a release não aparece no site nem na listagem.
O texto fica guardado aqui, pronto.

## Para publicar depois
1. Confirmar em produção que upgrade e convite realmente atualizam a fatura do próximo
   ciclo já emitida.
2. Renomear `meta.json.oculto` de volta para `meta.json`.
3. Ajustar a data em `meta.json` para o dia da publicação.
4. Revisar a pendência das 9 faturas erradas (11/09–16/09) — o número pode ter mudado,
   já que o comportamento seguiu ativo depois de 16/09.
