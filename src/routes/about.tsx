import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Heart, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — HomeBridge Mortgage" },
      { name: "description", content: "Learn about HomeBridge Mortgage — a US-licensed lender helping families buy and refinance homes." },
      { property: "og:title", content: "About HomeBridge Mortgage" },
      { property: "og:description", content: "A US-licensed lender on a mission to make home financing simple." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">About HomeBridge Mortgage</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        We're a US-licensed mortgage lender on a mission to make home financing
        feel less like paperwork and more like progress. Since 2008, we've helped
        thousands of families purchase, refinance, and build wealth through real estate.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { stat: "$12B+", label: "Loans funded" },
          { stat: "47", label: "States licensed" },
          { stat: "350+", label: "Team members" },
        ].map((s) => (
          <Card key={s.label} className="p-5 text-center">
            <p className="text-3xl font-bold text-primary">{s.stat}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          { icon: Heart, title: "People first", body: "Every borrower talks to a real, licensed loan officer — never a chatbot." },
          { icon: ShieldCheck, title: "Transparent", body: "Clear costs, honest timelines, and no surprises at closing." },
          { icon: Award, title: "Award-winning", body: "Recognized for service, speed, and competitive pricing nationwide." },
        ].map((v) => (
          <Card key={v.title} className="p-6">
            <v.icon className="h-9 w-9 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
          </Card>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Leadership</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            { name: "David Park", role: "CEO & Co-Founder", bio: "20+ years in mortgage banking. Previously SVP at a top-10 US lender." },
            { name: "Maya Sullivan", role: "President", bio: "Operations and capital markets veteran focused on closing speed and pricing." },
            { name: "Rahul Mehta", role: "Chief Lending Officer", bio: "Leads underwriting, credit policy, and product. Champions non-QM innovation." },
          ].map((p) => (
            <Card key={p.name} className="p-6">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                {p.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <p className="mt-3 font-semibold">{p.name}</p>
              <p className="text-xs uppercase text-muted-foreground">{p.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.bio}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Licensing</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {siteConfig.brand} is a state-licensed mortgage lender. {siteConfig.nmlsId}.
          Verify our license and view all state authorizations at the{" "}
          <a className="text-primary hover:underline" href="https://www.nmlsconsumeraccess.org/" target="_blank" rel="noopener noreferrer">NMLS Consumer Access portal</a>.
        </p>
      </section>

      <div className="mt-12 rounded-2xl p-8 text-white" style={{ background: "var(--gradient-hero)" }}>
        <h2 className="text-2xl font-bold">Work with a team that puts you first</h2>
        <p className="mt-2 text-white/80">Get pre-qualified or talk to a loan officer today.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild size="lg" variant="secondary"><Link to="/get-prequalified">Get pre-qualified</Link></Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10"><Link to="/contact">Contact us</Link></Button>
        </div>
      </div>
    </div>
  );
}
