import { Users, MapPin, Home, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";

const STATS = [
  { icon: Users, to: 250, suffix: "+", label: "MLO partners" },
  { icon: MapPin, to: 29, suffix: "+", label: "States served" },
  { icon: Home, to: 10000, suffix: "+", label: "Families helped" },
  { icon: Star, to: 4.9, decimals: 1, suffix: "★", label: "Average rating" },
];

export function StatsCounters() {
  return (
    <section className="relative overflow-hidden py-16">
      <div
        className="absolute inset-0 -z-10 opacity-60 animated-bg"
        style={{ background: "var(--gradient-accent)" }}
      />
      <div className="absolute inset-0 -z-10 bg-background/70" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="glass rounded-2xl p-6 text-center hover-lift">
                <s.icon className="mx-auto h-8 w-8 text-primary" />
                <div className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
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