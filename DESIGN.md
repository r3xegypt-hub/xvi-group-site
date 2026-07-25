# DESIGN.md — XVI GROUP

## 1. Objective

XVI GROUP's visual identity should feel like brushed bronze engraved into the entrance of a billion-dollar headquarters in Dubai. The mark communicates precision, permanence, and executive authority without decoration, flourish, or trend-chasing. Every artifact should feel like it was machined, not designed — engineered with the exacting standards of Porsche, Bang & Olufsen, and Braun. The quality bar is portfolio-piece level: any设计师 who produced it would put it in their book.

## 2. Product Context

- **What the product does:** XVI GROUP is a premium AI, technology, and strategy advisory firm delivering enterprise transformation across AI, projects, IT, and management consulting
- **Who it's for:** C-suite executives, VP-level decision makers, and enterprise transformation leads at billion-dollar organizations — primarily in the UAE and GCC region. They evaluate partners on perceived competence and gravitas, not on marketing polish
- **Adjacent brands (feel like these):** Porsche (precision engineering aesthetic), Bang & Olufsen (premium minimalism), Braun (Dieter Rams-era functional clarity)
- **Distant brand (do not feel like this):** Any AI startup with gradient logos, glowing effects, or "disruptive" visual language — reads as temporary, not permanent
- **Cultural register:** Serious, architectural, premium. This is a firm that charges premium fees for premium counsel. The visual system must command respect, not request attention

## 3. Visual Foundations

### 3a. Color

- **Neutral scale:**
  - `--n-50: #FAF8F4` (Warm Ivory — primary background)
  - `--n-100: #F5F2EC`
  - `--n-200: #E8E4DC`
  - `--n-300: #D4CFC5`
  - `--n-400: #9A9590`
  - `--n-500: #6B7280`
  - `--n-600: #4B5563`
  - `--n-700: #1A1F2C` (Deep Navy — primary text)
  - `--n-800: #0F1318`
  - `--n-900: #060A10` (Obsidian — deepest dark)

- **Bronze palette:**
  - `--bronze-dark: #8A6A36` (Shadow bronze)
  - `--bronze-main: #C9A96E` (Executive Bronze — primary accent)
  - `--bronze-highlight: #E8C98A` (Brushed highlight)
  - `--bronze-shadow: #6D532A` (Deep shadow)

- **Usage rules:**
  - Executive Bronze `#C9A96E` appears once per view — on the XVI mark, the primary CTA, or the single most important element. Never as a background fill
  - Warm Ivory `#FAF8F4` is the default background for light mode
  - Deep Navy `#1A1F2C` is the default background for dark mode
  - All bronze usage must include gradient variation (never flat single-color bronze)

### 3b. Typography

- **Display face:** Plus Jakarta Sans, weight 300 (Light), tracking 6-9
- **Body face:** Plus Jakarta Sans, weight 400 (Regular)
- **Fallback stack:** `'Plus Jakarta Sans', 'Helvetica Neue', 'Arial', sans-serif`
- **Type scale:** `11 / 13 / 16 / 20 / 28 / 42 / 56 / 72` (modular scale ~1.333)
- **Weight discipline:**
  - 300 (Light): Display headings, logo text, subtitle
  - 400 (Regular): Body copy, descriptions
  - 500 (Medium): UI labels, navigation (sparingly)
  - 600-800: Never used — this brand does not shout

### 3c. Spacing & rhythm

- **Base unit:** 8px
- **Spacing scale:** `4, 8, 16, 24, 32, 48, 64, 96, 128, 160 px`
- **What "generous" whitespace means:** Section padding ≥ 96px on desktop. Minimum 48px between unrelated elements. The XVI mark always has 1.5× its height as clear space on all sides

### 3d. Component seeds

- **Button:** Single primary variant (filled bronze with dark text), no secondary/ghost variants — this brand only has one priority level
- **Card / container:** No cards. Content flows typographically. If enclosure is needed, use 1px bronze border at 0px radius, no shadow
- **Iconography:** No icons. This brand communicates through typography and the XVI mark only
- **Logo system:** Beveled metal bars with 45° precision cuts, linear gradients simulating brushed bronze

## 4. Accessibility

- **Text contrast:** Body text ≥ 4.5:1 against background, large text/UI ≥ 3:1
- **Motion:** Default reduced. No decorative animation. If motion is used, it must serve function (page transitions, not eye candy)
- **Focus indicators:** 2px bronze outline, 2px offset
- **Alt text policy:** Logo: "XVI GROUP — Premium AI, Technology & Strategy Advisory." Decorative: empty alt
- **Bronze on ivory:** #C9A96E on #FAF8F4 = 2.8:1 — fails WCAG AA for body text. Use for large display text only (≥24px). For body text, use #8A6A36 or darker

## 5. Voice & Tone

- **Register:** Formal, executive, precise
- **Sentence rhythm:** Short. Declarative. No hedging
- **Words this brand uses:** Intelligence, integrated, impact, precision, enterprise, transformation
- **Words this brand refuses:** Seamless, elevate, journey, unlock, delight, disrupt, innovative, cutting-edge, world-class, best-in-class
- **Address:** "Your organization" / "Your team" — never "you" (too casual for executive audience)

## 6. Implementation Practices

- **Token format:** CSS custom properties defined in `tokens.css`
- **Component library:** Bespoke — no external component library. This brand's components are too specific to generic systems
- **Image treatment:** No stock photography. If photography is used, it must be architectural or industrial — concrete, steel, glass, brushed metal textures
- **Grid system:** 12-column with 24px gutters, 1280px max-width
- **Motion rules:** `cubic-bezier(0.4, 0, 0.2, 1)`, 200-300ms duration, no bounce, no elastic
- **Logo export:** SVG only for web. PNG at 1x, 2x, 4x for fallback. JPG for OG images at 95% quality

## 7. Anti-Patterns

- **No gradient hero backgrounds.** This brand's luxury is expressed through material quality (brushed bronze), not through color washes. Gradients appear only inside the XVI mark bars
- **No rounded-16px cards.** This is an architectural brand. Corners are sharp or have purposeful bevels. Never decorative rounding
- **No emoji anywhere.** This brand communicates through material and typography, not through pictographs
- **No decorative symbols or ornaments.** The XVI mark is the only graphic device. No diamonds, stars, dots, or flourishes
- **No thin outlines or strokes.** Everything is solid filled shapes. Outlines suggest sketchiness; this brand is finished
- **No "AI" visual tropes.** No neural network patterns, no glowing nodes, no binary rain. AI is what we advise on, not how we present ourselves
- **No stock photography.** Real environments or no imagery at all
- **No "seamlessly," "elevate," "unlock," or "journey" in copy.** See Voice & Tone

## 8. Decision-Making

1. **Material quality over decoration.** If a choice is between adding an element or refining the material quality of an existing one, always refine. The brushed bronze gradient on a single bar beats a gradient background with a flat bar
2. **Permanence over trend.** If a choice is between a currently-popular pattern and a timeless one, choose timeless. This brand should look the same in 2035
3. **Executive restraint.** When in doubt, reduce. This brand is more likely to under-design than over-design. C-suite audiences respect restraint
4. **The X is the signature.** The X letterform in XVI carries the brand's visual identity. Every other element supports it, never competes with it
5. **Accessibility floor is non-negotiable.** If bronze fails contrast, we darken the bronze, not ignore the requirement

## 9. Workflow

1. Read Objective + Product Context + Voice & Tone to internalize the brand's gravity
2. Start with the XVI mark — every design decision flows from the mark's proportions and material quality
3. Apply Visual Foundations: bronze palette, Plus Jakarta Sans, spacing scale
4. Apply Anti-Patterns pass: flag any element that reads as startup, AI company, or generic SaaS
5. Apply Accessibility pass: verify contrast ratios, especially bronze-on-ivory combinations
6. Apply Decision-Making priority: material quality → permanence → restraint → X prominence
7. Final pass: ask "would this feel at home engraved on a Dubai headquarters entrance?" If not, revise
