import { ContactPage, contactMeta } from "@/components/pages/contact";

export const metadata = contactMeta("ar");

export default function Page() {
  return <ContactPage locale="ar" />;
}
