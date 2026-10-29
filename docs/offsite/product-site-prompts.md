# Prompts: an "Odysense" page on each product site

Paste one prompt into a Claude Code session (or another AI coding tool) opened on that product's own
codebase. Each prompt is self-contained: it carries the facts the page may use, the exact links to
odysense.com and the rules that keep the links helpful rather than spammy.

**What this does for SEO.** Each product page gives Google a clear, consistent connection between the
product and Odysense (same organisation, same `@id` in structured data), and links into the matching
odysense.com product and service pages.
- `pro-seek.com` and `rehabitt.com` are separate domains, so their links count as genuine external
  backlinks.
- `wasl.odysense.com` and `qflow.odysense.com` are subdomains of odysense.com. Google treats them largely
  as the same site, so their links mostly help crawling and topic association rather than "authority".
  They are still worth doing.

**Shared rules (already inside every prompt):**
- Never name or describe the founder.
- Never mention a founding year or years in market.
- Never invent figures, clients or awards.
- Link anchors are the brand ("Odysense") or plain descriptive phrases used once in body copy, never
  keyword-stuffed footer links.

---

## 1. WASL (wasl.odysense.com)

```text
You are working on the WASL website (wasl.odysense.com), the official WhatsApp Business (Cloud API)
platform built and run by Odysense. Add an "About WASL / Built by Odysense" page and a small footer
credit, so search engines clearly connect WASL with Odysense and the Odysense website.

FACTS YOU MAY USE (do not add others):
- Odysense is a Doha-based digital agency and software company at the Innovation Centre, Qatar Science
  & Technology Park (QSTP). It designs and builds websites, e-commerce stores, custom software and
  mobile apps for businesses in Qatar, Saudi Arabia and the GCC, and runs its own products: WASL, QFlow,
  Store Portal, Odysense AI, ProSeek, Social Bakery and Rehabitt (7 in-house products; 20+ clients every
  year).
- Contact: contact@odysense.com · +974 3066 6516 · WhatsApp https://wa.link/odysense
- WASL: official WhatsApp Business Platform (Cloud API) access, a shared AI-powered team inbox,
  Meta-approved message templates with an approval workflow, keyword auto-reply bots, broadcasts to
  opted-in customers, automated notifications from stores and systems, a developer API with scoped keys,
  and pay-as-you-go credits with per-message tracking. Odysense also sets up and integrates the WhatsApp
  Business API for clients (WooCommerce, Shopify and custom systems).
- NEVER name or describe the founder. NEVER mention a founding year or "X years". NEVER invent customer
  counts, message volumes, ratings or client names.

BUILD:
1. A page at /about/ (or the site's existing About route), titled roughly "About WASL: built by Odysense
   in Doha" (keep the full <title> at 60 characters or less), with a meta description, a canonical URL
   and an entry in the sitemap. Match the site's existing design, components and language(s); if the site
   has Arabic, build the Arabic version too and link the two with hreflang.
2. Content, answer first:
   - Opening paragraph: what WASL is and that it is built and operated by Odysense at QSTP, Doha.
   - "What WASL does": short list from the facts above.
   - "Built by Odysense": Odysense builds and runs its own products, so WASL is maintained by the same
     team that integrates it into stores and systems. Link the word "Odysense" to https://odysense.com/
   - "Need WhatsApp set up for your business?": one sentence linking "WhatsApp Business API setup in
     Qatar" to https://odysense.com/whatsapp-business-api-qatar/
   - "More from Odysense": QFlow (https://qflow.odysense.com), Store Portal
     (https://odysense.com/products/store-portal/), ProSeek (https://pro-seek.com).
   - Contact block with the details above, and a link "WASL on odysense.com" to
     https://odysense.com/products/wasl/ (Arabic pages: https://odysense.com/ar/products/wasl/).
3. Footer, on every page: "A product by Odysense", with only "Odysense" linked to
   https://odysense.com/products/wasl/ (Arabic: https://odysense.com/ar/products/wasl/). One link, no
   extra keywords, not hidden.
4. JSON-LD on the About page (adapt the WASL URL if it differs):
   {
     "@context": "https://schema.org",
     "@graph": [
       { "@type": "Organization", "@id": "https://odysense.com/#organization", "name": "Odysense",
         "url": "https://odysense.com", "email": "contact@odysense.com", "telephone": "+974 3066 6516",
         "address": { "@type": "PostalAddress", "streetAddress": "Innovation Centre, Qatar Science & Technology Park",
           "addressLocality": "Doha", "addressCountry": "QA" } },
       { "@type": "SoftwareApplication", "name": "WASL", "url": "https://wasl.odysense.com",
         "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
         "description": "Official WhatsApp Business (Cloud API) platform: AI inbox, templates, bots, broadcasts and notifications.",
         "publisher": { "@id": "https://odysense.com/#organization" },
         "creator": { "@id": "https://odysense.com/#organization" },
         "sameAs": ["https://odysense.com/products/wasl/"] }
     ]
   }
5. Link the new page from the main navigation or footer, check that every link works, run the site's
   build, and report the page URL and the links you added.
```

---

## 2. QFlow (qflow.odysense.com)

```text
You are working on the QFlow website (qflow.odysense.com), a restaurant operating system built and run by
Odysense. Add an "About QFlow / Built by Odysense" page and a small footer credit, so search engines
clearly connect QFlow with Odysense and the Odysense website.

FACTS YOU MAY USE (do not add others):
- Odysense is a Doha-based digital agency and software company at the Innovation Centre, Qatar Science
  & Technology Park (QSTP). It designs and builds websites, e-commerce stores, custom software and
  mobile apps for businesses in Qatar, Saudi Arabia and the GCC, and runs its own products: WASL, QFlow,
  Store Portal, Odysense AI, ProSeek, Social Bakery and Rehabitt (7 in-house products; 20+ clients every
  year).
- Contact: contact@odysense.com · +974 3066 6516 · WhatsApp https://wa.link/odysense
- QFlow: a unique QR code per table; guests scan to see the live menu and their running bill, order from
  their phone with no app download, split the bill (equally, by item or custom amounts) and pay by card,
  Apple Pay, Google Pay or cash; a POS terminal for staff; a real-time kitchen display (preparing, ready,
  served); Talabat, Snoonu, Rafeeq and Keeta orders flowing into the same kitchen screen; analytics for
  revenue, popular items, peak hours and payment trends. Built in Doha for restaurants and cafes.
- NEVER name or describe the founder. NEVER mention a founding year or "X years". NEVER invent venue
  counts, order volumes, ratings or client names.

BUILD:
1. A page at /about/ (or the site's existing About route), titled roughly "About QFlow: restaurant
   software by Odysense" (keep the full <title> at 60 characters or less), with a meta description, a
   canonical URL and an entry in the sitemap. Match the site's existing design and language(s); if the
   site has Arabic, build the Arabic version too and link the two with hreflang.
2. Content, answer first:
   - Opening paragraph: what QFlow does for a restaurant, and that it is built and operated by Odysense
     at QSTP, Doha.
   - "What QFlow does": short list from the facts above.
   - "Built by Odysense": the same team designs, builds and supports QFlow from Doha. Link the word
     "Odysense" to https://odysense.com/
   - "Further reading": "QR code ordering in Qatar" linked to
     https://odysense.com/blog/qr-code-ordering-restaurants-qatar/ and "delivery apps on one screen"
     linked to https://odysense.com/blog/restaurant-delivery-aggregators-one-screen/
   - "Need custom software or an app for your restaurant group?": one sentence linking "custom software
     development in Qatar" to https://odysense.com/software-development-company-qatar/
   - "More from Odysense": WASL for WhatsApp notifications (https://wasl.odysense.com) and Store Portal
     (https://odysense.com/products/store-portal/).
   - Contact block with the details above, and a link "QFlow on odysense.com" to
     https://odysense.com/products/qflow/ (Arabic pages: https://odysense.com/ar/products/qflow/).
3. Footer, on every page: "A product by Odysense", with only "Odysense" linked to
   https://odysense.com/products/qflow/ (Arabic: https://odysense.com/ar/products/qflow/). One link, no
   extra keywords, not hidden.
4. JSON-LD on the About page:
   {
     "@context": "https://schema.org",
     "@graph": [
       { "@type": "Organization", "@id": "https://odysense.com/#organization", "name": "Odysense",
         "url": "https://odysense.com", "email": "contact@odysense.com", "telephone": "+974 3066 6516",
         "address": { "@type": "PostalAddress", "streetAddress": "Innovation Centre, Qatar Science & Technology Park",
           "addressLocality": "Doha", "addressCountry": "QA" } },
       { "@type": "SoftwareApplication", "name": "QFlow", "url": "https://qflow.odysense.com",
         "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
         "description": "Restaurant operating system: QR table ordering, bill splitting, POS, kitchen display and delivery-app integrations.",
         "publisher": { "@id": "https://odysense.com/#organization" },
         "creator": { "@id": "https://odysense.com/#organization" },
         "sameAs": ["https://odysense.com/products/qflow/"] }
     ]
   }
5. Link the new page from the main navigation or footer, check that every link works, run the site's
   build, and report the page URL and the links you added.
```

---

## 3. ProSeek (pro-seek.com)

```text
You are working on the ProSeek website (pro-seek.com), an AI-powered platform that matches skilled
professionals with the people who need them. ProSeek is built and run by Odysense. Add an "About ProSeek /
Built by Odysense" page and a small footer credit, so search engines clearly connect ProSeek with Odysense
and the Odysense website.

FACTS YOU MAY USE (do not add others):
- Odysense is a Doha-based digital agency and software company at the Innovation Centre, Qatar Science
  & Technology Park (QSTP). It designs and builds websites, e-commerce stores, custom software and
  mobile apps for businesses in Qatar, Saudi Arabia and the GCC, and runs its own products: WASL, QFlow,
  Store Portal, Odysense AI, ProSeek, Social Bakery and Rehabitt (7 in-house products; 20+ clients every
  year).
- Contact: contact@odysense.com · +974 3066 6516 · WhatsApp https://wa.link/odysense
- ProSeek: professionals sign up free and build one profile (skills, experience, certifications,
  portfolio); clients describe what they need in natural language and AI semantic search matches the
  right professionals; clients contact professionals directly; no middleman, no commission, no hidden
  fees.
- NEVER name or describe the founder. NEVER mention a founding year or "X years". NEVER invent user
  counts, match rates, ratings or customer names.

BUILD:
1. A page at /about/ (or the site's existing About route), titled roughly "About ProSeek: built by
   Odysense in Qatar" (keep the full <title> at 60 characters or less), with a meta description, a
   canonical URL and an entry in the sitemap. Match the site's existing design and language(s); if the
   site has Arabic, build the Arabic version too and link the two with hreflang.
2. Content, answer first:
   - Opening paragraph: what ProSeek is and how it works in one or two sentences, and that it is built
     and run by Odysense, a software company at QSTP in Doha.
   - "How ProSeek works": short steps for professionals and for clients, from the facts above.
   - "Built by Odysense": Odysense builds AI-powered products of its own and for clients. Link the word
     "Odysense" to https://odysense.com/ and, once in the same section, link "custom software and AI
     development" to https://odysense.com/software-development-company-qatar/
   - "More from Odysense": Odysense AI (https://ai.odysense.com) and WASL (https://wasl.odysense.com).
   - Contact block with the details above, and a link "ProSeek on odysense.com" to
     https://odysense.com/products/proseek/ (Arabic pages: https://odysense.com/ar/products/proseek/).
3. Footer, on every page: "A product by Odysense", with only "Odysense" linked to
   https://odysense.com/products/proseek/ (Arabic: https://odysense.com/ar/products/proseek/). One link,
   no extra keywords, not hidden.
4. JSON-LD on the About page:
   {
     "@context": "https://schema.org",
     "@graph": [
       { "@type": "Organization", "@id": "https://odysense.com/#organization", "name": "Odysense",
         "url": "https://odysense.com", "email": "contact@odysense.com", "telephone": "+974 3066 6516",
         "address": { "@type": "PostalAddress", "streetAddress": "Innovation Centre, Qatar Science & Technology Park",
           "addressLocality": "Doha", "addressCountry": "QA" } },
       { "@type": "WebApplication", "name": "ProSeek", "url": "https://pro-seek.com",
         "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
         "description": "AI-powered matching of professionals and clients: free profiles, semantic search, direct contact, no commission.",
         "publisher": { "@id": "https://odysense.com/#organization" },
         "creator": { "@id": "https://odysense.com/#organization" },
         "sameAs": ["https://odysense.com/products/proseek/"] }
     ]
   }
5. Link the new page from the main navigation or footer, check that every link works, run the site's
   build, and report the page URL and the links you added.
```

---

## 4. Rehabitt (rehabitt.com)

```text
You are working on the Rehabitt website (rehabitt.com), gamified paediatric physiotherapy built and run by
Odysense. Add an "About Rehabitt / Built by Odysense" page and a small footer credit, so search engines
clearly connect Rehabitt with Odysense and the Odysense website.

FACTS YOU MAY USE (do not add others):
- Odysense is a Doha-based digital agency and software company at the Innovation Centre, Qatar Science
  & Technology Park (QSTP). It designs and builds websites, e-commerce stores, custom software and
  mobile apps for businesses in Qatar, Saudi Arabia and the GCC, and runs its own products: WASL, QFlow,
  Store Portal, Odysense AI, ProSeek, Social Bakery and Rehabitt (7 in-house products; 20+ clients every
  year).
- Contact: contact@odysense.com · +974 3066 6516 · WhatsApp https://wa.link/odysense
- Rehabitt: home physiotherapy exercises for children turned into games; camera-based motion tracking
  that runs on the device (no wearables, just a camera); progress, rewards and play mechanics that keep
  children engaged through their programme; a clinician dashboard where therapists assign programmes and
  monitor adherence and progress remotely; developed with clinical expertise at its core.
- This is a health product: make NO medical or outcome claims (no "faster recovery", no percentages, no
  "clinically proven") unless the Rehabitt team supplies a published source. Keep wording to what the
  product does.
- NEVER name or describe the founder. NEVER mention a founding year or "X years". NEVER invent clinic
  counts, patient numbers, ratings, partner names or endorsements.

BUILD:
1. A page at /about/ (or the site's existing About route), titled roughly "About Rehabitt: built by
   Odysense" (keep the full <title> at 60 characters or less), with a meta description, a canonical URL
   and an entry in the sitemap. Match the site's existing design and language(s); if the site has Arabic,
   build the Arabic version too and link the two with hreflang.
2. Content, answer first:
   - Opening paragraph: what Rehabitt does for children, families and therapists, and that it is built
     and run by Odysense, a software company at QSTP in Doha.
   - "How Rehabitt works": short list from the facts above.
   - "Built by Odysense": the team behind Rehabitt also designs interactive games and builds mobile apps
     and software. Link the word "Odysense" to https://odysense.com/ and, once in the same section, link
     "mobile app development" to https://odysense.com/mobile-app-development-company-qatar/
   - "More from Odysense": the gamification and interactive-experience work at
     https://odysense.com/gamification-brand-activation-qatar/ (anchor: "interactive games by Odysense").
   - Contact block with the details above, and a link "Rehabitt on odysense.com" to
     https://odysense.com/products/rehabitt/ (Arabic pages: https://odysense.com/ar/products/rehabitt/).
3. Footer, on every page: "A product by Odysense", with only "Odysense" linked to
   https://odysense.com/products/rehabitt/ (Arabic: https://odysense.com/ar/products/rehabitt/). One link,
   no extra keywords, not hidden.
4. JSON-LD on the About page:
   {
     "@context": "https://schema.org",
     "@graph": [
       { "@type": "Organization", "@id": "https://odysense.com/#organization", "name": "Odysense",
         "url": "https://odysense.com", "email": "contact@odysense.com", "telephone": "+974 3066 6516",
         "address": { "@type": "PostalAddress", "streetAddress": "Innovation Centre, Qatar Science & Technology Park",
           "addressLocality": "Doha", "addressCountry": "QA" } },
       { "@type": "SoftwareApplication", "name": "Rehabitt", "url": "https://rehabitt.com",
         "applicationCategory": "HealthApplication",
         "description": "Gamified paediatric physiotherapy with on-device, camera-based motion tracking and a clinician dashboard.",
         "publisher": { "@id": "https://odysense.com/#organization" },
         "creator": { "@id": "https://odysense.com/#organization" },
         "sameAs": ["https://odysense.com/products/rehabitt/"] }
     ]
   }
5. Link the new page from the main navigation or footer, check that every link works, run the site's
   build, and report the page URL and the links you added.
```

---

## Fix: the About page is invisible to Google (WASL, ProSeek)

The 2026-10-29 audit (Live check → `urls`; see the "Audit" section below) found that
`wasl.odysense.com/about` and `pro-seek.com/about` are built only in the browser. The HTML a crawler first
receives is the homepage shell, so Google may never index the About page or follow its links:
- the title and description are the homepage's;
- WASL's canonical points to the homepage, which tells Google to treat /about as a duplicate;
- fewer than 10 words of text are in the HTML;
- there are no links to odysense.com in the HTML.

`qflow.odysense.com/about` and `rehabitt.com/about` are fine. QFlow's About page does print two sets of
hreflang tags (the homepage's and its own); remove the homepage set from that page.

Paste this into the WASL and ProSeek codebases:

```text
The /about page on this site renders only in the browser. When a crawler requests /about it receives the
homepage's HTML: the homepage <title> and description, (on WASL) a canonical pointing at the homepage, almost
no text, and no links. Search engines may treat /about as a duplicate of the homepage and never see its
content. Fix it so the HTML served for /about is the finished page.

1. Find how the site is built (package.json, framework, router, hosting). Then pick the smallest fix:
   - Next.js / Nuxt / Astro / Remix: render /about on the server or statically, with its own metadata.
   - Vite or Create React App single-page app: prerender /about (and /ar/about if it exists) to static
     HTML at build time, with a prerender plugin or a build step that renders the route to HTML.
     Hosting must serve that file for /about instead of the SPA fallback index.html.
2. The HTML served for /about must contain, without running JavaScript:
   - its own <title> (60 characters or less) and meta description;
   - <link rel="canonical" href="https://<this domain>/about"> (not the homepage);
   - og:title, og:description and og:url for /about;
   - the full page text, and every link to odysense.com as a normal <a href>;
   - the JSON-LD from the original brief, with "publisher" and "creator" set to
     {"@id": "https://odysense.com/#organization"} and the Organization node using that same @id.
   If the site is bilingual, do the same for the Arabic About page and give both pages matching hreflang
   tags (en, ar, x-default), and only those. Remove any homepage hreflang tags from the About page.
3. The footer credit "A product by Odysense" (only "Odysense" linked to this product's page on
   odysense.com) must also be in the server-sent HTML on every page.
4. Make sure /about is in sitemap.xml with its final URL.
5. Verify from the command line, not the browser:
     curl -s https://<this domain>/about | grep -E "<title>|canonical|odysense.com"
   The output must show the About title, the /about canonical and the odysense.com links. Run the build,
   deploy, run the curl check against production, and report the output.
Do not change any page content, facts or links beyond what is needed for this fix.
```

## Audit any page that references Odysense

On GitHub, open the odysense-website repository and go to **Actions → Live check → Run workflow**.
Paste space-separated URLs into **urls**. The log then reports, for each page:
- status, title, description and canonical;
- hreflang tags and JSON-LD (including whether it points at `https://odysense.com/#organization`);
- every link to odysense.com with its anchor text;
- how much text is in the server-rendered HTML;
- any founder or founding-year wording.

It works for client sites carrying the footer credit too.

## After the pages are live

1. **Index them.** Add each product site to Google Search Console (if it isn't already), submit its
   sitemap and request indexing for the new About page.
2. **Link back.** Done 2026-10-29: `aboutUrl` (and `aboutUrlAr` where an Arabic About page exists) in
   `lib/site.ts` → `products` adds an "About {product}" link on each odysense.com product page.
3. **Keep the facts in step.** If a product's features, prices or contact details change, update the
   About page and the matching `productDetails` entry in `lib/site.ts` together.
