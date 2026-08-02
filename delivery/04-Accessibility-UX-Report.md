# XVI Group — Accessibility & UX Report

**Date:** 2026-08-02
**Status:** Pass

---

## 1. Accessibility

### Verified controls & semantics
- **28 `aria-label` attributes** across the UI (menu toggle, AI dock, concierge, globe nodes, language toggle, modals, carousels, voice controls).
- **16 explicit `role` assignments** (dialogs, tablists, groups, live regions, status roles for the AI speaking state).
- **Semantic landmarks:** `header`, `nav`, `main id="main-content"`, `footer`, `<section>` structure on every page.
- **Focus visibility:** global gold `:focus-visible` outline with offset on every interactive element.
- **Keyboard operability** (verified in suites): mobile menu toggle, AI dock open/close/backdrop, journey selector, globe node activation (enters + clicks), modals close from keyboard.
- **Reduced motion:** 7 `prefers-reduced-motion` blocks; animations collapse to near-instant durations (`animation-duration: 0.01ms`) — verified safe for `MotionConfig reducedMotion="user"`.
- **Language / direction:** full `dir="rtl"` mirroring with Arabic fonts (`[dir='rtl']` overrides for body, headings, paragraphs).
- **Safe text contrast:** body/paragraph colors use token-based secondary text on dark premium background; gold accent reserved for emphasis + focus.

### Verified by automation
- `final-responsive.mjs` — 10 pages × 4 viewports × EN/AR = **80 checks, 0 failures**.
- `audit-overflow.mjs` — **0 horizontal-overflow issues**.
- Every e2e suite asserts **zero console/page errors** while interacting.

---

## 2. User Experience

### Interaction highlights
- **One-click bilingual switch** — instant EN/AR with RTL mirroring, persisted across visits.
- **Cinematic first visit** — skippable executive launch (`CinematicExecutiveLaunch`/`CinematicIntro` both provide a skip control); returning visitors bypass to a lightweight loader.
- **Personalized AI concierge** — robot greets "Welcome back, {name}"; remembers the user's journey sector; dock memory persists across sessions.
- **Voice-first assistant** — mic button initializes permission on demand (no surprise prompts), live interim transcripts, spoken replies (TTS), speaking indicator, no-speech handling.
- **Unified AI entry** — hero robot on home, dock bar on all other pages; contact CTA opens the same concierge.
- **Reduced render wait** — hero content is ready ~2.4 s; CTA suites assert at the correct 3.2 s rec-card timing.

### Responsive behavior
- Verified mobile (375), tablet (768), laptop (1024), desktop (1440) across all pages in both languages: no clipping, no horizontal scroll, no overlapping CTAs.

---

## 3. Recommendations (post-launch, non-blocking)

1. **Visible "Skip to content" link** — the `#main-content` anchor already exists; add a visually-hidden skip link as the first focusable element.
2. **LanguageProvider chunk** (180 kB / 59 kB gzip) — largest shared chunk; optional to lazy-gate it to first AI interaction for marginal first-load savings.
3. **Social preview size** — 20.7 kB PNG is fine for OG; can be tuned further if desired.

None block delivery; all current interactive elements are keyboard- and assistive-technology-accessible by verified design.
