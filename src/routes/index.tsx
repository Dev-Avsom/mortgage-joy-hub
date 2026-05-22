import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, ShieldCheck, TrendingDown, ArrowRight, FileCheck, Star, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { Reviews } from "@/components/site/Reviews";
import { RateQuoteWidget } from "@/components/site/RateQuoteWidget";

import { GradientOrb } from "@/components/site/GradientOrb";
import { Reveal } from "@/components/site/Reveal";
import { useTranslation, Trans } from "react-i18next";
import { LoanProcessTimeline } from "@/components/site/LoanProcessTimeline";

import { LoanComparisonChart } from "@/components/site/LoanComparisonChart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ensure Home Loans — Your One Stop Shop for Home Loans" },
      { name: "description", content: "Ensure Home Loans (NMLS #1666674): Conventional, Non-QM, Jumbo, DSCR, Bank Statement, Hard Money, Construction & Commercial. 250+ MLO partners across 29+ states." },
      { property: "og:title", content: "Ensure Home Loans — Your One Stop Shop for Home Loans" },
      { property: "og:description", content: "Conventional, Non-QM, Jumbo, DSCR, Bank Statement, Hard Money, Construction & Commercial loans. Licensed in 29+ states with 250+ MLO partners." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden text-white animated-bg"
        style={{ background: "var(--gradient-hero)" }}
      >
        <GradientOrb className="-top-32 -left-20" color="oklch(0.78 0.14 75 / 0.55)" size={520} />
        <GradientOrb className="-bottom-32 -right-20" color="oklch(0.62 0.16 50 / 0.6)" size={460} delay={3000} />
        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="animate-fade-in-up inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-[oklch(0.84_0.13_75)]" />
                {t("home.badge", { nmls: siteConfig.nmlsId })}
              </span>
              
            </div>
            <h1 className="animate-fade-in-up mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl" style={{ animationDelay: "120ms" }}>
              {t("home.heroTitle1")}{" "}
              <span className="relative inline-block text-[oklch(0.84_0.13_75)]">
                {t("home.heroTitle2")}
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none" fill="none">
                  <path d="M2 5 Q 50 1, 100 4 T 198 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55"/>
                </svg>
              </span>
              .
            </h1>
            <p className="animate-fade-in-up mt-5 max-w-xl text-lg text-white/85" style={{ animationDelay: "240ms" }}>
              <Trans i18nKey="home.heroSub" components={{ strong: <strong /> }} />
            </p>
            <ul className="animate-fade-in-up mt-5 grid max-w-md gap-2 text-sm text-white/85" style={{ animationDelay: "300ms" }}>
              {[t("home.bullet1"), t("home.bullet2"), t("home.bullet3")].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.84_0.13_75)]" /> {b}
                </li>
              ))}
            </ul>
            <div className="animate-fade-in-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
              <Button asChild size="lg" className="glow-on-hover bg-[oklch(0.84_0.13_75)] text-[oklch(0.2_0.05_255)] hover:opacity-90">
                <Link to="/get-prequalified">
                  <FileCheck className="mr-2 h-5 w-5" /> {t("common.getPrequalified")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Link to="/find-officer">
                  <Users className="mr-2 h-5 w-5" /> {t("common.findOfficer")}
                </Link>
              </Button>
            </div>
            <div className="animate-fade-in-up mt-8 flex flex-wrap items-center gap-5 border-t border-white/15 pt-6 text-sm" style={{ animationDelay: "480ms" }}>
              <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[
                  { bg: "oklch(0.84 0.13 75)", initials: "SM" },
                  { bg: "oklch(0.7 0.15 30)", initials: "DR" },
                  { bg: "oklch(0.65 0.18 260)", initials: "AK" },
                  { bg: "oklch(0.7 0.15 180)", initials: "MJ" },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[oklch(0.2_0.05_255)] text-[10px] font-bold text-white/95"
                    style={{ background: a.bg }}
                  >
                    {a.initials}
                  </div>
                ))}
              </div>
                <div className="text-white/85">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[oklch(0.84_0.13_75)] text-[oklch(0.84_0.13_75)]" />)}
                    <span className="ml-1 font-semibold">4.9</span>
                  </div>
                  <div className="text-xs text-white/65">{t("home.rated")}</div>
                </div>
              </div>
              <div className="hidden h-10 w-px bg-white/15 sm:block" />
              <div className="flex items-center gap-2 text-white/85">
                <TrendingUp className="h-5 w-5 text-[oklch(0.84_0.13_75)]" />
                <div>
                  <div className="font-semibold">
                    <span className="rounded-md bg-[oklch(0.84_0.13_75)] px-1.5 py-0.5 text-[oklch(0.2_0.05_255)]">
                      Nearing
                    </span>{" "}
                    {t("home.funded")}
                  </div>
                  <div className="text-xs text-white/65">{t("home.fundedSub")}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="animate-scale-in relative" style={{ animationDelay: "300ms" }}>
            <div aria-hidden className="absolute -inset-3 rounded-3xl bg-white/5 blur-2xl" />
            <div className="relative">
              <RateQuoteWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("home.whyUs")}</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {t("home.smarterTitle1")}<span className="gradient-text">{t("home.smarterTitle2")}</span>
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: TrendingDown, title: t("home.valueProps.ratesTitle"), body: t("home.valueProps.ratesBody"), tone: "brand" },
            { icon: ShieldCheck, title: t("home.valueProps.noSurpriseTitle"), body: t("home.valueProps.noSurpriseBody"), tone: "teal" },
            { icon: Users, title: t("home.valueProps.humansTitle"), body: t("home.valueProps.humansBody"), tone: "gold" },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="card-elevated rounded-xl p-7 h-full">
                <span className={`icon-chip ${v.tone}`}><v.icon className="h-5 w-5" /></span>
                <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Loan comparison infographic */}
      <section className="bg-secondary/40">
        <LoanComparisonChart />
        <div className="mx-auto max-w-7xl px-4 pb-12 text-center">
          <Link to="/loan-programs" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            {t("home.viewAllPrograms")} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Process timeline */}
      <LoanProcessTimeline />

      {/* Social proof */}
      <Reviews />

      {/* Final CTA banner */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="cta-banner flex flex-wrap items-center justify-between gap-6 p-8 md:p-12">
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl font-bold leading-tight md:text-4xl">{t("home.ctaTitle")}</h3>
            <p className="mt-2 text-primary-foreground/85">{t("home.ctaSub")}</p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[oklch(0.84_0.13_75)] text-[oklch(0.2_0.05_40)] hover:opacity-90">
              <Link to="/get-prequalified"><FileCheck className="mr-2 h-5 w-5" /> {t("common.getPrequalified")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <Link to="/calculator">{t("common.tryCalculator")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
