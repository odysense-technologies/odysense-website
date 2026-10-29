import { EcommercePage, ecommerceMeta } from "@/components/pages/ecommerce";

export const metadata = ecommerceMeta("en");

export default function Page() {
  return <EcommercePage locale="en" />;
}
