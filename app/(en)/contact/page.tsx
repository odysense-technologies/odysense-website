import { ContactPage, contactMeta } from "@/components/pages/contact";

export const metadata = contactMeta("en");

export default function Page() {
  return <ContactPage locale="en" />;
}
