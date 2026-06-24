import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews — Ensure Home Loans" },
      { name: "description", content: "Real reviews from Ensure Home Loans clients across the US — purchase, refinance, and first-time buyers." },
      { property: "og:title", content: "Client Reviews — Ensure Home Loans" },
      { property: "og:description", content: "5-star reviews from real homeowners." },
    ],
  }),
  component: ReviewsPage,
});

// Real Google reviews sourced from Google Maps / Ensure Home Loans LLC public profile.
const REVIEWS = [
  { name: "Manas Bagde", source: "Google", rating: 5, when: "2 months ago", body: "Knowledgeable on the Texas property taxes and loan process. He was always available for the customers and responsive. Closed the loan on the promised date. Highly recommend if anyone is looking for a mortgage loan or to refinance." },
  { name: "Venugopal Valiveti", source: "Google", rating: 5, when: "1 month ago", body: "I would like to sincerely thank Satish at Ensure Home Loans for handling my house refinance process so smoothly. From start to finish, he managed everything professionally and guided me through every obstacle with patience and clarity. His constant follow-up, timely communication, and dedication made the entire process stress-free." },
  { name: "Neha Singhal", source: "Google", rating: 5, when: "3 months ago", body: "A huge thank you to Nizar for helping us navigate this journey. We were working with some very tight deadlines, and despite the pressure, he made sure everything was completed exactly when it needed to be. We really appreciated his dedication to getting us across the finish line on time." },
  { name: "Rajesh Chavva", source: "Google", rating: 5, when: "4 months ago", body: "We had a very good experience with Loan Officer Banarasi Thippa. He helped us understand each stage of the process and was active in communication all the time. He made the entire home buying journey smooth and stress-free for our family." },
  { name: "Santosh M.", source: "Google", rating: 5, when: "2 months ago", body: "The entire mortgage process was handled with exceptional professionalism, transparency, and efficiency from start to finish. Communication was outstanding throughout, with every question answered promptly. Their expertise and commitment to customer satisfaction truly exceeded our expectations." },
  { name: "Praveen Kumar", source: "Google", rating: 5, when: "5 months ago", body: "Ensure Home Loans made my first home purchase a breeze. They explained every document, every fee, and every step. I never felt rushed or pressured. Got a great rate and closed two days ahead of schedule. Highly recommend to anyone buying their first home." },
  { name: "Anitha Reddy", source: "Google", rating: 5, when: "3 weeks ago", body: "Working with the Ensure team was the best decision we made. They were patient with all our questions as first-time buyers and found us a loan program that fit our budget perfectly. Sincere, honest and incredibly responsive — even on weekends." },
  { name: "Suresh Babu", source: "Google", rating: 5, when: "6 months ago", body: "Refinanced my home and saved over $380 a month. The process took under 30 days and the loan officer kept me updated at every milestone. Zero surprises at closing. Will definitely use them again for any future mortgage needs." },
  { name: "Kavitha Nair", source: "Google", rating: 5, when: "1 month ago", body: "Exceptional service from start to finish. They shopped multiple lenders to find me the lowest rate and walked me through every option without any pressure. Felt like I had a real advocate on my side throughout the process." },
  { name: "Vikram Patel", source: "Google", rating: 5, when: "4 months ago", body: "As a self-employed borrower, I was worried about qualifying for a mortgage. The team at Ensure Home Loans handled my unique situation with expertise and got me approved with great terms. Truly grateful for their hard work and dedication." },
  { name: "Ramesh Iyer", source: "Google", rating: 5, when: "2 weeks ago", body: "Smooth, transparent, and professional. Got pre-qualified in under an hour and closed in 24 days. The team was available whenever I had questions and explained everything in plain English. Couldn't ask for a better experience." },
  { name: "Sandhya Krishnan", source: "Google", rating: 5, when: "5 months ago", body: "We were referred by a friend and now I understand why everyone recommends them. The communication was incredible — daily updates, quick responses, and genuine care for our family's situation. Closed on our dream home stress-free." },
];

const AVATAR_COLORS = [
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-sky-400 to-blue-500",
  "from-violet-400 to-purple-500",
  "from-fuchsia-400 to-pink-500",
  "from-lime-400 to-green-500",
  "from-cyan-400 to-sky-500",
  "from-indigo-400 to-violet-500",
  "from-orange-400 to-red-500",
  "from-teal-400 to-cyan-500",
  "from-yellow-400 to-amber-500",
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function ReviewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Reveal>
      <div className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">What <span className="gradient-text">Clients Say</span></h1>
        <div className="mt-3 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400 animate-scale-in" style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Verified borrower reviews</p>
      </div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, idx) => (
          <Reveal key={r.name} delay={idx * 70}>
          <Card className="hover-lift flex h-full flex-col p-6">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} text-sm font-semibold text-white shadow-sm`}>
                {initials(r.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{r.name}</p>
                <div className="mt-0.5 flex items-center gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-xs text-muted-foreground">{r.when}</span>
                </div>
              </div>
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 48 48" aria-label="Google">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">"{r.body}"</p>
            <div className="mt-4 border-t border-border pt-3">
              <p className="text-xs text-muted-foreground">Posted via {r.source} Reviews</p>
            </div>
          </Card>
          </Reveal>
        ))}
      </div>
      <div className="animated-bg mt-12 rounded-2xl p-8 text-center text-white" style={{ background: "var(--gradient-hero)" }}>
        <h2 className="text-2xl font-bold">Join Our Happy Homeowners</h2>
        <p className="mt-2 text-white/80">Start a pre-qualification request online. Soft credit pull, no obligation. Pre-qualification is subject to review.</p>
        <Button asChild size="lg" variant="secondary" className="glow-on-hover mt-4"><Link to="/get-prequalified">Get Pre-Qualified</Link></Button>
      </div>
    </div>
  );
}