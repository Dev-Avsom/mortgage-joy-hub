import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/licenses")({
  head: () => ({
    meta: [
      { title: "State Licenses & NMLS — HomeBridge Mortgage" },
      { name: "description", content: "HomeBridge Mortgage state licenses, NMLS Consumer Access verification, and Equal Housing Lender disclosures." },
    ],
  }),
  component: LicensesPage,
});

const STATES_LICENSED = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

function LicensesPage() {
  const nmlsNumber = siteConfig.nmlsId.replace(/\D/g, "");
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">State Licenses &amp; NMLS</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {siteConfig.brand} is a licensed mortgage lender / broker. Verify our credentials below.
      </p>

      <Card className="mt-8 p-6">
        <h2 className="text-xl font-semibold">Company NMLS</h2>
        <p className="mt-1 text-sm text-muted-foreground">Verify our company on the NMLS Consumer Access portal:</p>
        <a
          href={`https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/${nmlsNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          {siteConfig.nmlsId} — NMLS Consumer Access <ExternalLink className="h-4 w-4" />
        </a>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold">States We're Licensed In</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Licensed in all 50 states. Loan availability and terms vary by state.
        </p>
        <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
          {STATES_LICENSED.map((s) => (
            <span key={s} className="rounded border border-border bg-secondary px-2 py-1 text-center text-xs font-medium">
              {s}
            </span>
          ))}
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold">Equal Housing Lender</h2>
        <p className="mt-2 text-sm">
          {siteConfig.brand} does business in accordance with the Federal Fair Housing Law and the Equal Credit Opportunity Act. We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, age, disability, or familial status.
        </p>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold">Texas Complaint Notice</h2>
        <p className="mt-2 text-sm">
          Consumers wishing to file a complaint against a mortgage banker or licensed mortgage broker should complete and send a complaint form to the Texas Department of Savings and Mortgage Lending, 2601 N. Lamar, Suite 201, Austin, TX 78705.
        </p>
        <a href="https://www.sml.texas.gov" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Texas SML <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </Card>
    </div>
  );
}
