/**
 * Service pages — structured content rendered by components/service-page.tsx.
 * One entry per SEO landing page. URLs preserve the legacy WordPress paths.
 */

export type ServiceDef = {
  slug: string; // route path without leading/trailing slashes
  crumb: string;
  title: string; // plain part of H1
  titleAccent: string; // serif italic part of H1
  metaTitle: string;
  metaDescription: string;
  lede: string;
  includesKicker?: string;
  includes: { h: string; p: string }[];
  faqs: { q: string; a: string }[];
  related?: { label: string; href: string }[];
  ctaTitle: string;
  ctaAccent: string;
  ctaBody: string;
};

export const servicePages: ServiceDef[] = [
  {
    slug: "website-design-company-in-qatar",
    crumb: "Website Design",
    title: "Website design",
    titleAccent: "company in Qatar.",
    metaTitle: "Website Design Company in Qatar",
    metaDescription:
      "Odysense designs fast, beautiful, conversion-focused websites for brands in Qatar & the GCC. Custom design, not templates — since 2013.",
    lede: "Websites designed around your brand and your customer — not a template with your logo on it. Fast, modern and built to turn visitors into enquiries.",
    includes: [
      { h: "Custom design", p: "Every layout designed for your content and audience — unmistakably yours, never off-the-shelf." },
      { h: "Mobile-first", p: "Designed for the phone screens where most Qatar traffic actually happens, then scaled up." },
      { h: "Performance", p: "Fast-loading pages engineered for Core Web Vitals — speed is design, and Google agrees." },
      { h: "Conversion-focused", p: "Clear paths to enquiry on every page: forms, WhatsApp and calls to action that get used." },
      { h: "Bilingual-ready", p: "Arabic/English architecture with proper RTL support planned in from the first wireframe." },
      { h: "SEO foundation", p: "Structured data, semantic markup and metadata built in — designed to be found, not just admired." },
    ],
    faqs: [
      {
        q: "How much does a website cost in Qatar?",
        a: "A professionally designed business website in Qatar typically starts around QAR 2,000–10,000 depending on the number of pages and features; e-commerce and custom web applications range higher. Odysense quotes fixed and itemized before work begins, so you know the full cost upfront.",
      },
      {
        q: "How long does a website take to design and launch?",
        a: "Most business websites launch in 3–6 weeks: discovery and design first, then build, content and testing. You'll see the design and approve it before anything is developed.",
      },
      {
        q: "Do you redesign existing websites?",
        a: "Yes — redesigns are a specialty, including migrating from WordPress page builders to modern, faster stacks without losing your Google rankings. We map every existing URL and set up proper redirects as part of the project.",
      },
      {
        q: "Will I be able to update the website myself?",
        a: "Yes. We set up a clean content admin for the pages you'll change often — blog, news, products — while keeping the design locked so it stays consistent no matter who edits.",
      },
    ],
    related: [
      { label: "E-commerce development", href: "/ecommerce-development-company-qatar" },
      { label: "Website development", href: "/website-development-company-qatar" },
      { label: "See our work", href: "/work" },
    ],
    ctaTitle: "Your website should be",
    ctaAccent: "your best salesperson.",
    ctaBody: "Tell us about your business and what the site needs to achieve. Fixed quote, usually within two business days.",
  },
  {
    slug: "website-development-company-qatar",
    crumb: "Website Development",
    title: "Website development",
    titleAccent: "company in Qatar.",
    metaTitle: "Website Development Company in Qatar",
    metaDescription:
      "Custom website development in Qatar — fast, secure, scalable builds on modern stacks. Odysense has engineered websites for GCC brands since 2013.",
    lede: "Engineering behind the design: fast, secure, scalable websites built on modern technology — from marketing sites to complex web platforms.",
    includes: [
      { h: "Modern stacks", p: "React, Next.js and WordPress where it fits — the right technology for the job, not one hammer for every nail." },
      { h: "Speed engineering", p: "95+ Lighthouse scores as a target, not an accident — image optimization, clean code, global CDN delivery." },
      { h: "Integrations", p: "CRMs, payment gateways, booking systems, WhatsApp — we connect your website to the tools that run your business." },
      { h: "Security", p: "Hardened builds, HTTPS everywhere, and none of the plugin-vulnerability roulette that plagues neglected sites." },
      { h: "Scalability", p: "Architecture that handles growth — traffic spikes, new sections, new languages — without a rebuild." },
      { h: "Care & maintenance", p: "Monitoring, updates and support after launch. Websites are living products, and we treat them that way." },
    ],
    faqs: [
      {
        q: "What technologies do you develop with?",
        a: "We work across modern JavaScript stacks (React, Next.js), WordPress/WooCommerce where a CMS-first approach fits, and custom backends when the project needs them. The recommendation always follows the requirements — performance, budget, and who maintains it after launch.",
      },
      {
        q: "Can you take over a website another agency built?",
        a: "Yes — we regularly audit, stabilize and improve inherited codebases. We'll start with a technical review so you know exactly what you have before deciding whether to improve it or rebuild.",
      },
      {
        q: "Do you build web applications, not just websites?",
        a: "Yes. Beyond marketing websites, Odysense builds full web applications — dashboards, portals, booking systems and SaaS products. Our own products (WASL, QFlow, Rehabitt) are proof we ship real software, not just brochureware.",
      },
      {
        q: "What does maintenance cost after launch?",
        a: "Care plans depend on the site's complexity — from simple monitoring-and-updates retainers to ongoing development hours. We'll propose a plan sized to your site, and you're never locked in.",
      },
    ],
    related: [
      { label: "Software development", href: "/software-development-company-qatar" },
      { label: "Website design", href: "/website-design-company-in-qatar" },
      { label: "Our products", href: "/products" },
    ],
    ctaTitle: "Built properly",
    ctaAccent: "the first time.",
    ctaBody: "Describe what you need built — or what needs rescuing. We reply within one business day, from Doha.",
  },
  {
    slug: "software-development-company-qatar",
    crumb: "Software Development",
    title: "Software development",
    titleAccent: "company in Qatar.",
    metaTitle: "Software Development Company in Qatar",
    metaDescription:
      "Custom software development in Doha — web applications, dashboards, portals and SaaS products for businesses in Qatar & the GCC. Odysense, since 2013.",
    lede: "Custom software for businesses that outgrew spreadsheets and off-the-shelf tools — web applications, dashboards, portals and products, built in Doha.",
    includes: [
      { h: "Web applications", p: "Custom platforms built around your workflow — not your workflow bent around someone else's software." },
      { h: "Dashboards & portals", p: "Internal tools, client portals and reporting dashboards that put your data to work." },
      { h: "SaaS product builds", p: "From MVP to market — we've built and launched our own SaaS products, and we'll build yours." },
      { h: "API & integrations", p: "Connecting your systems — payments, WhatsApp, ERPs, government portals — into one coherent flow." },
      { h: "AI features", p: "Practical AI where it earns its place: chat, automation, document processing — built into your product." },
      { h: "Long-term partnership", p: "Software is never finished. We stay on as your product team, shipping improvements release after release." },
    ],
    faqs: [
      {
        q: "How is Odysense different from a typical software house?",
        a: "We build and operate our own software products — WASL, QFlow, Rehabitt and more. That means we make product decisions like owners, not order-takers: we've lived with the consequences of architecture choices, and it shows in what we build for clients.",
      },
      {
        q: "How much does custom software cost?",
        a: "Custom software in Qatar typically starts around QAR 10,000 for a focused MVP and scales with complexity. We always propose a phased plan — a lean first release that proves value, then iterations — rather than a giant one-shot build.",
      },
      {
        q: "Do you sign NDAs and work with sensitive data?",
        a: "Yes. We routinely sign NDAs and have delivered projects for banking, government-adjacent and healthcare clients where confidentiality and data handling are strict requirements.",
      },
      {
        q: "Who owns the code?",
        a: "You do. Full source code and documentation are handed over, and everything is built so another competent team could take it on — though most clients stay because they don't want to.",
      },
    ],
    related: [
      { label: "Our products", href: "/products" },
      { label: "Website development", href: "/website-development-company-qatar" },
      { label: "WhatsApp Business API", href: "/whatsapp-business-api-qatar" },
    ],
    ctaTitle: "Software that fits",
    ctaAccent: "how you actually work.",
    ctaBody: "Tell us the problem — even roughly. We'll come back with a practical, phased proposal.",
  },
  {
    slug: "mobile-app-development-company-qatar",
    crumb: "Mobile Apps",
    title: "Mobile app development",
    titleAccent: "company in Qatar.",
    metaTitle: "Mobile App Development Company in Qatar",
    metaDescription:
      "iOS and Android app development in Qatar — from concept to App Store. Cross-platform builds, modern UX, and long-term support by Odysense.",
    lede: "iOS and Android apps from concept to store — designed for real users, engineered to be maintained, and supported long after launch day.",
    includes: [
      { h: "iOS & Android", p: "Cross-platform builds that ship to both stores from one codebase — faster to build, cheaper to maintain." },
      { h: "Product design", p: "UX and UI designed around user journeys, tested before a line of code is written." },
      { h: "Backend & APIs", p: "The server side too — authentication, databases, notifications and admin panels, all from one team." },
      { h: "Store publishing", p: "App Store and Google Play submission handled end to end, including compliance and store assets." },
      { h: "Web-app alternative", p: "Honest advice on when a progressive web app beats a native build — sometimes it does, and we'll say so." },
      { h: "Post-launch support", p: "OS updates, new features, crash monitoring — apps need a team behind them, and you'll have one." },
    ],
    faqs: [
      {
        q: "How much does a mobile app cost in Qatar?",
        a: "A focused first-release app typically starts around QAR 15,000–20,000 including backend and store publishing; complex apps range higher. A detailed fixed quote follows a scoping session — and if a web app would serve you better for less, we'll tell you before you spend.",
      },
      {
        q: "Do you build native or cross-platform?",
        a: "Cross-platform by default (one codebase for iOS and Android) because it's faster and cheaper to build and maintain — with native modules where performance demands it. Fully native builds are available when the product genuinely requires them.",
      },
      {
        q: "Can you update or rescue an existing app?",
        a: "Yes — we take over existing apps for updates, redesigns and store compliance. We start with a code and infrastructure review so you know the state of what you have.",
      },
      {
        q: "How long does an app take to build?",
        a: "A typical first release ships in 8–14 weeks depending on scope: design first, then iterative development builds you can install and test throughout.",
      },
    ],
    related: [
      { label: "Software development", href: "/software-development-company-qatar" },
      { label: "Our products", href: "/products" },
    ],
    ctaTitle: "From idea",
    ctaAccent: "to the App Store.",
    ctaBody: "Tell us what the app should do and who it's for. We'll scope it honestly — including whether you actually need one.",
  },
  {
    slug: "digital-marketing-agency-qatar",
    crumb: "Digital Marketing",
    title: "Digital marketing",
    titleAccent: "agency in Qatar.",
    metaTitle: "Digital Marketing Agency in Qatar",
    metaDescription:
      "Performance-focused digital marketing in Qatar — SEO, paid ads, content and analytics. Odysense grows brands with data, not vanity metrics.",
    lede: "Marketing measured in enquiries and sales, not likes. SEO, paid media, content and analytics — run by the same team that builds your website.",
    includes: [
      { h: "SEO", p: "Technical SEO, content and local visibility — engineered to rank in Qatar and the GCC. See our dedicated SEO service." },
      { h: "Paid advertising", p: "Google Ads and social campaigns with proper conversion tracking — every riyal accounted for." },
      { h: "Content & social", p: "Content calendars, campaigns and creative produced in-house — including via our Social Bakery platform." },
      { h: "Analytics", p: "GA4, conversion tracking and honest reporting: what it cost, what it earned, what to do next." },
      { h: "Conversion optimization", p: "Landing pages, A/B tests and funnel fixes — traffic is wasted if the site doesn't convert it." },
      { h: "WhatsApp marketing", p: "Broadcasts, automations and re-engagement on WhatsApp via our WASL platform — the Gulf's highest-attention channel." },
    ],
    faqs: [
      {
        q: "What makes Odysense different from other agencies in Qatar?",
        a: "The team running your marketing is the team that builds websites and software — so when a landing page needs fixing or tracking needs wiring, it just gets done, same team, same week. Most agencies stop at the ad account.",
      },
      {
        q: "How do you report results?",
        a: "Monthly reports built on real conversion data: enquiries, calls, WhatsApp starts and sales where trackable — alongside spend. No screenshots of impressions dressed up as results.",
      },
      {
        q: "What's the minimum budget to advertise in Qatar?",
        a: "Meaningful Google Ads campaigns in Qatar typically start around QAR 3,000–5,000/month in ad spend for competitive niches, plus management. We'll be honest if your budget would be better spent on SEO or the website first.",
      },
      {
        q: "Do you require long contracts?",
        a: "No lock-ins. Growth work compounds over months, so we recommend at least a quarter to judge results — but you stay because it's working, not because a contract says so.",
      },
    ],
    related: [
      { label: "SEO services", href: "/digital-marketing-agency-qatar/seo-services-qatar" },
      { label: "Social Bakery", href: "/products/social-bakery" },
      { label: "WASL — WhatsApp platform", href: "/products/wasl" },
    ],
    ctaTitle: "Growth you can see",
    ctaAccent: "in the numbers.",
    ctaBody: "Tell us your goals and your market. We'll propose a plan with honest expectations — including what not to spend on.",
  },
  {
    slug: "digital-marketing-agency-qatar/seo-services-qatar",
    crumb: "SEO Services",
    title: "SEO services",
    titleAccent: "in Qatar.",
    metaTitle: "SEO Services in Qatar",
    metaDescription:
      "SEO services in Qatar that earn rankings: technical SEO, content, and local visibility for businesses targeting Qatar & the GCC. By Odysense.",
    lede: "Getting found by the people already searching for what you sell — technical SEO, content and local visibility, done by engineers who build fast websites for a living.",
    includes: [
      { h: "Technical SEO", p: "Site speed, Core Web Vitals, indexing, structured data — the engineering layer most agencies can't touch." },
      { h: "Keyword strategy", p: "Targeting the searches your buyers in Qatar and the GCC actually make — in English and Arabic." },
      { h: "Content that ranks", p: "Pages and articles written to answer real questions, mapped to your services and products." },
      { h: "Local SEO", p: "Google Business Profile, local citations and reviews — owning the map results for your category." },
      { h: "Link earning", p: "Authority built through content and partnerships worth linking to — never bought-link schemes that get sites penalized." },
      { h: "Transparent reporting", p: "Rankings, traffic and — most importantly — enquiries from organic search, reported monthly." },
    ],
    faqs: [
      {
        q: "How long does SEO take to show results in Qatar?",
        a: "Expect early movement in 2–3 months and meaningful lead flow by 4–6 months for most niches. Anyone promising page one in weeks is selling something that ends badly. Qatar's market is less saturated than global niches, which honestly works in your favor.",
      },
      {
        q: "Why didn't my previous SEO work?",
        a: "The most common causes we find in audits: a slow website that undermines everything, thin pages targeting no real search intent, and reporting that tracked rankings for keywords nobody searches. We start every engagement with an audit that tells you exactly what happened.",
      },
      {
        q: "Do you do Arabic SEO?",
        a: "Yes — Arabic keyword research, content and RTL-correct implementation for brands targeting Arabic-speaking audiences in Qatar and KSA. It's one of the biggest untapped opportunities in the region's search results.",
      },
      {
        q: "What does SEO cost in Qatar?",
        a: "Ongoing SEO retainers in Qatar typically run QAR 3,000–8,000/month depending on competitiveness and content volume, after an initial audit. We scope to your market — and we'll say upfront if SEO isn't your best first investment.",
      },
    ],
    related: [
      { label: "Digital marketing", href: "/digital-marketing-agency-qatar" },
      { label: "Website design", href: "/website-design-company-in-qatar" },
    ],
    ctaTitle: "Be the answer",
    ctaAccent: "your customers find.",
    ctaBody: "Send us your website. We'll audit where you stand and tell you honestly what it'll take to rank.",
  },
  {
    slug: "whatsapp-business-api-qatar",
    crumb: "WhatsApp Business API",
    title: "WhatsApp Business API",
    titleAccent: "in Qatar.",
    metaTitle: "WhatsApp Business API Integration in Qatar",
    metaDescription:
      "Official WhatsApp Business API setup in Qatar — verified sender, AI inbox, broadcasts and notifications via WASL, Odysense's WhatsApp platform.",
    lede: "The Gulf runs on WhatsApp — your business should too. Official API setup, verified sender, AI-powered inbox and automated notifications, powered by our own WASL platform.",
    includes: [
      { h: "Official API setup", p: "Meta verification, number setup and template approval handled end to end — done right the first time." },
      { h: "AI inbox", p: "WASL's AI answers common questions instantly and hands off to your team when it matters." },
      { h: "Broadcasts", p: "Compliant marketing broadcasts to opted-in customers — offers, updates and re-engagement at scale." },
      { h: "Notifications", p: "Order confirmations, delivery updates, appointment reminders — automated from your systems." },
      { h: "E-commerce integration", p: "Connected to your store: carts, order status and support in the same thread your customer already has open." },
      { h: "Team inbox", p: "Multiple agents on one number, with assignment, notes and history — WhatsApp organized like a helpdesk." },
    ],
    faqs: [
      {
        q: "What's the difference between WhatsApp Business App and the API?",
        a: "The free app suits one person on one phone. The API is for businesses: multiple team members, automation, integrations with your store or CRM, verified sender status and broadcast messaging at scale — all of which WASL provides on top of the official API.",
      },
      {
        q: "How much does the WhatsApp Business API cost?",
        a: "Costs have two parts: Meta's per-conversation fees (a few halalas to under a riyal per conversation depending on type) and the platform. WASL plans start affordably for small teams — contact us for current pricing tiers.",
      },
      {
        q: "Is broadcast messaging on WhatsApp legal?",
        a: "Yes, when done through the official API with opted-in recipients and approved templates — which is exactly how WASL works. Unofficial bulk-sender tools risk having your number banned; we don't touch them.",
      },
      {
        q: "Can it connect to my existing website or POS?",
        a: "Yes — WASL integrates with e-commerce platforms, booking systems and custom software. As the developers of both WASL and many of those systems, integration is our home turf.",
      },
    ],
    related: [
      { label: "WASL — the platform", href: "/products/wasl" },
      { label: "E-commerce development", href: "/ecommerce-development-company-qatar" },
    ],
    ctaTitle: "Meet your customers",
    ctaAccent: "where they already are.",
    ctaBody: "Tell us your use case — support, sales or notifications. We'll set up a WASL demo on your own number.",
  },
  {
    slug: "branding-agency-qatar",
    crumb: "Branding",
    title: "Branding agency",
    titleAccent: "in Qatar.",
    metaTitle: "Branding Agency in Qatar",
    metaDescription:
      "Brand strategy and identity design in Qatar — logos, visual identity, guidelines and full brand systems for GCC businesses. By Odysense, since 2013.",
    lede: "Identity, strategy and design systems that make a brand unmistakable — from the logo to the last touchpoint, built for the GCC market.",
    includes: [
      { h: "Brand strategy", p: "Positioning, personality and audience clarity — the thinking that makes every design decision easier." },
      { h: "Logo & identity", p: "Distinctive marks and visual systems designed to work everywhere — from signage to app icon." },
      { h: "Bilingual identity", p: "Arabic and English wordmarks designed together, not one translated as an afterthought." },
      { h: "Brand guidelines", p: "Practical style guides your team and suppliers can actually follow — colors, type, voice and usage." },
      { h: "Collateral & print", p: "Business cards, packaging, signage, presentations — the identity applied consistently in the real world." },
      { h: "Digital-first", p: "Identities designed knowing they'll live on screens — websites, social and apps included from day one." },
    ],
    faqs: [
      {
        q: "How much does branding cost in Qatar?",
        a: "A professional identity project (strategy, logo, core identity system and guidelines) typically starts around QAR 5,000–10,000; full brand systems with bilingual identity and extensive collateral range higher. Fixed, itemized quotes before we start.",
      },
      {
        q: "Do you design Arabic logos and bilingual identities?",
        a: "Yes — bilingual identity is a core GCC requirement and one of our strengths. Arabic and English marks are designed as one system with matched weight, character and quality.",
      },
      {
        q: "Can you rebrand an existing business without losing recognition?",
        a: "Yes — evolution rather than revolution is usually right for established businesses. We audit what equity your current brand holds and carry the recognizable parts forward deliberately.",
      },
      {
        q: "What do we receive at the end?",
        a: "Everything: source files, exports for every use case, a practical brand guideline document, and handover so any supplier can apply the identity correctly. The brand is yours, completely.",
      },
    ],
    related: [
      { label: "Website design", href: "/website-design-company-in-qatar" },
      { label: "See our work", href: "/work" },
    ],
    ctaTitle: "Become",
    ctaAccent: "unmistakable.",
    ctaBody: "Tell us about your business and where it's headed. We'll propose a branding approach sized to your stage.",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((s) => s.slug === slug);
}
