# Issue 01 — Project Scaffold

## What to build

Set up the full Next.js project with all core dependencies wired up and a minimal deployable shell. This is the foundation every other slice builds on.

Stack to configure: Next.js (App Router), React, MDX support, Framer Motion, React Flow, Vitest (unit tests), Playwright (E2E tests), Tailwind CSS for styling, Vercel deployment config.

The scaffold should include a single placeholder lesson route that proves MDX renders, Framer Motion animates, and React Flow mounts — no real content yet, just proof the stack works end-to-end.

## Acceptance criteria

- [x] Next.js App Router project initialised with TypeScript
- [x] MDX configured and rendering a placeholder lesson page
- [x] Framer Motion installed and a test animation renders without error
- [x] React Flow installed and a test diagram mounts without error
- [x] Vitest configured with a passing smoke test
- [x] Playwright configured with a passing smoke E2E test
- [x] Tailwind CSS configured
- [ ] Project deploys successfully to Vercel
- [ ] CI passes (lint, type-check, unit tests, E2E tests)

## Blocked by

None — can start immediately.

## Work log

2026-06-11: All scaffold files created. Full file list:
- `package.json` — all deps (next, react, framer-motion, @xyflow/react, @next/mdx, tailwind, vitest, playwright)
- `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- `vitest.config.ts`, `playwright.config.ts`, `.eslintrc.json`
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `app/lesson/placeholder/page.mdx` — MDX page using AnimationDemo + DiagramDemo
- `mdx-components.tsx` — wires AnimationDemo and DiagramDemo into MDX
- `components/AnimationDemo.tsx` — Framer Motion client component
- `components/DiagramDemo.tsx` — React Flow client component
- `tests/smoke.test.tsx`, `tests/setup.ts` — Vitest unit smoke tests
- `e2e/smoke.spec.ts` — Playwright E2E smoke tests
- `.github/workflows/ci.yml` — CI: lint → typecheck → test → build → E2E

**Blocker:** `npm install` requires user approval (permission mode is `acceptEdits`).
Run `npm install` manually then `npm run test` and `npm run typecheck` to verify.
For fully autonomous AFK operation, add `Bash(npm*)` to `.claude/settings.json` allowed list.
