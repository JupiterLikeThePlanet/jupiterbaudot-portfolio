# jupiterbaudot.dev

Personal portfolio for Jupiter Baudot — senior frontend engineer and product engineer, Los Angeles.

## Concept

A dual retro OS portfolio:
- **Desktop (≥1024px):** Mac OS chrome — lavender palette, frosted glass, traffic light modals
- **Mobile (<768px):** Windows 95 — teal desktop, bevel borders, icon grid

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- CSS custom properties for design tokens
- Deployed on Vercel

## Local dev

```bash
npm install
npm run dev
```

## Docs — read before coding

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI session instructions — read every time |
| `docs/PROJECT_PLAN.md` | MVP → V2 → V3 roadmap with checklists |
| `docs/VISUAL_DIRECTION.md` | Full design system — palette, type, motion, components |
| `docs/COPY.md` | All user-facing copy — never write copy inline |
| `docs/ADR/` | Architecture decision records |

## Design quality

```bash
npm install -g impeccable
impeccable install   # select Claude Code when prompted
```

Then in Claude Code:
```
/impeccable audit     # find issues
/impeccable critique  # full design review
/impeccable polish    # final cleanup
```

## Phases

| Phase | Scope | Timeline |
|-------|-------|----------|
| MVP | Desktop + mobile shell, 5 modals, deployed | This weekend |
| V2 | Custom icons, case studies, OG image | ~2 weeks |
| V3 | Full window manager, draggable windows | Post-employment |
