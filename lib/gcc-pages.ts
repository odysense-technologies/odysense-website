/**
 * GCC e-commerce hub pages, rendered by components/guide-page.tsx (Phase 3, 2026-10-10).
 *
 * Rules for this file:
 * - Answer first: every page opens with a short direct answer; H2s are the questions people ask.
 * - Only owner-confirmed facts: gateways come from `paymentGateways` in lib/site.ts, prices are the
 *   published QAR figures (other currencies are approximate conversions at the fixed USD pegs).
 * - Laws, tax and fees are hedged and sourced; Odysense builds stores, it is not a law firm or tax adviser.
 * - No offices outside Qatar: KSA, UAE and the rest of the GCC are served remotely from Doha.
 * - No pictures until the owner supplies them (CLAUDE.md section 4).
 */

import { gatewayList } from "./site";

export type GccSection = {
  h: string; // phrased as the question a buyer asks
  ps?: string[]; // the first paragraph is the direct answer
  list?: string[];
  after?: string[];
  table?: { caption: string; head: string[]; rows: string[][] };
};

export type GccPage = {
  slug: string;
  crumb: string;
  parent?: { label: string; href: string };
  title: string;
  titleAccent: string;
  metaTitle: string; // keep the full <title> (with " | Odysense") at 60 characters or less
  metaDescription: string;
  lede: string;
  updated: string;
  cardTitle: string; // used on the hub, in menus and in "related" links
  cardDesc: string;
  serviceName: string;
  serviceType: string;
  areaServed: string[];
  answer: string[];
  hub?: string[]; // slugs listed as cards (hub page only)
  sections: GccSection[];
  gateways?: string[]; // countries from paymentGateways to show
  faqs: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  related?: string[]; // sibling gcc page slugs
  links?: { label: string; href: string }[];
  relatedService?: string; // href whose blog posts feed "Related reading"
  ctaTitle: string;
  ctaAccent: string;
  ctaBody: string;
};

const GCC = ["Qatar", "Saudi Arabia", "United Arab Emirates", "Kuwait", "Bahrain", "Oman"];

// Approximate conversions of the published QAR prices at the fixed USD pegs
// (QAR 3.64, SAR 3.75, AED 3.6725 per USD), rounded. Quotes are issued in QAR.
const PRICE_NOTE =
  "Quotes are issued in QAR. Other currencies are approximate conversions at the fixed US-dollar pegs and are for guidance only.";

const SRC = {
  mcBusinessPlatform: { label: "Saudi Ministry of Commerce: e-stores register via the Business platform instead of Maroof (March 2023)", url: "https://mc.gov.sa/en/mediacenter/News/Pages/29-03-23-02.aspx" },
  ksaEcomLaw: { label: "Ghazzawi Law Firm: compliance steps for online businesses under the Saudi E-Commerce Law", url: "https://www.ghazzawilawfirm.com/insights/compliance-steps-for-online-businesses/" },
  zatcaEinvoicing: { label: "ZATCA: E-invoicing (Fatoora)", url: "https://zatca.gov.sa/en/E-Invoicing/Pages/default.aspx" },
  samaEpayments: { label: "Arab News, citing SAMA: e-payments were 79% of Saudi retail transactions in 2024", url: "https://www.arabnews.com/node/2597120/business-economy" },
  pdpl: { label: "CMS: Saudi Arabia's personal data protection framework is now enforceable (2024)", url: "https://cms.law/en/are/legal-updates/new-sdaia-rules-and-guidelines-published-as-ksa-s-personal-data-protection-framework-is-now-enforceable" },
  uaeLaw: { label: "UAE Ministry of Economy: Federal Decree-Law No. 14 of 2023 on Trading by Modern Technological Means", url: "https://www.moet.gov.ae/documents/20121/0/Federal+Decree-Law+No.+14+of+2023+on+Trading+by+Modern+Technological+Means.pdf" },
  uaeFta: { label: "UAE Federal Tax Authority", url: "https://tax.gov.ae/en/" },
  gccVat: { label: "Baker McKenzie: GCC VAT framework update (2026)", url: "https://www.bakermckenzie.com/en/insight/publications/2026/06/middle-east-gcc-vat-framework-update" },
  shopifyPricing: { label: "Shopify: plans and pricing", url: "https://www.shopify.com/pricing" },
  woocommerce: { label: "WooCommerce: open-source e-commerce for WordPress", url: "https://woocommerce.com/" },
};

const ecomLinks = [
  { label: "E-commerce in Qatar", href: "/ecommerce-development-company-qatar" },
  { label: "Store Portal", href: "/products/store-portal" },
];

export const gccPages: GccPage[] = [
  /* ------------------------------------------------------------------ hub */
  {
    slug: "ecommerce",
    crumb: "E-commerce",
    title: "E-commerce development",
    titleAccent: "across the GCC.",
    metaTitle: "E-commerce Development in the GCC",
    metaDescription:
      "Online stores for brands in Qatar, Saudi Arabia, the UAE, Kuwait, Bahrain and Oman: WooCommerce, Shopify and custom builds with local gateways, COD and Arabic.",
    lede:
      "We design and build online stores for brands across the Gulf: WooCommerce, Shopify and custom builds with the payment gateways each market trusts, cash on delivery, Arabic and English storefronts, and WhatsApp built in.",
    updated: "2026-10-10",
    cardTitle: "E-commerce across the GCC",
    cardDesc: "How we build and run stores for Qatar, KSA, the UAE and the rest of the Gulf.",
    serviceName: "E-commerce development in the GCC",
    serviceType: "E-commerce website development",
    areaServed: GCC,
    answer: [
      "Odysense is an e-commerce development company based at Qatar Science & Technology Park in Doha. We build online stores on WooCommerce, Shopify or a custom stack for brands selling in Qatar, Saudi Arabia, the UAE, Kuwait, Bahrain and Oman, and we work with clients outside Qatar remotely from Doha.",
      "A launch-ready store typically costs QAR 8,000–10,000, including one year of domain and hosting, and comes with our Store Portal free for the first year. We integrate the local payment gateways for each country, set up cash on delivery, connect any courier that offers an API, and build Arabic and English storefronts.",
    ],
    hub: [
      "ecommerce-development-saudi-arabia",
      "ecommerce-development-uae",
      "ecommerce-development-kuwait-bahrain-oman",
      "woocommerce-development-gcc",
      "shopify-development-gcc",
      "ecommerce-platform-comparison-gcc",
      "ecommerce-website-cost-gcc",
      "web-design-company-saudi-arabia",
    ],
    sections: [
      {
        h: "What does Odysense build for GCC online stores?",
        ps: [
          "The whole store, end to end: the storefront design, the build, payments, shipping, content and the tools you use to run it after launch. One team handles all of it, so there's no hand-off between a designer, a developer and a payments consultant.",
        ],
        list: [
          "Storefront design around your catalogue and brand, mobile-first, in Arabic, English or both.",
          "Development on WooCommerce, Shopify or a custom/headless stack, chosen for your catalogue and team.",
          "Local payment gateways for each country, tested end to end, plus cash on delivery where you want it.",
          "Courier integration with any carrier that offers an API, so labels, tracking and status updates flow automatically.",
          "WhatsApp order confirmations and support through WASL, our official WhatsApp Business API platform.",
          "Store Portal, our WooCommerce operations app, free for the first year with every build.",
        ],
      },
      {
        h: "Do you have offices in Saudi Arabia or the UAE?",
        ps: [
          "No. Odysense is based in Doha, at the Innovation Centre in Qatar Science & Technology Park, and that's where our team works. We serve clients in Saudi Arabia, the UAE, Kuwait, Bahrain and Oman remotely, with video calls, shared project boards and WhatsApp.",
          "In practice the distance matters less than you'd think: Qatar, Saudi Arabia, Kuwait and Bahrain share a time zone (UTC+3), and the UAE and Oman are one hour ahead. We already work with clients across the GCC this way.",
        ],
      },
      {
        h: "How is selling in each GCC country different?",
        ps: [
          "The storefront can look the same everywhere, but payments, tax and regulation differ by country, and the store has to handle them.",
        ],
        table: {
          caption: "Key differences by market (check current rules before launch)",
          head: ["Market", "VAT", "What the store must handle"],
          rows: [
            ["Qatar", "None", "Qatar's 2026 e-commerce licence for online sellers, local gateways, Arabic/English"],
            ["Saudi Arabia", "15%", "mada cards, ZATCA e-invoicing for VAT-registered sellers, e-store registration, Arabic-first content"],
            ["UAE", "5%", "Federal e-commerce law (Decree-Law 14 of 2023), international and local gateways, English-first with Arabic"],
            ["Kuwait", "None", "Local debit payments through Kuwaiti gateways, Arabic/English"],
            ["Bahrain", "10%", "VAT-inclusive pricing, local gateways"],
            ["Oman", "5%", "VAT-inclusive pricing, local gateways"],
          ],
        },
        after: [
          "Selling into several GCC countries from one store is possible: multiple currencies, country-specific shipping rates and gateways that settle in the right currency. We plan that structure with you at the start, because adding it later costs more.",
        ],
      },
      {
        h: "Which platform should a GCC store use?",
        ps: [
          "It depends on your catalogue, your team and how much control you want. WooCommerce gives you full ownership and low running costs, Shopify gives you managed simplicity, Saudi platforms such as Salla and Zid are quick to start in the Kingdom, and a custom build suits unusual requirements or high traffic.",
          "We build on WooCommerce, Shopify and custom stacks, and we migrate stores between platforms, so our recommendation isn't tied to one tool. The platform comparison below goes through the trade-offs honestly.",
        ],
      },
    ],
    gateways: ["Qatar", "Saudi Arabia", "UAE", "Kuwait", "Bahrain", "Oman"],
    faqs: [
      {
        q: "How much does an online store cost with Odysense?",
        a: "A launch-ready store typically costs QAR 8,000–10,000, including one year of domain and one year of hosting; advanced stores cost more. That's roughly SAR 8,200–10,300, AED 8,100–10,100 or USD 2,200–2,750 at the fixed USD pegs. Every project gets a fixed, itemised quote before work starts.",
      },
      {
        q: "Can you build a store for Saudi Arabia or the UAE from Qatar?",
        a: "Yes. We don't have offices outside Qatar, but we build and support stores for clients across the GCC remotely from Doha, and we integrate the gateways each market uses.",
      },
      {
        q: "Do you set up cash on delivery?",
        a: "Yes. We set up cash on delivery alongside online payment, and we can confirm COD orders on WhatsApp before dispatch to cut failed deliveries.",
      },
      {
        q: "Which couriers do you integrate?",
        a: "Any courier that offers an API. We connect it to the store so shipping rates, labels, tracking numbers and status updates flow without manual copying.",
      },
      {
        q: "Can you migrate my existing store?",
        a: "Yes, from any platform to any platform: products, customers and orders, either through the platform's export tools and our own migration scripts or, where the old platform doesn't allow exports, by collecting the data from the storefront. We map old URLs to new ones so you keep your search rankings.",
      },
    ],
    sources: [SRC.gccVat, SRC.zatcaEinvoicing, SRC.uaeLaw],
    links: ecomLinks,
    relatedService: "/ecommerce-development-company-qatar",
    ctaTitle: "Planning a store",
    ctaAccent: "for the Gulf?",
    ctaBody: "Book a free consultation. Tell us where you sell and what you sell, and we'll recommend a platform, the gateways and a fixed quote.",
  },

  /* ------------------------------------------------------------- Saudi */
  {
    slug: "ecommerce-development-saudi-arabia",
    crumb: "Saudi Arabia",
    title: "E-commerce development",
    titleAccent: "for Saudi Arabia.",
    metaTitle: "E-commerce Development in Saudi Arabia",
    metaDescription:
      "Arabic-first online stores for the Saudi market: mada and local gateways, cash on delivery, couriers, ZATCA-aware invoicing and WooCommerce or Shopify, from Doha.",
    lede:
      "Arabic-first online stores for the Saudi market, with mada and the local gateways Saudi shoppers expect, cash on delivery, courier integration and invoicing that fits ZATCA's rules. Built and supported remotely from our studio in Doha.",
    updated: "2026-10-10",
    cardTitle: "E-commerce in Saudi Arabia",
    cardDesc: "mada, local gateways, COD, ZATCA e-invoicing and Arabic-first stores for KSA.",
    serviceName: "E-commerce development for Saudi Arabia",
    serviceType: "E-commerce website development",
    areaServed: ["Saudi Arabia"],
    answer: [
      "A Saudi online store needs an Arabic-first storefront, mada card payments, cash on delivery, reliable courier integration and, for VAT-registered sellers, invoices that meet ZATCA's e-invoicing rules. Odysense builds all of this on WooCommerce, Shopify or a custom stack.",
      `We've integrated ${gatewayList("Saudi Arabia")} on live stores for Saudi Arabia. A launch-ready store typically costs QAR 8,000–10,000 (about SAR 8,200–10,300), including a year of domain and hosting. We don't have a Saudi office; we work with Saudi clients remotely from Doha, in the same time zone.`,
    ],
    sections: [
      {
        h: "What do Saudi shoppers expect from an online store?",
        ps: [
          "Arabic first, mobile first and familiar ways to pay. Most Saudi shoppers browse and buy on their phones, many search in Arabic, and they expect to pay with mada or a card they already use, or in cash when the order arrives.",
          "Electronic payment is now the norm: according to the Saudi Central Bank (SAMA), e-payments made up 79% of retail transactions in the Kingdom in 2024. That makes a fast, trusted checkout the single most important part of the store.",
        ],
        list: [
          "An Arabic storefront designed right to left from the start, not an English site with translated labels.",
          "Prices in SAR shown with VAT included, and delivery costs clear before checkout.",
          "mada, credit cards and the wallets your gateway supports, plus cash on delivery where it makes sense.",
          "Order and delivery updates on WhatsApp, where Saudi customers actually reply.",
        ],
      },
      {
        h: "Which payment gateways work for Saudi stores?",
        ps: [
          "On live stores for Saudi Arabia we've integrated HyperPay, Moyasar, Tap Payments, PayTabs, Amazon Payment Services and Geidea. Each of them offers mada card acceptance alongside Visa and Mastercard; we confirm the exact payment methods for your merchant account during setup.",
          "If you already have a contract with another provider, we can integrate that too. We test every payment path, including refunds and failed payments, before launch.",
        ],
      },
      {
        h: "Should a Saudi store offer cash on delivery?",
        ps: [
          "Often, yes, at least at launch. Cash on delivery lowers the barrier for first-time customers, but it costs more to run: some orders are refused at the door, and cash has to be collected and reconciled.",
          "We set COD up with rules that keep it under control: order-value limits, COD only in cities your courier covers well, and an automatic WhatsApp confirmation before dispatch so unconfirmed orders never leave the warehouse.",
        ],
      },
      {
        h: "Which couriers can the store connect to?",
        ps: [
          "Any courier that offers an API. We connect it to the store so shipping rates are calculated at checkout, labels and tracking numbers are created automatically, and delivery status updates reach the customer without your team copying data between systems.",
        ],
      },
      {
        h: "What does ZATCA e-invoicing mean for an online store?",
        ps: [
          "If your business is VAT-registered in Saudi Arabia, your invoices must meet ZATCA's e-invoicing (Fatoora) requirements. The second phase, which connects invoicing systems to ZATCA's platform, is being rolled out in waves by revenue, and ZATCA notifies each taxpayer of its own deadline.",
          "For the store, that means orders need to flow into an invoicing or ERP system that is integrated with Fatoora, with the right VAT data on every order. We build the store and that connection; your accountant or tax adviser confirms your obligations and deadlines.",
        ],
      },
      {
        h: "What do Saudi e-commerce rules require from the store?",
        ps: [
          "Saudi Arabia's E-Commerce Law applies to online sellers targeting Saudi consumers. In practice the store must clearly show who you are and how to contact you, show full prices including taxes and delivery before purchase, and publish clear policies for returns and refunds. Since 2023, the Ministry of Commerce registers e-stores through the Saudi Business Center's Business platform rather than Maroof.",
          "The Personal Data Protection Law has also been enforceable since September 2024, so the store needs a proper privacy policy and consent for marketing messages. We build the pages, consent flows and checkout to support these requirements; we're not a law firm, so your legal adviser should confirm what applies to your business.",
        ],
      },
      {
        h: "Which platform is best for a Saudi store?",
        ps: [
          "WooCommerce suits brands that want full ownership and flexibility; Shopify suits teams that want managed hosting and a large app ecosystem; Salla and Zid are Saudi platforms that are quick to start with local payments and shipping built in; a custom build suits complex catalogues or high traffic.",
          "We build on WooCommerce, Shopify and custom stacks and migrate stores between any platforms, including from Salla or Zid when a brand outgrows them. Our platform comparison covers the trade-offs in detail.",
        ],
      },
      {
        h: "How do you work with Saudi clients from Doha?",
        ps: [
          "Remotely, and it works well: Qatar and Saudi Arabia share a time zone, so we keep the same working hours. Projects run through video calls, a shared project board and a WhatsApp group with the people who build your store. You see designs and a staging store before anything goes live, and we support the store after launch the same way.",
        ],
      },
    ],
    gateways: ["Saudi Arabia"],
    faqs: [
      {
        q: "How much does an online store for Saudi Arabia cost?",
        a: "A launch-ready store typically costs QAR 8,000–10,000 (about SAR 8,200–10,300 at the fixed USD pegs), including one year of domain and hosting; advanced stores cost more. You get a fixed, itemised quote before we start.",
      },
      {
        q: "Do you support mada payments?",
        a: "Yes. The Saudi gateways we integrate (HyperPay, Moyasar, Tap Payments, PayTabs, Amazon Payment Services and Geidea) all offer mada card acceptance; we confirm the payment methods on your merchant account during setup.",
      },
      {
        q: "Can the store be in Arabic only?",
        a: "Yes. We can build an Arabic-only store or an Arabic and English store, designed right to left from the start with proper Arabic typography.",
      },
      {
        q: "Do you have an office in Saudi Arabia?",
        a: "No. Our team works from Doha, Qatar, and serves Saudi clients remotely, in the same time zone. We meet by video call and stay in touch on WhatsApp.",
      },
      {
        q: "Can you help with ZATCA e-invoicing?",
        a: "We build the store so that orders flow into an invoicing or ERP system connected to ZATCA's Fatoora platform, with the right VAT data. Whether and when e-invoicing applies to you is a question for your accountant or tax adviser.",
      },
      {
        q: "How long does it take to launch?",
        a: "A well-scoped store typically launches in 4–8 weeks. Bilingual content, large catalogues or custom features extend that; you get a timeline with milestones before we start.",
      },
    ],
    sources: [SRC.samaEpayments, SRC.zatcaEinvoicing, SRC.mcBusinessPlatform, SRC.ksaEcomLaw, SRC.pdpl],
    related: ["ecommerce", "web-design-company-saudi-arabia", "ecommerce-platform-comparison-gcc", "ecommerce-website-cost-gcc"],
    links: ecomLinks,
    relatedService: "/ecommerce-development-company-qatar",
    ctaTitle: "Selling in",
    ctaAccent: "Saudi Arabia?",
    ctaBody: "Book a free consultation. We'll recommend the platform, gateways and delivery setup for your Saudi store, with a fixed quote.",
  },

  /* --------------------------------------------------------------- UAE */
  {
    slug: "ecommerce-development-uae",
    crumb: "UAE",
    title: "E-commerce development",
    titleAccent: "for the UAE.",
    metaTitle: "E-commerce Development in the UAE",
    metaDescription:
      "Online stores for the UAE market: Stripe, Checkout.com, Network International, Telr and more, VAT-ready pricing, Arabic and English, WooCommerce or Shopify.",
    lede:
      "Online stores for brands selling in the UAE: international and local payment gateways, VAT-ready pricing, English and Arabic storefronts, and delivery and WhatsApp updates that keep customers informed. Built and supported remotely from Doha.",
    updated: "2026-10-10",
    cardTitle: "E-commerce in the UAE",
    cardDesc: "Gateways, VAT, the federal e-commerce law and bilingual stores for the UAE.",
    serviceName: "E-commerce development for the UAE",
    serviceType: "E-commerce website development",
    areaServed: ["United Arab Emirates"],
    answer: [
      "A UAE online store needs a fast, mobile-first storefront in English and usually Arabic, a gateway that settles in AED, prices shown with 5% VAT, and delivery and returns that are clear before checkout. Odysense builds UAE stores on WooCommerce, Shopify or a custom stack.",
      "On live UAE stores we've integrated Stripe, Checkout.com, Network International, Telr, Amazon Payment Services, PayTabs and Tap Payments. A launch-ready store typically costs QAR 8,000–10,000 (about AED 8,100–10,100). We don't have a UAE office; we work with UAE clients remotely from Doha, one hour behind.",
    ],
    sections: [
      {
        h: "What makes the UAE market different?",
        ps: [
          "The UAE is the GCC's most international market. Customers are used to global brands and fast delivery, so a store competes on experience as much as on price. Most stores lead with English and add Arabic, and many sell to customers across the GCC from a UAE base.",
        ],
        list: [
          "English-first navigation and content, with an Arabic version designed right to left where your audience needs it.",
          "Prices in AED with 5% VAT included, and delivery fees and times clear before checkout.",
          "Card payments, wallets and buy-now-pay-later options where your gateway supports them.",
          "Easy returns and fast answers on WhatsApp, which shoppers expect.",
        ],
      },
      {
        h: "Which payment gateways work for UAE stores?",
        ps: [
          "We've integrated Stripe, Checkout.com, Network International, Telr, Amazon Payment Services, PayTabs and Tap Payments on live stores for the UAE. The right one depends on your business setup, the payment methods you want to offer and the fees you negotiate.",
          "If you already work with another provider, we can integrate that instead. Every payment path is tested before launch, including refunds and failed payments.",
        ],
      },
      {
        h: "What does UAE e-commerce law require?",
        ps: [
          "Federal Decree-Law No. 14 of 2023 governs trading through modern technological means, which covers websites, apps and online marketplaces. Among other things, it requires online traders to hold the necessary licences and approvals and to provide a technically secure environment for customers.",
          "For the store itself, that means clear business and contact details, transparent pricing, published terms, returns and privacy policies, and secure checkout and hosting. We build those pages and the technical security; your trade licence and legal review sit with your business setup provider and legal adviser.",
        ],
      },
      {
        h: "How do VAT and pricing work on a UAE store?",
        ps: [
          "The UAE's standard VAT rate is 5%, and consumer prices are normally shown VAT-inclusive. We set up the store's tax rules, invoices and receipts to match your VAT registration, and make sure shipping and discounts are taxed correctly. Your accountant confirms your registration and filing obligations.",
        ],
      },
      {
        h: "Can a UAE store sell across the GCC?",
        ps: [
          "Yes. A single store can sell to several GCC countries with country-specific shipping rates, currencies and delivery promises. Cross-border delivery adds customs and duty questions, so we plan the structure with you, and your courier, before the build starts.",
        ],
      },
      {
        h: "How do you work with UAE clients from Doha?",
        ps: [
          "Remotely: the UAE is one hour ahead of Qatar, so our working days overlap almost completely. We run projects through video calls, a shared project board and WhatsApp, share designs and a staging store for approval, and support the store after launch in the same way.",
        ],
      },
    ],
    gateways: ["UAE"],
    faqs: [
      {
        q: "How much does an online store for the UAE cost?",
        a: "A launch-ready store typically costs QAR 8,000–10,000 (about AED 8,100–10,100 at the fixed USD pegs), including a year of domain and hosting; advanced stores cost more. Every project starts with a fixed, itemised quote.",
      },
      {
        q: "Do you have an office in Dubai?",
        a: "No. Our team is in Doha, Qatar, and works with UAE clients remotely. The UAE is one hour ahead of Qatar, so our working hours overlap almost fully.",
      },
      {
        q: "Which gateways do you recommend in the UAE?",
        a: "It depends on your business setup and payment methods. We've integrated Stripe, Checkout.com, Network International, Telr, Amazon Payment Services, PayTabs and Tap Payments, and we'll compare options for your case.",
      },
      {
        q: "Can the store show prices with VAT included?",
        a: "Yes. We configure the store's tax settings for the UAE's 5% VAT so prices, invoices and receipts match your registration.",
      },
      {
        q: "Can you build in Arabic and English?",
        a: "Yes. We build bilingual stores with a proper right-to-left Arabic version, or plan an English store so Arabic can be added later without a rebuild.",
      },
    ],
    sources: [SRC.uaeLaw, SRC.uaeFta, SRC.gccVat],
    related: ["ecommerce", "ecommerce-development-saudi-arabia", "ecommerce-development-kuwait-bahrain-oman", "ecommerce-platform-comparison-gcc"],
    links: ecomLinks,
    relatedService: "/ecommerce-development-company-qatar",
    ctaTitle: "Selling in",
    ctaAccent: "the UAE?",
    ctaBody: "Book a free consultation and we'll recommend the platform, gateway and delivery setup for your UAE store, with a fixed quote.",
  },

  /* --------------------------------------------- Kuwait, Bahrain, Oman */
  {
    slug: "ecommerce-development-kuwait-bahrain-oman",
    crumb: "Kuwait, Bahrain & Oman",
    title: "E-commerce for Kuwait,",
    titleAccent: "Bahrain and Oman.",
    metaTitle: "E-commerce in Kuwait, Bahrain & Oman",
    metaDescription:
      "Online stores for Kuwait, Bahrain and Oman: MyFatoorah, Tap, UPayments, EazyPay, Thawani and more, VAT-ready pricing, COD, Arabic and English, from Doha.",
    lede:
      "Online stores for brands selling in Kuwait, Bahrain and Oman, with the local gateways each country uses, the right tax setup, cash on delivery and Arabic and English storefronts. Built and supported remotely from Doha.",
    updated: "2026-10-10",
    cardTitle: "Kuwait, Bahrain & Oman",
    cardDesc: "Local gateways, VAT differences and delivery for the smaller GCC markets.",
    serviceName: "E-commerce development for Kuwait, Bahrain and Oman",
    serviceType: "E-commerce website development",
    areaServed: ["Kuwait", "Bahrain", "Oman"],
    answer: [
      "Kuwait, Bahrain and Oman each need their own payment setup and tax rules: Kuwait has no VAT, Bahrain charges 10% and Oman 5%. Each has local gateways that shoppers trust. Odysense builds stores for all three on WooCommerce, Shopify or a custom stack, and can serve them from one store or separate ones.",
      "A launch-ready store typically costs QAR 8,000–10,000 (about USD 2,200–2,750), including a year of domain and hosting. We don't have offices in these countries; we work with clients there remotely from Doha.",
    ],
    sections: [
      {
        h: "Why one page for three countries?",
        ps: [
          "Because the store we'd build is largely the same; what changes is the payment gateway, the tax setup and delivery. Rather than repeat the same page three times, this page sets out what's different in each market. If you sell in one of them, the relevant section is all you need.",
        ],
      },
      {
        h: "What's different about selling in Kuwait?",
        ps: [
          "Kuwait has no VAT, so pricing is simpler than elsewhere in the Gulf. Shoppers there expect to pay with local debit cards, so the gateway matters: on live stores we've integrated MyFatoorah, Tap Payments, PayTabs, Amazon Payment Services and UPayments, and we confirm the exact payment methods for your merchant account during setup.",
        ],
      },
      {
        h: "What's different about selling in Bahrain?",
        ps: [
          "Bahrain's standard VAT rate is 10%, so prices, invoices and receipts need to show VAT correctly and your store's tax settings must match your registration. On live stores we've integrated MyFatoorah, Tap Payments, PayTabs, Amazon Payment Services and EazyPay.",
        ],
      },
      {
        h: "What's different about selling in Oman?",
        ps: [
          "Oman's standard VAT rate is 5%. On live stores we've integrated MyFatoorah, Tap Payments, PayTabs, Amazon Payment Services and Thawani. As in the rest of the Gulf, shoppers expect an Arabic option, a fast mobile checkout and clear delivery times.",
        ],
      },
      {
        h: "One store for the whole GCC, or one per country?",
        ps: [
          "If your catalogue, prices and brand are the same everywhere, one store with country-specific currencies, shipping and gateways is usually simpler to run. Separate stores make sense when prices, ranges or legal entities differ by country. We help you decide before the build, because changing the structure later is expensive.",
        ],
      },
      {
        h: "Do you set up cash on delivery and couriers?",
        ps: [
          "Yes. We set up cash on delivery with sensible limits and WhatsApp confirmation before dispatch, and we connect any courier that offers an API so rates, labels and tracking flow automatically.",
        ],
      },
    ],
    gateways: ["Kuwait", "Bahrain", "Oman"],
    faqs: [
      {
        q: "How much does an online store for Kuwait, Bahrain or Oman cost?",
        a: "A launch-ready store typically costs QAR 8,000–10,000 (about USD 2,200–2,750), including a year of domain and hosting; advanced stores cost more. You get a fixed, itemised quote first.",
      },
      {
        q: "Does Kuwait have VAT?",
        a: "Not at the time of writing: Kuwait has not implemented VAT, while Bahrain charges 10% and Oman 5%. Rules change, so confirm the current position with your accountant before launch.",
      },
      {
        q: "Can one store serve all three countries?",
        a: "Yes. One store can show different currencies, shipping rates and gateways by country. Separate stores are better when prices, ranges or legal entities differ.",
      },
      {
        q: "Do you have offices in Kuwait, Bahrain or Oman?",
        a: "No. We work from Doha and serve clients across the GCC remotely. Kuwait and Bahrain share Qatar's time zone; Oman is one hour ahead.",
      },
    ],
    sources: [SRC.gccVat],
    related: ["ecommerce", "ecommerce-development-uae", "ecommerce-development-saudi-arabia", "ecommerce-website-cost-gcc"],
    links: ecomLinks,
    relatedService: "/ecommerce-development-company-qatar",
    ctaTitle: "Selling in",
    ctaAccent: "Kuwait, Bahrain or Oman?",
    ctaBody: "Book a free consultation. Tell us which markets you sell in and we'll recommend gateways, store structure and a fixed quote.",
  },

  /* ------------------------------------------------------- WooCommerce */
  {
    slug: "woocommerce-development-gcc",
    crumb: "WooCommerce",
    title: "WooCommerce development",
    titleAccent: "in the GCC.",
    metaTitle: "WooCommerce Development in the GCC",
    metaDescription:
      "WooCommerce stores for Qatar, Saudi Arabia and the GCC: custom design, local gateways, Arabic RTL, fast hosting, and Store Portal to run it from your phone.",
    lede:
      "Custom WooCommerce stores for brands in Qatar, Saudi Arabia and the wider Gulf: designed around your brand, fast on mobile, connected to local gateways and couriers, and easy to run day to day with our Store Portal.",
    updated: "2026-10-10",
    cardTitle: "WooCommerce development",
    cardDesc: "Full ownership, low running costs and Store Portal to run it from your phone.",
    serviceName: "WooCommerce development",
    serviceType: "WooCommerce store development",
    areaServed: GCC,
    answer: [
      "WooCommerce is a strong choice for GCC brands that want to own their store outright, keep running costs low and customise freely. Odysense designs and builds custom WooCommerce stores with local payment gateways, Arabic right-to-left layouts, fast hosting and courier integration.",
      "Every WooCommerce store we build includes Store Portal free for the first year, so your team can manage products, orders, POS and analytics without touching the WordPress admin. A launch-ready store typically costs QAR 8,000–10,000, including a year of domain and hosting.",
    ],
    sections: [
      {
        h: "Why choose WooCommerce for a GCC store?",
        ps: ["WooCommerce is open-source software that runs on WordPress. That gives it a few clear advantages for brands in the Gulf:"],
        list: [
          "You own the store, its data and its hosting; there's no platform that can change your plan or lock you in.",
          "No monthly platform subscription; you pay for hosting, any paid extensions and maintenance.",
          "Freedom to customise the design, checkout and integrations, and a very large extension ecosystem.",
          "Arabic and right-to-left support, since WordPress handles RTL languages.",
          "Strong SEO foundations for content-led stores.",
        ],
        after: [
          "The trade-off is responsibility: WooCommerce needs good hosting, updates and security care. That's where our maintenance and Store Portal come in.",
        ],
      },
      {
        h: "What is Store Portal and why does it matter?",
        ps: [
          "Store Portal is our own operations app for WooCommerce stores. It replaces the WordPress admin for daily work: products, orders, stock, a point of sale for your physical shop, analytics and, as an add-on, AI Virtual Try-On. It's mobile-first, so you can run the store from your phone.",
          "It's free for the first year with every Odysense e-commerce build, then QAR 170 per month, or QAR 150 per month billed yearly. Add-ons such as WhatsApp notifications through WASL are priced separately.",
        ],
      },
      {
        h: "Which payment gateways can WooCommerce use in the GCC?",
        ps: [
          "We've integrated gateways for every GCC country on live stores, including MyFatoorah, Tap Payments, PayTabs and Amazon Payment Services across several markets, plus country-specific ones such as SADAD and QNB in Qatar, HyperPay, Moyasar and Geidea in Saudi Arabia, and Telr and Network International in the UAE. The full list by country is below.",
        ],
      },
      {
        h: "Will a WooCommerce store be fast enough?",
        ps: [
          "Yes, if it's built and hosted properly. Speed problems usually come from heavy themes, too many plugins and cheap hosting. We build lean custom themes, keep plugins to what's needed, optimise images and use good hosting with caching. Rafea Line, a custom WooCommerce store we built for a Doha abaya atelier, saw checkout completion rise 70%.",
        ],
      },
      {
        h: "Can you migrate my store to WooCommerce?",
        ps: [
          "Yes, from any platform, including Shopify, Salla and Zid. We move products, customers and orders using platform exports and our own migration scripts, or by collecting data from the storefront when exports aren't available, and we redirect old URLs so you keep your search rankings.",
        ],
      },
    ],
    gateways: ["Qatar", "Saudi Arabia", "UAE", "Kuwait", "Bahrain", "Oman"],
    faqs: [
      {
        q: "How much does a WooCommerce store cost?",
        a: "A launch-ready WooCommerce store typically costs QAR 8,000–10,000, including one year of domain and hosting and Store Portal free for the first year; advanced stores cost more.",
      },
      {
        q: "Is WooCommerce free?",
        a: "The WooCommerce software is free and open-source. You pay for hosting, the domain, any paid extensions and the design and build.",
      },
      {
        q: "Is WooCommerce secure?",
        a: "Yes, when it's maintained: updates, good hosting, backups and a small set of trusted plugins. We handle these as part of ongoing care, and Store Portal offers automated backups as an add-on.",
      },
      {
        q: "Can I manage the store without WordPress experience?",
        a: "Yes. Store Portal lets your team manage products, orders and stock from a simple mobile-first app instead of the WordPress admin.",
      },
    ],
    sources: [SRC.woocommerce],
    related: ["ecommerce", "shopify-development-gcc", "ecommerce-platform-comparison-gcc", "ecommerce-website-cost-gcc"],
    links: ecomLinks,
    relatedService: "/ecommerce-development-company-qatar",
    ctaTitle: "Thinking about",
    ctaAccent: "WooCommerce?",
    ctaBody: "Book a free consultation and we'll tell you honestly whether WooCommerce fits your store, with a fixed quote if it does.",
  },

  /* ----------------------------------------------------------- Shopify */
  {
    slug: "shopify-development-gcc",
    crumb: "Shopify",
    title: "Shopify development",
    titleAccent: "in the GCC.",
    metaTitle: "Shopify Development in the GCC",
    metaDescription:
      "Shopify stores for brands in Qatar, Saudi Arabia and the GCC: custom themes, local gateways, Arabic, migrations, and an honest view of when Shopify fits.",
    lede:
      "Custom Shopify stores for GCC brands that want managed hosting and a large app ecosystem, plus an honest view of when Shopify is the right platform and when it isn't.",
    updated: "2026-10-10",
    cardTitle: "Shopify development",
    cardDesc: "Managed simplicity, and an honest view of when Shopify fits a GCC store.",
    serviceName: "Shopify development",
    serviceType: "Shopify store development",
    areaServed: GCC,
    answer: [
      "Shopify fits GCC brands that want a managed, hosted store their team can run without technical help, and that are happy to pay a monthly plan and app fees for that convenience. Odysense builds custom Shopify themes, integrates local payment gateways, sets up Arabic and migrates stores to and from Shopify.",
      "It's less suited to stores that need deep checkout customisation, unusual business logic or the lowest running costs; WooCommerce or a custom build often fits those better. A launch-ready store typically costs QAR 8,000–10,000 for the build; Shopify's own plan and app fees are extra.",
    ],
    sections: [
      {
        h: "When is Shopify the right choice?",
        list: [
          "You want hosting, security and updates handled by the platform.",
          "Your team wants a polished admin and a large library of apps.",
          "You sell a fairly standard catalogue with a standard checkout.",
          "You plan to scale quickly and prefer a predictable monthly platform cost.",
        ],
      },
      {
        h: "When is Shopify not the right choice?",
        list: [
          "You need a heavily customised checkout or unusual pricing and ordering rules.",
          "You want to own the platform and avoid monthly plan and app fees adding up.",
          "Your payment provider has no reliable Shopify integration in your country.",
          "Your store depends on content and SEO flexibility that a WordPress-based store handles more freely.",
        ],
        after: ["We build on both, so we'll tell you which fits; it's not a sales pitch for one platform."],
      },
      {
        h: "How do payments work on Shopify in the GCC?",
        ps: [
          "In many GCC countries, stores take payments through a third-party gateway connected to Shopify rather than Shopify's own payment service. Shopify may charge an additional transaction fee when a store uses a third-party gateway, depending on the plan, so it's worth building that into your cost comparison.",
          "Several of the regional gateways we work with offer Shopify integrations. We confirm the current options and fees for your country and merchant account during scoping, then set up and test the full payment flow.",
        ],
      },
      {
        h: "Can a Shopify store be in Arabic?",
        ps: [
          "Yes. Shopify supports multiple languages, and many themes support right-to-left layouts. We design and adjust the theme so the Arabic version reads naturally, with proper typography and mirrored layouts, rather than relying on a translation app alone.",
        ],
      },
      {
        h: "Can you migrate my store to or from Shopify?",
        ps: [
          "Yes. We migrate stores from any platform to any platform, including WooCommerce, Salla and Zid to Shopify and Shopify to WooCommerce. Products, customers and orders move through platform exports and our own scripts, and we redirect old URLs to protect your rankings.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a Shopify store cost with Odysense?",
        a: "The design and build typically costs QAR 8,000–10,000 for a launch-ready store; advanced stores cost more. Shopify's monthly plan, any paid apps and transaction fees are paid to Shopify and the app providers.",
      },
      {
        q: "Is Shopify cheaper than WooCommerce?",
        a: "Not usually over time. Shopify includes hosting in its plan, but plan, app and transaction fees add up; WooCommerce has no platform subscription but needs hosting and maintenance. We compare both for your catalogue before you decide.",
      },
      {
        q: "Can you customise a Shopify theme?",
        a: "Yes. We design and build custom themes, or adapt a premium theme to your brand when the budget is tighter.",
      },
      {
        q: "Will my local payment gateway work with Shopify?",
        a: "Often, but not always. We check the gateway's current Shopify integration and any extra Shopify transaction fee for your plan before recommending it.",
      },
    ],
    sources: [SRC.shopifyPricing],
    related: ["ecommerce", "woocommerce-development-gcc", "ecommerce-platform-comparison-gcc", "ecommerce-website-cost-gcc"],
    links: ecomLinks,
    relatedService: "/ecommerce-development-company-qatar",
    ctaTitle: "Is Shopify",
    ctaAccent: "right for you?",
    ctaBody: "Book a free consultation. We'll compare Shopify with the alternatives for your store and give you a fixed quote.",
  },

  /* -------------------------------------------------------- comparison */
  {
    slug: "ecommerce-platform-comparison-gcc",
    crumb: "Platform comparison",
    title: "WooCommerce vs Shopify vs Salla vs Zid",
    titleAccent: "vs custom.",
    metaTitle: "E-commerce Platforms Compared for the GCC",
    metaDescription:
      "WooCommerce, Shopify, Salla, Zid or a custom build? A fair comparison for GCC stores: ownership, Arabic, payments, running costs, flexibility and migration.",
    lede:
      "A fair comparison of the platforms GCC brands actually choose between, from a team that builds on WooCommerce, Shopify and custom stacks and migrates stores between all of them.",
    updated: "2026-10-10",
    cardTitle: "Platform comparison",
    cardDesc: "WooCommerce, Shopify, Salla, Zid or custom: a fair side-by-side.",
    serviceName: "E-commerce platform consulting",
    serviceType: "E-commerce platform selection and migration",
    areaServed: GCC,
    answer: [
      "There's no single best platform. WooCommerce suits brands that want ownership and low running costs; Shopify suits teams that want managed simplicity; Salla and Zid suit Saudi sellers who want to launch quickly with local payments and shipping built in; a custom build suits complex requirements or high traffic.",
      "Choose based on how much control you need, who will run the store day to day, and your budget over three years rather than at launch. We build on WooCommerce, Shopify and custom stacks, and we migrate stores between any of these platforms.",
    ],
    sections: [
      {
        h: "How do the platforms compare side by side?",
        ps: ["A summary of the trade-offs. Platform plans and features change, so check current details before deciding."],
        table: {
          caption: "E-commerce platforms for GCC stores",
          head: ["", "WooCommerce", "Shopify", "Salla / Zid", "Custom build"],
          rows: [
            ["Best for", "Brands that want ownership and flexibility", "Teams that want a managed, hosted store", "Saudi sellers launching quickly", "Complex catalogues, high traffic, unusual logic"],
            ["Who hosts it", "You (your hosting)", "Shopify", "The platform", "You"],
            ["Monthly platform fee", "None (hosting and extensions)", "Yes, by plan", "Yes, by plan", "None (hosting and maintenance)"],
            ["Design freedom", "Full", "High, within the theme system", "Within the platform's themes", "Full"],
            ["Checkout customisation", "Full", "Limited on most plans", "Limited", "Full"],
            ["Arabic / RTL", "Yes", "Yes, theme-dependent", "Arabic-first", "Yes, built in"],
            ["Local GCC gateways", "Wide choice via plugins", "Via third-party integrations", "Built-in options for KSA", "Any, via API"],
            ["Data ownership and portability", "Full", "Exportable", "Exportable, varies by platform", "Full"],
            ["Odysense builds on it", "Yes", "Yes", "We migrate to and from it", "Yes"],
          ],
        },
      },
      {
        h: "When should you choose WooCommerce?",
        ps: [
          "When you want to own the store and its data, keep running costs predictable, and customise the design and checkout freely. It needs good hosting and maintenance; our Store Portal makes daily management simple for non-technical teams.",
        ],
      },
      {
        h: "When should you choose Shopify?",
        ps: [
          "When you'd rather the platform handle hosting, security and updates, your catalogue and checkout are fairly standard, and you're comfortable with monthly plan and app fees. Check whether your preferred local gateway integrates well and whether an extra transaction fee applies.",
        ],
      },
      {
        h: "When do Salla or Zid make sense?",
        ps: [
          "Salla and Zid are Saudi e-commerce platforms built around the local market, in Arabic, with local payment and shipping options. They're a quick way to start selling in the Kingdom. Brands often move off them when they need a distinctive design, deeper customisation or full ownership of the store, and we migrate stores from Salla and Zid to WooCommerce, Shopify or custom builds.",
        ],
      },
      {
        h: "When is a custom or headless build worth it?",
        ps: [
          "When the business logic doesn't fit a standard platform: complex pricing, B2B ordering, marketplaces, deep ERP integration, or very high traffic where performance is critical. It costs more upfront, so it should be justified by revenue or a genuine requirement, not by preference.",
        ],
      },
      {
        h: "How do you avoid choosing the wrong platform?",
        list: [
          "Write down who will run the store every day and what they need to do.",
          "Cost the platform over three years: plan, apps, transaction fees, hosting and maintenance.",
          "Check that your gateway, courier and accounting system integrate properly.",
          "Make sure you can export your products, customers and orders if you ever move.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which e-commerce platform is best in Saudi Arabia?",
        a: "It depends on your needs. Salla and Zid are quick to start with local payments built in; WooCommerce and Shopify offer more design freedom and flexibility; custom builds suit complex requirements. We compare them for your catalogue and team.",
      },
      {
        q: "Can I move from Salla or Zid to WooCommerce or Shopify later?",
        a: "Yes. We migrate stores from any platform to any platform, moving products, customers and orders and redirecting old URLs so you keep your search rankings.",
      },
      {
        q: "Do you build stores on Salla or Zid?",
        a: "Our builds are on WooCommerce, Shopify and custom stacks. We migrate stores to and from Salla and Zid, and we're happy to advise if staying on them is the right call for you.",
      },
      {
        q: "Is a custom store worth the extra cost?",
        a: "Only when the business needs it: complex logic, integrations or traffic that standard platforms handle badly. For most stores, WooCommerce or Shopify is the better value.",
      },
    ],
    sources: [SRC.shopifyPricing, SRC.woocommerce],
    related: ["ecommerce", "woocommerce-development-gcc", "shopify-development-gcc", "ecommerce-website-cost-gcc"],
    links: ecomLinks,
    relatedService: "/ecommerce-development-company-qatar",
    ctaTitle: "Not sure which",
    ctaAccent: "platform fits?",
    ctaBody: "Book a free consultation. We'll compare the options for your catalogue, team and budget, and recommend one, honestly.",
  },

  /* -------------------------------------------------------------- cost */
  {
    slug: "ecommerce-website-cost-gcc",
    crumb: "Cost",
    title: "E-commerce website cost",
    titleAccent: "in the GCC.",
    metaTitle: "E-commerce Website Cost in the GCC (2026)",
    metaDescription:
      "What an online store costs in Qatar, Saudi Arabia and the GCC in 2026: QAR 8,000–10,000 with a year of domain and hosting, ongoing costs, and what drives the price.",
    lede:
      "What an online store costs with Odysense in 2026, what's included, what drives the price up, and the ongoing costs to budget for, in QAR with approximate conversions for the rest of the Gulf.",
    updated: "2026-10-10",
    cardTitle: "E-commerce cost",
    cardDesc: "Prices, what's included and the running costs to budget for.",
    serviceName: "E-commerce website development",
    serviceType: "E-commerce website development",
    areaServed: GCC,
    answer: [
      "A launch-ready online store with Odysense typically costs QAR 8,000–10,000, including one year of domain registration and one year of hosting. That's roughly SAR 8,200–10,300, AED 8,100–10,100 or USD 2,200–2,750. Stores with advanced features, large catalogues or custom integrations cost more.",
      "Every build includes Store Portal free for the first year (then QAR 170 per month, or QAR 150 per month billed yearly). Every project gets a fixed, itemised quote before work starts.",
    ],
    sections: [
      {
        h: "What's included in QAR 8,000–10,000?",
        list: [
          "Custom storefront design for desktop and mobile.",
          "Development on WooCommerce or Shopify, chosen for your store.",
          "Payment gateway integration and testing, plus cash on delivery if you want it.",
          "Product, category and policy page setup.",
          "One year of domain registration and one year of hosting.",
          "Store Portal free for the first year.",
          "SEO basics and analytics set up at launch.",
        ],
        after: [PRICE_NOTE],
      },
      {
        h: "What makes a store cost more?",
        list: [
          "Large catalogues, complex product options or bulk data migration.",
          "Bilingual Arabic and English content across the whole store.",
          "Custom features: subscriptions, B2B pricing, bookings, marketplaces.",
          "Integrations with ERP, accounting, inventory or courier systems.",
          "Selling into several countries with different currencies, taxes and shipping.",
          "A fully custom or headless build instead of WooCommerce or Shopify.",
        ],
      },
      {
        h: "What ongoing costs should you budget for?",
        list: [
          "Payment gateway fees: a percentage and/or fixed fee per transaction, set by your gateway provider.",
          "Domain and hosting from year two.",
          "Store Portal from year two: QAR 170 per month, or QAR 150 per month billed yearly, plus any add-ons you choose.",
          "Platform fees if you choose Shopify: a monthly plan, paid apps and possibly a transaction fee for third-party gateways.",
          "Maintenance, updates and improvements as the store grows.",
          "Marketing: SEO, ads and content to bring customers to the store.",
        ],
      },
      {
        h: "How do prices compare across the GCC?",
        ps: ["We quote in QAR for every market. As a guide, at the fixed US-dollar pegs:"],
        table: {
          caption: "Approximate conversions of our published starting price",
          head: ["Currency", "Launch-ready store (approx.)"],
          rows: [
            ["Qatari riyal (QAR)", "8,000–10,000"],
            ["Saudi riyal (SAR)", "8,200–10,300"],
            ["UAE dirham (AED)", "8,100–10,100"],
            ["US dollar (USD)", "2,200–2,750"],
          ],
        },
        after: [
          "Your own VAT position depends on where your business is registered: Saudi Arabia charges 15% VAT, the UAE and Oman 5%, Bahrain 10%, while Qatar and Kuwait have none. Ask your accountant how it applies to services you buy from abroad.",
        ],
      },
      {
        h: "How do you keep the price fixed?",
        ps: [
          "We agree the scope before work starts: the pages, features, integrations and content we'll deliver. The quote is fixed against that scope. If you want something new mid-project, we quote it separately before doing it, so there are no surprises on the final invoice.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does an online store cost in Saudi Arabia?",
        a: "With Odysense, a launch-ready store typically costs QAR 8,000–10,000, about SAR 8,200–10,300, including a year of domain and hosting; advanced stores cost more.",
      },
      {
        q: "Are there monthly fees after launch?",
        a: "From year two: domain and hosting renewal and Store Portal (QAR 170 per month, or QAR 150 billed yearly). Gateway transaction fees apply from day one, and Shopify stores pay Shopify's plan and app fees.",
      },
      {
        q: "Do you charge for a consultation or quote?",
        a: "No. The consultation is free, and so is the fixed quote that follows it.",
      },
    ],
    sources: [SRC.gccVat, SRC.shopifyPricing],
    related: ["ecommerce", "ecommerce-platform-comparison-gcc", "woocommerce-development-gcc", "shopify-development-gcc"],
    links: [{ label: "E-commerce cost in Qatar (guide)", href: "/blog/how-much-does-ecommerce-website-cost-qatar" }, ...ecomLinks],
    relatedService: "/ecommerce-development-company-qatar",
    ctaTitle: "Get a fixed quote",
    ctaAccent: "for your store.",
    ctaBody: "Book a free consultation. Tell us what you sell and where, and we'll send a fixed, itemised quote.",
  },

  /* -------------------------------------------- Web design, Saudi Arabia */
  {
    slug: "web-design-company-saudi-arabia",
    crumb: "Web design, Saudi Arabia",
    parent: { label: "Services", href: "/services" },
    title: "Website design",
    titleAccent: "for Saudi Arabia.",
    metaTitle: "Web Design Company for Saudi Arabia",
    metaDescription:
      "Arabic-first website design for Saudi businesses: right-to-left layouts, mobile-first, bilingual SEO and fast builds, from QAR 2,000 (about SAR 2,060), from Doha.",
    lede:
      "Arabic-first websites for Saudi businesses: designed right to left, fast on mobile, bilingual where you need it and built to rank in Arabic and English search. Designed and built by our team in Doha, working with Saudi clients remotely.",
    updated: "2026-10-10",
    cardTitle: "Web design in Saudi Arabia",
    cardDesc: "Arabic-first, right-to-left websites for Saudi businesses.",
    serviceName: "Website design for Saudi Arabia",
    serviceType: "Website design",
    areaServed: ["Saudi Arabia"],
    answer: [
      "Odysense designs and builds Arabic-first websites for Saudi businesses: right-to-left layouts, proper Arabic typography, mobile-first design and SEO for Arabic and English search. A professionally designed business website typically costs QAR 2,000–10,000 (about SAR 2,060–10,300).",
      "We're based in Doha, Qatar, and work with Saudi clients remotely, in the same time zone. Every project starts with a free consultation and a fixed, itemised quote.",
    ],
    sections: [
      {
        h: "What makes a good website for the Saudi market?",
        ps: ["Arabic first, not Arabic later. Many Saudi customers search, read and decide in Arabic, so the Arabic site has to be designed as carefully as the English one, often more so."],
        list: [
          "Layouts designed right to left from the first wireframe, with mirrored navigation, forms and icons.",
          "Arabic typography chosen for readability on phones, paired with a matching English typeface.",
          "Content written for Saudi readers, not translated word for word.",
          "Fast loading on mobile networks, with clear calls to action: WhatsApp, call or form.",
          "A privacy policy and consent for marketing that reflect Saudi Arabia's Personal Data Protection Law.",
        ],
      },
      {
        h: "How do you make a bilingual site rank in Arabic and English?",
        ps: [
          "Each language gets its own URLs, titles and descriptions, written for how people actually search in that language, with hreflang tags so search engines show the right version to the right person. Arabic keyword research matters: people often search differently in Arabic than the English equivalent suggests.",
        ],
      },
      {
        h: "What does website design cost for a Saudi business?",
        ps: [
          "A professionally designed business website typically costs QAR 2,000–10,000, about SAR 2,060–10,300 at the fixed US-dollar pegs. Where it lands depends on the number of pages, how much custom design and functionality it needs, and whether it's bilingual from launch. Online stores are priced separately, from QAR 8,000.",
          PRICE_NOTE,
        ],
      },
      {
        h: "How does a project run with a team in Doha?",
        ps: [
          "Remotely, in your working hours: Qatar and Saudi Arabia share a time zone. We start with a video call about your customers and goals, plan the structure and content, then share designs for desktop and mobile for your review. Our own developers build what you approve, and we test on real phones before launch. Throughout, you have a shared project board and a WhatsApp group with the team.",
        ],
      },
      {
        h: "Do you also build online stores for Saudi Arabia?",
        ps: [
          "Yes. E-commerce is our main specialty: Arabic-first stores with mada and local gateways, cash on delivery, courier integration and ZATCA-aware invoicing. See our Saudi e-commerce page for details.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a website cost in Saudi Arabia with Odysense?",
        a: "A professionally designed business website typically costs QAR 2,000–10,000 (about SAR 2,060–10,300); online stores start from QAR 8,000. You get a fixed, itemised quote first.",
      },
      {
        q: "Can you design the website in Arabic only?",
        a: "Yes. We design Arabic-only or Arabic and English websites, right to left from the start, with Arabic typography chosen for readability.",
      },
      {
        q: "Do you have an office in Riyadh or Jeddah?",
        a: "No. Our team works from Doha, Qatar, and serves Saudi clients remotely, in the same time zone, by video call and WhatsApp.",
      },
      {
        q: "How long does a website take?",
        a: "Most business websites launch in 3–6 weeks: discovery and design first, then build, content and testing. Bilingual content can add time; you'll get a timeline before we start.",
      },
      {
        q: "Will I be able to update the website myself?",
        a: "Yes. We set up a simple content admin for the pages you change often, in Arabic and English, while keeping the design consistent.",
      },
    ],
    sources: [SRC.pdpl],
    related: ["ecommerce-development-saudi-arabia", "ecommerce", "ecommerce-website-cost-gcc"],
    links: [
      { label: "Website design in Qatar", href: "/website-design-company-in-qatar" },
      { label: "Bilingual website guide", href: "/blog/bilingual-arabic-english-website-guide" },
    ],
    relatedService: "/website-design-company-in-qatar",
    ctaTitle: "A website your Saudi customers",
    ctaAccent: "trust on sight.",
    ctaBody: "Book a free consultation. Tell us about your business and we'll send a fixed quote for an Arabic-first website.",
  },
];

export function getGccPage(slug: string) {
  return gccPages.find((p) => p.slug === slug);
}
