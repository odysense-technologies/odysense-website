import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep trailing slashes to match the old WordPress URL format exactly
  // (preserves parity with currently-indexed URLs)
  trailingSlash: true,
  // 301 redirects from legacy WordPress URLs
  // (extend from the full old-sitemap crawl before launch)
  async redirects() {
    return [
      { source: "/about-us/", destination: "/about/", permanent: true },
      { source: "/portfolio/", destination: "/work/", permanent: true },
      { source: "/services/ecommerce-services-qatar/", destination: "/ecommerce-development-company-qatar/", permanent: true },
      { source: "/services/whatsapp-business-api-integration-qatar/", destination: "/whatsapp-business-api-qatar/", permanent: true },
      { source: "/mobile-app-development-company-qatar/android-app-development-company-qatar/", destination: "/mobile-app-development-company-qatar/", permanent: true },
      { source: "/mobile-app-development-company-qatar/ios-app-development-company-in-qatar/", destination: "/mobile-app-development-company-qatar/", permanent: true },
      { source: "/products/qflow-restaurant-management-system/", destination: "/products/qflow/", permanent: true },
      { source: "/products/wasl-whatsapp-cloud-messaging-api/", destination: "/products/wasl/", permanent: true },
    ];
  },
};

export default nextConfig;
