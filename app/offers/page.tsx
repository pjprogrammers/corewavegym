import { OffersPage } from "@/components/pages/OffersPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("offersTitle", "offersDesc", "/offers");

export default function Page() {
  return <OffersPage />;
}
