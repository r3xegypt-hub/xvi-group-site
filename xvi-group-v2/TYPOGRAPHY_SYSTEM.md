# XVI GROUP — TYPOGRAPHY SYSTEM
> Independent systems for English and Arabic. Neither mirrors the other.

---

## 1. TYPOGRAPHY PHILOSOPHY

English and Arabic are **two independent typographic systems** sharing one brand. Arabic is NOT a translated, mirrored, or adapted version of English. It is a **native system** with its own rhythm, its own hierarchy, and its own elegance.

### Principles
1. **Independence.** Arabic typography stands on its own.
2. **Rhythm.** Arabic reads right-to-left. Its visual rhythm is different.
3. **Weight.** Arabic script is naturally lighter. Compensate with weight.
4. **Breathing.** Arabic needs more vertical space between lines.
5. **Elegance.** Both languages must feel equally premium.

---

## 2. ENGLISH TYPE SYSTEM

### Font Stack
```css
--font-en-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-en-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-en-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Why These Fonts
- **Playfair Display:** High contrast serif. Executive. Editorial. Authority.
- **Inter:** Geometric sans. Clean. Modern. Highly legible. Excellent Arabic counterpart.

### Type Scale — Desktop (Base 16px)
| Role | Size | Line Height | Letter Spacing | Weight | Font |
|------|------|-------------|----------------|--------|------|
| Display | clamp(3rem, 6vw, 5rem) | 1.0 | -0.04em | 700 | Playfair |
| H1 | clamp(2.5rem, 5vw, 4rem) | 1.05 | -0.03em | 700 | Playfair |
| H2 | clamp(2rem, 4vw, 3rem) | 1.1 | -0.02em | 700 | Playfair |
| H3 | clamp(1.5rem, 3vw, 2rem) | 1.2 | -0.01em | 600 | Playfair |
| H4 | clamp(1.25rem, 2vw, 1.5rem) | 1.3 | 0 | 600 | Inter |
| Body Large | clamp(1.125rem, 1.75vw, 1.25rem) | 1.618 | 0 | 400 | Inter |
| Body | clamp(1rem, 1.5vw, 1.125rem) | 1.618 | 0 | 400 | Inter |
| Body Small | 0.9375rem | 1.6 | 0.01em | 400 | Inter |
| Caption | 0.8125rem | 1.4 | 0.02em | 400 | Inter |
| Overline | 0.75rem | 1 | 0.14em | 500 | Inter |
| Button | 0.875rem | 1 | 0.06em | 600 | Inter |
| Nav | 0.875rem | 1 | 0.04em | 500 | Inter |

### Mobile Adjustments (≤768px)
| Role | Size | Line Height |
|------|------|-------------|
| Display | clamp(2rem, 8vw, 3rem) | 1.1 |
| H1 | clamp(1.75rem, 7vw, 2.5rem) | 1.1 |
| H2 | clamp(1.5rem, 6vw, 2rem) | 1.15 |
| H3 | clamp(1.25rem, 5vw, 1.5rem) | 1.25 |
| Body | 1rem | 1.618 |

### English Heading Rules
- **Display/H1:** Always serif (Playfair). Always bold. Always tight tracking.
- **H2:** Serif. Bold. Slightly less tight.
- **H3:** Serif. Semibold. Almost zero tracking.
- **H4:** Sans-serif (Inter). Semibold. The transition to body.
- **Overline:** Always sans. Always uppercase. Always tracked. Always gold.

### English Body Rules
- **Max line length:** 65 characters (optimal reading)
- **Paragraph spacing:** 1.5em (one blank line)
- **First paragraph after heading:** No indent
- **Subsequent paragraphs:** No indent, spacing between

---

## 3. ARABIC TYPE SYSTEM

### Font Stack
```css
--font-ar-heading: 'Amiri', 'Traditional Arabic', 'Simplified Arabic', serif;
--font-ar-body: 'Tajawal', 'Noto Sans Arabic', 'Arial', sans-serif;
--font-ar-accent: 'Aref Ruqaa', 'Sakkal Majalla', serif;
```

### Why These Fonts
- **Amiri:** The gold standard of Arabic typography. Naskh-based. Highly readable. Authoritative. Used by Al Jazeera, major Arabic publishers.
- **Tajawal:** Modern Arabic sans-serif. Clean, geometric, excellent for body text. Pairs perfectly with Amiri.
- **Aref Ruqaa:** Decorative serif for accent text (quotes, pull-quotes). Adds editorial elegance.

### Arabic Type Scale — Desktop (Base 16px)
| Role | Size | Line Height | Letter Spacing | Weight | Font |
|------|------|-------------|----------------|--------|------|
| Display | clamp(2.75rem, 5.5vw, 4.5rem) | 1.2 | 0 | 700 | Amiri |
| H1 | clamp(2.25rem, 4.5vw, 3.5rem) | 1.25 | 0 | 700 | Amiri |
| H2 | clamp(1.75rem, 3.5vw, 2.75rem) | 1.3 | 0 | 700 | Amiri |
| H3 | clamp(1.375rem, 2.75vw, 1.875rem) | 1.35 | 0 | 600 | Amiri |
| H4 | clamp(1.125rem, 2vw, 1.375rem) | 1.4 | 0 | 600 | Tajawal |
| Body Large | clamp(1.125rem, 1.75vw, 1.25rem) | 1.8 | 0 | 400 | Tajawal |
| Body | clamp(1rem, 1.5vw, 1.125rem) | 1.8 | 0 | 400 | Tajawal |
| Body Small | 0.9375rem | 1.7 | 0 | 400 | Tajawal |
| Caption | 0.8125rem | 1.5 | 0 | 400 | Tajawal |
| Overline | 0.75rem | 1.2 | 0.06em | 500 | Tajawal |
| Button | 0.875rem | 1.2 | 0.04em | 600 | Tajawal |
| Nav | 0.875rem | 1.2 | 0.02em | 500 | Tajawal |

### Arabic-Specific Adjustments
| Property | English | Arabic | Why |
|----------|---------|--------|-----|
| Body line-height | 1.618 | 1.8 | Arabic descenders/ascenders are taller |
| Heading line-height | 1.05-1.2 | 1.2-1.35 | Arabic scripts need more vertical room |
| Letter spacing (headings) | -0.03em | 0 | Arabic connects naturally; no tracking needed |
| Letter spacing (overline) | 0.14em | 0.06em | Arabic uppercase doesn't exist; less tracking |
| Max line length | 65 chars | 55 chars | Arabic characters are wider |
| Paragraph spacing | 1.5em | 2em | More breathing room for Arabic text |

### Arabic Heading Rules
- **Display/H1:** Always Amiri (naskh serif). Bold. Natural tracking (no tightening).
- **H2:** Amiri. Bold. Slightly lighter than H1.
- **H3:** Amiri. Semibold.
- **H4:** Tajawal (sans). Semibold. Modern feel.
- **Overline:** Tajawal. Medium weight. Slight tracking. Gold color.

### Arabic Body Rules
- **Max line length:** 55 characters
- **Paragraph spacing:** 2em (more than English)
- **Text alignment:** Right-aligned (RTL)
- **No hyphenation** in Arabic
- **Kashida:** Optional elongation for justified text (premium feel)

---

## 4. BILINGUAL TYPOGRAPHY RULES

### When Both Languages Appear
```
English: "Building Enterprises That Move Markets"
Arabic:  "بناء مؤسسات تحرّك الأسواق"
```

**Rules:**
1. English comes first in LTR context, Arabic first in RTL context
2. Each uses its own font family — NEVER mix
3. Each uses its own line-height — NEVER share
4. Each uses its own tracking — NEVER share
5. Visual weight must feel equal, even if font sizes differ

### Typography Pairing Map
| Element | English Font | Arabic Font |
|---------|-------------|-------------|
| Display | Playfair Display | Amiri |
| Headlines | Playfair Display | Amiri |
| Subheadings | Inter | Tajawal |
| Body | Inter | Tajawal |
| Overlines | Inter | Tajawal |
| Buttons | Inter | Tajawal |
| Navigation | Inter | Tajawal |
| Quotes | Playfair Display | Aref Ruqaa |
| Captions | Inter | Tajawal |

---

## 5. GOLD EMPHASIS SYSTEM

### Where Gold Appears in Typography
| Element | English | Arabic |
|---------|---------|--------|
| Overlines | Gold (#C9A96E) | Gold (#C9A96E) |
| Highlighted words | Gold (#C9A96E) | Gold (#C9A96E) |
| Stat numbers | Gold (#C9A96E) | Gold (#C9A96E) |
| Links (on hover) | Gold (#C9A96E) | Gold (#C9A96E) |
| Category badges | Gold bg (8% opacity) | Gold bg (8% opacity) |

### Gold Usage Rules
1. Gold is for **emphasis only** — never for body text
2. Maximum 2-3 gold elements per viewport
3. Gold on white: #C9A96E (100% opacity)
4. Gold on navy: #C9A96E (100% opacity)
5. Gold on grey: #C9A96E (100% opacity)
6. Never use gold for long paragraphs

---

## 6. FONT LOADING STRATEGY

### Preload
```html
<link rel="preload" href="/fonts/playfair-display-v29.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-v13.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/amiri-v20.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/tajawal-v9.woff2" as="font" type="font/woff2" crossorigin>
```

### Font Display
```css
@font-face {
  font-family: 'Playfair Display';
  font-display: swap; /* Show fallback, swap when loaded */
}
```

### Fallback Stack
| Font | Fallback |
|------|----------|
| Playfair Display | Georgia → Times New Roman → serif |
| Inter | -apple-system → BlinkMacSystemFont → Segoe UI → sans-serif |
| Amiri | Traditional Arabic → Simplified Arabic → serif |
| Tajawal | Noto Sans Arabic → Arial → sans-serif |

---

## 7. CSS CUSTOM PROPERTIES

```css
:root {
  /* English */
  --font-en-heading: 'Playfair Display', Georgia, serif;
  --font-en-body: 'Inter', -apple-system, sans-serif;

  /* Arabic */
  --font-ar-heading: 'Amiri', 'Traditional Arabic', serif;
  --font-ar-body: 'Tajawal', 'Noto Sans Arabic', sans-serif;
  --font-ar-accent: 'Aref Ruqaa', serif;

  /* Scale */
  --text-display: clamp(3rem, 6vw, 5rem);
  --text-h1: clamp(2.5rem, 5vw, 4rem);
  --text-h2: clamp(2rem, 4vw, 3rem);
  --text-h3: clamp(1.5rem, 3vw, 2rem);
  --text-h4: clamp(1.25rem, 2vw, 1.5rem);
  --text-body-lg: clamp(1.125rem, 1.75vw, 1.25rem);
  --text-body: clamp(1rem, 1.5vw, 1.125rem);
  --text-body-sm: 0.9375rem;
  --text-caption: 0.8125rem;
  --text-overline: 0.75rem;
  --text-button: 0.875rem;

  /* Line Heights */
  --lh-tight: 1.05;
  --lh-heading: 1.15;
  --lh-body: 1.618;
  --lh-body-ar: 1.8;
  --lh-relaxed: 2;

  /* Letter Spacing */
  --ls-tight: -0.03em;
  --ls-normal: 0;
  --ls-wide: 0.06em;
  --ls-overline: 0.14em;
  --ls-overline-ar: 0.06em;
}
```

---

> **This system ensures English and Arabic are each premium, each native, and each independent.**
