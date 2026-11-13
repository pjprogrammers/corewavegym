import { AboutPage } from "@/components/pages/AboutPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("aboutTitle", "aboutDesc", "/about");

export default function Page() {
  return <AboutPage />;
}
