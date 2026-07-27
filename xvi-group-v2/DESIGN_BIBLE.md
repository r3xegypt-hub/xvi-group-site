# DESIGN BIBLE — XVI GROUP V2

> **This document is the law.** Every component, every page, every interaction must conform to this bible. If it's not in this document, it doesn't exist.

---

## TABLE OF CONTENTS

1. [Brand Philosophy](#1-brand-philosophy)
2. [Design Philosophy](#2-design-philosophy)
3. [Visual Language](#3-visual-language)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [Grid System](#6-grid-system)
7. [Spacing](#7-spacing)
8. [Layout Principles](#8-layout-principles)
9. [Navigation](#9-navigation)
10. [Hero Philosophy](#10-hero-philosophy)
11. [Cards](#11-cards)
12. [Buttons](#12-buttons)
13. [Forms & Inputs](#13-forms--inputs)
14. [Glass & Depth](#14-glass--depth)
15. [Animation & Motion](#15-animation--motion)
16. [Illustration Style](#16-illustration-style)
17. [Photography Style](#17-photography-style)
18. [Icon Language](#18-icon-language)
19. [Footer](#19-footer)
20. [Logo Philosophy](#20-logo-philosophy)
21. [Responsive Philosophy](#21-responsive-philosophy)
22. [Accessibility Philosophy](#22-accessibility-philosophy)
23. [Interaction Philosophy](#23-interaction-philosophy)
24. [i18n Architecture](#24-i18n-architecture)
25. [Performance Budget](#25-performance-budget)
26. [Visual DNA Reference](#26-visual-dna-reference)
27. [CSS Architecture (Phase 1.6)](#27-css-architecture-phase-16)

---

## 1. BRAND PHILOSOPHY

### Brand Essence
XVI GROUP is a strategy and technology advisory enterprise. We don't sell software. We don't sell websites. We sell **decision architecture** — the clarity that allows organizations to act with confidence.

### Brand Personality
| Trait | Expression |
|-------|-----------|
| **Executive** | We speak to decision-makers. Every word is precise. Every layout is intentional. |
| **Architectural** | Our layouts have structure. Our grid is visible in the rhythm. Nothing floats without reason. |
| **Luxury** | We use restraint as our luxury. The space we leave empty says more than what we fill. |
| **Minimal** | Zero decoration. Every element must justify its existence. If it doesn't serve a purpose, it's removed. |
| **Timeless** | We don't follow trends. We follow principles. In 5 years, this design will still feel right. |
| **Innovative** | We are modern without being trendy. We use technology to enhance, not to impress. |

### Brand Voice
- **Confident, not arrogant.** We know our value. We don't need to shout.
- **Precise, not cold.** Every sentence earns its place. But we are human.
- **Bilingual, not translated.** Arabic and English are both native. Neither is secondary.
- **Technical, not jargon-heavy.** We explain complex things simply.

### Brand Promise
> "Building trust before building solutions."
> "بناء الثقة قبل بناء الحلول."

---

## 2. DESIGN PHILOSOPHY

### Core Principle
**Restraint is the ultimate luxury.**

The most expensive things in the world — a Porsche 911, a Cartier Tank watch, a Dieter Rams Braun product — share one trait: they remove everything that isn't essential.

Our design follows the same principle:
- If an element doesn't serve a purpose, remove it
- If a color doesn't communicate meaning, remove it
- If an animation doesn't guide attention, remove it
- If a word doesn't add clarity, remove it

### Design Hierarchy
1. **Content first.** Typography and information architecture drive everything.
2. **Space as design element.** Whitespace is not empty — it is a deliberate choice.
3. **Color as accent, not decoration.** Gold appears only where emphasis is needed.
4. **Motion as guidance, not entertainment.** Every animation teaches the user something.

### Anti-Patterns (NEVER DO)
- Never use gradients as backgrounds (except subtle one-color fades)
- Never use drop shadows on text
- Never use centered body text (left-aligned for English, right-aligned for Arabic)
- Never use more than 3 font sizes per page section
- Never use animation that blocks user interaction
- Never use pop-ups or modals for marketing
- Never use cookie banners that cover the entire screen
- Never use auto-playing video with sound
- Never use stock photos of people shaking hands
- Never use parallax scrolling on mobile

---

## 3. VISUAL LANGUAGE

### Geometric Primitives
The visual language is built on three geometric primitives:

1. **The Rectangle** — Structure, stability, reliability. Used for cards, sections, navigation.
2. **The Line** — Direction, connection, precision. Used for dividers, borders, accent marks.
3. **The Circle** — Completeness, focus, global reach. Used for icons, avatars, the loader.

### Visual Metaphors
- **Architecture** — Our layouts feel like floor plans. Clear zones, clear circulation, clear purpose.
- **Light** — Our palette is built on light. Light backgrounds, light shadows, light that reveals.
- **Material** — Cards feel like physical objects. Buttons feel clickable. Depth is real, not decorative.

### What We Are NOT
- We are NOT a SaaS startup (no dark mode, no neon, no terminal aesthetics)
- We are NOT an agency (no playful illustrations, no gradient explosions)
- We are NOT a fintech (no data dashboards on the homepage, no real-time tickers)
- We ARE an institution. A place where decisions are made with clarity.

---

## 4. COLOR SYSTEM

### Primary Palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-bg` | Background | `#F4F5F7` | Page background |
| `--color-bg-secondary` | Secondary | `#ECEEF2` | Section alternation, subtle backgrounds |
| `--color-surface` | Surface | `#FFFFFF` | Cards, modals, floating elements |
| `--color-gold` | Executive Gold | `#C9A96E` | Accent, highlights, CTAs, active states |
| `--color-navy` | Deep Navy | `#0A1628` | Primary text, headers, navigation |
| `--color-graphite` | Graphite | `#5A6472` | Body text, secondary information |
| `--color-grey` | Luxury Grey | `#C8CDD5` | Borders, dividers, inactive states |

### Extended Palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-gold-light` | Gold Light | `#E8D5A8` | Hover states, subtle highlights |
| `--color-gold-dark` | Gold Dark | `#8A6A36` | Active states, pressed |
| `--color-navy-light` | Navy Light | `#1A2A44` | Secondary headings |
| `--color-bg-warm` | Warm White | `#FAFAF8` | Alternative background for hero |
| `--color-success` | Success | `#2D8A56` | Form validation, positive indicators |
| `--color-error` | Error | `#C4392D` | Form errors, critical alerts |

### Color Rules
1. **Gold never exceeds 5% of any viewport.** It is an accent, not a theme.
2. **Navy is for text and navigation only.** Never use as a background (except footer).
3. **White cards on grey backgrounds.** Never grey cards on white backgrounds.
4. **All text must meet WCAG AA contrast.** Navy on white = 14.7:1. Gold on navy = 5.2:1. Graphite on white = 5.8:1.
5. **Never use color alone to communicate state.** Always pair with icon, text, or shape change.

### Gradient Rules
- **Only one gradient is allowed:** A subtle vertical fade from `#F4F5F7` to `#ECEEF2` for section alternation.
- **No radial gradients.** No mesh gradients. No colorful gradients.
- **No gradient text.** Text is always solid color.

---

## 5. TYPOGRAPHY

### Font Stack

| Role | Font | Fallback | Weight |
|------|------|----------|--------|
| **Heading (EN)** | Playfair Display | Georgia, serif | 400, 600, 700 |
| **Body (EN)** | Inter | -apple-system, sans-serif | 400, 500, 600 |
| **Heading (AR)** | Amiri | Traditional Arabic, serif | 400, 700 |
| **Body (AR)** | Tajawal | Arial, sans-serif | 400, 500, 700 |

### Type Scale (Perfect Fourth — 1.333)

| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `--text-h1` | `clamp(2.5rem, 5vw, 3.5rem)` | 1.15 | -0.02em | Page titles |
| `--text-h2` | `clamp(2rem, 4vw, 2.625rem)` | 1.2 | -0.01em | Section headers |
| `--text-h3` | `clamp(1.5rem, 3vw, 2rem)` | 1.25 | 0 | Subsection headers |
| `--text-h4` | `clamp(1.25rem, 2vw, 1.5rem)` | 1.33 | 0 | Card titles |
| `--text-body` | `clamp(1rem, 1.5vw, 1.125rem)` | 1.618 (golden ratio) | 0 | Body text |
| `--text-small` | `0.875rem` | 1.43 | 0.01em | Captions, labels |
| `--text-caption` | `0.75rem` | 1.33 | 0.02em | Fine print, legal |

### Typography Rules
1. **Maximum 2 typefaces per language.** Serif for headings, sans-serif for body.
2. **Never use font-weight below 400.** Light text on light backgrounds is unreadable.
3. **Headlines are NEVER centered on desktop.** Left-aligned (EN) or right-aligned (AR).
4. **Body text is NEVER justified.** Left-aligned (EN) or right-aligned (AR).
5. **Maximum line length for body: 65-75 characters.** Use `max-width: 65ch` on text containers.
6. **Paragraph spacing: 1.5x the body line-height.** If body is 28px, paragraph gap is 42px.
7. **Bold is used sparingly.** Only for emphasis within a sentence, never for entire paragraphs.

### Arabic Typography Rules
1. **Arabic text is always right-aligned.**
2. **Arabic headings use Amiri (serif) — it has the calligraphic weight appropriate for authority.**
3. **Arabic body uses Tajawal (sans) — clean, modern, highly legible at small sizes.**
4. **Never mix Arabic and English in the same paragraph.** If referencing an English term, keep it in English but set in the English font.
5. **Arabic line-height should be 1.7-1.8** (Arabic script needs more vertical space than Latin).

---

## 6. GRID SYSTEM

### Base Grid: 8px

All measurements are multiples of 8. This is non-negotiable.

### Column System

| Breakpoint | Width | Columns | Gutter | Margin |
|-----------|-------|---------|--------|--------|
| Mobile | < 640px | 4 | 16px | 16px |
| Tablet | 640-1024px | 8 | 24px | 32px |
| Desktop | 1024-1440px | 12 | 32px | auto (max 1200px) |
| Wide | > 1440px | 12 | 32px | auto (max 1200px) |

### Content Width
- **Maximum content width: 1200px.** This is the reading zone. Beyond this, the eye loses focus.
- **Full-bleed sections** extend to viewport width but content stays within 1200px.
- **Narrow content (articles, forms): max-width 720px** — optimal reading width.

### Grid Rules
1. **Never break the 8px grid.** If a value isn't a multiple of 8, round to the nearest one.
2. **Consistency over aesthetics.** If the grid says 32px, use 32px — even if 28px "looks better."
3. **Vertical rhythm is sacred.** Sections repeat the same internal spacing pattern.

---

## 7. SPACING

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-2xs` | `4px` | Inline icon spacing |
| `--space-xs` | `8px` | Tight grouping |
| `--space-sm` | `16px` | Small gaps, padding |
| `--space-md` | `24px` | Component internal |
| `--space-lg` | `32px` | Between related items |
| `--space-xl` | `48px` | Between subsections |
| `--space-2xl` | `64px` | Between sections |
| `--space-3xl` | `96px` | Major section breaks |
| `--space-4xl` | `128px` | Page-level breathing |

### Spacing Rules
1. **Sections always have 96px top and bottom padding on desktop.** This is the breathing room that makes content feel premium.
2. **Cards always have 24px internal padding.** This is the minimum for comfortable reading.
3. **Between cards in a grid: 24px.** Not 16 (too tight), not 32 (too loose).
4. **Headings always have 16px margin below, never above.** The heading belongs to the content below it, not the content above.
5. **Lists always have 8px between items.** This creates visual grouping.

---

## 8. LAYOUT PRINCIPLES

### Section Architecture
Every section follows this structure:

```
┌─────────────────────────────────────┐
│         Section Padding (96px)       │
│  ┌─────────────────────────────┐    │
│  │    Section Header            │    │
│  │    (Eyebrow + Title + Desc)  │    │
│  │    Max-width: 640px          │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │    Section Content           │    │
│  │    (Grid / Cards / Text)     │    │
│  │    Max-width: 1200px         │    │
│  └─────────────────────────────┘    │
│                                     │
│         Section Padding (96px)       │
└─────────────────────────────────────┘
```

### Section Header Pattern
Every section header contains:
1. **Eyebrow** — Small caps, gold color, letter-spacing: 0.1em. Example: "OUR SERVICES"
2. **Title** — Large serif heading. Max-width: 640px. Left-aligned.
3. **Description** — 1-2 sentences of body text. Max-width: 560px.

### Content Layout Patterns
1. **Two-column (60/40)** — Text left, visual right. For hero sections, feature descriptions.
2. **Three-column grid** — Equal columns. For services, features, team members.
3. **Four-column grid** — Equal columns. For statistics, quick facts.
4. **Single column centered** — For articles, forms, legal content. Max-width: 720px.
5. **Full-bleed** — For visual sections that need to span the viewport. Content still within 1200px.

### Vertical Rhythm
Sections alternate between two background colors:
- Section 1: `#F4F5F7` (Background)
- Section 2: `#ECEEF2` (Secondary)
- Section 3: `#F4F5F7` (Background)
- ... and so on

This creates a subtle visual rhythm that guides the eye down the page.

---

## 9. NAVIGATION

### Desktop Navigation
```
┌──────────────────────────────────────────────────────────────┐
│  [Logo]     Home  Services  About  Industries  Insights     │
│                                                  [Contact]  │
└──────────────────────────────────────────────────────────────┘
```

- **Height: 72px.** Fixed position. Always visible.
- **Background: white with subtle bottom border (`1px solid #ECEEF2`).**
- **Logo height: 32px.** Positioned left with 32px padding.
- **Nav items: 16px font-size, 500 weight, 32px gap between items.**
- **CTA button: Gold background, navy text, 40px height, 16px horizontal padding.**
- **Hover state: underline slides in from left (200ms ease).**
- **Active state: Gold color.**

### Mobile Navigation
- **Bottom tab bar** with 4 primary actions: Home, Services, About, Contact.
- **Height: 64px.** Fixed bottom position.
- **Background: white with top border.**
- **Icons: 24px, stroke-only style.**
- **Active: Gold color. Inactive: Graphite color.**
- **No hamburger menu.** All primary pages accessible from tab bar.
- **Secondary pages accessible from a "More" overlay** (swipe up from tab bar).

### Navigation Rules
1. **No transparent-to-solid transition.** The nav is always solid.
2. **No dropdown menus on mobile.** Only on desktop.
3. **Mega-menu for Services:** Shows all 4 service categories with brief descriptions.
4. **Search is always accessible** via a search icon in the top nav.
5. **Language toggle is always accessible** — "EN | AR" in the top nav.

---

## 10. HERO PHILOSOPHY

### The 3-Second Rule
The hero must communicate the entire value proposition in 3 seconds or less. If the user has to scroll, read, or think to understand what XVI GROUP does, the hero has failed.

### Hero Structure
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  EYEBROW (Gold, Small Caps)                         │
│  DECISION ARCHITECTURE                              │
│                                                     │
│  TITLE (Serif, 56px)                                │
│  Strategy. Intelligence.                            │
│  Operational Mastery.                               │
│                                                     │
│  SUBTITLE (Sans, 18px, Graphite)                    │
│  A world-class advisory enterprise empowering       │
│  organizations to transform vision into             │
│  measurable sovereign performance.                  │
│                                                     │
│  [CTA Button]          Secondary Link               │
│                                                     │
│  STATS ROW (4 items)                                │
│  4 Advisory Suites | 24/7 Support | +40% Efficiency │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Hero Rules
1. **One headline. One subheadline. One primary CTA.** Nothing else.
2. **No animation on initial load.** Content appears instantly.
3. **Background: subtle gradient or solid color.** No images, no video, no 3D.
4. **The headline must be readable in under 2 seconds.** Maximum 8 words.
5. **The subheadline explains HOW, not WHAT.** The headline says what we do. The subheadline says how we do it differently.
6. **Stats row appears below the fold** — after the user has absorbed the hero message.

---

## 11. CARDS

### Card Anatomy
```
┌──────────────────────────┐
│                          │
│  [Icon or Eyebrow]       │
│                          │
│  Card Title              │
│  (H4, Serif, 24px)       │
│                          │
│  Card Description        │
│  (Body, Sans, 16px)      │
│  2-3 lines max           │
│                          │
│  [Optional: Link/Cta]    │
│                          │
└──────────────────────────┘
```

### Card Properties
- **Background:** `#FFFFFF`
- **Border-radius:** `12px`
- **Padding:** `24px` (all sides)
- **Shadow:** `0 1px 3px rgba(10, 22, 40, 0.06)` (resting state)
- **Shadow:** `0 8px 24px rgba(10, 22, 40, 0.1)` (hover state)
- **Transition:** `all 200ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Hover:** `translateY(-2px)` + shadow elevation

### Card Rules
1. **No background images with text overlay.** This kills readability.
2. **Maximum 4 cards in a row.** If more, use pagination or filtering.
3. **Cards in a row must have equal height.** Use CSS Grid, not flexbox.
4. **Card titles are always left-aligned.** Never centered.
5. **Card descriptions are maximum 3 lines.** Use `line-clamp: 3`.
6. **No cards within cards.** This creates confusing hierarchy.

### Card Variants
1. **Service Card** — Icon + Title + Description + "Learn more" link
2. **Industry Card** — Title + Description + subtle background pattern
3. **Insight Card** — Eyebrow + Title + Meta (date, read time) + thumbnail
4. **Team Card** — Avatar + Name + Title + Department
5. **Stat Card** — Large number + Label + optional trend indicator

---

## 12. BUTTONS

### Button Anatomy
- **Height:** 48px (default), 40px (compact), 56px (large)
- **Padding:** 0 24px (horizontal)
- **Border-radius:** 8px
- **Font-size:** 16px
- **Font-weight:** 600
- **Letter-spacing:** 0.02em

### Button Variants

| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| **Primary** | `#C9A96E` | `#0A1628` | none | Main CTA, form submit |
| **Secondary** | `transparent` | `#0A1628` | `1px solid #C8CDD5` | Secondary actions |
| **Ghost** | `transparent` | `#C9A96E` | none | Text links, tertiary actions |
| **Danger** | `#C4392D` | `#FFFFFF` | none | Destructive actions |

### Button States
- **Resting:** As defined above
- **Hover:** Background darkens 5%, shadow appears (`0 2px 8px rgba(10, 22, 40, 0.12)`), `translateY(-1px)`
- **Active/Pressed:** Background darkens 10%, `translateY(0)`, shadow reduces
- **Disabled:** Opacity 0.4, cursor not-allowed, no hover effect
- **Loading:** Text replaced with spinner, width maintained

### Button Rules
1. **Maximum one primary button per section.** Multiple primary buttons create confusion.
2. **Button text is always a verb or action phrase.** "Get Started" not "Learn More About Our Services."
3. **Button text is maximum 4 words.** If it needs more words, it's a link, not a button.
4. **Icon buttons always have a label** — even if visually hidden (aria-label).
5. **Button corners are 8px.** Not 4 (too sharp), not 16 (too playful), not 0 (too harsh).

---

## 13. FORMS & INPUTS

### Input Anatomy
```
┌──────────────────────────────────────┐
│  Label (14px, Graphite, 500 weight)  │
│  ┌────────────────────────────────┐  │
│  │  Placeholder text              │  │
│  └────────────────────────────────┘  │
│  Helper text (12px, Grey)            │
└──────────────────────────────────────┘
```

### Input Properties
- **Height:** 48px
- **Border:** `1px solid #C8CDD5`
- **Border-radius:** 8px
- **Padding:** 0 16px
- **Font-size:** 16px (prevents zoom on iOS)
- **Background:** `#FFFFFF`

### Input States
- **Resting:** Border `#C8CDD5`, background white
- **Focus:** Border `#C9A96E` (gold), subtle gold glow (`0 0 0 3px rgba(201, 169, 110, 0.15)`)
- **Error:** Border `#C4392D`, error message below in red
- **Disabled:** Background `#F4F5F7`, border `#ECEEF2`, text `#C8CDD5`

### Form Rules
1. **Labels are always visible.** No placeholder-only labels.
2. **Labels are above inputs, not beside them.** This is faster to scan.
3. **One column for forms.** Two-column forms increase error rates by 40%.
4. **Submit button is always full-width on mobile.** Minimum 48px height for touch targets.
5. **Error messages appear below the input,** not in a modal or toast.
6. **Success messages appear inline,** with a green checkmark.

---

## 14. GLASS & DEPTH

### Depth System
Depth is created through shadow, not through 3D transforms or parallax.

| Level | Shadow | Usage |
|-------|--------|-------|
| **Level 0** | none | Background elements |
| **Level 1** | `0 1px 3px rgba(10, 22, 40, 0.06)` | Cards (resting) |
| **Level 2** | `0 4px 12px rgba(10, 22, 40, 0.08)` | Cards (hover), dropdowns |
| **Level 3** | `0 8px 24px rgba(10, 22, 40, 0.1)` | Modals, popovers |
| **Level 4** | `0 16px 48px rgba(10, 22, 40, 0.12)` | Navigation (on scroll) |

### Glass Effects
Glass effects are used sparingly — only for overlays and floating elements:

- **Backdrop-filter:** `blur(12px)` + `saturate(180%)`
- **Background:** `rgba(255, 255, 255, 0.85)`
- **Border:** `1px solid rgba(255, 255, 255, 0.5)`

### Glass Rules
1. **Glass is only for overlays.** Never for cards or sections.
2. **Glass requires a visible background behind it.** If the background is the same color, glass is pointless.
3. **Maximum one glass layer at a time.** Stacking glass creates visual noise.
4. **Glass must have sufficient contrast.** Test with the content behind it.

---

## 15. ANIMATION & MOTION

### Animation Principles
1. **Purpose-driven.** Every animation must answer: "What does this teach the user?"
2. **Subtle.** If the user notices the animation, it's too much.
3. **Consistent.** Same duration, same easing, same behavior across the entire site.
4. **Respectful.** Never animate without `prefers-reduced-motion` support.

### Animation Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `150ms` | Button states, toggle |
| `--duration-normal` | `200ms` | Hover effects, focus |
| `--duration-slow` | `300ms` | Page transitions, reveals |
| `--duration-slower` | `600ms` | Scroll reveals, section entrances |
| `--easing-default` | `cubic-bezier(0.16, 1, 0.3, 1)` | Most interactions |
| `--easing-in-out` | `cubic-bezier(0.45, 0, 0.55, 1)` | Page transitions |
| `--easing-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interactions (use sparingly) |

### Allowed Animations
1. **Scroll reveal:** Fade up + translate 20px. Stagger 100ms between items.
2. **Hover elevation:** Shadow + translateY(-2px). 200ms.
3. **Link underline:** Width animation from 0 to 100%. 200ms.
4. **Page transition:** Opacity crossfade. 300ms.
5. **Form focus:** Border color + glow. 200ms.
6. **Loader:** Minimal geometric animation. No spinners.

### Forbidden Animations
- Typing effects
- Letter-by-letter reveal
- Parallax scrolling (especially on mobile)
- 3D rotations
- Particle systems
- Morphing shapes
- Auto-playing carousels
- Infinite loops (except loader)
- Scroll-jacking
- Scale on hover (causes layout shift)

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 16. ILLUSTRATION STYLE

### Style Direction
- **Geometric, not organic.** Straight lines, clean curves, mathematical precision.
- **Monochrome or duochrome.** Navy + Gold, or Navy + Grey. Never full-color.
- **Abstract, not literal.** No people, no buildings, no objects. Shapes that suggest concepts.
- **Minimal.** Maximum 5-7 elements per illustration. If it needs a legend, it's too complex.

### Illustration Use Cases
1. **Service icons** — Simple line icons, 48px, stroke-only
2. **Section backgrounds** — Subtle geometric patterns at 5% opacity
3. **Empty states** — Minimal illustrations with a message
4. **Error pages** — The 404 page illustration

### Illustration Rules
1. **Never use illustration in the hero.** The hero is text-only.
2. **Illustration never competes with content.** It's always background or supplementary.
3. **All illustrations are SVG.** No raster images for illustrations.
4. **Stroke width: 1.5px for icons, 2px for illustrations.**

---

## 17. PHOTOGRAPHY STYLE

### Style Direction
- **Architectural, not portrait.** Buildings, spaces, geometry, light.
- **Muted tones.** Desaturated, high contrast, cool undertones.
- **Wide aspect ratios.** 16:9 or 21:9. Never square, never portrait.
- **Empty spaces.** No people. If people are necessary, show them from behind or at a distance.

### Photography Use Cases
1. **Section backgrounds** — Full-bleed with overlay (50% opacity navy or white)
2. **Case study headers** — Architectural shot related to the industry
3. **About page** — Office/workspace architecture

### Photography Rules
1. **Always use WebP format** with JPG fallback.
2. **Always lazy-load** images below the fold.
3. **Always provide srcset** for responsive images.
4. **Maximum file size: 200KB per image.** Use Sharp or similar for optimization.
5. **Never use stock photos of people.** This is the fastest way to destroy trust.

---

## 18. ICON LANGUAGE

### Icon Properties
- **Style:** Stroke-only (no fills except for specific indicators)
- **Stroke width:** 1.5px
- **Size:** 24px (default), 20px (compact), 32px (large)
- **Color:** Inherit from parent (usually Navy or Graphite)
- **Corner radius:** Round line caps and joins

### Icon Library
Use a custom SVG icon set or Lucide Icons (which match the stroke-only aesthetic).

### Icon Rules
1. **Icons always have a text label** — either visible or in aria-label.
2. **Icons never stand alone without context.** Always paired with text.
3. **Icons use the same color as their associated text.**
4. **Maximum 2 icons per card.** More than that is visual noise.
5. **Icons are not decorative.** If an icon doesn't add meaning, remove it.

---

## 19. FOOTER

### Footer Structure
```
┌─────────────────────────────────────────────────────────────┐
│  Background: #0A1628 (Deep Navy)                            │
│  Padding: 96px top, 48px bottom                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  XVI GROUP                                           │   │
│  │  Strategy. Intelligence. Operational Mastery.        │   │
│  │  (Serif, 32px, White)                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Services  │ │Industries│ │ Company  │ │ Contact  │      │
│  │ AI Trans  │ │Technology│ │ About    │ │ Email    │      │
│  │ Business  │ │Finance   │ │ Team     │ │ Phone    │      │
│  │ Technology│ │Health    │ │ Careers  │ │ Location │      │
│  │ Executive │ │Energy    │ │ Insights │ │ LinkedIn │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                             │
│  ──────────────────────────────────────────────────────     │
│                                                             │
│  © 2026 XVI GROUP. All rights reserved.                     │
│  Privacy  Terms  Accessibility                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Footer Rules
1. **Background is always Deep Navy.** This is the only section that uses navy as a background.
2. **Text is white and grey.** Gold is used only for the company name.
3. **Footer columns are always 4 on desktop, stacked on mobile.**
4. **Social links are icons, not text.**
5. **Legal links are small (14px) and grey.**
6. **Footer is always the last thing on the page.** No infinite scroll past the footer.

---

## 20. LOGO PHILOSOPHY

### Logo Principles
1. **The wordmark IS the logo.** No abstract symbol. No monogram. The name is the identity.
2. **XVI is the mark.** In contexts where the full name is too long, "XVI" alone works.
3. **The logo must work at 16px and 1600px.** From favicon to billboard.
4. **The logo must work in one color.** Gold, Navy, White, Black — all must work.

### Logo Clear Space
- Minimum clear space: 1x the height of the "X" in XVI on all sides.
- The logo should never be smaller than 120px wide (horizontal) or 32px (icon only).

### Logo Variants
| Variant | Usage |
|---------|-------|
| **Horizontal (Dark)** | Default. Light backgrounds. |
| **Horizontal (Light)** | Dark backgrounds, navy sections. |
| **Horizontal (Gold)** | Premium contexts, presentations. |
| **Vertical** | Narrow spaces, social profiles. |
| **Icon (XVI)** | Favicon, app icon, small spaces. |
| **Monochrome** | When color isn't available. |

### Logo Rules
1. **Never stretch, skew, or rotate the logo.**
2. **Never add effects** (shadow, glow, gradient, 3D).
3. **Never place the logo on a busy background.** Always ensure sufficient contrast.
4. **Never animate the logo** (except the loader concept).
5. **Never recreate the logo** in a different font.

---

## 21. RESPONSIVE PHILOSOPHY

### Breakpoints
| Name | Width | Description |
|------|-------|-------------|
| Mobile | < 640px | Phone portrait |
| Tablet | 640-1024px | Tablet portrait, phone landscape |
| Desktop | 1024-1440px | Laptop, tablet landscape |
| Wide | > 1440px | External monitor |

### Responsive Rules
1. **Mobile-first design.** Start with the smallest screen, add complexity as space allows.
2. **Content never changes between breakpoints.** Only layout.
3. **Touch targets are minimum 48x48px on mobile.** No exceptions.
4. **Text never goes below 14px.** If it doesn't fit, rewrite it.
5. **Navigation transforms, not disappears.** Desktop nav becomes bottom tab bar.
6. **Cards stack vertically on mobile.** Never shrink horizontally.
7. **Images scale with viewport.** Never overflow or scroll horizontally.

### Mobile-Specific
- **Bottom tab bar** replaces top navigation
- **Full-width CTA buttons** (minimum 48px height)
- **Reduced section padding** (64px instead of 96px)
- **Single column layout** for all content
- **Swipe gestures** for carousels and galleries

---

## 22. ACCESSIBILITY PHILOSOPHY

### WCAG Compliance
Target: **WCAG 2.1 AA** minimum. **AAA** where possible.

### Core Principles
1. **Perceivable.** All content is available to all users, regardless of ability.
2. **Operable.** All interactions work with keyboard, mouse, and touch.
3. **Understandable.** Language is clear. Navigation is predictable.
4. **Robust.** Works across browsers, devices, and assistive technologies.

### Accessibility Rules
1. **All images have meaningful alt text.** Decorative images have `alt=""`.
2. **All form inputs have visible labels.** No placeholder-only labels.
3. **All interactive elements are keyboard accessible.** Visible focus indicators.
4. **Focus indicator:** `2px solid #C9A96E` (gold) with `2px` offset.
5. **Color contrast:** Minimum 4.5:1 for normal text, 3:1 for large text.
6. **Skip link:** "Skip to content" at the top of every page.
7. **ARIA labels** for all icon-only buttons and interactive elements.
8. **Language attribute** set on `<html>` element (`lang="en"` or `lang="ar"`).
9. **RTL support** via `dir="rtl"` attribute and CSS logical properties.
10. **Reduced motion** support via `prefers-reduced-motion` media query.

---

## 23. INTERACTION PHILOSOPHY

### Interaction Principles
1. **Immediate feedback.** Every user action produces a visible result within 200ms.
2. **Progressive disclosure.** Show the essential first. Let users drill down if they want more.
3. **Forgiving.** Users can undo, go back, and correct mistakes easily.
4. **Consistent.** Same interaction pattern for same type of action across the site.

### Interaction Patterns
- **Hover:** Shadow elevation + subtle translate. Information preview.
- **Click:** Page navigation or content reveal. Never both.
- **Scroll:** Content reveals progressively. Never scroll-jack.
- **Form submit:** Inline validation. Success/error message appears in place.
- **Search:** Instant results as user types. Minimum 3 characters.
- **Navigation:** No page refresh. Smooth transition between routes.

---

## 24. i18n ARCHITECTURE

### Language Support
- **English (EN)** — Default. Left-to-right.
- **Arabic (AR)** — Full native support. Right-to-left.

### Architecture
```
src/
  i18n/
    en/
      common.json
      home.json
      about.json
      services.json
      ...
    ar/
      common.json
      home.json
      about.json
      services.json
      ...
    index.ts       # i18n configuration
```

### i18n Rules
1. **Content files are separate.** No translation keys in code.
2. **Arabic content is written natively,** not translated from English.
3. **English content is written natively,** not translated from Arabic.
4. **Layout adapts for RTL:** Navigation mirrors, text aligns right, margins swap.
5. **CSS uses logical properties:** `margin-inline-start` instead of `margin-left`.
6. **Typography switches fonts** based on language: Playfair/Inter for EN, Amiri/Tajawal for AR.

---

## 25. PERFORMANCE BUDGET

### Targets
| Metric | Target | Measurement |
|--------|--------|-------------|
| **LCP** | < 1.5s | Largest Contentful Paint |
| **FID** | < 50ms | First Input Delay |
| **CLS** | < 0.05 | Cumulative Layout Shift |
| **TTI** | < 2.0s | Time to Interactive |
| **Total Bundle** | < 200KB | gzipped JavaScript |
| **Total CSS** | < 50KB | gzipped CSS |
| **Total Images** | < 500KB | above the fold |

### Performance Rules
1. **Code-split per route.** Only load what the current page needs.
2. **Lazy-load images** below the fold with `loading="lazy"`.
3. **Preload critical fonts** with `<link rel="preload">`.
4. **Use `font-display: swap`** to prevent invisible text.
5. **Minimize third-party scripts.** One analytics script, loaded async.
6. **Use HTTP/2** for parallel asset loading.
7. **Compress all assets** with Brotli or Gzip.
8. **Cache static assets** with long-lived Cache-Control headers.
9. **No render-blocking resources** in the critical path.
10. **Test on 3G network** — the site must be usable on slow connections.

---

## 26. VISUAL DNA REFERENCE

> For the complete visual identity system, see `VISUAL_DNA.md`.
> This section provides a summary of Phase 1.5 additions.

### Key Additions (Phase 1.5)

| Document | Purpose |
|----------|---------|
| **VISUAL_DNA.md** | Complete visual identity: Logo DNA, Visual Language, Hero DNA, Motion DNA, Geometry DNA, AI Illustration DNA, Lighting DNA, Color Usage, Typography DNA, Card System, Button System, Section Rhythm, Logo Concepts, Brand Patterns |

### Visual DNA Summary
- **Logo DNA:** Construction principles, geometry, stroke logic, optical balance, negative space, ratios, alignment, grid, safe area, minimum sizes, responsive behavior
- **Visual Language:** Six emotional pillars — Executive, Luxury, Architectural, Timeless, Confident, Intelligent
- **Hero DNA:** Camera feeling, composition, storytelling timeline, animation timing (exact ms), lighting, depth, visual hierarchy, emotion timeline (1s, 3s, 7s, 15s)
- **Motion DNA:** Complete motion inventory — hover, reveal, scroll, parallax, cards, buttons, navigation, loader, page transitions, SVG animation, mouse interaction, background movement
- **Geometry DNA:** Three primitives (Diamond, Meridian Line, Frame), compositions, golden proportions, grid rhythm
- **AI Illustration DNA:** Network/node/connection style, SVG stroke rules, animation rules
- **Lighting DNA:** Ambient lighting, glass reflections, shadow philosophy (5 levels), contrast strategy, gold/grey/white usage rules
- **Color Usage:** Emotional color rules, when to use gold/navy/grey/white/glass
- **Typography DNA:** Editorial hierarchy, executive hierarchy, reading rhythm, spacing, weights, letter spacing, Arabic/English behavior
- **Card System:** Complete anatomy, properties, glass variant, elevation states, shadow/animation rules
- **Button System:** Four variants (primary, secondary, ghost, icon), hover philosophy, complete state definitions
- **Section Rhythm:** Emotional goal per section, transition rules, rhythm pattern
- **Logo Concepts:** Five original concepts with SVG, construction logic, brand meaning, luxury/enterprise rationale
- **Brand Patterns:** Four patterns (Diamond Field, Meridian Grid, Nexus Field, Architectural Dot) with SVGs and usage rules

---

## CHECKPOINT

**Phase 01 + 1.5 complete when:**
- [x] DESIGN_DECISIONS.md exists and is comprehensive
- [x] DESIGN_BIBLE.md exists and is comprehensive
- [x] VISUAL_DNA.md exists and is comprehensive
- [x] Logo concepts are designed (5 directions with SVGs)
- [x] Logo asset family is complete (horizontal, vertical, icon, favicon, app-icon)
- [x] Brand patterns are designed (4 patterns with SVGs)
- [x] Design tokens are defined
- [x] Project structure is created
- [x] CSS Architecture defined (Phase 1.6)
- [x] SCSS foundation files created (Phase 1.6)
- [x] Component library documented (Phase 1.6)
- [x] Animation map complete (Phase 1.6)
- [x] Inspiration board analyzed (Phase 1.6)
- [ ] All stakeholders review and approve
- [ ] Phase 02 kickoff confirmed

**Do NOT proceed to Phase 02 without approval.**

---

## 27. CSS Architecture (Phase 1.6)

### 27.1 Technology Stack
- **CSS Preprocessor:** SCSS (Sass)
- **Architecture:** SCSS Modules + CSS Custom Properties + Design Tokens
- **NO utility frameworks:** No Tailwind, Bootstrap, Material UI
- **Component scoping:** BEM naming convention (`.xvi-block__element--modifier`)

### 27.2 Directory Structure
```
src/styles/
├── tokens/           # Design system tokens
│   ├── _colors.scss
│   ├── _typography.scss
│   ├── _spacing.scss
│   └── _animations.scss
├── layouts/          # Layout components
│   ├── _container.scss
│   ├── _grid.scss
│   ├── _section.scss
│   └── _hero.scss
├── components/       # Reusable UI components
│   ├── _buttons.scss
│   ├── _cards.scss
│   ├── _forms.scss
│   ├── _navigation.scss
│   ├── _footer.scss
│   └── _feedback.scss
├── sections/         # Page-specific sections
│   ├── _hero.scss
│   ├── _services.scss
│   ├── _about.scss
│   ├── _insights.scss
│   └── _contact.scss
├── animations/       # Animation definitions
│   ├── _keyframes.scss
│   ├── _scroll-reveal.scss
│   └── _transitions.scss
├── utilities/        # Utility classes
│   ├── _spacing.scss
│   ├── _text.scss
│   └── _accessibility.scss
├── themes/           # Theme variations
│   ├── _light.scss
│   └── _dark.scss
└── main.scss         # Entry point (imports all)
```

### 27.3 BEM Naming Convention
```
.xvi-block {}              // Component
.xvi-block__element {}     // Element
.xvi-block--modifier {}    // Modifier
.xvi-block__element--modifier {} // Element with modifier

Examples:
.xvi-card {}               // Card component
.xvi-card__title {}        // Card title
.xvi-card--service {}      // Service card variant
.xvi-card--case-study {}   // Case study variant
```

### 27.4 CSS Custom Properties (Tokens)
All design tokens are exposed as CSS custom properties on `:root` for runtime access:
```css
:root {
  --color-gold: #C9A96E;
  --font-heading: 'Poppins', sans-serif;
  --space-4: 1rem;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  /* ... all tokens */
}
```

### 27.5 SCSS Mixins
Reusable SCSS mixins for consistent styling:
- `@include heading-h1` through `@include heading-h6`
- `@include body-lg`, `@include body-base`, `@include body-sm`
- `@include overline`, `@include caption`
- `@include button-text`
- `@include container`, `@include section-padding`
- `@include grid`, `@include grid-columns($n)`
- `@include text-gold`, `@include bg-navy`, etc.

### 27.6 Animation Architecture
- **Scroll reveals:** `[data-reveal]` attribute-based, IntersectionObserver triggered
- **Stagger children:** `[data-reveal-stagger]` with CSS-generated delays (100ms increments)
- **Hover states:** All transitions use `$ease-out-quint` or `$ease-spring`
- **Entrance animations:** Hero elements use staggered delays (400ms-2200ms)
- **Reduced motion:** Full `prefers-reduced-motion` support disables all non-essential animation

### 27.7 Responsive Strategy
- **Mobile-first:** Base styles for mobile, `@media (min-width:)` for larger
- **Breakpoints:** 640px (tablet), 1024px (desktop), 1440px (wide)
- **Grid:** 12-column with 24px/32px/40px gutters
- **Typography:** Responsive type scale via mixins or media queries
- **Spacing:** Section padding reduces on mobile (80px → 120px desktop)

## 27. Art Direction (Phase 03)

### Reference Analysis

| Principle | Source | XVI Application |
|-----------|--------|-----------------|
| Massive editorial typography | Slalom (86px), Apple (64px), Linear (72px) | Hero at 64-72px, 1.05 line height |
| Near-black immersive backgrounds | Apple (#000), Linear (#08090a), Slalom (#000A25) | Navy sections for hero/key moments |
| Animated gradient meshes | Stripe (conic hero), OpenAI | Subtle gold-to-navy gradient animation |
| Glass morphism navigation | Linear (blur(32px)), Stripe (blur(20px)) | Frosted glass nav with navy tint |
| Bento grid layouts | Stripe (solutions), Linear (features) | Asymmetric card grids for services |
| Logo marquee social proof | Stripe, Artefact | Client/partner logo strip |
| Binary dot animations | Linear (grid dots) | Subtle node network in hero |
| Easing: cubic-bezier(0.16, 1, 0.3, 1) | Stripe signature | Primary easing for all XVI |

### Competitive Differentiation

| Competitor | Their Signature | XVI Counter |
|-----------|----------------|-------------|
| McKinsey | Sharp corners, monochrome, Inter | Warm gold, serif headlines, rounded cards |
| Slalom | Blue monochrome, video heroes | Gold+navy duochrome, gradient hero, no video |
| Artefact | Hot pink CTAs, IBM Plex | Executive gold CTAs, Playfair Display |
| Apple | Black bg, product worship, SF Pro | Navy bg, concept worship, Playfair Display |
| Linear | Near-black, dot animations, monospace | Navy gradient, node network, tracked labels |
| Stripe | Indigo CTAs, gradient mesh, Sohne | Gold CTAs, subtle gradient, Playfair+Inter |
| OpenAI | ChatGPT prompt hero, rounded | Meridian line hero, editorial typography |

### Design Targets

| Metric | Target |
|--------|--------|
| Hero headline | 64-72px, Playfair Display, 1.05 LH |
| Section padding | 96-128px vertical |
| Card border-radius | 12px |
| Primary easing | cubic-bezier(0.16, 1, 0.3, 1) |
| Color palette | Navy + Gold + White |
| Typography pairs | Playfair Display + Inter |
| Maximum cards/row | 3 (desktop), 2 (tablet), 1 (mobile) |

---

*Created: July 2026*
*Updated: July 2026 (Phase 1.6)*
*Version: 1.3*
*Phase 01 + 1.5 + 1.6 + Art Direction — Enterprise Research + Brand Strategy + Design System + Visual DNA + CSS Architecture + Art Direction*
