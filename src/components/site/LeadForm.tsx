import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { notifySubmission } from "@/lib/notify";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(32).optional(),
  message: z.string().trim().max(2000).optional(),
});

interface Props {
  source: string;
  loanOfficerId?: string;
  calcInputs?: unknown;
  calcResults?: unknown;
  showMessage?: boolean;
  submitLabel?: string;
  onSuccess?: () => void;
}

export function LeadForm({
  source,
  loanOfficerId,
  calcInputs,
  calcResults,
  showMessage = true,
  submitLabel = "Get in touch",
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone") || undefined,
      message: fd.get("message") || undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      message: parsed.data.message ?? null,
      source,
      loan_officer_id: loanOfficerId ?? null,
      calc_inputs: (calcInputs as never) ?? null,
      calc_results: (calcResults as never) ?? null,
    });
    setLoading(false);
    if (error) {
      toast.error("Could not submit — please try again.");
      return;
    }
    void notifySubmission({
      source: source,
      subject: `New lead — ${source}`,
      fields: {
        Name: parsed.data.name,
        Email: parsed.data.email,
        Phone: parsed.data.phone ?? "",
        Source: source,
        "Loan Officer ID": loanOfficerId ?? "",
      },
      message: parsed.data.message,
    });
    toast.success("Thanks! We'll be in touch shortly.");
    (e.target as HTMLFormElement).reset();
    onSuccess?.();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" required maxLength={100} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required maxLength={255} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" maxLength={32} />
        </div>
      </div>
      {showMessage && (
        <div>
          <Label htmlFor="message">How can we help?</Label>
          <Textarea id="message" name="message" rows={3} maxLength={2000} />
        </div>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
