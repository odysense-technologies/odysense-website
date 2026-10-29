import { HomePage, homeMeta } from "@/components/pages/home";

export const metadata = homeMeta("ar");

export default function Page() {
  return <HomePage locale="ar" />;
}
