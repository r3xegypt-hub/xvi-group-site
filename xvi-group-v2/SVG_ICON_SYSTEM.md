# XVI GROUP — SVG ICON SYSTEM
> A unified visual language. Architecture. Intelligence. Precision.

---

## 1. ICON PHILOPHY

Every icon in the XVI system is built from the same geometric DNA as the logo. The diamond is the seed. Every icon is a **variation of architectural geometry** — not illustrations, not pictograms, not emoji.

### Design Rules
1. **Stroke-only.** No fills except for special states.
2. **1.5px stroke.** Consistent weight across all icons.
3. **24×24 grid.** All icons designed on a 24×24 unit grid.
4. **Geometric.** Straight lines and perfect arcs only. No organic shapes.
5. **Minimal.** Maximum 3-4 strokes per icon. Less is more.
6. **Diamond DNA.** Every icon contains at least one diamond-derived angle (45° or 90°).

---

## 2. ICON GRID

```
┌────────────────────────────────┐
│  0  1  2  3  4  5  6  7  8  9 ... 24 │
│  ┌──────────────────────┐     │
│  │                      │     │
│  │    LIVE AREA         │     │
│  │    20×20 (centered)  │     │
│  │                      │     │
│  └──────────────────────┘     │
│  2px padding on all sides      │
└────────────────────────────────┘
```

- **Canvas:** 24×24
- **Live area:** 20×20 (2px padding each side)
- **Stroke:** 1.5px
- **Cap:** Round
- **Join:** Round

---

## 3. ICON INVENTORY

### Navigation Icons
| Name | SVG | Usage |
|------|-----|-------|
| Arrow Right | → | CTA links, navigation |
| Arrow Left | ← | Back navigation, RTL arrow |
| Arrow Up | ↑ | External links |
| Arrow Down | ↓ | Dropdowns, scroll down |
| Menu (Horizontal) | ≡ | Mobile hamburger |
| Close | × | Modal/drawer close |
| Chevron Right | > | Breadcrumbs, sub-nav |

### Service Icons
| Name | Description | Usage |
|------|-------------|-------|
| Diamond Grid | 4 diamonds in 2×2 | Business Consulting |
| Circuit Diamond | Diamond with inner connections | Technology Consulting |
| Neural Diamond | Diamond with radiating nodes | AI Transformation |
| Pyramid | Tiered triangle structure | Executive Training |

### Industry Icons
| Name | Description | Usage |
|------|-------------|-------|
| Tech Stack | Layered rectangles | Technology |
| Financial Diamond | Diamond with vertical line | Finance |
| Health Circle | Circle with cross | Healthcare |
| Energy Hexagon | Hexagonal structure | Energy |

### UI Icons
| Name | Description | Usage |
|------|-------------|-------|
| Check | Checkmark | Success, confirmations |
| Info | Circle with "i" | Information tooltips |
| Warning | Triangle with "!" | Warning states |
| Error | Circle with "×" | Error states |
| Search | Magnifying glass | Search |
| External | Arrow + box | External link |
| Download | Arrow down + line | Download |
| Calendar | Grid rectangle | Dates, scheduling |
| Clock | Circle with hands | Time, duration |
| Location | Pin with diamond | Addresses |
| Mail | Envelope | Contact |
| Phone | Handset | Contact |
| LinkedIn | Square with "in" | Social |
| Twitter | Bird/X shape | Social |

---

## 4. ICON VARIANTS

### Color Map
| Variant | Color | Usage |
|---------|-------|-------|
| Navy | #0A1628 | Default on light backgrounds |
| Gold | #C9A96E | Accent, interactive, hover |
| White | #FFFFFF | On dark backgrounds |
| Graphite | #5A6472 | Secondary, disabled |
| Current | currentColor | Inherit from parent |

### Size Map
| Name | Size | Stroke | Usage |
|------|------|--------|-------|
| xs | 12px | 1.5px | Inline text |
| sm | 16px | 1.5px | Buttons, links |
| md | 20px | 1.5px | Cards, list items |
| lg | 24px | 1.5px | Standalone |
| xl | 32px | 1.5px | Feature highlights |
| 2xl | 48px | 1.5px | Hero features |
| 3xl | 64px | 1.5px | Section headers |

---

## 5. ICON SPECIFICATIONS

### Diamond Grid (Business Consulting)
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M6 6L12 2L18 6L12 10Z" />  <!-- Top diamond -->
  <path d="M6 14L12 10L18 14L12 18Z" /> <!-- Bottom diamond -->
  <path d="M12 10L12 2" />               <!-- Vertical connector -->
  <path d="M12 18L12 14" />               <!-- Vertical connector -->
</svg>
```

### Circuit Diamond (Technology)
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M12 2L22 12L12 22L2 12Z" />  <!-- Outer diamond -->
  <circle cx="12" cy="12" r="3" />         <!-- Center node -->
  <line x1="12" y1="2" x2="12" y2="9" /> <!-- Top connection -->
  <line x1="22" y1="12" x2="15" y2="12" /> <!-- Right connection -->
  <line x1="12" y1="22" x2="12" y2="15" /> <!-- Bottom connection -->
  <line x1="2" y1="12" x2="9" y2="12" />   <!-- Left connection -->
</svg>
```

### Neural Diamond (AI)
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M12 2L22 12L12 22L2 12Z" />  <!-- Outer diamond -->
  <path d="M12 7L17 12L12 17L7 12Z" />  <!-- Inner diamond -->
  <circle cx="12" cy="12" r="2" />         <!-- Core -->
  <line x1="12" y1="2" x2="12" y2="7" />
  <line x1="22" y1="12" x2="17" y2="12" />
  <line x1="12" y1="22" x2="12" y2="17" />
  <line x1="2" y1="12" x2="7" y2="12" />
</svg>
```

### Pyramid (Executive Training)
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M12 2L22 20H2Z" />           <!-- Outer triangle -->
  <line x1="7" y1="14" x2="17" y2="14" /> <!-- Tier 1 -->
  <line x1="9.5" y1="17" x2="14.5" y2="17" /> <!-- Tier 2 -->
  <circle cx="12" cy="8" r="1.5" />       <!-- Peak node -->
</svg>
```

### Arrow Right
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <line x1="4" y1="12" x2="20" y2="12" />
  <polyline points="14,6 20,12 14,18" />
</svg>
```

---

## 6. ICON ANIMATION

### Hover Animation
```css
.icon {
  transition: color 200ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.icon:hover {
  color: #C9A96E;
  transform: translateY(-1px);
}
```

### Arrow Animation
```css
.arrow-icon:hover {
  transform: translateX(4px);
}
```

### Diamond Rotation (Loader)
```css
@keyframes diamond-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.diamond-loader {
  animation: diamond-rotate 2s cubic-bezier(0.37, 0, 0.63, 1) infinite;
}
```

### Draw-in Animation
```css
.icon-draw path,
.icon-draw line,
.icon-draw circle {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw-in 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes draw-in {
  to { stroke-dashoffset: 0; }
}
```

---

## 7. ICON USAGE RULES

| Rule | Detail |
|------|--------|
| **Consistent weight** | Always 1.5px stroke |
| **Consistent size** | Use size scale, never arbitrary |
| **Consistent color** | Use variant color map |
| **Consistent spacing** | 8px between icon and text |
| **No fills** | Stroke only (except loader, active states) |
| **No animations** | Except hover, loader, draw-in |
| **Accessibility** | Always with `aria-hidden="true"` if decorative, or `aria-label` if meaningful |

---

> **This icon system creates a unified visual language derived from the XVI diamond DNA.**
