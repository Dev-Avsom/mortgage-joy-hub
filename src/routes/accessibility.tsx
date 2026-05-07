import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement — HomeBridge Mortgage" },
      { name: "description", content: "Our commitment to digital accessibility for users of all abilities." },
    ],
  }),
  component: () => (
    <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
      <h1>Accessibility Statement</h1>
      <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

      <h2>Our Commitment</h2>
      <p>{siteConfig.brand} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>

      <h2>Conformance Status</h2>
      <p>This site aims to conform with <strong>WCAG 2.1 Level AA</strong>. Conformance means that content meets the recommended accessibility standards as defined by the W3C.</p>

      <h2>Measures We Take</h2>
      <ul>
        <li>Semantic HTML and ARIA labels</li>
        <li>Keyboard navigation across all interactive elements</li>
        <li>Sufficient color contrast (4.5:1 minimum for body text)</li>
        <li>Alt text on all meaningful images</li>
        <li>Resizable text without loss of content</li>
        <li>Form labels and error messages clearly associated with inputs</li>
      </ul>

      <h2>Feedback</h2>
      <p>If you encounter accessibility barriers, please contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>. We aim to respond within 2 business days.</p>
    </article>
  ),
});
