# ANIMATION MAP — Complete Motion Specification

> Every animation on the XVI site: duration, delay, easing, trigger, property.

---

## Animation Philosophy

**"Motion reveals structure."** Every animation exists to guide the eye, communicate hierarchy, or reinforce the XII narrative. No animation exists for decoration alone.

### Core Principles
1. **Purposeful** — every animation has a reason
2. **Subtle** — Apple/Stripe level, not After Effects level
3. **Respectful** — `prefers-reduced-motion` disables all non-essential animation
4. **Performant** — only `transform` and `opacity` for 60fps; avoid `layout` triggers
5. **Layered** — entrance → focus → interaction, each with distinct timing

---

## Easing Functions

| Token Name | Value | Use Case |
|-----------|-------|----------|
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Page entrance, scroll reveals |
| `ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | Hover transitions, card lifts |
| `ease-in-out-sine` | `cubic-bezier(0.37, 0, 0.63, 1)` | Smooth loops, loaders |
| `ease-out-back` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interactions, pops |
| `ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Button press, card hover |

---

## 1. Hero Entrance — `hero-entrance`

**Trigger:** Page load (after loader)
**Sequence:** Staggered — each element enters after previous

| Element | Delay | Duration | Easing | Properties |
|---------|-------|----------|--------|------------|
| Background pattern | 0ms | 1200ms | `ease-out-expo` | `opacity: 0→1` |
| Overline text | 400ms | 800ms | `ease-out-expo` | `opacity: 0→1`, `translateY: 30px→0` |
| Headline line 1 | 600ms | 800ms | `ease-out-expo` | `opacity: 0→1`, `translateY: 40px→0` |
| Headline line 2 | 750ms | 800ms | `ease-out-expo` | `opacity: 0→1`, `translateY: 40px→0` |
| Headline line 3 | 900ms | 800ms | `ease-out-expo` | `opacity: 0→1`, `translateY: 40px→0` |
| Subheadline | 1100ms | 800ms | `ease-out-expo` | `opacity: 0→1`, `translateY: 20px→0` |
| CTA buttons | 1300ms | 800ms | `ease-out-expo` | `opacity: 0→1`, `translateY: 20px→0` |
| Decorative XII | 1500ms | 1200ms | `ease-out-expo` | `opacity: 0→0.06`, `scale: 0.8→1` |
| Scroll indicator | 2200ms | 600ms | `ease-out-expo` | `opacity: 0→1` |

**Total hero entrance:** ~2.8 seconds from page load

---

## 2. Scroll Reveal — `scroll-reveal`

**Trigger:** IntersectionObserver — element enters viewport (threshold: 0.15)

| Variant | Duration | Easing | Properties | Stagger (children) |
|---------|----------|--------|------------|-------------------|
| `reveal-up` | 800ms | `ease-out-expo` | `opacity: 0→1`, `translateY: 40px→0` | 100ms |
| `reveal-left` | 800ms | `ease-out-expo` | `opacity: 0→1`, `translateX: -40px→0` | 100ms |
| `reveal-right` | 800ms | `ease-out-expo` | `opacity: 0→1`, `translateX: 40px→0` | 100ms |
| `reveal-scale` | 800ms | `ease-out-expo` | `opacity: 0→1`, `scale: 0.95→1` | 120ms |
| `reveal-fade` | 600ms | `ease-out-expo` | `opacity: 0→1` | 80ms |

**CSS implementation:**
```scss
[data-reveal] {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 800ms var(--ease-out-expo),
              transform 800ms var(--ease-out-expo);

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// Stagger children
[data-reveal-stagger] > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms var(--ease-out-expo),
              transform 600ms var(--ease-out-expo);
}

[data-reveal-stagger].is-visible > * {
  opacity: 1;
  transform: translateY(0);
}

@for $i from 1 through 12 {
  [data-reveal-stagger].is-visible > *:nth-child(#{$i}) {
    transition-delay: #{$i * 100}ms;
  }
}
```

---

## 3. Navigation — `nav`

### 3a. Scroll Behavior
**Trigger:** Scroll position > 0

| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Compact mode | 300ms | `ease-out-quint` | `height: 96px→64px`, `box-shadow: 0→0 24px rgba(10,22,40,0.08)` |
| Expand mode | 300ms | `ease-out-quint` | `height: 64px→96px`, `box-shadow: 0 24px→0` |
| Background blur | 300ms | `ease-out-quint` | `backdrop-filter: blur(0→12px)` |

### 3b. Language Toggle
| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Toggle slide | 250ms | `ease-out-back` | `transform: translateX(0→calc(100% - thumb width))` |
| Label fade | 150ms | `ease-out-expo` | `opacity: 1→0→1` (crossfade) |

### 3c. Mobile Menu
| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Open overlay | 300ms | `ease-out-expo` | `opacity: 0→1` |
| Slide panel | 400ms | `ease-out-expo` | `translateX: 100%→0` |
| Menu items stagger | 60ms each | `ease-out-expo` | `opacity: 0→1`, `translateX: 20px→0` |
| Close | 300ms | `ease-out-quint` | Reverse of open |

---

## 4. Card Interactions — `card`

### 4a. Hover Lift (Desktop)
| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Lift | 400ms | `ease-out-quint` | `translateY: 0→-8px` |
| Shadow expand | 400ms | `ease-out-quint` | `box-shadow: subtle→elevated` |
| Border glow | 400ms | `ease-out-quint` | `border-color: rgba(201,169,110,0.12→0.25)` |

### 4b. Service Card Accent
| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Accent bar grow | 300ms | `ease-out-expo` | `scaleX: 0→1` (origin left) |
| Icon pulse | 400ms | `ease-spring` | `scale: 1→1.1→1` |
| Arrow slide | 250ms | `ease-out-expo` | `translateX: 0→4px` |

### 4c. Case Study Card
| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Image zoom | 500ms | `ease-out-quint` | `scale: 1→1.05` |
| Overlay fade | 400ms | `ease-out-expo` | `opacity: 0→1` |
| Content slide | 400ms | `ease-out-expo` | `translateY: 20px→0` |

---

## 5. Button Interactions — `button`

### 5a. Primary Button (Filled Gold)
| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Hover | 250ms | `ease-out-quint` | `background: #B89A60→#D4B87A` |
| Press | 150ms | `ease-out-expo` | `transform: scale(0.97)` |
| Release | 300ms | `ease-spring` | `transform: scale(0.97→1)` |

### 5b. Secondary Button (Outlined)
| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Hover fill | 300ms | `ease-out-expo` | `background: transparent→rgba(201,169,110,0.08)` |
| Hover border | 300ms | `ease-out-expo` | `border-color: rgba(201,169,110,0.3→0.6)` |
| Press | 150ms | `ease-out-expo` | `transform: scale(0.97)` |

### 5c. Ghost Button
| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Hover underline | 300ms | `ease-out-expo` | `background-position: left→right` (gradient slide) |
| Arrow appear | 250ms | `ease-out-expo` | `opacity: 0→1`, `translateX: -4px→0` |

---

## 6. Stats Counter — `stats-counter`

**Trigger:** IntersectionObserver (threshold: 0.3)

| Phase | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Number count-up | 2000ms | `ease-out-expo` | `textContent: 0→target` (interpolated) |
| Label fade-in | 400ms (delay 800ms) | `ease-out-expo` | `opacity: 0→1` |
| Separator line | 600ms (delay 200ms) | `ease-out-expo` | `scaleY: 0→1` (origin top) |
| Suffix appearance | 200ms (delay 1800ms) | `ease-out-back` | `opacity: 0→1`, `scale: 0.8→1` |

---

## 7. Page Transition — `page-transition`

**Trigger:** Route change

| Phase | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Exit current page | 300ms | `ease-in-out-sine` | `opacity: 1→0`, `translateY: 0→-20px` |
| Loader pulse | 200ms | `ease-out-expo` | `opacity: 0→1` |
| Enter new page | 400ms (delay 300ms) | `ease-out-expo` | `opacity: 0→1`, `translateY: 20px→0` |
| Loader fade | 200ms (delay 500ms) | `ease-out-expo` | `opacity: 1→0` |

---

## 8. SVG Logo Animation — `logo-anim`

**Trigger:** Page load / loader sequence

| Phase | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Draw stroke | 1500ms | `ease-out-expo` | `stroke-dashoffset: total→0` |
| Fill reveal | 600ms (delay 1200ms) | `ease-out-expo` | `opacity: 0→1` |
| Group text | 800ms (delay 1600ms) | `ease-out-expo` | `opacity: 0→1`, `translateX: 10px→0` |
| Tagline | 600ms (delay 2200ms) | `ease-out-expo` | `opacity: 0→1` |

---

## 9. Loader — `loader`

**Trigger:** Initial page load

| Phase | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Diamond pulse | 1200ms loop | `ease-in-out-sine` | `scale: 0.95→1.05`, `opacity: 0.4→1→0.4` |
| Progress bar | Variable | `ease-out-expo` | `width: 0→100%` |
| Exit | 400ms | `ease-out-expo` | `opacity: 1→0`, `scale: 1→0.95` |

---

## 10. Form Interactions — `form`

### 10a. Input Focus
| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Border highlight | 200ms | `ease-out-expo` | `border-color: #C8CDD5→#C9A96E` |
| Label float | 200ms | `ease-out-expo` | `translateY: 0→-24px`, `scale: 1→0.75`, `color: graphite→gold` |
| Focus ring | 200ms | `ease-out-expo` | `box-shadow: 0→0 0 3px rgba(201,169,110,0.15)` |

### 10b. Validation
| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Error shake | 400ms | `ease-out-expo` | `translateX: 0→-8px→8px→-4px→0` |
| Error message | 200ms | `ease-out-expo` | `opacity: 0→1`, `height: 0→auto` |
| Success checkmark | 400ms | `ease-spring` | `stroke-dashoffset: total→0` |

---

## 11. Footer Reveal — `footer`

**Trigger:** Scroll into footer area

| Phase | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Backdrop gradient | 600ms | `ease-out-expo` | `opacity: 0→1` |
| Column stagger | 80ms each | `ease-out-expo` | `opacity: 0→1`, `translateY: 20px→0` |
| Divider line | 600ms (delay 200ms) | `ease-out-expo` | `scaleX: 0→1` |
| Copyright | 400ms (delay 400ms) | `ease-out-expo` | `opacity: 0→1` |

---

## 12. Parallax — `parallax`

**Trigger:** Scroll position (requestAnimationFrame)

| Element | Speed | Range | Properties |
|---------|-------|-------|------------|
| Hero XII background | 0.3x | 0→600px scroll | `translateY: 0→180px` |
| Hero diamond pattern | 0.15x | 0→400px scroll | `translateY: 0→60px` |
| Section decorative elements | 0.2x | Section bounds | `translateY: relative scroll` |

---

## 13. Scroll Progress — `scroll-progress`

**Trigger:** Page scroll

| Phase | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Progress bar width | Continuous | None | `width: scroll%` |
| Color transition | Continuous | None | `background: gold→navy` (at 80%+) |

---

## 14. Tooltip / Popover — `tooltip`

| State | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Appear | 150ms | `ease-out-back` | `opacity: 0→1`, `scale: 0.9→1`, `translateY: 4px→0` |
| Disappear | 100ms | `ease-out-expo` | `opacity: 1→0`, `scale: 1→0.95` |

---

## 15. Skeleton Loading — `skeleton`

| Phase | Duration | Easing | Properties |
|-------|----------|--------|------------|
| Shimmer sweep | 1500ms loop | `ease-in-out-sine` | `background-position: -200%→200%` |

---

## Reduced Motion

```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  [data-reveal] {
    opacity: 1;
    transform: none;
  }

  .parallax-element {
    transform: none !important;
  }
}
```

---

## Performance Budget

| Metric | Target | Acceptable |
|--------|--------|------------|
| Total animation frame time | < 8ms | < 12ms |
| Animations on screen simultaneously | ≤ 4 | ≤ 6 |
| GPU-accelerated properties | 100% | ≥ 90% |
| JS animation hooks | requestAnimationFrame | Never setInterval |
| Layout-triggering animations | 0 | 0 |

---

*This map defines every animation on the XVI GROUP site. No animation exists outside this specification.*
