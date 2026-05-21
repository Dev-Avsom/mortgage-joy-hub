import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Heart, ShieldCheck, Building2, Users, Cpu, Handshake, Compass, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { StatsCounters } from "@/components/site/StatsCounters";
import { Reveal } from "@/components/site/Reveal";
import { GradientOrb } from "@/components/site/GradientOrb";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ensure Home Loans" },
      { name: "description", content: "Ensure Home Loans (NMLS #1666674) — your one stop shop for home loans. 250+ MLO partners across 29+ states, backed by 40+ reputable lenders." },
      { property: "og:title", content: "About Ensure Home Loans" },
      { property: "og:description", content: "250+ MLO partners. 29+ states. 40+ lender relationships." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const tones = ["brand", "gold", "teal"] as const;
  return (
    <div>
      <section className="relative overflow-hidden bg-mesh">
        <GradientOrb className="-top-20 -left-10" color="oklch(0.82 0.14 80 / 0.45)" size={420} />
        <GradientOrb className="-top-10 right-0" color="oklch(0.68 0.11 195 / 0.4)" size={360} delay={2000} />
        <div className="relative mx-auto max-w-5xl px-4 py-16">
          <Reveal>
            <span className="eyebrow">About us</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">About <span className="gradient-text">Ensure Home Loans</span></h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              Ensure Home Loans is your one stop shop for home loans. We partner with 250+ licensed
              Mortgage Loan Originators across 29+ states, backed by 40+ reputable lender relationships —
              so every borrower gets the right loan at the right price, the first time.
            </p>
          </Reveal>
        </div>
      </section>

      <StatsCounters />

      <section className="relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-secondary/30 via-background to-background">
        <GradientOrb className="top-10 -right-20" color="oklch(0.68 0.11 195 / 0.25)" size={380} />
        <div className="relative mx-auto max-w-5xl px-4 py-16">
          <Reveal>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Built in Texas. <span className="gradient-text">Engineered for trust.</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <blockquote className="mt-8 rounded-2xl border-l-4 border-primary bg-card/60 p-6 text-lg italic leading-relaxed text-foreground/90 shadow-sm md:text-xl">
              Ensure Home Loans was founded with a clear mission: to give borrowers, referral partners,
              and mortgage professionals a modern, service-driven lending platform built on speed,
              transparency, compliance, and long-term relationships.
            </blockquote>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { icon: Compass, tone: "brand", title: "A Texas-rooted mission", body: "Established in Texas, the company was built around a simple belief: the mortgage process should pair strong operational systems with personalized customer service — so clients can navigate one of the most important financial decisions of their lives with confidence and clarity." },
              { icon: Users, tone: "teal", title: "A culture of accountability", body: "From the start, Ensure Home Loans focused on accountability, professionalism, and growth — bringing together experienced loan originators, operations professionals, processors, and compliance personnel united by a common goal: efficient, ethical mortgage solutions." },
              { icon: Cpu, tone: "gold", title: "Technology + compliance", body: "As the industry evolved, we invested heavily in operational infrastructure, compliance oversight, and marketing innovation — embracing digital lending tools, social outreach, and modern communication platforms while holding firm to strict regulatory standards." },
              { icon: Building2, tone: "brand", title: "Built to scale", body: "We expanded beyond traditional origination with internal initiatives for production efficiency, processor performance tracking, recruitment, and coordinated marketing — scalable systems designed to support growth across multiple markets." },
              { icon: Handshake, tone: "teal", title: "Deep lender network", body: "Strong relationships with wholesale lenders and industry organizations let us offer a broad range of products tailored to first-time buyers, investors, self-employed borrowers, and clients seeking specialized financing — flexible, responsive, and borrower-focused." },
              { icon: Sparkles, tone: "gold", title: "Leadership & execution", body: "Motivation, teamwork, and execution define our culture. Leadership initiatives reinforce accountability, punctuality, and continuous improvement — attracting professionals committed to high performance in the mortgage industry." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="card-elevated h-full rounded-xl p-6">
                  <span className={`icon-chip ${item.tone}`}><item.icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-10 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-background p-6 md:p-8">
              <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
                Today, Ensure Home Loans continues to operate as a forward-looking mortgage company focused on
                expansion, innovation, and service. By combining experienced leadership, operational discipline,
                compliance-focused practices, and modern marketing strategies, we work toward our long-term
                objective of becoming a <span className="gradient-text font-semibold">nationally recognized mortgage platform</span> —
                known for reliability, efficiency, and professional excellence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
      <SectionHeading eyebrow="What sets us apart" title="A different kind of mortgage company" gradientWords="mortgage company" />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { icon: Heart, title: "MLO-first model", body: "We don't employ — we partner with MLOs. That means more flexibility, better pricing, and personal service." },
          { icon: ShieldCheck, title: "Every loan, one place", body: "Conventional, Non-QM, Jumbo, DSCR, Bank Statement, Hard Money, Construction, Commercial — you name it." },
          { icon: Award, title: "40+ lender network", body: "We shop your loan across our entire network so you always get the sharpest rate and structure." },
        ].map((v, i) => (
          <Reveal key={v.title} delay={i * 100}>
            <div className="card-elevated rounded-xl p-6 h-full">
              <span className={`icon-chip ${tones[i]}`}><v.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">What We Offer</h2>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {["Conventional", "Non-QM", "Jumbo", "DSCR", "Self-Employment", "Investment Homes", "Bank Statement", "Hard Money", "Construction", "Commercial"].map((p) => (
            <span key={p} className="rounded-full border border-border bg-secondary/50 px-3 py-1 transition hover:scale-105 hover:border-primary hover:text-primary">{p}</span>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">You name it, and we will get it for you.</p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Licensing</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {siteConfig.brand} is a state-licensed mortgage lender. {siteConfig.nmlsId}.
          Verify our license and view all state authorizations at the{" "}
          <a className="text-primary hover:underline" href="https://www.nmlsconsumeraccess.org/" target="_blank" rel="noopener noreferrer">NMLS Consumer Access portal</a>.
        </p>
      </section>

      <div className="cta-banner relative mt-12 p-8 md:p-10">
        <div className="relative z-10">
        <h2 className="text-2xl font-bold">Want to Partner With Us as an MLO?</h2>
          <p className="mt-2 text-primary-foreground/80">Join 250+ MLOs across 29+ states. Or talk to us about your home loan today.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild size="lg" className="bg-[oklch(0.84_0.13_75)] text-[oklch(0.2_0.05_40)] hover:opacity-90"><Link to="/join">Become an MLO partner</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10"><Link to="/contact">Contact us</Link></Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
