# XVI GROUP Logo System — Structural Specification

## Mark Construction

### Geometry
- **Frame:** 600×200 viewBox for horizontal lockup
- **XVI Mark:** Left-aligned, 348×160 active area
- **GROUP text:** Right of mark, vertically centered to mark's optical center
- **Subtitle:** Centered below entire composition

### Beveled Metal Bar Construction

Each letter is built from individual solid-fill paths with 45° precision cuts:

**X Letter (2 bars):**
- Bar 1: Left-to-right diagonal, 24px width, 45° beveled ends
- Bar 2: Right-to-left diagonal, 24px width, offset 6px for signature tension

**V Letter (2 bars):**
- Bar 1: Left diagonal, 24px width, 45° beveled ends
- Bar 2: Right diagonal, 24px width, converging at base

**I Letter (1 bar + 2 bevels):**
- Main bar: Vertical, 24px width
- Top bevel: 45° cut, highlight gradient
- Bottom bevel: 45° cut, shadow gradient

### Gradient System

Brushed bronze simulation using linear gradients:

```
Primary Gradient (vertical bars):
  0%   → #E8C98A (highlight)
  25%  → #C9A96E (main)
  50%  → #E8C98A (highlight reflection)
  75%  → #C9A96E (main)
  100% → #8A6A36 (shadow)

Left Diagonal Gradient:
  0%   → #E8C98A
  50%  → #C9A96E
  100% → #8A6A36

Right Diagonal Gradient (reversed):
  0%   → #E8C98A
  50%  → #C9A96E
  100% → #8A6A36

Highlight Gradient (top bevels):
  0%   → #E8C98A
  100% → #C9A96E

Shadow Gradient (bottom bevels):
  0%   → #C9A96E
  100% → #6D532A
```

## Typography Specifications

### GROUP Text
- Font: Plus Jakarta Sans
- Weight: 300 (Light)
- Size: 64px (primary), scales proportionally
- Letter-spacing: 8px
- Fill: Bronze gradient (vertical)

### Subtitle
- Font: Plus Jakarta Sans
- Weight: 300 (Light)
- Size: 11px (primary), scales proportionally
- Letter-spacing: 4px
- Fill: #C9A96E at 50% opacity
- Text: "INTELLIGENCE. INTEGRATED. IMPACT."

## Asset Variants

### 1. logo.svg (Primary)
- Full horizontal lockup
- XVI mark + GROUP + subtitle
- Transparent background
- Bronze gradients

### 2. logo-dark.svg (Light backgrounds)
- Same composition
- Dark bronze (#1A1612) palette
- Optimized for white/ivory backgrounds

### 3. logo-light.svg (Dark backgrounds)
- Same composition
- White (#FFFFFF) palette with gradient depth
- Optimized for dark/navy backgrounds

### 4. favicon.svg (32×32 optimized)
- XVI mark only
- Simplified gradients
- No subtitle

### 5. app-icon.svg (512×512)
- XVI mark only, centered
- Deep Navy (#060A10) background
- 112px border radius
- Perfect padding (25% of frame)

### 6. og-image.svg (1200×630)
- Full lockup, centered
- Dark background with subtle bronze border
- Subtitle and URL included

### 7. PNG Exports
- logo.png (1×)
- logo@2x.png (2×)
- logo@4x.png (4×)
- favicon-16.png
- favicon-32.png
- apple-touch-icon.png (180×180)
- og-image.jpg (1200×630, 95% quality)

## Clear Space Rules

- Minimum clear space: 1.5× mark height on all sides
- Mark height reference: 160px in primary lockup
- Minimum clear space: 240px

## Minimum Sizes

- Full lockup: 200px width minimum
- XVI mark only: 32px width minimum
- Below 32px: Use simplified X only

## Color Specifications

### Primary Palette
| Name | Hex | Usage |
|------|-----|-------|
| Executive Bronze | #C9A96E | Primary accent, mark fill |
| Dark Bronze | #8A6A36 | Shadow, depth |
| Highlight Bronze | #E8C98A | Metallic highlights |
| Deep Shadow | #6D532A | Deepest shadows |

### Background Palette
| Name | Hex | Usage |
|------|-----|-------|
| Warm Ivory | #FAF8F4 | Light mode default |
| Deep Navy | #1A1F2C | Dark mode default |
| Obsidian | #060A10 | Darkest background |
