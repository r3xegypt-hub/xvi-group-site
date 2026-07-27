# XVI GROUP — COLOR SYSTEM
> Every color has purpose. No flat appearance. Depth through layering.

---

## 1. COLOR PHILOSOPHY

The XVI color palette is **architectural**. Colors are not decorations — they are structural elements. Navy is the foundation. Gold is the accent. White is the space. Every other color exists in service of these three.

### Principles
1. **Three core colors.** Navy, Gold, White. Everything else supports them.
2. **Depth through opacity.** Never use flat colors. Always layer.
3. **Warmth through undertone.** Our whites are warm. Our greys have soul.
4. **Contrast with purpose.** High contrast for readability. Low contrast for atmosphere.

---

## 2. PRIMARY PALETTE

### Navy — "The Foundation"
```
Navy 900:    #0A1628   ← Primary. Headlines, dark sections, CTA backgrounds
Navy 800:    #0F1F38   ← Hover state, deeper sections
Navy 700:    #1A2A44   ← Surface (dark theme), card backgrounds
Navy 600:    #243650   ← Borders, subtle accents
Navy 500:    #2E4260   ← Disabled text on dark
Navy 400:    #3D5575   ← Subtle text on dark
Navy 100:    #E8ECF2   ← Very light tint, backgrounds
Navy 50:     #F2F4F8   ← Lightest tint
```

### Gold — "The Accent"
```
Gold 600:    #B89A60   ← Active/pressed state
Gold 500:    #C9A96E   ← PRIMARY. Overlines, highlights, accents
Gold 400:    #D4B87A   ← Hover state
Gold 300:    #DFC88F   ← Light hover
Gold 200:    #E8D5A8   ← Light backgrounds
Gold 100:    #F2E8D0   ← Very light background
Gold 50:     #FAF4E8   ← Lightest background
Gold Muted:  rgba(201, 169, 110, 0.08)   ← Badge backgrounds
Gold Glow:   rgba(201, 169, 110, 0.25)   ← Box shadows
```

### White — "The Space"
```
White:       #FFFFFF   ← Cards, surfaces, primary background
Warm White:  #FAFAF8   ← Hero bg, warm sections (slightly yellow undertone)
Soft White:  #F8F6F2   ← Alternative warm surface
```

---

## 3. NEUTRAL PALETTE

### Greys — "The Support"
```
Grey 900:    #1A1D23   ← Near-black text (rarely used)
Grey 800:    #2D3140   ← Dark text on light
Grey 700:    #3D4255   ← Secondary dark text
Grey 600:    #5A6472   ← BODY TEXT. Descriptions. Secondary content.
Grey 500:    #7A8494   ← Placeholder text, captions
Grey 400:    #9AA3B0   ← Disabled icons
Grey 300:    #C8CDD5   ← Borders, dividers
Grey 200:    #E0E3E8   ← Light borders, subtle dividers
Grey 100:    #F0F1F4   ← Backgrounds, hover states
Grey 50:     #F8F9FA   ← Lightest background
```

### Functional Colors
```
Success:     #2D8A56   ← Valid states, success messages
Error:       #C4392D   ← Error states, destructive actions
Warning:     #D4A017   ← Warning states (gold-tinted, not orange)
Info:        #3498DB   ← Informational messages
```

---

## 4. SURFACE SYSTEM

### Background Hierarchy
| Level | Color | Usage |
|-------|-------|-------|
| L0 — Page | #F4F5F7 | Default page background |
| L1 — Section | #FFFFFF | Card surfaces, elevated areas |
| L2 — Section Alt | #ECEEF2 | Alternating sections |
| L3 — Warm | #FAFAF8 | Hero, premium sections |
| L4 — Navy | #0A1628 | Dark sections, CTA, footer |
| L5 — Navy Light | #1A2A44 | Dark card surfaces |

### Glass Surface
```css
background: rgba(255, 255, 255, 0.72);
backdrop-filter: blur(20px) saturate(180%);
-webkit-backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.18);
```
- Used in: Navigation, floating elements, modals
- Blur: 20px (not more — too blurry loses context)

---

## 5. BORDER SYSTEM

### Border Colors
| Context | Color | Usage |
|---------|-------|-------|
| Default | rgba(201, 169, 110, 0.12) | Card borders, dividers |
| Hover | rgba(201, 169, 110, 0.25) | Interactive element borders |
| Focus | #C9A96E | Focus rings, active states |
| Subtle | rgba(10, 22, 40, 0.06) | Very light dividers |
| Strong | rgba(10, 22, 40, 0.12) | Prominent dividers |

### Border Widths
| Width | Usage |
|-------|-------|
| 0.5px | Subtle dividers, grid lines |
| 1px | Cards, buttons, inputs |
| 1.5px | Meridian line, borders |
| 2px | Focus rings, active states |

---

## 6. SHADOW SYSTEM

### Elevation Levels
```css
--shadow-0: none;
--shadow-1: 0 1px 3px rgba(10, 22, 40, 0.04), 0 1px 2px rgba(10, 22, 40, 0.06);
--shadow-2: 0 4px 12px rgba(10, 22, 40, 0.06), 0 2px 4px rgba(10, 22, 40, 0.04);
--shadow-3: 0 8px 24px rgba(10, 22, 40, 0.08), 0 4px 8px rgba(10, 22, 40, 0.04);
--shadow-4: 0 16px 48px rgba(10, 22, 40, 0.10), 0 8px 16px rgba(10, 22, 40, 0.06);
--shadow-5: 0 24px 64px rgba(10, 22, 40, 0.12), 0 12px 24px rgba(10, 22, 40, 0.08);
```

### Gold Shadows
```css
--shadow-gold-sm: 0 2px 8px rgba(201, 169, 110, 0.15);
--shadow-gold-md: 0 4px 16px rgba(201, 169, 110, 0.20);
--shadow-gold-lg: 0 8px 32px rgba(201, 169, 110, 0.25);
--shadow-gold-glow: 0 0 40px rgba(201, 169, 110, 0.15);
```

### Inner Shadows
```css
--shadow-inner: inset 0 1px 3px rgba(10, 22, 40, 0.06);
--shadow-inner-gold: inset 0 0 0 1px rgba(201, 169, 110, 0.12);
```

---

## 7. GRADIENT SYSTEM

### Background Gradients
```css
/* Hero — Warm to neutral */
--gradient-hero: linear-gradient(135deg, #FAFAF8 0%, #F4F5F7 50%, #ECEEF2 100%);

/* Dark section — Navy depth */
--gradient-navy: linear-gradient(135deg, #0A1628 0%, #0F1F38 50%, #0A1628 100%);

/* Gold sweep — Ambient light */
--gradient-gold-sweep: linear-gradient(90deg, transparent 0%, rgba(201, 169, 110, 0.06) 40%, rgba(201, 169, 110, 0.09) 50%, rgba(201, 169, 110, 0.06) 60%, transparent 100%);

/* Surface — Subtle warmth */
--gradient-surface: linear-gradient(180deg, #FFFFFF 0%, #FAFAF8 100%);
```

### Button Gradients
```css
/* Primary hover — Gold sweep */
--gradient-btn-gold: linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%);

/* Secondary hover — Subtle shift */
--gradient-btn-secondary: linear-gradient(135deg, rgba(10, 22, 40, 0.02) 0%, rgba(10, 22, 40, 0.06) 100%);
```

---

## 8. COLOR BY SECTION

| Section | Background | Text | Accent |
|---------|-----------|------|--------|
| Hero | Gradient warm | Navy | Gold |
| Services | #F4F5F7 | Navy | Gold icons |
| About | #ECEEF2 | Navy | Gold quotes |
| Technology | #F4F5F7 | Navy | Gold nodes |
| Industries | #ECEEF2 | Navy | Gold icons |
| Insights | #F4F5F7 | Navy | Gold badges |
| Testimonials | #FFFFFF | Navy | Gold marks |
| CTA | Gradient navy | White | Gold line |
| Contact | #F4F5F7 | Navy | Gold CTA |
| Footer | #0A1628 | White/Grey | Gold accents |

---

## 9. CSS CUSTOM PROPERTIES

```css
:root {
  /* Navy */
  --color-navy-900: #0A1628;
  --color-navy-800: #0F1F38;
  --color-navy-700: #1A2A44;
  --color-navy-600: #243650;
  --color-navy: #0A1628;

  /* Gold */
  --color-gold-600: #B89A60;
  --color-gold-500: #C9A96E;
  --color-gold-400: #D4B87A;
  --color-gold-300: #DFC88F;
  --color-gold-200: #E8D5A8;
  --color-gold-100: #F2E8D0;
  --color-gold: #C9A96E;

  /* White */
  --color-white: #FFFFFF;
  --color-warm-white: #FAFAF8;
  --color-soft-white: #F8F6F2;

  /* Grey */
  --color-grey-600: #5A6472;
  --color-grey-500: #7A8494;
  --color-grey-400: #9AA3B0;
  --color-grey-300: #C8CDD5;
  --color-grey-200: #E0E3E8;
  --color-grey-100: #F0F1F4;
  --color-grey-50: #F8F9FA;

  /* Surfaces */
  --color-bg: #F4F5F7;
  --color-bg-alt: #ECEEF2;
  --color-surface: #FFFFFF;
  --color-surface-warm: #FAFAF8;

  /* Functional */
  --color-success: #2D8A56;
  --color-error: #C4392D;
  --color-warning: #D4A017;
  --color-info: #3498DB;

  /* Glass */
  --glass-bg: rgba(255, 255, 255, 0.72);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-blur: blur(20px);

  /* Shadows */
  --shadow-1: 0 1px 3px rgba(10, 22, 40, 0.04), 0 1px 2px rgba(10, 22, 40, 0.06);
  --shadow-2: 0 4px 12px rgba(10, 22, 40, 0.06), 0 2px 4px rgba(10, 22, 40, 0.04);
  --shadow-3: 0 8px 24px rgba(10, 22, 40, 0.08), 0 4px 8px rgba(10, 22, 40, 0.04);
  --shadow-4: 0 16px 48px rgba(10, 22, 40, 0.10), 0 8px 16px rgba(10, 22, 40, 0.06);
  --shadow-gold: 0 4px 24px rgba(201, 169, 110, 0.20);
  --shadow-gold-glow: 0 0 40px rgba(201, 169, 110, 0.15);
}
```

---

> **This color system creates depth, warmth, and luxury through layering — not flat fills.**
