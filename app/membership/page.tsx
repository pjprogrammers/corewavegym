import { MembershipPage } from "@/components/pages/MembershipPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "membershipTitle",
  "membershipDesc",
  "/membership",
);

export default function Page() {
  return <MembershipPage />;
}
