# VISUAL_DIRECTION.md — jupiterbaudot.dev

Single source of truth for all design decisions. Read before touching any visual code.

---

## Concept: Dual OS Portfolio

Two retro operating system aesthetics, one portfolio.

**Desktop (≥1024px):** Mac OS — lavender chrome, frosted glass, traffic lights
**Mobile (<768px):** Windows 95 — teal desktop, bevel borders, navy titlebar

Both are Y2K. Both are intentional. The contrast between them demonstrates range — two distinct aesthetics, executed with precision, unified by the same content and color accent.

This is not nostalgia bait. It is a deliberate signal: the person who built this thinks in systems and ships experiences.

---

## Desktop — Mac OS Chrome

### Palette (OKLCH — define in tokens.css, never hardcode in components)
```css
:root {
  --color-bg:           oklch(95% 0.012 290);   /* lavender off-white — wallpaper base */
  --color-bg-deep:      oklch(14% 0.025 290);   /* deep purple-black — window chrome */
  --color-surface:      oklch(97% 0.010 290);   /* modal body */
  --color-surface-mid:  oklch(91% 0.022 290);   /* project cards, skill pills */
  --color-accent:       oklch(52% 0.28 295);    /* electric violet — single punch color */
  --color-accent-soft:  oklch(85% 0.06 290);    /* borders, hover states */
  --color-text:         oklch(12% 0.020 290);   /* near-black, purple-tinted */
  --color-text-muted:   oklch(42% 0.045 290);   /* body copy */
  --color-text-faint:   oklch(62% 0.030 290);   /* nav items */
  --color-text-on-deep: oklch(75% 0.040 290);   /* text on dark chrome */
  --color-mint:         oklch(88% 0.12 165);    /* available badge text */
  --color-warning:      oklch(80% 0.15 85);     /* WIP badge */
}
```

Safari < 15.4 fallbacks (add above each OKLCH line):
```css
--color-bg: #ede8f5;
--color-bg-deep: #1a0535;
--color-accent: #8b2cf5;
/* etc — add all fallbacks in tokens.css */
```

### Wallpaper
Radial gradients only. No blob shapes. No floating circles.
```css
background:
  radial-gradient(ellipse 60% 50% at 80% 20%, oklch(75% 0.06 290) 0%, transparent 60%),
  radial-gradient(ellipse 40% 40% at 15% 80%, oklch(80% 0.08 320) 0%, transparent 55%),
  var(--color-bg);
```

Scanline overlay on ::before, almost invisible:
```css
background-image: repeating-linear-gradient(
  0deg, transparent, transparent 3px,
  rgba(0,0,0,0.013) 3px, rgba(0,0,0,0.013) 4px
);
```

### Typography
- Font: `system-ui, -apple-system, sans-serif`
- Mono: `ui-monospace, 'SF Mono', monospace`
- Weights: 400 and 500 only
- Hero name: 52px, weight 500, tracking -0.03em
- Subtitle: 22px, weight 500, tracking -0.01em
- Modal heading: 16px, weight 500
- Body: 14px, weight 400
- Monospace badges: 9–10px, tracking 0.08em

### Mac OS Y2K signals — use these
| Element | Spec |
|---------|------|
| Window chrome | `var(--color-bg-deep)` bar |
| Traffic lights | Red #ff5f57 · Yellow #ffbd2e · Green #28c840 |
| Modal title | Monospace, centered, `var(--color-text-on-deep)` |
| Menu bar | 28px, frosted glass rgba(240,234,255,0.82), blur(8px) |
| Taskbar | 36px, frosted glass, monospace label |
| Status badge | Monospace, dark bg, mint text, 3px border-radius |
| File labels | Resume.pdf · Skills.txt · About.txt |
| Buttons | 5px border-radius (slightly square — Y2K) |
| Skill pills | Dark bg, lavender text, mono, 3px radius |

### Mac OS — never
- No neon glow / text-shadow
- No gradient text in production
- No floating blob shapes
- No cyan-on-black
- No heavy drop shadows
- No rounded pill buttons (too 2022 SaaS)

### Motion — Mac OS
Modal open: `scale(0.94) translateY(8px) → scale(1) translateY(0)`, opacity 0→1, 180ms ease
Modal close: opacity 1→0, 140ms
Hover: background tint only, no scale or movement

```css
@media (prefers-reduced-motion: reduce) {
  .modal-window, .modal-overlay { transition: none; }
}
```

---

## Mobile — Windows 95

### Palette
```css
--win-desktop:   #008080;   /* teal — Win95 signature */
--win-chrome:    #c0c0c0;   /* gray chrome */
--win-titlebar:  #000080;   /* navy titlebar */
--win-text:      #000000;
--win-border-hi: #ffffff;   /* bevel highlight */
--win-border-sh: #404040;   /* bevel shadow */
```

### Bevel border pattern (apply to all Win95 elements)
```css
border-top: 2px solid var(--win-border-hi);
border-left: 2px solid var(--win-border-hi);
border-right: 2px solid var(--win-border-sh);
border-bottom: 2px solid var(--win-border-sh);
```

### Layout
- Status bar top: gray, Win95-style, "Start" button left, battery/time right
- Desktop area: 4-column icon grid, teal background
- Taskbar bottom: gray, "⊞ Start" button left, clock right
- Icons: 36×36px icon box + label below, white text with text-shadow

### Win95 signals — use these
| Element | Spec |
|---------|------|
| Desktop bg | `#008080` |
| All chrome | `#c0c0c0` with bevel borders |
| Window titlebar | `#000080` navy |
| Font | `Arial, sans-serif` — authenticity |
| Button labels | Bold, black, small |
| Icon labels | White, text-shadow: 1px 1px 0 rgba(0,0,0,0.9) |
| Easter eggs | "My Computer" 🖥️ and "Recycle Bin" 🗑️ icons |

### Win95 modal windows
- Centered on screen (not bottom sheet)
- Full Win95 window chrome: titlebar + ✕ _ □ buttons
- Body: `#c0c0c0` background
- Content font: Arial, 9–11px

---

## Decision log

| Decision | Rationale |
|----------|-----------|
| Mac OS for desktop | Hero content needs to breathe — Win95 traps it in a dialog box |
| Win95 for mobile | Icon grid is a natural phone layout; teal palette is distinctive |
| No floating blobs | Tested in mockup — decorative and cheap |
| Electric violet as single accent | One punch color reads expensive |
| System fonts only | Zero load time, native feel |
| No gradient text in production | Unreliable cross-browser, looks cheap small |
| Projects icon last | WIP — de-emphasized without removing |
| One modal at a time (MVP) | Simpler state, correct UX for a portfolio |
