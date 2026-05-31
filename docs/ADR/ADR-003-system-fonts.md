# ADR-003 — System Fonts Only in MVP

**Date:** 2026-05-30
**Status:** Accepted

## Decision

No web fonts in MVP. Use system font stack only.

## Reasoning

- Zero font load time — instant render
- Native feel matches the OS desktop metaphor
- `system-ui` on Mac renders San Francisco — premium without the download
- `Arial` on Win95 mobile is intentionally authentic to the aesthetic
- Web fonts can be added in V2 if a specific typographic need arises

## Consequences

- Slight rendering differences between Mac/Windows/Linux — acceptable
- No custom display typeface — acceptable for MVP, revisit in V2

## Reviewed by

Jupiter Baudot (lead), Claude Code (team)
