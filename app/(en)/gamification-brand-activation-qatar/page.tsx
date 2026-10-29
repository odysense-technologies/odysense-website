import { GamificationPage, gamificationMeta } from "@/components/pages/gamification";

export const metadata = gamificationMeta("en");

export default function Page() {
  return <GamificationPage locale="en" />;
}
