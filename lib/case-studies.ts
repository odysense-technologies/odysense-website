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
    siteUrl: "https://officialeleganza.com",
    siteLabel: "officialeleganza.com",
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
    siteUrl: "https://rafealine.com",
    siteLabel: "rafealine.com",
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
  {
    slug: "qseat",
    name: "QSeat",
    industry: "Restaurant booking app",
    year: "2026", // TODO: confirm launch year with the owner
    services: ["iOS app", "Venue portal", "Admin platform", "UX/UI design"],
    siteUrl: "https://apps.apple.com/app/id6804232100",
    siteLabel: "QSeat on the App Store",
    teaser:
      "A restaurant booking platform where diners pick their table on a live floor plan — an iOS app, a venue portal and an admin, built as one system.",
    intro:
      "QSeat lets diners book a restaurant table the way they'd choose a seat at the cinema: see the venue's floor plan, pick the table they want, and check in with a QR code when they arrive. Odysense built the whole platform — the iOS app diners use, the portal venues run their floor from, and the admin that manages the service behind both.",
    challenge: [
      "A table booking is only as good as the information behind it. If the app shows a table as free when the restaurant has just seated someone there, the guest arrives to a problem and the venue loses trust in the system. QSeat needed the diner's view and the venue's view to stay in step in real time, and it needed to work for restaurants that run very different floors — while staying simple enough for a diner to book in a few taps, in Arabic or English.",
    ],
    approach: [
      "We designed QSeat as three connected surfaces rather than a standalone app. Diners use the iOS app to browse venues, see the live floor plan and choose a table. Venues use a web portal to manage that same floor plan as the evening unfolds, so availability reflects what's really happening in the room. On arrival, guests check in with a QR code, which closes the loop between the booking and the table.",
      "Behind both sits an admin platform with feature toggles, so capabilities can be switched on or off without shipping a new version of the app. The whole experience is bilingual, with Arabic and English designed in from the start rather than added later.",
    ],
    built: [
      "iOS app for diners, published on the App Store",
      "Live floor-plan table selection and booking",
      "Venue portal with real-time floor-plan table management",
      "QR check-in on arrival",
      "Admin platform with feature toggles",
      "Bilingual Arabic/English experience",
    ],
    results: [
      { value: "Live", label: "on the App Store" },
      { value: "3", label: "connected surfaces — diner app, venue portal and admin" },
      { value: "AR/EN", label: "bilingual from launch" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
