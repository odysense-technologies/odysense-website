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
  address: "Office 317-04, Innovation Centre, Qatar Science & Technology Park, Doha, Qatar",
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
    chip: "Health Tech",
    chipColor: "sky",
    url: "https://rehabitt.com",
    urlLabel: "rehabitt.com",
    slug: "/products/rehabitt",
    description:
      "Gamified paediatric physiotherapy with camera-based motion tracking — home exercise, turned into play.",
  },
] as const;

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
