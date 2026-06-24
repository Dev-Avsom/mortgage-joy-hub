import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Ensure Home Loans" },
      { name: "description", content: "Terms governing your use of the Ensure Home Loans website and services." },
    ],
  }),
  component: () => (
    <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
      <h1>Terms of Service</h1>
      <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

      <h2>1. Acceptance</h2>
      <p>By using {siteConfig.brand}'s website, calculators, or services, you agree to these Terms. If you do not agree, do not use the site.</p>

      <h2>2. Not a Loan Commitment</h2>
      <p>Rate quotes, payment estimates, and pre-qualification results displayed on this site are <strong>illustrative only</strong> and do not constitute a loan offer or commitment to lend. Final terms depend on full underwriting, property appraisal, title review, and current market conditions.</p>

      <h2>3. Eligibility</h2>
      <p>You must be at least 18 years old and a U.S. resident or citizen to apply. Loan availability varies by state license.</p>

      <h2>4. Accuracy of Information</h2>
      <p>You agree to provide true, accurate, and complete information. Misrepresentation on a mortgage application is a federal crime under 18 U.S.C. § 1014.</p>

      <h2>5. Intellectual Property</h2>
      <p>All content on this site — text, graphics, logos, calculators — is owned by {siteConfig.brand} and protected by copyright. You may not reproduce or redistribute without written permission.</p>

      <h2>6. Limitation of Liability</h2>
      <p>{siteConfig.brand} is not liable for indirect, incidental, or consequential damages arising from your use of the site or calculators. Our total liability is limited to $100.</p>

      <h2>7. Governing Law</h2>
      <p>These Terms are governed by the laws of the State of Texas. Disputes will be resolved by binding arbitration in Travis County, TX.</p>

      <h2>8. Changes</h2>
      <p>We may update these Terms at any time. Continued use of the site means you accept the changes.</p>
    </article>
  ),
});
