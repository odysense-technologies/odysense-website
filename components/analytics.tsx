import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

/**
 * Combined analytics: GA4 + Vercel Web Analytics
 * 
 * GA4 via gtag - Activates only when NEXT_PUBLIC_GA_ID is set
 * (Vercel → Project → Settings → Environment Variables).
 * Use the Measurement ID (G-XXXXXXXXXX) from GA4 Admin → Data Streams,
 * NOT the numeric property ID.
 * 
 * Vercel Analytics - Automatically tracks page views and web vitals.
 * Enable in Vercel Dashboard → Project → Analytics tab.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID ?? "G-XXE190R73Z";
  return (
    <>
      {/* Vercel Web Analytics */}
      <VercelAnalytics />
      
      {/* Google Analytics 4 */}
      {id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
          </Script>
        </>
      )}
    </>
  );
}
