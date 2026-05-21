import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";

const STATS = [
  { to: 260, suffix: "+", label: "MLO partners" },
  { to: 29, suffix: "+", label: "States served" },
  { to: 10000, suffix: "+", label: "Families helped" },
  { to: 4.9, decimals: 1, suffix: "★", label: "Average rating" },
];

export function StatsCounters() {
  return (
    <section className="border-y bg-background py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="text-center">
                <div className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                  <AnimatedCounter to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
