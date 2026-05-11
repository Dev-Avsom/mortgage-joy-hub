import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart, TrendingUp } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { GradientOrb } from "@/components/site/GradientOrb";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Ensure Home Loans" },
      { name: "description", content: "Join Ensure Home Loans. Open Roles for MLOs, ops, marketing, and tech. Remote-friendly culture." },
      { property: "og:title", content: "Careers at Ensure Home Loans" },
      { property: "og:description", content: "Build your career with a fast-growing mortgage company." },
    ],
  }),
  component: Careers,
});

const tones = ["rose", "teal", "violet"] as const;
const perks = [
  { icon: Heart, title: "Health & wellness", body: "Medical, dental, vision, plus mental health support." },
  { icon: TrendingUp, title: "Growth", body: "Learning stipend, mentorship, and clear promotion paths." },
  { icon: Briefcase, title: "Flexible work", body: "Remote-first with optional in-office hubs." },
];

function Careers() {
  return (
    <>
      <section className="relative overflow-hidden bg-mesh">
        <GradientOrb className="-top-20 right-10" color="oklch(0.72 0.14 25 / 0.4)" size={380} />
        <div className="relative mx-auto max-w-5xl px-4 py-16">
          <span className="eyebrow">We're hiring</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Build your <span className="gradient-text">career</span> with us
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            We're building the modern mortgage company. If you love solving real problems for borrowers and
            want to work with a high-trust team, we'd love to meet you.
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
        <Card className="mt-10 p-6">
        <h2 className="text-xl font-semibold">Open Roles</h2>
        <p className="mt-2 text-muted-foreground">
          We're always looking for great talent. If you're a licensed MLO, see our partner program.
          For other roles, reach out and we'll be in touch when something opens up.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild><Link to="/join">For MLOs — Join our team</Link></Button>
          <Button asChild variant="outline"><a href={`mailto:${siteConfig.email}?subject=Career inquiry`}>Email us</a></Button>
        </div>
        </Card>
      </section>
    </>
  );
}
