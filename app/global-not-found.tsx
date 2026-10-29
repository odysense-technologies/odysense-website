import type { Metadata } from "next";
import Link from "next/link";
import { RootShell } from "@/components/root-shell";
import "./globals.css";

/**
 * 404 for URLs that match no route. With two root layouts (English and Arabic) there is no single layout
 * to wrap a not-found page, so this one renders the full document itself, in both languages.
 */
export const metadata: Metadata = {
  title: "404: Page not found | Odysense",
  description: "This page could not be found.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootShell locale="en">
      <main>
        <header className="page-hero">
          <div className="orb" aria-hidden="true" />
          <div className="wrap">
            <h1>
              404 <span className="serif">— page not found.</span>
            </h1>
            <p className="lede">This page doesn&apos;t exist or has moved. Try the homepage, our services or the blog.</p>
            <p className="lede" lang="ar" dir="rtl">
              لم نعثر على هذه الصفحة، فربما نُقلت أو لم تعد موجودة.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/">
                Go to the homepage →
              </Link>
              <Link className="btn btn-secondary" href="/services/">
                Our services
              </Link>
              <Link className="btn btn-secondary" href="/ar/" lang="ar">
                الصفحة الرئيسية بالعربية
              </Link>
            </div>
          </div>
        </header>
      </main>
    </RootShell>
  );
}
