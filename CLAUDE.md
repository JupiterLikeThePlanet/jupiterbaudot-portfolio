# CLAUDE.md — jupiterbaudot.dev portfolio

Read this file at the start of every session. No exceptions.

---

## Project identity

Personal portfolio for Jupiter Baudot — senior frontend engineer and design engineer, Los Angeles.
Live at: `jupiterbaudot.dev` (also: `jupiterbaudot.com` redirects here)
Repo: `github.com/JupiterLikeThePlanet/jupiterbaudot-portfolio`

Goal: generate interviews at design-forward companies (Disney, Vercel, Linear, JPMorgan CIB, startups).
Signal: "rare combination of strong design taste and senior-level engineering skill."

---

## Stack

- Vite + React + TypeScript (NOT Next.js — see ADR-001)
- Tailwind CSS — utility classes only, no arbitrary values without a comment
- CSS custom properties for all color tokens (tokens.css)
- No Redux — local state + props; Zustand only if global state becomes genuinely necessary
- Deployed to Vercel via GitHub push

Design quality tool — install before first session:
```bash
npm install -g impeccable
impeccable install
# Select: Claude Code
```
Run `/impeccable audit` before any PR. Run `/impeccable critique` before any new section ships.

---

## Responsive strategy — CRITICAL

Two completely different OS aesthetics by breakpoint:

### Desktop (≥ 1024px) — Mac OS Chrome
- Full desktop metaphor
- Lavender/purple palette
- Frosted glass menu bar + taskbar
- Mac traffic light dots (red closes modal, yellow/green decorative)
- Icons right-aligned, hero text left
- Modal windows with dark purple chrome bar

### Mobile (< 768px) — Windows 95
- Teal `#008080` desktop background
- 4-column icon grid
- Win95 bevel borders on all elements
- Navy `#000080` titlebar on modal windows
- Gray `#c0c0c0` taskbar at bottom with Start button
- Arial system font for Win95 authenticity
- Easter egg icons: "My Computer", "Recycle Bin"
- Windows open centered on screen (not bottom sheet)

### Tablet (768px–1023px)
- Mac OS desktop layout, scaled down
- Icons may reflow to 2 rows if needed

---

## Design system — Desktop (Mac OS)

### Palette — OKLCH only, never raw hex in component files
```css
--color-bg:           oklch(95% 0.012 290);   /* lavender off-white */
--color-bg-deep:      oklch(14% 0.025 290);   /* deep purple-black — window chrome */
--color-surface:      oklch(97% 0.010 290);   /* modal body */
--color-surface-mid:  oklch(91% 0.022 290);   /* cards, pills */
--color-accent:       oklch(52% 0.28 295);    /* electric violet — single punch color */
--color-accent-soft:  oklch(85% 0.06 290);    /* borders, hover */
--color-text:         oklch(12% 0.020 290);   /* near-black, purple-tinted */
--color-text-muted:   oklch(42% 0.045 290);   /* body copy */
--color-text-faint:   oklch(62% 0.030 290);   /* nav, secondary labels */
--color-text-on-deep: oklch(75% 0.040 290);   /* text on dark chrome */
--color-mint:         oklch(88% 0.12 165);    /* available badge */
--color-warning:      oklch(80% 0.15 85);     /* WIP badge */
```

### Palette — Mobile (Win95)
```css
--win-desktop:   #008080;   /* teal desktop */
--win-chrome:    #c0c0c0;   /* gray UI chrome */
--win-titlebar:  #000080;   /* navy window title */
--win-text:      #000000;
--win-border-hi: #ffffff;   /* bevel highlight */
--win-border-sh: #404040;   /* bevel shadow */
```

### Typography — Desktop
- Sans: `system-ui, -apple-system, sans-serif` — no Inter, no Geist
- Mono: `ui-monospace, 'SF Mono', monospace` — status badges, file labels
- Weights: 400 and 500 ONLY. Never 600 or 700.
- Heading: 52px / -0.03em tracking
- Sub-heading: 22px / -0.01em
- Modal heading: 16px / -0.01em
- Body: 14px / 0 tracking
- Monospace badges: 9–10px / 0.08em tracking

### Typography — Mobile (Win95)
- Font: `Arial, sans-serif` — Win95 authenticity
- Bold for window titles and hero name
- No letter-spacing adjustments

### Wallpaper treatment — Desktop
Radial gradients only. NO floating blob shapes (explicitly rejected).
```css
background:
  radial-gradient(ellipse 60% 50% at 80% 20%, oklch(75% 0.06 290) 0%, transparent 60%),
  radial-gradient(ellipse 40% 40% at 15% 80%, oklch(80% 0.08 320) 0%, transparent 55%),
  var(--color-bg);
```
Scanline overlay via `::before` — opacity 0.013, barely visible.

---

## File structure

```
src/
  components/
    desktop/
      Desktop.tsx          ← root component, switches Mac/Win by breakpoint
      MacDesktop.tsx        ← ≥1024px Mac OS layout
      WinDesktop.tsx        ← <768px Windows 95 layout
      MenuBar.tsx           ← Mac frosted glass top bar
      Taskbar.tsx           ← Mac frosted glass bottom bar
      WinTaskbar.tsx        ← Win95 gray taskbar
      DesktopIcon.tsx       ← shared icon component (variant prop: mac | win)
    modals/
      ModalWindow.tsx       ← base modal (variant prop: mac | win)
      AboutModal.tsx
      SkillsModal.tsx
      ResumeModal.tsx
      ContactModal.tsx
      ProjectsModal.tsx
  hooks/
    useClock.ts             ← live clock, returns formatted time string
    useModal.ts             ← open/close state, one modal at a time in MVP
  types/
    index.ts                ← ModalId type, DesktopVariant type
  styles/
    tokens.css              ← all CSS custom properties
    global.css              ← reset, base styles
  assets/
    icons/                  ← custom SVGs go here (V2)
  App.tsx
  main.tsx
```

---

## Component rules

### DesktopIcon
- 44×44px icon area, 72px total touch target
- Emoji placeholder until custom SVG icons ship (V2)
- Mac variant: rounded gradient square + label, hover = accent tint
- Win variant: bevel border square + white text label with text-shadow

### ModalWindow — Mac variant
- Traffic lights: red closes, yellow + green decorative (add tooltip "not yet" on hover)
- Chrome: `var(--color-bg-deep)` background, monospace title centered
- Body: `var(--color-surface)` background, 20px padding
- Animation: scale(0.94) translateY(8px) → scale(1) translateY(0), 180ms ease
- Close: red dot click OR overlay click OR Escape key

### ModalWindow — Win95 variant
- Titlebar: `#000080` with ✕ _ □ buttons (bevel bordered)
- Body: `#c0c0c0` background
- Win95 bevel: `border-top/left: 2px solid #fff; border-right/bottom: 2px solid #404040`
- Close: ✕ button click OR overlay click OR Escape key

### useModal hook
- One modal open at a time in MVP
- Returns: `{ activeModal, openModal, closeModal }`
- Escape key listener attached globally when any modal is open

---

## Accessibility requirements

- All modals: `role="dialog"` `aria-modal="true"` `aria-labelledby`
- Focus trap inside open modal — Tab cycles within modal only
- Focus returns to triggering icon on modal close
- All icons: `aria-label` (emoji provides no accessible name)
- All animations: respect `prefers-reduced-motion`
- Minimum tap target: 44×44px everywhere

---

## Anti-patterns — never

- No floating blob shapes (rejected in design review)
- No gradient text in production components
- No neon glow or text-shadow on type
- No `!important`
- No hardcoded hex in component files — tokens only
- No Lorem Ipsum — all copy from `docs/COPY.md`
- No placeholder/coming soon sections — if not ready, don't show it
- No `console.log` in committed code
- No inline styles except dynamic values (icon gradient colors)
- No web fonts in MVP — system fonts only

---

## Browser support

- Chrome, Safari, Firefox latest
- Safari < 15.4: OKLCH needs hex fallback — always provide both
- Android Chrome: `backdrop-filter` may not work — solid color fallback required
- Test on real iPhone Safari before shipping

---

## Session startup checklist

1. Read CLAUDE.md (this file)
2. Read `docs/PROJECT_PLAN.md` — what phase are we in?
3. Read `docs/VISUAL_DIRECTION.md` — check before any design decision
4. Run `git status` — know what's in flight
5. Ask Jupiter before any structural changes not in this file

---

## Hallucination prevention

- Do not invent file names not listed in the file structure above
- Do not add npm packages without asking first
- Do not assume a file exists — verify with `ls` before importing
- All copy comes from `docs/COPY.md` — do not write copy inline
