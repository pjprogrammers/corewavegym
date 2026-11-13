import { ContactPage } from "@/components/pages/ContactPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("contactTitle", "contactDesc", "/contact");

export default function Page() {
  return <ContactPage />;
}
