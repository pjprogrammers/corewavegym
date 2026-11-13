"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { OfferCountdown } from "@/components/OfferTicker";
import { useLang } from "@/components/LanguageProvider";
import { isOfferLive, site, telHref, whatsappLink } from "@/lib/data";

export function OffersPage() {
  const { t, tx } = useLang();
  const live = isOfferLive();
  const steps = (tx("offers.howSteps") as string[] | undefined) ?? [];
  const cards = site.offer.cards ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <Reveal>
        <span className="eyebrow">
          {live ? site.offer.eyebrow : t("offers.liveTitle")}
        </span>
        <h1 className="mt-2 max-w-3xl text-4xl md:text-5xl">
          {live ? site.offer.title : site.offer.comingSoonTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {live ? site.offer.text : site.offer.comingSoonText}
        </p>
      </Reveal>

      {live ? (
        <>
          <Reveal delay={100}>
            <div className="glass-card mt-8 p-6 sm:p-8">
              <span className="rounded-full bg-primary px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.14em] text-primary-foreground">
                {site.offer.badge}
              </span>
              <div className="mt-5">
                <OfferCountdown />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={whatsappLink(
                    `Hi ${site.business.name}, mujhe ye offer chahiye: ${site.offer.title}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift rounded-full gradient-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
                >
                  {site.offer.ctaLabel}
                </a>
                <a
                  href={telHref}
                  className="glass hover-lift rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  {t("common.callNow")}
                </a>
                <Link
                  href="/membership"
                  className="glass hover-lift rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  {t("common.viewPlans")}
                </Link>
              </div>
            </div>
          </Reveal>

          {cards.length > 0 && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {cards.map((card, index) => (
                <Reveal key={card.title} delay={(index % 2) * 100}>
                  <article className="hover-lift group h-full overflow-hidden rounded-2xl border border-border bg-surface">
                    {card.image && (
                      <img
                        src={card.image}
                        alt={card.title}
                        width={1200}
                        height={800}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    )}
                    <div className="p-6">
                      {card.tag && <span className="eyebrow">{card.tag}</span>}
                      <h2 className="mt-2 text-2xl">{card.title}</h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {card.desc}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {steps.length > 0 && (
            <Reveal delay={100}>
              <div className="card-surface mt-10 p-6 sm:p-8">
                <h2 className="text-2xl">{t("offers.howTitle")}</h2>
                <ol className="mt-4 space-y-3">
                  {steps.map((step, index) => (
                    <li
                      key={step}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 font-bold text-primary">
                        {index + 1}
                      </span>
                      <span className="pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          )}
        </>
      ) : (
        <Reveal delay={100}>
          <div className="glass-card mt-8 p-8 text-center">
            <p className="font-display text-5xl text-primary">
              {site.offer.comingSoonTitle}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {site.offer.comingSoonText}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift rounded-full gradient-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
              >
                {t("common.whatsapp")}
              </a>
              <Link
                href="/membership"
                className="glass hover-lift rounded-full px-7 py-3.5 text-sm font-bold"
              >
                {t("common.viewPlans")}
              </Link>
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
