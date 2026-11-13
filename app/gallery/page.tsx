import { GalleryPage } from "@/components/pages/GalleryPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("galleryTitle", "galleryDesc", "/gallery");

export default function Page() {
  return <GalleryPage />;
}
