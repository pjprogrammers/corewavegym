"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";
import { site, whatsappLink } from "@/lib/data";

export function ClassesPage() {
  const { t, tx } = useLang();
  const items = tx("classes.items") as Record<
    string,
    { n: string; d: string; l: string }
  >;
  const days = tx("days") as Record<string, string>;

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <Reveal>
          <span className="eyebrow">{t("classes.eyebrow")}</span>
          <h1 className="mt-2 text-4xl md:text-5xl">{t("classes.title")}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t("classes.text")}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.classes.map((item, index) => (
            <Reveal key={item.id} delay={(index % 3) * 60}>
              <article className="glass-card flex h-full flex-col p-6">
                <span className="text-3xl" aria-hidden="true">
                  {item.icon}
                </span>
                <h2 className="mt-3 text-xl">{items[item.id]?.n}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {items[item.id]?.d}
                </p>
                <span className="mt-4 w-fit rounded-full border border-border px-3 py-1 text-xs font-bold text-primary">
                  {items[item.id]?.l}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">{t("classes.scheduleTitle")}</h2>
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
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappLink(
                  "Hi Core Wave Gym, I want to know the ladies batch timing.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground"
              >
                {t("common.whatsapp")}
              </a>
              <Link
                href="/membership"
                className="glass hover-lift rounded-full px-6 py-3 text-sm font-bold"
              >
                {t("common.viewPlans")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
