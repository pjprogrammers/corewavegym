import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { homeMetadata } from "@/lib/metadata";
import { site } from "@/lib/data";

export const metadata: Metadata = homeMetadata;

export default function Page() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={site.images.hero[0]}
        fetchPriority="high"
      />
      <HomePage />
    </>
  );
}
