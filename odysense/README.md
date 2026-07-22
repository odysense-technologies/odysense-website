# Odysense.com — New Website

Next.js 15 (App Router) · Design system: **Aurora × Editorial** (Direction 04, approved July 2026)

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (verify before deploy)
```

## Deploy (Vercel + GitHub)
Vercel builds and deploys automatically on every push to `main`. No config needed —
redirects, sitemap, robots and image optimization all work out of the box.

Staging: every project gets a free `<project>.vercel.app` URL, and every branch/PR
gets its own preview URL. Review everything there; only attach `odysense.com`
at launch.

**Contact form:** will be a Next.js API route (build step 6) emailing via Resend
or SMTP — no PHP needed on Vercel.

## Project structure
```
app/
  globals.css      ← the design system (all locked tokens live here)
  layout.tsx       ← metadata, fonts, Organization schema, nav/footer
  page.tsx         ← homepage
components/ui.tsx  ← Nav, Footer, Reveal, SectionHead, CtaBox
lib/site.ts        ← ALL content data (services, products, clients, copy)
next.config.ts     ← 301 redirects from legacy WordPress URLs
```

## How to make changes (the AI workflow)
Content edits → `lib/site.ts`. Style/token edits → `app/globals.css`.
New pages → add `app/<route>/page.tsx` reusing components from `components/ui.tsx`.
This structure is deliberately flat and readable so Claude can be prompted to add
pages, blocks and features while inheriting the design system automatically.

## Build roadmap (from the Phase 2 plan)
- [x] 1. Design system + shared components
- [x] 2. Homepage
- [ ] 3. E-commerce Qatar flagship page + 2 case studies
- [ ] 4. Remaining Qatar service pages
- [ ] 5. Product pages ×5
- [ ] 6. About, Contact, Work hub
- [ ] 7. Blog system + first 4 articles
- [ ] 8. Payload CMS on Vercel (visual admin at /admin) — pages, case studies, articles
- [ ] 9. Full redirect map (crawl old sitemap.xml), schema per template, sitemap.xml, GA4
- [ ] 10. Launch checklist + Search Console submission

## Before launch (do not skip)
- Switch fonts from Google Fonts `<link>` to `next/font/local` (self-hosted, faster LCP)
- Crawl the live WordPress sitemap.xml and extend `next.config.ts` redirects to cover every indexed URL
- Real client logo SVGs in the hero (text placeholders currently)
- OG image (1200×630) — design matches the hero
