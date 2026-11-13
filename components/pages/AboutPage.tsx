"use client";

import { HeroSlider } from "@/components/HeroSlider";
import { CountUp, Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";
import { site, telHref } from "@/lib/data";

export function AboutPage() {
  const { t, tx } = useLang();
  const galleryAlts = tx("gallery.alts") as Record<string, string>;
  const amenities = tx("about.amenities") as string[];
  const statLabels = tx("statLabels") as Record<string, string>;
  const days = tx("days") as Record<string, string>;

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-20">
        <Reveal>
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h1 className="mt-2 text-4xl md:text-5xl">{t("about.title")}</h1>
          <p className="mt-5 text-muted-foreground">{t("about.p1")}</p>
          <p className="mt-3 text-muted-foreground">{t("about.p2")}</p>
          <p className="mt-3 text-muted-foreground">{t("about.p3")}</p>
          <a
            href={telHref}
            className="mt-7 inline-flex rounded-full gradient-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
          >
            {t("common.callNow")}
          </a>
        </Reveal>
        <Reveal delay={120}>
          <HeroSlider
            slides={site.images.about.map((src) => ({
              src,
              alt: galleryAlts[src] ?? site.business.name,
            }))}
            className="aspect-[3/2] w-full rounded-2xl border border-border"
          />
        </Reveal>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
          {site.stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 100} className="text-center">
              <CountUp value={stat.value} suffix={stat.suffix} />
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {statLabels[stat.id]}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-4xl">{t("about.amenitiesTitle")}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity, index) => (
            <Reveal key={amenity} delay={(index % 3) * 80}>
              <div className="glass-card flex h-full items-center gap-3 p-4 text-sm font-semibold">
                <span className="text-primary">✓</span>
                {amenity}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">{t("about.locationTitle")}</h2>
            <p className="mt-3 text-muted-foreground">{site.business.address}</p>
            <a
              href={site.business.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground"
            >
              {t("common.getDirections")}
            </a>
            <ul className="card-surface mt-7 divide-y divide-border">
              {site.hours.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between px-5 py-3 text-sm"
                >
                  <span className="font-semibold">{days[entry.id]}</span>
                  <span className="text-muted-foreground">{entry.time}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <iframe
              src={site.business.mapsEmbed}
              title={`${site.business.name} location map`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full rounded-2xl border border-border"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
