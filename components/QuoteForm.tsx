"use client";

import { useState, type FormEvent } from "react";
import clsx from "clsx";
import { useLocale } from "@/lib/i18n/useLocale";
import { PRODUCTS } from "@/content/products";
import Button from "./ui/Button";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  productId: string;
  volume: string;
  destination: string;
  notes: string;
  _gotcha: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  productId: "",
  volume: "",
  destination: "",
  notes: "",
  _gotcha: ""
};

type Status = "idle" | "submitting" | "ok" | "error";
type FieldErrors = Partial<Record<keyof FormState, string>>;

export default function QuoteForm() {
  const { pick, t } = useLocale();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = t("errorRequired");
    if (!form.email.trim()) next.email = t("errorRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t("errorEmail");
    if (!form.productId) next.productId = t("errorRequired");
    if (!form.volume.trim()) next.volume = t("errorRequired");
    else if (!(Number(form.volume) > 0)) next.volume = t("errorVolume");
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form._gotcha) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      // TODO(sublime-agro): replace this stub once the client has a domain
      // and inbox. Planned shape: POST FormData to app/api/quote/route.ts,
      // same pattern as thecopyside.com's app/api/contact/route.ts —
      // force-dynamic, nodejs runtime, lazy `new Resend(...)`, honeypot
      // check, HTML+text email to the studio inbox with replyTo the sender.
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus("ok");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-sm border border-line bg-surface px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors duration-150 ease-sa focus:border-green";
  const labelClass = "mb-1.5 block text-[13px] font-medium text-ink-2";
  const errorClass = "mt-1 text-[12px] text-[#B3261E]";

  if (status === "ok") {
    return (
      <div className="rounded-sm border border-green bg-green-tint p-6 text-[15px] text-ink" role="status">
        {t("formSuccess")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <input
        type="text"
        name="_gotcha"
        value={form._gotcha}
        onChange={(e) => update("_gotcha", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t("formName")}</label>
          <input type="text" className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} />
          {errors.name ? <p className={errorClass}>{errors.name}</p> : null}
        </div>
        <div>
          <label className={labelClass}>{t("formCompany")}</label>
          <input type="text" className={inputClass} value={form.company} onChange={(e) => update("company", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t("formEmail")}</label>
          <input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} />
          {errors.email ? <p className={errorClass}>{errors.email}</p> : null}
        </div>
        <div>
          <label className={labelClass}>{t("formPhone")}</label>
          <input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("formProduct")}</label>
        <select className={inputClass} value={form.productId} onChange={(e) => update("productId", e.target.value)}>
          <option value="">—</option>
          {PRODUCTS.map((product) => (
            <option key={product.id} value={product.id}>
              {pick(product.name)}
            </option>
          ))}
        </select>
        {errors.productId ? <p className={errorClass}>{errors.productId}</p> : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t("formVolume")}</label>
          <input type="number" min={1} className={inputClass} value={form.volume} onChange={(e) => update("volume", e.target.value)} />
          {errors.volume ? <p className={errorClass}>{errors.volume}</p> : null}
        </div>
        <div>
          <label className={labelClass}>{t("formDestination")}</label>
          <input type="text" className={inputClass} value={form.destination} onChange={(e) => update("destination", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("formNotes")}</label>
        <textarea rows={3} className={inputClass} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
      </div>

      {status === "error" ? <p className={errorClass}>{t("formError")}</p> : null}

      <Button type="submit" disabled={status === "submitting"} className={clsx(status === "submitting" && "opacity-70")}>
        {status === "submitting" ? t("formSubmitting") : t("formSubmit")}
      </Button>
    </form>
  );
}
