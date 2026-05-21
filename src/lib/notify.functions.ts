import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  source: z.string().min(1).max(100),
  subject: z.string().min(1).max(200),
  fields: z.record(z.string().min(1).max(100), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
  message: z.string().max(5000).optional(),
});

function escape(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function renderHtml(source: string, fields: Record<string, unknown>, message?: string) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;background:#f6f7f9;border:1px solid #e5e7eb;font-weight:600;color:#111827;vertical-align:top;white-space:nowrap">${escape(k)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#111827;white-space:pre-wrap">${escape(String(v))}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#ffffff;color:#111827;margin:0;padding:24px">
  <div style="max-width:640px;margin:0 auto">
    <h2 style="margin:0 0 6px;font-size:20px;color:#0f3460">New submission — ${escape(source)}</h2>
    <p style="margin:0 0 18px;color:#6b7280;font-size:13px">Received from ensurehomeloans.com</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>
    ${message ? `<div style="margin-top:18px;padding:12px;border-left:3px solid #0f3460;background:#f9fafb;white-space:pre-wrap;font-size:14px">${escape(message)}</div>` : ""}
    <p style="margin-top:24px;color:#9ca3af;font-size:12px">This is an automated notification from your website.</p>
  </div></body></html>`;
}

export const sendSubmissionNotification = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      console.error("Email not configured");
      return { ok: false, error: "Email not configured" };
    }
    const fields = data.fields ?? {};
    const html = renderHtml(data.source, fields, data.message);
    const replyTo = typeof fields["Email"] === "string" ? (fields["Email"] as string) : undefined;

    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Ensure Home Loans <onboarding@resend.dev>",
        to: ["contact@ensurehomeloans.com"],
        subject: data.subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Resend send failed", res.status, text);
      return { ok: false, error: `Send failed: ${res.status}` };
    }
    return { ok: true };
  });