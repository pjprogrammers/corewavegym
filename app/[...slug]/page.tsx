import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { homeMetadata } from "@/lib/metadata";

export const metadata: Metadata = homeMetadata;

/**
 * The live hosting setup serves the home document for unknown paths, so the
 * clone keeps that exact fallback instead of showing a framework 404.
 */
export default function CatchAllPage() {
  return <HomePage />;
}
