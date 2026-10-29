import { GamificationPage, gamificationMeta } from "@/components/pages/gamification";

export const metadata = gamificationMeta("ar");

export default function Page() {
  return <GamificationPage locale="ar" />;
}
