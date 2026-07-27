# VISUAL DNA — XVI GROUP

> This document is the genetic code of the XVI GROUP visual identity.
> Every pixel, every motion, every shadow must originate from this document.
> If it's not defined here, it doesn't exist in the final product.

---

## TABLE OF CONTENTS

1. [Logo DNA](#01--logo-dna)
2. [Visual Language](#02--visual-language)
3. [Hero DNA](#03--hero-dna)
4. [Motion DNA](#04--motion-dna)
5. [Geometry DNA](#05--geometry-dna)
6. [AI Illustration DNA](#06--ai-illustration-dna)
7. [Lighting DNA](#07--lighting-dna)
8. [Color Usage](#08--color-usage)
9. [Typography DNA](#09--typography-dna)
10. [Card System](#10--card-system)
11. [Button System](#11--button-system)
12. [Section Rhythm](#12--section-rhythm)
13. [Logo Concepts](#13--logo-concepts)
14. [Brand Patterns](#14--brand-patterns)

---

## 01 — LOGO DNA

### Construction Principles

The XVI GROUP logo is not drawn. It is **constructed**. Every stroke, every curve, every gap follows a mathematical relationship derived from the Golden Ratio (1.618) and the 8px grid.

#### The Mark: "XVI"
- **X** is constructed from two diagonal strokes intersecting at the exact center of a square bounding box.
- **V** is constructed from two diagonal strokes meeting at a single point — the same angle as the X's lower strokes, creating visual continuity.
- **I** is a single vertical stroke with architectural serifs at top and bottom — referencing columns, pillars, structural elements.

#### Stroke Logic
| Element | Stroke Weight | Justification |
|---------|--------------|---------------|
| XVI mark strokes | 3px at full size | Authority without heaviness |
| Serif terminals | 2px | Subtle refinement, not decoration |
| Meridian line | 1.5px | Separation without division |
| GROUP text | N/A (type) | Clean, tracked sans-serif |

#### Optical Balance
- The X appears optically larger than the V and I because diagonal strokes create more visual mass. To compensate, the X's stroke endpoints are pulled 2px inward — invisible to the eye but felt in the balance.
- The I's serifs extend exactly 4px beyond the stroke width on each side — creating a "base" that grounds the letterform.
- The gap between X, V, and I is **not equal**. It follows a 1:0.8:1 ratio — the V sits slightly closer to the X than the I sits to the V. This creates natural reading rhythm.

#### Negative Space
- The diamond shape created by the X's negative space is the brand's hidden geometry.
- This diamond appears in: the monogram concept, the favicon, the brand pattern, the loader animation.
- The diamond's proportions follow the Golden Ratio: width : height = 1 : 1.618.

#### Ratios
| Element | Ratio | Derived From |
|---------|-------|-------------|
| Logo width : height (horizontal) | 3.2 : 1 | Golden Ratio × 2 |
| XVI mark width : GROUP text width | 1.618 : 1 | Golden Ratio |
| Clear space : Logo height | 1 : 1 | Minimum clear space |
| Logo minimum size : Favicon size | 4 : 1 | Scalability threshold |

#### Alignment
- **Horizontal lockup:** XVI mark left-aligned, GROUP text left-aligned below, baseline-aligned to XVI's bottom serif.
- **Vertical lockup:** XVI mark top-centered, GROUP text bottom-centered, meridian line centered between.
- **Icon:** XVI mark only, centered in its bounding box with 1:1 clear space on all sides.

#### Grid
The logo is built on an 8px micro-grid:
- Mark bounding box: 48 × 48px (at minimum)
- Horizontal lockup: 160 × 48px (at minimum)
- Vertical lockup: 80 × 96px (at minimum)

#### Icon Behavior
- At sizes below 32px, the I's serifs are removed — they become noise at small sizes.
- At sizes below 16px, only the diamond geometry remains (favicon).
- The icon never includes "GROUP" text — it is pure geometry.

#### Wordmark Behavior
- "XVI" in Playfair Display Bold (or custom lettering derived from it).
- "GROUP" in Inter Medium, tracked at +0.15em.
- The meridian line extends exactly 8px beyond the wordmark on both sides.

#### Safe Area
```
┌──────────────────────────────┐
│         ↕ 8px clear          │
│    ↔ 8px   [LOGO]   8px ↔   │
│         ↕ 8px clear          │
└──────────────────────────────┘
```
No other element may enter the safe area.

#### Minimum Sizes
| Variant | Minimum Width |
|---------|--------------|
| Horizontal lockup | 120px |
| Vertical lockup | 64px |
| Icon (full detail) | 32px |
| Favicon (simplified) | 16px |

#### Responsive Behavior
| Breakpoint | Logo Size | Variant Used |
|-----------|-----------|-------------|
| Desktop (>1024px) | 32px height | Horizontal lockup |
| Tablet (640-1024px) | 28px height | Horizontal lockup |
| Mobile (<640px) | 24px height | Icon only (in nav), Horizontal (in footer) |

---

## 02 — VISUAL LANGUAGE

### How XVI GROUP Should Immediately Feel

The moment the page loads, the visitor must feel something specific. Not excitement. Not delight. Not surprise.

**They must feel certainty.**

#### The Six Emotional Pillars

| Pillar | What It Feels Like | How We Achieve It |
|--------|-------------------|-------------------|
| **Executive** | "These people speak my language." | Precise typography, measured spacing, zero noise. |
| **Luxury** | "This feels expensive." | Generous whitespace, restrained gold, premium materials (glass, shadow). |
| **Architectural** | "Everything is intentional." | Visible grid rhythm, structural alignment, geometric consistency. |
| **Timeless** | "This will age well." | No trends, no gradients, no animations that scream 2026. |
| **Confident** | "They know what they're doing." | Bold headlines, clear hierarchy, no apology, no clutter. |
| **Intelligent** | "They understand complexity." | Clean data presentation, abstract geometry, sophisticated color palette. |

#### What We Are NOT (Expanded)

| We Are NOT | Why | What We Are Instead |
|-----------|-----|---------------------|
| A SaaS startup | No dark mode, no neon, no terminal aesthetics | An institution |
| A creative agency | No playful illustrations, no gradient explosions | A consultancy |
| A fintech | No dashboards on homepage, no real-time tickers | An advisory |
| A tech company | No code snippets, no API docs on homepage | A partner |
| A government site | No dense text, no bureaucratic layout | An enterprise |

#### The One-Sentence Visual Brief
> "If McKinsey designed a website for Porsche's consulting division, and Apple built it — that's XVI GROUP."

---

## 03 — HERO DNA

### Camera Feeling
The hero should feel like a **wide-angle architectural photograph** — not a close-up, not a zoom. The camera is positioned at eye level, slightly back, capturing the full scope of the space. There is depth. There is light. There is air.

### Composition
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ← 120px →                    ← Content →    ← 120px → │
│                                                         │
│              EYEBROW (Gold, tracked)                    │
│              ─────────────────                          │
│                                                         │
│              HEADLINE                                   │
│              (Serif, 56px, Navy)                        │
│              (2-3 lines max)                            │
│                                                         │
│              SUBHEADLINE                                │
│              (Sans, 18px, Graphite)                     │
│              (2-3 lines max)                            │
│                                                         │
│              [PRIMARY CTA]     Secondary Link           │
│                                                         │
│              ─────────────────────────────              │
│              STATS ROW (4 items, Gold numbers)          │
│                                                         │
│                                                         │
│  ← 120px →                    ← Content →    ← 120px → │
└─────────────────────────────────────────────────────────┘
```

### Storytelling
The hero tells a three-act story in under 3 seconds:

**Act 1 (0-1s): Identity**
> "Who are you?" → "XVI GROUP" (via eyebrow + logo in nav)

**Act 2 (1-3s): Value**
> "What do you do?" → "Strategy. Intelligence. Operational Mastery." (headline)

**Act 3 (3-7s): Proof**
> "Why should I trust you?" → "4 Advisory Suites. 24/7 Support. +40% Efficiency." (stats)

### Animation Timing

| Element | Delay | Duration | Easing | From → To |
|---------|-------|----------|--------|-----------|
| Eyebrow | 0ms | 600ms | cubic-bezier(0.16, 1, 0.3, 1) | opacity 0→1, translateY 12px→0 |
| Headline | 150ms | 600ms | cubic-bezier(0.16, 1, 0.3, 1) | opacity 0→1, translateY 16px→0 |
| Subheadline | 300ms | 600ms | cubic-bezier(0.16, 1, 0.3, 1) | opacity 0→1, translateY 16px→0 |
| CTA Button | 450ms | 600ms | cubic-bezier(0.16, 1, 0.3, 1) | opacity 0→1, translateY 12px→0 |
| Stats Row | 600ms | 800ms | cubic-bezier(0.16, 1, 0.3, 1) | opacity 0→1, translateY 20px→0 |
| Gold line (decorative) | 300ms | 1200ms | cubic-bezier(0.16, 1, 0.3, 1) | scaleX 0→1 |

### Lighting
- The hero background is not flat. It has a **subtle radial gradient** from `#FAFAF8` (center) to `#F4F5F7` (edges) — creating a soft spotlight effect that draws the eye to the center content.
- No harsh shadows. No visible light sources. The feeling is: "soft, even, architectural lighting" — like a gallery.

### Depth
The hero has exactly **two depth layers:**
1. **Background layer:** The gradient field
2. **Content layer:** The text, buttons, and stats

No 3D. No parallax. No floating elements. The depth comes from the typography hierarchy and the whitespace, not from visual tricks.

### Visual Hierarchy (What the Eye Sees, in Order)
1. **Headline** (largest, boldest, highest contrast)
2. **Gold eyebrow** (color contrast draws attention)
3. **CTA button** (gold = "click me")
4. **Subheadline** (provides context after the headline is absorbed)
5. **Stats row** (details for those who want them)

### Geometry
The hero contains one geometric element: a **thin gold horizontal line** (1.5px) that separates the headline block from the stats row. This line:
- Extends exactly to the content width (max 1200px)
- Is perfectly horizontal
- Animates in from left to right (scaleX transform)
- Represents the "meridian" — the line between aspiration and execution

### Typography Hierarchy

| Element | Font | Size | Weight | Color | Line Height |
|---------|------|------|--------|-------|-------------|
| Eyebrow | Inter | 13px | 500 | `#C9A96E` | 1.4 |
| Headline | Playfair Display | clamp(2.5rem, 5vw, 3.5rem) | 700 | `#0A1628` | 1.15 |
| Subheadline | Inter | clamp(1rem, 1.5vw, 1.125rem) | 400 | `#5A6472` | 1.618 |
| CTA | Inter | 16px | 600 | `#0A1628` | 1 |
| Stat number | Inter | clamp(1.5rem, 3vw, 2rem) | 700 | `#C9A96E` | 1.2 |
| Stat label | Inter | 14px | 400 | `#5A6472` | 1.4 |

### Motion Hierarchy
- **Headline:** Slowest, heaviest — 600ms, full translateY
- **Subheadline:** Slightly faster, lighter — 600ms, less translateY
- **CTA:** Fastest to appear — 450ms delay
- **Stats:** Latest to appear, longest duration — 600ms delay, 800ms duration

### Emotion Timeline

| Time | What the User Feels | What They See |
|------|---------------------|---------------|
| **0-1 second** | "This is serious." | Headline appears. Clean. Bold. Navy on white. |
| **1-3 seconds** | "They do what I need." | Subheadline + CTA visible. Value proposition clear. |
| **3-7 seconds** | "They're credible." | Stats visible. Numbers prove competence. |
| **7-15 seconds** | "I should scroll." | User has absorbed the hero. Eye naturally moves down. |
| **15+ seconds** | "I want to know more." | User scrolls. Content reveals. Trust builds. |

---

## 04 — MOTION DNA

### Motion Philosophy
Motion in XVI GROUP is **architectural**. It doesn't decorate. It constructs. Every animation builds the page like a building — foundation first, then structure, then detail.

### The Three Laws of XVI Motion

1. **Motion must guide.** If an animation doesn't direct the user's eye, it doesn't exist.
2. **Motion must be invisible.** The user should never think "nice animation." They should think "this feels right."
3. **Motion must be consistent.** Same element = same animation, everywhere, always.

### Motion Inventory

#### Hover States
| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Button (primary) | background darkens 5%, translateY(-1px), shadow appears | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Button (secondary) | background becomes `rgba(10,22,40,0.04)`, border darkens | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Card | translateY(-2px), shadow elevates from Level 1 to Level 2 | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Link | underline width animates from 0% to 100% (left to right) | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Nav item | color changes to gold, underline appears | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Icon | color changes to gold (if interactive) | 150ms | ease |

#### Reveal Animations (Scroll)
| Element | Animation | Duration | Stagger | Threshold |
|---------|-----------|----------|---------|-----------|
| Section eyebrow | fadeUp(12px) | 600ms | — | 20% visible |
| Section title | fadeUp(16px) | 600ms | +100ms from eyebrow | 20% visible |
| Section description | fadeUp(16px) | 600ms | +100ms from title | 20% visible |
| Card (in grid) | fadeUp(20px) | 600ms | +100ms per card | 15% visible |
| Stat number | fadeUp(12px) + countUp | 800ms | +80ms per stat | 25% visible |
| Image | fadeUp(20px) + subtle scale(1.02→1) | 800ms | — | 20% visible |
| Gold divider | scaleX(0→1) from left | 1200ms | — | 30% visible |

#### Scroll Behavior
- **Smooth scrolling:** CSS `scroll-behavior: smooth` + Lenis for physics-based feel
- **No scroll-jacking.** The user controls the scroll. We only control what appears.
- **No parallax on mobile.** On desktop, maximum 10% offset on background elements only.

#### Card Animations
- **Resting:** `box-shadow: 0 1px 3px rgba(10, 22, 40, 0.06)`, `transform: none`
- **Hover:** `box-shadow: 0 8px 24px rgba(10, 22, 40, 0.1)`, `transform: translateY(-2px)`
- **Transition:** `all 200ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Never:** scale, rotate, flip, or 3D transform on hover

#### Button Animations
- **Resting → Hover:** Background darkens, slight lift, shadow appears
- **Hover → Active:** Background darkens more, lift returns to 0, shadow reduces
- **Resting → Disabled:** Opacity transitions to 0.4 over 200ms
- **Loading:** Text crossfades to spinner, width maintained, no layout shift

#### Navigation Animations
- **Desktop nav:** Always visible. No hide-on-scroll. No transparent-to-solid.
- **Mobile nav:** Bottom tab bar slides up on page load (300ms), stays fixed.
- **Mega-menu:** Fades in + translateY(8px) on hover (200ms). Fades out on mouse leave (150ms).

#### Page Transitions
- **Route change:** Current page fades out (150ms), new page fades in (300ms)
- **No slide transitions.** No zoom. No 3D flip. Just crossfade.
- **Scroll position resets to top** on every route change.

#### Loader
- **Duration:** 1.5s maximum (then force-complete)
- **Animation:** Diamond outline draws in stroke-by-stroke, then center dot appears
- **Colors:** Gold strokes on navy background
- **Never:** spinning circles, pulsing dots, progress bars

#### SVG Animations
- **Service icons:** Draw in on scroll reveal (stroke-dashoffset animation, 600ms)
- **Brand pattern:** Subtle opacity pulse (3s cycle, 0.1 opacity range)
- **Data visualizations:** Lines draw in from left (800ms), dots appear at endpoints (200ms delay)

#### Mouse Interaction
- **No cursor following.** No magnetic buttons. No cursor trail.
- **Cursor changes:** `pointer` on interactive elements, `default` elsewhere
- **Focus indicators:** Gold outline on keyboard focus, 2px offset

#### Background Movement
- **Hero:** No movement. Static gradient.
- **Section backgrounds:** No movement. Static alternating colors.
- **Decorative geometry:** Very subtle opacity shift on scroll (0.05 range, 2s duration)

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
All motion must degrade gracefully. The site must be 100% functional with all animations disabled.

---

## 05 — GEOMETRY DNA

### The Architectural Geometry System

XVI GROUP's visual identity is built on **three geometric primitives** that repeat across the brand:

#### Primitive 1: The Diamond
```
    ◇
   ╱ ╲
  ╱   ╲
 ╱     ╲
 ╲     ╱
  ╲   ╱
   ╲ ╱
    ◇
```
- **Origin:** The negative space of the X in XVI
- **Proportions:** Golden Ratio (width : height = 1 : 1.618)
- **Usage:** Favicon, monogram, brand pattern, loader
- **Meaning:** Precision, intersection, the point where strategy meets execution

#### Primitive 2: The Meridian Line
```
─────────────────────────────────
```
- **Origin:** The line separating aspiration from execution
- **Weight:** 1.5px
- **Color:** Executive Gold (#C9A96E)
- **Usage:** Section dividers, logo element, hero decoration
- **Meaning:** Standard, benchmark, the line we hold ourselves to

#### Primitive 3: The Frame
```
┌──────────────────────────┐
│                          │
│                          │
│                          │
└──────────────────────────┘
```
- **Origin:** The structural grid of the layout
- **Radius:** 12px (cards), 8px (buttons/inputs), 0 (sections)
- **Usage:** Cards, buttons, inputs, section containers
- **Meaning:** Structure, containment, reliability

### Geometric Compositions

These three primitives combine into recurring compositions:

#### Composition A: "The Foundation"
A diamond centered above a meridian line, framed by a rectangle.
```
    ◇
─────────────────
┌───────────────┐
│               │
└───────────────┘
```
**Usage:** Section headers, footer header, loading screen

#### Composition B: "The Axis"
A vertical meridian line bisecting a frame.
```
┌───────┬───────┐
│       │       │
│       │       │
│       │       │
└───────┴───────┘
```
**Usage:** Two-column layouts, about page, leadership profiles

#### Composition C: "The Grid"
Multiple frames arranged in a grid with diamond accents at intersections.
```
┌───────┐ ┌───────┐ ┌───────┐
│   ◇   │ │   ◇   │ │   ◇   │
└───────┘ └───────┘ └───────┘
```
**Usage:** Service cards, industry cards, team grid

### Golden Proportions in Layout
- **Content width : Total width** = 1 : 1.618 (content is ~62% of viewport)
- **Sidebar : Main content** = 1 : 1.618
- **Card height : Card width** = 1 : 1.272 (√golden ratio)
- **Section padding : Content width** = 1 : 12.5 (96px : 1200px)

### Grid Rhythm
Every section follows this internal rhythm:
```
Padding Top: 96px
  ↓
Eyebrow: 8px below padding
  ↓
Title: 16px below eyebrow
  ↓
Description: 16px below title
  ↓
Content gap: 32px
  ↓
[Content Grid]
  ↓
Content gap: 32px
Padding Bottom: 96px
```

### Geometric Rules
1. **All angles are 45°, 90°, or derived from the Golden Ratio.** No arbitrary angles.
2. **All curves follow circular arcs.** No Bézier curves with arbitrary control points.
3. **All patterns are tileable.** Every pattern must repeat seamlessly.
4. **All geometry is SVG.** No CSS shapes for brand geometry. SVG = resolution-independent.

---

## 06 — AI ILLUSTRATION DNA

### Philosophy
XVI GROUP's illustrations are **not decorative.** They are **conceptual.** They visualize abstract ideas — intelligence, networks, decisions, architecture — through geometric precision.

### Style Definition

| Attribute | Value |
|-----------|-------|
| **Approach** | Geometric abstraction |
| **Line style** | Clean, stroke-only, consistent weight |
| **Color** | Duochrome: Navy (#0A1628) + Gold (#C9A96E) |
| **Complexity** | Maximum 7 elements per illustration |
| **Resolution** | SVG (infinite scalability) |
| **Animation** | Draw-in on reveal, subtle pulse on hover |

### Subject Matter

#### Networks
Interconnected nodes representing:
- Organizational structure
- Data flow
- Decision pathways
- Technology ecosystems

**Visual language:** Circles (nodes) connected by lines (relationships). Node sizes vary by importance. Line weights vary by strength of connection.

#### Nodes
Single points of intelligence representing:
- Decision points
- Data sources
- AI models
- Human expertise

**Visual language:** Circles with a gold center dot. Optional concentric rings suggesting depth/radiation.

#### Connections
Lines between nodes representing:
- Relationships
- Data flow
- Causality
- Communication

**Visual language:** Thin lines (1-1.5px) with optional directional arrows. Dashed lines for potential connections. Solid lines for active connections.

#### Abstract Intelligence
Non-representational compositions suggesting:
- Machine learning
- Pattern recognition
- Neural networks
- Cognitive architecture

**Visual language:** Overlapping geometric shapes (diamonds, lines, arcs) that create emergent patterns when viewed as a whole.

### SVG Style Rules

| Rule | Value |
|------|-------|
| Stroke width | 1.5px (standard), 2px (emphasis), 1px (detail) |
| Stroke color | `#0A1628` (navy) or `#C9A96E` (gold) |
| Fill | None (stroke-only) except for node center dots |
| Stroke linecap | Round |
| Stroke linejoin | Round |
| Opacity | 1.0 (primary), 0.5 (secondary), 0.2 (background) |
| viewBox | Always square or Golden Ratio rectangle |

### Animation Rules

| Animation | Duration | Easing |
|-----------|----------|--------|
| Draw-in (stroke-dashoffset) | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Node appear (opacity + scale) | 300ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Pulse (opacity cycle) | 3s | ease-in-out |
| Hover highlight (color change) | 200ms | ease |

### Illustration Do's and Don'ts

| Do | Don't |
|----|-------|
| Use geometric shapes | Use organic/blob shapes |
| Keep to 5-7 elements max | Fill every corner |
| Use navy + gold only | Add blue, green, purple |
| Animate draw-in on scroll | Animate continuously |
| Leave generous whitespace | Crowd elements together |
| Align to 8px grid | Place elements arbitrarily |

---

## 07 — LIGHTING DNA

### Ambient Lighting
The XVI GROUP website is lit like a **premium gallery**: soft, even, diffused. There are no harsh shadows, no dramatic spotlights, no lens flares.

**The feeling:** "This space was designed by an architect who understands natural light."

### Light Sources

| Source | Direction | Intensity | Effect |
|--------|-----------|-----------|--------|
| **Primary ambient** | Top-down (simulated) | 100% | Overall page illumination |
| **Secondary ambient** | Center radial | 15% | Subtle hero spotlight |
| **Accent** | N/A (color-based) | N/A | Gold accents create "warmth" without light |

### Glass Reflections
Glass effects simulate **real glass** — a translucent surface that reflects and refracts:

| Property | Value |
|----------|-------|
| Backdrop filter | `blur(12px) saturate(180%)` |
| Background | `rgba(255, 255, 255, 0.85)` |
| Border | `1px solid rgba(255, 255, 255, 0.5)` |
| Inner shadow | `inset 0 1px 0 rgba(255, 255, 255, 0.6)` |

**When glass appears:**
- Navigation bar on scroll (optional)
- Floating elements (tooltips, dropdowns)
- Overlay modals

**When glass does NOT appear:**
- Cards (they use solid white + shadow)
- Section backgrounds
- Hero

### Shadow Philosophy
Shadows are **not decoration.** They are **depth cues** — telling the user "this element is above that element."

| Level | Shadow | When |
|-------|--------|------|
| **0** | None | Background elements, flat content |
| **1** | `0 1px 3px rgba(10, 22, 40, 0.06)` | Cards at rest |
| **2** | `0 4px 12px rgba(10, 22, 40, 0.08)` | Cards on hover, dropdowns |
| **3** | `0 8px 24px rgba(10, 22, 40, 0.1)` | Modals, popovers |
| **4** | `0 16px 48px rgba(10, 22, 40, 0.12)` | Navigation on scroll |

**Shadow color:** Always `rgba(10, 22, 40, ...)` — navy-based, not black. This creates warmer, more natural shadows.

### Contrast Strategy
| Element | Background | Contrast Ratio | Purpose |
|---------|-----------|----------------|---------|
| Navy text on white | `#0A1628` on `#FFFFFF` | 14.7:1 | Primary reading (WCAG AAA) |
| Graphite text on white | `#5A6472` on `#FFFFFF` | 5.8:1 | Body text (WCAG AA) |
| Gold text on navy | `#C9A96E` on `#0A1628` | 5.2:1 | Accent text (WCAG AA) |
| Gold on white | `#C9A96E` on `#FFFFFF` | 2.2:1 | **Not for text.** Only decorative. |

### Gold Usage Rules
| Context | Allowed? | Notes |
|---------|----------|-------|
| Text color | Only on navy/dark backgrounds | Must meet 4.5:1 contrast |
| Button background | Yes | With navy text |
| Border/accent | Yes | Lines, dividers, active states |
| Large background fills | **Never** | Gold is an accent, not a theme |
| Gradient | ** Never** | No gold gradients |
| Icon color | Yes, sparingly | Active/selected states only |

### Grey Usage Rules
| Context | Allowed? | Notes |
|---------|----------|-------|
| Card backgrounds | **Never** | Cards are always white |
| Section backgrounds | Yes | `#ECEEF2` for alternation |
| Border color | Yes | `#C8CDD5` |
| Text color | Yes | `#5A6472` for body text |
| Disabled states | Yes | With reduced opacity |

### White Usage Rules
| Context | Allowed? | Notes |
|---------|----------|-------|
| Card backgrounds | Yes | Primary card color |
| Section backgrounds | Yes | `#FAFAF8` for hero |
| Navigation background | Yes | With subtle border |
| Text on dark | Yes | Footer text, dark sections |

### Dark Section Philosophy
Dark backgrounds (navy) are used **sparingly** and **intentionally:**

| Section | Dark? | Why |
|---------|-------|-----|
| Hero | No | Light = openness, trust |
| Services | No | Cards on light background |
| About | No | Editorial, light |
| Technology | Optional | Dark section for visual variety |
| Testimonials | No | Light background |
| Footer | **Yes** | Always dark navy |

**Rules for dark sections:**
1. Maximum 2 dark sections per page
2. Dark sections must be separated by at least 2 light sections
3. Text in dark sections is white or gold, never graphite
4. Cards in dark sections have `rgba(255,255,255,0.05)` background, not white

---

## 08 — COLOR USAGE

### The Palette (Refined)

| Color | Hex | Role | Emotional Association |
|-------|-----|------|----------------------|
| Background | `#F4F5F7` | Primary canvas | Calm, open, architectural |
| Secondary | `#ECEEF2` | Alternation, depth | Subtle, structured |
| Surface | `#FFFFFF` | Cards, floating elements | Clarity, focus |
| Deep Navy | `#0A1628` | Text, headers, nav | Authority, trust, depth |
| Executive Gold | `#C9A96E` | Accent, emphasis | Luxury, precision, value |
| Graphite | `#5A6472` | Body text, secondary | Readable, warm, modern |
| Luxury Grey | `#C8CDD5` | Borders, inactive | Neutral, structural |

### When to Use Gold

| Scenario | Gold Usage | Reason |
|----------|-----------|--------|
| Eyebrow text | Yes | Draws attention to category |
| CTA button background | Yes | Primary action stands out |
| Active nav item | Yes | Shows current location |
| Stat numbers | Yes | Makes data feel valuable |
| Link hover | Yes | Clear feedback |
| Meridian line | Yes | Brand signature |
| Focus ring | Yes | Accessibility + brand |
| Card accent | Optional | One gold element per card max |
| Section background | **Never** | Too much gold = cheap |
| Body text | **Never** | Gold on white fails contrast |
| Large text | **Never** | Overwhelming |

### When NOT to Use Gold
- Never as a background color
- Never for body text on white
- Never as a gradient
- Never in large fills (>5% of viewport)
- Never for error/success states
- Never for borders on cards (use grey)

### How Much White
- **Every card** has a white background
- **Every section** has either `#F4F5F7` or `#ECEEF2` — never pure white (except cards)
- **The hero** uses `#FAFAF8` — a warmer white that feels inviting
- **White text** only appears on navy/dark backgrounds

### How Much Grey
- **Borders:** `#C8CDD5` at 1px — subtle, structural
- **Section alternation:** `#ECEEF2` — every other section
- **Disabled states:** Grey + opacity reduction
- **Never** as a card background
- **Never** as a primary text color (use graphite instead)

### How Much Glass
- **Maximum 2 glass elements per viewport**
- **Only for overlays** — nav, tooltips, modals
- **Never for cards** — cards use solid white
- **Never for section backgrounds** — too much blur is disorienting

### Emotional Color Rules

| Emotion | Color Combination |
|---------|-------------------|
| **Trust** | Navy text on white |
| **Luxury** | Gold accent on navy |
| **Calm** | Graphite text on light grey |
| **Action** | Gold button on white |
| **Authority** | Navy background, white text |
| **Precision** | Gold meridian line on white |
| **Warmth** | Gold accent on warm white |

---

## 09 — TYPOGRAPHY DNA

### Editorial Hierarchy
The typography system follows **editorial design principles** — the same principles used by Monocle, Kinfolk, and Cereal magazine.

#### The Rule of Three
Every text block contains exactly **three levels** of hierarchy:
1. **Display** (eyebrow or headline) — captures attention
2. **Heading** (title or subtitle) — provides context
3. **Body** (paragraph or caption) — delivers content

Never use four levels. Three is maximum hierarchy.

### Executive Hierarchy

| Level | Font | Size | Weight | Color | Usage |
|-------|------|------|--------|-------|-------|
| Display | Inter | 13px | 500 | Gold | Eyebrows, category labels |
| Heading 1 | Playfair Display | clamp(2.5rem, 5vw, 3.5rem) | 700 | Navy | Page titles |
| Heading 2 | Playfair Display | clamp(2rem, 4vw, 2.625rem) | 600 | Navy | Section headers |
| Heading 3 | Playfair Display | clamp(1.5rem, 3vw, 2rem) | 600 | Navy | Subsection headers |
| Heading 4 | Inter | clamp(1.25rem, 2vw, 1.5rem) | 600 | Navy | Card titles |
| Body Large | Inter | clamp(1.125rem, 1.75vw, 1.25rem) | 400 | Graphite | Lead paragraphs |
| Body | Inter | clamp(1rem, 1.5vw, 1.125rem) | 400 | Graphite | Main text |
| Small | Inter | 14px | 400 | Graphite | Captions, labels |
| Caption | Inter | 12px | 400 | Grey | Legal, fine print |

### Large Headlines
Headlines are the **most important typographic element.** They must:
- Be large enough to dominate the viewport (clamp between 40px and 56px)
- Use tight line-height (1.15) to create density
- Use tight letter-spacing (-0.02em) to feel precise
- Use bold weight (700) for maximum authority
- Use navy color for maximum contrast

**Headline rules:**
1. Maximum 8 words per headline
2. Maximum 3 lines on desktop
3. Never center on desktop (left-align EN, right-align AR)
4. Never use all caps (the serif typeface is designed for title case)
5. Period at the end of headline = deliberate, confident

### Reading Rhythm
The distance between headline and body creates **reading rhythm:**

```
HEADLINE (56px, 1.15 line-height = 64px box)
  ↕ 16px gap (breathing room)
BODY (18px, 1.618 line-height = 29px box)
  ↕ 24px gap (paragraph separation)
BODY (18px, 1.618 line-height = 29px box)
```

This rhythm is **consistent across the entire site.** The gap between headline and body is always 16px. The gap between paragraphs is always 24px (1.5× body line-height).

### Spacing Between Typographic Elements

| Element Pair | Gap | Reason |
|-------------|-----|--------|
| Eyebrow → Title | 8px | They belong together |
| Title → Description | 16px | Title leads, description follows |
| Description → Content | 32px | Transition from header to body |
| Body → Body | 24px | Paragraph separation |
| Body → Heading | 48px | Major topic shift |
| Heading → Content | 16px | Heading leads content |

### Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, descriptions |
| Medium | 500 | Labels, navigation, eyebrows |
| Semibold | 600 | Card titles, button text, H4 |
| Bold | 700 | Headlines (H1, H2, H3), stat numbers |

**Never use:** Light (300), Thin (100), ExtraBold (800), Black (900)

### Letter Spacing

| Context | Value | Effect |
|---------|-------|--------|
| Eyebrow | +0.1em | Tracked, refined, editorial |
| Headlines | -0.02em | Tight, dense, authoritative |
| Body | 0 | Natural, readable |
| Button text | +0.02em | Slightly open, clear |
| Small/caption | +0.02em | Slightly open, legible at small size |
| GROUP (in logo) | +0.15em | Very tracked, architectural |

### Arabic Behavior
| Rule | Implementation |
|------|---------------|
| Alignment | Always right-aligned |
| Heading font | Amiri (serif) — calligraphic authority |
| Body font | Tajawal (sans) — clean, modern |
| Line-height | 1.75 (more vertical space than English) |
| Paragraph spacing | 1.5× body line-height (same as English) |
| Mixed language | Never in same paragraph |
| Number rendering | Use Arabic-Indic numerals (٠١٢٣) OR Western numerals (0123) — never mix |

### English Behavior
| Rule | Implementation |
|------|---------------|
| Alignment | Always left-aligned |
| Heading font | Playfair Display (serif) |
| Body font | Inter (sans-serif) |
| Line-height | 1.618 (golden ratio) |
| Max line length | 65-75 characters |
| Hyphenation | Enabled for body text |
| Orphans/widows | Prevented (min 3 characters on last line) |

---

## 10 — CARD SYSTEM

### Card Anatomy
```
┌─────────────────────────────────────┐
│  ↑ 24px                             │
│  ← 24px   [ICON]         24px →     │
│                                     │
│            Card Title               │
│          (H4, 24px, Navy)           │
│                                     │
│        Card Description             │
│      (Body, 16px, Graphite)         │
│        Max 3 lines                  │
│                                     │
│  [Optional: Arrow link →]           │
│  ↓ 24px                             │
└─────────────────────────────────────┘
```

### Card Properties

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border-radius | `12px` |
| Padding | `24px` all sides |
| Border | None |
| Shadow (rest) | `0 1px 3px rgba(10, 22, 40, 0.06)` |
| Shadow (hover) | `0 8px 24px rgba(10, 22, 40, 0.1)` |
| Transition | `all 200ms cubic-bezier(0.16, 1, 0.3, 1)` |
| Hover transform | `translateY(-2px)` |

### Glass Cards (Special Variant)
For overlays and floating elements only:
| Property | Value |
|----------|-------|
| Background | `rgba(255, 255, 255, 0.85)` |
| Backdrop-filter | `blur(12px) saturate(180%)` |
| Border | `1px solid rgba(255, 255, 255, 0.5)` |
| Border-radius | `12px` |

### Elevation States
| State | Shadow Level | Transform |
|-------|-------------|-----------|
| Rest | Level 1 | none |
| Hover | Level 2 | translateY(-2px) |
| Active/Pressed | Level 0 | translateY(0) |
| Disabled | Level 0 | none, opacity 0.5 |

### Border Rules
- Cards **never** have visible borders. Depth comes from shadow only.
- Exception: glass cards have a 1px white border for glass effect.

### Spacing Rules
- Between cards in a grid: `24px`
- Between card rows: `24px`
- Internal card padding: `24px` (all sides)
- Card title to description: `8px`
- Card description to CTA: `16px`

### Shadow Rules
- Shadow color is always navy-based (`rgba(10, 22, 40, ...)`), never black
- Shadow never appears on light backgrounds without a card
- Shadow never appears on dark backgrounds (cards on dark use subtle border instead)

### Animation Rules
- Hover: 200ms, cubic-bezier(0.16, 1, 0.3, 1)
- Scroll reveal: fadeUp(20px), 600ms, stagger 100ms per card
- Never: scale, rotate, flip, or 3D transform

---

## 11 — BUTTON SYSTEM

### Button Variants

#### Primary
```
┌──────────────────────────────┐
│  Get Started →                │
└──────────────────────────────┘
```
- Background: `#C9A96E`
- Text: `#0A1628`, 16px, 600 weight
- Height: 48px
- Padding: 0 24px
- Border-radius: 8px
- **Usage:** Main CTA, form submit, primary action

#### Secondary
```
┌──────────────────────────────┐
│  Learn More                   │
└──────────────────────────────┘
```
- Background: transparent
- Text: `#0A1628`, 16px, 500 weight
- Border: `1px solid #C8CDD5`
- Height: 48px
- Padding: 0 24px
- Border-radius: 8px
- **Usage:** Secondary actions, form cancel

#### Ghost
```
  Learn More →
```
- Background: transparent
- Text: `#C9A96E`, 16px, 500 weight
- Border: none
- Height: auto (inline)
- Padding: 0
- **Usage:** Text links, inline CTAs, "Read more"

#### Icon Button
```
┌──────┐
│  →   │
└──────┘
```
- Background: transparent or `#C9A96E`
- Icon: 20px, stroke-only
- Height: 48px
- Width: 48px
- Border-radius: 8px
- **Usage:** Navigation arrows, close buttons, search

### Hover Philosophy
Every button hover must communicate: **"Your action was received."**

| Animation | Duration | Easing |
|-----------|----------|--------|
| Background color change | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Shadow appearance | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| TranslateY lift | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Arrow slide (ghost) | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |

**Primary hover:** Background darkens 5% (`#b8984e`), translateY(-1px), shadow appears
**Secondary hover:** Background becomes `rgba(10, 22, 40, 0.04)`
**Ghost hover:** Arrow slides right 4px

### Button Rules
1. Maximum one primary button per section
2. Button text is a verb or action phrase (max 4 words)
3. Icon buttons always have `aria-label`
4. Minimum touch target: 48×48px
5. Loading state: text → spinner, width maintained
6. Disabled state: opacity 0.4, cursor not-allowed

---

## 12 — SECTION RHYTHM

Every section has **one emotional goal.** The design must serve that goal — nothing else.

### Section Emotional Map

| Section | Emotion | How We Achieve It |
|---------|---------|-------------------|
| **Hero** | **Certainty** | Bold headline, clean space, immediate value prop |
| **Services** | **Confidence** | Clear cards, strong icons, organized grid |
| **About** | **Trust** | Editorial layout, generous whitespace, human voice |
| **Technology** | **Innovation** | Abstract geometry, data visualization, modern layout |
| **Industries** | **Depth** | Sector-specific content, organized grid, clear hierarchy |
| **Insights** | **Authority** | Editorial typography, long-form reading, thought leadership |
| **Testimonials** | **Social proof** | Real names, real companies, real quotes |
| **Leadership** | **Respect** | Professional profiles, clean layout, personal stories |
| **Contact** | **Action** | Clear form, trust indicators, immediate response promise |
| **Footer** | **Completion** | Comprehensive, dark navy, final brand impression |

### Section Transition Rules
1. Sections alternate between `#F4F5F7` and `#ECEEF2` backgrounds
2. Every section has exactly 96px top and bottom padding (desktop)
3. Every section contains: eyebrow → title → description → content
4. The gap between sections is created by the padding, not by dividers (except the meridian line in special cases)
5. Maximum 2 dark sections per page

### Section Rhythm Pattern
```
LIGHT SECTION (96px padding)
  ↕
DARK SECTION (96px padding) — optional, max 2 per page
  ↕
LIGHT SECTION (96px padding)
  ↕
LIGHT SECTION (96px padding) — with different content pattern
  ↕
...
```

---

## 13 — LOGO CONCEPTS

### Concept 01 — THE ARCHITECTURAL MARK

**Philosophy:** The XVI numeral is treated as an architectural element — structural beams, columns, a blueprint.

**Construction:**
- X: Two diagonal strokes intersecting at the center of a square
- V: Two diagonal strokes meeting at a point, same angles as X
- I: Vertical stroke with architectural serifs (top and bottom)
- GROUP: Tracked sans-serif below

**Brand Meaning:** Precision. Structure. The built environment of strategy.

**Luxury Rationale:** Architectural forms evoke permanence — the same permanence that luxury brands project.

**Enterprise Rationale:** Consulting is about building. The architectural mark says: "We build things that last."

**SVG:** `concept-01-architectural.svg`

---

### Concept 02 — THE SOVEREIGN WORDMARK

**Philosophy:** Pure typography. No symbol. The power is in proportion, kerning, and negative space.

**Construction:**
- "XVI" in high-contrast serif (Bodoni/Didot-inspired)
- "GROUP" in light-weight sans-serif, heavily tracked (+0.15em)
- Optical alignment between the two words
- Negative space between X and V creates a subtle diamond

**Brand Meaning:** Authority. Sophistication. The name alone is enough.

**Luxury Rationale:** The most luxury brands (Cartier, Tiffany, Porsche) are wordmarks. No symbol needed.

**Enterprise Rationale:** Wordmarks feel institutional. They don't need to explain themselves.

**SVG:** `concept-02-sovereign.svg`

---

### Concept 03 — THE PRECISION MONOGRAM

**Philosophy:** X, V, and I are overlaid into a single geometric form — a monogram containing all three letters.

**Construction:**
- X forms the outer diamond structure
- V sits inside, inverted, creating internal geometry
- I is the vertical axis through the center
- Result: A diamond/hexagonal mark with internal structure

**Brand Meaning:** Integration. The three disciplines (Strategy, Intelligence, Execution) unified in one form.

**Luxury Rationale:** Monograms are the oldest luxury branding device (Louis Vuitton, Gucci, YSL).

**Enterprise Rationale:** The monogram works at any size — from favicon to building signage.

**SVG:** `concept-03-monogram.svg`

---

### Concept 04 — THE MERIDIAN LINE

**Philosophy:** A horizontal line divides the mark — the benchmark, the standard, the line we hold ourselves to.

**Construction:**
- "XVI" in serif above the meridian
- "GROUP" in sans-serif below the meridian
- The line extends slightly beyond the text (8px each side)
- Gold line, navy text

**Brand Meaning:** The line between aspiration and execution. Above = vision. Below = delivery.

**Luxury Rationale:** The meridian line is a design signature — like Bang & Olufsen's aluminum strip.

**Enterprise Rationale:** The line represents a standard. It says: "We don't cross this line until the work is right."

**SVG:** `concept-04-meridian.svg`

---

### Concept 05 — THE KINETIC NEXUS

**Philosophy:** Three geometric shapes intersect to form the impression of "XVI" — representing the intersection of Strategy, Technology, and Execution.

**Construction:**
- Triangle pointing right (Strategy)
- Triangle pointing down (Technology)
- Vertical line (Execution)
- Intersection creates a gold diamond at the center

**Brand Meaning:** Convergence. The three pillars of XVI GROUP meeting at a single point.

**Luxury Rationale:** Geometric abstraction feels modern-luxury — like high-end watch dials.

**Enterprise Rationale:** The nexus represents the consulting process — bringing disparate elements together.

**SVG:** `concept-05-nexus.svg`

---

## 14 — BRAND PATTERNS

### Pattern 01 — THE DIAMOND FIELD
```
◇   ◇   ◇   ◇   ◇
  ◇   ◇   ◇   ◇
◇   ◇   ◇   ◇   ◇
  ◇   ◇   ◇   ◇
```
- Diamond shapes in a staggered grid
- Stroke: 0.5px, Gold (#C9A96E), opacity 0.15
- Spacing: 40px between diamond centers
- **Usage:** Hero background, section backgrounds, loading screen

### Pattern 02 — THE MERIDIAN GRID
```
─────────────────────────
─────────────────────────
─────────────────────────
```
- Horizontal lines at regular intervals
- Stroke: 0.5px, Gold (#C9A96E), opacity 0.1
- Spacing: 48px between lines
- **Usage:** Footer background, card backgrounds, subtle texture

### Pattern 03 — THE NEXUS FIELD
```
◇───────◇───────◇
│       │       │
◇───────◇───────◇
│       │       │
◇───────◇───────◇
```
- Diamonds connected by lines in a grid
- Stroke: 0.5px, Navy (#0A1628), opacity 0.05
- Diamond fill: Gold (#C9A96E), opacity 0.08
- Spacing: 64px between nodes
- **Usage:** Technology section, AI illustration background

### Pattern 04 — THE ARCHITECTURAL DOT
```
·   ·   ·   ·   ·
  ·   ·   ·   ·
·   ·   ·   ·   ·
```
- Small dots in a staggered grid
- Dot size: 2px diameter
- Color: Gold (#C9A96E), opacity 0.2
- Spacing: 24px between dots
- **Usage:** Card accent, section divider, subtle background

### Pattern Rules
1. Patterns are always SVG (resolution-independent)
2. Patterns are always subtle (opacity 0.05-0.2)
3. Patterns never compete with content
4. Maximum one pattern per section
5. Patterns can be combined with solid backgrounds
6. Patterns are always tileable (seamless repeat)

---

## QUALITY CHECKPOINT

Before Phase 02 begins, verify:

- [ ] VISUAL_DNA.md is complete and comprehensive
- [ ] Every section answers: "Would Pentagram approve this?"
- [ ] Every animation is defined with exact timing
- [ ] Every color usage rule is explicit
- [ ] Every logo concept has SVG + rationale
- [ ] Every brand pattern has SVG + usage rules
- [ ] DESIGN_BIBLE.md is updated with Phase 1.5 additions
- [ ] DESIGN_DECISIONS.md is updated with Phase 1.5 additions
- [ ] All logo SVGs are pixel-perfect
- [ ] All brand assets are in public/brand/

**Status: CHECKPOINT — Do not proceed to Phase 02 without review.**

## 15 — ART DIRECTION (Phase 03 Update)

### Reference Analysis Summary

| Principle | Source | XVI Application |
|-----------|--------|-----------------|
| Massive editorial typography | Slalom (86px), Apple (64px), Linear (72px) | Hero at 64-72px, 1.05 line height |
| Near-black immersive backgrounds | Apple (#000), Linear (#08090a) | Navy sections for hero/key moments |
| Animated gradient meshes | Stripe (conic hero) | Subtle gold-to-navy gradient animation |
| Glass morphism navigation | Linear (blur(32px)) | Frosted glass nav with navy tint |
| Bento grid layouts | Stripe (solutions) | Asymmetric card grids for services |
| Logo marquee social proof | Stripe, Artefact | Client/partner logo strip |
| Binary dot animations | Linear (grid dots) | Subtle node network in hero |
| Primary easing | cubic-bezier(0.16, 1, 0.3, 1) | Stripe's signature easing |

### What XVI Will NOT Adopt

| Rejected Pattern | Source | Reason |
|-----------------|--------|--------|
| Hot pink CTA | Artefact (#FF0066) | Wrong for executive consulting |
| Full-bleed product photography | Apple | XVI sells strategy, not hardware |
| Video hero backgrounds | Slalom | Too heavy, too corporate |
| ChatGPT prompt as hero | OpenAI | Too product-specific |
| Terminal/code aesthetics | Linear | Too developer-focused |
| Auto-scrolling carousels | Artefact | Distracting, not premium |

### The Five Pillars of XVI Art Direction

1. **CINEMATIC PRESENCE** — Every page feels like entering a room designed by an architect
2. **EDITORIAL TYPOGRAPHY** — Typography is the primary design element
3. **RESTRAINED LUXURY** — Gold appears only where emphasis is needed
4. **ARCHITECTURAL PRECISION** — Every element aligns to the 8px grid
5. **SILENT MOTION** — Animations are so smooth they feel like natural movement

### Updated Logo Direction

See `NEW_LOGO_DIRECTION.md` for the complete premium SVG brand system.

The logo is now a **diamond mark** containing the roman numeral XVI, constructed from precise architectural geometry. The diamond represents: precision, intersection, the point where strategy meets execution.

### Updated Hero Direction

See `HERO_DIRECTION.md` for the complete hero concept.

The hero is now a **cinematic typographic monument** — massive serif headlines commanding attention, supported by a subtle AI-inspired geometric visualization (diamond node network), all set against a luxurious gradient field.

### Updated Motion System

See `MOTION_DIRECTION.md` for the complete motion system.

The primary easing is now `cubic-bezier(0.16, 1, 0.3, 1)` — Stripe's signature easing. All animations follow the Three Laws: guide, be invisible, be consistent.

### Updated Color System

See `COLOR_REFINEMENT.md` for the complete refined palette.

The palette remains: Navy (#0A1628) + Gold (#C9A96E) + White (#FFFFFF) + surfaces (#F4F5F7, #ECEEF2, #FAFAF8).

### Updated Typography

See `TYPOGRAPHY_REFINEMENT.md` for the complete typography refinement.

Headlines now use Playfair Display at 64-72px (Display level). Body uses Inter at 16-18px with golden ratio (1.618) line height.

---

*Document updated: July 2026*
*Version: 2.0*
*Phase: Art Direction Update*
