# ADR-001 — Vite over Next.js

**Date:** 2026-05-30
**Status:** Accepted

## Decision

Use Vite + React + TypeScript instead of Next.js.

## Context

This portfolio is a fully static, client-side application. Content does not change at runtime. There are no API routes, no server-side data fetching, no ISR, no dynamic routes driven by a database.

## Reasoning

Next.js is optimized for applications that need SSR, ISR, or API routes. None of those apply here. Using Next.js would add:
- Cold start complexity
- Unnecessary routing overhead
- Framework-specific conventions that add no value for a static site

SEO is not a meaningful concern — recruiters navigate to the site via a direct link, not search.

Vite provides:
- Instant dev server HMR
- Fast production builds
- Zero framework overhead
- Trivial Vercel deployment
- Familiar setup that matches Jupiter's daily tooling

## Consequences

- No SSR — acceptable, this site has no dynamic data
- No file-based routing — acceptable, single page app in MVP; React Router added in V2 if case study sub-pages are needed
- Must configure Vercel to serve `index.html` for all routes if routing is added later

## Reviewed by

Jupiter Baudot (lead), Claude Code (team)
