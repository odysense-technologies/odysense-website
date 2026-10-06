"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/site";

const serviceItems = [
  { label: "Website Design", desc: "Custom, conversion-focused design", href: "/website-design-company-in-qatar" },
  { label: "Website Development", desc: "Fast, secure modern builds", href: "/website-development-company-qatar" },
  { label: "E-commerce", desc: "WooCommerce, Shopify & custom stores", href: "/ecommerce-development-company-qatar" },
  { label: "Gamification & Activations", desc: "Event games, live quizzes & polls", href: "/gamification-brand-activation-qatar" },
  { label: "Software Development", desc: "Web apps, dashboards & SaaS", href: "/software-development-company-qatar" },
  { label: "Mobile Apps", desc: "iOS & Android, concept to store", href: "/mobile-app-development-company-qatar" },
  { label: "Branding", desc: "Identity, strategy & guidelines", href: "/branding-agency-qatar" },
  { label: "Digital Marketing", desc: "Paid media, content & analytics", href: "/digital-marketing-agency-qatar" },
  { label: "SEO Services", desc: "Get found organically in the GCC", href: "/digital-marketing-agency-qatar/seo-services-qatar" },
  { label: "WhatsApp Business API", desc: "Official setup, powered by WASL", href: "/whatsapp-business-api-qatar" },
];

type Panel = "products" | "services" | null;

export function Nav() {
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
        <Link className="nav-logo" href="/" onMouseEnter={scheduleClose}>
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
            Services <span aria-hidden="true">▾</span>
          </button>
          <button
            className={`nav-drop ${panel === "products" ? "on" : ""}`}
            onMouseEnter={() => openPanel("products")}
            onClick={() => setPanel(panel === "products" ? null : "products")}
            aria-expanded={panel === "products"}
          >
            Products <span aria-hidden="true">▾</span>
          </button>
          <Link href="/work" onMouseEnter={scheduleClose}>
            Work
          </Link>
          <Link href="/blog" onMouseEnter={scheduleClose}>
            Blog
          </Link>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link className="nav-cta" href="/contact" onMouseEnter={scheduleClose}>
            Start a project
          </Link>
          <button
            className="burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
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
            <button className="popup-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
          </div>
          <div className="mobile-menu-body">
            <span className="mono">Services</span>
            {serviceItems.map((sv) => (
              <Link href={sv.href} key={sv.href} onClick={() => setMobileOpen(false)}>{sv.label}</Link>
            ))}
            <span className="mono" style={{ marginTop: 22 }}>Products</span>
            {products.map((p) => (
              <Link href={p.slug} key={p.slug} onClick={() => setMobileOpen(false)}>{p.name}</Link>
            ))}
            <span className="mono" style={{ marginTop: 22 }}>Company</span>
            <Link href="/work" onClick={() => setMobileOpen(false)}>Work</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
            <Link className="btn btn-primary" style={{ marginTop: 26, justifyContent: "center" }} href="/contact" onClick={() => setMobileOpen(false)}>
              Start a project →
            </Link>
          </div>
        </div>
      )}

      {panel === "products" && (
        <div className="mega" onMouseEnter={() => openPanel("products")}>
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
            <Link className="mega-feature" href="/products/wasl" onClick={() => setPanel(null)}>
              <Image src="/images/shot-wasl-chat.webp" alt="WASL live on WhatsApp" width={612} height={576} />
              <b>
                WASL <span className="serif">— WhatsApp at scale.</span>
              </b>
              <small>Official API, AI inbox, broadcasts & notifications</small>
            </Link>
          </div>
        </div>
      )}

      {panel === "services" && (
        <div className="mega" onMouseEnter={() => openPanel("services")}>
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
            <Link className="mega-feature" href="/ecommerce-development-company-qatar" onClick={() => setPanel(null)}>
              <Image src="/images/ecom-packages.webp" alt="E-commerce by Odysense" width={1200} height={673} />
              <b>
                E-commerce <span className="serif">— our specialty.</span>
              </b>
              <small>Stores that carry your brand's standard and convert</small>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
