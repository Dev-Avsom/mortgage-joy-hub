import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowLeft } from "lucide-react";
import { getProgram, LOAN_PROGRAMS, type LoanProgram } from "@/lib/loan-programs";
import { Reveal } from "@/components/site/Reveal";
import { GradientOrb } from "@/components/site/GradientOrb";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/loan-programs/$slug")({
  loader: ({ params }): { program: LoanProgram } => {
    const program = getProgram(params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.program;
    if (!p) return { meta: [{ title: "Loan Program" }] };
    return {
      meta: [
        { title: `${p.name} — Ensure Home Loans` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.name} — Ensure Home Loans` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  component: ProgramDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Program not found</h1>
      <Button asChild className="mt-4"><Link to="/loan-programs">View all programs</Link></Button>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

const TONES = ["gold", "teal", "rose", "violet"] as const;

function ProgramDetail() {
  const { program: p } = Route.useLoaderData() as { program: LoanProgram };
  return (
    <div>
      <section className="relative overflow-hidden text-white animated-bg" style={{ background: "var(--gradient-hero)" }}>
        <GradientOrb className="-top-20 -right-20" color="oklch(0.84 0.13 75 / 0.5)" size={420} />
        <GradientOrb className="-bottom-24 -left-16" color="oklch(0.72 0.14 200 / 0.45)" size={360} />
        <div className="relative mx-auto max-w-5xl px-4 py-16">
          <Link to="/loan-programs" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All loan programs
          </Link>
          <span className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90 backdrop-blur">Loan program</span>
          <h1 className="animate-fade-in-up mt-3 text-4xl font-bold md:text-5xl">{p.name}</h1>
          <p className="animate-fade-in-up mt-2 max-w-3xl text-lg text-white/85" style={{ animationDelay: "120ms" }}>{p.tagline}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {p.highlights.map((h, i) => (
            <Reveal key={h.label}>
              <Card className={`card-elevated p-4 border-t-4 border-t-[var(--accent-${TONES[i % TONES.length]})]`}>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{h.label}</p>
                <p className="mt-1 text-xl font-bold gradient-text">{h.value}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <section className="mt-12">
          <SectionHeading eyebrow="Overview" title={`About the ${p.shortName} loan`} />
          <p className="mt-3 max-w-3xl text-muted-foreground">{p.description}</p>
        </section>

        <section className="mt-10">
          <SectionHeading eyebrow="Best for" title="Who this fits" />
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {p.bestFor.map((b, i) => (
              <li key={b} className="rounded-lg border border-border bg-gradient-to-br from-card to-secondary/40 px-3 py-2 text-sm shadow-sm">
                <span className={`mr-2 inline-block h-2 w-2 rounded-full bg-[var(--accent-${TONES[i % TONES.length]})]`} />{b}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="card-elevated p-6 border-t-4 border-t-[oklch(0.62_0.16_150)]">
              <h3 className="text-lg font-semibold">Pros</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {p.pros.map((x) => (
                  <li key={x} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-[oklch(0.62_0.16_150)]" /> {x}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={120}>
            <Card className="card-elevated p-6 border-t-4 border-t-[var(--accent-rose)]">
              <h3 className="text-lg font-semibold">Things to consider</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {p.cons.map((x) => (
                  <li key={x} className="flex gap-2"><X className="h-4 w-4 shrink-0 text-muted-foreground" /> {x}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </section>

        <section className="mt-10">
          <SectionHeading eyebrow="Requirements" title="What you'll need" />
          <ul className="mt-4 space-y-2 text-sm">
            {p.requirements.map((r) => (
              <li key={r} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-primary" /> {r}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-4 space-y-3">
            {p.faqs.map((f, i) => (
              <Card key={f.q} className={`card-elevated p-4 border-l-4 border-l-[var(--accent-${TONES[i % TONES.length]})]`}>
                <p className="font-semibold">{f.q}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="cta-banner relative mt-12 overflow-hidden rounded-2xl p-8 text-white">
          <GradientOrb className="-top-12 -right-12" color="oklch(0.84 0.13 75 / 0.4)" size={260} />
          <div className="relative">
            <h2 className="text-2xl font-bold md:text-3xl">Ready to apply for a {p.shortName} loan?</h2>
            <p className="mt-2 text-white/85">Get pre-qualified in minutes — soft credit pull, no impact to your score.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild size="lg" className="glow-on-hover bg-[var(--accent-gold)] text-foreground hover:opacity-90"><Link to="/get-prequalified">Get Pre-Qualified</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10"><Link to="/contact">Talk to an officer</Link></Button>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading eyebrow="Explore more" title="Other programs" />
          <div className="mt-4 flex flex-wrap gap-2">
            {LOAN_PROGRAMS.filter((x) => x.slug !== p.slug).map((x) => (
              <Button key={x.slug} asChild variant="outline" size="sm">
                <Link to="/loan-programs/$slug" params={{ slug: x.slug }}>{x.shortName}</Link>
              </Button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}