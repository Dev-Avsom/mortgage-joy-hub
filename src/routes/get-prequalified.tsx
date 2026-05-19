import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const APPLY_URL = "https://ensurehomeloans.my1003app.com/950536/register?time=1779206112172";

export const Route = createFileRoute("/get-prequalified")({
  head: () => ({
    meta: [
      { title: "Apply Now — Ensure Home Loans" },
      { name: "description", content: "Start your mortgage application with Ensure Home Loans." },
    ],
  }),
  component: PrequalRedirect,
});

function PrequalRedirect() {
  useEffect(() => {
    window.location.replace(APPLY_URL);
  }, []);
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-muted-foreground">
        Redirecting you to our secure application…{" "}
        <a href={APPLY_URL} className="text-primary underline">Click here if not redirected</a>.
      </p>
    </div>
  );
}

const purposes = ["Buying my first home", "Buying a new home", "Refinancing", "Just exploring"];
const propertyTypes = ["Single family", "Condo / Townhome", "Multi-family", "Other"];
const timeframes = ["ASAP (0–3 months)", "3–6 months", "6–12 months", "Just researching"];
const creditRanges = ["Excellent (740+)", "Good (700–739)", "Fair (640–699)", "Below 640", "Not sure"];

const finalSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(32),
});

type Answers = {
  purpose?: string;
  propertyType?: string;
  timeframe?: string;
  priceRange?: string;
  downPayment?: string;
  income?: string;
  credit?: string;
  state?: string;
};

function PrequalPage() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = ((step + 1) / (totalSteps + 1)) * 100;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    const parsed = finalSchema.safeParse(contact);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please fill all fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      source: "prequal-wizard",
      message: `Pre-qual: ${a.purpose} | ${a.propertyType} | ${a.timeframe} | Price ${a.priceRange} | Down ${a.downPayment} | Income ${a.income} | Credit ${a.credit} | State ${a.state}`,
      calc_inputs: a as never,
    });
    setLoading(false);
    if (error) {
      toast.error("Could not submit — please try again.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-[oklch(0.62_0.16_150)]" />
        <h1 className="mt-6 text-3xl font-bold">You're Pre-Qualified to Talk!</h1>
        <p className="mt-3 text-muted-foreground">
          A licensed loan officer will reach out within 1 business hour with personalized rates and next steps.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => navigate({ to: "/calculator" })}>Try the calculator</Button>
          <Button variant="outline" onClick={() => navigate({ to: "/loan-programs" })}>Explore loan programs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Get Pre-Qualified</h1>
        <p className="mt-2 text-muted-foreground">
          Takes about 60 seconds. No credit pull, no obligation.
        </p>
      </div>

      <Progress value={progress} className="mb-6" />

      <Card className="p-6 md:p-8">
        {step === 0 && (
          <Step icon={<Home />} title="What are you looking to do?">
            <Choices value={a.purpose} options={purposes} onSelect={(v) => { setA({ ...a, purpose: v }); next(); }} />
          </Step>
        )}

        {step === 1 && (
          <Step icon={<Home />} title="What type of property?">
            <Choices value={a.propertyType} options={propertyTypes} onSelect={(v) => { setA({ ...a, propertyType: v }); next(); }} />
            <BelowRow>
              <Field label="When do you plan to buy?">
                <Choices small value={a.timeframe} options={timeframes} onSelect={(v) => setA({ ...a, timeframe: v })} />
              </Field>
            </BelowRow>
          </Step>
        )}

        {step === 2 && (
          <Step icon={<DollarSign />} title="Price & down payment">
            <Field label="Estimated home price">
              <Input
                type="number"
                placeholder="450000"
                value={a.priceRange ?? ""}
                onChange={(e) => setA({ ...a, priceRange: e.target.value })}
              />
            </Field>
            <Field label="Down payment available">
              <Input
                type="number"
                placeholder="90000"
                value={a.downPayment ?? ""}
                onChange={(e) => setA({ ...a, downPayment: e.target.value })}
              />
            </Field>
            <Field label="State">
              <Input
                placeholder="TX"
                maxLength={2}
                value={a.state ?? ""}
                onChange={(e) => setA({ ...a, state: e.target.value.toUpperCase() })}
              />
            </Field>
          </Step>
        )}

        {step === 3 && (
          <Step icon={<DollarSign />} title="Income & credit">
            <Field label="Annual household income">
              <Input
                type="number"
                placeholder="120000"
                value={a.income ?? ""}
                onChange={(e) => setA({ ...a, income: e.target.value })}
              />
            </Field>
            <Field label="Estimated credit score">
              <Choices small value={a.credit} options={creditRanges} onSelect={(v) => setA({ ...a, credit: v })} />
            </Field>
          </Step>
        )}

        {step === 4 && (
          <Step icon={<User />} title="Where should we send your results?">
            <Field label="Full name">
              <Input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
            </Field>
            <Field label="Email">
              <Input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
            </Field>
            <p className="text-xs text-muted-foreground">
              <Mail className="mr-1 inline h-3 w-3" />
              By submitting, you agree to be contacted about loan products. No spam.
            </p>
          </Step>
        )}

        <div className="mt-8 flex justify-between">
          <Button variant="ghost" onClick={prev} disabled={step === 0}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          {step < 4 ? (
            <Button onClick={next}>
              Next <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={submit} disabled={loading}>
              {loading ? "Submitting…" : "Get my results"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function Step({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-primary">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/10">{icon}</div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function BelowRow({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 border-t border-border pt-6">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
    </div>
  );
}

function Choices({
  value, options, onSelect, small,
}: { value?: string; options: string[]; onSelect: (v: string) => void; small?: boolean }) {
  return (
    <div className={`grid gap-2 ${small ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onSelect(o)}
          className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
            value === o
              ? "border-primary bg-primary/5 font-medium text-primary"
              : "border-border hover:border-primary/50 hover:bg-secondary"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}