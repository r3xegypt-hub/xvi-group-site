# DESIGN QA CHECKLIST — XVI GROUP

## Purpose
Verify every element of the XVI GROUP website meets the standards defined in DESIGN_BIBLE.md, VISUAL_DNA.md, DESIGN_DECISIONS.md, ANIMATION_MAP.md, and COMPONENT_LIBRARY.md.

---

## 1. BRAND CONSISTENCY

- [ ] Gold `#C9A96E` used sparingly — headlines, key accents, CTAs only
- [ ] Navy `#0A1628` for headers, footer, dark sections
- [ ] White `#FFFFFF` cards and surfaces
- [ ] Background `#F4F5F7` page background
- [ ] Graphite `#5A6472` body text
- [ ] No color from outside the defined palette on any page
- [ ] Executive Gold ratio ≤ 8% per section
- [ ] No gradient滥用 — solid colors preferred

## 2. TYPOGRAPHY

- [ ] Playfair Display for English headlines
- [ ] Inter for English body and UI
- [ ] Amiri for Arabic headlines
- [ ] Tajawal for Arabic body
- [ ] H1: 56px desktop / 36px mobile, Playfair
- [ ] H2: 42px desktop / 32px mobile
- [ ] H3: 32px desktop / 24px mobile
- [ ] Body: 18px desktop / 16px mobile
- [ ] Line-height: 1.4 for headlines, 1.618 for body
- [ ] Letter-spacing: -0.02em for headlines, 0 for body
- [ ] No font sizes below 12px anywhere
- [ ] No more than 2 font families per language

## 3. SPACING & LAYOUT

- [ ] Base unit: 8px — all spacing is a multiple of 8
- [ ] Section padding: 120px desktop / 80px mobile
- [ ] Container max-width: 1200px, centered
- [ ] Content max-width: 720px for long-form text
- [ ] Grid: 12-column desktop, 4-column mobile
- [ ] Column gutters: 24px
- [ ] Consistent vertical rhythm throughout

## 4. NAVIGATION

- [ ] Sticky on scroll with backdrop blur
- [ ] Compact height: 72px
- [ ] Logo height: 32px
- [ ] Gold underline animation on hover
- [ ] Language toggle (EN/AR) present
- [ ] Mobile hamburger triggers full-screen overlay
- [ ] Mega menu for Services on desktop
- [ ] All interactive elements keyboard-focusable
- [ ] Skip-to-content link visible on focus

## 5. BUTTONS

- [ ] Primary: Gold background, navy text, 48px height
- [ ] Secondary: Navy outline, navy text
- [ ] Ghost: Text-only with arrow on hover
- [ ] All buttons have 44px minimum touch target
- [ ] Focus ring: 2px gold outline, 2px offset
- [ ] Loading state with spinner animation
- [ ] Hover transition: 250ms ease-out-expo

## 6. CARDS

- [ ] White background, 12px radius
- [ ] Border: 1px solid rgba(gold, 0.08)
- [ ] Hover: Gold border, level-2 shadow
- [ ] Transition: 350ms ease-out-expo
- [ ] Service cards: Gold top accent line
- [ ] Stat cards: Large gold number
- [ ] All cards have proper padding (24px–32px)

## 7. HERO SECTION

- [ ] Full viewport height
- [ ] Diamond geometry background at 3-5% opacity
- [ ] Animated diamond rotation (50s cycle)
- [ ] Meridian line with scroll reveal
- [ ] Headline with gold highlight word
- [ ] Scroll indicator arrow bouncing
- [ ] Two CTAs: primary + secondary
- [ ] Overline with tracking-widest

## 8. SECTIONS

- [ ] Section overline: Gold, uppercase, tracking-widest
- [ ] Section headline: Playfair, navy
- [ ] Section subheadline: Inter, graphite, max 600px
- [ ] Diamond divider between sections
- [ ] Consistent section padding

## 9. FOOTER

- [ ] Navy background
- [ ] 4-column layout (brand + 3 link columns)
- [ ] Gold meridian line divider
- [ ] Locations: Dubai · Abu Dhabi · Riyadh
- [ ] Social icons: LinkedIn, Twitter/X, Email
- [ ] Copyright with year
- [ ] Privacy, Terms, Accessibility links

## 10. ANIMATIONS

- [ ] Scroll reveal: translateY(20px) → 0, opacity 0→1
- [ ] Stagger: 100ms between siblings
- [ ] Duration: 600ms base
- [ ] Easing: cubic-bezier(0.16, 1, 0.3, 1)
- [ ] Parallax: Diamond and meridian elements only
- [ ] No animation on text-heavy sections
- [ ] respects-reduced-motion: reduce → no animations
- [ ] No layout shift from animations
- [ ] Scroll-triggered, not load-triggered

## 11. RESPONSIVE

- [ ] Mobile: 375px (iPhone SE)
- [ ] Tablet: 768px (iPad)
- [ ] Desktop: 1440px
- [ ] Fluid typography with clamp()
- [ ] Navigation collapses at 1024px
- [ ] Grid: 1 col mobile → 2 col tablet → 4 col desktop
- [ ] Images scale proportionally
- [ ] No horizontal scroll at any breakpoint

## 12. ACCESSIBILITY

- [ ] WCAG 2.1 AA contrast ratios (4.5:1 text, 3:1 large text)
- [ ] All images have descriptive alt text
- [ ] All interactive elements keyboard-accessible
- [ ] Focus indicators visible on all focusable elements
- [ ] ARIA labels on icon-only buttons
- [ ] Skip-to-content link
- [ ] Language attribute updates on EN/AR switch
- [ ] RTL layout verified for Arabic
- [ ] No information conveyed by color alone

## 13. PERFORMANCE

- [ ] Lighthouse Performance ≥ 95
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse Best Practices ≥ 95
- [ ] Lighthouse SEO ≥ 95
- [ ] Images optimized (WebP/AVIF where possible)
- [ ] Fonts loaded with font-display: swap
- [ ] No render-blocking resources
- [ ] CLS < 0.1
- [ ] LCP < 2.5s

## 14. BILINGUAL (EN/AR)

- [ ] Language toggle switches all visible text
- [ ] RTL layout applied when Arabic selected
- [ ] Arabic typography uses Amiri + Tajawal
- [ ] All navigation labels translated
- [ ] All CTAs translated
- [ ] All form labels translated
- [ ] Footer fully translated
- [ ] No mixed-direction text issues
- [ ] Document lang and dir attributes update

## 15. SVG GEOMETRY

- [ ] Diamond: 60px, stroke-width 1, gold 8% opacity
- [ ] Meridian: Horizontal line with diamond center
- [ ] Frame: Corner decorations on section headers
- [ ] All SVGs scale with viewport
- [ ] No broken SVG paths at any breakpoint

---

## Verification Commands

```bash
# TypeScript check
npx tsc --noEmit

# Production build
npx vite build

# Dev server
npm run dev
```

## Sign-Off

| Phase | Date | Status |
|-------|------|--------|
| Phase 02: Enterprise Foundation | — | In Progress |
| Phase 03: Pages | — | Pending |
| Phase 04: Integration | — | Pending |
| Phase 05: Optimization | — | Pending |
| Phase 06: Launch Prep | — | Pending |
