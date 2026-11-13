import { ClassesPage } from "@/components/pages/ClassesPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("classesTitle", "classesDesc", "/classes");

export default function Page() {
  return <ClassesPage />;
}
