import { ServicesPage, servicesMeta } from "@/components/pages/services";

export const metadata = servicesMeta("en");

export default function Page() {
  return <ServicesPage locale="en" />;
}
