import { BlogHub, blogMeta } from "@/components/pages/blog";

export const metadata = blogMeta("en");

export default function Page() {
  return <BlogHub locale="en" />;
}
