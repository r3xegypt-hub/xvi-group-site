# CSS Extraction Plan

**Source files analyzed:**
- `src/styles/App.css` — 3877 lines
- `src/styles/premium-polish.css` — 428 lines
- `src/styles/tokens.css` — 126 lines (reference only)

**Goal:** Split `App.css` into logical, single-responsibility CSS modules while merging `premium-polish.css` overrides into their owning modules and eliminating duplication.

---

## Module Map

| # | New File | Description | Approx Lines |
|---|----------|-------------|-------------|
| 1 | `base.css` | Reset, global element styles, scroll progress, viewport light, AI ambient | ~120 |
| 2 | `intro.css` | Cinematic brand reveal overlay | ~150 |
| 3 | `navigation.css` | Sticky nav, glassmorphism, links, dropdown, mobile practices, CTA button | ~450 |
| 4 | `hero.css` | Hero stage, mesh gradients, particles, orbs, lens, kicker, layout | ~500 |
| 5 | `sections.css` | Page section containers, chapter numbers, orbit decorations, practice ledger | ~120 |
| 6 | `cards.css` | Service cards (glassmorphism, border, glow, sweep, reflection, tags) | ~300 |
| 7 | `rooms.css` | Room sections, surfaces, room headings, next-room pill | ~80 |
| 8 | `about.css` | About page: editorial grid, manifesto, story cards, stats | ~270 |
| 9 | `timeline.css` | Process timeline: track, nodes, steps, connectors | ~20 |
| 10 | `features.css` | Features page: cards grid, editorial columns, particles | ~350 |
| 11 | `technology.css` | Technology AI section: network lines, mesh glow, tech stack pills | ~25 |
| 12 | `testimonials.css` | Testimonials: slide stage, dots, stats, identity, navigation | ~400 |
| 13 | `cta.css` | CTA cinematic section: glows, particles, monogram, buttons, trust | ~370 |
| 14 | `footer.css` | Footer: hero, nav grid, links, social, copyright, monogram | ~350 |
| 15 | `pricing.css` | Pricing cards: grid, border, glow, sweep, features, CTA | ~300 |
| 16 | `buttons.css` | Shared premium button (shine, ripple micro-interactions) | ~50 |
| 17 | `utilities.css` | Shared patterns: glass card base, interactive surface, common transitions | ~40 |
| 18 | `reduced-motion.css` | All `prefers-reduced-motion` overrides in one place | ~25 |

**Total:** ~3,570 lines across 18 files (down from 3,877 + 428 = 4,305)

---

## Module 1: `base.css`

### Global resets & element styles
- Lines 612-634: `html, body`, `*` tap highlight, `::view-transition-*`
- Lines 3815-3846: `#root`, `img`, `button`, form element resets
- Lines 196-198 (premium-polish.css): `html { scroll-behavior: smooth }`
- Lines 213-216 (premium-polish.css): `img { image-rendering }`
- Lines 219-223 (premium-polish.css): `body { text-rendering, font-smoothing }`
- Lines 226-228 (premium-polish.css): `a { transition }`

### Typography base
- Lines 7-29 (premium-polish.css): `h1, h2, h3` global overrides

### Focus & selection
- Lines 201-204 (premium-polish.css): `:focus-visible`
- Lines 207-210 (premium-polish.css): `::selection`

### Scrollbar
- Lines 231-246 (premium-polish.css): `::-webkit-scrollbar*`

### Ambient overlays
- Lines 637-647: `.xvi-scroll-progress`
- Lines 650-658: `.xvi-viewport-light`
- Lines 660-677: `.xvi-ai-ambient` + `@keyframes xvi-ai-breathe`

---

## Module 2: `intro.css`

**App.css lines 9-153** — All `.xvi-intro*` selectors:
- `.xvi-intro` (L9-17)
- `.xvi-intro-bg` (L19-26)
- `.xvi-intro-grid` (L28-36)
- `.xvi-intro-particles` (L38-42)
- `.xvi-intro-particle` (L44-49)
- `.xvi-intro-energy` (L51-57)
- `.xvi-intro-energy-svg` (L59-63)
- `.xvi-intro-center` (L65-72)
- `.xvi-intro-logo-wrap` (L74-78)
- `.xvi-intro-logo` (L80-83)
- `.xvi-intro-pulse` (L85-95)
- `.xvi-intro-brand` (L97-104)
- `.xvi-intro-slogan` (L106-111)
- `.xvi-intro-skip` (L113-121)
- `.xvi-intro-skip-btn` + hover (L123-139)
- `.xvi-intro-progress` (L141-146)
- `.xvi-intro-sweep` (L148-153)

**premium-polish.css:** No intro overrides.

---

## Module 3: `navigation.css`

**App.css lines 159-606** — All `.xvi-nav*` selectors:

### Main nav bar
- `.xvi-nav` (L159-171)
- `.xvi-nav-glow` (L174-182)
- `.xvi-nav--scrolled` + glow (L185-195)
- `.xvi-nav--top` (L198-200)
- `.xvi-nav-inner` + scrolled (L202-212)

### Logo
- `.xvi-nav-logo` + hover (L215-267)
- `.xvi-nav-logo-img` + hover (L238-249)
- `.xvi-nav-logo-text` + scrolled (L251-270)

### Nav links
- `.xvi-nav-links` (L273-279)
- `.xvi-nav-link` + hover (L281-302)
- `.xvi-nav-link--active` (L304-307)
- `.xvi-nav-indicator` (L309-317)

### Practices trigger
- `.xvi-nav-trigger` (L320-323)
- `.xvi-nav-trigger--active` (L325-328)
- `.xvi-nav-trigger-icon` + open (L330-339)

### CTA button
- `.xvi-nav-cta` + hover + active (L342-391)
- `.xvi-nav-cta-shine` (L373-386)
- `.xvi-nav-cta-text` (L388-391)

### Mobile practices strip
- `.xvi-nav-mobile-practices` (L394-399)
- `.xvi-nav-mobile-scroll` (L401-409)
- `.xvi-nav-mobile-pill` + hover + active (L411-436)

### Dropdown
- `.xvi-nav-dropdown` + inner + intro + label + title + link + grid + item* (L439-567)

### Responsive
- `@media (max-width: 1023px)` (L570-586)
- `@media (max-width: 640px)` (L588-600)
- `@media (min-width: 1024px)` (L602-606)

**premium-polish.css overrides → navigation.css:**
- Section 7 (L122-139): `.xvi-nav`, `.xvi-nav--scrolled`, `.xvi-nav-inner`, `.xvi-nav-link`
- Section 30 (L416-428): `.xvi-nav-dropdown-title`, `.xvi-nav-dropdown-item-title`, `.xvi-nav-dropdown-item-note`

---

## Module 4: `hero.css`

**App.css lines 683-1162** — All hero-related selectors:

### Stage & background
- `.xvi-flagship-hero` (L683)
- `.xvi-hero-stage` + ::before (L685-710)
- `.xvi-hero-vignette` (L713-719)
- `.xvi-hero-noise` (L721-730)

### Mesh gradients & animations
- `.xvi-hero-mesh` (L733-743)
- `.xvi-hero-mesh-light` + warm (L746-760)
- `@keyframes xvi-mesh-drift` + warm (L762-772)
- `.xvi-hero-grid-overlay` (L775-787)
- `@keyframes xvi-grid-breathe` (L789-793)

### Particles & orbs
- `.xvi-hero-particles` + `.xvi-hero-particle` (L796-838)
- `@keyframes xvi-float` (L819-838)
- `.xvi-hero-monogram` (L841-853)
- `.xvi-hero-orb` variants (L856-898)
- `@keyframes xvi-glow-pulse` (L901-905)

### Content
- `.xvi-hero-topline` (L907-916)
- `.xvi-live-mark` + i + animation (L918-937)
- `@keyframes xvi-pulse` (L934-937)
- `.xvi-hero-layout` (L939-945)
- `.xvi-kicker` (L947-954)
- `.xvi-hero-title` + em (L956-970)
- `.xvi-hero-bottom` + p (L972-986)

### Lens panel
- `.xvi-hero-lens` + ::before/::after (L989-1027)
- `.xvi-lens-head/foot` (L1028-1037)
- `.xvi-lens-core` (L1039-1045)
- `.xvi-lens-rings` + variants (L1047-1077)
- `.xvi-lens-centre` + span/small (L1079-1108)
- `.xvi-lens-label` variants (L1110-1125)
- `.xvi-lens-signals` + children (L1127-1149)
- `.xvi-lens-foot` (L1151-1161)
- `@keyframes xvi-spin` (L1162)

**premium-polish.css overrides → hero.css:**
- Section 2 (L32-53): `.xvi-hero-stage`, `.xvi-hero-title`, `.xvi-hero-bottom`
- Section 8 (L142-158): `.xvi-hero-lens`, `.xvi-lens-centre`, `.xvi-lens-signals`
- Section 17 (L249-253): `.xvi-hero-monogram`
- Section 26 (L377-382): `.xvi-kicker`
- Section 27 (L385-387): `.xvi-hero-bottom` border

---

## Module 5: `sections.css`

**App.css lines 1253-1313** — Section containers & practice ledger:

### Page sections
- `.xvi-site-page > section, .xvi-capability-page > section` (L1253-1256)
- `.xvi-site-page, .xvi-capability-page` counter-reset (L1258-1259)
- `.xvi-page-section` counter-increment (L1260)
- `.xvi-page-section-content` (L1261)
- `.xvi-section-chapter` (L1263-1265)
- `.xvi-section-orbit` + pseudo + i (L1266-1271)
- `.xvi-page-section:nth-of-type-*` variants (L1272-1279)
- `.xvi-page-section.bg-\[...` (L1277-1279)

### Practice ledger
- `.xvi-practice-ledger` + children (L1285-1304)
- Responsive (L1299-1313)

### Responsive section overrides
- `@media (max-width: 640px)` section-specific (L1306-1313)

**premium-polish.css overrides → sections.css:**
- Section 3 (L56-67): `.xvi-page-section`, `.xvi-room-heading`
- Section 23 (L333-347): `.xvi-practice-title h3`, `.xvi-practice-ledger article > p`, `.xvi-practice-ledger article > ul li`

---

## Module 6: `cards.css`

**App.css lines 1319-1649** — Service cards & editorial layout:

### Services layout
- `.xvi-services-premium` + ::before (L1319-1339)
- `.xvi-services-premium-header` (L1341-1349)
- `.xvi-services-premium-label` (L1351-1362)
- `.xvi-services-premium-intro` (L1364-1373)
- `.xvi-services-editorial` (L1376-1394)
- Responsive (L1389-1394)

### Service card system
- `.xvi-service-card` (L1397-1405)
- `.xvi-service-card-border` + hover (L1408-1438)
- `.xvi-service-card-glow` + hover (L1441-1457)
- `.xvi-service-card-sweep` + hover (L1460-1479)
- `.xvi-service-card-reflection` (L1482-1497)
- `.xvi-service-card-inner` + hover (L1500-1522)
- `.xvi-service-card-header` (L1525-1530)
- `.xvi-service-card-num` (L1532-1537)
- `.xvi-service-card-icon` + hover (L1539-1563)
- `.xvi-service-icon-svg` (L1551-1554)
- `.xvi-service-card-title` (L1566-1574)
- `.xvi-service-card-desc` (L1577-1582)
- `.xvi-service-card-tags` + tag + hover (L1585-1610)
- `.xvi-service-card-accent-line` + hover (L1613-1632)
- Card nth-child variants (L1635-1649)

**premium-polish.css overrides → cards.css:**
- Section 4 (L69-94): `.xvi-service-card-inner`, `.xvi-service-card-title`, `.xvi-service-card-desc`, `.xvi-service-card-tags`, `.xvi-service-card-tag`
- Section 5 (L96-111): Shared card hover interaction (`.xvi-service-card-inner`, `.xvi-feature-card-inner`, `.xvi-about-story-inner`)

---

## Module 7: `rooms.css`

**App.css lines 1655-1727** — Room sections:

- `.room-section` (L1655-1657)
- `.room-section:not(.room-section--arrival) .room-surface--atelier` + ::before + > .relative (L1659-1681)
- `.xvi-room-heading` + children (L1683-1700)
- `.xvi-next-room` + ::before + hover (L1703-1727)

**premium-polish.css overrides → rooms.css:**
- Section 3 (L61-67): `.xvi-room-heading` margin, `.xvi-room-heading h2` margin

---

## Module 8: `about.css`

**App.css lines 1732-1996** — About page:

- `.xvi-about-premium` (L1732)
- `.xvi-about-grid` + responsive (L1735-1996)
- `.xvi-about-left` (L1742-1745)
- `.xvi-about-manifesto*` (L1748-1792)
- `.xvi-about-orb*` (L1795-1817)
- `.xvi-about-stories` (L1820-1824)
- `.xvi-about-story*` (L1826-1928)
- `.xvi-about-stats` + stat + glow (L1930-1996)
- Responsive (L1992-1996)

**premium-polish.css overrides → about.css:**
- Section 19 (L269-283): `.xvi-about-manifesto-title`, `.xvi-about-story-title`, `.xvi-about-story-body`
- Section 28 (L390-398): `.xvi-about-story-inner`, `.xvi-about-story-eyebrow`
- Section 29 (L401-413): `.xvi-about-stat`, `.xvi-about-stat-label`, `.xvi-about-stat-text`

---

## Module 9: `timeline.css`

**App.css lines 2001-2013** — Process timeline:

- `.xvi-timeline-premium` (L2001)
- `.xvi-timeline-track` (L2002)
- `.xvi-timeline-track-glow` (L2003)
- `.xvi-timeline-steps` (L2004)
- `.xvi-timeline-step` (L2005)
- `.xvi-timeline-node` + ring + span (L2006-2008)
- `.xvi-timeline-connector` (L2009)
- `.xvi-timeline-content` (L2010)
- `.xvi-timeline-phase` (L2011)
- `.xvi-timeline-title` (L2012)
- `.xvi-timeline-desc` (L2013)

**premium-polish.css overrides → timeline.css:**
- Section 24 (L350-357): `.xvi-timeline-title`, `.xvi-timeline-desc`

---

## Module 10: `features.css`

**App.css lines 2019-2358** — Features page:

### Container & background
- `.xvi-features-premium` (L2019-2024)
- `.xvi-features-bg` (L2027-2032)
- `.xvi-features-mesh` (L2034-2043)
- `.xvi-features-glow*` (L2045-2065)
- `.xvi-features-particles/particle` (L2067-2085)
- `@keyframes xvi-feature-float` (L2081-2085)

### Editorial header
- `.xvi-features-header` + left (L2088-2100)
- `.xvi-features-label` (L2102-2113)
- `.xvi-features-intro` + em (L2115-2129)

### Feature card grid
- `.xvi-features-grid` (L2132-2138)
- `.xvi-feature-card` (L2141-2148)
- `.xvi-feature-card-border` + hover (L2150-2166)
- `.xvi-feature-card-glow` + hover (L2168-2178)
- `.xvi-feature-card-sweep` + hover (L2180-2191)
- `.xvi-feature-card-reflection` (L2193-2203)
- `.xvi-feature-card-inner` + hover (L2205-2226)
- `.xvi-feature-card-header` (L2228-2233)
- `.xvi-feature-card-num` (L2235-2240)
- `.xvi-feature-card-icon` + hover (L2242-2266)
- `.xvi-feature-card-title` (L2268-2276)
- `.xvi-feature-card-accent` + hover (L2278-2292)

### Editorial columns
- `.xvi-features-columns` (L2295-2303)
- `.xvi-features-column` (L2305-2307)
- `.xvi-features-column-num` (L2309-2315)
- `.xvi-features-column-eyebrow` (L2317-2323)
- `.xvi-features-column-title` (L2325-2333)
- `.xvi-features-column-rule` (L2335-2341)
- `.xvi-features-column-text` (L2343-2348)
- Responsive (L2350-2358)

**premium-polish.css overrides → features.css:**
- Section 22 (L317-330): `.xvi-feature-card-title`, `.xvi-features-column-title`, `.xvi-features-column-text`

---

## Module 11: `technology.css`

**App.css lines 2363-2380** — Technology AI section:

- `.xvi-tech-premium` + responsive (L2363, L2380)
- `.xvi-tech-premium-visual` (L2364)
- `.xvi-tech-network-bg/line*` (L2365-2370)
- `@keyframes xvi-network-pulse` (L2371)
- `.xvi-tech-mesh-glow` (L2372)
- `.xvi-tech-premium-info` (L2373)
- `.xvi-tech-premium-label` (L2374)
- `.xvi-tech-premium-title` (L2375)
- `.xvi-tech-premium-desc` (L2376)
- `.xvi-tech-premium-stack` + b + hover (L2377-2379)

**premium-polish.css overrides → technology.css:**
- Section 25 (L359-374): `.xvi-tech-premium-title`, `.xvi-tech-premium-desc`, `.xvi-tech-premium-stack b`

---

## Module 12: `testimonials.css`

**App.css lines 2386-2790** — All `.xvi-testimonials-*` and `.xvi-testimonial-*`:

### Container & background
- `.xvi-testimonials-premium` (L2386-2391)
- `.xvi-testimonials-bg/mesh/glow*` (L2394-2432)
- `.xvi-testimonials-particles/particle` (L2434-2452)
- `@keyframes xvi-testimonial-float` (L2448-2452)

### Header
- `.xvi-testimonials-header` + left (L2455-2467)
- `.xvi-testimonials-label` (L2469-2476)
- `.xvi-testimonials-intro` + em (L2478-2490)
- `.xvi-testimonials-quote-mark` (L2492-2499)

### Main stage
- `.xvi-testimonials-stage` (L2502-2509)
- `.xvi-testimonials-main` + border/glow/sweep/reflection (L2511-2569)

### Slide content
- `.xvi-testimonial-slide*` (L2572-2590)
- `.xvi-testimonial-big-quote` (L2592-2602)
- `.xvi-testimonial-quote` (L2604-2612)
- `.xvi-testimonial-identity` (L2615-2622)
- `.xvi-testimonial-avatar` + verified (L2624-2650)
- `.xvi-testimonial-info` (L2652-2656)
- `.xvi-testimonial-name` (L2658-2662)
- `.xvi-testimonial-role` (L2664-2668)
- `.xvi-testimonial-meta/company/country` (L2670-2690)

### Stats sidebar
- `.xvi-testimonials-stats/stat/num/label` (L2693-2723)

### Navigation
- `.xvi-testimonials-nav/dots/dot/progress/counter*` (L2726-2782)

### Responsive
- `@media (max-width: 768px)` (L2784-2790)

**premium-polish.css overrides → testimonials.css:**
- Section 20 (L286-299): `.xvi-testimonial-quote`, `.xvi-testimonial-name`, `.xvi-testimonial-role`

---

## Module 13: `cta.css`

**App.css lines 2796-3156** — CTA cinematic section:

### Container & background
- `.xvi-cta-cinematic` (L2796-2808)
- `.xvi-cta-bg` (L2811-2815)
- `.xvi-cta-mesh` (L2817-2826)
- `.xvi-cta-grid` + keyframes (L2828-2843)
- `.xvi-cta-glow*` + keyframes (L2845-2883)
- `.xvi-cta-waves` (L2885-2898)
- `.xvi-cta-particles/particle` + keyframes (L2900-2922)

### Decorative
- `.xvi-cta-monogram` (L2925-2937)
- `.xvi-cta-shape*` + keyframes (L2940-2975)

### Content
- `.xvi-cta-content` (L2978-2985)
- `.xvi-cta-label` (L2987-2994)
- `.xvi-cta-headline` + em (L2996-3009)
- `.xvi-cta-sub` (L3011-3017)

### Buttons
- `.xvi-cta-actions` (L3020-3026)
- `.xvi-cta-btn` (L3028-3041)
- `.xvi-cta-btn--primary` + hover (L3043-3056)
- `.xvi-cta-btn-shine/glow` + hover (L3058-3080)
- `.xvi-cta-btn--secondary` + hover (L3082-3095)

### Trust & stamp
- `.xvi-cta-trust*` (L3098-3124)
- `.xvi-cta-stamp*` (L3127-3149)

### Responsive
- `@media (max-width: 768px)` (L3151-3156)

**premium-polish.css overrides → cta.css:**
- Section 18 (L256-266): `.xvi-cta-headline`, `.xvi-cta-sub`
- Section 6 (L114-119): `.xvi-cta-btn--primary` (shared with `.xvi-premium-button`)

---

## Module 14: `footer.css`

**App.css lines 3162-3509** — All `.xvi-footer*`:

### Container & background
- `.xvi-footer` (L3162-3167)
- `.xvi-footer-transition` (L3170-3179)
- `.xvi-footer-bg/grid` (L3182-3197)
- `.xvi-footer-glow*` (L3199-3221)
- `.xvi-footer-monogram` (L3224-3236)

### Inner layout
- `.xvi-footer-inner` (L3239-3244)
- `.xvi-footer-hero` + aside (L3247-3273)
- `.xvi-footer-eyebrow` (L3255-3260)
- `.xvi-footer-title` (L3262-3269)
- `.xvi-footer-desc` (L3275-3280)

### CTA button
- `.xvi-footer-cta` + hover (L3283-3323)

### Divider
- `.xvi-footer-divider` + thin (L3331-3339)

### Navigation grid
- `.xvi-footer-nav` (L3342-3347)
- `.xvi-footer-brand/logo` + hover (L3349-3367)
- `.xvi-footer-location` (L3369-3374)

### Social icons
- `.xvi-footer-social/social-link` + hover (L3377-3407)

### Links
- `.xvi-footer-links` (L3410-3414)
- `.xvi-footer-link` + hover + arrow (L3416-3449)

### Copyright
- `.xvi-footer-bottom/copyright/tagline` (L3452-3476)

### Responsive
- `@media (max-width: 1024px)` (L3479-3493)
- `@media (max-width: 640px)` (L3495-3509)
- Footer link transform override (L3812-3813)

**premium-polish.css overrides → footer.css:**
- Section 9 (L161-193): `.xvi-footer`, `.xvi-footer-inner`, `.xvi-footer-hero`, `.xvi-footer-title`, `.xvi-footer-desc`, `.xvi-footer-links`, `.xvi-footer-link`

---

## Module 15: `pricing.css`

**App.css lines 3515-3813** — Pricing section:

### Container & background
- `.xvi-pricing-premium` (L3515-3520)
- `.xvi-pricing-bg` (L3522-3527)
- `.xvi-pricing-glow*` (L3529-3549)

### Card grid
- `.xvi-pricing-grid` (L3551-3558)
- `.xvi-pricing-card` (L3560-3564)
- `.xvi-pricing-card-border` + hover (L3566-3582)
- `.xvi-pricing-card-glow` + hover (L3584-3594)
- `.xvi-pricing-card-sweep` + hover (L3596-3607)
- `.xvi-pricing-card-reflection` (L3609-3619)
- `.xvi-pricing-card--highlighted` variants (L3621-3637)
- `.xvi-pricing-card-badge` (L3639-3653)

### Card inner
- `.xvi-pricing-card-inner` + hover (L3655-3675)
- `.xvi-pricing-card-header` (L3677)
- `.xvi-pricing-card-eyebrow` (L3679-3686)
- `.xvi-pricing-card-name` (L3688-3696)
- `.xvi-pricing-card-desc` (L3698-3703)
- `.xvi-pricing-card-price` (L3705-3712)
- `.xvi-pricing-card-amount` (L3714-3720)
- `.xvi-pricing-card-note` (L3722-3726)
- `.xvi-pricing-card-features` (L3728-3734)
- `.xvi-pricing-feature` (L3736-3742)
- `.xvi-pricing-check-icon` (L3744-3749)

### CTA buttons
- `.xvi-pricing-card-cta` + hover + primary variant (L3751-3803)
- `.xvi-pricing-cta-shine` + hover (L3792-3803)

### Responsive
- `@media (max-width: 768px)` (L3805-3810)

**premium-polish.css overrides → pricing.css:**
- Section 21 (L302-314): `.xvi-pricing-card-name`, `.xvi-pricing-card-desc`, `.xvi-pricing-feature`

---

## Module 16: `buttons.css`

**App.css lines 1168-1216** — Shared premium button:
- `.xvi-premium-button` + pseudo (L1168-1216)
- `@keyframes` (none — uses transitions)

**premium-polish.css overrides → buttons.css:**
- Section 6 (L114-119): `.xvi-premium-button` letter-spacing, weight, padding

---

## Module 17: `utilities.css`

Shared patterns extracted from multiple modules to eliminate duplication.

### Glass card base pattern
Repeated across `.xvi-service-card-inner`, `.xvi-feature-card-inner`, `.xvi-about-story-inner`, `.xvi-testimonial-slide-inner`, `.xvi-pricing-card-inner`:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
}
```

### Gradient border pattern
Repeated across `.xvi-service-card-border`, `.xvi-feature-card-border`, `.xvi-testimonials-main-border`, `.xvi-pricing-card-border`:
```css
.gradient-border {
  position: absolute; inset: 0;
  padding: 1px;
  background: linear-gradient(145deg, rgba(255,255,255,.55), rgba(184,142,47,.08), rgba(255,255,255,.35));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### Hover sweep pattern
Repeated across multiple card types:
```css
.hover-sweep { /* translateX(110%) → translateX(-110%) on hover */ }
```

### Reflection pattern
Repeated across card types.

### Interactive surface cursor-follow
Lines 1222-1247: `.xvi-interactive-surface` — can be a utility class.

### Shared transition shorthand
`cubic-bezier(0.16, 1, 0.3, 1)` is used ~60+ times — define as `--ease-premium` (already in tokens.css but not consistently used).

### premium-polish.css cross-cutting overrides:
- Section 5 (L96-111): Unified card hover — could become a utility or stay in respective modules
- Section 10 (L196-198): `html { scroll-behavior: smooth }` → base.css
- Section 11 (L201-204): `:focus-visible` → base.css
- Section 12 (L207-210): `::selection` → base.css
- Section 13 (L213-216): `img` rendering → base.css
- Section 14 (L219-223): Body text rendering → base.css
- Section 15 (L226-228): Link transitions → base.css
- Section 16 (L231-246): Scrollbar → base.css

---

## Module 18: `reduced-motion.css`

**App.css lines 3848-3877** — All `@media (prefers-reduced-motion: reduce)`:
- Form element transitions (L3849-3854)
- `.xvi-hero-particle` disable (L3856-3860)
- `.xvi-hero-mesh-light*` disable (L3862-3866)
- `.xvi-hero-grid-overlay` disable (L3868-3871)
- `.xvi-hero-orb--glow` disable (L3873-3876)

---

## Duplicated Patterns to Extract as Utilities

| Pattern | Appears in | Times | Suggested Utility |
|---------|-----------|-------|-------------------|
| Glass card inner (bg + blur + border + shadow) | service-card-inner, feature-card-inner, about-story-inner, testimonial-slide-inner, pricing-card-inner | 5 | `.glass-card` |
| Gradient border mask (1px padding + mask-composite) | service-card-border, feature-card-border, testimonials-main-border, pricing-card-border | 4 | `.gradient-border` |
| Hover sweep animation (translateX 110%) | service-card-sweep, feature-card-sweep, pricing-card-sweep, testimonials-main-sweep | 4 | `.hover-sweep` |
| Top reflection gradient | service-card-reflection, feature-card-reflection, pricing-card-reflection, testimonials-main-reflection | 4 | `.reflection` |
| Cursor glow radial gradient | service-card-glow, feature-card-glow, pricing-card-glow, testimonials-main-glow | 4 | `.cursor-glow` |
| Bronze accent line (gradient + scaleX) | service-card-accent-line, feature-card-accent | 2 | `.accent-line` |
| Editorial header layout | services-premium-header, features-header, testimonials-header | 3 | `.editorial-header` |
| Section label pill (navy bg, bronze text, rounded) | services-premium-label, features-label | 2 | `.section-label` |
| `cubic-bezier(0.16, 1, 0.3, 1)` ease | ~60+ occurrences | 60+ | Use `--ease-premium` from tokens |

---

## Implementation Order

1. **Phase 1 — Foundation:** `tokens.css` (exists), `base.css`, `utilities.css`
2. **Phase 2 — Layout:** `sections.css`, `rooms.css`, `navigation.css`
3. **Phase 3 — Hero:** `hero.css`, `intro.css`
4. **Phase 4 — Content:** `cards.css`, `about.css`, `features.css`, `testimonials.css`, `pricing.css`
5. **Phase 5 — Supporting:** `timeline.css`, `technology.css`, `cta.css`, `footer.css`, `buttons.css`
6. **Phase 6 — Polish:** `reduced-motion.css`
7. **Phase 7 — Cleanup:** Delete `premium-polish.css`, update `App.css` imports

---

## Entry Point: New `App.css`

```css
/* XVI Group — Premium Visual System */
/* Tokens must load first */
@import "./tokens.css";

/* Foundation */
@import "./base.css";
@import "./utilities.css";

/* Layout */
@import "./sections.css";
@import "./rooms.css";
@import "./navigation.css";

/* Hero */
@import "./intro.css";
@import "./hero.css";

/* Content modules */
@import "./cards.css";
@import "./about.css";
@import "./features.css";
@import "./testimonials.css";
@import "./pricing.css";
@import "./timeline.css";
@import "./technology.css";

/* Terminal sections */
@import "./cta.css";
@import "./footer.css";

/* Shared components */
@import "./buttons.css";

/* Accessibility */
@import "./reduced-motion.css";
```

---

## Risks & Notes

1. **premium-polish.css uses `!important` throughout** — during merge, evaluate each override: if the value is the intended final value, integrate it directly into the module (removing `!important`). Only keep `!important` where truly needed for load-order-based overrides.

2. **Shared card hover pattern** (premium-polish.css L96-111) applies to three different card types. This should become a utility class or stay duplicated in each module with consistent values.

3. **`@keyframes xvi-spin`** (L1162) is used by both hero lens and timeline. Place in `utilities.css` or define in both modules.

4. **`@keyframes xvi-glow-pulse`** (L901-905) is used by both hero orbs and tech mesh glow. Same treatment as xvi-spin.

5. **Line count in tokens.css** defines `--ease-premium` and `--glass-blur` etc. but many of these tokens are unused in App.css (hardcoded values instead). Consider a follow-up pass to replace hardcoded values with token references.

6. **Load order matters** — `base.css` must load before component modules. `tokens.css` must be first (provides CSS custom properties). `reduced-motion.css` must be last.
