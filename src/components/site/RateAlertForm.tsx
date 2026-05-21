import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BellRing } from "lucide-react";
import { notifySubmission } from "@/lib/notify";

const schema = z.object({
  email: z.string().trim().email().max(255),
  target_rate: z.number().positive().max(20),
  zip: z.string().trim().max(10).optional(),
});

export function RateAlertForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      email: fd.get("email"),
      target_rate: Number(fd.get("target_rate")),
      zip: (fd.get("zip") as string) || undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check your inputs");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("rate_alerts").insert({
      email: parsed.data.email,
      target_rate: parsed.data.target_rate,
      zip: parsed.data.zip ?? null,
      loan_type: "30yr_fixed",
    });
    setLoading(false);
    if (error) {
      toast.error("Could not save your alert. Please try again.");
      return;
    }
    void notifySubmission({
      source: "rate-alert",
      subject: "New rate alert subscription",
      fields: {
        Email: parsed.data.email,
        "Target Rate": `${parsed.data.target_rate}%`,
        ZIP: parsed.data.zip ?? "",
        "Loan Type": "30yr fixed",
      },
    });
    toast.success("Alert set! We'll email you when rates hit your target.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
          <BellRing className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Set a Rate Alert</h3>
          <p className="text-sm text-muted-foreground">Get notified the moment 30-year fixed hits your target.</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-[1fr,140px,120px,auto]">
        <div>
          <Label htmlFor="ra-email" className="sr-only">Email</Label>
          <Input id="ra-email" name="email" type="email" required placeholder="you@email.com" maxLength={255} />
        </div>
        <div>
          <Label htmlFor="ra-rate" className="sr-only">Target rate</Label>
          <Input id="ra-rate" name="target_rate" type="number" step="0.125" min="1" max="15" required placeholder="6.000%" />
        </div>
        <div>
          <Label htmlFor="ra-zip" className="sr-only">ZIP</Label>
          <Input id="ra-zip" name="zip" inputMode="numeric" maxLength={5} placeholder="ZIP" />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Saving…" : "Notify me"}</Button>
      </form>
    </div>
  );
}
