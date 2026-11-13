"use client";

import { useState } from "react";
import { formatINR, site } from "@/lib/data";
import { useLang } from "./LanguageProvider";

type BmiResult = {
  bmi: number;
  key: "under" | "healthy" | "over" | "obese";
};

export function BmiCalculator() {
  const { t } = useLang();
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [result, setResult] = useState<BmiResult | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const metres = Number(height) / 100;
        const kg = Number(weight);
        if (!metres || metres < 0.5 || metres > 2.5 || !kg || kg < 20 || kg > 300) {
          setResult(null);
          return;
        }
        const bmi = kg / (metres * metres);
        setResult({
          bmi,
          key: bmi < 18.5 ? "under" : bmi < 25 ? "healthy" : bmi < 30 ? "over" : "obese",
        });
      }}
      className="glass-card p-6"
    >
      <h3 className="text-2xl">{t("tools.bmiTitle")}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t("tools.bmiText")}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          {t("tools.height")}
          <input
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            min={50}
            max={250}
            required
            className="field mt-1"
          />
        </label>
        <label className="text-sm font-semibold">
          {t("tools.weight")}
          <input
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            min={20}
            max={300}
            required
            className="field mt-1"
          />
        </label>
      </div>
      <button className="mt-4 w-full rounded-full gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground">
        {t("tools.calculate")}
      </button>
      {result && (
        <div className="mt-4 rounded-xl border border-border bg-secondary/60 p-4">
          <div className="font-display text-3xl text-primary">
            {result.bmi.toFixed(1)}{" "}
            <span className="text-lg text-foreground">
              · {t(`tools.cats.${result.key}`)}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(`tools.tips.${result.key}`)}
          </p>
        </div>
      )}
    </form>
  );
}

export function MembershipCalculator() {
  const { t } = useLang();
  const [planId, setPlanId] = useState(site.plans[1].id);
  const [sessions, setSessions] = useState(0);
  const [diet, setDiet] = useState(false);

  const plan = site.plans.find((item) => item.id === planId) ?? site.plans[0];
  const total = plan.price + sessions * 800 + (diet ? 500 : 0);
  const monthly = Math.round(total / plan.months);

  return (
    <div className="glass-card p-6">
      <h3 className="text-2xl">{t("membership.calcTitle")}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t("membership.calcText")}</p>

      <label className="mt-4 block text-sm font-semibold">
        {t("tools.plan")}
        <select
          value={planId}
          onChange={(event) => setPlanId(event.target.value)}
          className="field mt-1"
        >
          {site.plans.map((item) => (
            <option key={item.id} value={item.id}>
              {t(`membership.planNames.${item.id}`)} — {formatINR(item.price)}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-sm font-semibold">
        {t("tools.ptSessions")}: {sessions}
        <input
          type="range"
          min={0}
          max={12}
          value={sessions}
          onChange={(event) => setSessions(Number(event.target.value))}
          className="mt-2 w-full accent-[var(--color-primary)]"
        />
      </label>

      <label className="mt-3 flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={diet}
          onChange={(event) => setDiet(event.target.checked)}
          className="h-4 w-4"
        />
        {t("tools.dietPlan")} (+{formatINR(500)})
      </label>

      <div className="mt-5 rounded-xl border border-border bg-secondary/60 p-4">
        <div className="flex items-end justify-between">
          <span className="text-sm font-semibold text-muted-foreground">
            {t("tools.total")}
          </span>
          <span className="font-display text-3xl text-primary">{formatINR(total)}</span>
        </div>
        <div className="mt-1 text-right text-xs text-muted-foreground">
          {t("tools.effective")}: {formatINR(monthly)}
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
      {items.map((item, index) => (
        <div key={item.q}>
          <button
            type="button"
            onClick={() => setOpen(open === index ? null : index)}
            aria-expanded={open === index}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold transition-colors duration-150 hover:bg-secondary/50"
          >
            {item.q}
            <span className="text-primary">{open === index ? "−" : "+"}</span>
          </button>
          {open === index && (
            <p className="faq-answer px-5 pb-5 text-sm text-muted-foreground">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
