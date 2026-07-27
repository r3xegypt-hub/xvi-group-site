# XVI GROUP — BRAND GUIDELINES
> The complete reference for maintaining brand consistency.

---

## 1. BRAND ESSENCE

### Brand Statement
XVI GROUP is a strategy and technology advisory enterprise that empowers organizations to transform vision into measurable sovereign performance.

### Brand Values
1. **Precision.** Every detail matters. Every decision is deliberate.
2. **Intelligence.** We think before we act. We analyze before we advise.
3. **Sovereignty.** We build enterprises that control their own destiny.
4. **Excellence.** Good enough is never good enough.

### Brand Personality
- Executive
- Architectural
- Intelligent
- Premium
- Sovereign

### Brand Voice
| Attribute | We Are | We Are Not |
|-----------|--------|------------|
| Confident | Assured, authoritative | Arrogant, boastful |
| Technical | Precise, knowledgeable | Jargon-heavy, inaccessible |
| Premium | Refined, elevated | Pretentious, exclusive |
| Direct | Clear, concise | Abrupt, cold |

---

## 2. LOGO USAGE

### Primary Logo
The horizontal variant with diamond + XVI + separator + GROUP.

### Minimum Sizes
| Variant | Screen | Print |
|---------|--------|-------|
| Horizontal | 120px wide | 30mm wide |
| Vertical | 80px wide | 20mm wide |
| Icon | 16px | 8mm |
| Monogram | 48px | 12mm |

### Clear Space
Minimum clear space = height of the diamond mark on all sides.

### Logo on Backgrounds
| Background | Logo Variant |
|-----------|-------------|
| White/Light | Navy |
| Navy/Dark | White |
| Photography | White (80% opacity) |
| Gold accent | Navy |
| Grey | Navy |

---

## 3. COLOR USAGE

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Navy | #0A1628 | Headlines, dark sections, primary text |
| Gold | #C9A96E | Accents, overlines, highlights, CTAs |
| White | #FFFFFF | Cards, surfaces, primary background |

### Color Ratios
- **60%** — Backgrounds (white, warm white, light grey)
- **30%** — Navy (headlines, dark sections)
- **10%** — Gold (accents, highlights)

### Contrast Requirements
| Element | Ratio | Standard |
|---------|-------|----------|
| Body text on white | 7:1 | AAA |
| Headlines on white | 14:1 | AAA |
| Gold on white | 2.2:1 | Decorative only |
| White on navy | 14:1 | AAA |

---

## 4. TYPOGRAPHY USAGE

### Font Pairing
| Context | English | Arabic |
|---------|---------|--------|
| Headings | Playfair Display | Amiri |
| Body | Inter | Tajawal |
| Quotes | Playfair Display | Aref Ruqaa |
| Overlines | Inter | Tajawal |

### Hierarchy Rules
1. Maximum 4 type sizes per page section
2. Headlines always serif (Playfair/Amiri)
3. Body always sans-serif (Inter/Tajawal)
4. Overline always uppercase + tracked + gold
5. Gold only for emphasis, never body text

### Text Width Limits
| Element | Max Width |
|---------|-----------|
| Body text | 65ch (EN) / 55ch (AR) |
| Headlines | 800px |
| Overlines | No limit |
| Captions | 300px |

---

## 5. SPACING SYSTEM

### Base Unit: 8px
All spacing must be a multiple of 8px.

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| 2xs | 4px | Tight micro-spacing |
| xs | 8px | Icon-to-text, small gaps |
| sm | 16px | Card padding, inline spacing |
| md | 24px | Section inner spacing |
| lg | 32px | Component gaps |
| xl | 48px | Large component gaps |
| 2xl | 64px | Section padding (mobile) |
| 3xl | 96px | Section padding (desktop) |
| 4xl | 128px | Major section breaks |

### Section Spacing
| Context | Vertical Padding |
|---------|-----------------|
| Hero | 120px top, 80px bottom |
| Standard section | 96px top and bottom |
| Compact section | 64px top and bottom |
| Between sections | 0px (sections touch) |

### Component Spacing
| Component | Internal Spacing |
|-----------|-----------------|
| Card | 32-40px padding |
| Button | 16-32px horizontal padding |
| Input | 16px horizontal, 12px vertical |
| Nav | 24px between items |

---

## 6. BORDER & SHADOW

### Border Rules
| Context | Width | Color |
|---------|-------|-------|
| Cards | 1px | rgba(201, 169, 110, 0.12) |
| Inputs | 1px | #C8CDD5 |
| Inputs (focus) | 1.5px | #C9A96E |
| Dividers | 0.5px | rgba(10, 22, 40, 0.06) |
| Meridian line | 1.5px | #C9A96E |

### Shadow Rules
| Element | Shadow Level |
|---------|-------------|
| Resting card | level1 |
| Hovered card | level3 |
| Navigation | level2 |
| Dropdown | level4 |
| Modal | level5 |
| Button (hover) | level2 + gold tint |

### Border Radius
| Element | Radius |
|---------|--------|
| Cards | 12px |
| Buttons | 8px |
| Inputs | 8px |
| Avatars | 50% (circle) |
| Badges | 4px |
| Sections | 0px |

---

## 7. LAYOUT GRID

### Desktop (1601px+)
```
Columns: 12
Gutter: 24px
Margin: 120px
Max width: 1200px (content)
```

### Laptop (1366-1600px)
```
Columns: 12
Gutter: 24px
Margin: 80px
Max width: 1100px
```

### Tablet Landscape (1024-1365px)
```
Columns: 12
Gutter: 20px
Margin: 48px
Max width: 100%
```

### Tablet Portrait (768-1023px)
```
Columns: 8
Gutter: 16px
Margin: 32px
Max width: 100%
```

### Mobile (below 768px)
```
Columns: 4
Gutter: 16px
Margin: 16-20px
Max width: 100%
```

---

## 8. MOTION GUIDELINES

### Timing
| Action | Duration | Easing |
|--------|----------|--------|
| Micro-interaction | 150ms | cubic-bezier(0.16, 1, 0.3, 1) |
| State change | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Reveal | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Page transition | 800ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Ambient loop | 3-8s | ease-in-out |

### Rules
1. Never animate for more than 1200ms
2. Always use GPU-accelerated properties (transform, opacity)
3. Always respect prefers-reduced-motion
4. Maximum 5 concurrent animations
5. Never block scroll with animation

---

## 9. RESPONSIVE RULES

### Breakpoint Strategy
- Mobile-first CSS
- 7 device categories
- Content adapts, design system does not break

### Touch Targets
| Context | Minimum Size |
|---------|-------------|
| Mobile buttons | 44×44px |
| Mobile links | 44px height |
| Navigation items | 48px height |
| Form inputs | 48px height |

### Content Adaptation
| Element | Desktop | Mobile |
|---------|---------|--------|
| Headlines | 4-5rem | 2-2.5rem |
| Body | 1.125rem | 1rem |
| Cards per row | 2-4 | 1 |
| Navigation | Horizontal | Drawer |
| Footer columns | 4 | 1-2 |

---

## 10. ACCESSIBILITY

### Requirements
- All text meets WCAG AA contrast (4.5:1 body, 3:1 large text)
- All interactive elements have focus styles
- All images have alt text
- All animations respect reduced-motion
- Skip navigation link present
- Semantic HTML throughout
- ARIA labels on interactive elements

### Focus Styles
```css
:focus-visible {
  outline: 2px solid #C9A96E;
  outline-offset: 2px;
}
```

---

> **This document is the single source of truth for all XVI GROUP brand decisions.**
