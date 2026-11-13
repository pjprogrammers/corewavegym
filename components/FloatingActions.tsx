"use client";

import { telHref, whatsappLink } from "@/lib/data";
import { useLang } from "./LanguageProvider";
import { PhoneIcon, WhatsAppIcon } from "./icons";

export function FloatingActions() {
  const { t } = useLang();

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("common.whatsapp")}
        className="grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.72_0.17_150)] text-[oklch(0.15_0.02_160)] shadow-lg transition-transform hover:scale-110"
      >
        <WhatsAppIcon />
      </a>
      <a
        href={telHref}
        aria-label={t("common.callNow")}
        className="grid h-14 w-14 place-items-center rounded-full gradient-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
      >
        <PhoneIcon />
      </a>
    </div>
  );
}
