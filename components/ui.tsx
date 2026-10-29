"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { lp, ui, fmtDateL, type Locale } from "@/lib/i18n";
import type { NavData } from "@/lib/content";

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      // Trigger as soon as any part of the element is 8% inside the viewport. A ratio threshold
      // (e.g. 0.12) can never be met by elements taller than the screen, such as the 36-card blog
      // grid, which then stayed invisible.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Footer ---------- */
export function Footer({ locale = "en", data }: { locale?: Locale; data: NavData }) {
  const t = ui(locale).footer;
  const n = ui(locale).nav;
  const L = (href: string) => lp(locale, href);
  const { site: info, services: serviceLinks, gcc: gccLinks, products } = data;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <b>Odysense</b>
            <p>{t.about}</p>
            <address>
              {info.address}
              <br />
              <a href={`tel:${info.phone.replace(/\s/g, "")}`} dir="ltr">{info.phone}</a>
              <br />
              <a href={`mailto:${info.email}`}>{info.email}</a>
              <br />
              <a href={info.whatsapp} target="_blank" rel="noopener noreferrer">
                {t.whatsapp}
              </a>
            </address>
          </div>
          <nav className="footer-col" aria-label={t.services}>
            <span className="mono">{t.services}</span>
            {serviceLinks.map((s) => (
              <Link href={s.href} key={s.href}>
                {s.label}
              </Link>
            ))}
          </nav>
          <nav className="footer-col" aria-label={t.gccAria}>
            <span className="mono">{t.gcc}</span>
            {gccLinks.map((g) => (
              <Link href={g.href} key={g.href}>
                {g.label}
              </Link>
            ))}
          </nav>
          <nav className="footer-col" aria-label={t.products}>
            <span className="mono">{t.products}</span>
            {products.map((p) => (
              <Link href={p.slug} key={p.slug}>
                {p.name}
              </Link>
            ))}
          </nav>
          <nav className="footer-col" aria-label={t.company}>
            <span className="mono">{t.company}</span>
            <Link href={L("/about")}>{n.about}</Link>
            <Link href={L("/work")}>{n.work}</Link>
            <Link href={L("/blog")}>{n.blog}</Link>
            <Link href={L("/services")}>{t.allServices}</Link>
            <Link href={L("/contact")}>{t.contact}</Link>
          </nav>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {t.made}</span>
          <span>{t.address}</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Section head ---------- */
export function SectionHead({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

/* ---------- CTA box ---------- */
export function CtaBox({
  kicker,
  title,
  body,
  locale = "en",
}: {
  kicker?: string;
  title: ReactNode;
  body: string;
  locale?: Locale;
}) {
  const t = ui(locale).cta;
  return (
    <div className="cta-box">
      <div className="orb orb--cta" aria-hidden="true" />
      <span className="kicker">{kicker ?? t.kicker}</span>
      <h2>{title}</h2>
      <p>{body}</p>
      <Link className="btn btn-invert" href={lp(locale, "/contact")}>
        {t.button}
      </Link>
    </div>
  );
}

/* ---------- Inner page hero ---------- */
export function PageHero({
  crumbs,
  title,
  lede,
  meta,
  children,
  breadcrumbSchema = true,
}: {
  crumbs: { label: string; href?: string }[];
  title: ReactNode;
  lede?: string;
  /** Small byline under the lede, e.g. author and "Last updated" date */
  meta?: ReactNode;
  children?: ReactNode;
  /** Emit BreadcrumbList JSON-LD from the crumbs (blog posts pass false and emit their own) */
  breadcrumbSchema?: boolean;
}) {
  const schema = breadcrumbSchema && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href && { item: `${site.url}${c.href === "/" ? "/" : `${c.href.replace(/\/$/, "")}/`}` }),
    })),
  };
  return (
    <header className="page-hero">
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <div className="orb" aria-hidden="true" />
      <div className="wrap">
        <nav className="crumb" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>}
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {meta && <p className="byline">{meta}</p>}
        {children}
      </div>
    </header>
  );
}

/** "By the Odysense team · Last updated 9 October 2026" — authorship and freshness, visible on the page. */
export function Byline({ updated, extra, locale = "en" }: { updated: string; extra?: string; locale?: Locale }) {
  const t = ui(locale).byline;
  return (
    <>
      {t.by} <Link href={lp(locale, "/about")}>{t.team}</Link> · {t.updated} <time dateTime={updated}>{fmtDateL(updated, locale)}</time>
      {extra && <> · {extra}</>}
    </>
  );
}
