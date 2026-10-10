import { site, products, serviceLinks, paymentGateways } from "@/lib/site";
import { servicePages } from "@/lib/service-pages";
import { caseStudies } from "@/lib/case-studies";
import { postsNewestFirst } from "@/lib/blog";

// /llms.txt (https://llmstxt.org): a plain-Markdown summary of the site for AI assistants.
// Generated at build time from the lib/ data files so it never drifts from the pages.
export const dynamic = "force-static";

const url = (path: string) => `${site.url}${path.replace(/\/?$/, "/")}`;

// Keep in sync with the published starting prices (CLAUDE.md section 5).
const prices = [
  "Website design: QAR 2,000–10,000",
  "E-commerce store: QAR 8,000–10,000, including 1 year of domain and 1 year of hosting; advanced stores cost more",
  "Custom software MVP: from QAR 10,000",
  "Mobile apps: QAR 15,000–20,000",
  "Branding: QAR 5,000–10,000",
  "SEO, digital marketing and gamification/brand activations: quoted after a free consultation",
];

function body() {
  const svcDesc = new Map(servicePages.map((s) => [`/${s.slug}`, s.lede]));
  // The two bespoke service pages aren't in servicePages.
  svcDesc.set("/ecommerce-development-company-qatar", "Online stores for brands in Qatar and the GCC: WooCommerce, Shopify and custom builds with local payment gateways, Arabic/English storefronts and Store Portal included free for the first year.");
  svcDesc.set("/gamification-brand-activation-qatar", "Event games, live quizzes, polls and interactive booth activations for exhibitions, launches and malls in Qatar and the GCC, branded, bilingual and built to capture consented leads.");
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} is a digital agency and software company headquartered at the Innovation Centre, Qatar Science & Technology Park (QSTP), Doha. It designs and builds websites, e-commerce stores, custom software and mobile apps for businesses in Qatar, Saudi Arabia and the wider GCC, and runs its own products, including WASL (WhatsApp Business API platform), QFlow (restaurant ordering) and Store Portal (WooCommerce operations).`,
    "",
    "## Key facts",
    "",
    `- Headquarters: ${site.address}. Odysense has no offices outside Qatar; it serves clients in Saudi Arabia, the UAE, Kuwait, Bahrain, Oman and the US remotely from Doha.`,
    `- Contact: ${site.email} · phone and WhatsApp ${site.phone} · ${site.whatsapp}`,
    `- Free technical consultation: ${url("/contact")}`,
    "- Main specialty: e-commerce on WooCommerce, Shopify or a custom build, with Arabic/English storefronts, local payment gateways, cash on delivery, and courier integrations with any carrier that offers an API. Store migrations from any platform to any platform.",
    "- Every Odysense e-commerce build includes Store Portal free for the first year (then QAR 170/month, or QAR 150/month billed yearly).",
    "",
    "### Published starting prices",
    "",
    ...prices.map((p) => `- ${p}`),
    "",
    "### Payment gateways integrated on live stores",
    "",
    ...paymentGateways.map((c) => `- ${c.country}: ${c.gateways.map((g) => g.name).join(", ")}`),
    "- Other gateways can be integrated on request.",
    "",
    "## Services",
    "",
    ...serviceLinks.map((s) => `- [${s.label}](${url(s.href)}): ${svcDesc.get(s.href) ?? s.desc}`),
    "",
    "## Products",
    "",
    ...products.map((p) => `- [${p.name}](${url(p.slug)}): ${p.description}${p.url ? ` Website: ${p.url}` : ""}`),
    "",
    "## Case studies",
    "",
    ...caseStudies.map((c) => {
      const results = c.results.filter((r) => !r.todo).map((r) => `${r.value} ${r.label}`).join("; ");
      return `- [${c.name}](${url(`/work/${c.slug}`)}) (${c.industry}): ${c.teaser}${results ? ` Results: ${results}.` : ""}`;
    }),
    "",
    "## Company",
    "",
    `- [About](${url("/about")}): who we are and how we work`,
    `- [Services overview](${url("/services")})`,
    `- [Products overview](${url("/products")})`,
    `- [Work](${url("/work")}): case studies`,
    `- [Contact](${url("/contact")}): project enquiries and the free consultation`,
    "",
    "## Articles",
    "",
    ...postsNewestFirst().map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.description}`),
    "",
  ];
  return lines.join("\n");
}

export function GET() {
  return new Response(body(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
