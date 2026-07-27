# HERO_DIRECTION.md — XVI GROUP Cinematic Hero Concept

> APPROVED. This is the final hero direction for Phase 03 implementation.

## Hero Philosophy

The hero is a **cinematic experience** — not a section, not a banner. It is the first 5 seconds of a film. The visitor must feel: "This is the most sophisticated consulting brand I've ever seen."

### What the Hero IS
A **layered cinematic composition** with:
1. **Executive architectural grid** — Subtle structural lines creating depth
2. **Animated luxury gold light sweep** — A soft beam of gold light crossing the frame
3. **AI data flow visualization** — Nodes and connections representing intelligence
4. **Floating geometric structures** — Diamond forms drifting in parallax depth
5. **Layered depth** — 4 distinct depth layers creating a 3D theater
6. **Premium atmosphere** — The feeling of entering a luxury space

### What the Hero Is NOT
- NOT a product screenshot (Apple does this)
- NOT a video background (Slalom does this)
- NOT a ChatGPT prompt (OpenAI does this)
- NOT a flat gradient mesh (Stripe does this)
- NOT a terminal/code display (Linear does this)
- NOT a static text block (McKinsey does this)

## The 4 Depth Layers

### Layer 1: Background (z-index: 0)
- Subtle radial gradient from warm white (#FAFAF8) center to light grey (#F4F5F7) edges
- **Architectural grid** — Thin lines (0.5px, Navy at 5% opacity) forming a subtle 12-column grid pattern
- The grid lines are visible but barely — they create the feeling of structure

### Layer 2: Ambient Atmosphere (z-index: 1)
- **Gold light sweep** — A soft, wide (200px) gradient beam of gold (#C9A96E at 8% opacity) that slowly moves from left to right across the hero over 8 seconds
- **Floating diamonds** — 3-4 diamond shapes at different scales (40px, 60px, 80px) floating at different depths
  - Opacity: 5-10%
  - Speed: The largest moves slowest (parallax depth)
  - Color: Navy at low opacity
- **Ambient particle field** — Tiny dots (2px) in a subtle grid, gently pulsing (opacity 0.05-0.15, 4s cycle)

### Layer 3: AI Data Flow (z-index: 2)
- **Node network** — 9 diamond-shaped nodes in a 3×3 arrangement
  - Connected by thin lines (1px, Navy at 10% opacity)
  - Center node: Gold (#C9A96E) at 40% opacity — the "brain"
  - Other nodes: Navy at 20% opacity
  - Lines pulse with data flow (opacity animation, 3s cycle)
- **Data streams** — Thin lines (0.5px) flowing from left edge to the node network
  - Gold color at 10% opacity
  - Animated with stroke-dashoffset (flowing effect)
  - Represents "intelligence flowing into the system"
- **Geometric structures** — 2-3 floating rectangular frames
  - 1px border, Navy at 8% opacity
  - Slightly rotated (2-5 degrees)
  - Floating with subtle parallax

### Layer 4: Content (z-index: 3)
- **Typography** — The headline, subheadline, CTAs
- **Meridian line** — Gold horizontal line separating headline from stats
- **Stats row** — Gold numbers with labels
- All content is crisp, high-contrast, and immediately readable

## Hero Composition

### Desktop Layout (1280px+)
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  [Glass Nav — Fixed, 72px, backdrop-filter: blur(20px)]           │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  LAYER 1: Architectural grid (0.5px lines, 5% opacity)            │
│  LAYER 2: Gold light sweep (8s left→right)                         │
│           Floating diamonds (3-4, 5-10% opacity)                   │
│  LAYER 3: AI node network (center-right)                           │
│           Data flow streams (left edge → nodes)                    │
│           Floating frames (2-3, rotated)                           │
│                                                                     │
│  LAYER 4: ← 120px →                                               │
│                                                                     │
│           EYEBROW (Gold, 13px, tracked)                            │
│           ─────────────────────                                     │
│                                                                     │
│           HEADLINE (Playfair, 64-72px, Navy)                       │
│           "Strategy. Intelligence."                                 │
│           "Operational Mastery."                                    │
│                                                                     │
│           SUBHEADLINE (Inter, 18px, Graphite)                      │
│           "A world-class advisory enterprise..."                   │
│                                                                     │
│           [Get Started →]    Our Approach →                        │
│           (Gold button)     (Ghost link)                            │
│                                                                     │
│           ═══════════════════════════════════════════               │
│           (Meridian Line — Gold, animates left→right)              │
│                                                                     │
│           4 Advisory    24/7      +40%        100%                  │
│           Suites        Support   Efficiency  Sovereign            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Animation Sequence

### Page Load (0-3s)

| Time | Layer | Element | Animation | Duration |
|------|-------|---------|-----------|----------|
| 0ms | 1 | Grid lines | fadeIn | 800ms |
| 0ms | 2 | Gold light sweep | translateX(-100%→100%) | 8000ms loop |
| 0ms | 2 | Floating diamonds | fadeIn + subtle float | 1200ms |
| 100ms | 3 | AI nodes | appear one by one | 100ms each |
| 200ms | 3 | Data flow lines | stroke-dashoffset draw | 1200ms |
| 300ms | 3 | Floating frames | fadeIn + subtle rotate | 1000ms |
| 400ms | 4 | Eyebrow | fadeUp(12px) | 600ms |
| 500ms | 4 | Headline | fadeUp(16px) | 600ms |
| 650ms | 4 | Subheadline | fadeUp(16px) | 600ms |
| 800ms | 4 | CTA buttons | fadeUp(12px) | 600ms |
| 900ms | 4 | Meridian line | scaleX(0→1) | 1200ms |
| 1100ms | 4 | Stats | fadeUp(20px) | 800ms |

### Scroll Behavior
- Hero is 100vh (full viewport)
- On scroll: Layer 2 (ambient) moves slower than Layer 4 (content) — creating parallax depth
- Layer 3 (AI) moves at 50% scroll speed — subtle depth effect
- No scroll-jacking. User controls scroll.

### Ambient Animation (Continuous)
- Gold light sweep: 8s loop, left to right
- Floating diamonds: 6s float cycle (up 4px, down 4px)
- Node pulse: 3s opacity cycle (0.1→0.15→0.1)
- Data flow: Continuous stroke-dashoffset animation

## Typography in Hero

| Element | Font | Size | Weight | Color | Line Height | Tracking |
|---------|------|------|--------|-------|-------------|----------|
| Eyebrow | Inter | 13px | 500 | #C9A96E | 1.4 | +0.12em |
| Headline | Playfair Display | clamp(2.5rem, 5vw, 4.5rem) | 700 | #0A1628 | 1.05 | -0.03em |
| Subheadline | Inter | clamp(1rem, 1.5vw, 1.125rem) | 400 | #5A6472 | 1.618 | 0 |
| CTA | Inter | 16px | 600 | #0A1628 | 1 | +0.03em |
| Stat Number | Inter | clamp(1.5rem, 3vw, 2rem) | 700 | #C9A96E | 1.2 | 0 |
| Stat Label | Inter | 14px | 400 | #5A6472 | 1.4 | 0 |

## Color Treatment

### Background Layers
- Layer 1: Radial gradient #FAFAF8 → #F4F5F7
- Layer 2: Gold sweep at 8% opacity, floating diamonds at 5-10%
- Layer 3: AI nodes at 20-40% opacity, data flow at 10%
- Layer 4: Full opacity text and UI

### Contrast Ratios
- Navy headline on light bg: 14.7:1 (AAA)
- Gold eyebrow on light bg: 2.2:1 (decorative only, not text)
- Graphite body on light bg: 5.8:1 (AA)
- Gold stats on light bg: 2.2:1 (decorative only)

## Responsive Behavior

### Desktop (>1280px)
- Full 4-layer composition
- AI visualization at 100% scale
- Stats: 4-across

### Laptop (1024-1280px)
- Full composition, slightly reduced AI scale (80%)
- Stats: 4-across

### Tablet Landscape (768-1024px)
- Layers 2-3 at 60% scale
- AI visualization simplified (5 nodes instead of 9)
- Stats: 2×2 grid

### Tablet Portrait (640-768px)
- Layer 2 (ambient) simplified
- Layer 3 (AI) hidden
- Stats: 2×2 grid

### Mobile (<640px)
- Layer 2 (ambient) simplified to gold gradient only
- Layer 3 (AI) hidden
- Stats: stacked vertically
- CTA: full-width

## Hero Composition

### Desktop Layout (1280px+)
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  [Glass Nav — Fixed, 72px height, backdrop-filter: blur(20px)]     │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ← 120px →                  ← Content Zone →           ← 120px →  │
│                                                                     │
│                         EYEBROW                                     │
│                    DECISION ARCHITECTURE                             │
│                    (Gold, 13px, tracked +0.1em)                      │
│                    ─────────────────────                             │
│                                                                     │
│                         HEADLINE                                    │
│              Strategy. Intelligence.                                 │
│              Operational Mastery.                                    │
│              (Playfair Display, 64-72px, Navy)                      │
│              (Line height: 1.05, tight tracking)                     │
│                                                                     │
│                         SUBHEADLINE                                 │
│              A world-class advisory enterprise                      │
│              empowering organizations to transform                   │
│              vision into measurable sovereign performance.           │
│              (Inter, 18px, Graphite, max 560px)                     │
│                                                                     │
│              [Get Started →]          Our Approach →                 │
│              (Gold button)            (Ghost link)                   │
│                                                                     │
│  ─────────────────────────────────────────────────────────────      │
│              (Meridian Line — Gold, 1.5px, animates left→right)     │
│                                                                     │
│              4 Advisory    24/7      +40%        Sovereign          │
│              Suites        Support   Efficiency  Performance        │
│              (Gold number) (Gold)    (Gold)      (Gold)             │
│              (Inter 700)   (700)     (700)       (700)              │
│                                                                     │
│                                                                     │
│              ┌─────────────────────────────────────────┐           │
│              │     [AI Node Network Animation]          │           │
│              │     Subtle diamond-shaped nodes          │           │
│              │     connected by thin gold lines         │           │
│              │     Pulsing gently at 3s intervals       │           │
│              │     Navy + Gold duochrome                 │           │
│              │     30% viewport width, centered          │           │
│              └─────────────────────────────────────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### The AI Visualization
The hero contains a **subtle geometric visualization** representing artificial intelligence:

#### Structure
- 9 diamond-shaped nodes arranged in a 3×3 grid
- Connected by thin lines (1px, Navy at 10% opacity)
- Center node is larger (1.5× size) and Gold colored
- Other nodes are Navy at 20% opacity
- Lines pulse with opacity (0.05 to 0.15, 3s cycle)

#### Animation
- On page load: Nodes appear one by one (100ms stagger)
- Lines draw in (stroke-dashoffset, 600ms)
- After load: Subtle opacity pulse on random nodes (3s cycle)
- On hover: Hovered node brightens (opacity 0.2 → 0.4)

#### Positioning
- Desktop: Centered below CTA, above the fold
- Tablet: Centered, smaller scale (70%)
- Mobile: Hidden (reduced motion), or minimal version (5 nodes)

### Tablet Layout (768-1024px)
- Same content hierarchy
- Headline: clamp(2.5rem, 5vw, 3.5rem) — scales down
- AI visualization: 50% scale
- Stats row: 2×2 grid instead of 4-across
- Padding: 64px horizontal

### Mobile Layout (<768px)
- Same content hierarchy
- Headline: clamp(2rem, 6vw, 2.5rem)
- AI visualization: Hidden or minimal
- Stats row: Stacked vertically
- Padding: 24px horizontal
- CTA: Full-width button

## Animation Timeline

### Page Load Sequence

| Time | Element | Animation | Duration | Easing |
|------|---------|-----------|----------|--------|
| 0ms | Background | Fade in | 300ms | ease-out |
| 100ms | Eyebrow | fadeUp(12px) | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| 200ms | Headline | fadeUp(16px) | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| 350ms | Subheadline | fadeUp(16px) | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| 500ms | CTA Button | fadeUp(12px) | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| 550ms | Ghost Link | fadeUp(12px) | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| 600ms | Meridian Line | scaleX(0→1) from left | 1200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| 800ms | Stats Row | fadeUp(20px) | 800ms | cubic-bezier(0.16, 1, 0.3, 1) |
| 900ms | AI Nodes | Appear one by one | 100ms each | cubic-bezier(0.16, 1, 0.3, 1) |
| 1200ms | AI Lines | Draw in | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |

### Scroll Behavior
- Hero is 100vh (full viewport)
- No parallax on any device
- Content is static (no scroll-triggered animation within hero)
- On scroll past hero: Hero fades out subtly (opacity 1→0.8, 200ms)

## Typography in Hero

| Element | Font | Size | Weight | Color | Line Height | Tracking |
|---------|------|------|--------|-------|-------------|----------|
| Eyebrow | Inter | 13px | 500 | #C9A96E | 1.4 | +0.1em |
| Headline | Playfair Display | clamp(2.5rem, 5vw, 4.5rem) | 700 | #0A1628 | 1.05 | -0.02em |
| Subheadline | Inter | clamp(1rem, 1.5vw, 1.125rem) | 400 | #5A6472 | 1.618 | 0 |
| CTA | Inter | 16px | 600 | #0A1628 | 1 | +0.02em |
| Stat Number | Inter | clamp(1.5rem, 3vw, 2rem) | 700 | #C9A96E | 1.2 | 0 |
| Stat Label | Inter | 14px | 400 | #5A6472 | 1.4 | 0 |

### Headline Rules
1. Maximum 8 words
2. Maximum 3 lines on desktop
3. Left-aligned (EN), right-aligned (AR)
4. Never centered on desktop
5. Period at end = deliberate, confident
6. Serif font = authority, tradition, trust

## Color Treatment

### Background
- **Desktop:** Subtle radial gradient from #FAFAF8 (center) to #F4F5F7 (edges)
- **Mobile:** Solid #FAFAF8
- **No images, no video, no patterns** in hero background

### Text
- Headline: Navy (#0A1628) — maximum contrast on light background
- Subheadline: Graphite (#5A6472) — softer, secondary
- Eyebrow: Gold (#C9A96E) — accent, draws attention
- CTA text: Navy (#0A1628) — clear, actionable

### AI Visualization
- Nodes: Navy at 20% opacity (subtle, background)
- Center node: Gold (#C9A96E) at 40% opacity (accent)
- Lines: Navy at 10% opacity (barely visible)
- Pulse: Opacity range 0.05-0.15

## Emotional Timeline

| Time | What User Feels | What They See |
|------|----------------|---------------|
| 0-1s | "This is serious." | Headline appears. Clean. Bold. Navy on white. |
| 1-3s | "They do what I need." | Subheadline + CTA visible. Value proposition clear. |
| 3-5s | "They're credible." | Stats visible. Numbers prove competence. |
| 5-7s | "This is sophisticated." | AI visualization draws in. Subtle, not overwhelming. |
| 7-15s | "I should scroll." | User has absorbed the hero. Eye naturally moves down. |

## Competitive Comparison

### vs. Slalom
- Slalom: Video background, 86px headlines, blue monochrome
- XVI: Gradient field, 64-72px headlines, navy+gold duochrome
- XVI advantage: More refined, less corporate, more luxury

### vs. Artefact
- Artefact: Full-viewport slider, hot pink CTAs, IBM Plex
- XVI: Single hero, gold CTAs, Playfair Display
- XVI advantage: More authoritative, more premium, less startup

### vs. McKinsey/QuantumBlack
- McKinsey: Text-heavy hero, Inter font, monochrome
- XVI: Typographic monument, serif headlines, gold accents
- XVI advantage: More visual impact, more personality, more luxury

### vs. Apple
- Apple: Product-as-hero, black background, SF Pro
- XVI: Concept-as-hero, light gradient, Playfair Display
- XVI advantage: More editorial, more consulting-appropriate

### vs. Linear
- Linear: Near-black, dot animations, monospace labels
- XVI: Navy gradient, node network, tracked uppercase
- XVI advantage: More executive, more warm, less developer

### vs. Stripe
- Stripe: Gradient mesh, indigo CTAs, Sohne font
- XVI: Subtle gradient, gold CTAs, Playfair Display
- XVI advantage: More luxury, more consulting, less fintech

### vs. OpenAI
- OpenAI: ChatGPT prompt as hero, rounded cards
- XVI: Typographic monument, architectural geometry
- XVI advantage: More traditional authority, more premium

## Responsive Behavior

### Desktop (>1280px)
- Full composition as described
- AI visualization at 100% scale
- Stats: 4-across

### Laptop (1024-1280px)
- Headline scales down slightly
- AI visualization at 80% scale
- Stats: 4-across with reduced spacing

### Tablet Landscape (768-1024px)
- Headline: clamp(2.5rem, 5vw, 3.5rem)
- AI visualization at 60% scale
- Stats: 2×2 grid

### Tablet Portrait (640-768px)
- Headline: clamp(2rem, 5vw, 3rem)
- AI visualization: Hidden
- Stats: 2×2 grid

### Mobile (<640px)
- Headline: clamp(1.75rem, 6vw, 2.5rem)
- AI visualization: Hidden
- Stats: Stacked vertically
- CTA: Full-width

---

*Created: July 2026*
*Version: 1.0*
*Phase: Art Direction — Hero Concept*
*STATUS: DO NOT IMPLEMENT — AWAITING APPROVAL*
