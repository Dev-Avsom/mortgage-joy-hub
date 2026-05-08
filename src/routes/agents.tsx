import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Handshake, Clock, FileCheck } from "lucide-react";
import { GradientOrb } from "@/components/site/GradientOrb";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agent Partners — Ensure Home Loans" },
      { name: "description", content: "Real estate agent partner program. Fast pre-approvals, on-time closings, dedicated MLO support for your clients." },
      { property: "og:title", content: "Agent Partner Program" },
      { property: "og:description", content: "Win more deals with same-day pre-approvals and on-time closings." },
    ],
  }),
  component: Agents,
});

const tones = ["brand", "teal", "gold"] as const;
const perks = [
  { icon: Clock, title: "Same-day pre-approvals", body: "Quick, reliable letters so your buyers can write competitive offers fast." },
  { icon: FileCheck, title: "On-time closings", body: "Clear-to-close in 14–21 days on most loans. We hit the dates we promise." },
  { icon: Handshake, title: "Dedicated MLO", body: "One point of contact for you and your client — not a call center." },
];

function Agents() {
  return (
    <>
      <section className="relative overflow-hidden bg-mesh">
        <GradientOrb className="-top-20 right-0" color="oklch(0.68 0.11 195 / 0.4)" size={380} />
        <div className="relative mx-auto max-w-5xl px-4 py-16">
          <span className="eyebrow">For real estate agents</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Agent <span className="gradient-text">Partner Program</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Partner with Ensure Home Loans and give your clients a smoother path to closing. Faster
            approvals, real communication, and on-time funding.
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
            <h3 className="text-2xl font-bold">Become a partner agent</h3>
            <p className="mt-1 text-primary-foreground/80">We'll match you with an MLO in your market.</p>
          </div>
          <div className="relative z-10 flex gap-2">
            <Button asChild className="bg-[oklch(0.84_0.13_75)] text-[oklch(0.2_0.05_40)] hover:opacity-90"><Link to="/contact">Get in touch</Link></Button>
            <Button asChild variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20"><a href={`mailto:${siteConfig.email}?subject=Agent partner inquiry`}>Email us</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
