import siteData from "./site.json";
import dictionaryData from "./i18n.json";

export type Language = "en" | "hi" | "hg";

export const LANGS: Language[] = ["en", "hi", "hg"];

export const LANG_LABELS: Record<Language, string> = {
  en: "EN",
  hi: "हिं",
  hg: "HG",
};

export const site = siteData;

type Dict = Record<string, unknown>;

export const i18n = dictionaryData as Record<Language, Dict>;

function lookup(source: unknown, path: string): unknown {
  let current = source;
  for (const part of path.split(".")) {
    if (typeof current !== "object" || current === null) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/** Raw lookup with English fallback, mirroring the original `tx` helper. */
export function txFor(lang: Language, path: string): any {
  const value = lookup(i18n[lang], path);
  return value === undefined ? lookup(i18n.en, path) : value;
}

/** String translation with `{placeholder}` replacement, mirroring `t`. */
export function tFor(
  lang: Language,
  path: string,
  vars?: Record<string, string>,
): string {
  const value = txFor(lang, path);
  let text = typeof value === "string" ? value : path;
  if (vars) {
    for (const [key, replacement] of Object.entries(vars)) {
      text = text.replaceAll(`{${key}}`, replacement);
    }
  }
  return text;
}

export function formatINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function whatsappLink(
  message = "Hi Core Wave Gym, I want to know about membership.",
): string {
  return `https://wa.me/${site.business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telHref = `tel:+91${site.business.phone}`;

export function isOfferLive(now = Date.now()): boolean {
  if (!site.offer.enabled) return false;
  if (!site.offer.endsAt) return true;
  const endsAt = new Date(site.offer.endsAt).getTime();
  return Number.isNaN(endsAt) ? true : endsAt > now;
}
