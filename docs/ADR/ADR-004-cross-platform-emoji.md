# ADR-004: Cross-platform emoji fallbacks via platformEmoji utility

**Status:** Accepted  
**Date:** 2026-06-01

## Context

Desktop icons use emoji as placeholders until custom SVG icons ship (V2). The `🪪` (ID card) emoji used for the About Me icon is from Emoji 14.0 (September 2021) and does not render on Windows systems without the Segoe UI Emoji 14 font update. It displays as a missing-glyph box ("tofu") on affected machines.

## Decision

Introduce `src/utils/platformEmoji.ts` — a single-file utility that:

1. Detects Windows via `navigator.platform` / `navigator.userAgent`
2. Maps newer emojis to universally-supported fallbacks when running on Windows
3. Is called at module-init time (outside React, no re-render cost)

Current fallback: `🪪` → `👤` (bust silhouette, Emoji 1.0).

All emoji strings passed to `DesktopIcon` (and any future emoji-bearing component) must go through `platformEmoji()`.

## Alternatives considered

- **Replace globally with universally-supported emojis** — loses the intended visual for Mac/modern browsers.
- **Canvas emoji support detection** — more accurate but complex; only tells you *something* rendered, not the *correct* glyph. Overkill for a single known-bad emoji.
- **SVG icons now** — correct long-term (V2 plan), but blocked on icon asset production.

## Consequences

- New emojis added to icon definitions must be checked against the Emoji version support matrix. If the emoji is from Emoji 13.0 (2020) or later, add a Windows fallback entry to `platformEmoji.ts`.
- When V2 SVG icons ship, `platformEmoji.ts` can be deleted along with all emoji strings in icon definitions.
