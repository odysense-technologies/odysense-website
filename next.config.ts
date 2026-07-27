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
      { source: "/branding-company-qatar", destination: "/branding-agency-qatar/", permanent: true },
      { source: "/blogs", destination: "/blog/", permanent: true },
      { source: "/blog/discovering-passion-and-purpose-in-work", destination: "/about/", permanent: true },
      { source: "/blog/personal-journeys-to-professional-success", destination: "/about/", permanent: true },
      { source: "/blog/essential-skills-for-career-success", destination: "/about/", permanent: true },
      { source: "/blog/lessons-learned-from-professional-challenges", destination: "/about/", permanent: true },
      { source: "/blog/leadership-development-investing-in-future-leaders", destination: "/about/", permanent: true },
      { source: "/blog/transformational-leadership-skills", destination: "/about/", permanent: true },
      { source: "/blog/navigating-success-in-the-modern-workplace", destination: "/about/", permanent: true },
      { source: "/blog/empowering-individuals-for-professional-growth", destination: "/about/", permanent: true },
      { source: "/blog/fueling-ambition-and-achieving-goals", destination: "/about/", permanent: true },
      { source: "/blog/tech-titans-interviews-with-industry-visionaries", destination: "/about/", permanent: true },
      { source: "/blog/tech-talk-discovering-the-future-of-technology", destination: "/blog/", permanent: true },
      { source: "/blog/finding-the-right-approach", destination: "/about/", permanent: true },
      { source: "/blog/the-role-of-social-media-in-shaping-society", destination: "/digital-marketing-agency-qatar/", permanent: true },
      { source: "/blog/tips-for-thriving-in-a-virtual-world", destination: "/digital-marketing-agency-qatar/", permanent: true },
      { source: "/blog/revolutionizing-the-way-we-use-applications", destination: "/software-development-company-qatar/", permanent: true },
      { source: "/blog/simplifying-life-with-clever-tech-solutions", destination: "/software-development-company-qatar/", permanent: true },
      { source: "/blog/exploring-the-latest-innovations", destination: "/software-development-company-qatar/", permanent: true },
      { source: "/blog/emerging-trends-and-technologies", destination: "/software-development-company-qatar/", permanent: true },
      { source: "/blog/unraveling-the-wonders-of-the-digital-world", destination: "/software-development-company-qatar/", permanent: true },
      { source: "/blog/blockchain-technology-transforming-industries-and-ensuring-security", destination: "/software-development-company-qatar/", permanent: true },
      { source: "/blog/design-inspirations-captivating-visual-stories", destination: "/work/", permanent: true },
      { source: "/blog/shaping-the-world-with-design-thinking", destination: "/website-design-company-in-qatar/", permanent: true },
      { source: "/blog/behind-the-scenes-of-creative-processes", destination: "/work/", permanent: true },
      { source: "/blog/strategies-for-growth-and-profitability", destination: "/services/", permanent: true },
      { source: "/blog/rapid-growth-and-expansion-in-the-startup-world", destination: "/services/", permanent: true },
      { source: "/blog/news-and-updates-from-the-corporate-world", destination: "/blog/", permanent: true },
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
