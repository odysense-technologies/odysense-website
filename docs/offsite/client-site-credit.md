# "Website by Odysense" credit for client sites

A small, honest credit on the websites Odysense builds. It links the client's site to the Odysense service
page that matches the project, which gives odysense.com relevant backlinks, referral visits and a
consistent brand signal.

## Rules (they protect both sites)

1. **Ask the client first.** The credit goes on their site, so it needs their agreement. Most clients
   accept a small footer line.
2. **The link text is the brand, "Odysense".** The words around it say what was built. Google's spam
   policies name "keyword-rich" links and "widely distributed links in the footers or templates of
   various sites" as link schemes.
   - Do: "Website by **Odysense**".
   - Don't: "**best web design company in Qatar**".
3. **One link, visible, in the footer.** Never hidden, never in white-on-white text, never several links
   in one site.
4. **Link to the matching service page** (table below), not always the homepage. That spreads the
   signal across the pages that need to rank.
5. **No tracking parameters** (`?utm_…`). They create duplicate URLs; GA4 already shows the referral.
6. **Real projects only.** Every site carrying the credit should be one Odysense actually built, and
   ideally one with a case study on odysense.com.

Expect modest gains. Google discounts template credits, so their value comes from relevance
(a real Qatar store linking to the e-commerce page), from referral visits and from brand mentions.
They work best alongside directory listings, Google Business Profile reviews and press.

## Which page to link

| Project | English site link | Arabic site link |
|---|---|---|
| Online store | `https://odysense.com/ecommerce-development-company-qatar/` | `https://odysense.com/ar/ecommerce-development-company-qatar/` |
| Store outside Qatar (KSA, UAE…) | `https://odysense.com/ecommerce/` | `https://odysense.com/ar/ecommerce/` |
| Business website | `https://odysense.com/website-design-company-in-qatar/` | `https://odysense.com/ar/website-design-company-in-qatar/` |
| Web app / portal | `https://odysense.com/software-development-company-qatar/` | `https://odysense.com/ar/software-development-company-qatar/` |
| Mobile app (its website) | `https://odysense.com/mobile-app-development-company-qatar/` | `https://odysense.com/ar/mobile-app-development-company-qatar/` |
| Branding + website | `https://odysense.com/branding-agency-qatar/` | `https://odysense.com/ar/branding-agency-qatar/` |

Suggested wording (only "Odysense" is linked):

| Project | English | Arabic |
|---|---|---|
| Online store | E-commerce development by Odysense | تطوير المتجر: Odysense |
| Business website | Website by Odysense | تصميم وتطوير الموقع: Odysense |
| Web app / portal | Built by Odysense | تطوير: Odysense |

---

## Option 1: plain HTML (any site)

Paste into the footer template, inside the footer, near the copyright line:

```html
<!-- Odysense credit: keep the link text "Odysense"; change the href to the matching service page -->
<p class="odysense-credit" style="margin:0;font-size:12px;opacity:.75">
  E-commerce development by
  <a href="https://odysense.com/ecommerce-development-company-qatar/" style="color:inherit;text-decoration:underline">Odysense</a>
</p>
```

Arabic site:

```html
<p class="odysense-credit" dir="rtl" lang="ar" style="margin:0;font-size:12px;opacity:.75">
  تطوير المتجر:
  <a href="https://odysense.com/ar/ecommerce-development-company-qatar/" style="color:inherit;text-decoration:underline">Odysense</a>
</p>
```

## Option 2: WordPress / WooCommerce

Upload [`odysense-credit.php`](odysense-credit.php) to `wp-content/mu-plugins/` on the client's site
(create the folder if it doesn't exist). Must-use plugins load automatically and can't be switched off by
accident from the Plugins screen.

The plugin gives you two ways to show the credit:
- **Shortcode (recommended):** add `[odysense_credit]` to the footer, in a widget, the theme's footer
  builder or a page-builder footer template. Parameters:
  - `type="store"`, `"website"`, `"app"`, `"software"` or `"branding"`;
  - `lang="ar"` for an Arabic footer.

  Example: `[odysense_credit type="store" lang="ar"]`.
- **Automatic:** if the theme has no editable footer, set `ODYSENSE_CREDIT_AUTO` to `true` at the top of
  the file. The credit is then printed at the end of every page (via `wp_footer`). Check that it sits
  where you expect.

On sites using WPML or Polylang, the plugin switches to Arabic automatically when the page language is
Arabic.

## Option 3: Shopify

1. In **Online Store → Themes → Edit code → Snippets**, add a snippet `odysense-credit.liquid`:

```liquid
{%- comment -%} Odysense credit: only "Odysense" is linked. {%- endcomment -%}
{%- if request.locale.iso_code == 'ar' -%}
  <p class="odysense-credit" dir="rtl" lang="ar" style="margin:0;font-size:12px;opacity:.75">
    تطوير المتجر: <a href="https://odysense.com/ar/ecommerce-development-company-qatar/" style="color:inherit;text-decoration:underline">Odysense</a>
  </p>
{%- else -%}
  <p class="odysense-credit" style="margin:0;font-size:12px;opacity:.75">
    E-commerce development by <a href="https://odysense.com/ecommerce-development-company-qatar/" style="color:inherit;text-decoration:underline">Odysense</a>
  </p>
{%- endif -%}
```

2. In **Sections**, open the footer section (usually `footer.liquid`) and add, near the copyright:

```liquid
{% render 'odysense-credit' %}
```

## Option 4: Next.js / React (custom builds)

```tsx
/** Odysense credit for client sites: only "Odysense" is linked. */
export function OdysenseCredit({ lang = "en", href = "https://odysense.com/ecommerce-development-company-qatar/" }: { lang?: "en" | "ar"; href?: string }) {
  const ar = lang === "ar";
  return (
    <p className="odysense-credit" dir={ar ? "rtl" : undefined} lang={ar ? "ar" : undefined} style={{ margin: 0, fontSize: 12, opacity: 0.75 }}>
      {ar ? "تطوير المتجر: " : "E-commerce development by "}
      <a href={ar ? href.replace("https://odysense.com/", "https://odysense.com/ar/") : href} style={{ color: "inherit", textDecoration: "underline" }}>
        Odysense
      </a>
    </p>
  );
}
```

Render it server-side in the footer, not with client-only JavaScript, so the link is in the HTML that
crawlers read.

---

## Checklist per client site

- [ ] Client agreed to the credit
- [ ] Link text is "Odysense"; href is the matching service page (and the `/ar/` page on Arabic sites)
- [ ] One visible credit in the footer, present in the page source (View Source → search "odysense.com")
- [ ] The client is in `lib/case-studies.ts` or `clientLogos` on odysense.com (ask before adding)
- [ ] Record the site in the list below

## Sites carrying the credit

| Client | URL | Link target | Added |
|---|---|---|---|
| | | | |
