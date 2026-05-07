import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, FileText, Search, Home, Key } from "lucide-react";
import { LoanProcessTimeline } from "@/components/site/LoanProcessTimeline";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "How It Works — HomeBridge Mortgage" },
      { name: "description", content: "Our 5-step mortgage process: pre-qualification, application, underwriting, appraisal, and closing." },
      { property: "og:title", content: "How It Works — HomeBridge Mortgage" },
      { property: "og:description", content: "From pre-qualification to keys in 21–30 days." },
    ],
  }),
  component: ProcessPage,
});

const STEPS = [
  { icon: ClipboardCheck, title: "Pre-qualification", time: "5 minutes", body: "Share basic info — income, assets, target price. Soft credit pull, no impact to your score. We send a Loan Estimate so you can shop with confidence." },
  { icon: FileText, title: "Application & docs", time: "1–3 days", body: "Once you're under contract (or ready to refi), we collect W-2s, pay stubs, bank statements, and ID. Most clients upload everything from their phone." },
  { icon: Search, title: "Underwriting", time: "5–10 days", body: "Our underwriting team verifies income, assets, and credit. We order title and homeowners insurance. You'll get a clear list of any conditions to clear." },
  { icon: Home, title: "Appraisal & approval", time: "7–14 days", body: "An independent appraiser confirms the home's value. Once cleared, we issue your final approval — the Clear to Close." },
  { icon: Key, title: "Closing day", time: "1 hour", body: "You sign final documents, funds wire to the seller, and the keys are yours. We're with you every minute." },
];

function ProcessPage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 pt-12">
        <Reveal>
          <h1 className="text-3xl font-bold md:text-4xl">How the <span className="gradient-text">mortgage process</span> works</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Most of our clients go from pre-qualification to keys in 21–30 days. Here's what to expect at every stage.
          </p>
        </Reveal>
      </div>

      <LoanProcessTimeline />

      <div className="mx-auto max-w-5xl px-4 pb-12">
      <h2 className="text-2xl font-bold">Step-by-step detail</h2>
      <ol className="mt-6 space-y-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} as="li" delay={i * 80}>
            <Card className="hover-lift flex gap-5 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <span className="rounded-full bg-secondary px-3 py-0.5 text-xs">{s.time}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
              <s.icon className="hidden h-10 w-10 shrink-0 text-primary md:block" />
            </Card>
          </Reveal>
        ))}
      </ol>
      <div className="animated-bg mt-10 rounded-2xl p-8 text-white" style={{ background: "var(--gradient-hero)" }}>
        <h2 className="text-2xl font-bold">Ready to start step 1?</h2>
        <p className="mt-2 text-white/80">Pre-qualification takes 5 minutes and won't impact your credit.</p>
        <Button asChild size="lg" variant="secondary" className="glow-on-hover mt-4"><Link to="/get-prequalified">Get pre-qualified</Link></Button>
      </div>
      </div>
    </div>
  );
}