import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Building2, Wrench, BadgeCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { GradientOrb } from "@/components/site/GradientOrb";

export const Route = createFileRoute("/builders")({
  head: () => ({
    meta: [
      { title: "Builder Partners — Ensure Home Loans" },
      { name: "description", content: "Builder partner program: extended rate locks, construction-to-perm financing, and on-site MLO support for your buyers." },
      { property: "og:title", content: "Builder Partner Program" },
      { property: "og:description", content: "Extended locks, new-construction expertise, and dedicated MLO support." },
    ],
  }),
  component: Builders,
});

const tones = ["gold", "rose", "violet"] as const;
const perks = [
  { icon: BadgeCheck, title: "Extended rate locks", body: "Up to 360-day locks for new construction so buyers stay confident through build." },
  { icon: Wrench, title: "Construction-to-perm", body: "Single-close construction financing that converts to a permanent mortgage." },
  { icon: Building2, title: "Dedicated MLO", body: "On-site availability for sales centers and joint marketing programs." },
];

function Builders() {
  return (
    <>
      <section className="relative overflow-hidden bg-mesh">
        <GradientOrb className="-top-20 -left-10" color="oklch(0.82 0.14 80 / 0.4)" size={400} />
        <div className="relative mx-auto max-w-5xl px-4 py-16">
          <span className="eyebrow">For builders</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Builder <span className="gradient-text">Partner Program</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Built for production builders and custom builders alike. We help your buyers lock with
            confidence and close on time, every time.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {perks.map((p, i) => (
            <div key={p.title} className="card-elevated rounded-xl p-6">
              <span className={`icon-chip ${tones[i]}`}><p.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="cta-banner mt-12 flex flex-wrap items-center justify-between gap-4 p-8">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold">Partner with us</h3>
            <p className="mt-1 text-primary-foreground/80">Let's discuss a program tailored to your communities.</p>
          </div>
          <div className="relative z-10 flex gap-2">
            <Button asChild className="bg-[oklch(0.84_0.13_75)] text-[oklch(0.2_0.05_40)] hover:opacity-90"><Link to="/contact">Get in touch</Link></Button>
            <Button asChild variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20"><a href={`mailto:${siteConfig.email}?subject=Builder partner inquiry`}>Email us</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
