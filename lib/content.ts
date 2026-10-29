/**
 * Localised views of the site data. English comes straight from lib/site.ts; Arabic merges the Arabic
 * text from lib/ar/site.ts over the same records, so prices, URLs, images and dates stay single-sourced.
 */
import {
  site,
  serviceLinks,
  gccLinks,
  products,
  services,
  productDetails,
  productShowcase,
  carouselTiles,
  testimonial,
  paymentGateways,
  gatewayList,
} from "@/lib/site";
import {
  arSite,
  arServiceLinks,
  arGccLinks,
  arCountries,
  arServices,
  arProducts,
  arProductDetails,
  arProductShowcase,
  arCarouselTiles,
  arTestimonial,
} from "@/lib/ar/site";
import { lp, type Locale } from "@/lib/i18n";

const ar = (l: Locale) => l === "ar";

export const getSite = (l: Locale) => (ar(l) ? { ...site, ...arSite } : site);

export const getServiceLinks = (l: Locale) =>
  serviceLinks.map((s) => (ar(l) ? { ...s, ...arServiceLinks[s.href], href: lp(l, s.href) } : s));

export const getGccLinks = (l: Locale) =>
  gccLinks.map((g) => (ar(l) ? { ...g, label: arGccLinks[g.href], href: lp(l, g.href) } : g));

export const getProducts = (l: Locale) =>
  products.map((p) => (ar(l) ? { ...p, ...arProducts[p.slug], slug: lp(l, p.slug) } : p));

export const getServices = (l: Locale) =>
  services.map((s, i) => (ar(l) ? { ...s, ...arServices[i], slug: lp(l, s.slug) } : s));

export const countryName = (country: string, l: Locale) => (ar(l) ? arCountries[country] ?? country : country);

/** "A, B and C" / "A، B و C": the gateways integrated in a country (lib/site.ts paymentGateways) */
export const gatewayListL = (country: string, l: Locale) => {
  if (!ar(l)) return gatewayList(country);
  const names = paymentGateways.find((c) => c.country === country)?.gateways.map((g) => g.name) ?? [];
  return names.length > 1 ? `${names.slice(0, -1).join("، ")} و${names[names.length - 1]}` : names.join("");
};

export const getPaymentGateways = (l: Locale) =>
  paymentGateways.map((c) => ({ ...c, label: countryName(c.country, l) }));

export function getProductDetails(slug: string, l: Locale) {
  const d = productDetails[slug];
  if (!d || !ar(l)) return d;
  const a = arProductDetails[slug];
  return {
    ...d,
    ...a,
    image: d.image && { ...d.image, alt: a.imageAlt ?? d.image.alt },
    related: d.related && a.related && { ...d.related, ...a.related, href: lp(l, d.related.href) },
  };
}

export function getProductShowcase(slug: string, l: Locale) {
  const s = productShowcase[slug];
  if (!s || !ar(l)) return s;
  const a = arProductShowcase[slug] ?? {};
  return {
    ...s,
    steps: s.steps?.map((st, i) => ({ ...st, ...a.steps?.[i] })),
    gallery: s.gallery?.map((g, i) => ({ ...g, caption: a.gallery?.[i] ?? g.caption })),
    quotes: a.quotes ?? s.quotes,
    pricing: a.pricing ?? s.pricing,
    addons: a.addons ?? s.addons,
  };
}

export const getCarouselTiles = (l: Locale) =>
  carouselTiles.map((t) => (ar(l) ? { ...t, ...arCarouselTiles[t.title], href: lp(l, t.href) } : t));

export const getTestimonial = (l: Locale) => (ar(l) ? arTestimonial : testimonial);

/** Links the nav, mobile menu and footer need (passed to those client components as props). */
export function navData(l: Locale) {
  return {
    services: getServiceLinks(l),
    gcc: getGccLinks(l),
    products: getProducts(l).map(({ name, slug, logo, chip }) => ({ name, slug, logo, chip })),
    site: getSite(l),
  };
}

export type NavData = ReturnType<typeof navData>;
