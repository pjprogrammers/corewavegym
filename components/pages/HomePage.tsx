"use client";

import Link from "next/link";
import { BmiCalculator } from "@/components/Tools";
import { HeroSlider } from "@/components/HeroSlider";
import { CountUp, Reveal } from "@/components/Reveal";
import { StarIcon } from "@/components/icons";
import { useLang } from "@/components/LanguageProvider";
import { formatINR, site, telHref, whatsappLink } from "@/lib/data";

export function HomePage() {
  const { t, tx } = useLang();
  const galleryAlts = tx("gallery.alts") as Record<string, string>;
  const features = tx("home.features") as { t: string; d: string }[];
  const classesContent = tx("classes.items") as Record<
    string,
    { n: string; d: string; l: string }
  >;
  const statLabels = tx("statLabels") as Record<string, string>;
  const days = tx("days") as Record<string, string>;

  return (
    <>
      <section className="relative isolate min-h-[88svh] overflow-hidden">
        <HeroSlider
          slides={site.images.hero.map((src) => ({
            src,
            alt: galleryAlts[src] ?? site.business.name,
          }))}
          className="absolute inset-0 -z-10 h-full w-full"
          showControls={false}
          eager
        />
        <div className="absolute inset-0 -z-10 gradient-hero" />
        <div className="mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-center px-4 py-20">
          <span className="glass inline-flex w-fit rounded-full px-4 py-1.5 text-xs font-bold tracking-wide">
            {t("hero.badge")}
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            {t("hero.title")}{" "}
            <span className="text-primary">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-foreground/85 sm:text-lg">
            {t("hero.text")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className="rounded-full gradient-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
            >
              {t("common.joinNow")}
            </Link>
            <a
              href={telHref}
              className="glass hover-lift rounded-full px-7 py-3.5 text-sm font-bold"
            >
              {t("common.callNow")}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="glass hover-lift rounded-full px-7 py-3.5 text-sm font-bold"
            >
              {t("common.whatsapp")}
            </a>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex text-primary">
              {[0, 1, 2, 3, 4].map((index) => (
                <StarIcon key={index} className="h-4 w-4 fill-current" />
              ))}
            </span>
            {t("hero.trust", {
              rating: site.business.rating,
              reviews: site.business.reviewCount,
            })}
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
          {site.stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 60} className="text-center">
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
          <span className="eyebrow">{t("home.whyEyebrow")}</span>
          <h2 className="mt-2 max-w-2xl text-3xl md:text-4xl">
            {t("home.whyTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">{t("home.whyText")}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.t} delay={(index % 3) * 60}>
              <div className="glass-card h-full p-6">
                <h3 className="text-xl">{feature.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <span className="eyebrow">{t("home.classesEyebrow")}</span>
            <h2 className="mt-2 text-3xl md:text-4xl">{t("home.classesTitle")}</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.classes.map((item, index) => (
              <Reveal key={item.id} delay={(index % 3) * 60}>
                <div className="card-surface hover-lift h-full p-6">
                  <span className="text-3xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className="mt-3 text-xl">{classesContent[item.id]?.n}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {classesContent[item.id]?.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/classes"
              className="text-sm font-bold text-primary underline-offset-4 hover:underline"
            >
              {t("common.readMore")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <span className="eyebrow">{t("home.planEyebrow")}</span>
          <h2 className="mt-2 text-3xl md:text-4xl">{t("home.planTitle")}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {site.plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 60}>
              <div
                className={`glass-card h-full p-7 ${
                  plan.featured ? "border-primary/60 ring-1 ring-primary/40" : ""
                }`}
              >
                <h3 className="text-xl">{t(`membership.planNames.${plan.id}`)}</h3>
                <div className="mt-3 font-display text-4xl text-primary">
                  {formatINR(plan.price)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.months}{" "}
                  {plan.months === 1 ? t("common.month") : t("common.months")} ·{" "}
                  {formatINR(Math.round(plan.price / plan.months))}/
                  {t("common.month")}
                </p>
                <Link
                  href="/membership"
                  className="mt-6 inline-flex rounded-full gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground"
                >
                  {t("common.viewPlans")}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <span className="eyebrow">{t("home.reviewEyebrow")}</span>
            <h2 className="mt-2 text-3xl md:text-4xl">{t("home.reviewTitle")}</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {site.reviews.map((review, index) => (
              <Reveal key={review.name} delay={(index % 2) * 60}>
                <figure className="glass-card h-full p-6">
                  <div className="flex text-primary">
                    {Array.from({ length: review.rating }).map((_, star) => (
                      <StarIcon key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm text-muted-foreground">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-bold">
                    {review.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-20 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">{t("home.toolEyebrow")}</span>
          <h2 className="mt-2 mb-5 text-3xl md:text-4xl">{t("home.toolTitle")}</h2>
          <BmiCalculator />
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mb-5 text-3xl md:text-4xl">{t("home.hoursTitle")}</h2>
          <ul className="card-surface divide-y divide-border">
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
      </section>

      <section className="border-t border-border bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <span className="eyebrow">{t("home.areasEyebrow")}</span>
            <h2 className="mt-2 max-w-2xl text-3xl md:text-4xl">
              {t("home.areasTitle")}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {t("home.areasText")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {site.business.areas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground"
                >
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <Reveal>
          <div className="glass-card p-10 text-center">
            <h2 className="text-3xl md:text-4xl">{t("home.ctaTitle")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {t("home.ctaText")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full gradient-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
              >
                {t("common.whatsapp")}
              </a>
              <Link
                href="/contact"
                className="glass hover-lift rounded-full px-7 py-3.5 text-sm font-bold"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
