# Release Notes — API4COM

Repositório de comunicação das releases do produto. Cada release lançada vira uma comunicação **objetiva**, que mostra o **antes e depois** e explica o **mínimo necessário** para entender a feature.

## Como funciona

Cada release vive em uma pasta própria dentro de [`releases/`](releases/), nomeada com data e slug da feature:

```
releases/
  2026-07-01-nome-da-feature/
    interno.md    → comunicação para o time (comercial, suporte, CS)
    externo.md    → comunicação para clientes / usuários finais
```

As duas versões saem da **mesma base de fatos** (o que mudou), mas com tom diferente:

- **Interno** → direto ao ponto: o que muda pra você, o que muda pro cliente, o que falar.
- **Externo** → benefício e uso: o que melhorou e como aproveitar.

## Para criar uma nova comunicação

1. Copie a pasta [`templates/`](templates/) para `releases/AAAA-MM-DD-slug-da-feature/`.
2. Preencha `interno.md` e `externo.md`.
3. Siga o [Guia de tom](guia-de-tom.md) — é o que garante consistência entre releases.

## Índice de releases

<!-- Adicione uma linha por release, mais recente no topo -->
| Data | Feature | Interno | Externo |
|------|---------|---------|---------|
| _(ainda vazio)_ | | | |
