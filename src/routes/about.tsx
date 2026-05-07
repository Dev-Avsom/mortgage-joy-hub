import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Award, Heart, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — HomeBridge Mortgage" },
      { name: "description", content: "Learn about HomeBridge Mortgage — a US-licensed lender helping families buy and refinance homes." },
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
    </div>
  );
}
