import { HomePage, homeMeta } from "@/components/pages/home";

export const metadata = homeMeta("en");

export default function Home() {
  return <HomePage locale="en" />;
}
