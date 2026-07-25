---
type: spec
created: 2026-07-24T10:05:00Z
status: draft
---

# Luxury UI Design Specification

## [S1] Problem Statement

Update the existing XVI Group project UI to achieve a luxurious, high-end corporate identity similar to Apple or McKinsey, focusing on typography, card designs, and absolute brand consistency across all sections.

## [S2] Solution Overview

Enhance the existing premium design system with refined typography, improved card designs, and consistent brand colors while preserving the current elegant structure.

## [S3] Typography Enhancement

### [S3.1] Font Selection
- Replace current Arabic font with **Cairo** (premium Arabic font)
- Keep **DM Serif Display** for headings (luxury serif)
- Keep **DM Sans** for body text (clean modern sans)

### [S3.2] Weight Hierarchy
- **Headings (h1, h2, h3)**: Bold (700) for strong, authoritative presence
- **Body text**: Regular (400) for comfortable readability
- **Labels/captions**: Medium (500) for subtle hierarchy

### [S3.3] Spacing & Line Heights
- Increase line-height for body text to 2.0-2.1 for spacious, modern feel
- Maintain current generous letter-spacing
- Enhance Arabic text readability with proper word-spacing

## [S4] Card Redesign (The 'Kard' Concept)

### [S4.1] Standardization
- Apply consistent card styling across all card types:
  - Advisory Suites
  - Executive Viewpoints
  - Transformation Pipeline phases
  - Service cards
  - Feature cards
  - About story cards

### [S4.2] Visual Treatment
- **Background**: Glass effect (semi-transparent) with frosted glass backdrop
- **Borders**: Subtle 1px solid rgba(0,0,0,0.05) for definition
- **Padding**: Spacious 2.5rem internal padding
- **Border radius**: 20px for rounded, premium feel

### [S4.3] Hover Effects
- Maintain current elegant hover effects:
  - translateY(-8px) lift
  - Enhanced box-shadow
  - Smooth transitions (0.5s cubic-bezier(0.16, 1, 0.3, 1))
- Preserve existing card glow and sweep effects

## [S5] Brand Identity & Colors

### [S5.1] Global Color Palette (CSS Variables)
```css
:root {
  /* Primary Background */
  --primary-bg: #FAF8F4; /* Luxury beige */
  
  /* Secondary Background */
  --secondary-bg: #FFFFFF; /* White for cards */
  
  /* Text Colors */
  --text-main: #B8965A; /* Dark gold for headings */
  --text-muted: #6B7280; /* Soft gray for labels */
  
  /* Existing accent colors preserved */
  --color-xvi-bronze: #C9A96E;
  --color-xvi-navy: #060A10;
}
```

### [S5.2] Color Application
- All sections must use CSS variables consistently
- Headings: Dark gold (#B8965A) for luxury accent
- Body text: Current deep charcoal (#060A10) for readability
- Labels/captions: Soft gray (#6B7280) for hierarchy

## [S6] Interactive Enhancements

### [S6.1] Smooth Scrolling
- Implement global `scroll-behavior: smooth` (already present)
- Ensure consistent scroll padding for fixed navigation

### [S6.2] Button Styling
- **Style**: Glass morphism effect matching card design
- **Appearance**: Semi-transparent with backdrop blur
- **Hover**: Enhanced glow and subtle lift
- **Consistency**: Unified style across all CTAs

### [S6.3] Micro-interactions
- Preserve existing premium button effects
- Enhance focus states for accessibility
- Maintain smooth transitions throughout

## [S7] Implementation Approach

### [S7.1] Strategy: Incremental Enhancement
- Update CSS variables in tokens.css
- Enhance typography in premium-polish.css
- Modify card styles in App.css
- Update button components

### [S7.2] Risk Mitigation
- Preserve existing elegant structure
- Make minimal, focused changes
- Test across all sections for consistency

## [S8] Success Criteria

1. Typography uses Cairo font with proper weight hierarchy
2. Cards have consistent glass effect styling
3. All colors use CSS variables consistently
4. Hover effects are smooth and elegant
5. Buttons have unified glass morphism style
6. Overall feel is luxurious and high-end corporate