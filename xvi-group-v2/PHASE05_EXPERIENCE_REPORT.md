# PHASE 05 EXPERIENCE REPORT — EXECUTIVE AI

**Date:** August 1, 2026
**Phase:** 05 — Executive AI Experience
**Status:** COMPLETE — T01–T08 shipped, all e2e suites green

---

## 1. OVERVIEW

Phase 05 turned the XVI GROUP V2 site from a marketing site into a
concierge-led experience. A first-time visitor is greeted by an Executive
AI robot that asks them to pick a journey, then the entire homepage — hero
focus, services, industries, contact CTA, and the in-dock assistant —
adapts to that journey for the rest of the session. Return visitors skip
the greeting and land directly on the corner robot, with their choices
remembered.

Brand constraints held throughout: light theme, gold `#C8A65A`, no stock
photos or external rasters, procedural audio, `@include mobile` /
`@include reduced-motion` mixins from `src/styles/mixins/_devices.scss`.

---

## 2. WHAT SHIPPED

### T01 — Concierge arrival (`eb7c4a3`)
- `src/components/assistant/ExecutiveConcierge.tsx` — a phase machine
  (`hidden → arrive → selector → confirm → minimize → robot`) that greets
  first-time visitors with `Welcome.` / `مرحباً.` and the identity line
  "I'm your Executive AI Consultant." / «أنا المستشار التنفيذي الذكي».
- Auto-minimizes to the corner robot after ~22s if the visitor never
  chooses, and after the ~2.1s confirmation if they do.
- `seenState` is snapshotted once via `useRef` (a re-read after writing
  storage flipped `seenEver` and killed the greeting — fixed).

### T02 — Journey selector (`eb7c4a3`)
- `src/hooks/journeyContext.tsx` — `JourneyId` (`executive`,
  `healthcare`, `government`, `explore`), `JOURNEYS` metadata,
  `JourneyProvider`, `useJourney`, `journeyMeta`.
- Four journey cards render with a sequential stagger
  (`0.35 + i * 0.16s`); selection persists to
  `sessionStorage['xvi-journey']` and emits `xvi:journey-change`.
- Seen flags: `xviConciergeSeen` (localStorage) + `xvi-concierge-session`
  (sessionStorage). The dash-key `xvi-conciergeSeen` used by 12 e2e suites
  was silently failing — bulk-fixed to `xviConciergeSeen`.

### T03 — Journey-adaptive homepage (`55e3f99`)
- `src/components/ui/JourneyFocusBanner.tsx` — journey focus pill
  (`data-testid="journey-focus-banner"`).
- `Services` reorder via `FOCUS_INDEX`, `Industries` reorder, `Contact`
  CTA from `meta.cta`; sections gain `#solutions`, `#industries`,
  `#contact-cta` anchors. Clearing the journey restores defaults.

### T04 — Executive memory (`9fde232`)
- `src/hooks/executiveMemory.ts` — `ExecutiveMemory` (name / company /
  industry / goal / journey + questions[] + recommendations[]) persisted
  in `sessionStorage['xvi-executive-memory']` (session-only by design).
- AIDock renders memory chips (`User` / `Briefcase` / `Activity` /
  `Goal` / `Compass` icons) and greets `Welcome back, {name}`. Journey is
  synced into memory and surfaced as a Compass chip.

### T05 — Journey-aware conversation (`b30d44f`)
- The dock's quick actions lead with the active journey's focus service
  (gold-accented `Compass` chip); the ready-state line mirrors the journey
  prompt; a `journeyFocus` action renders the journey service + case card
  with a CTA.

### T06 — Robot personality (`55248d6`)
- HeroRobot now reads `thinking` from `xvi:voice-state` (the dock sends
  it) and gains emotional micro-states: JS-driven natural blink cadence
  with occasional double-blinks, curiosity bursts on saccades/hover
  (brows lift), a brief anticipation moment before speaking, and distinct
  listening / thinking / speaking eye+brow postures. Head micro-rotation,
  softer breathing and idle float, and smooth 0.4–0.5s state transitions.
  Reduced-motion fully respected.

### T07 — Recommendation engine (`0bbf82e`)
- `RecommendationCard` personalizes the next step from memory (goal +
  journey): journey service + case plus "Explore" / "Talk to a consultant"
  CTAs. The old "Contact Expert → /contact" shortcut was replaced by the
  card; free-text recommend intents (EN/AR) route to it; recommendations
  are logged with the service label.

### T08 — Audit + this report
- Full regression across 20+ e2e suites (below), `verify-cta` updated for
  the new recommend behavior, lint clean (warnings pre-existing),
  `audit-overflow` 0 issues, responsive + mobile + reduced-motion suites
  green.

---

## 3. STORAGE & EVENTS

| Key / event | Type | Purpose |
| --- | --- | --- |
| `sessionStorage['xvi-journey']` | data | Active journey id |
| `sessionStorage['xvi-executive-memory']` | data | Session memory profile |
| `localStorage['xviConciergeSeen']` | data | First-visit greeting gate |
| `sessionStorage['xvi-concierge-session']` | data | Per-tab greeting gate |
| `xvi:journey-change` | event | Journey selection/clear |
| `xvi:voice-state` | event | `{ listening, speaking, thinking }` |
| `xvi:open-ai-dock` / `xvi:ai-dock-state` | event | Dock open/close |

---

## 4. VERIFICATION (all green)

| Suite | Result |
| --- | --- |
| verify-concierge | 148/148 |
| verify-concierge-automation | 7/7 |
| verify-journey | 19/19 |
| verify-memory | 20/20 |
| verify-journey-chat | 10/10 |
| verify-recommend | 8/8 |
| verify-robot | 34/34 |
| verify-personality | 5/5 |
| verify-motion | 7/7 |
| verify-t05 | 6/6 |
| verify-sound | 14/14 |
| verify-voice | 16/16 |
| verify-voice-permission | 5/5 |
| verify-voice-premium | 18/18 |
| verify-cta | ALL PASSED |
| verify-fallback | PASSED |
| verify-home-nav | 56/56 |
| verify-globe | 18/18 |
| verify-links | 8/8 |
| verify-portfolio | 32/32 |
| verify-cases | 33/33 |
| verify-visual | 9/9 |
| audit-overflow | 0 issues |
| check-sticky-header / check-mobile-menu / final-responsive | PASSED |

`npm run build` ✓ · `npx oxlint` exit 0 (pre-existing warnings only).

---

## 5. KEY DECISIONS

- **Session-only memory** — names/goals are held for the tab session only;
  the dock states this explicitly.
- **DEV-only fallback hook** — `window.__xviSetAIDockAvailable` in
  `src/hooks/useCTA.ts` lets `verify-fallback` force the no-dock path
  (Vite's HMR `?t=` suffix makes the test a separate module instance).
- **Anticipation before speech** — a 190ms `anticipate` state between
  "speaking" signal and mouth activation so the robot leans in before it
  talks.
- **Journey colors untouched** — the personality work stayed gold-on-white;
  no journey accent colors were introduced into the robot.
