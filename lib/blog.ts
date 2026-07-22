/**
 * Blog articles — structured content rendered by app/blog/[slug]/page.tsx.
 * Each post targets a real search query and links to its parent service page.
 */

export type PostSection = { h?: string; ps?: string[]; list?: string[] };
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  category: string;
  minutes: number;
  relatedService: { label: string; href: string };
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "how-much-does-a-website-cost-in-qatar",
    title: "How much does a website cost in Qatar? (2026 guide)",
    description:
      "Real price ranges for business websites in Qatar in 2026 — what drives the cost up or down, ongoing costs, and how to avoid overpaying.",
    date: "2026-07-20",
    category: "Web design",
    minutes: 6,
    relatedService: { label: "Website design in Qatar", href: "/website-design-company-in-qatar" },
    sections: [
      {
        ps: [
          "The short answer: a professionally designed business website in Qatar typically costs QAR 2,000–10,000 in 2026. Simple sites sit at the lower end, custom-designed sites with more pages and features at the upper end, and e-commerce or web applications are quoted separately because their scope is fundamentally different.",
          "The long answer is more useful, because two quotes for \"a website\" can differ by five times — and both can be fair. Here's what actually moves the number.",
        ],
      },
      {
        h: "The price bands, honestly",
        list: [
          "QAR 2,000–4,000 — a clean starter site: a few pages, professional design on a proven foundation, mobile-ready, basic SEO setup. Right for new businesses that need credibility online fast.",
          "QAR 4,000–10,000 — a custom business site: bespoke design around your brand, more pages and sections, custom features (booking, catalogues, multilingual readiness), deeper SEO and performance work.",
          "Above that — e-commerce stores, web applications, portals and bilingual builds are scoped on their own terms. If a proposal lumps a full online store into a generic \"website\" price, be suspicious in either direction.",
        ],
      },
      {
        h: "What drives the cost up (or down)",
        ps: [
          "Five factors explain most of the difference between quotes: the number of unique page designs (ten templated pages cost less than five custom-designed ones), functionality (forms are cheap; booking engines and member areas are not), content (who writes the words and supplies the photography?), languages (a proper Arabic/English site is close to designing certain parts twice — right-to-left layout is not a checkbox), and performance standards (a site engineered to load fast and rank well takes more skill than one that merely looks finished).",
        ],
      },
      {
        h: "The ongoing costs nobody mentions",
        ps: [
          "A website has running costs: domain renewal (roughly QAR 50–150/year), hosting (from free-tier modern hosting to QAR 500+/year for managed plans), and maintenance. Ask every agency what happens after launch and what it costs — a cheap build with expensive dependency on its builder is not cheap.",
        ],
      },
      {
        h: "How to compare quotes without getting burned",
        list: [
          "Ask what's itemized: pages, features, content, revisions, SEO setup. A fixed, itemized quote protects both sides.",
          "Ask to see live sites they built — then open them on your phone and count the seconds.",
          "Ask who owns everything at the end: domain, hosting access, source files. The answer should be \"you, fully.\"",
          "Beware quotes dramatically below market: the cost usually reappears as templates, slow load times or invoices for every small change.",
        ],
      },
      {
        ps: [
          "At Odysense we quote fixed and itemized before any project starts — if you'd like a number for your specific site, tell us what you need and you'll have a quote usually within two business days.",
        ],
      },
    ],
  },
  {
    slug: "payment-gateways-qatar-ksa-compared",
    title: "Payment gateways in Qatar & KSA: how to choose in 2026",
    description:
      "Tap, MyFatoorah, HyperPay, PayTabs and more — how to choose the right payment gateway for an online store selling in Qatar and Saudi Arabia.",
    date: "2026-07-18",
    category: "E-commerce",
    minutes: 7,
    relatedService: { label: "E-commerce development in Qatar", href: "/ecommerce-development-company-qatar" },
    sections: [
      {
        ps: [
          "Choosing a payment gateway is one of the highest-stakes decisions in a GCC e-commerce build — it decides which cards your customers can use, how fast you receive your money, and how many buyers abandon at the final step. Here's how we advise clients to think about it.",
        ],
      },
      {
        h: "The main players in Qatar and KSA",
        list: [
          "Tap Payments — strong GCC coverage across Qatar, KSA and the wider Gulf; broad payment-method support including local cards and Apple Pay; developer-friendly integrations with major platforms.",
          "MyFatoorah — popular across the Gulf with good local-market support, invoicing features and multi-country settlement; a frequent choice for SMEs.",
          "HyperPay — established regional processor with strong KSA presence; commonly used by larger merchants selling into Saudi Arabia.",
          "PayTabs — regional player with solid platform plugins and multi-currency support.",
          "International options (Stripe, PayPal) — availability and settlement in Qatar/KSA is limited or indirect; typically a complement for international buyers rather than the local backbone.",
        ],
      },
      {
        h: "What actually matters when you choose",
        ps: [
          "Fees are the first thing everyone compares and often the least decisive. The questions that matter more in practice:",
        ],
        list: [
          "Local payment methods — does it support the cards and wallets your customers hold, including debit cards and Apple Pay? Every missing method is abandoned carts.",
          "Settlement — how many days until money reaches your account, in which currency, into which country's bank? Selling into KSA from Qatar (or vice versa) makes this the deciding factor.",
          "Platform fit — a first-class WooCommerce or Shopify plugin saves real development cost versus a raw API integration.",
          "Onboarding requirements — trade license, bank account and approval timelines differ by gateway and by country. Start this paperwork early; it's the most common launch delay we see.",
          "Checkout experience — hosted payment pages are easier; embedded checkouts convert better. Test both on a phone.",
        ],
      },
      {
        h: "Our honest default advice",
        ps: [
          "For most Qatar-based stores we shortlist Tap and MyFatoorah first and compare against your specific requirements; merchants with a serious KSA focus should weigh HyperPay seriously. Exact fees and terms change and are negotiable at volume — get current quotes from two gateways and compare the full picture, not just the headline percentage.",
          "If you'd rather not manage any of this: gateway selection, onboarding paperwork and full technical integration are part of every Odysense e-commerce build.",
        ],
      },
    ],
  },
  {
    slug: "whatsapp-business-api-qatar-guide",
    title: "WhatsApp Business API in Qatar: setup, pricing and use cases",
    description:
      "What the WhatsApp Business API is, how it differs from the free app, what it costs, and how Qatar businesses use it for sales, support and notifications.",
    date: "2026-07-15",
    category: "WhatsApp",
    minutes: 6,
    relatedService: { label: "WhatsApp Business API in Qatar", href: "/whatsapp-business-api-qatar" },
    sections: [
      {
        ps: [
          "In the Gulf, WhatsApp isn't a channel — it's the channel. Customers who ignore email and never answer unknown calls reply to WhatsApp in minutes. The Business API is how companies use that channel properly: multiple team members, automation, and integration with the systems that run the business.",
        ],
      },
      {
        h: "App vs API — the difference in one minute",
        ps: [
          "The free WhatsApp Business app suits one person on one phone: a small trader replying manually. The Business API is infrastructure: your number lives in the cloud, several agents work one shared inbox, messages can be triggered automatically by your store or booking system, and you can send approved broadcast campaigns to customers who opted in. Verified sender status comes with it — the checkmark customers trust.",
        ],
      },
      {
        h: "What it costs",
        ps: [
          "Two components: Meta's usage fees (charged per conversation/message, varying by category — marketing messages cost more than service replies; utility notifications sit between) and a platform to actually use the API, since the raw API has no interface. Platforms like our own WASL provide the inbox, AI auto-replies, broadcast tools and integrations on a monthly plan. For most SMEs, total cost lands well below one employee-hour per day — while responding faster than any employee could.",
        ],
      },
      {
        h: "The use cases that pay for themselves",
        list: [
          "Order notifications — confirmations, delivery updates and payment links sent automatically from your store. Fewer \"where is my order?\" calls from day one.",
          "AI-assisted support — instant answers to the questions that make up most volume (hours, location, prices, availability), with clean handoff to a human when it matters.",
          "Sales re-engagement — abandoned cart nudges and compliant promotional broadcasts to opted-in customers, with response rates email can't approach in this region.",
          "Bookings and reminders — appointment confirmations and reminders that actually get read, cutting no-shows.",
        ],
      },
      {
        h: "How to get started (and what to avoid)",
        ps: [
          "Setup involves Meta Business verification, connecting a phone number, and getting message templates approved — typically days, not months, when done correctly. One warning: unofficial \"bulk WhatsApp sender\" tools sold around the region operate outside the official API and routinely get numbers banned, taking your customer conversations with them. The official API done properly is not expensive; a banned business number is.",
          "Odysense handles the entire setup on WASL, our WhatsApp AI platform — verification, templates, integrations and team onboarding. Ask us for a demo on your own number.",
        ],
      },
    ],
  },
  {
    slug: "website-redesign-without-losing-seo",
    title: "How to redesign your website without losing your Google rankings",
    description:
      "The migration playbook: how to relaunch a website without traffic collapse — URL mapping, 301 redirects, performance and the launch-day checklist.",
    date: "2026-07-12",
    category: "SEO",
    minutes: 7,
    relatedService: { label: "SEO services in Qatar", href: "/digital-marketing-agency-qatar/seo-services-qatar" },
    sections: [
      {
        ps: [
          "The horror story is common: a business launches a beautiful new website and its Google traffic falls off a cliff. The cause is almost never the redesign itself — it's the migration being treated as an afterthought. Here's the playbook we use, including on our own site.",
        ],
      },
      {
        h: "Rule one: every old URL must have a destiny",
        ps: [
          "Google ranks URLs, not websites. When a page that ranked disappears, its rankings don't transfer anywhere by magic — they evaporate. Before launch, crawl your existing site (the XML sitemap plus a crawler to catch strays) and give every indexed URL exactly one of two futures: it keeps its address on the new site, or it 301-redirects to its closest equivalent. Redirecting everything to the homepage doesn't count — Google treats mass homepage redirects roughly like deletions.",
        ],
      },
      {
        h: "Keep the URLs that work",
        ps: [
          "If existing pages target keywords sensibly (say, /website-design-company-in-qatar/), keep those exact addresses even if every pixel on the page changes. A rebuilt page at the same URL inherits its history; a better page at a new URL starts from less. Change URLs only when the old structure is genuinely broken — and then redirect precisely, page to page.",
        ],
      },
      {
        h: "The new site must be technically better, not just prettier",
        list: [
          "Speed — Core Web Vitals are a ranking input. If the redesign is slower than the old site, you've paid to rank worse.",
          "Crawlability — clean HTML, one <h1> per page, working internal links, an accurate new XML sitemap.",
          "Metadata parity — carry over (or improve) titles and descriptions; don't let a developer's placeholder text ship.",
          "Structured data — rebuild schema markup (Organization, FAQ, breadcrumbs); it rarely survives migrations by accident.",
        ],
      },
      {
        h: "Launch-day checklist",
        list: [
          "301 redirect map live and spot-tested on the top pages from Search Console's performance report.",
          "New sitemap.xml submitted in Google Search Console; old sitemap removed.",
          "Analytics and conversion tracking verified with a real test enquiry.",
          "Crawl the live site for broken links and accidental noindex tags (the classic: staging settings shipped to production).",
          "Watch Search Console coverage and performance weekly for the first month — small drops during reindexing are normal; a sustained slide means a missed redirect.",
        ],
      },
      {
        ps: [
          "Done right, a migration doesn't just protect rankings — the technical upgrade usually improves them within a quarter. This playbook is exactly how we're migrating odysense.com itself; if your redesign is approaching, we're happy to review your migration plan before you flip the switch.",
        ],
      },
    ],
  },
  {
    slug: "shopify-vs-woocommerce-vs-custom-gcc",
    title: "Shopify vs WooCommerce vs custom build: what GCC retailers should choose",
    description:
      "An honest comparison of Shopify, WooCommerce and custom e-commerce builds for retailers in Qatar, KSA and the GCC — costs, control, and when each wins.",
    date: "2026-07-22",
    category: "E-commerce",
    minutes: 7,
    relatedService: { label: "E-commerce development in Qatar", href: "/ecommerce-development-company-qatar" },
    sections: [
      {
        ps: [
          "Every e-commerce project starts with the same fork in the road, and most advice about it is secretly a sales pitch — agencies recommend whatever they build. We build all three, so here is the comparison we give clients in the room.",
        ],
      },
      {
        h: "Shopify — pay for peace of mind",
        ps: [
          "Shopify is managed simplicity: hosting, security, updates and checkout are Shopify's problem, not yours. You pay monthly (plus transaction economics), accept the platform's boundaries, and in exchange your team runs a store instead of maintaining software. It shines for teams that want to move fast, sell across borders, and never think about servers.",
        ],
        list: [
          "Strongest for: fast launches, lean teams, cross-GCC selling, brands that value uptime over customization.",
          "Watch for: monthly costs that grow with apps, less freedom in checkout and data, and local payment gateways needing the right integration path.",
        ],
      },
      {
        h: "WooCommerce — own everything",
        ps: [
          "WooCommerce turns WordPress into a store you fully own: no platform fees, any payment gateway, unlimited customization, and your data on your hosting. The trade: you (or your agency) are now responsible for hosting quality, updates and security — a well-built WooCommerce store is excellent; a neglected one becomes slow and fragile.",
        ],
        list: [
          "Strongest for: brands wanting full ownership and low running costs, content-heavy stores, unusual catalogue or checkout requirements on a budget.",
          "Watch for: quality varies enormously with who builds it — theme and hosting choices decide whether it flies or crawls.",
        ],
      },
      {
        h: "Custom build — when the store is the business",
        ps: [
          "A custom build (modern frameworks, headless architecture) buys you exactly the experience you design — the fastest possible storefront, any integration, any business logic. It costs the most and demands a real engineering partner, which is why it only makes sense when e-commerce is core to the business, traffic is significant, or requirements genuinely do not fit the platforms.",
        ],
        list: [
          "Strongest for: high-traffic brands, unusual business models, performance as a competitive weapon.",
          "Watch for: paying custom prices for problems Shopify or WooCommerce already solved.",
        ],
      },
      {
        h: "The honest decision shortcut",
        ps: [
          "Choosing between them comes down to three questions. Who maintains it? No technical team leans Shopify; an agency partner opens up WooCommerce; engineering ambition justifies custom. What is genuinely unique about your selling? Nothing unusual leans Shopify; some leans WooCommerce; everything leans custom. What is the total cost over three years — not the build quote? Shopify's subscriptions, WooCommerce's maintenance and custom's development all price differently over time, and the cheapest year one is rarely the cheapest year three.",
          "If you want the recommendation applied to your actual catalogue, market and team, this comparison is the first conversation of every Odysense e-commerce project — bring us your requirements and we will make the case for the right one, including when it is not the most expensive one.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
