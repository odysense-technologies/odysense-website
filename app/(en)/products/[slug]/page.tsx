import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage, productMeta, productParams } from "@/components/pages/products";
import { productDetails } from "@/lib/site";

export function generateStaticParams() {
  return productParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return productMeta(slug, "en");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!productDetails[slug]) notFound();
  return <ProductPage slug={slug} locale="en" />;
}
