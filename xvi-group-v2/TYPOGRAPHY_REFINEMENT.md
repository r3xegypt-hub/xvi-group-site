# TYPOGRAPHY_REFINEMENT.md — XVI GROUP Typography System

> Large editorial headings. Perfect spacing. Elegant hierarchy. Premium rhythm.

## Typography Philosophy

Typography is the **primary design element** of XVI GROUP. The headline is not a label — it is a monument. The body text is not content — it is an invitation to read.

### Font Selections

#### English Heading: Playfair Display
- **Why:** High-contrast serif with editorial authority. Used by luxury brands, fashion magazines, and premium publications.
- **Weights used:** 400, 600, 700
- **Characteristics:** Elegant contrast between thick and thin strokes, refined serifs, classical proportions
- **Feel:** "This is a serious publication"

#### English Body: Inter
- **Why:** The gold standard for UI typography. Clean, readable, highly legible at small sizes. Used by Linear, McKinsey, and thousands of premium products.
- **Weights used:** 400, 500, 600
- **Characteristics:** Tall x-height, open counters, tabular numbers
- **Feel:** "This is modern, precise, and trustworthy"

#### Arabic Heading: Amiri
- **Why:** Traditional Arabic calligraphic style with the weight appropriate for authority. Designed by Khaled Hosny, based on Naskh calligraphy.
- **Weights used:** 400, 700
- **Characteristics:** Authentic Arabic calligraphy, proper ligatures, traditional proportions
- **Feel:** "This respects Arabic typographic heritage"

#### Arabic Body: Tajawal
- **Why:** Clean, modern Arabic sans-serif. Highly legible at small sizes. Pairs well with Amiri.
- **Weights used:** 400, 500, 700
- **Characteristics:** Modern Arabic design, wide character set, excellent screen rendering
- **Feel:** "This is contemporary and readable"

### Type Scale (Refined)

#### English Scale (Based on 1.333 Perfect Fourth)

| Level | Size | Line Height | Letter Spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| **Display** | `clamp(3rem, 6vw, 5rem)` | 1.05 | -0.03em | 700 | Hero headline, major statements |
| **H1** | `clamp(2.5rem, 5vw, 3.5rem)` | 1.1 | -0.02em | 700 | Page titles |
| **H2** | `clamp(2rem, 4vw, 2.625rem)` | 1.15 | -0.01em | 600 | Section headers |
| **H3** | `clamp(1.5rem, 3vw, 2rem)` | 1.2 | 0 | 600 | Subsection headers |
| **H4** | `clamp(1.25rem, 2vw, 1.5rem)` | 1.3 | 0 | 600 | Card titles |
| **Body Large** | `clamp(1.125rem, 1.75vw, 1.25rem)` | 1.618 | 0 | 400 | Lead paragraphs, intro text |
| **Body** | `clamp(1rem, 1.5vw, 1.125rem)` | 1.618 | 0 | 400 | Main text |
| **Body Small** | `0.875rem` | 1.5 | 0.01em | 400 | Secondary text |
| **Caption** | `0.75rem` | 1.4 | 0.02em | 400 | Legal, fine print |
| **Overline** | `0.75rem` | 1 | 0.12em | 500 | Eyebrow labels, categories |
| **Button** | `0.875rem` | 1 | 0.03em | 600 | Button text, CTAs |

#### Arabic Scale (Adjusted for Arabic script)

| Level | Size | Line Height | Letter Spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| **Display** | `clamp(2.5rem, 5.5vw, 4.5rem)` | 1.1 | 0 | 700 | Hero headline |
| **H1** | `clamp(2.25rem, 4.5vw, 3.25rem)` | 1.15 | 0 | 700 | Page titles |
| **H2** | `clamp(1.75rem, 3.5vw, 2.375rem)` | 1.2 | 0 | 600 | Section headers |
| **H3** | `clamp(1.375rem, 2.75vw, 1.875rem)` | 1.25 | 0 | 600 | Subsection headers |
| **H4** | `clamp(1.125rem, 2.25vw, 1.375rem)` | 1.35 | 0 | 600 | Card titles |
| **Body Large** | `clamp(1.125rem, 1.75vw, 1.25rem)` | 1.75 | 0 | 400 | Lead paragraphs |
| **Body** | `clamp(1rem, 1.5vw, 1.125rem)` | 1.75 | 0 | 400 | Main text |
| **Body Small** | `0.875rem` | 1.65 | 0 | 400 | Secondary text |
| **Caption** | `0.75rem` | 1.5 | 0 | 400 | Legal, fine print |
| **Overline** | `0.75rem` | 1.2 | 0.08em | 500 | Eyebrow labels |

### Typography Hierarchy Rules

#### The Rule of Three
Every text block contains exactly **three levels** of hierarchy:
1. **Display/Headline** — Captures attention
2. **Subheading** — Provides context
3. **Body** — Delivers content

Never use four levels in a single composition.

#### Headline Rules
1. **Maximum 8 words per headline** — If it needs more, it's a paragraph
2. **Maximum 3 lines on desktop** — If it needs more, rewrite
3. **Left-aligned on desktop** (EN) — Right-aligned (AR)
4. **Never centered on desktop** — Centered only on mobile
5. **Period at end = deliberate, confident** — "Strategy. Intelligence. Mastery."
6. **Serif font = authority** — Playfair Display carries editorial weight
7. **Tight line-height (1.05-1.15)** — Creates poster-like density
8. **Negative tracking (-0.02em to -0.03em)** — Feels precise and intentional

#### Body Text Rules
1. **Maximum line length: 65-75 characters** — Use `max-width: 65ch`
2. **Line-height: 1.618 (golden ratio)** — The mathematically perfect reading rhythm
3. **Paragraph spacing: 1.5× line-height** — If body is 28px, paragraph gap is 42px
4. **Left-aligned** — Never justified, never centered
5. **Sans-serif font** — Inter for clarity and modernity
6. **Regular weight (400)** — Never bold for entire paragraphs

#### Eyebrow Rules
1. **Small caps, tracked +0.12em** — Creates architectural feel
2. **Gold color** — Draws attention to category
3. **13px size** — Small enough to not compete with headline
4. **Above the headline** — Always precedes the main heading
5. **Maximum 3 words** — "OUR SERVICES", "CASE STUDY", "CONTACT US"

### Spacing Between Typographic Elements

| Element Pair | Gap | Reason |
|-------------|-----|--------|
| Eyebrow → Title | 8px | They belong together |
| Title → Description | 16px | Title leads, description follows |
| Description → Content | 32px | Transition from header to body |
| Body → Body | 24px | Paragraph separation |
| Body → Heading | 48px | Major topic shift |
| Heading → Content | 16px | Heading leads content |

### Weight Usage

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, descriptions, captions |
| Medium | 500 | Labels, navigation, eyebrows |
| Semibold | 600 | Card titles, button text, H2-H4 |
| Bold | 700 | Headlines (Display, H1), stat numbers |

**Never use:** Light (300), Thin (100), ExtraBold (800), Black (900)

### Letter Spacing

| Context | Value | Effect |
|---------|-------|--------|
| Eyebrow/Overline | +0.12em | Tracked, refined, editorial |
| Display headline | -0.03em | Very tight, cinematic |
| H1 headline | -0.02em | Tight, dense, authoritative |
| H2 headline | -0.01em | Slightly tight |
| Body | 0 | Natural, readable |
| Button text | +0.03em | Slightly open, clear |
| Caption | +0.02em | Slightly open, legible small |
| GROUP (in logo) | +0.15em | Very tracked, architectural |

### Reading Rhythm

The distance between headline and body creates reading rhythm:

```
HEADLINE (56px, 1.1 line-height = 62px box)
  ↕ 16px gap (breathing room)
BODY (18px, 1.618 line-height = 29px box)
  ↕ 24px gap (paragraph separation)
BODY (18px, 1.618 line-height = 29px box)
```

This rhythm is consistent across the entire site.

### Typography in Context

#### Hero
- Display headline: 64-72px, Playfair Display, 700, Navy, 1.05 line height
- Subheadline: 18px, Inter, 400, Graphite, 1.618 line height
- Eyebrow: 13px, Inter, 500, Gold, 1.4 line height, +0.12em tracking

#### Section Header
- Eyebrow: 13px, Inter, 500, Gold, 1.4, +0.12em
- Title: clamp(2rem, 4vw, 2.625rem), Playfair Display, 600, Navy, 1.15
- Description: 16px, Inter, 400, Graphite, 1.618

#### Card
- Title: clamp(1.25rem, 2vw, 1.5rem), Playfair Display, 600, Navy, 1.3
- Description: 16px, Inter, 400, Graphite, 1.618
- Meta: 14px, Inter, 400, Grey, 1.4

#### Navigation
- Nav items: 14px, Inter, 500, Navy
- Active: 14px, Inter, 500, Gold
- CTA button: 14px, Inter, 600, Navy on Gold

#### Footer
- Column headers: 14px, Inter, 600, White
- Links: 14px, Inter, 400, rgba(255,255,255,0.7)
- Legal: 12px, Inter, 400, rgba(255,255,255,0.5)

### Arabic Typography Rules

1. **Arabic text is always right-aligned**
2. **Arabic headings use Amiri (serif)** — calligraphic authority
3. **Arabic body uses Tajawal (sans)** — clean, modern
4. **Line-height: 1.75** — Arabic needs more vertical space
5. **Never mix Arabic and English in the same paragraph**
6. **Number rendering:** Arabic-Indic (٠١٢٣) OR Western (0123) — never mix

### Font Loading Strategy

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/playfair-display-v28.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-v13.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font display: swap for all fonts -->
<style>
  @font-face {
    font-family: 'Playfair Display';
    src: url('/fonts/playfair-display-v28.woff2') format('woff2');
    font-display: swap;
  }
</style>
```

### Typography Performance

| Metric | Target |
|--------|--------|
| Total font weight count | 8 (4 EN × 2 + 4 AR × 2) |
| Total font file size | < 200KB |
| Font loading strategy | Preload critical, swap for rest |
| Fallback font metrics | Matched to web font metrics |
| CLS from font loading | 0 |

---

*Created: July 2026*
*Version: 1.0*
*Phase: Art Direction — Typography Refinement*
