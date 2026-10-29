import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage, caseMeta, caseParams } from "@/components/pages/work";
import { getCaseStudy } from "@/lib/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return caseMeta(slug, "ar");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getCaseStudy(slug)) notFound();
  return <CaseStudyPage slug={slug} locale="ar" />;
}
