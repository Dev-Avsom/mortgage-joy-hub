import { Reveal } from "./Reveal";
import { ShieldCheck, Network, Users, Star } from "lucide-react";

const STATS = [
  { icon: ShieldCheck, label: "Licensed in multiple states" },
  { icon: Network, label: "Approved wholesale lender network" },
  { icon: Users, label: "Licensed Mortgage Loan Originators" },
  { icon: Star, label: "Verified borrower reviews" },
];

export function StatsCounters() {
  return (
    <section className="border-y bg-background py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="text-center">
                <s.icon className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">Licensing information is available through NMLS Consumer Access.</p>
      </div>
    </section>
  );
}
