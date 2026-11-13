"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, telHref } from "@/lib/data";
import { useLang } from "./LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MenuIcon } from "./icons";

const NAV_ITEMS = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/membership", key: "membership" },
  { to: "/classes", key: "classes" },
  { to: "/offers", key: "offers" },
  { to: "/gallery", key: "gallery" },
  { to: "/contact", key: "contact" },
].filter((item) => item.key !== "offers" || site.offer.showInMenu);

const LINK_BASE =
  "relative py-1 text-sm font-semibold text-muted-foreground transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-[3px] after:w-full after:origin-left after:rounded-full after:bg-primary after:transition-transform after:duration-200 after:ease-[var(--ease-out)]";

const BASE_LINK = `${LINK_BASE} after:scale-x-0 hover:after:scale-x-100`;

const ACTIVE_LINK = `${LINK_BASE} after:scale-x-100`;

const MOBILE_LINK =
  "block border-b border-border/60 py-3 text-sm font-semibold text-muted-foreground";

const MOBILE_ACTIVE_LINK = `${MOBILE_LINK} block border-b-[3px] border-primary py-3 text-sm font-semibold text-foreground`;

export function Header() {
  const { t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => {
    const path = (pathname || "/").replace(/\/+$/, "") || "/";
    const target = to.replace(/\/+$/, "") || "/";
    return to === "/" ? path === "/" : path === target || path.startsWith(`${target}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ease-[var(--ease-out)] ${
        scrolled
          ? "border-b border-border bg-background md:bg-background/85 md:backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link
          href="/"
          className={`flex items-center gap-2${isActive("/") ? " active" : ""}`}
          data-status={isActive("/") ? "active" : undefined}
          aria-current={isActive("/") ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          <img
            src={site.images.logo}
            alt={`${site.business.name} logo`}
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          <span className="font-display text-xl leading-none tracking-wider">
            {site.business.shortName}
            <span className="block text-[0.6rem] font-semibold tracking-[0.3em] text-muted-foreground">
              GYM · BHAJANPURA
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                className={active ? ACTIVE_LINK : BASE_LINK}
                data-status={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <LanguageSwitcher />
          <a
            href={telHref}
            className="hidden rounded-full gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground sm:inline-block"
          >
            {site.business.phone}
          </a>
          <button
            type="button"
            className="pressable grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav border-t border-border bg-background px-4 pb-4 lg:hidden"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setOpen(false)}
                className={active ? MOBILE_ACTIVE_LINK : MOBILE_LINK}
                data-status={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
