# ART_DIRECTION.md — XVI GROUP

This document synthesizes the art direction principles extracted from analyzing 7 world-class reference websites (Slalom, Artefact, McKinsey/QuantumBlack, Apple, Linear, Stripe, OpenAI) and establishes the unified art direction for XVI GROUP.

## Reference Analysis Summary

### Principles Extracted

| Principle | Source | Application to XVI |
|-----------|--------|-------------------|
| Massive editorial typography | Slalom (86px headlines), Apple (64px), Linear (72px) | Hero headlines at 64-72px with 1.05-1.15 line height |
| Near-black immersive backgrounds | Apple (#000000), Linear (#08090a), Slalom (#000A25) | Dark navy sections for hero and key moments |
| Animated gradient meshes | Stripe (conic/linear gradient hero), OpenAI | Subtle gold-to-navy gradient animation in hero |
| Glass morphism navigation | Linear (backdrop-filter: blur(32px)), Stripe (blur(20px)) | Frosted glass nav with navy tint |
| Bento grid layouts | Stripe (solutions), Linear (feature grid) | Asymmetric card grids for services |
| Editorial white space | Apple (96-128px sections), McKinsey (96px) | 96-128px section padding |
| Logo marquee social proof | Stripe, Artefact | Client/partner logo strip |
| Binary dot animations | Linear (grid dots pulsing) | Subtle node network animation in hero |
| Near-monochromatic palettes | McKinsey (mist+slate), Linear (near-black) | Navy + gold as sole chromatic accents |
| Sharp + rounded corners | McKinsey (0px), Apple (18-20px), Stripe (12px) | 12px for cards, 8px for buttons, 0px for sections |
| Footer as brand statement | Stripe (#0a2540), Slalom (#000A25) | Navy footer with gold accents |
| Progressive disclosure | Apple (one product per section) | One emotional goal per section |
| Numbered workflow narrative | Linear (1.0→5.0) | Strategic process visualization |
| Stats strip social proof | Stripe, Artefact | Animated counter row |
| Easing curve: cubic-bezier(0.16, 1, 0.3, 1) | Stripe signature easing | Primary easing for all XVI transitions |

### What XVI Will NOT Adopt

| Rejected Pattern | Source | Reason |
|-----------------|--------|--------|
| Hot pink CTA | Artefact (#FF0066) | Wrong emotional register for executive consulting |
| Full-bleed product photography | Apple | XVI sells strategy, not hardware |
| Terminal/code aesthetics | Linear (partial) | Too developer-focused |
| ChatGPT prompt as hero | OpenAI | Too product-specific |
| Video hero backgrounds | Slalom | Too heavy, too corporate |
| Playful illustrations | None (all are serious) | Consistent with luxury positioning |
| Auto-scrolling carousels | Artefact | Distracting, not premium |

## The XVI Art Direction

### One-Sentence Brief
> "If Stripe designed a luxury consulting brand, and McKinsey wrote the copy — that's XVI GROUP."

### The Five Pillars of XVI Art Direction

#### 1. CINEMATIC PRESENCE
Every page feels like entering a room designed by an architect. The hero is a wide shot. Sections are chambers. Scroll is a walkthrough.

- Hero: full-viewport, immersive, dark-to-light gradient
- Sections: generous breathing room (96-128px vertical padding)
- Content: editorial pacing, one thought per section

#### 2. EDITORIAL TYPOGRAPHY
Typography is the primary design element. Headlines are large, confident, and tightly set.

- Hero: 64-72px serif headlines, 1.05-1.15 line height
- Section titles: 40-48px, tight tracking
- Body: 16-18px, 1.618 line height (golden ratio)
- Eyebrow labels: 12-13px uppercase, tracked +0.1em, gold

#### 3. RESTRAINED LUXURY
Gold appears only where emphasis is needed. Navy anchors authority. White provides clarity.

- Gold: maximum 5% of viewport per section
- Navy: text, navigation, footer backgrounds
- White/light grey: cards, surfaces, breathing room
- No gradients except the hero ambient animation

#### 4. ARCHITECTURAL PRECISION
Every element aligns to the 8px grid. Every spacing value is intentional. The layout has visible rhythm.

- 8px base grid
- 12-column responsive system
- Consistent section padding (96px desktop, 64px mobile)
- Card grid: 24px gutters

#### 5. SILENT MOTION
Animations are so smooth they feel like natural movement. The user should never think "nice animation" — only "this feels right."

- Primary easing: cubic-bezier(0.16, 1, 0.3, 1)
- Scroll reveals: fadeUp(20px), 600ms
- Hover: translateY(-2px), 200ms
- No parallax on mobile
- Full prefers-reduced-motion support

### Visual Hierarchy Rule
The eye must always know where to go first, second, third.

1. Headline (largest, highest contrast)
2. Gold accent (eyebrow, CTA)
3. Supporting text (body, description)
4. Secondary elements (stats, links)
5. Decorative elements (patterns, geometry)

### Section Architecture
Every section follows this emotional arc:
```
EYEBROW (gold, tracked, small)
  ↓
HEADLINE (serif, large, navy)
  ↓
DESCRIPTION (sans, medium, graphite)
  ↓
CONTENT (cards, grid, visual)
  ↓
CTA (gold button or ghost link)
```

### Dark Section Rules
- Maximum 2 dark sections per page
- Dark sections use #0A1628 background
- Text is white or gold, never graphite
- Cards in dark sections use rgba(255,255,255,0.05) background
- Dark sections must be separated by at least 1 light section

### Light Section Rules
- Sections alternate between #F4F5F7 and #ECEEF2
- Cards are always #FFFFFF (white)
- No card backgrounds in grey — ever
- Section transitions are seamless (no dividers, just color shift)

## Competitive Differentiation

| Competitor | Their Signature | XVI's Counter |
|-----------|----------------|---------------|
| McKinsey | Sharp corners, monochrome, Inter font | Warm gold accents, serif headlines, rounded cards |
| Slalom | Blue monochrome, video heroes, Lora italic accents | Gold + navy duochrome, gradient mesh hero, no video |
| Artefact | Hot pink CTAs, IBM Plex, logo marquee | Executive gold CTAs, Playfair Display, curated partners |
| Apple | Black backgrounds, product worship, SF Pro | Navy backgrounds, concept worship, Playfair Display |
| Linear | Near-black, dot animations, monospace labels | Navy gradient, node network, tracked uppercase labels |
| Stripe | Indigo CTAs, gradient mesh, Sohne font | Gold CTAs, subtle gradient, Playfair + Inter |
| OpenAI | ChatGPT prompt hero, rounded cards, minimal | Meridian line hero, sharp + rounded mix, editorial |

## Design Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| Hero headline size | 64-72px | Matches Apple/Linear scale |
| Section padding | 96-128px | Premium breathing room |
| Card border-radius | 12px | Stripe's proven radius |
| Primary easing | cubic-bezier(0.16, 1, 0.3, 1) | Stripe's signature feel |
| Color palette | Navy + Gold + White | Luxury consulting signature |
| Typography pairs | Playfair Display + Inter | Serif authority + sans clarity |
| Maximum cards per row | 3 (desktop), 2 (tablet), 1 (mobile) | Clean hierarchy |
| Logo minimum size | 16px (favicon) to 32px (nav) | Scalable brand system |

---

*Created: July 2026*
*Version: 1.0*
*Phase: Art Direction*
