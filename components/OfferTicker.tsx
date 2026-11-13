"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isOfferLive, site } from "@/lib/data";
import { useLang } from "./LanguageProvider";

export function OfferTicker() {
  const { t } = useLang();
  const items = site.offer.tickerItems ?? [];
  const [current, setCurrent] = useState(0);
  const live = isOfferLive();

  useEffect(() => {
    if (
      items.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = window.setInterval(
      () => setCurrent((value) => (value + 1) % items.length),
      3200,
    );
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!site.offer.showTicker || !live || items.length === 0) return null;

  return (
    <Link
      href="/offers"
      className="group block border-b border-primary/25 bg-primary/10 md:backdrop-blur-md"
      aria-label={site.offer.badge}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 text-xs sm:text-sm">
        <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[0.6rem] font-black uppercase tracking-[0.12em] text-primary-foreground">
          {site.offer.badge}
        </span>
        <span className="relative h-5 flex-1 overflow-hidden">
          {items.map((item, index) => (
            <span
              key={item}
              aria-hidden={index !== current}
              className={`ticker-item absolute inset-0 truncate font-semibold ${
                index === current
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              {item}
            </span>
          ))}
        </span>
        <span className="shrink-0 font-bold text-primary underline-offset-4 group-hover:underline">
          {t("offers.viewOffers")} →
        </span>
      </div>
    </Link>
  );
}

type Remaining = {
  d: number;
  h: number;
  m: number;
  s: number;
  over: boolean;
};

export function OfferCountdown({ endsAt = site.offer.endsAt }: { endsAt?: string }) {
  const { t } = useLang();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const calculate = (): Remaining | null => {
      const end = new Date(endsAt).getTime();
      if (Number.isNaN(end)) return null;
      const diff = end - Date.now();
      if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, over: true };
      const total = Math.floor(diff / 1000);
      return {
        d: Math.floor(total / 86400),
        h: Math.floor((total % 86400) / 3600),
        m: Math.floor((total % 3600) / 60),
        s: total % 60,
        over: false,
      };
    };

    setRemaining(calculate());
    const timer = window.setInterval(() => setRemaining(calculate()), 1000);
    return () => window.clearInterval(timer);
  }, [endsAt]);

  if (!endsAt || remaining === null) return null;

  const cells = [
    { v: remaining.d, l: t("offers.days") },
    { v: remaining.h, l: t("offers.hours") },
    { v: remaining.m, l: t("offers.mins") },
    { v: remaining.s, l: t("offers.secs") },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {cells.map((cell) => (
          <div
            key={cell.l}
            className="glass min-w-[68px] rounded-2xl px-3 py-2 text-center sm:min-w-[84px]"
          >
            <div className="font-display text-3xl leading-none text-primary sm:text-4xl">
              {String(cell.v).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {cell.l}
            </div>
          </div>
        ))}
      </div>
      {remaining.over && (
        <p className="mt-3 text-sm font-bold text-muted-foreground">
          {t("offers.ended")}
        </p>
      )}
    </div>
  );
}
