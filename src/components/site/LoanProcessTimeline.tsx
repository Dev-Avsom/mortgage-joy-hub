import { ClipboardCheck, FileText, Search, Home, Key } from "lucide-react";
import { Reveal } from "./Reveal";
import { useInView } from "@/hooks/use-in-view";

const STEPS = [
  { icon: ClipboardCheck, title: "Apply", body: "Start a pre-qualification request online in minutes; subject to review." },
  { icon: FileText, title: "Pre-approve", body: "Upload docs from your phone." },
  { icon: Search, title: "Shop", body: "Hunt with a real Loan Estimate in hand." },
  { icon: Home, title: "Underwrite", body: "We verify, appraise, and clear conditions." },
  { icon: Key, title: "Close", body: "Sign, fund, and get the keys." },
];

export function LoanProcessTimeline() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">The journey</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">From <span className="gradient-text">Apply to Keys</span> in 5 Steps</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Closing timelines vary by loan type, borrower documentation, appraisal, underwriting, title, and investor requirements.</p>
        </div>
      </Reveal>

      <div ref={ref} className="relative mt-14">
        {/* Connecting line (desktop) */}
        <div className="absolute left-0 right-0 top-8 hidden h-1 rounded-full bg-border md:block">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-[var(--primary-glow,var(--primary))] origin-left transition-transform duration-[1400ms] ease-out"
            style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
          />
        </div>

        <ol className="relative grid gap-10 md:grid-cols-5 md:gap-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 140}>
              <li className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background ring-4 ring-primary shadow-[var(--shadow-card)] transition-transform hover:scale-110">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-primary">Step {i + 1}</div>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}