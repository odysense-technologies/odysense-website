import { WorkHub, workMeta } from "@/components/pages/work";

export const metadata = workMeta("en");

export default function Page() {
  return <WorkHub locale="en" />;
}
