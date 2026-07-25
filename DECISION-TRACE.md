# XVI GROUP Logo System — Decision Trace

## Decision 1: Beveled metal bars instead of stroke-based lines

```json
{
  "decision": "XVI mark built from solid-filled paths with 45° bevels instead of SVG strokes",
  "reason": "The brief explicitly rejected 'simple SVG lines' and demanded 'beveled metal bars' — strokes cannot carry gradient fills across their cross-section, and round/square linecaps read as typed, not machined",
  "alternatives": [
    "SVG strokes with round linecaps (previous implementation)",
    "SVG strokes with square linecaps",
    "Single-path outlines with stroke-only rendering"
  ],
  "tradeoff": "More complex SVG (more path data), slightly larger file size, harder to edit manually — but the material quality is categorically different"
}
```

## Decision 2: 6px offset between X crossing strokes

```json
{
  "decision": "X's two diagonal bars are offset by 6px rather than perfectly centered",
  "reason": "Perfect centering reads as a typed character; the offset creates 'signature tension' — the visual equivalent of a hand-engraved mark where the cross point is slightly imperfect, signaling human craftsmanship at architectural scale",
  "alternatives": [
    "Perfectly centered X (symmetric crossing)",
    "3px offset (subtle)",
    "10px offset (dramatic)"
  ],
  "tradeoff": "The asymmetry may read as a 'mistake' at very small sizes; mitigated by the simplified favicon variant"
}
```

## Decision 3: Linear gradients instead of flat fills

```json
{
  "decision": "Bronze palette implemented as multi-stop linear gradients, not flat color fills",
  "reason": "The brief demanded 'brushed executive bronze' and 'Apple / Bang & Olufsen quality' — flat fills read as plastic; gradients simulate the anisotropic reflection of brushed metal, which is the material reference for this brand",
  "alternatives": [
    "Flat single-color fills (#C9A96E)",
    "Radial gradients (circular highlight)",
    "Mesh gradients (complex, not SVG-compatible)"
  ],
  "tradeoff": "Gradients may render slightly differently across browsers; radial/mesh would be less predictable. Linear is the safest compromise between material quality and rendering consistency"
}
```

## Decision 4: Plus Jakarta Sans weight 300 for typography

```json
{
  "decision": "Typography set to Plus Jakarta Sans weight 300 (Light) with 6-8px tracking",
  "reason": "The brief specified 'Replace Helvetica. Use Plus Jakarta Sans. Weight 300. Tracking between 6 and 9' — weight 300 communicates precision and restraint; heavier weights would compete with the mark's material presence",
  "alternatives": [
    "Weight 400 (Regular) — too neutral",
    "Weight 200 (Extra Light) — too fragile for executive context",
    "Helvetica Neue Light — rejected by brief"
  ],
  "tradeoff": "Light weight requires careful contrast management; fails WCAG AA for small body text. Reserved for display/logo use only"
}
```

## Decision 5: No decorative symbols or ornaments

```json
{
  "decision": "XVI mark is the only graphic device; no diamonds, stars, dots, or flourishes",
  "reason": "The brief explicitly rejected 'diamonds' and 'decorative symbols' — this brand's authority comes from material quality and geometric precision, not from ornamental devices. Porsche, IBM, and Braun marks have no decorative add-ons",
  "alternatives": [
    "Diamond accent at X intersection (previous implementation)",
    "Thin horizontal rule between mark and text",
    "Small registered trademark symbol"
  ],
  "tradeoff": "The mark may feel 'bare' compared to brands with decorative devices; this is intentional — restraint is the point"
}
```

## Decision 6: Separate gradient definitions for each bar orientation

```json
{
  "decision": "Left-diagonal bars, right-diagonal bars, and vertical bars each get their own gradient definition",
  "reason": "A single gradient applied to all bars would create inconsistent light direction — left diagonals would catch light differently than right diagonals in real brushed metal. Separate gradients simulate physically-correct anisotropic reflection",
  "alternatives": [
    "Single gradient applied to all paths",
    "Gradient defined once, rotated per-element",
    "No gradients (flat fills)"
  ],
  "tradeoff": "More gradient definitions (5 vs 1) increases SVG complexity; but the material realism justifies the overhead"
}
```

## Decision 7: Subtitle at 50% opacity

```json
{
  "decision": "Subtitle 'INTELLIGENCE. INTEGRATED. IMPACT.' rendered at 50% opacity rather than full bronze",
  "reason": "The brief demanded 'Smaller. Cleaner. Centered.' — opacity reduction creates visual hierarchy without changing color. Full-opacity subtitle would compete with the XVI mark for attention",
  "alternatives": [
    "Full opacity (#C9A96E)",
    "Lighter bronze (#E8C98A)",
    "Different font weight"
  ],
  "tradeoff": "Reduced opacity may fail contrast requirements on some backgrounds; the logo-dark variant uses a darker fill to compensate"
}
```

## Decision 8: I letter includes explicit bevel geometry

```json
{
  "decision": "I letter has three separate paths: main bar + top bevel + bottom bevel, instead of a single rectangle",
  "reason": "The brief demanded '45° precision cuts' — the bevel paths create the appearance of a chamfered metal bar catching light at the edges. A single rectangle reads as a rectangle, not as a machined bar",
  "alternatives": [
    "Single rectangle (simpler)",
    "Rounded ends (rejected by brief)",
    "No bevels (flat bar)"
  ],
  "tradeoff": "Three paths vs one; but the bevels are what distinguish 'machined' from 'typed'"
}
```

## Decision 9: App icon uses Deep Navy background

```json
{
  "decision": "App icon (512×512) uses #060A10 (Obsidian) background, not transparent",
  "reason": "App icons require a filled background for platform compliance (iOS, Android). Deep Navy maintains brand consistency while providing maximum contrast for the bronze mark",
  "alternatives": [
    "Transparent (not supported by app platforms)",
    "Warm Ivory (#FAF8F4) — too light for luxury positioning",
    "Executive Bronze (#C9A96E) — mark would disappear"
  ],
  "tradeoff": "Dark background limits use on dark app launchers; but the contrast benefit outweighs this edge case"
}
```

## Decision 10: Separate dark/light variants instead of CSS-only

```json
{
  "decision": "Three separate SVG files (logo.svg, logo-dark.svg, logo-light.svg) rather than a single SVG with CSS color variables",
  "reason": "SVGs embedded via <img> tags cannot access CSS variables. Separate files ensure consistent rendering across all contexts (email signatures, PDFs, social media) where CSS is unavailable",
  "alternatives": [
    "Single SVG with CSS custom properties",
    "SVG with currentColor (limited gradient support)",
    "Inline SVG with class-based switching"
  ],
  "tradeoff": "Three files to maintain instead of one; but guaranteed rendering consistency across all contexts"
}
```
