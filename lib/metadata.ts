import type { Metadata } from "next";
import { i18n, site } from "./data";

type MetaKey =
  | "homeTitle"
  | "homeDesc"
  | "aboutTitle"
  | "aboutDesc"
  | "membershipTitle"
  | "membershipDesc"
  | "classesTitle"
  | "classesDesc"
  | "galleryTitle"
  | "galleryDesc"
  | "contactTitle"
  | "contactDesc"
  | "offersTitle"
  | "offersDesc";

function enMeta(key: MetaKey): string {
  return (i18n.en as Record<string, any>).meta[key] as string;
}

export function pageMetadata(
  titleKey: MetaKey,
  descKey: MetaKey,
  path: string,
  extra?: Metadata,
): Metadata {
  const title = enMeta(titleKey);
  const description = enMeta(descKey);

  return {
    title,
    description,
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.business.name,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...extra,
  };
}

export const homeKeywords = [
  ...site.business.tags,
  ...site.business.areas.map((area) => `gym in ${area}`),
].join(", ");

export const homeMetadata: Metadata = pageMetadata(
  "homeTitle",
  "homeDesc",
  "/",
  {
    keywords: homeKeywords,
    other: {
      "geo.region": "IN-DL",
      "geo.placename": "Bhajanpura, Delhi",
      "geo.position": "28.6994;77.2705",
      ICBM: "28.6994, 77.2705",
    },
  },
);
