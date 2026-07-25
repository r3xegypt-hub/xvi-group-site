# XVI Group — Multi-Page Implementation Report

## Delivery status

The XVI Group website is implemented as a React Router multi-page experience. The existing homepage remains at `/` and retains its original room-based flow, cinematic intro, visual language, and in-page scrolling behaviour. Routed pages use the shared enterprise layout without moving or replacing homepage sections.

## Pages and routes

| Page | Route |
| --- | --- |
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Industries | `/industries` |
| Technology | `/technology` |
| AI Transformation | `/ai-transformation` |
| Leadership | `/leadership` |
| Insights | `/insights` |
| Contact | `/contact` |
| Privacy | `/privacy` |
| Terms | `/terms` |

## Shared architecture

- `AppRoutes` owns route definitions and lazy page boundaries.
- `SiteLayout` provides persistent navigation, footer, scroll restoration, and the shared fade/architectural page transition.
- `ExecutiveNavigation` uses React Router links and route prefetch on hover/focus.
- `SitePage`, `PageSection`, `PageCta`, `Breadcrumb`, and `Container` establish reusable hero, content, CTA, spacing, and grid patterns.
- `SiteFooter` shares route-aware links across the site.

## Content coverage

- About includes story, vision, mission, values, leadership philosophy, differentiation, timeline, culture, and CTA.
- Services covers business consulting, technology consulting, AI transformation, executive development, deliverables, methodology, process, benefits, and CTA.
- Industries covers manufacturing, healthcare, government, finance, energy, education, and retail.
- Technology covers architecture, cloud, AI, automation, cybersecurity, enterprise systems, integration, and data platforms.
- Leadership, insights, contact, privacy, and terms each have dedicated content hierarchies and calls to action. Contact includes a client-side accessible form, office information, map placeholder, and FAQ.

## Performance and motion

- Every non-home route is loaded with `React.lazy` and `Suspense`.
- Homepage cinematic intro and below-the-fold section module remain dynamically imported to preserve the initial bundle strategy.
- Navigation prefetches route modules on hover/focus.
- React, React Router, and Framer Motion are isolated into stable vendor chunks, leaving the application entry smaller and improving long-term browser caching.
- Framer Motion respects reduced-motion preferences. Routed transitions use restrained fade, vertical reveal, and blur treatment; homepage motion remains unchanged.

## SEO and accessibility

- `usePageMeta` sets page-specific title, description, canonical URL, Open Graph, Twitter metadata, and Schema.org JSON-LD.
- `public/sitemap.xml` contains every public route and `robots.txt` points crawlers to it.
- Semantic landmarks, accessible navigation labels, breadcrumb structure, focusable controls, a skip link on the homepage, live status, and reduced-motion support are included.

## Fixes and verification

- Corrected the Vite public base from a relative base to `/`. The previous setting made Vite 8/Rolldown attempt to emit an absolute HTML filename when building from the non-ASCII project path.
- Added Technology and AI Transformation routes to the sitemap.
- Split large framework and animation dependencies into cacheable production chunks.
- Validation run: `npm install`, `npm run lint`, `npm run build`, and a local `npm run dev` smoke check.
