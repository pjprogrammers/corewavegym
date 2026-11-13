"use client";

import { useState, type FormEvent } from "react";
import { site, telHref, whatsappLink } from "@/lib/data";
import { useLang } from "./LanguageProvider";

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const SERVICES = Object.keys(site.forms.departmentWebhooks);

function webhookFor(service: string): string {
  const department = (
    site.forms.departmentWebhooks as Record<string, string>
  )[service];
  const url =
    department && department.trim()
      ? department
      : site.forms.googleSheetsWebhook;
  return url && url.startsWith("http") ? url : "";
}

export function ContactForm() {
  const { t } = useLang();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    service: "membership",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [waUrl, setWaUrl] = useState("");

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const next: Errors = {};
    const name = form.name.trim();
    const phone = form.phone.replace(/\D/g, "");
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2 || name.length > 60) {
      next.name = t("contact.errors.name");
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      next.phone = t("contact.errors.phone");
    }
    if (email && !EMAIL_PATTERN.test(email)) {
      next.email = t("contact.errors.email");
    }
    if (message.length < 5 || message.length > 1000) {
      next.message = t("contact.errors.message");
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      name: form.name.trim().slice(0, 60),
      phone: form.phone.replace(/\D/g, "").slice(0, 10),
      email: form.email.trim().slice(0, 120),
      service: form.service,
      message: form.message.trim().slice(0, 1000),
    };

    const accessKey =
      typeof site.forms.web3formsKey === "string"
        ? site.forms.web3formsKey.trim()
        : "";
    const webhook = webhookFor(form.service);

    const message = [
      `*New enquiry — ${site.business.name}*`,
      `Name: ${payload.name}`,
      `Phone: +91 ${payload.phone}`,
      payload.email ? `Email: ${payload.email}` : "",
      `Interested in: ${payload.service}`,
      `Message: ${payload.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    const fallbackUrl = whatsappLink(message);
    setWaUrl(fallbackUrl);
    const openWhatsApp = () =>
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");

    if (!accessKey && !webhook) {
      openWhatsApp();
      setStatus("sent");
      return;
    }

    setStatus("sending");
    let delivered = false;

    if (accessKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: site.forms.emailSubject || "New website enquiry",
            from_name: "Core Wave Gym website",
            name: payload.name,
            email: payload.email || "no-reply@corewavegym.in",
            phone: payload.phone,
            interested_in: payload.service,
            message: payload.message,
            page: "contact",
            botcheck: "",
          }),
        });
        const data = await response.json().catch(() => ({}));
        delivered = response.ok && data.success !== false;
      } catch {
        delivered = false;
      }
    }

    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            ...payload,
            page: "contact",
            sentAt: new Date().toISOString(),
          }),
        });
        delivered = true;
      } catch {
        /* keep the previous result */
      }
    }

    openWhatsApp();
    setStatus(delivered ? "sent" : "error");
  };

  if (status === "sent") {
    return (
      <div className="glass-card p-8">
        <h2 className="text-2xl">{t("contact.sentTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("contact.sentText")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground"
            >
              {t("common.whatsapp")}
            </a>
          )}
          <a
            href={telHref}
            className="inline-flex glass hover-lift rounded-full px-6 py-3 text-sm font-bold"
          >
            {t("common.callNow")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card p-6 sm:p-8">
      <h2 className="text-2xl">{t("contact.formTitle")}</h2>

      <label className="mt-5 block text-sm font-semibold">
        {t("contact.name")}
        <input
          className="field mt-1"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          maxLength={60}
          autoComplete="name"
        />
        {errors.name && (
          <span className="mt-1 block text-xs text-destructive">{errors.name}</span>
        )}
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          {t("contact.phone")}
          <input
            className="field mt-1"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            maxLength={14}
            autoComplete="tel"
          />
          {errors.phone && (
            <span className="mt-1 block text-xs text-destructive">{errors.phone}</span>
          )}
        </label>

        <label className="block text-sm font-semibold">
          {t("contact.email")}
          <input
            className="field mt-1"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            maxLength={120}
            autoComplete="email"
          />
          {errors.email && (
            <span className="mt-1 block text-xs text-destructive">{errors.email}</span>
          )}
        </label>
      </div>

      <label className="mt-4 block text-sm font-semibold">
        {t("contact.service")}
        <select
          className="field mt-1"
          value={form.service}
          onChange={(event) => update("service", event.target.value)}
        >
          {SERVICES.map((service) => (
            <option key={service} value={service}>
              {t(`contact.services.${service}`)}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-sm font-semibold">
        {t("contact.message")}
        <textarea
          className="field mt-1 min-h-28"
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          maxLength={1000}
        />
        {errors.message && (
          <span className="mt-1 block text-xs text-destructive">{errors.message}</span>
        )}
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full gradient-primary px-6 py-3.5 text-sm font-bold text-primary-foreground disabled:opacity-60"
      >
        {t(status === "sending" ? "contact.sending" : "contact.send")}
      </button>

      {status === "error" && (
        <p className="mt-3 text-xs text-destructive">
          {t("contact.errors.failed")}{" "}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {t("contact.waFallback")}
          </a>
        </p>
      )}
    </form>
  );
}
