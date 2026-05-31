# ADR-002 — Dual OS Responsive Strategy

**Date:** 2026-05-30
**Status:** Accepted

## Decision

Use two distinct retro OS aesthetics split by breakpoint:
- Desktop (≥1024px): Mac OS Chrome — lavender palette, frosted glass, traffic lights
- Mobile (<768px): Windows 95 — teal desktop, bevel borders, navy titlebar

## Context

The Mac OS desktop metaphor does not translate to mobile. On a 375px screen, icons overflow, the spatial metaphor collapses, and the hero content has nowhere to live without being trapped inside a window chrome.

Windows 95 was evaluated as an alternative for the full site but rejected for desktop — the Win95 hero content must live inside a window dialog, which traps the name and tagline inside a gray box. The Mac version lets the hero breathe directly on the desktop.

## Decision

Use each OS aesthetic where it naturally fits:
- Mac desktop metaphor = natural at large screen sizes
- Win95 icon grid = natural phone layout, mirrors the reference screenshot provided

## Consequences

- Two sets of components (MacDesktop, WinDesktop) — manageable, they share the same modal content components
- Two color palettes in tokens.css — clearly namespaced (--color-* vs --win-*)
- The contrast between aesthetics is itself a portfolio statement — demonstrates range
- Tablet (768–1023px) uses Mac OS layout scaled down

## Reviewed by

Jupiter Baudot (lead), Claude Code (team)
