# XVI GROUP — NEW LOGO SYSTEM
> The geometric DNA of an enterprise brand.

---

## 1. LOGO PHILOSOPHY

The XVI GROUP logo is not drawn. It is **constructed**. Every vertex follows mathematical precision. The mark embodies architecture, intelligence, and sovereignty.

### Design Principles
1. **XVI is the identity.** The roman numeral is the primary mark.
2. **Geometry is the language.** Every angle is deliberate. Every proportion is calculated.
3. **The diamond is the frame.** It does not replace XVI. It elevates it.
4. **Minimalism is luxury.** What we remove defines us more than what we add.
5. **Pixel-perfect at every scale.** From 16px favicon to 4K display.

---

## 2. LOGO CONSTRUCTION

### The Grid
All logo variants are built on a **24×24 unit grid**. Every element aligns to this grid.

```
Unit: 1px at base scale (1x)
Scale factors: 1x (16px), 1.5x (24px), 2x (32px), 3x (48px), 4x (64px), 8x (128px)
```

### The Mark: Diamond Frame
```
Path: M12 1 L23 12 L12 23 L1 12 Z
Stroke: 1.5 units
No fill in outline variants
Fill: currentColor in solid variants
```

### The Text: "XVI"
```
Font: Custom geometric sans (or system sans-serif for implementation)
Weight: 700
Tracking: +0.08em
All caps
```

### The Wordmark: "XVI GROUP"
```
"XVI" — Weight 700, Tracking +0.08em
"GROUP" — Weight 400, Tracking +0.12em
Separator: Gold diamond glyph (◆) or meridian line
```

---

## 3. LOGO VARIANTS

### 3.1 Horizontal (Primary)
```
┌─────────────────────────────────┐
│  ◇  XVI  ◆  GROUP              │
└─────────────────────────────────┘
```
- Diamond icon + "XVI" + separator + "GROUP"
- Used in: Navigation, header, footer, documents
- Minimum width: 120px
- Height: 32px (desktop), 24px (mobile)

### 3.2 Vertical (Stacked)
```
┌───────────┐
│     ◇     │
│    XVI    │
│   GROUP   │
└───────────┘
```
- Diamond centered above, "XVI" below, "GROUP" below that
- Used in: Social media profiles, square formats, presentations
- Minimum height: 80px

### 3.3 Icon (Diamond Only)
```
┌─────┐
│  ◇  │
└─────┘
```
- Diamond mark only
- Used in: App icons, favicons (at small sizes), watermarks
- Minimum size: 16px
- Square aspect ratio

### 3.4 Monogram (XVI Only)
```
┌─────┐
│ XVI │
└─────┘
```
- "XVI" text only, no diamond
- Used in: Inline references, tight spaces, social handles
- Minimum width: 48px

### 3.5 Favicon
```
┌─────┐
│  ◇  │
└─────┘
```
- Diamond mark on navy (#0A1628) background
- 16×16, 32×32, 48×48 sizes
- Simplified geometry for legibility at small sizes
- Gold (#C9A96E) diamond on navy background

### 3.6 Dark Variant
```
Background: Navy (#0A1628)
Diamond: Gold (#C9A96E)
Text: White (#FFFFFF)
Separator: Gold (#C9A96E)
```
- Used on: Dark sections, CTA areas, footer, dark theme

### 3.7 Light Variant
```
Background: White (#FFFFFF) or Transparent
Diamond: Navy (#0A1628)
Text: Navy (#0A1628)
Separator: Navy (#0A1628)
```
- Used on: Light sections, white backgrounds, documents

### 3.8 Gold Variant
```
Background: Transparent
Diamond: Gold (#C9A96E)
Text: Gold (#C9A96E)
Separator: Gold (#C9A96E)
```
- Used on: Premium contexts, awards, special editions
- Also available: Gold on Navy background

### 3.9 Loader
```
┌─────────────┐
│             │
│     ◇      │  ← Diamond rotates + pulses
│             │
└─────────────┘
```
- Diamond mark only, centered
- Animation: Subtle rotation (360° over 2s) + opacity pulse (0.4→1→0.4)
- Easing: cubic-bezier(0.16, 1, 0.3, 1)
- Size: 48px (standard), 32px (compact)

### 3.10 Brand Stamp
```
┌───────────────────┐
│  ╔═══════════╗    │
│  ║    ◇      ║    │
│  ║   XVI     ║    │
│  ║  GROUP    ║    │
│  ║           ║    │
│  ║ Est. 2024 ║    │
│  ╚═══════════╝    │
└───────────────────┘
```
- Diamond + "XVI GROUP" + "Est. 2024"
- Bordered with architectural frame
- Used in: Certificates, formal documents, stamps
- Available in: Gold, Navy, White variants

---

## 4. LOGO CLEAR SPACE

### Minimum Clear Space
```
┌──────────────────────┐
│         x            │
│    ┌─────────┐       │
│  x │  LOGO   │ x     │
│    └─────────┘       │
│         x            │
└──────────────────────┘
```
- `x` = height of the diamond mark
- No other elements may enter this space

### Minimum Sizes
| Variant | Print | Screen |
|---------|-------|--------|
| Horizontal | 30mm wide | 120px wide |
| Vertical | 20mm wide | 80px wide |
| Icon | 8mm | 16px |
| Monogram | 12mm | 48px |
| Favicon | — | 16px |

---

## 5. LOGO ANIMATION

### Entrance Animation (Page Load)
```
Step 1: Diamond appears (scale 0→1, opacity 0→1) — 400ms
Step 2: "XVI" fades in (opacity 0→1, translateX -8→0) — 300ms
Step 3: "GROUP" fades in (opacity 0→1, translateX 8→0) — 300ms
Total: 1000ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
```

### Hover Animation (Navigation)
```
Diamond: rotate 45° over 300ms
Color: Navy → Gold (on light bg)
Easing: cubic-bezier(0.16, 1, 0.3, 1)
```

### Loader Animation
```
Diamond: rotate 360° over 2s, infinite
Opacity: pulse 0.4→1→0.4 over 2s, infinite
Easing: ease-in-out
```

---

## 6. INCORRECT USAGE

The following are **strictly prohibited**:

| ❌ Don't | Why |
|----------|-----|
| Stretch or distort the logo | Proportions are sacred |
| Rotate the logo (except loader) | Always upright |
| Add drop shadows to the logo | Flat and clean |
| Place on busy backgrounds | Always clear space |
| Change the logo colors | Use approved variants only |
| Recreate the logo in another font | Use provided SVG |
| Add effects (bevel, emboss, glow) | Minimal and clean |
| Separate diamond from XVI | They are a unit |
| Use at sizes below minimum | Legibility first |
| Animate the logo excessively | Subtle and dignified |

---

## 7. FILE FORMATS

### Provided Formats
| Format | Use Case | Sizes |
|--------|----------|-------|
| SVG | Web, responsive | Scalable |
| PNG | Documents, email | 1x, 2x, 4x |
| ICO | Favicon | 16, 32, 48px |
| PDF | Print | Vector |

### SVG File Structure
```
/logos/
  horizontal/
    xvi-logo-horizontal-navy.svg
    xvi-logo-horizontal-white.svg
    xvi-logo-horizontal-gold.svg
  vertical/
    xvi-logo-vertical-navy.svg
    xvi-logo-vertical-white.svg
    xvi-logo-vertical-gold.svg
  icon/
    xvi-icon-navy.svg
    xvi-icon-white.svg
    xvi-icon-gold.svg
  monogram/
    xvi-monogram-navy.svg
    xvi-monogram-white.svg
  favicon/
    xvi-favicon-16.svg
    xvi-favicon-32.svg
    xvi-favicon-48.svg
  stamp/
    xvi-stamp-navy.svg
    xvi-stamp-gold.svg
```

---

## 8. RESPONSIVE BEHAVIOR

| Breakpoint | Variant | Size |
|------------|---------|------|
| Desktop (>1366px) | Horizontal | 160×40px |
| Laptop (1024-1366px) | Horizontal | 140×36px |
| Tablet Landscape (768-1024px) | Horizontal | 130×32px |
| Tablet Portrait (640-768px) | Horizontal | 120×28px |
| Large Mobile (429-640px) | Icon + "XVI" | 28px icon |
| Medium Mobile (375-429px) | Icon only | 24px icon |
| Small Mobile (<375px) | Icon only | 20px icon |

### Navigation Behavior
- Desktop: Full horizontal logo
- Tablet: Horizontal logo, reduced size
- Mobile: Icon only (diamond + "XVI")
- Scroll: Logo shrinks from 40px → 32px height

---

## 9. BRAND COLOR ASSOCIATIONS

| Context | Logo Variant |
|---------|-------------|
| Light background | Navy logo |
| Dark background | White logo |
| Gold accent areas | Gold logo |
| Photography overlay | White logo with 80% opacity |
| Error/loading states | Navy logo (desaturated) |
| Print (B&W) | Black logo |

---

## 10. SVG CODE REFERENCE

### Diamond Mark (Core)
```svg
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 1L23 12L12 23L1 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
```

### Diamond Mark (Filled)
```svg
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 1L23 12L12 23L1 12Z" fill="currentColor"/>
</svg>
```

### Horizontal Logo
```svg
<svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Diamond -->
  <path d="M12 2L22 12L12 22L2 12Z" stroke="currentColor" stroke-width="1.5"/>
  <!-- XVI -->
  <text x="32" y="24" font-family="Inter, sans-serif" font-size="18" font-weight="700" letter-spacing="0.08em" fill="currentColor">XVI</text>
  <!-- Separator -->
  <circle cx="82" cy="12" r="1.5" fill="#C9A96E"/>
  <!-- GROUP -->
  <text x="92" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="400" letter-spacing="0.12em" fill="currentColor">GROUP</text>
</svg>
```

---

> **This document defines the logo system. Implementation in SVG code follows during the component build phase.**
