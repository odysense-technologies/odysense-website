import { ServicesPage, servicesMeta } from "@/components/pages/services";

export const metadata = servicesMeta("ar");

export default function Page() {
  return <ServicesPage locale="ar" />;
}
