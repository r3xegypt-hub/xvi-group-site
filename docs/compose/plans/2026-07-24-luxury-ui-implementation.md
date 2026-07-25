# Luxury UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance XVI Group UI to achieve luxurious, high-end corporate identity through typography, card designs, and brand consistency.

**Architecture:** Incremental enhancement of existing premium design system, updating CSS variables, fonts, and component styles while preserving elegant structure.

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS, CSS custom properties

## Global Constraints
- Preserve existing elegant design structure
- Maintain compatibility with Arabic RTL layout
- Use CSS variables for all color changes
- Keep existing hover effects and micro-interactions
- Ensure accessibility standards are maintained

---

## Task 1: Typography Enhancement

**Covers:** [S3]
**Files:**
- Modify: `index.html:26-32` (add Cairo font import)
- Modify: `src/styles/tokens.css:26-30` (update font variables)
- Modify: `src/styles/index.css:38-69` (update heading weights)
- Modify: `src/styles/premium-polish.css:7-29` (update heading styles)

**Interfaces:**
- Consumes: Current font imports and CSS variables
- Produces: Updated typography system with Cairo font

- [ ] **Step 1: Add Cairo font to index.html**

```html
<!-- Replace line 32 with Cairo font import -->
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Update font variables in tokens.css**

```css
/* Update lines 26-30 */
--font-family-display: "DM Serif Display", "Cairo", Georgia, serif;
--font-family-body: "Cairo", "DM Sans", system-ui, sans-serif;
--font-family-english: "DM Sans", system-ui, -apple-system, sans-serif;
--font-family-ui: "Cairo", "DM Sans", system-ui, -apple-system, sans-serif;
--font-family-serif: "DM Serif Display", Georgia, serif;
```

- [ ] **Step 3: Update heading weights in index.css**

```css
/* Update lines 38-69 */
h1, h2, h3, h4, h5, h6 {
  font-family: "DM Serif Display", "Cairo", Georgia, serif;
  font-weight: 700; /* Changed from 400 to 700 */
  line-height: 1.15;
  text-wrap: balance;
  color: var(--color-xvi-ink);
  margin-bottom: 1em;
}

h1 { 
  font-size: clamp(3rem, 7vw, 5.5rem); 
  font-weight: 700; 
  letter-spacing: -0.02em; 
  line-height: 1.05;
  margin-bottom: 1.5em;
}

h2 { 
  font-size: clamp(2.25rem, 5vw, 4rem); 
  font-weight: 700; 
  letter-spacing: -0.015em; 
  line-height: 1.1;
  margin-bottom: 1.25em;
}

h3 { 
  font-size: clamp(1.5rem, 3vw, 2.25rem); 
  font-weight: 700; 
  letter-spacing: -0.01em; 
  line-height: 1.2;
  margin-bottom: 1em;
}

h4 { 
  font-size: clamp(1.25rem, 2vw, 1.75rem); 
  font-weight: 600; 
  letter-spacing: 0; 
  line-height: 1.3;
  margin-bottom: 0.75em;
}
```

- [ ] **Step 4: Update premium-polish.css heading styles**

```css
/* Update lines 7-29 */
h1 {
  font-family: "DM Serif Display", "Cairo", Georgia, serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
  line-height: 1.05 !important;
  margin-bottom: 1.5em !important;
}

h2 {
  font-family: "DM Serif Display", "Cairo", Georgia, serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.015em !important;
  line-height: 1.1 !important;
  margin-bottom: 1.25em !important;
}

h3 {
  font-family: "DM Serif Display", "Cairo", Georgia, serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.01em !important;
  line-height: 1.2 !important;
  margin-bottom: 1em !important;
}
```

- [ ] **Step 5: Test typography changes**

Run: `npm run dev` and check headings in browser
Expected: Headings appear with Bold (700) weight, Cairo font for Arabic text

- [ ] **Step 6: Commit typography changes**

```bash
git add index.html src/styles/tokens.css src/styles/index.css src/styles/premium-polish.css
git commit -m "feat: enhance typography with Cairo font and bold heading weights"
```

---

## Task 2: Card Redesign (The 'Kard' Concept)

**Covers:** [S4]
**Files:**
- Modify: `src/styles/App.css:1399-1660` (card styles)
- Modify: `src/styles/premium-polish.css:69-110` (card enhancements)

**Interfaces:**
- Consumes: Current card styles and CSS variables
- Produces: Standardized card design with glass effect

- [ ] **Step 1: Update card background to glass effect**

```css
/* Update lines 1503-1524 in App.css */
.xvi-service-card-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 2.5rem; /* Spacious padding */
  min-height: 340px;
  background: rgba(255, 255, 255, 0.55); /* Glass effect */
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.40); /* Subtle border */
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 
    0 6px 24px rgba(6, 10, 16, 0.04),
    0 1px 4px rgba(6, 10, 16, 0.015);
}
```

- [ ] **Step 2: Update card hover effects**

```css
/* Update lines 1526-1533 in App.css */
@media (hover: hover) {
  .xvi-service-card:hover .xvi-service-card-inner {
    transform: translateY(-8px); /* Maintained current effect */
    box-shadow: 
      0 24px 64px rgba(6, 10, 16, 0.08),
      0 8px 20px rgba(6, 10, 16, 0.03);
    border-color: rgba(201, 169, 110, 0.15); /* Subtle bronze accent */
  }
}
```

- [ ] **Step 3: Update card inner content styles**

```css
/* Update lines 1576-1620 in App.css */
.xvi-service-card-title {
  margin: 0 0 1.25rem;
  font-family: var(--font-family-display);
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--color-xvi-ink);
}

.xvi-service-card-desc {
  margin: 0 0 auto;
  color: var(--color-xvi-ink-soft);
  font-size: 0.95rem;
  line-height: 2; /* Increased line-height */
}

.xvi-service-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 2rem; /* Increased spacing */
  padding-top: 1.5rem; /* Increased padding */
  border-top: 1px solid rgba(12, 16, 22, 0.04);
}
```

- [ ] **Step 4: Update premium-polish.css card enhancements**

```css
/* Update lines 69-110 in premium-polish.css */
.xvi-service-card-inner {
  padding: 2.5rem !important;
  gap: 0 !important;
  background: rgba(255, 255, 255, 0.55) !important;
  backdrop-filter: blur(20px) saturate(1.3) !important;
  border: 1px solid rgba(255, 255, 255, 0.40) !important;
}

.xvi-service-card-title {
  margin-bottom: 1.25rem !important;
  line-height: 1.3 !important;
}

.xvi-service-card-desc {
  line-height: 2 !important;
  font-size: 0.95rem !important;
}

.xvi-service-card-tags {
  margin-top: 2rem !important;
  padding-top: 1.5rem !important;
}
```

- [ ] **Step 5: Test card changes**

Run: `npm run dev` and check cards in browser
Expected: Cards have glass effect, subtle borders, spacious padding

- [ ] **Step 6: Commit card changes**

```bash
git add src/styles/App.css src/styles/premium-polish.css
git commit -m "feat: redesign cards with glass effect and standardized styling"
```

---

## Task 3: Brand Identity & Colors

**Covers:** [S5]
**Files:**
- Modify: `src/styles/tokens.css:1-24` (update color variables)
- Modify: `src/styles/index.css:14-16` (update body background)

**Interfaces:**
- Consumes: Current color variables
- Produces: Unified global color palette

- [ ] **Step 1: Update color variables in tokens.css**

```css
/* Update lines 1-24 */
:root {
  /* XVI GROUP — Premium Design System v4 */

  /* Colors — Refined, consistent palette */
  --color-xvi-warm: #FAF8F4; /* Primary background - Luxury beige */
  --color-xvi-paper: #F5F2EC;
  --color-xvi-ink: #060A10;
  --color-xvi-ink-soft: #6B7280;
  --color-xvi-grey-1: #EEEAE3;
  --color-xvi-grey-2: #E2DED6;
  --color-xvi-grey-3: #C2BEB5;
  --color-xvi-glass: rgba(255,255,255,0.72);
  --color-xvi-glass-strong: rgba(255,255,255,0.88);
  --color-xvi-line: rgba(6,10,16,0.06);

  /* Accents — Executive bronze, consistent with logo */
  --color-xvi-bronze: #C9A96E;
  --color-xvi-bronze-light: #E8C98A;
  --color-xvi-bronze-soft: rgba(201,169,110,0.08);
  --color-xvi-bronze-glow: rgba(201,169,110,0.15);
  --color-xvi-navy: #060A10;
  --color-xvi-navy-deep: #030508;
  --color-xvi-navy-light: #1A1F2C;

  /* New luxury color variables */
  --primary-bg: #FAF8F4; /* Luxury beige */
  --secondary-bg: #FFFFFF; /* White for cards */
  --text-main: #B8965A; /* Dark gold for headings */
  --text-muted: #6B7280; /* Soft gray for labels */

  /* Typography — Premium luxury pairing */
  --font-family-display: "DM Serif Display", "Cairo", Georgia, serif;
  --font-family-body: "Cairo", "DM Sans", system-ui, sans-serif;
  --font-family-english: "DM Sans", system-ui, -apple-system, sans-serif;
  --font-family-ui: "Cairo", "DM Sans", system-ui, -apple-system, sans-serif;
  --font-family-serif: "DM Serif Display", Georgia, serif;

  /* ... rest of tokens remain unchanged */
}
```

- [ ] **Step 2: Update body background in index.css**

```css
/* Update lines 14-16 */
body {
  margin: 0;
  background: var(--primary-bg); /* Use new variable */
  color: var(--color-xvi-ink);
  font-family: var(--font-family-body);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 2.0; /* Increased for spacious feel */
  letter-spacing: 0.01em;
}
```

- [ ] **Step 3: Update heading colors to dark gold**

```css
/* Add to index.css after line 45 */
h1, h2, h3, h4, h5, h6 {
  color: var(--text-main); /* Dark gold for headings */
}
```

- [ ] **Step 4: Test color changes**

Run: `npm run dev` and check colors in browser
Expected: Luxury beige background, dark gold headings, consistent color usage

- [ ] **Step 5: Commit color changes**

```bash
git add src/styles/tokens.css src/styles/index.css
git commit -m "feat: implement unified luxury color palette with CSS variables"
```

---

## Task 4: Interactive Enhancements

**Covers:** [S6]
**Files:**
- Modify: `src/styles/index.css:4-11` (smooth scrolling)
- Modify: `src/styles/premium-polish.css:112-118` (button styling)
- Modify: `src/styles/App.css:1171-1219` (button effects)

**Interfaces:**
- Consumes: Current interactive styles
- Produces: Enhanced smooth scrolling and button styling

- [ ] **Step 1: Enhance smooth scrolling**

```css
/* Update lines 4-11 in index.css */
html {
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-padding-top: var(--header-offset);
  scroll-snap-type: y proximity;
  scroll-behavior: smooth; /* Ensure smooth scrolling */
}
```

- [ ] **Step 2: Update button styling to glass morphism**

```css
/* Update lines 112-118 in premium-polish.css */
.xvi-premium-button,
.xvi-cta-btn--primary {
  letter-spacing: 0.03em !important;
  font-weight: 600 !important;
  padding: 1.125rem 2rem !important;
  background: rgba(255, 255, 255, 0.55) !important;
  backdrop-filter: blur(20px) saturate(1.3) !important;
  border: 1px solid rgba(255, 255, 255, 0.40) !important;
  color: var(--color-xvi-navy) !important;
}
```

- [ ] **Step 3: Update button hover effects**

```css
/* Update lines 1171-1219 in App.css */
.xvi-premium-button {
  isolation: isolate;
  border: 1px solid rgba(255, 255, 255, 0.40);
  box-shadow: 0 14px 28px rgba(11,27,51,.10), inset 0 1px 0 rgba(255,255,255,.14);
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(20px) saturate(1.3);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (hover: hover) {
  .xvi-premium-button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 20px 40px rgba(11,27,51,.14), inset 0 1px 0 rgba(255,255,255,.18);
    border-color: rgba(201, 169, 110, 0.25);
    background: rgba(255, 255, 255, 0.65);
  }
}
```

- [ ] **Step 4: Test interactive enhancements**

Run: `npm run dev` and test scrolling and buttons
Expected: Smooth scrolling, glass morphism buttons with hover effects

- [ ] **Step 5: Commit interactive changes**

```bash
git add src/styles/index.css src/styles/premium-polish.css src/styles/App.css
git commit -m "feat: enhance smooth scrolling and glass morphism button styling"
```

---

## Task 5: Final Integration & Testing

**Covers:** [S7, S8]
**Files:**
- Test: All modified files
- Verify: Complete UI consistency

**Interfaces:**
- Consumes: All previous task outputs
- Produces: Fully integrated luxury UI

- [ ] **Step 1: Run full development server**

Run: `npm run dev`
Expected: Server starts without errors

- [ ] **Step 2: Visual verification**

Check in browser:
1. Typography: Cairo font for Arabic, Bold headings
2. Cards: Glass effect, subtle borders, spacious padding
3. Colors: Luxury beige background, dark gold headings
4. Interactions: Smooth scrolling, glass morphism buttons

- [ ] **Step 3: Cross-section testing**

Navigate through all sections:
- Hero section
- Services section
- About section
- Contact section
Expected: Consistent luxury styling throughout

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete luxury UI enhancement with brand consistency"
```

---

## Self-Review Results

**1. Spec coverage:**
- [S3] Typography Enhancement: Covered by Task 1
- [S4] Card Redesign: Covered by Task 2
- [S5] Brand Identity & Colors: Covered by Task 3
- [S6] Interactive Enhancements: Covered by Task 4
- [S7] Implementation Approach: Covered by Task 5
- [S8] Success Criteria: Covered by Task 5

**2. Placeholder scan:** No TBD/TODO found - all steps have complete code.

**3. Type consistency:** All CSS variables and class names are consistent across tasks.