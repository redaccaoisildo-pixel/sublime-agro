import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PRODUCTS } from "@/content/products";
import { SITE } from "@/content/site";

/**
 * Quote request handler.
 *
 * Receives multipart/form-data from components/QuoteForm.tsx, validates the
 * payload, and sends a formatted email via Resend. Same pattern as
 * thecopyside.com's app/api/contact/route.ts.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const STUDIO_INBOX = SITE.email; // geral@sublimeagro.co.mz
const FROM_ADDRESS = `Sublime Agro <formulario@${SITE.domain}>`;

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[c]!
  );
}

export async function POST(req: Request) {
  try {
    // Lazy-init so a missing RESEND_API_KEY at build/preview time doesn't
    // crash route data collection.
    if (!process.env.RESEND_API_KEY) {
      console.error("[quote] RESEND_API_KEY not set");
      return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const form = await req.formData();

    // Honeypot — bots fill hidden fields; respond 200 silently so they
    // don't retry or learn the trap exists.
    if (String(form.get("_gotcha") || "").length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const productId = String(form.get("productId") || "").trim();
    const volume = String(form.get("volume") || "").trim();
    const destination = String(form.get("destination") || "").trim();
    const notes = String(form.get("notes") || "").trim();

    if (!name || !email || !productId || !volume) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }
    if (!(Number(volume) > 0)) {
      return NextResponse.json({ ok: false, error: "invalid_volume" }, { status: 400 });
    }

    const product = PRODUCTS.find((p) => p.id === productId);
    const productLabel = product ? `${product.name.pt} (${productId})` : productId;

    const subject = `Novo pedido de cotação — ${name}${company ? ` (${company})` : ""}`;

    const rows: [string, string][] = [
      ["Nome", name],
      ["Email", email],
      ...(company ? ([["Empresa", company]] as [string, string][]) : []),
      ...(phone ? ([["Telefone", phone]] as [string, string][]) : []),
      ["Produto", productLabel],
      ["Volume", `${volume} t`],
      ...(destination ? ([["Destino", destination]] as [string, string][]) : [])
    ];

    const html = `
      <div style="font-family:Arial,sans-serif;color:#20221F;max-width:600px">
        <h2 style="font-family:Georgia,serif;margin:0 0 24px;color:#754513">
          Novo pedido de cotação — Sublime Agro
        </h2>
        <table cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.6">
          ${rows
            .map(
              ([label, value]) => `
            <tr>
              <td style="color:#747871;padding:6px 16px 6px 0;vertical-align:top">${escapeHtml(label)}</td>
              <td>${escapeHtml(value)}</td>
            </tr>`
            )
            .join("")}
        </table>
        ${
          notes
            ? `<hr style="border:none;border-top:1px solid #E8EAE5;margin:24px 0" />
               <div style="white-space:pre-wrap;font-size:15px;line-height:1.7">${escapeHtml(notes)}</div>`
            : ""
        }
      </div>
    `;

    const text = [
      "Novo pedido de cotação — Sublime Agro",
      "",
      ...rows.map(([label, value]) => `${label}: ${value}`),
      notes ? "" : null,
      notes ? "---" : null,
      notes ? "" : null,
      notes || null
    ]
      .filter((line) => line !== null)
      .join("\n");

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: STUDIO_INBOX,
      replyTo: email,
      subject,
      html,
      text
    });

    if (error) {
      console.error("[quote] Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
