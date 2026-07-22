import Script from "next/script";

/**
 * GA4 via gtag. Activates only when NEXT_PUBLIC_GA_ID is set
 * (Vercel → Project → Settings → Environment Variables).
 * Use the Measurement ID (G-XXXXXXXXXX) from GA4 Admin → Data Streams,
 * NOT the numeric property ID.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
