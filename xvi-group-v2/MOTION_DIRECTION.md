# MOTION_DIRECTION.md — XVI GROUP Premium Motion System

> Rich, layered, cinematic motion. Every animation must feel intentional. Smooth. Elegant. Slow confidence. Never flashy.

## Motion Philosophy

Motion in XVI GROUP is **cinematic and architectural**. It doesn't decorate. It constructs. It tells stories through scroll. It creates atmosphere through ambient movement. It delights through micro-interactions.

### The Three Laws of XVI Motion

1. **Motion must guide.** If an animation doesn't direct the user's eye, it doesn't exist.
2. **Motion must be invisible.** The user should never think "nice animation." They should think "this feels right."
3. **Motion must be consistent.** Same element = same animation, everywhere, always.

### The Fourth Law (New)
4. **Motion must create atmosphere.** Ambient animations make the site feel alive without demanding attention.

## Motion Tokens

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--motion-instant` | 100ms | Toggle, checkbox |
| `--motion-fast` | 150ms | Button states, icon color |
| `--motion-base` | 200ms | Hover effects, focus, link underline |
| `--motion-medium` | 300ms | Page transitions, dropdown open/close |
| `--motion-slow` | 400ms | Section reveals (small) |
| `--motion-slower` | 600ms | Section reveals (large), hero entrance |
| `--motion-slowest` | 800ms | Hero headline entrance, stats reveal |
| `--motion-cinematic` | 1200ms | Meridian line draw, loader sequence |

### Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary easing (80% of animations) |
| `--ease-in-out` | `cubic-bezier(0.45, 0, 0.55, 1)` | Page transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interactions (rare) |
| `--ease-smooth` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Gentle movements |

### The Primary Easing
`cubic-bezier(0.16, 1, 0.3, 1)` — This is Stripe's signature easing and will be XVI's primary easing for 80% of all animations. It creates a snappy feel: quick acceleration, gradual deceleration.

## Animation Inventory

### 1. Scroll Reveal Animations

#### fadeUp (Primary Reveal)
```
From: opacity 0, translateY(20px)
To: opacity 1, translateY(0)
Duration: 600ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Trigger: IntersectionObserver, threshold 0.2
```

#### fadeIn (Secondary Reveal)
```
From: opacity 0
To: opacity 1
Duration: 400ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Trigger: IntersectionObserver, threshold 0.2
```

#### scaleIn (Tertiary Reveal)
```
From: opacity 0, scale(0.95)
To: opacity 1, scale(1)
Duration: 600ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Trigger: IntersectionObserver, threshold 0.3
```

### 2. Stagger Animations

When multiple elements appear together, they stagger:

```
Element 1: delay 0ms
Element 2: delay 100ms
Element 3: delay 200ms
Element 4: delay 300ms
```

Maximum stagger: 400ms (4 elements). After 4 elements, use groups.

### 3. Hover Animations

#### Button Hover
```
Background: darken 5%
Transform: translateY(-1px)
Shadow: 0 2px 8px rgba(10, 22, 40, 0.12)
Duration: 200ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
```

#### Card Hover
```
Transform: translateY(-2px)
Shadow: 0 8px 24px rgba(10, 22, 40, 0.1)
Duration: 200ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
```

#### Link Underline
```
Width: 0% → 100%
Transform: left to right
Duration: 200ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
```

#### Nav Item Hover
```
Color: Navy → Gold
Duration: 200ms
Easing: ease
```

#### Icon Hover
```
Color: inherit → Gold
Duration: 150ms
Easing: ease
```

### 4. Navigation Animations

#### Mega Menu Open
```
From: opacity 0, translateY(8px)
To: opacity 1, translateY(0)
Duration: 200ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
```

#### Mega Menu Close
```
From: opacity 1, translateY(0)
To: opacity 0, translateY(8px)
Duration: 150ms
Easing: ease-in
```

#### Mobile Menu Toggle
```
Hamburger → X: rotate 90deg
Duration: 200ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
```

### 5. Page Transitions

#### Route Change
```
Current page: opacity 1 → 0, duration 150ms
New page: opacity 0 → 1, duration 300ms
Easing: ease-in-out
Scroll position: Reset to top
```

No slide transitions. No zoom. No 3D flip. Just crossfade.

### 6. Hero Entrance Sequence

| Element | Delay | Duration | Animation |
|---------|-------|----------|-----------|
| Background | 0ms | 300ms | fadeIn |
| Eyebrow | 100ms | 600ms | fadeUp(12px) |
| Headline | 200ms | 600ms | fadeUp(16px) |
| Subheadline | 350ms | 600ms | fadeUp(16px) |
| CTA Button | 500ms | 600ms | fadeUp(12px) |
| Ghost Link | 550ms | 600ms | fadeUp(12px) |
| Meridian Line | 600ms | 1200ms | scaleX(0→1) from left |
| Stats Row | 800ms | 800ms | fadeUp(20px) |
| AI Nodes | 900ms | 100ms each | fadeIn (staggered) |
| AI Lines | 1200ms | 600ms | stroke-dashoffset draw |

### 7. SVG Animations

#### Draw-In (Stroke)
```
stroke-dashoffset: full length → 0
Duration: 600ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Trigger: Scroll reveal
```

#### Node Pulse
```
opacity: 0.1 → 0.15 → 0.1
Duration: 3000ms
Easing: ease-in-out
Iterations: Infinite (but pauses when tab hidden)
```

#### Line Draw
```
stroke-dashoffset: full length → 0
Duration: 800ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Direction: Left to right
```

### 8. Loader Animation

```
Phase 1 (0-600ms): Diamond outline draws in (stroke-dashoffset)
Phase 2 (600-900ms): "XVI" text fades in
Phase 3 (900-1300ms): Meridian line extends left to right
Phase 4 (1300-1600ms): "GROUP" fades in
Total: ~1.6 seconds
Force-complete: 2 seconds maximum
```

### 9. Counter Animation (Stats)

```
From: 0
To: Target number
Duration: 800ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Trigger: Scroll reveal (25% visible)
```

### 10. Meridian Line Animation

```
scaleX: 0 → 1
Transform-origin: left center
Duration: 1200ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Trigger: Hero entrance (600ms delay)
```

## Forbidden Animations

## 11. Scroll Storytelling

As the user scrolls, the page tells a story. Each section reveals its narrative through coordinated animations.

### Scroll Timeline
```
Hero (0vh)        → Cinematic entrance, layers animate
Services (100vh)  → Cards stagger in from left
About (200vh)     → Typography reveals word by word
Technology (300vh) → AI visualization draws in
Industries (400vh) → Grid cells appear in sequence
Insights (500vh)   → Article cards cascade
Testimonials (600vh) → Quote fades in with author
Contact (700vh)    → Form fields animate in
Footer (800vh)     → Columns slide up
```

### Scroll Progress Indicator
- Thin gold line (2px) at top of viewport
- Width: 0% → 100% as user scrolls
- Color: Gold (#C9A96E)
- Height: 2px
- Always visible during scroll, fades after 2s of no scroll

## 12. SVG Draw Animations

All SVG elements draw in on scroll reveal using stroke-dashoffset.

### Draw-In Rules
```
stroke-dashoffset: [total path length] → 0
Duration: 600ms (small), 1200ms (large)
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Trigger: IntersectionObserver, threshold 0.3
```

### SVG Draw Inventory
| Element | Draw Time | Delay |
|---------|-----------|-------|
| Meridian line | 1200ms | 0ms |
| Diamond icons | 600ms | 0ms |
| AI node lines | 800ms | 200ms |
| Card borders | 400ms | 0ms |
| Section dividers | 600ms | 0ms |
| Footer geometry | 800ms | 0ms |

## 13. Section Transitions

Each section transition creates a visual "handoff" between content blocks.

### Transition Types
| Type | Usage | Animation |
|------|-------|-----------|
| **Color shift** | Section bg alternation | opacity crossfade over 200px scroll |
| **Parallax layer** | Content vs background | Background scrolls at 80% speed |
| **Reveal wipe** | New section enters | clip-path reveal from bottom |
| **Scale transition** | Feature showcase | Content scales from 0.95 to 1.0 |

### Section Transition Rules
1. Transitions happen over 100-200px of scroll
2. Never block scroll during transition
3. Transition timing: 300ms, ease-out
4. Maximum 1 transition type per section boundary

## 14. Ambient Background Movement

Subtle, continuous animations that make the site feel alive.

### Ambient Inventory
| Element | Animation | Speed | Opacity Range |
|---------|-----------|-------|---------------|
| Gold light sweep | translateX left→right | 8s loop | 5-8% |
| Floating diamonds | translateY up/down | 6s cycle | 5-10% |
| Grid dots | opacity pulse | 4s cycle | 5-15% |
| Node network | opacity pulse | 3s cycle | 10-15% |
| Data flow lines | stroke-dashoffset | 3s loop | 8-12% |

### Ambient Rules
1. Ambient animations are CSS-only (no JS)
2. Ambient animations pause when tab is hidden
3. Ambient animations are disabled with prefers-reduced-motion
4. Maximum 3 ambient elements per viewport
5. Ambient elements never interfere with content readability

## 15. Luxury Cursor Interactions

The cursor itself becomes a design element on desktop.

### Cursor Behaviors
| Context | Cursor | Animation |
|---------|--------|-----------|
| Default | default | — |
| Interactive | pointer | — |
| Text | text | — |
| Card hover | pointer | Card lifts (translateY -2px) |
| Button hover | pointer | Button darkens |
| Link hover | pointer | Underline appears |
| Custom (optional) | custom dot | 8px gold dot follows cursor |

### Custom Cursor (Desktop Only)
- 8px diameter circle, Gold (#C9A96E)
- Follows cursor with 100ms delay (lerp)
- Grows to 40px on hover over interactive elements
- Fade to 60% opacity when over text
- Disabled on mobile/touch devices
- Uses `requestAnimationFrame` for smooth 60fps

## 16. Micro-Interactions

Small, delightful moments that reward attention.

### Micro-Interaction Inventory
| Element | Interaction | Animation |
|---------|-------------|-----------|
| Button | Click | scale(0.97) for 100ms, then back |
| Card | Hover | translateY(-2px) + shadow deepens |
| Link | Hover | Underline slides in from left |
| Nav item | Hover | Color → Gold, underline appears |
| Toggle | Click | Circle slides, background color shifts |
| Input | Focus | Border → Gold, subtle glow appears |
| Input | Error | Border → Red, shake 300ms |
| Stat number | Scroll in | Count up from 0 |
| Diamond icon | Hover | Rotate 45° (subtle) |
| Footer link | Hover | Color → Gold, slight indent |

### Micro-Interaction Rules
1. Duration: 150-200ms max
2. Easing: cubic-bezier(0.16, 1, 0.3, 1)
3. Never: scale > 0.97, rotation > 5°, translate > 4px
4. Always: GPU-accelerated (transform, opacity only)

## Section Personality System

Every section has its own visual personality while staying inside the design system.

### Section Personalities

| Section | Personality | Unique Element | Color Accent | Motion Style |
|---------|-------------|---------------|--------------|-------------|
| **Hero** | Cinematic | 4-layer depth, gold sweep | Gold ambient | Layered entrance |
| **Services** | Architectural | Diamond card icons, grid rhythm | Gold icons | Staggered cards |
| **About** | Editorial | Large serif pull-quote, white space | Navy text | Word-by-word reveal |
| **Technology** | Futuristic | AI node network, data flow lines | Gold nodes | SVG draw-in |
| **Industries** | Structured | 2×2 bento grid, sector icons | Navy grid | Sequential cells |
| **Insights** | Editorial | Article cards, read-time badges | Gold categories | Cascade reveal |
| **Testimonials** | Human | Large quote marks, author photo area | Gold quotation | Fade + slide |
| **Contact** | Action-oriented | Clean form, trust indicators | Gold CTA | Field-by-field |
| **Footer** | Authority | Dark navy, column structure | Gold meridian | Columns slide up |

### Section Visual DNA

Each section contains at least one unique visual element that gives it personality:

1. **Hero** — The gold light sweep (unique to hero)
2. **Services** — Diamond-shaped card icons (unique to services)
3. **About** — Large serif pull-quote spanning 2 columns (unique to about)
4. **Technology** — Animated AI node network (unique to technology)
5. **Industries** — Bento grid with asymmetric cells (unique to industries)
6. **Insights** — Article cards with category badges (unique to insights)
7. **Testimonials** — Oversized gold quotation marks (unique to testimonials)
8. **Contact** — Multi-step form with progress indicator (unique to contact)
9. **Footer** — Full-width meridian line + column grid (unique to footer)

### Section Background Personalities

| Section | Background | Pattern | Special |
|---------|-----------|---------|---------|
| Hero | #FAFAF8 gradient | Architectural grid | Gold light sweep |
| Services | #F4F5F7 | Diamond field (5% opacity) | — |
| About | #ECEEF2 | Meridian grid (5% opacity) | Pull-quote overlay |
| Technology | #F4F5F7 | Nexus field (8% opacity) | AI visualization |
| Industries | #ECEEF2 | Architectural dots (10% opacity) | — |
| Insights | #F4F5F7 | Diamond field (5% opacity) | — |
| Testimonials | #ECEEF2 | — | Large quote marks |
| Contact | #F4F5F7 | — | — |
| Footer | #0A1628 | Meridian grid (10% opacity) | Gold accents |

| Animation | Why |
|-----------|-----|
| Typing effects | Too gimmicky for executive brand |
| Letter-by-letter reveal | Too slow, too flashy |
| Parallax scrolling on mobile | Performance and accessibility |
| 3D rotations | Not architectural |
| Particle systems | Too tech-startup |
| Morphing shapes | Not geometric |
| Auto-playing carousels | Distracting, not premium |
| Infinite loops (except loader) | Exhausting |
| Scroll-jacking | User-hostile |
| Scale on hover | Causes layout shift |
| Bounce/spring physics | Too playful |
| Shake/vibrate | Aggressive |
| Color cycling | Distracting |

## Reduced Motion

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

## Performance Budget for Animation

| Metric | Target |
|--------|--------|
| Maximum concurrent animations | 5 |
| Maximum total animation weight | 50KB (CSS animations) |
| JavaScript animation library | None (CSS only + IntersectionObserver) |
| GPU-accelerated properties only | transform, opacity |
| Layout-triggering properties NEVER | width, height, top, left, margin, padding |

---

*Created: July 2026*
*Version: 1.0*
*Phase: Art Direction — Motion System*
