"use client";

import Link from "next/link";
import { site } from "@/lib/data";
import { useLang } from "./LanguageProvider";

const FOOTER_LINKS = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/membership", key: "membership" },
  { to: "/classes", key: "classes" },
  { to: "/offers", key: "offers" },
  { to: "/gallery", key: "gallery" },
  { to: "/contact", key: "contact" },
];

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img
              src={site.images.logo}
              alt={`${site.business.name} logo`}
              width={52}
              height={52}
              loading="lazy"
              className="h-13 w-13 object-contain"
            />
            <span className="font-display text-2xl tracking-wider">
              {site.business.name}
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {t("footer.about")}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
            <a
              href={site.business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Instagram
            </a>
            <a
              href={site.business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Facebook
            </a>
            <a
              href={site.business.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Google Maps
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg">{t("footer.pages")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {FOOTER_LINKS.map((item) => (
              <li key={item.to}>
                <Link href={item.to} className="hover:text-foreground">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg">{t("footer.contact")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`tel:+91${site.business.phone}`} className="hover:text-foreground">
                {site.business.phone}
              </a>
            </li>
            <li>
              <a
                href={`tel:+91${site.business.phoneAlt}`}
                className="hover:text-foreground"
              >
                {site.business.phoneAlt}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.business.email}`}
                className="break-all hover:text-foreground"
              >
                {site.business.email}
              </a>
            </li>
            <li>
              <a
                href={site.business.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                {site.business.address}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {year} {site.business.name}, {site.business.locality}, {site.business.city}.{" "}
        {t("footer.rights")}
      </div>
    </footer>
  );
}
