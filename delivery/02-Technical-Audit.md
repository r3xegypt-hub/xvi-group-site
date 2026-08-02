# XVI Group — Technical Audit

**Date:** 2026-08-02
**Status:** Pass

---

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (SPA, `BrowserRouter`, basename `/xvi-group-site`) |
| Language | TypeScript (strict, `tsc -b` clean) |
| Build | Vite (base `/xvi-group-site/`), rolldown pipeline |
| Styling | SCSS Modules + design tokens (`colors`, `typography`, `spacing`) |
| Animation | Framer Motion (`MotionConfig reducedMotion="user"`) + custom canvas/WebGL-free SVG scenes |
| AI | Custom Executive Concierge — STT (browser speech recognition) + TTS + localStorage memory |
| Lint | oxlint (`npm run lint` → exit 0) |
| e2e | Playwright (27 scripts in `e2e/`) |

---

## 2. Architecture

- **Provider stack:** `ThemeProvider → LanguageProvider → JourneyProvider → MotionProvider → SoundProvider` around a single `.xvi-app` shell.
- **Route code-splitting:** 13 pages are `React.lazy()` imports — each route downloads only its own chunk; a shared `LanguageProvider` chunk holds the dictionary.
- **Single AI entry point:** `ExecutiveConcierge` dispatches `xvi:hero-robot-transition` once on the robot's `arrive` phase (`heroYieldRef`); `AIDock` listens to `xvi:open-ai-dock` / `xvi:ai-dock-state`; dock bar is intentionally hidden on the home page (the hero robot is the entry). A `useCTA` hook routes hero CTA → dock on home, `/contact` elsewhere.
- **State persistence:** localStorage keys `xvi-language`, `xviIntroDone`, `xviCinematicDate`, `xviConciergeSeen`, `xvi-journey`, memory store → personalised "Welcome back, {name}" greeting.
- **Scroll model:** the app scrolls on the document (the `html { scroll-behavior: smooth }` animation is ~800 ms; header shrinks `20px → 12px` on scroll via `.scrolled`).

---

## 3. Code Quality Gates

- `npm run build` → **passes** (`tsc -b && vite build && copy dist/index.html dist/404.html`), built in 5.29 s.
- `npm run lint` → **exit 0** (pre-existing style warnings in e2e report helpers only).
- Zero console/page errors asserted at runtime in every e2e suite.

---

## 4. Verification Matrix (all green)

| Script | Checks | Result |
|---|---|---|
| `verify-ai-final.mjs` | 8 | ✓ |
| `verify-robot.mjs` | 34 | ✓ |
| `verify-concierge.mjs` | 148 | ✓ |
| `verify-concierge-automation.mjs` | 7 | ✓ |
| `verify-voice.mjs` / `-permission` / `-premium` | 16 / 5 / 18 | ✓ |
| `verify-memory.mjs` | 20 | ✓ |
| `verify-sound.mjs` | 14 | ✓ |
| `verify-cta.mjs` | — | ✓ |
| `verify-cases.mjs` | 25 | ✓ |
| `verify-portfolio.mjs` | 38 | ✓ |
| `verify-metrics.mjs` | 15 | ✓ |
| `verify-globe.mjs` | 18 | ✓ |
| `verify-home-nav.mjs` | 56 | ✓ |
| `verify-journey.mjs` / `-chat` | 19 / 10 | ✓ |
| `verify-recommend.mjs` | 8 | ✓ |
| `verify-links.mjs` | 8 | ✓ |
| `verify-motion.mjs` | 7 | ✓ |
| `verify-visual.mjs` | 9 | ✓ |
| `verify-t05.mjs` | 6 | ✓ |
| `verify-fallback.mjs` | — | ✓ |
| `check-mobile-menu.mjs` / `check-sticky-header.mjs` | — | ✓ |
| `final-responsive.mjs` | 80 | ✓ |
| `audit-overflow.mjs` | — | 0 issues ✓ |

---

## 5. Notable Fixes Applied in This Audit

- `verify-links.mjs`: inverted exit code corrected (now fails loudly on broken links).
- `verify-cta.mjs`: updated for home-page AI entry (dock bar hidden on home; hero robot is the entry) and rec-card render timing (3.2 s).
- `verify-memory.mjs`: close/reopen test targets the dock close button (no Escape handler) and the concierge entry.
- `verify-sound.mjs`: waits for lazy route + globe node mount before asserting (was a race).
- `check-sticky-header.mjs`: waits for full page render and uses instant scrolling (was measuring mid smooth-scroll animation).

All were **test-only** corrections; no production regressions were found.

---

## 6. Known Post-Launch Considerations (non-blocking)

- Add a visible "Skip to content" link targeting `#main-content` (anchor already exists).
- `LanguageProvider` chunk (180 kB / 59 kB gzip) is the largest shared dependency; could be lazy-gated to the first AI interaction if desired.
