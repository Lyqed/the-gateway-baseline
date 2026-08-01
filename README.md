# thegatewaybaseline.com

The Gateway Baseline — nine checks (GB-1..GB-9) a platform team can hold any
LLM gateway to, verified against public documentation. Single static page,
Next.js / React / Tailwind v4 / TypeScript, built with pnpm.

- Binding art direction: [docs/DESIGN.md](docs/DESIGN.md)
- Data of record: `src/lib/gateways.ts` and `src/lib/gateway-snapshots.ts`
  (ported faithfully from the tracker; same words, same statuses)
- Corrections: antonbraverman1@gmail.com

```bash
pnpm install
pnpm dev    # local development
pnpm build  # static production build
```
