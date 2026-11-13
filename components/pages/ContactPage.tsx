"use client";

import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";
import {
  ContactPhoneIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/icons";
import { site, telHref } from "@/lib/data";

export function ContactPage() {
  const { t, tx } = useLang();
  const days = tx("days") as Record<string, string>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <Reveal>
        <span className="eyebrow">{t("contact.eyebrow")}</span>
        <h1 className="mt-2 text-4xl md:text-5xl">{t("contact.title")}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t("contact.text")}</p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={80}>
          <div className="card-surface p-6 sm:p-8">
            <h2 className="text-2xl">{t("contact.reachTitle")}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2 font-semibold hover:text-primary"
                >
                  <ContactPhoneIcon className="h-4 w-4 text-primary" /> +91{" "}
                  {site.business.phone}
                </a>
              </li>
              <li className="text-muted-foreground">☎ {site.business.landline}</li>
              <li>
                <a
                  href={`mailto:${site.business.email}`}
                  className="inline-flex items-center gap-2 font-semibold hover:text-primary"
                >
                  <MailIcon className="h-4 w-4 text-primary" />{" "}
                  {site.business.email}
                </a>
              </li>
              <li>
                <a
                  href={site.business.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-muted-foreground hover:text-primary"
                >
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{" "}
                  {site.business.address}
                </a>
              </li>
              <li>
                <a
                  href={site.business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold hover:text-primary"
                >
                  <InstagramIcon className="h-4 w-4 text-primary" /> Instagram
                </a>
              </li>
            </ul>

            <h3 className="mt-8 text-xl">{t("contact.hoursTitle")}</h3>
            <ul className="mt-3 divide-y divide-border text-sm">
              {site.hours.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between py-2.5"
                >
                  <span className="font-semibold">{days[entry.id]}</span>
                  <span className="text-muted-foreground">{entry.time}</span>
                </li>
              ))}
            </ul>

            <iframe
              src={site.business.mapsEmbed}
              title={`${site.business.name} location map`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-7 h-64 w-full rounded-2xl border border-border"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
