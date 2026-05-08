import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Newspaper, Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { GradientOrb } from "@/components/site/GradientOrb";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press & Media — Ensure Home Loans" },
      { name: "description", content: "Press inquiries, media resources, and brand assets for Ensure Home Loans." },
      { property: "og:title", content: "Press & Media — Ensure Home Loans" },
      { property: "og:description", content: "Media inquiries and brand resources." },
    ],
  }),
  component: Press,
});

function Press() {
  return (
    <>
      <section className="relative overflow-hidden bg-mesh">
        <GradientOrb className="-top-20 -right-10" color="oklch(0.65 0.15 295 / 0.4)" size={380} />
        <div className="relative mx-auto max-w-4xl px-4 py-16">
          <span className="eyebrow">Newsroom</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Press & <span className="gradient-text">Media</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            For media inquiries, interview requests, or brand assets, reach our communications team below.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card-elevated rounded-xl p-6">
            <span className="icon-chip brand"><Newspaper className="h-5 w-5" /></span>
            <h2 className="mt-4 text-lg font-semibold">Media inquiries</h2>
            <p className="mt-1 text-sm text-muted-foreground">Press, podcasts, and analyst requests.</p>
            <Button asChild className="mt-4">
              <a href={`mailto:${siteConfig.email}?subject=Media inquiry`}>Contact press team</a>
            </Button>
          </div>
          <div className="card-elevated rounded-xl p-6">
            <span className="icon-chip teal"><Download className="h-5 w-5" /></span>
            <h2 className="mt-4 text-lg font-semibold">Brand assets</h2>
            <p className="mt-1 text-sm text-muted-foreground">Logos, photos, and company fact sheet.</p>
            <Button asChild variant="outline" className="mt-4">
              <a href={`mailto:${siteConfig.email}?subject=Brand assets request`}>Request assets</a>
            </Button>
          </div>
        </div>
        <div className="gradient-border mt-8 p-6">
          <h2 className="font-semibold">About {siteConfig.brand}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {siteConfig.brand} ({siteConfig.nmlsId}) is your one-stop shop for home loans, partnering
            with 250+ licensed Mortgage Loan Originators across 29+ states and 40+ lenders to deliver
            the right loan at the right price.
          </p>
        </div>
      </section>
    </>
  );
}
