import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowLeft } from "lucide-react";
import { getProgram, LOAN_PROGRAMS, type LoanProgram } from "@/lib/loan-programs";

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
        { title: `${p.name} — HomeBridge Mortgage` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.name} — HomeBridge Mortgage` },
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

function ProgramDetail() {
  const { program: p } = Route.useLoaderData() as { program: LoanProgram };
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/loan-programs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All loan programs
      </Link>
      <h1 className="mt-4 text-3xl font-bold md:text-4xl">{p.name}</h1>
      <p className="mt-2 max-w-3xl text-lg text-muted-foreground">{p.tagline}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {p.highlights.map((h) => (
          <Card key={h.label} className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{h.label}</p>
            <p className="mt-1 text-xl font-bold text-primary">{h.value}</p>
          </Card>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="mt-2 text-muted-foreground">{p.description}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Best for</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {p.bestFor.map((b) => (
            <li key={b} className="rounded-md border border-border bg-secondary/30 px-3 py-2 text-sm">{b}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Pros</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {p.pros.map((x) => (
              <li key={x} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-[oklch(0.62_0.16_150)]" /> {x}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Things to consider</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {p.cons.map((x) => (
              <li key={x} className="flex gap-2"><X className="h-4 w-4 shrink-0 text-muted-foreground" /> {x}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Requirements</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {p.requirements.map((r) => (
            <li key={r} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-primary" /> {r}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-3 space-y-3">
          {p.faqs.map((f) => (
            <Card key={f.q} className="p-4">
              <p className="font-semibold">{f.q}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl p-8 text-white" style={{ background: "var(--gradient-hero)" }}>
        <h2 className="text-2xl font-bold">Ready to apply for a {p.shortName} loan?</h2>
        <p className="mt-2 text-white/80">Get pre-qualified in minutes — soft credit pull, no impact to your score.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild size="lg" variant="secondary"><Link to="/get-prequalified">Get pre-qualified</Link></Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10"><Link to="/contact">Talk to an officer</Link></Button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Other programs</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {LOAN_PROGRAMS.filter((x) => x.slug !== p.slug).map((x) => (
            <Button key={x.slug} asChild variant="outline" size="sm">
              <Link to="/loan-programs/$slug" params={{ slug: x.slug }}>{x.shortName}</Link>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}