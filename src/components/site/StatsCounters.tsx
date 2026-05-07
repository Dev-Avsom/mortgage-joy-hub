import { Users, MapPin, Home, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";

const STATS = [
  { icon: Users, to: 250, suffix: "+", label: "MLO partners", sub: "Licensed nationwide" },
  { icon: MapPin, to: 29, suffix: "+", label: "States served", sub: "Coast to coast" },
  { icon: Home, to: 10000, suffix: "+", label: "Families helped", sub: "Into their homes" },
  { icon: Star, to: 4.9, decimals: 1, suffix: "★", label: "Average rating", sub: "1,200+ reviews" },
];

export function StatsCounters() {
  return (
    <section className="relative overflow-hidden py-20 text-white" style={{ background: "var(--gradient-hero)" }}>
      {/* Decorative soft orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full opacity-40 blur-3xl animate-blob"
        style={{ background: "var(--gradient-accent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-30 blur-3xl animate-blob"
        style={{ background: "var(--gradient-accent)", animationDelay: "4s" }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">By the numbers</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Trusted by thousands. Built to scale.</h2>
            <p className="mx-auto mt-2 max-w-xl text-white/75">
              A track record of real results — across borrowers, partners, and communities.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="group relative h-full bg-white/5 px-6 py-8 text-center transition hover:bg-white/10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white transition-transform group-hover:scale-110">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                  <AnimatedCounter to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <p className="mt-2 text-sm font-semibold text-white">{s.label}</p>
                <p className="mt-0.5 text-xs text-white/65">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
