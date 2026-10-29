import { AboutPage, aboutMeta } from "@/components/pages/about";

export const metadata = aboutMeta("en");

export default function Page() {
  return <AboutPage locale="en" />;
}
