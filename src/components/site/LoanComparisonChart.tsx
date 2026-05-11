import { Link } from "@tanstack/react-router";
import { Home, ShieldCheck, Award, DollarSign, Briefcase } from "lucide-react";
import { Reveal } from "./Reveal";

const PROGRAMS = [
  { slug: "conventional", icon: Home, name: "Conventional", down: "3%", credit: "620", benefit: "Most flexible terms" },
  { slug: "fha", icon: ShieldCheck, name: "FHA", down: "3.5%", credit: "580", benefit: "Easier credit approval" },
  { slug: "va", icon: Award, name: "VA", down: "0%", credit: "580", benefit: "No PMI, ever" },
  { slug: "jumbo", icon: DollarSign, name: "Jumbo", down: "10%", credit: "700", benefit: "Loans up to $3M+" },
  { slug: "dscr", icon: Briefcase, name: "DSCR", down: "20%", credit: "660", benefit: "Qualify on rent" },
];

interface Props {
  full?: boolean;
}

export function LoanComparisonChart({ full = false }: Props) {
  const list = full ? PROGRAMS : PROGRAMS.slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Compare</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Find Your <span className="gradient-text">Perfect Fit</span></h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Side-by-side at a glance — hover for the full picture.</p>
        </div>
      </Reveal>

      <div className={`mt-10 grid gap-5 ${full ? "md:grid-cols-3 lg:grid-cols-5" : "md:grid-cols-2 lg:grid-cols-4"}`}>
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={i * 90}>
            <Link
              to="/loan-programs/$slug"
              params={{ slug: p.slug }}
              className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-[var(--primary-glow,var(--primary))] transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{p.name}</h3>
              </div>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">Min down</dt>
                  <dd className="text-lg font-bold text-primary">{p.down}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">Min credit</dt>
                  <dd className="font-semibold">{p.credit}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Best for</dt>
                  <dd className="mt-1 font-medium">{p.benefit}</dd>
                </div>
              </dl>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}