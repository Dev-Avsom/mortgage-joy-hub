import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — HomeBridge Mortgage" },
      { name: "description", content: "How HomeBridge Mortgage collects, uses, and protects your personal information." },
    ],
  }),
  component: () => (
    <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

      <h2>1. Information We Collect</h2>
      <p>{siteConfig.brand} collects information you voluntarily provide when applying for a loan, requesting a rate quote, or contacting us — including name, address, email, phone, Social Security number, income, employment, and credit history.</p>

      <h2>2. How We Use Information</h2>
      <ul>
        <li>Process your loan application and verify eligibility</li>
        <li>Communicate with you about your application and loan options</li>
        <li>Comply with federal and state lending laws</li>
        <li>Improve our products and services</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>We share your information only with: (a) lenders and investors evaluating your loan, (b) service providers (credit bureaus, appraisers, title companies, document custodians), and (c) regulators as required by law. We do <strong>not</strong> sell your personal information.</p>

      <h2>4. Your Rights (CCPA / State Laws)</h2>
      <p>California, Virginia, Colorado, and other state residents have the right to access, correct, delete, or port their personal data, and to opt out of sale or sharing. Contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> to exercise these rights.</p>

      <h2>5. Data Security</h2>
      <p>We use bank-level encryption (TLS 1.2+) in transit and at rest, role-based access controls, and audit logs. Document uploads are stored in a private encrypted bucket accessible only to you and your assigned loan officer.</p>

      <h2>6. Cookies & Tracking</h2>
      <p>We use essential cookies for authentication and analytics cookies (Google Analytics) to improve our site. You can opt out of non-essential cookies in your browser settings.</p>

      <h2>7. Contact</h2>
      <p>Questions? Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or write to {siteConfig.address}.</p>
    </article>
  ),
});
