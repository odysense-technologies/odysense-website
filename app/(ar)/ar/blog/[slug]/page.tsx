import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostPage, postMeta, postParams } from "@/components/pages/blog";
import { getPost } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return postParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return postMeta(slug, "ar");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getPost(slug)) notFound();
  return <PostPage slug={slug} locale="ar" />;
}
