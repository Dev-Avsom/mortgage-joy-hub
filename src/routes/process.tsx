import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, FileText, Search, Home, Key } from "lucide-react";
import { LoanProcessTimeline } from "@/components/site/LoanProcessTimeline";
import { Reveal } from "@/components/site/Reveal";
import { GradientOrb } from "@/components/site/GradientOrb";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "How It Works — Ensure Home Loans" },
      { name: "description", content: "Our 5-step mortgage process: pre-qualification, application, underwriting, appraisal, and closing." },
      { property: "og:title", content: "How It Works — Ensure Home Loans" },
      { property: "og:description", content: "From pre-qualification to keys in 21–30 days." },
    ],
  }),
  component: ProcessPage,
});

const STEPS = [
  { icon: ClipboardCheck, title: "Pre-qualification", time: "Same day", body: "Share basic info — income, assets, target price. Soft credit pull, no impact to your score. Pre-qualification is subject to review and is not a loan approval or commitment to lend." },
  { icon: FileText, title: "Application & docs", time: "1–3 days", body: "Once you're under contract (or ready to refi), we collect W-2s, pay stubs, bank statements, and ID. Most clients upload everything from their phone." },
  { icon: Search, title: "Underwriting", time: "5–10 days", body: "Our underwriting team verifies income, assets, and credit. We order title and homeowners insurance. You'll get a clear list of any conditions to clear." },
  { icon: Home, title: "Appraisal & approval", time: "7–14 days", body: "An independent appraiser confirms the home's value. Once cleared, we issue your final approval — the Clear to Close." },
  { icon: Key, title: "Closing day", time: "1 hour", body: "You sign final documents, funds wire to the seller, and the keys are yours. We're with you every minute." },
];

function ProcessPage() {
  const tones = ["brand", "gold", "teal", "rose", "violet"] as const;
  return (
    <div>
      <section className="relative overflow-hidden bg-mesh">
        <GradientOrb className="-top-20 -left-10" color="oklch(0.72 0.14 25 / 0.4)" size={420} />
        <GradientOrb className="-top-10 right-0" color="oklch(0.65 0.15 295 / 0.35)" size={360} delay={2000} />
        <div className="relative mx-auto max-w-5xl px-4 py-16">
          <Reveal>
            <span className="eyebrow">Our process</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">How the <span className="gradient-text">Mortgage Process</span> Works</h1>
            <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
              Most of our clients go from pre-qualification to keys in 21–30 days. Here's what to expect at every stage.
            </p>
          </Reveal>
        </div>
      </section>

      <LoanProcessTimeline />

      <div className="mx-auto max-w-5xl px-4 pb-12">
      <SectionHeading eyebrow="Step-by-step" title="Every stage, fully explained" gradientWords="fully explained" />
      <ol className="mt-8 space-y-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} as="li" delay={i * 80}>
            <div className="card-elevated flex gap-5 rounded-xl p-6">
              <span className={`icon-chip ${tones[i]} shrink-0`}><span className="text-base font-bold">{i + 1}</span></span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <span className="eyebrow !py-0.5">{s.time}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
              <s.icon className="hidden h-10 w-10 shrink-0 text-primary md:block" />
            </div>
          </Reveal>
        ))}
      </ol>
      <div className="cta-banner relative mt-10 p-8 md:p-10">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Ready to Start Step 1?</h2>
          <p className="mt-2 text-primary-foreground/80">Start a pre-qualification request online. Pre-qualification is subject to review.</p>
          <Button asChild size="lg" className="mt-4 bg-[oklch(0.84_0.13_75)] text-[oklch(0.2_0.05_40)] hover:opacity-90"><Link to="/get-prequalified">Get Pre-Qualified</Link></Button>
        </div>
      </div>
      </div>
    </div>
  );
}