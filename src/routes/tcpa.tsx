import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/tcpa")({
  head: () => ({
    meta: [
      { title: "TCPA Consent — HomeBridge Mortgage" },
      { name: "description", content: "Telephone Consumer Protection Act consent disclosure." },
    ],
  }),
  component: () => (
    <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
      <h1>TCPA Consent &amp; Communications Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

      <h2>Consent to Be Contacted</h2>
      <p>By submitting your contact information through any form on this website (including the rate quote, pre-qualification wizard, lead forms, and contact page), you expressly consent to be contacted by {siteConfig.brand} and its loan officers via:</p>
      <ul>
        <li>Telephone calls (including auto-dialed and prerecorded calls)</li>
        <li>SMS / text messages (message and data rates may apply)</li>
        <li>Email</li>
        <li>WhatsApp</li>
      </ul>
      <p>at the phone number and email address you provide, even if your number is on a federal or state Do-Not-Call list.</p>

      <h2>Not a Condition of Service</h2>
      <p>This consent is <strong>not</strong> a condition of obtaining any loan, product, or service from us. You may still apply by calling us directly at <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.</p>

      <h2>Revoking Consent</h2>
      <p>You may revoke consent at any time by:</p>
      <ul>
        <li>Replying <strong>STOP</strong> to any text message</li>
        <li>Clicking the unsubscribe link in any email</li>
        <li>Emailing <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with "Unsubscribe" in the subject</li>
        <li>Calling us at {siteConfig.phone}</li>
      </ul>

      <h2>Frequency &amp; Charges</h2>
      <p>Message frequency varies based on your loan stage. Standard message and data rates from your carrier may apply.</p>
    </article>
  ),
});
