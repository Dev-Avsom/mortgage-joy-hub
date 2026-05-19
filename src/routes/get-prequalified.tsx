import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const DEFAULT_APPLY_URL = "https://ensurehomeloans.my1003app.com/950536/register?time=1779206112172";

export const Route = createFileRoute("/get-prequalified")({
  head: () => ({
    meta: [
      { title: "Apply Now — Ensure Home Loans" },
      { name: "description", content: "Choose your loan officer and start your mortgage application with Ensure Home Loans." },
    ],
  }),
  loader: async () => {
    const { data } = await supabase
      .from("loan_officers")
      .select("id, name, title, photo_url, nmls_id, portal_link, slug")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    return { officers: data ?? [] };
  },
  component: ChooseOfficerPage,
});

function ChooseOfficerPage() {
  const { officers } = Route.useLoaderData();
  const withLinks = officers.filter((o) => o.portal_link && o.portal_link.trim().length > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="text-center">
        <span className="eyebrow">Start your application</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Choose your <span className="gradient-text">loan officer</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Select an MLO to continue to their secure 1003 application portal.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {withLinks.map((o) => (
          <Card key={o.id} className="card-elevated overflow-hidden p-0">
            {o.photo_url && (
              <img src={o.photo_url} alt={o.name} className="h-48 w-full object-cover" loading="lazy" />
            )}
            <div className="p-5">
              <h2 className="text-lg font-semibold">{o.name}</h2>
              {o.title && <p className="text-sm gradient-text font-medium">{o.title}</p>}
              {o.nmls_id && <p className="mt-1 text-xs text-muted-foreground">NMLS #{o.nmls_id}</p>}
              <Button asChild className="mt-4 w-full">
                <a href={o.portal_link!} target="_blank" rel="noopener noreferrer">
                  Apply with {o.name.split(" ")[0]} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {withLinks.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">Continue to our general application portal.</p>
          <Button asChild className="mt-4">
            <a href={DEFAULT_APPLY_URL} target="_blank" rel="noopener noreferrer">
              Start application <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}

      {withLinks.length > 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Not sure?{" "}
          <a href={DEFAULT_APPLY_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            Use our general application
          </a>
          .
        </p>
      )}
    </div>
  );
}
