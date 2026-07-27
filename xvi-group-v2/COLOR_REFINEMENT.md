# COLOR_REFINEMENT.md — XVI GROUP Refined Color System

> Warm luxury gray. Soft executive white. Deep navy. Premium gold. Everything elegant.

## Color Philosophy

The XVI GROUP color system is built on **restraint**. We use fewer colors than almost any competitor, and we use them more precisely.

### The Palette (Final)

#### Primary Colors

| Token | Name | Hex | RGB | HSL | Usage |
|-------|------|-----|-----|-----|-------|
| `--xvi-navy` | Deep Navy | `#0A1628` | 10, 22, 40 | 216°, 60%, 10% | Primary text, headers, nav, footer bg |
| `--xvi-gold` | Executive Gold | `#C9A96E` | 201, 169, 110 | 40°, 40%, 61% | Accent, CTAs, active states, eyebrows |
| `--xvi-white` | Pure White | `#FFFFFF` | 255, 255, 255 | 0°, 0%, 100% | Card surfaces, text on dark |

#### Surface Colors

| Token | Name | Hex | RGB | HSL | Usage |
|-------|------|-----|-----|-----|-------|
| `--xvi-bg` | Background | `#F4F5F7` | 244, 245, 247 | 220°, 12%, 96% | Primary page background |
| `--xvi-bg-secondary` | Secondary | `#ECEEF2` | 236, 238, 242 | 220°, 14%, 94% | Alternating section bg |
| `--xvi-surface` | Surface | `#FFFFFF` | 255, 255, 255 | 0°, 0%, 100% | Cards, floating elements |
| `--xvi-warm` | Warm White | `#FAFAF8` | 250, 250, 248 | 60°, 20%, 98% | Hero background |
| `--xvi-surface-elevated` | Elevated Surface | `#FFFFFF` | 255, 255, 255 | 0°, 0%, 100% | Modals, dropdowns |

#### Text Colors

| Token | Name | Hex | RGB | Opacity | Usage |
|-------|------|-----|-----|---------|-------|
| `--xvi-text-primary` | Primary Text | Navy | 10, 22, 40 | 100% | Headlines, primary content |
| `--xvi-text-secondary` | Secondary Text | Graphite | 90, 100, 114 | 100% | Body text, descriptions |
| `--xvi-text-tertiary` | Tertiary Text | Grey | 200, 205, 213 | 100% | Captions, labels, meta |
| `--xvi-text-on-dark` | Text on Dark | White | 255, 255, 255 | 100% | Footer text, dark sections |
| `--xvi-text-on-gold` | Text on Gold | Navy | 10, 22, 40 | 100% | Gold button text |

#### Accent Colors

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--xvi-gold-light` | Gold Light | `#E8D5A8` | 232, 213, 168 | Hover states, subtle highlights |
| `--xvi-gold-dark` | Gold Dark | `#8A6A36` | 138, 106, 54 | Active states, pressed |
| `--xvi-navy-light` | Navy Light | `#1A2A44` | 26, 42, 68 | Secondary headings |
| `--xvi-navy-muted` | Navy Muted | `rgba(10, 22, 40, 0.6)` | — | Subtle navy backgrounds |

#### Status Colors

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--xvi-success` | Success | `#2D8A56` | 45, 138, 86 | Form validation, positive |
| `--xvi-error` | Error | `#C4392D` | 196, 57, 45 | Form errors, critical |
| `--xvi-warning` | Warning | `#F39C12` | 243, 156, 18 | Caution states |
| `--xvi-info` | Info | `#3498DB` | 52, 152, 219 | Informational |

### Extended Palette (For Charts/Data Visualization)

| Color | Hex | Usage |
|-------|-----|-------|
| Navy 100 | `#0A1628` | Primary |
| Navy 80 | `#3A4A68` | Secondary |
| Navy 60 | `#6A7A98` | Tertiary |
| Navy 40 | `#9AAAB8` | Quaternary |
| Navy 20 | `#C8CDD5` | Quinary |
| Gold 100 | `#C9A96E` | Primary |
| Gold 80 | `#D4B87A` | Secondary |
| Gold 60 | `#DFCA96` | Tertiary |
| Gold 40 | `#E8D5A8` | Quaternary |
| Gold 20 | `#F4EAC8` | Quinary |

### Contrast Ratios

| Combination | Ratio | WCAG Rating |
|-------------|-------|-------------|
| Navy on White | 14.7:1 | AAA |
| Graphite on White | 5.8:1 | AA |
| Gold on Navy | 5.2:1 | AA |
| White on Navy | 14.7:1 | AAA |
| Navy on Gold | 5.2:1 | AA |
| Gold on White | 2.2:1 | **NOT for text** |

### Color Rules

1. **Gold never exceeds 5% of any viewport.** It is an accent, not a theme.
2. **Navy is for text, navigation, and footer backgrounds only.** Never use as a general background.
3. **White cards on grey backgrounds.** Never grey cards on white backgrounds.
4. **All text must meet WCAG AA contrast.** Test before shipping.
5. **Never use color alone to communicate state.** Always pair with icon, text, or shape change.
6. **No gradients except the hero ambient animation.** Flat colors everywhere else.
7. **No gradient text.** Text is always solid color.
8. **No neon, no bright colors, no saturation.** Muted, warm, elegant.

### Color Application by Section

| Section | Background | Text | Accents |
|---------|-----------|------|---------|
| **Hero** | #FAFAF8 gradient | Navy headline, Graphite body | Gold eyebrow, Gold stats |
| **Services** | #F4F5F7 | Navy titles, Graphite body | Gold icons |
| **About** | #ECEEF2 | Navy titles, Graphite body | Gold meridian line |
| **Technology** | #F4F5F7 | Navy titles, Graphite body | Gold node network |
| **Industries** | #ECEEF2 | Navy titles, Graphite body | — |
| **Insights** | #F4F5F7 | Navy titles, Graphite body | Gold category labels |
| **Testimonials** | #ECEEF2 | Navy quotes, Graphite attribution | Gold quotation marks |
| **Leadership** | #F4F5F7 | Navy names, Graphite titles | — |
| **Contact** | #ECEEF2 | Navy titles, Graphite body | Gold CTA |
| **Footer** | #0A1628 (Navy) | White text, Gold logo | Gold meridian line |

### Dark Section Rules
- Maximum 2 dark sections per page
- Dark sections use #0A1628 background
- Text is White or Gold, never Graphite
- Cards in dark sections use `rgba(255,255,255,0.05)` background
- Dark sections must be separated by at least 1 light section

### Light Section Rules
- Sections alternate between #F4F5F7 and #ECEEF2
- Cards are always #FFFFFF (white)
- No card backgrounds in grey — ever
- Section transitions are seamless (no dividers, just color shift)

### Color Tokens in CSS

```css
:root {
  /* Primary */
  --xvi-navy: #0A1628;
  --xvi-gold: #C9A96E;
  --xvi-white: #FFFFFF;
  
  /* Surfaces */
  --xvi-bg: #F4F5F7;
  --xvi-bg-secondary: #ECEEF2;
  --xvi-surface: #FFFFFF;
  --xvi-warm: #FAFAF8;
  
  /* Text */
  --xvi-text-primary: var(--xvi-navy);
  --xvi-text-secondary: #5A6472;
  --xvi-text-tertiary: #C8CDD5;
  --xvi-text-on-dark: var(--xvi-white);
  --xvi-text-on-gold: var(--xvi-navy);
  
  /* Accents */
  --xvi-gold-light: #E8D5A8;
  --xvi-gold-dark: #8A6A36;
  --xvi-navy-light: #1A2A44;
  
  /* Status */
  --xvi-success: #2D8A56;
  --xvi-error: #C4392D;
  --xvi-warning: #F39C12;
  --xvi-info: #3498DB;
}
```

---

*Created: July 2026*
*Version: 1.0*
*Phase: Art Direction — Color Refinement*
