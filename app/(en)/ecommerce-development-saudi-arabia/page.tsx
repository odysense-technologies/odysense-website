import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { GuidePageView } from "@/components/guide-page";
import { getGccPage } from "@/lib/gcc-pages";

const page = getGccPage("ecommerce-development-saudi-arabia")!;

export const metadata: Metadata = seoMeta({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/ecommerce-development-saudi-arabia/",
});

export default function Page() {
  return <GuidePageView page={page} />;
}
