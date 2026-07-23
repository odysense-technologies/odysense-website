/**
 * Site content — single source of truth.
 * When Payload CMS is wired in (build step 8), these become collections
 * and this file becomes the fallback/seed data.
 */

export const site = {
  name: "Odysense",
  url: "https://odysense.com",
  email: "contact@odysense.com",
  whatsapp: "https://wa.link/odysense",
  phone: "+974 3066 6516",
  address: "Innovation Centre, Qatar Science & Technology Park, Doha, Qatar",
  founded: 2013,
  description:
    "Odysense is a Doha-based digital agency and software company. We design, build and grow websites, e-commerce and products for ambitious brands across Qatar, Saudi Arabia and the Gulf.",
};

export const services = [
  {
    numeral: "i.",
    title: "Strategy",
    slug: "/services",
    description:
      "Brand identity, positioning and targeting — clarity about who you are and who you're speaking to, before anything is designed.",
    tags: ["Identity", "Positioning", "Targeting"],
  },
  {
    numeral: "ii.",
    title: "Design & Development",
    slug: "/website-design-company-in-qatar",
    description:
      "Fast, beautiful websites, e-commerce and web applications — engineered for performance and built to convert.",
    tags: ["Web", "E-commerce", "Apps", "Branding"],
  },
  {
    numeral: "iii.",
    title: "Growth",
    slug: "/digital-marketing-agency-qatar",
    description:
      "SEO, paid media and conversion optimization. We stay after launch and compound your results month over month.",
    tags: ["SEO", "PPC", "Analytics", "CRO"],
  },
];

export const products = [
  {
    name: "WASL",
    logo: "/logos/wasl.svg",
    chip: "WhatsApp AI",
    chipColor: "purple",
    url: "https://wasl.odysense.com",
    urlLabel: "wasl.odysense.com",
    slug: "/products/wasl",
    description:
      "AI-powered WhatsApp inbox and notifications. Sell, support and notify customers on the channel the Gulf actually answers.",
  },
  {
    name: "QFlow",
    logo: "/logos/qflow.svg",
    chip: "Queue & Ordering",
    chipColor: "orange",
    url: "https://qflow.odysense.com",
    urlLabel: "qflow.odysense.com",
    slug: "/products/qflow",
    description:
      "QR-powered restaurant and queue management. Guests scan, order and flow — you see the whole floor in real time.",
  },
  {
    name: "Social Bakery",
    logo: "/logos/social-bakery.svg",
    chip: "Content Ops",
    chipColor: "pink",
    url: "https://social-bakery.com",
    urlLabel: "social-bakery.com",
    slug: "/products/social-bakery",
    description:
      "Agency-grade content delivered like a subscription — calendars, campaigns and creative that never go quiet.",
  },
  {
    name: "Rehabitt",
    logo: "/logos/rehabitt.png",
    chip: "Health Tech",
    chipColor: "sky",
    url: "https://rehabitt.com",
    urlLabel: "rehabitt.com",
    slug: "/products/rehabitt",
    description:
      "Gamified paediatric physiotherapy with camera-based motion tracking — home exercise, turned into play.",
  },
  {
    name: "ProSeek",
    logo: "/logos/proseek.png",
    chip: "AI Talent Search",
    chipColor: "purple",
    url: "https://pro-seek.com",
    urlLabel: "pro-seek.com",
    slug: "/products/proseek",
    description:
      "An AI-powered platform connecting skilled professionals with the people who need them — semantic search, direct contact, no middleman, no commission.",
  },
  {
    name: "Odysense AI",
    logo: "/logos/odysense-ai.png",
    chip: "AI Platform",
    chipColor: "sky",
    url: "https://ai.odysense.com",
    urlLabel: "ai.odysense.com",
    slug: "/products/odysense-ai",
    description:
      "All-in-one AI content platform — generate text, images, code and chatbots in minutes, in multiple languages, from one dashboard.",
  },
];

export const clients = [
  "EUROPEAN UNION",
  "QSTP",
  "ELEGANZA",
  "EUNITED",
  "VOLUME FNB",
  "FORMASPORTS",
  "GRAZE",
];

export const marqueeWords = [
  { text: "Strategy", serif: false },
  { text: "Branding", serif: true },
  { text: "E-commerce", serif: false },
  { text: "Web design", serif: true },
  { text: "Development", serif: false },
  { text: "SEO", serif: true },
  { text: "Content", serif: false },
  { text: "Growth", serif: true },
];

export const testimonial = {
  quote:
    "From concept to identity, they transformed our vision into a brand that truly reflects who we are. The strategy, creativity and attention to detail exceeded our expectations.",
  author: "Ali Abdulla",
  role: "Founder",
};

/** Extended content for /products/[slug] pages */
export const productDetails: Record<
  string,
  { tagline: string; features: { h: string; p: string }[]; cta: string; image?: { src: string; alt: string } }
> = {
  wasl: {
    tagline: "Send WhatsApp messages at scale for your business.",
    features: [
      { h: "WhatsApp Cloud API", p: "Official Meta-verified connection — no third-party proxies. Messages go directly through Meta's infrastructure with enterprise SLAs." },
      { h: "Template management", p: "Create, submit and manage Meta-approved templates, with an admin review workflow that ensures compliance before going live." },
      { h: "Auto-reply bots", p: "Keyword-triggered replies for inbound and outbound messages — priority rules, exact or fuzzy matching, text or template responses." },
      { h: "API keys & playground", p: "Developer-first API with scoped keys, IP allowlists and a live sandbox to test sends before production." },
      { h: "Credits system", p: "Transparent pay-as-you-go pricing — top up credits, track consumption per message, set spending controls." },
      { h: "Audit logs & analytics", p: "A complete audit trail for every action, plus delivery analytics, error breakdowns and bot performance dashboards." },
    ],
    cta: "Get a WASL demo on your own number.",
  },
  qflow: {
    tagline: "Scan. Order. Flow.",
    image: { src: "/images/qflow-cafe.webp", alt: "A café moment — QFlow in its natural habitat" },
    features: [
      { h: "QR code menus", p: "A unique QR code for every table — customers scan to view the live menu and their running bill." },
      { h: "Bill splitting", p: "Split equally, by item, or custom amounts, with real-time tracking of who's paid and who hasn't." },
      { h: "POS terminal", p: "A full point-of-sale for staff — cash, card and digital payments processed from one dashboard." },
      { h: "Kitchen display", p: "Real-time kitchen order screen with status tracking — preparing, ready, served." },
      { h: "Delivery integrations", p: "Talabat, Snoonu, Rafeeq and Keeta connected — aggregator orders flow into the same kitchen screen." },
      { h: "Analytics dashboard", p: "Revenue, popular items, peak hours and payment trends in clear visual reports." },
    ],
    cta: "See QFlow running in a venue like yours.",
  },
  "social-bakery": {
    tagline: "Fresh content, delivered like clockwork.",
    features: [
      { h: "Content subscription", p: "Agency-grade posts, campaigns and creative on a predictable monthly plan — no retainers drama." },
      { h: "Calendars that ship", p: "Planned, produced and scheduled — your channels stay active without you chasing anyone." },
      { h: "Design & copy included", p: "Visuals and words from one team, consistent with your brand every single post." },
      { h: "Scales with you", p: "Start with one channel, add more as you grow — plans flex month to month." },
    ],
    cta: "Get your first month's content plan.",
  },
  rehabitt: {
    tagline: "Physiotherapy kids actually finish.",
    features: [
      { h: "Camera-based tracking", p: "On-device motion tracking turns exercises into games — no wearables, just a camera." },
      { h: "Gamified sessions", p: "Progress, rewards and play mechanics that keep children engaged through their full program." },
      { h: "Clinician dashboard", p: "Therapists assign programs and monitor adherence and progress remotely." },
      { h: "Built with clinicians", p: "Developed with clinical expertise at the core — engagement in service of outcomes." },
    ],
    cta: "Request a Rehabitt walkthrough for your clinic.",
  },
  proseek: {
    tagline: "Be found for what you can do.",
    features: [
      { h: "Professional profiles", p: "Sign up free and build a profile showcasing your skills, experience, certifications and portfolio — once." },
      { h: "AI semantic search", p: "Clients describe what they need in natural language; ProSeek's AI matches the right professionals — no keyword games." },
      { h: "Direct connection", p: "Interested clients message you directly. No middleman, no commission, no hidden fees." },
      { h: "Built for both sides", p: "Professionals get discovered; clients skip the directories and find genuinely matched skills in one search." },
    ],
    cta: "Create your free ProSeek profile — or find the professional you need.",
  },
  "odysense-ai": {
    tagline: "Unleash the power of AI.",
    features: [
      { h: "Generate anything", p: "Text, images, code, chat and voiceovers — powered by leading AI models, ready in seconds." },
      { h: "Custom templates & chatbots", p: "Dozens of ready templates for blogs, ads, product copy and more — or build your own prompts and chatbots." },
      { h: "Multi-lingual", p: "Understands and generates content across languages — including the Arabic/English mix the GCC actually works in." },
      { h: "One dashboard", p: "Create, edit, manage and export all your AI content from a single, clean workspace." },
    ],
    cta: "Start your free trial at ai.odysense.com.",
  },
};

/** Homepage service card carousel (slow auto-scroll) */
export const carouselTiles = [
  { title: "Web Design", img: "/images/card-webdesign.webp", href: "/website-design-company-in-qatar", tags: ["Next.js", "Responsive", "Prototyping", "CMS", "Performance"] },
  { title: "E-commerce", img: "/images/card-ecommerce.webp", href: "/ecommerce-development-company-qatar", tags: ["WooCommerce", "Shopify", "Payments", "Logistics"] },
  { title: "Branding", img: "/images/card-branding.webp", href: "/branding-agency-qatar", tags: ["Logo Design", "Strategy", "Print", "Style Guides", "Visual Identity"] },
  { title: "Content Creation", img: "/images/card-content.webp", href: "/products/social-bakery", tags: ["Copywriting", "Design", "Production", "Blogs & Articles"] },
  { title: "Social Media", img: "/images/card-social.webp", href: "/digital-marketing-agency-qatar", tags: ["Strategy", "Paid Ads", "Analytics", "Scheduling", "Management"] },
  { title: "Marketing", img: "/images/card-marketing.webp", href: "/digital-marketing-agency-qatar/seo-services-qatar", tags: ["SEO", "PPC", "Conversion", "A/B Testing", "Reporting"] },
  { title: "Software & AI", img: "/images/card-software.webp", href: "/software-development-company-qatar", tags: ["Web Apps", "Dashboards", "AI Features", "APIs"] },
  { title: "Videos", img: "/images/card-videos.webp", href: "/digital-marketing-agency-qatar", tags: ["Storyboarding", "Reels & Shorts", "Editing", "Motion Graphics"] },
];

/** Client logo files (public/brands) shown in the hero */
export const clientLogos = [
  { name: "European Union — Delegation of Qatar", file: "/brands/european-union.png" },
  { name: "Eleganza", file: "/brands/eleganza.png" },
  { name: "Eunited", file: "/brands/eunited.png" },
  { name: "FormaSports", file: "/brands/forma.png" },
  { name: "Labasah", file: "/brands/labasah.png" },
  { name: "Mezami", file: "/brands/mezami.png" },
  { name: "Nouga", file: "/brands/nouga.png" },
  { name: "Flow", file: "/brands/flow.png" },
  { name: "Sharqiyat Line", file: "/brands/sharqiyat.png" },
  { name: "Rafea Line", file: "/brands/rafealine.png" },
  { name: "Bodega", file: "/brands/bodega.png" },
  { name: "Right Vision Optical", file: "/brands/rightvision.png" },
  { name: "Fuolo", file: "/brands/fuolo.png" },
  { name: "Solemn", file: "/brands/solemn.png" },
  { name: "Vou", file: "/brands/vou.png" },
];

/** Rich showcase content for flagship product pages (steps with Lottie, screenshots, quotes) */
export const productShowcase: Record<
  string,
  {
    steps: { title: string; text: string; lottie: string }[];
    gallery: { src: string; w: number; h: number; caption: string }[];
    quotes: { text: string; author: string; role: string }[];
  }
> = {
  qflow: {
    steps: [
      {
        title: "Generate QR codes",
        text: "Create your tables and QFlow auto-generates a unique QR code for each one. Print, place, done — every table becomes a self-serve ordering point.",
        lottie: "https://lottie.host/ff0686b3-deee-4e9f-acde-6e6a3f3ec9dd/SbGo29JWyT.json",
      },
      {
        title: "Guests scan & order",
        text: "Customers scan to browse the live menu with photos and allergen info, order from their phone, and track preparation in real time. No app download — it works in any browser.",
        lottie: "https://lottie.host/6de32d1c-5838-4637-8c28-576c8e9939b0/oFNFQpmSDL.json",
      },
      {
        title: "Split & pay instantly",
        text: "Guests split the bill equally, by item, or by custom amounts — then pay securely by card, Apple Pay, Google Pay or cash. Orders flow straight to the kitchen display; you watch it all live.",
        lottie: "https://lottie.host/1e484114-a347-4c72-861e-0ae8b6dcc4ca/JCplekjHdD.json",
      },
    ],
    gallery: [
      { src: "/images/shot-qflow-pos.webp", w: 1200, h: 591, caption: "POS Terminal — cash, card and digital payments in one screen" },
      { src: "/images/shot-qflow-analytics.webp", w: 1200, h: 613, caption: "Analytics — revenue, peak hours and popular items" },
      { src: "/images/shot-qflow-delivery.webp", w: 1100, h: 767, caption: "Delivery integrations — Talabat, Snoonu, Rafeeq and Keeta" },
      { src: "/images/shot-qflow-guest.webp", w: 402, h: 943, caption: "The guest experience — scan, browse, add" },
      { src: "/images/shot-qflow-tables.webp", w: 1200, h: 386, caption: "Tables — QR code per table, live availability" },
      { src: "/images/shot-qflow-pay.webp", w: 409, h: 944, caption: "Bill splitting and payment, right from the phone" },
    ],
    quotes: [
      {
        text: "Before QFlow, managing orders during peak hours was chaotic. Since switching, everything runs smoothly — from the POS terminal to the QR code menu and direct customer payments. Guests simply scan, order and pay instantly.",
        author: "Sarah",
        role: "Restaurant Owner",
      },
      {
        text: "We introduced QFlow to reduce queues and improve order accuracy, and it delivered beyond expectations. Orders go straight to the kitchen display, eliminating miscommunication between front-of-house and the kitchen.",
        author: "Abdullah M.",
        role: "Cafe Owner",
      },
    ],
  },
  wasl: {
    steps: [
      {
        title: "Connect your WhatsApp number",
        text: "Link your Meta Business account via embedded signup or enter your number credentials. Official, Meta-verified connection — verification takes minutes, not weeks.",
        lottie: "https://lottie.host/37c6f68e-b2c2-456a-aae1-fa1e2380ca3c/7RXcvCSDXi.json",
      },
      {
        title: "Create & approve templates",
        text: "Design message templates with variables, buttons and headers, submit them for Meta approval, and manage everything from your WASL dashboard — compliance built into the workflow.",
        lottie: "https://lottie.host/cb53fc78-e1c1-40e5-a4c7-96767b05b6bf/llLyJc2tvd.json",
      },
      {
        title: "Send at scale",
        text: "Use the REST API or the dashboard to send transactional notifications, run campaigns and trigger automated bot replies — every message tracked, every delivery accounted for.",
        lottie: "https://lottie.host/21793b85-b8fa-47b3-a88f-3a17133eea4b/dQKEpvbvgx.json",
      },
    ],
    gallery: [
      { src: "/images/shot-wasl-console.webp", w: 1100, h: 460, caption: "The WASL Console — usage, delivery and quick actions" },
      { src: "/images/shot-wasl-chat.webp", w: 612, h: 486, caption: "Live on WhatsApp — order status, auto-replies, Meta-verified" },
      { src: "/images/shot-wasl-bots.webp", w: 794, h: 433, caption: "Auto-reply bots — keyword rules, priorities, first match wins" },
      { src: "/images/shot-wasl-template.webp", w: 497, h: 852, caption: "Template builder — variables, buttons and approval workflow" },
    ],
    quotes: [
      {
        text: "WASL has completely transformed how we communicate with our customers. Order confirmations, shipping updates and support responses go out instantly — and the automated bots handle common questions 24/7, which has reduced our support workload dramatically.",
        author: "Founder",
        role: "Online Store",
      },
      {
        text: "WASL helped us scale our customer communication without expanding our support team. Appointment confirmations, service updates and reminders now go out automatically, while template management keeps our messaging consistent.",
        author: "Head of Customer Experience",
        role: "Retail Business",
      },
    ],
  },
};
