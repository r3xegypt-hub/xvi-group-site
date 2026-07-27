# COMPONENT LIBRARY — Complete Component Specification

> Every reusable UI component: variants, states, responsive, animation, accessibility.

---

## Component Naming Convention

```
XVI-[Category]-[Name]

Categories: Button, Card, Form, Layout, Navigation, Content, Feedback
```

---

## 1. BUTTONS

### 1.1 XVI-Button-Primary

**Purpose:** Primary CTA — the most important action on any page.

| Property | Value |
|----------|-------|
| Background | `#C9A96E` |
| Text color | `#FFFFFF` |
| Font | Poppins 600, 0.875rem / 1.25rem |
| Padding | 16px 32px |
| Border-radius | 2px |
| Border | None |
| Letter-spacing | 0.04em |
| Text-transform | Uppercase |

**States:**
| State | Changes |
|-------|---------|
| Default | As above |
| Hover | `background: #D4B87A`, `box-shadow: 0 4px 24px rgba(201,169,110,0.25)` |
| Active | `transform: scale(0.97)`, `box-shadow: 0 2px 8px rgba(201,169,110,0.2)` |
| Focus | `outline: 2px solid #C9A96E`, `outline-offset: 2px` |
| Disabled | `opacity: 0.4`, `cursor: not-allowed`, no hover effect |
| Loading | Spinner icon replaces text, button width locked |

**Responsive:**
| Breakpoint | Padding | Font Size |
|-----------|---------|-----------|
| Mobile (<640px) | 14px 24px | 0.8125rem |
| Tablet (640-1024px) | 16px 28px | 0.875rem |
| Desktop (>1024px) | 16px 32px | 0.875rem |

**Animation:** Hover 250ms `ease-out-quint`, Press 150ms `ease-out-expo`, Release 300ms `ease-spring`

**Accessibility:** `role="button"`, `aria-label` if icon-only, `tabindex="0"`, keyboard Enter/Space support

---

### 1.2 XVI-Button-Secondary

**Purpose:** Secondary actions — less prominent alternatives.

| Property | Value |
|----------|-------|
| Background | `transparent` |
| Text color | `#C9A96E` |
| Font | Poppins 600, 0.875rem / 1.25rem |
| Padding | 16px 32px |
| Border-radius | 2px |
| Border | 1px solid `rgba(201,169,110,0.3)` |
| Letter-spacing | 0.04em |
| Text-transform | Uppercase |

**States:**
| State | Changes |
|-------|---------|
| Default | As above |
| Hover | `background: rgba(201,169,110,0.08)`, `border-color: rgba(201,169,110,0.6)` |
| Active | `transform: scale(0.97)` |
| Focus | `outline: 2px solid #C9A96E`, `outline-offset: 2px` |
| Disabled | `opacity: 0.4`, `cursor: not-allowed` |

---

### 1.3 XVI-Button-Ghost

**Purpose:** Tertiary actions — text links with arrow indicators.

| Property | Value |
|----------|-------|
| Background | `transparent` |
| Text color | `#C9A96E` |
| Font | Poppins 500, 0.875rem / 1.25rem |
| Padding | 8px 0 |
| Border | None |
| Arrow | `→` with `translateX: 0` |

**States:**
| State | Changes |
|-------|---------|
| Default | Text + arrow |
| Hover | Arrow `translateX: 4px`, underline gradient slides left-to-right |
| Focus | `outline: 2px solid #C9A96E`, `outline-offset: 4px` |

**Arrow icon:** SVG `<path>` — 16px, stroke-width 2, currentColor

---

### 1.4 XVI-Button-Icon

**Purpose:** Icon-only buttons (close, menu, search).

| Property | Value |
|----------|-------|
| Size | 48px × 48px (touch target minimum) |
| Background | `transparent` |
| Icon | 24px × 24px, stroke-width 1.5 |
| Border-radius | 2px |

---

## 2. CARDS

### 2.1 XVI-Card-Service

**Purpose:** Service offering showcase.

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | `1px solid rgba(201,169,110,0.12)` |
| Border-radius | 2px |
| Padding | 40px |
| Shadow | `0 4px 24px rgba(10,22,40,0.04)` |
| Accent bar | Top 3px, `#C9A96E`, `scaleX: 0` (grows on hover) |

**Layout:**
```
┌─────────────────────────────┐
│ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ (gold bar) │
│                             │
│  [Icon] 48×48              │
│                             │
│  Service Title              │
│  Poppins 600 / 1.5rem      │
│                             │
│  Brief description text     │
│  DM Sans 400 / 1rem        │
│                             │
│  Learn More →               │
└─────────────────────────────┘
```

**States:**
| State | Changes |
|-------|---------|
| Default | Static card |
| Hover | `translateY: -8px`, `box-shadow: 0 12px 40px rgba(10,22,40,0.08)`, gold bar `scaleX: 1`, arrow `translateX: 4px` |
| Focus (keyboard) | `outline: 2px solid #C9A96E`, `outline-offset: 2px` |

**Responsive:**
| Breakpoint | Padding | Layout |
|-----------|---------|--------|
| Mobile | 24px | Full width, stacked |
| Tablet | 32px | 2 columns |
| Desktop | 40px | 3 columns or 4 columns |

---

### 2.2 XVI-Card-CaseStudy

**Purpose:** Portfolio/case study showcase.

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | `1px solid rgba(201,169,110,0.12)` |
| Border-radius | 2px |
| Overflow | Hidden (image containment) |
| Shadow | `0 4px 24px rgba(10,22,40,0.04)` |

**Layout:**
```
┌─────────────────────────────┐
│  [Image 16:9]               │
│  Cover image                │
├─────────────────────────────┤
│  Industry Tag               │
│  Case Study Title           │
│  Brief outcome text         │
│                             │
│  [Stat] [Stat] [Stat]       │
│                             │
│  Read Case Study →          │
└─────────────────────────────┘
```

**Hover:** Image `scale: 1.05`, overlay fades in, content slides up 20px

---

### 2.3 XVI-Card-Insight

**Purpose:** Blog post / insight article preview.

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | `1px solid rgba(201,169,110,0.12)` |
| Border-radius | 2px |
| Padding | 32px |

**Layout:**
```
┌─────────────────────────────┐
│  [Image 16:9]               │
├─────────────────────────────┤
│  Category Tag   •   Date    │
│                             │
│  Article Title              │
│  Poppins 600 / 1.25rem     │
│                             │
│  Excerpt text two lines     │
│                             │
│  Author Avatar + Name       │
│  Read Time                  │
└─────────────────────────────┘
```

---

### 2.4 XVI-Card-Stat

**Purpose:** Key metric / statistic display.

| Property | Value |
|----------|-------|
| Background | `#0A1628` (dark card) |
| Text color | `#FFFFFF` |
| Border-radius | 2px |
| Padding | 40px |
| Number | DM Sans 700, 3rem, `#C9A96E` |
| Label | DM Sans 400, 0.875rem, `#C8CDD5` |

**Layout:**
```
┌─────────────────────────────┐
│                             │
│       200+                  │
│       Projects Delivered    │
│                             │
└─────────────────────────────┘
```

---

### 2.5 XVI-Card-Industry

**Purpose:** Industry vertical showcase.

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | `1px solid rgba(201,169,110,0.12)` |
| Border-radius | 2px |
| Padding | 32px |

**Hover:** Icon color shifts to gold, subtle lift, arrow appears

---

### 2.6 XVI-Card-Testimonial

**Purpose:** Client testimonial / quote.

| Property | Value |
|----------|-------|
| Background | `#F8F6F2` |
| Border | `1px solid rgba(201,169,110,0.12)` |
| Border-radius | 2px |
| Padding | 40px |
| Quote mark | Large `"` in Executive Gold, decorative |

**Layout:**
```
┌─────────────────────────────┐
│  "                           │
│                             │
│  Quote text in DM Sans      │
│  italic, 1.125rem           │
│                             │
│  ─────────────              │
│  Author Name                │
│  Title, Company             │
│  [Avatar]                   │
└─────────────────────────────┘
```

---

### 2.7 XVI-Card-Team

**Purpose:** Leadership team member.

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | `1px solid rgba(201,169,110,0.12)` |
| Border-radius | 2px |
| Image | 100% width, aspect-ratio 3/4, object-fit cover |
| Padding (content) | 24px |

---

## 3. FORMS

### 3.1 XVI-Input-Text

**Purpose:** Single-line text input.

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | 1px solid `#C8CDD5` |
| Border-radius | 2px |
| Padding | 16px |
| Font | DM Sans 400, 1rem |
| Height | 56px |

**States:**
| State | Changes |
|-------|---------|
| Default | As above |
| Focus | `border-color: #C9A96E`, `box-shadow: 0 0 0 3px rgba(201,169,110,0.15)` |
| Error | `border-color: #E74C3C`, `box-shadow: 0 0 0 3px rgba(231,76,60,0.1)` |
| Success | `border-color: #27AE60` |
| Disabled | `background: #F4F5F7`, `opacity: 0.6` |

**Label:** Floats up on focus/filled, transitions 200ms `ease-out-expo`

**Error message:** Below input, DM Sans 400, 0.75rem, `#E74C3C`, 200ms fade-in

---

### 3.2 XVI-Input-Select

**Purpose:** Dropdown selection.

Same styling as XVI-Input-Text with custom dropdown arrow icon.

**States:** Same as text input + dropdown panel with options list.

---

### 3.3 XVI-Input-Textarea

**Purpose:** Multi-line text input.

| Property | Value |
|----------|-------|
| Min-height | 120px |
| Resize | Vertical only |

---

### 3.4 XVI-Input-Checkbox

**Purpose:** Boolean selection.

| Property | Value |
|----------|-------|
| Size | 20px × 20px |
| Border | 2px solid `#C8CDD5` |
| Checked | Background `#C9A96E`, white checkmark SVG |

---

### 3.5 XVI-Form-Contact

**Purpose:** Contact form layout.

**Fields:** Name, Email, Phone, Company, Service Interest (select), Budget Range (select), Message (textarea), Submit button

**Layout:** 2-column on desktop, single column on mobile. Labels float above inputs.

---

## 4. NAVIGATION

### 4.1 XVI-Nav-Desktop

**Purpose:** Primary desktop navigation.

| Property | Value |
|----------|-------|
| Height | 96px (expanded) / 64px (compact) |
| Background | `rgba(255,255,255,0.92)` |
| Backdrop-filter | `blur(12px)` |
| Border-bottom | `1px solid rgba(201,169,110,0.08)` |
| Position | `sticky`, `top: 0` |
| Z-index | 1000 |

**Layout:**
```
┌──────────────────────────────────────────────────────┐
│  [Logo]     Services  ...  Contact    [EN|AR]  [CTA] │
└──────────────────────────────────────────────────────┘
```

**Mega Menu:**
- Background: `#FFFFFF`
- Border-bottom: `1px solid rgba(201,169,110,0.08)`
- Shadow: `0 24px 48px rgba(10,22,40,0.08)`
- Max-width: 1200px, centered
- Columns: Service categories with icons and descriptions
- Animation: `opacity: 0→1`, `translateY: 8px→0`, 200ms

---

### 4.2 XVI-Nav-Mobile

**Purpose:** Mobile navigation overlay.

**Trigger:** Hamburger icon (3 lines → X morph)

**Panel:**
- Full-screen overlay, background `#FFFFFF`
- Slide-in from right, 400ms `ease-out-expo`
- Menu items stagger in, 60ms each
- Font: Poppins 500, 1.25rem
- Language switcher at bottom

---

### 4.3 XVI-LangSwitch

**Purpose:** EN/AR language toggle.

**Desktop:**
```
┌──────────────────┐
│  EN    │    AR   │
│  ●─────│─────    │
└──────────────────┘
```
- Toggle width: 80px
- Active side: Gold background
- Thumb: White, `border-radius: 1px`
- Animation: 250ms `ease-out-back`

**Mobile:** Full-width toggle in mobile menu

---

## 5. LAYOUT COMPONENTS

### 5.1 XVI-Section

**Purpose:** Consistent section wrapper.

| Property | Value |
|----------|-------|
| Max-width | 1200px |
| Margin | `0 auto` |
| Padding | 120px 24px (desktop) / 80px 24px (mobile) |
| Background | Transparent or variant |

**Variants:**
| Variant | Background |
|---------|-----------|
| Default | `#FFFFFF` |
| Warm | `#F8F6F2` |
| Dark | `#0A1628` |
| Gold | `rgba(201,169,110,0.04)` |

---

### 5.2 XVI-Container

**Purpose:** Content container within sections.

| Property | Value |
|----------|-------|
| Max-width | 1200px |
| Margin | `0 auto` |
| Padding | `0 24px` |

---

### 5.3 XVI-Grid

**Purpose:** Responsive grid system.

**Columns:** 12-column grid
**Gutter:** 24px (mobile), 32px (tablet), 40px (desktop)

**Breakpoints:**
| Name | Min-width | Columns | Gutter |
|------|-----------|---------|--------|
| Mobile | 0 | 4 | 24px |
| Tablet | 640px | 8 | 32px |
| Desktop | 1024px | 12 | 40px |
| Wide | 1440px | 12 | 40px |

---

### 5.4 XVI-Divider

**Purpose:** Section divider.

**Variants:**
| Variant | Description |
|---------|------------|
| Line | 1px solid `rgba(201,169,110,0.12)`, max-width 120px, centered |
| Diamond | Small XII diamond, centered, flanked by lines |
| Gradient | Transparent → gold → transparent |

---

### 5.5 XVI-Overline

**Purpose:** Section overline label.

| Property | Value |
|----------|-------|
| Font | Poppins 500, 0.75rem |
| Color | `#C9A96E` |
| Letter-spacing | 0.2em |
| Text-transform | Uppercase |
| Bottom margin | 16px |

---

### 5.6 XVI-Headline

**Purpose:** Section headline.

| Property | Value |
|----------|-------|
| Font | Poppins 600 |
| Size | 2.5rem (mobile) → 3.5rem (desktop) |
| Line-height | 1.15 |
| Color | `#0A1628` |
| Max-width | 800px |

---

### 5.7 XVI-Subheadline

**Purpose:** Supporting text below headlines.

| Property | Value |
|----------|-------|
| Font | DM Sans 400 |
| Size | 1.125rem |
| Line-height | 1.6 |
| Color | `#5A6472` |
| Max-width | 600px |

---

## 6. CONTENT COMPONENTS

### 6.1 XVI-StatsBar

**Purpose:** Key statistics row.

**Layout:** 4 columns, each with number + label, separated by 1px vertical dividers.

**Number:** DM Sans 700, 3rem, `#C9A96E`
**Label:** DM Sans 400, 0.875rem, `#5A6472`

**Counter animation:** Numbers count up from 0 on scroll reveal

---

### 6.2 XVI-Timeline

**Purpose:** Company history / process steps.

**Layout:** Vertical line (left on desktop, centered on mobile) with nodes at each step.

| Property | Value |
|----------|-------|
| Line | 2px solid `rgba(201,169,110,0.2)` |
| Node | 16px circle, `#C9A96E` border, `#FFFFFF` fill |
| Active node | `#C9A96E` fill |

---

### 6.3 XVI-ClientLogos

**Purpose:** Trusted-by logo row.

**Layout:** Horizontal scroll on mobile, grid on desktop.
**Logo display:** Grayscale, 40% opacity, full color on hover.
**Max logo height:** 40px

---

### 6.4 XVI-CTABlock

**Purpose:** Call-to-action section.

| Property | Value |
|----------|-------|
| Background | `#0A1628` |
| Text | `#FFFFFF` |
| Accent | `#C9A96E` |
| Padding | 80px 40px |
| Layout | Centered text, headline + subtext + button |

---

### 6.5 XVI-Breadcrumb

**Purpose:** Page breadcrumb navigation.

| Property | Value |
|----------|-------|
| Font | DM Sans 400, 0.875rem |
| Separator | `/` in `#C8CDD5` |
| Current | `#0A1628` bold |
| Link | `#C9A96E` |

---

### 6.6 XVI-Accordion

**Purpose:** Expandable FAQ / content sections.

| Property | Value |
|----------|-------|
| Border-bottom | `1px solid rgba(201,169,110,0.12)` |
| Header | Poppins 500, 1.125rem |
| Icon | `+` rotates to `×` on open |
| Content | DM Sans 400, 1rem, `#5A6472` |
| Animation | Content height 300ms `ease-out-expo` |

---

### 6.7 XVI-PricingTable

**Purpose:** Service pricing comparison.

**Layout:** 3-column grid on desktop, stacked on mobile.

| Property | Value |
|----------|-------|
| Recommended column | Gold border-top, subtle background |
| Price | DM Sans 700, 3rem, `#0A1628` |
| Period | DM Sans 400, 0.875rem, `#5A6472` |

---

## 7. FEEDBACK COMPONENTS

### 7.1 XVI-Toast

**Purpose:** Notification messages.

| Variant | Background | Border-left |
|---------|-----------|-------------|
| Success | `#F0FFF4` | `#27AE60` |
| Error | `#FFF5F5` | `#E74C3C` |
| Warning | `#FFFFF0` | `#F39C12` |
| Info | `#F0F7FF` | `#3498DB` |

---

### 7.2 XVI-Loader

**Purpose:** Page/section loading indicator.

**Design:** XII diamond pulse animation + thin progress bar.

---

### 7.3 XVI-EmptyState

**Purpose:** No-content placeholder.

**Layout:** Centered illustration + heading + description + optional CTA

---

### 7.4 XVI-ScrollProgress

**Purpose:** Page scroll progress indicator.

**Design:** Fixed top bar, height 2px, `#C9A96E`, width = scroll percentage.

---

## 8. FOOTER

### 8.1 XVI-Footer

**Purpose:** Site-wide mega footer.

| Property | Value |
|----------|-------|
| Background | `#0A1628` |
| Text | `#FFFFFF` |
| Link | `#C8CDD5`, hover `#C9A96E` |
| Divider | `1px solid rgba(201,169,110,0.12)` |
| Padding-top | 80px |
| Padding-bottom | 40px |

**Layout:**
```
┌──────────────────────────────────────────────────────────┐
│  [Logo]                                                  │
│                                                          │
│  Services    Company     Insights     Legal              │
│  ────────    ────────    ────────     ──────             │
│  Strategy    About       Blog         Privacy            │
│  Technology  Team        Case Studies Terms              │
│  AI Trans.   Careers     Newsletter   Cookies            │
│  Training    Press       Events                          │
│                                                          │
│  ────────────────────────────────────────────────────    │
│                                                          │
│  [Social Icons]              [Newsletter Signup]         │
│                                                          │
│  ────────────────────────────────────────────────────    │
│                                                          │
│  © 2026 XVI GROUP. All rights reserved.                  │
│  Abu Dhabi  •  Dubai  •  Riyadh                          │
└──────────────────────────────────────────────────────────┘
```

**Responsive:** Columns stack on mobile, newsletter goes full-width

---

*Every component in this library maps to SCSS modules in `src/styles/components/`. No component exists outside this specification.*
