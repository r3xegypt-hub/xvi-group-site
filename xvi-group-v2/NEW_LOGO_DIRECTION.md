# NEW_LOGO_DIRECTION.md — XVI GROUP Premium Logo System

> The XVI identity is the primary logo. The geometric diamond enhances the mark, never replaces it.

## Design Philosophy

The XVI GROUP logo is **XVI first, always**. The diamond is an architectural frame that elevates the roman numeral — it does not replace it. The mark must clearly read "XVI" at every size.

### Core Principles
1. **XVI is the hero** — The letters are the primary visual element
2. **Diamond enhances** — The geometric frame adds architectural authority
3. **Cleaner geometry** — Every curve, every angle is mathematically defined
4. **Better proportions** — Golden Ratio governs all relationships
5. **Optical alignment** — Visual weight balanced, not just mathematical center
6. **Executive feeling** — The mark commands respect at any size
7. **Reads at 16px** — "XVI" must be legible even in the favicon

## Logo System

### The Mark: XVI Diamond Mark

The primary mark is a **geometric diamond/rhombus** shape containing the roman numeral XVI, constructed from precise architectural geometry.

#### Construction Grid
```
┌─────────────────────────────────┐
│           ╱  ╲                  │
│         ╱  XVI  ╲              │
│       ╱    ◇     ╲            │
│     ╱   Diamond    ╲          │
│       ╲   Mark    ╱           │
│         ╲       ╱             │
│           ╲   ╱               │
│             ╲╱                 │
│                                 │
│  Construction:                  │
│  - Bounding box: 48×48px       │
│  - Diamond inscribed in box    │
│  - XV I letters centered      │
│  - Stroke: 2px at full size    │
│  - Corners: Sharp (0px radius) │
└─────────────────────────────────┘
```

#### The Diamond Geometry
- Outer shape: Perfect rhombus (diamond) with 60° acute angles
- Inner space: Contains "XVI" in tracked sans-serif
- Stroke weight: 2px at 48px, scales proportionally
- The diamond represents: precision, intersection, the point where strategy meets execution

#### Typography Within Mark
- "XVI" set in Inter Medium (500 weight)
- Letter spacing: +0.1em (tracked, architectural)
- Color: Inherits from context (navy, white, or gold)
- The letters are optically centered, not mathematically centered

### Logo Variants

#### 1. Horizontal Lockup (Primary)
```
◇ XVI GROUP
─────────────────────
```
- Diamond mark + "XVI" + meridian line + "GROUP"
- "GROUP" in Inter Regular, tracked +0.15em
- Meridian line: 1.5px, Executive Gold (#C9A96E), extends 8px beyond text
- Total width: ~180px at standard nav size (32px height)

#### 2. Vertical Lockup
```
    ◇
   XVI
─────────
  GROUP
```
- Diamond centered above
- "XVI" centered below diamond
- Meridian line centered
- "GROUP" centered below meridian
- Usage: Social profiles, narrow spaces, favicons

#### 3. Icon Only (Diamond Mark)
```
    ◇
   ╱ ╲
  ╱   ╲
  ╲   ╱
   ╲ ╱
    ◇
```
- Pure diamond geometry
- No text
- Usage: Favicon, app icon, small spaces, watermarks
- Minimum size: 16×16px

#### 4. Wordmark Only
```
XVI GROUP
```
- No diamond mark
- "XVI" in Playfair Display Bold
- "GROUP" in Inter Medium, tracked +0.15em
- Meridian line between
- Usage: Large formats where mark is too small

### Color Variants

| Variant | Mark Color | Text Color | Background | Usage |
|---------|-----------|-----------|------------|-------|
| **Dark (Primary)** | #0A1628 (Navy) | #0A1628 | White/Light | Default light backgrounds |
| **Light (Inverted)** | #FFFFFF (White) | #FFFFFF | Navy/Dark | Dark sections, footer |
| **Gold (Premium)** | #C9A96E (Gold) | #0A1628 | White | Presentations, premium |
| **Gold on Navy** | #C9A96E (Gold) | #C9A96E | Navy | Dark premium contexts |
| **Mono Dark** | #000000 | #000000 | White | Print, single-color |
| **Mono Light** | #FFFFFF | #FFFFFF | Black | Single-color dark |

### Minimum Sizes

| Variant | Minimum Width | Minimum Height |
|---------|--------------|----------------|
| Horizontal lockup | 120px | 32px |
| Vertical lockup | 64px | 80px |
| Icon (full detail) | 32px | 32px |
| Favicon (simplified) | 16px | 16px |
| Wordmark | 100px | 24px |

### Clear Space
```
┌──────────────────────────────┐
│         ↕ 8px clear          │
│    ↔ 8px   [LOGO]   8px ↔   │
│         ↕ 8px clear          │
└──────────────────────────────┘
```
No other element may enter the 8px clear space zone around the logo.

### Responsive Behavior

| Breakpoint | Logo Size | Variant Used |
|-----------|-----------|-------------|
| Desktop (>1280px) | 32px height | Horizontal lockup |
| Laptop (1024-1280px) | 28px height | Horizontal lockup |
| Tablet (768-1024px) | 28px height | Horizontal lockup |
| Large Mobile (429-767px) | 24px height | Icon + XVI (compact) |
| Medium Mobile (375-428px) | 24px height | Icon + XVI (compact) |
| Small Mobile (<375px) | 20px height | Icon only |

### SVG Specifications

All logo variants are SVG with:
- `viewBox` based on construction grid
- No embedded fonts (text converted to paths)
- Single `<path>` for diamond mark
- `<text>` elements with font-family fallbacks
- `fill="currentColor"` for theme support
- `aria-label` for accessibility

### Favicon Specification
- Format: SVG (with PNG fallback at 32×32, 16×16)
- Simplified diamond mark only (no "XVI" text at 16px)
- Single color: Navy (#0A1628) or Gold (#C9A96E)
- Generated via `favicons` package or manual SVG

### App Icon Specification
- Format: SVG → exported to PNG at 1024×1024
- Diamond mark centered with 25% padding
- Navy background, gold mark (or inverse)
- Rounded corners: 22% (iOS standard)

### Logo Animation (Loader)
The logo animates in the loader sequence:
1. Diamond outline draws in (stroke-dashoffset, 600ms)
2. "XVI" text fades in (opacity 0→1, 300ms, 200ms delay)
3. Meridian line extends left-to-right (scaleX 0→1, 400ms, 400ms delay)
4. "GROUP" fades in (opacity 0→1, 300ms, 600ms delay)

Total animation: ~1.2 seconds
Easing: cubic-bezier(0.16, 1, 0.3, 1) for all elements

### Logo Do's and Don'ts

| Do | Don't |
|----|-------|
| Use the logo at specified minimum sizes | Stretch, skew, or rotate |
| Maintain clear space around logo | Add effects (shadow, glow, gradient) |
| Use approved color variants | Place on busy backgrounds |
| Use SVG for digital, PDF for print | Recreate in different fonts |
| Scale proportionally | Animate outside the loader |

---

*Created: July 2026*
*Version: 1.0*
*Phase: Art Direction — Logo Rebuild*
