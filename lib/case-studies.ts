/**
 * Case studies — structured content rendered by app/work/[slug]/page.tsx.
 * Anything marked `todo: true` renders with a visible TODO outline on staging;
 * replace with real figures/quotes before launch.
 */

export type CaseStudy = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  services: string[];
  siteUrl?: string;
  siteLabel?: string;
  teaser: string; // used on the Work hub card
  intro: string;
  challenge: string[];
  approach: string[];
  built: string[];
  results: { value: string; label: string; todo?: boolean }[];
  quote?: { text: string; author: string; role: string; todo?: boolean };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "eleganza",
    name: "Eleganza",
    industry: "Fashion e-commerce", // TODO: confirm exact industry positioning with client
    year: "2025",
    services: ["E-commerce", "Web design", "Payments", "SEO foundation"],
    siteUrl: "https://official-eleganza.com",
    siteLabel: "official-eleganza.com",
    teaser:
      "A premium online store built to match the brand it carries — fast, elegant and ready to sell across the Gulf.",
    intro:
      "Eleganza came to Odysense to take a premium retail brand properly online: a store that looks as considered as the products, loads fast on mobile where GCC customers actually shop, and takes payment methods local buyers trust.",
    challenge: [
      "Premium brands lose the sale the moment the website feels cheaper than the product. The store had to carry the brand's standard on every screen — while staying fast enough for mobile-first shoppers and handling the practical realities of selling in Qatar: local payment preferences, delivery logistics and WhatsApp-native customers.",
    ],
    approach: [
      "We designed the storefront around the collections rather than a template grid — generous imagery, restrained typography and a checkout stripped to essentials. On the engineering side we prioritized mobile performance and a payment flow using gateways GCC customers already trust, and connected order notifications to WhatsApp so the brand meets its customers on the channel they actually answer.",
    ],
    built: [
      "Custom storefront design and build",
      "Product catalogue architecture for seasonal collections",
      "Local payment gateway integration",
      "WhatsApp order notifications",
      "On-page SEO foundation and analytics",
    ],
    results: [
      { value: "+60%", label: "conversion rate after launch" },
      { value: "2.1s", label: "mobile load time" },
      { value: "100%", label: "of orders completed on mobile" },
    ],
    quote: {
      text:
        "They designed an elegant, user-friendly online store that perfectly showcases our collections. Our customers love the seamless shopping experience — and our sales have grown steadily since launch.",
      author: "Fatima",
      role: "E-commerce Business Owner",
    },
  },
  {
    slug: "rafea-line",
    name: "Rafea Line",
    industry: "Abaya atelier — Doha",
    year: "2026",
    services: ["E-commerce", "WooCommerce", "Custom theme", "Checkout optimization"],
    siteUrl: "https://refealine.com",
    siteLabel: "refealine.com",
    teaser:
      "A custom WooCommerce build for a Doha abaya atelier — craftsmanship online, from catalogue to checkout.",
    intro:
      "Rafea Line is a Doha atelier whose abayas are made with a level of care most e-commerce templates flatten. Odysense built the brand a custom WooCommerce theme where the online experience reflects the craft — and the checkout gets out of the way.",
    challenge: [
      "Off-the-shelf WooCommerce themes fight premium fashion brands: cluttered layouts, template conflicts, and checkout flows with too many steps between desire and purchase. Rafea Line needed a store that presents each piece the way the atelier does — and converts.",
    ],
    approach: [
      "We built a custom WooCommerce theme from the ground up rather than bending a marketplace template — resolving the template conflicts that plague off-the-shelf builds and refining the checkout flow release after release. The theme ships with a one-click demo importer and full page-builder compatibility, so the brand's team can manage content without touching code.",
    ],
    built: [
      "Custom WooCommerce theme, built from scratch",
      "Streamlined checkout flow",
      "One-click demo importer for rapid page setup",
      "Page-builder-compatible content management",
      "Iterative releases — v1.3+ of continuous refinement",
    ],
    results: [
      { value: "+70%", label: "checkout completion rate" },
      { value: "10", label: "days from kickoff to launch" },
      { value: "4.9★", label: "customer experience rating" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
