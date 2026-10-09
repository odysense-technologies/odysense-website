# Odysense.com — Project Context for Claude Code

Read this file fully before making changes. It records every decision, rule and fact established while
building this site. If the repo and this file disagree, the repo reflects what was actually deployed;
flag the discrepancy to the owner instead of silently "fixing" either one.

---

## 1. What this project is

The full rebuild of **odysense.com**, the website of Odysense, a Doha-based digital agency and software
company headquartered at the Innovation Centre, Qatar Science & Technology Park (QSTP).

**Primary goal: lead generation, mainly through organic SEO.**
- Primary markets: Qatar and Saudi Arabia. Secondary markets: the rest of the GCC and the US.
- Focus areas: design and development services, with e-commerce as the main specialty; gamification
  and brand activations for events; and selling the company's own products (WASL, QFlow, Store Portal
  and others).
- The owner is a solo founder. Claude Code replaces the old drag-and-drop builder: it creates and
  updates pages and features on request, always within the existing design system.

**Status:** live in production on odysense.com, deployed from this repo via Vercel. The previous
WordPress/WPBakery site on cPanel has been replaced.

---

## 2. Stack, hosting and deployment

| Area | Detail |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Plain CSS design system in `app/globals.css` (no Tailwind) |
| Content | TypeScript data files in `lib/` (no CMS yet; see backlog) |
| Hosting | Vercel, auto-deploying on every push to `main` |
| Repo | `github.com/odysense-technologies/odysense-website` (private; files at the repo root) |
| Domain | `odysense.com` is primary and non-www (Vercel → Domains: apex = Production, `www` = 308 → apex; fixed 2026-10-09) |
| DNS | Managed in **cPanel Zone Editor**. Only the apex A record and the `www` record point to Vercel |
| Owner's machine | Windows, **PowerShell 5.1**: no `&&` chaining, so give commands one per line |

### DNS warning: never change nameservers
The subdomains `ai.odysense.com`, `qflow.odysense.com` and `wasl.odysense.com`, plus the email MX records,
live on cPanel. Never move nameservers to Vercel and never touch those records. Only the apex and `www`
records belong to this site.

### Deployment rules
- Run `npm run build` and make sure it passes before every commit.
- `trailingSlash: true` is deliberate, to keep parity with the old WordPress URLs. Never turn it off.
- Keep Next.js patched; Vercel blocks vulnerable versions. Upgrade with
  `npm install next@latest react@latest react-dom@latest`.
- `.gitignore` covers `node_modules`, `.next`, `out`, `.env*` and `.vercel`. `.gitattributes` sets
  `* text=auto eol=lf`. Never commit `node_modules`: it holds a binary over 100 MB that GitHub rejects.

### Environment variables (Vercel → Settings → Environment Variables)
| Variable | Purpose | Status |
|---|---|---|
| `RESEND_API_KEY` | Sends lead emails (server-side only) | Set. **Rotate it**: it was once pasted into a chat |
| `CONTACT_TO` | Lead recipient (defaults to `contact@odysense.com`) | Optional |
| `CONTACT_FROM` | Sender, e.g. `Odysense Website <leads@odysense.com>` | **Pending**: needs `odysense.com` verified in Resend |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID (code falls back to `G-XXE190R73Z`) | Optional |
| `POSTGRES_URL` (+ related) | Lead storage via Vercel Postgres / Neon | **Pending**: not connected yet |

| `GSC_SERVICE_ACCOUNT_B64` | Claude Code **cloud environment** variable (not Vercel): base64 of the Search Console service-account key | Set 2026-10-09 |
| `GSC_SITE_URL` | Claude Code cloud environment variable; should be `https://odysense.com/` (the script hardcodes this) | Set |

**Never commit secrets or put them in client code.**

### Google Search Console access (since 2026-10-09)
- Property: URL-prefix `https://odysense.com/`. Service account
  `seo-audit-agent@seo-audit-agent-511116.iam.gserviceaccount.com` is a **Full** user.
- Use `python3 scripts/search_console.py` (`perf`, `inspect URL…`, `sitemaps`, `submit-sitemap`).
  Never print or commit the key.
- The API can read performance and index status and manage sitemaps. It **cannot** request indexing;
  the owner clicks "Request indexing" in the Search Console UI.
- The old WordPress `sitemap_index.xml` was removed from Search Console on 2026-10-09; only
  `sitemap.xml` is submitted.

---

## 3. Repository map

```
app/
  layout.tsx                 metadata, OG, GSC verification, ProfessionalService JSON-LD,
                             Nav, Analytics, WhatsAppTracker, RouteLoader, ConsultPopup, Footer
  globals.css                the whole design system (tokens + every component style)
  page.tsx                   homepage
  icon.png                   favicon (Odysense ring icon)
  sitemap.ts / robots.ts     generated from the lib/ data files
  api/contact/route.ts       lead endpoint: Resend email + optional Postgres storage
  services/page.tsx          services hub
  ecommerce-development-company-qatar/page.tsx   flagship e-commerce page (bespoke)
  gamification-brand-activation-qatar/page.tsx   gamification & brand activations page (bespoke,
                                                 Service + FAQPage schema, playable demo arcade)
  website-design-company-in-qatar/               ┐
  website-development-company-qatar/             │
  software-development-company-qatar/            │ thin route files that render
  mobile-app-development-company-qatar/          │ ServicePageView with data from
  digital-marketing-agency-qatar/                │ lib/service-pages.ts
  digital-marketing-agency-qatar/seo-services-qatar/
  whatsapp-business-api-qatar/                   │
  branding-agency-qatar/                         ┘
  products/page.tsx + products/[slug]/page.tsx   product hub + template
  work/page.tsx + work/[slug]/page.tsx           case-study hub + template
  blog/page.tsx + blog/[slug]/page.tsx           blog hub + article template (Article/Breadcrumb schema)
  about/  contact/
  tools/review-request/page.tsx                  internal Google-review message generator (noindex)
components/
  ui.tsx            Reveal, Footer (sitewide links + NAP), SectionHead, CtaBox,
                    PageHero (emits BreadcrumbList JSON-LD from its crumbs)
  related-posts.tsx "Related reading" block: newest posts whose relatedService is the page
  nav.tsx           pill nav + Services/Products mega menus + mobile burger menu
  carousel.tsx      ServiceCarousel: homepage auto-scroll, draggable, swipeable
  shot-carousel.tsx product screenshot carousel with click-to-open lightbox
  lottie.tsx        lazy-loaded Lottie player (lottie-web light build)
  lead-forms.tsx    ContactForm, ConsultPopup (exit intent), GCC phone codes
  analytics.tsx     GA4 loader, track(), WhatsAppTracker
  loader.tsx        RouteLoader: gradient top progress bar on navigation
  service-page.tsx  ServicePageView template (includes FAQPage schema)
  review-tool.tsx   review request tool UI
  arcade/           playable demos for the gamification page (client-only, each lazy-loaded):
    arcade.tsx      tabbed "arcade" panel; keeps opened games mounted for session-only scores
    spin-wheel.tsx  prize wheel with optional name gate · quiz.tsx  live quiz with timer + leaderboard
    memory.tsx      product-icon memory match · tap.tsx  10-second tap challenge
    poll.tsx        live poll with a simulated audience · shared.tsx  reduced-motion hook, Leaderboard
lib/
  site.ts           site info, serviceLinks (nav + footer), services, products, productDetails,
                    productShowcase, carouselTiles, clientLogos
  seo.ts            seoMeta(): title, description, canonical, Open Graph and Twitter for a page
  service-pages.ts  the 8 Qatar service pages (copy, long-form `sections`, FAQs, related links, images)
  case-studies.ts   Eleganza, Rafea Line, QSeat
  blog.ts           all blog articles (optional per post: metaTitle, updated, image (hero + OG),
                    sources, relatedPosts); postsNewestFirst() for listings
public/
  images/  logos/  brands/  og.png
next.config.ts      trailingSlash + every legacy 301 redirect
scripts/
  search_console.py Search Console API helper for Claude sessions (sites, perf, inspect, sitemaps)
```

---

## 4. Design system: "Aurora × Editorial" (approved, keep it)

- **Feel:** light, modern-corporate, with luxury editorial accents. References: Vercel, Mollie, Adobe.
- **Colours:** `--bg #FAF9F6` (warm ivory), `--surface #F1EFEA`, `--card #FFF`, `--ink #16151A`,
  `--slate #5C5A63`, `--border #E6E3DB`. Aurora gradient: `--purple #6C4DF6`, `--pink #F55FA0`,
  `--orange #FF7A45`, `--sky #7CCBF6`.
- **Type:** Instrument Sans for UI and body, Instrument Serif *italic* for accent words in headlines
  (`<span className="serif">`), Geist Mono for small labels. Currently loaded through a Google Fonts
  `<link>`; switching to `next/font` is in the backlog.
- **Signatures:**
  - the blurred aurora orb (hero and CTA box)
  - the floating pill nav
  - rounded cards with a gradient border on hover
  - the dark CTA box
  - Roman-numeral markers (i., ii., iii.)
  - scroll reveals
- **New pages reuse existing components and classes.** Never introduce a new visual language, and
  never use `localStorage` for site data.

---

## 5. Content and business rules (owner-confirmed; follow exactly)

### Company facts
- **Company:** Odysense, Innovation Centre, Qatar Science & Technology Park, Doha.
  Never write "Office 317-04" anywhere.
- **Contact:**
  - Email: `contact@odysense.com`
  - Phone/WhatsApp: `+974 3066 6516`
  - WhatsApp link: `https://wa.link/odysense`
- **Never mention CBQ** (Commercial Bank of Qatar) anywhere on the site.
- **Never mention the founding year or years in market** anywhere on the site or in materials (no
  "since 2013", "12+ years" and the like). Use QSTP, "20+ clients every year" or "7 in-house products"
  as proof points instead. The schema has no `foundingDate`.
- **Client logos:** "Ninth" was removed from the client logo list and its file deleted. Logos are in `public/brands/`.

### Pricing (published starting figures)

| Service | Starting price |
|---|---|
| Website design | QAR 2,000–10,000 |
| Custom software MVP | from QAR 10,000 |
| Mobile apps | QAR 15,000–20,000 |
| Branding | QAR 5,000–10,000 |
| E-commerce | QAR 8,000–10,000, including 1 year of domain and 1 year of hosting; advanced stores cost more |

- **Never publish SEO pricing.** It depends on the project, so always point to requesting a callback.
- **Never publish ad-spend figures; route budget questions to a callback.**

### Store Portal
- Free for the first year with every Odysense e-commerce build, then QAR 170/month, or QAR 150/month billed yearly.
- Add-ons (QAR per month, billed annually):

| Add-on | Price |
|---|---|
| WASL WhatsApp | 125 |
| SMS notifications | 170 |
| Live storefront POS | 150 |
| Automated backups | 80 |
| Order & website management | 1,000 |
| SEO & performance | 800 |
| Email marketing automation | 700 |
| Advanced analytics | 120 |
| Social media integration | 180 |
| Social media management | 2,500 |
| AI Virtual Try-On | 1,000 |

### Case-study figures (real)
- **Eleganza** (`https://officialeleganza.com`):
  - +60% conversion rate after launch, 2.1s mobile load time, 100% of orders completed on mobile
  - Quote attributed to "Fatima, E-commerce Business Owner"
- **Rafea Line** (`https://rafealine.com`): +70% checkout completion, 10 days kickoff to launch,
  4.9★ customer rating.
- Earlier builds used the wrong domains (`official-eleganza.com`, `refealine.com`); fixed in
  `lib/case-studies.ts` on 2026-10-06.
- **QSeat** is a client app, live on the App Store:
  `https://apps.apple.com/qa/app/qseat-restaurant-booking/id6804232100`. Case study at `/work/qseat/`
  (added 2026-10-09). It has no published metrics or quote yet: add them only when the owner supplies
  real figures. The launch year (2026) is unconfirmed.
- The e-commerce page lists only case studies whose `services` include "E-commerce".

### Gamification & Brand Activations (service, added 2026-10-06)
- URL: `/gamification-brand-activation-qatar/` (bespoke page; in the Services mega menu, mobile menu,
  services hub, sitemap, homepage carousel, and linked from the WASL and digital-marketing pages).
- Positioning: we design, build and run interactive games and digital activations for events,
  exhibitions, product launches, malls and corporate gatherings across Qatar and the GCC, plus live
  audience engagement (quizzes, polls, surveys, live forms, Q&A, interactive presentations). Every
  activation collects consented leads, follows up on WhatsApp through WASL, and ends with an engagement
  report.
- Rules:
  - Never publish prices. Cost depends on scope, and we give a fixed quote after a free consultation.
  - Timelines only in hedged wording: "depends on scope; we confirm the timeline in your proposal".
  - Capability claims stay within what we build on the web and mobile. No AR, VR or hardware claims.
  - No invented past events, client names, statistics or results.
- The demos are simulated: no backend, no storage, no data collected, and they are labelled "Demo".
- The homepage carousel tile `public/images/card-gamification.webp` is a **placeholder** made from
  brand colours. Replace it when the owner sends a creative (600×800).

### Products (all in `lib/site.ts`)

| Product | URL | One-liner |
|---|---|---|
| WASL | wasl.odysense.com | Official WhatsApp Business (Cloud API) platform: AI inbox, templates, bots, broadcasts |
| QFlow | qflow.odysense.com | Restaurant OS: QR ordering, bill split, POS, kitchen display, Talabat/Snoonu/Rafeeq/Keeta |
| Store Portal | /products/store-portal | WooCommerce operations portal with AI Virtual Try-On |
| Odysense AI | ai.odysense.com | AI content platform: text, image, code, chatbots |
| ProSeek | pro-seek.com | AI matching of professionals to clients; free profile, no commission |
| Social Bakery | social-bakery.com | Content-as-a-subscription |
| Rehabitt | rehabitt.com | Gamified paediatric physiotherapy (on-device pose tracking) |

- WASL and QFlow are the two most important products. Prioritise content about them.
- **WASL screenshot mapping** (the uploads were mislabelled originally):
  - `Whatsapp-Cloud-API.png` = chat preview
  - `wasl1` = console
  - `wasl2` = bot rules
  - `wasl4` = template builder
- Verify that `public/images/shot-wasl-*.webp` show the right images under the right captions.
- The WASL and QFlow pages use Lottie animations for their three step cards:
  - QFlow:
    - `lottie.host/ff0686b3-…/SbGo29JWyT.json`
    - `…/6de32d1c-…/oFNFQpmSDL.json`
    - `…/1e484114-…/JCplekjHdD.json`
  - WASL:
    - `…/37c6f68e-…/7RXcvCSDXi.json`
    - `…/cb53fc78-…/llLyJc2tvd.json`
    - `…/21793b85-…/dQKEpvbvgx.json`
  - The full URLs are in `lib/site.ts` → `productShowcase`.

### Writing voice
- Confident, specific and honest. No unverifiable claims; the old site's "8k users / 4.9★ 2k reviews"
  type claims were deliberately removed.
- Every article ends by tying back to an Odysense service or product, with a CTA. Where useful, it
  offers a free technical consultation.
- Legal and regulatory articles must say Odysense builds the store, not the licence, and that it is
  not a law firm.

---

## 6. Lead generation

- **Contact form** (`/contact`): name, email, GCC phone selector (🇶🇦 default; also 🇸🇦 🇦🇪 🇰🇼 🇧🇭 🇴🇲 and
  Other), company, service, message, plus a honeypot field.
- **Exit-intent popup** (site-wide): offers a free technical consultation and asks for name and GCC
  mobile for a callback. It arms after 6 seconds and shows once per session.
- **Lead delivery:** both forms POST to `/api/contact`, which emails the lead through Resend and
  stores it in Postgres if `POSTGRES_URL` exists (the `leads` table auto-creates).
- **CTAs:** CTA boxes link to `/contact`. Every page should end with a form or WhatsApp route.
- **GA4** (`G-XXE190R73Z`) events:
  - `generate_lead` (contact form)
  - `callback_request` (popup)
  - `whatsapp_click` (any `wa.link`, `wa.me` or `api.whatsapp.com` link)
  - These should be marked as key events in GA4.

---

## 7. SEO: rules that protect rankings

1. **Never change an existing URL** without adding a 301 in `next.config.ts`.
2. Legacy WordPress URLs are preserved or redirected. The redirects currently cover:
   - `/about-us/` → `/about/`
   - `/portfolio/` → `/work/`
   - `/blogs/` → `/blog/`
   - `/branding-company-qatar/` → `/branding-agency-qatar/`
   - `/services/ecommerce-services-qatar/` → `/ecommerce-development-company-qatar/`
   - `/services/whatsapp-business-api-integration-qatar/` → `/whatsapp-business-api-qatar/`
   - `/products/qflow-restaurant-management-system/` → `/products/qflow/`
   - `/products/wasl-whatsapp-cloud-messaging-api/` → `/products/wasl/`
   - the Android and iOS child pages → `/mobile-app-development-company-qatar/`
   - 26 generic legacy blog slugs → their most relevant live page
3. **Seven legacy blog slugs are live articles** (do not redirect them):
   - `whatsapp-automation-for-website`
   - `whatsapp-new-features`
   - `how-software-streamlines-business-operations`
   - `exploring-the-evolution-of-design-trends`
   - `showcasing-beautiful-and-functional-designs`
   - `qatar-performance-marketing-strategies`
   - `unlocking-brand-potential-the-power-of-neuro-marketing-in-qatars-digital-landscape`
4. **Keep the Qatar keyword URL pattern** (`/website-design-company-in-qatar/` and similar).
5. **Every new page needs:**
   - `metadata` built with `seoMeta()` from `lib/seo.ts` (title, description, path). Never set
     `alternates.canonical` or `openGraph` in `app/layout.tsx`: Next.js inherits them into every page
     that doesn't override them, which previously gave 26 pages the homepage's og:title and og:url
   - an entry in the sitemap; data-driven pages are added automatically
   - JSON-LD where relevant: FAQPage on service pages, Article and Breadcrumb on posts,
     SoftwareApplication on products
6. **Sitewide schema:** `ProfessionalService` with Doha geo coordinates, the ten services (including Gamification & Brand Activations), and the six
   GCC countries as `areaServed`. Google Search Console is verified through the `verification.google`
   meta tag in `layout.tsx`.
7. **Blog:** the article count was 36 on 2026-10-09; verify against `lib/blog.ts`. The target cadence
   is two new articles a month, each targeting a real Qatar/GCC query and linking to its service page.
   Current topic clusters:
   - website and e-commerce cost
   - payment gateways
   - WhatsApp and WASL
   - QR ordering and QFlow
   - delivery aggregators
   - SEO in Qatar
   - QSTP and startups
   - Qatar's 2026 e-commerce licence (MoCI Decision No. 25): five articles. Facts as announced in
     Sept 2026: QAR 500 issuance fee, 194 approved activities, applications via the Single Window,
     `.qa`/`.com.qa` domain through one of eight CRA-approved providers, one licence per platform.
     Keep every licence article hedged, sourced, and clear that Odysense builds the store, not the licence.
   - Store Portal
   - event gamification and live audience engagement
   - cost guides (website, e-commerce, mobile app, custom software, branding) and agency selection
   - local SEO (Google Business Profile) and bilingual Arabic/English websites
8. **Titles:** keep the full `<title>` (with " | Odysense") at 60 characters or less. Blog posts with
   long headlines set a shorter `metaTitle`; the H1 keeps the full headline.
9. **Service pages** carry 250–350 words of long-form `sections` (who it's for, how it runs, pricing)
   plus FAQs and a "Related reading" block fed by posts whose `relatedService` points at the page.

---

## 8. Backlog and open items (as of last handoff)

**Verify first:** these were sent as patches and may not have been applied yet.
- [x] Update 15: the corrected WASL screenshots in `public/images/shot-wasl-*.webp`. Verified on
      2026-10-06; the declared sizes in `productShowcase.wasl.gallery` and `nav.tsx` now match the files.
- [x] The case-study domains in `lib/case-studies.ts` (see section 5). Fixed on 2026-10-06.
- [x] `www.odysense.com` redirects to `odysense.com`. Until 2026-10-09 Vercel redirected the apex to `www`,
      the opposite of every canonical tag. Now the apex serves Production and `www` returns 308 → apex.
      Never add a host redirect in `next.config.ts`; Vercel handles it.

**Infrastructure**
- [ ] Verify `odysense.com` in Resend. The DNS records go in cPanel Zone Editor and are additive only.
      Then set `CONTACT_FROM`.
- [ ] Connect Vercel Postgres (Neon) for lead storage.
- [ ] Self-host fonts with `next/font/local` for better LCP.
- [ ] Rotate the Resend API key.

**Content and SEO**
- [x] Add a QSeat case study to `lib/case-studies.ts`. Done on 2026-10-09; it still needs real
      screenshots, metrics and a client quote when available.
- [x] Remove "since 2013" / "12+ years" from the website to match the company profile. Done on
      2026-10-06, including `og.png` and the schema `foundingDate`.
- [x] Publish Store Portal pricing and add-ons on `/products/store-portal/`. Done on 2026-10-06.
- [ ] Weekly: check the Search Console Pages report for 404s and extend the redirects.
- [ ] Build KSA service pages once the Qatar pages are indexed, e.g. `/web-design-company-saudi-arabia/`.
- [ ] Arabic version later: `next-intl`, `/ar/`, RTL with logical CSS properties, hreflang.
- [ ] Optional: host the company profile PDF at `/company-profile.pdf` as a lead magnet. The owner
      hasn't decided.

**Product decisions**
- [ ] Leads admin UI. A headless CMS (Payload, or another option) was planned but not built.
- [ ] Check that each Lottie animation sits beside the right step on the WASL and QFlow pages.
- [ ] Confirm whether "Live POS for Storefront" is an add-on or a core Store Portal feature. The
      materials list it as both.

**SEO plan (from the 2026-10-09 audit; technical fixes shipped in PRs #8 and #9)**
- [x] Owner: fix `www` → apex in Vercel → Domains. Done on 2026-10-09 (308).
- [ ] Optional: in Vercel → Domains, set `odysense.vercel.app` to redirect (308) to `odysense.com` so the
      preview host doesn't serve a second copy of production (canonicals already point to the apex).
- Search Console HTML verification file: `public/googled6e8611648213367.html` (added 2026-10-09).
  **Never delete or edit it**; removing it un-verifies the property. The `verification.google` meta tag
  in `layout.tsx` stays too.
- [ ] Owner: in Search Console, resubmit the sitemap, request indexing for the service pages and new
      articles, and review Pages → "Discovered/Crawled – currently not indexed".
- [ ] Owner: Google Business Profile: primary category, services, photos, weekly posts, and a steady
      flow of reviews via `/tools/review-request`. Add the profile URL to `sameAs` in `layout.tsx`.
- [ ] Owner: add LinkedIn/Instagram profile URLs so they can go in `sameAs`.
- [ ] Backlinks: QSTP directory, client footer credits, Clutch/GoodFirms/DesignRush, local press
      for the e-commerce licence and gamification content.
- [ ] Expand thin product pages (Social Bakery, Rehabitt, ProSeek, Odysense AI: about 150–180 words).
- [ ] Next articles: website maintenance cost, Shopify in Qatar, WooCommerce payment gateways in Qatar,
      app vs web app, KSA market entry for Qatari stores (hedged, sourced).
- [ ] Arabic `/ar/` versions of the top service pages once English pages are indexed.

**Off-site** (owner tasks; Claude can help draft)
- [ ] Complete the Google Business Profile and ask for reviews with `/tools/review-request`.
- [ ] Get directory listings: Clutch, GoodFirms, DesignRush, G2 and Capterra (for WASL and QFlow).
- [ ] On 2–3 e-commerce client sites, change the footer credit to "E-commerce development by Odysense",
      linking to `/ecommerce-development-company-qatar/`.

---

## 9. How to work in this repo

1. Read the relevant `lib/` data file before touching any page. Most content changes are data edits, not code.
2. Reuse the existing components and CSS classes.
3. When giving the owner terminal commands, write them for PowerShell 5.1, one per line.

### Standing release workflow (owner-approved 2026-10-06)
Never commit directly to `main`. Every change goes through a branch and a pull request.

**Routine changes** (content, blog posts, bug fixes, design tweaks, new pages built from existing components):
1. Work on a branch and run `npm run build`. It must pass.
2. Open a PR into `main` and wait for the Vercel preview to build successfully.
3. Merge into `main` yourself, then wait for the Vercel production deployment to succeed.
4. Verify the affected production pages afterwards.

**Approval-gated changes:** pricing, published claims or figures, client names, legal or regulatory
statements, URLs or redirects, and DNS or environment settings.
1. Open the PR and stop.
2. Show the owner the Vercel preview URL and wait for explicit approval before merging.

**Failed production deploy:** if the production deploy fails after a merge, revert the merge commit on
`main` immediately and tell the owner.

**Known limits of the Claude Code cloud sandbox** (as of 2026-10-06):
- Its network policy blocks `odysense.com` and `*.vercel.app`, so production pages can't be fetched
  directly. Confirm the Vercel commit status on `main`, check that the merged tree matches what was
  tested, and verify the pages against a local `npm run build` of that commit. Ask the owner to
  spot-check the live URLs.
- The git proxy refuses branch deletion (HTTP 403), so the owner deletes merged branches on GitHub.
