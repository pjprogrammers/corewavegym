"use client";

import Link from "next/link";
import { FaqAccordion, MembershipCalculator } from "@/components/Tools";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";
import { formatINR, site, telHref, whatsappLink } from "@/lib/data";

export function MembershipPage() {
  const { t, tx } = useLang();
  const includes = tx("membership.includes") as string[];
  const faqs = tx("faqs") as { q: string; a: string }[];

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <Reveal>
          <span className="eyebrow">{t("membership.eyebrow")}</span>
          <h1 className="mt-2 text-4xl md:text-5xl">{t("membership.title")}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {t("membership.text")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {site.plans.map((plan, index) => {
            const perks =
              (tx(`membership.planPerks.${plan.id}`) as string[] | undefined) ?? [];
            const tag = tx(`membership.planTags.${plan.id}`) as string | undefined;

            return (
              <Reveal key={plan.id} delay={index * 100}>
                <div
                  className={`glass-card flex h-full flex-col p-7 ${
                    plan.featured
                      ? "border-primary/60 ring-1 ring-primary/40"
                      : ""
                  }`}
                >
                  {typeof tag === "string" && (
                    <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      {tag}
                    </span>
                  )}
                  <h2 className="mt-3 text-2xl">
                    {t(`membership.planNames.${plan.id}`)}
                  </h2>
                  <div className="mt-2 font-display text-5xl text-primary">
                    {formatINR(plan.price)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.months}{" "}
                    {plan.months === 1 ? t("common.month") : t("common.months")} ·{" "}
                    {formatINR(Math.round(plan.price / plan.months))}{" "}
                    {t("common.perMonth")}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    {perks.map((perk) => (
                      <li key={perk} className="flex gap-2">
                        <span className="text-primary">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(
                      `Hi Core Wave Gym, I want the ${plan.id} membership plan.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex justify-center rounded-full gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground"
                  >
                    {t("common.joinNow")}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          {t("membership.priceNote")}
        </p>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">{t("membership.includesTitle")}</h2>
            <ul className="mt-6 space-y-3">
              {includes.map((item) => (
                <li
                  key={item}
                  className="card-surface flex items-center gap-3 p-4 text-sm font-semibold"
                >
                  <span className="text-primary">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={telHref}
                className="glass hover-lift rounded-full px-6 py-3 text-sm font-bold"
              >
                {t("common.callNow")}
              </a>
              <Link
                href="/contact"
                className="glass hover-lift rounded-full px-6 py-3 text-sm font-bold"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <MembershipCalculator />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-4xl">{t("membership.faqTitle")}</h2>
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
