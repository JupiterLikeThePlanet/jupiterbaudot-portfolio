# PROJECT_PLAN.md — jupiterbaudot.dev

## Current phase: WEEKEND MVP

---

## Weekend MVP — ship by Sunday

Goal: live at jupiterbaudot.dev. A recruiter can click it, it loads fast, it looks intentional.

### Checklist
- [ ] Vite + React + TypeScript scaffold
- [ ] Tailwind + tokens.css with full palette
- [ ] MacDesktop component — wallpaper, menu bar, taskbar
- [ ] WinDesktop component — teal bg, Win95 taskbar
- [ ] Desktop.tsx — switches between Mac/Win by breakpoint
- [ ] DesktopIcon component (mac + win variants)
- [ ] ModalWindow base component (mac + win variants)
- [ ] useClock hook
- [ ] useModal hook (one modal at a time, Escape to close)
- [ ] AboutModal — real content
- [ ] SkillsModal — real content
- [ ] ResumeModal — real content (download link placeholder until PDF exists)
- [ ] ContactModal — real content with working email link
- [ ] ProjectsModal — DCG Dental live, Pi Dashboard WIP badge
- [ ] Accessibility: role=dialog, aria-modal, focus trap, aria-label on icons
- [ ] prefers-reduced-motion on all animations
- [ ] OKLCH color fallbacks for Safari < 15.4
- [ ] backdrop-filter solid fallback for Android Chrome
- [ ] Deploy to Vercel
- [ ] Custom domain: jupiterbaudot.dev → Vercel

### Explicitly out of scope for MVP
- Custom SVG icons (emoji placeholders)
- Draggable/resizable windows
- Case study pages
- Blog / writing
- OG image
- Favicon (use default temporarily)
- Any V2/V3 features

### Definition of done
Deployed. Loads under 2s on a 4G connection. No console errors.
Modals open/close correctly. Escape key works. Mobile Win95 grid renders correctly.

---

## V2 — ~2 weeks post-MVP

### Design
- [ ] Custom SVG desktop icons replacing emoji
- [ ] Real wallpaper — illustrated or textured, not CSS gradients
- [ ] Refined scanline texture
- [ ] Favicon — pixel art style, matches aesthetic
- [ ] OG image for LinkedIn/social sharing

### Content
- [ ] DCG Dental case study page — problem, solution, stack, outcomes, screenshots
- [ ] Fox Corporation case study — NDA-safe framing
- [ ] Resume PDF uploaded to /public, download button wired up
- [ ] Contact modal: working mailto link

### Technical
- [ ] useModal supports multiple open modals with z-index stacking
- [ ] Keyboard navigation complete
- [ ] React Router for case study sub-pages
- [ ] Vercel OG image generation

### Mobile
- [ ] Win95 easter eggs polished (My Computer, Recycle Bin interactions)
- [ ] Touch gesture: swipe down to close modal

---

## V3 — post-employment or with time

### Full Mac OS window manager
- [ ] Draggable windows (custom hook or react-draggable)
- [ ] Resizable windows
- [ ] Window focus / z-index stacking on click
- [ ] Minimize to taskbar — icon appears in taskbar when minimized
- [ ] Multiple windows open simultaneously
- [ ] Boot sequence loading animation
- [ ] Right-click context menu on desktop
- [ ] Finder-style case study browser
- [ ] Easter eggs

---

## ADR log

| # | Decision | Status |
|---|----------|--------|
| ADR-001 | Vite over Next.js | Accepted |
| ADR-002 | Mac OS desktop for ≥1024px | Accepted |
| ADR-003 | Windows 95 for <768px mobile | Accepted |
| ADR-004 | System fonts only in MVP | Accepted |
| ADR-005 | One modal open at a time in MVP | Accepted |
