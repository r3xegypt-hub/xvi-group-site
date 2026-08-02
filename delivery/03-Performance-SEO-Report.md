# XVI Group — Performance & SEO Report

**Date:** 2026-08-02
**Status:** Pass

---

## 1. Production Build

- Build pipeline: `tsc -b && vite build && copy dist/index.html dist/404.html`
- Result: **✓ built in 5.29 s**, assets hashed + minified, zero console/page errors at runtime.

---

## 2. Bundle Analysis (dist/assets)

| Asset | Size | Gzip |
|---|---|---|
| `index-Cpk59IFc.js` (app shell) | 341.4 kB | 104.1 kB |
| `LanguageProvider-r1gsmDHI.js` (shared dictionary) | 179.9 kB | 58.8 kB |
| `insights-r8RQbCuC.js` | 46.5 kB | 14.8 kB |
| `industries-CMnIwweP.js` | 24.9 kB | 8.2 kB |
| `home-Ba3-wGG6.js` | 23.5 kB | 8.1 kB |
| `Portfolio-_WMJzvVm.js` | 23.5 kB | 7.6 kB |
| `about-sAlz1azv.js` | 21.4 kB | 6.5 kB |
| `ServiceDetailContent-DWlTUOks.js` | 20.9 kB | 6.5 kB |
| Remaining route/util chunks | 0.1 – 20 kB | — |

**Totals:** JS 747.5 kB + CSS 154 kB = **901.5 kB** before gzip (gzip delivers the critical path far smaller). 33 JS + 15 CSS files.

### Performance engineering in place
- **Route-level code splitting** — 13 lazy-loaded pages; every route loads only its own chunk.
- **No external images** — home & about verified to have zero `http` images and zero `background-image: url()` refs; visuals are inline SVG/CSS (fast, no CLS from images, fully self-contained).
- **Deferred heavy features** — voice (STT) initializes only after the user presses the mic; sound engine starts on first gesture.
- **Scroll hygiene** — no horizontal overflow (80 responsive checks + overflow audit at 0 issues).

---

## 3. SEO Deliverables

| Artifact | Location | Status |
|---|---|---|
| `robots.txt` | `public/` → `dist/` | ✓ `Allow: /` + sitemap pointer |
| `sitemap.xml` | `public/` → `dist/` | ✓ 15 URLs |
| Social preview | `social-preview.png` (20.7 kB) | ✓ referenced via OG meta |
| `404.html` | `dist/` | ✓ SPA-safe 404 |
| Asset URLs | base-corrected `/xvi-group-site/…` | ✓ |
| Meta (index.html) | description, robots, OG, Twitter, theme-color | ✓ |
| Per-page SEO | `src/seo/SeoHead.tsx` | ✓ runtime title / canonical / `hreflang` |

### Sitemap
- 15 `<loc>` entries covering every route, `lastmod 2026-08-02`.
- Every URL carries **`hreflang` EN + AR + `x-default`** alternate links (45 alternate declarations) for full bilingual indexing.

### Canonical target
`https://r3xegypt-hub.github.io/xvi-group-site/` (GitHub Pages).

---

## 4. Deployments

- `master` branch — source of truth.
- `gh-pages` branch — deployed site (force-synced from `master`).
- Live URL: **https://r3xegypt-hub.github.io/xvi-group-site/**

---

## 5. Conclusion

The site is **fast, self-contained, and search-engine ready**. Bundle split, gzip-friendly output, no heavy media, and complete metadata/hreflang coverage.
