"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { lp, ui, type Locale } from "@/lib/i18n";
import type { NavData } from "@/lib/content";

/**
 * Link to this page in the other language. The target comes from the page's own hreflang alternate
 * (set by seoMeta), so the switcher and the SEO tags can never disagree; without one it goes to that
 * language's homepage.
 */
function LangSwitch({ locale, className, onClick }: { locale: Locale; className?: string; onClick?: () => void }) {
  const t = ui(locale).nav;
  const fallback = locale === "en" ? "/ar/" : "/";
  const [href, setHref] = useState(fallback);
  const path = usePathname();
  useEffect(() => {
    const read = () => {
      const alt = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${t.switchLang}"]`);
      setHref(alt ? new URL(alt.href).pathname : fallback);
    };
    read();
    const id = setTimeout(read, 300); // the head updates just after a client-side navigation
    return () => clearTimeout(id);
  }, [path, fallback, t.switchLang]);
  return (
    <a className={className} href={href} hrefLang={t.switchLang} lang={t.switchLang} title={t.switchTitle} onClick={onClick}>
      {t.switchLabel}
    </a>
  );
}

type Panel = "products" | "services" | null;

export function Nav({ locale = "en", data }: { locale?: Locale; data: NavData }) {
  const t = ui(locale).nav;
  const L = (href: string) => lp(locale, href);
  const { services: serviceItems, gcc: gccLinks, products } = data;
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPanel = (p: Panel) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPanel(p);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPanel(null), 120);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav className="nav" onMouseLeave={scheduleClose}>
      <div className="nav-pill">
        <Link className="nav-logo" href={L("/")} onMouseEnter={scheduleClose}>
          <Image className="nav-icon" src="/logos/odysense-icon.png" alt="" width={44} height={44} priority />
          Odysense
        </Link>
        <div className="nav-links">
          <button
            className={`nav-drop ${panel === "services" ? "on" : ""}`}
            onMouseEnter={() => openPanel("services")}
            onClick={() => setPanel(panel === "services" ? null : "services")}
            aria-expanded={panel === "services"}
          >
            {t.services} <span aria-hidden="true">▾</span>
          </button>
          <button
            className={`nav-drop ${panel === "products" ? "on" : ""}`}
            onMouseEnter={() => openPanel("products")}
            onClick={() => setPanel(panel === "products" ? null : "products")}
            aria-expanded={panel === "products"}
          >
            {t.products} <span aria-hidden="true">▾</span>
          </button>
          <Link href={L("/work")} onMouseEnter={scheduleClose}>
            {t.work}
          </Link>
          <Link href={L("/blog")} onMouseEnter={scheduleClose}>
            {t.blog}
          </Link>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <LangSwitch locale={locale} className="nav-lang" />
          <Link className="nav-cta" href={L("/contact")} onMouseEnter={scheduleClose}>
            {t.cta}
          </Link>
          <button
            className="burger"
            onClick={() => setMobileOpen(true)}
            aria-label={t.openMenu}
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <div className="mobile-menu-head">
            <span className="nav-logo">
              <Image className="nav-icon" src="/logos/odysense-icon.png" alt="" width={44} height={44} />
              Odysense
            </span>
            <button className="popup-close" onClick={() => setMobileOpen(false)} aria-label={t.closeMenu}>✕</button>
          </div>
          <div className="mobile-menu-body">
            <span className="mono">{t.services}</span>
            {serviceItems.map((sv) => (
              <Link href={sv.href} key={sv.href} onClick={() => setMobileOpen(false)}>{sv.label}</Link>
            ))}
            <span className="mono" style={{ marginTop: 22 }}>{t.gcc}</span>
            {gccLinks.map((g) => (
              <Link href={g.href} key={g.href} onClick={() => setMobileOpen(false)}>{g.label}</Link>
            ))}
            <span className="mono" style={{ marginTop: 22 }}>{t.products}</span>
            {products.map((p) => (
              <Link href={p.slug} key={p.slug} onClick={() => setMobileOpen(false)}>{p.name}</Link>
            ))}
            <span className="mono" style={{ marginTop: 22 }}>{t.company}</span>
            <Link href={L("/work")} onClick={() => setMobileOpen(false)}>{t.work}</Link>
            <Link href={L("/blog")} onClick={() => setMobileOpen(false)}>{t.blog}</Link>
            <Link href={L("/about")} onClick={() => setMobileOpen(false)}>{t.about}</Link>
            <LangSwitch locale={locale} onClick={() => setMobileOpen(false)} />
            <Link className="btn btn-primary" style={{ marginTop: 26, justifyContent: "center" }} href={L("/contact")} onClick={() => setMobileOpen(false)}>
              {t.cta} {ui(locale).arrow}
            </Link>
          </div>
        </div>
      )}

      {/* Mega menus stay in the server HTML (hidden until opened) so crawlers that don't run JS still see the links. */}
      <div className="mega" hidden={panel !== "products"} onMouseEnter={() => openPanel("products")}>
        <div className="mega-grid">
          <div className="mega-items">
            {products.map((p) => (
              <Link className="mega-item" href={p.slug} key={p.slug} onClick={() => setPanel(null)}>
                <span className="mega-ico">
                  <Image src={p.logo!} alt="" width={56} height={56} />
                </span>
                <span>
                  <b>{p.name}</b>
                  <small>{p.chip}</small>
                </span>
              </Link>
            ))}
          </div>
          <Link className="mega-feature" href={L("/products/wasl")} onClick={() => setPanel(null)}>
            <Image src="/images/shot-wasl-chat.webp" alt={t.waslAlt} width={612} height={576} />
            <b>
              {t.waslFeature} <span className="serif">{t.waslAccent}</span>
            </b>
            <small>{t.waslSmall}</small>
          </Link>
        </div>
      </div>

      <div className="mega" hidden={panel !== "services"} onMouseEnter={() => openPanel("services")}>
        <div className="mega-grid">
          <div className="mega-items">
            {serviceItems.map((s) => (
              <Link className="mega-item" href={s.href} key={s.href} onClick={() => setPanel(null)}>
                <span>
                  <b>{s.label}</b>
                  <small>{s.desc}</small>
                </span>
              </Link>
            ))}
          </div>
          <Link className="mega-feature" href={L("/ecommerce-development-company-qatar")} onClick={() => setPanel(null)}>
            <Image src="/images/ecom-packages.webp" alt={t.ecomAlt} width={1200} height={673} />
            <b>
              {t.ecomFeature} <span className="serif">{t.ecomAccent}</span>
            </b>
            <small>{t.ecomSmall}</small>
          </Link>
        </div>
        <div className="mega-sub">
          <span className="mono">{t.gcc}</span>
          <div>
            {gccLinks.map((g) => (
              <Link href={g.href} key={g.href} onClick={() => setPanel(null)}>
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
