import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

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
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Press & Media</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        For media inquiries, interview requests, or brand assets, reach our communications team below.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <Newspaper className="h-6 w-6 text-primary" />
          <h2 className="mt-3 font-semibold">Media inquiries</h2>
          <p className="mt-1 text-sm text-muted-foreground">Press, podcasts, and analyst requests.</p>
          <Button asChild className="mt-4">
            <a href={`mailto:${siteConfig.email}?subject=Media inquiry`}>Contact press team</a>
          </Button>
        </Card>
        <Card className="p-6">
          <Download className="h-6 w-6 text-primary" />
          <h2 className="mt-3 font-semibold">Brand assets</h2>
          <p className="mt-1 text-sm text-muted-foreground">Logos, photos, and company fact sheet.</p>
          <Button asChild variant="outline" className="mt-4">
            <a href={`mailto:${siteConfig.email}?subject=Brand assets request`}>Request assets</a>
          </Button>
        </Card>
      </div>

      <Card className="mt-8 p-6">
        <h2 className="font-semibold">About {siteConfig.brand}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {siteConfig.brand} ({siteConfig.nmlsId}) is your one-stop shop for home loans, partnering
          with 250+ licensed Mortgage Loan Originators across 29+ states and 40+ lenders to deliver
          the right loan at the right price.
        </p>
      </Card>
    </div>
  );
}
