import { BlogHub, blogMeta } from "@/components/pages/blog";

export const metadata = blogMeta("ar");

export default function Page() {
  return <BlogHub locale="ar" />;
}
