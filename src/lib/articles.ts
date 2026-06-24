export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  body: string; // markdown-ish, rendered as paragraphs/headings
  faqs?: { q: string; a: string }[];
}

export const articles: Article[] = [
  {
    slug: "first-time-home-buyer-guide",
    title: "First-Time Home Buyer Guide: From Pre-qualification to Closing",
    description: "A complete step-by-step guide for first-time buyers in the US — credit, down payment, loan programs, and closing.",
    category: "First-Time Buyers",
    readTime: "8 min read",
    date: "2025-09-15",
    body: `## Step 1: Check your credit
Most lenders want a FICO score of at least 620 for a conventional loan, or 580 for FHA. Pull your free reports from annualcreditreport.com and dispute any errors.

## Step 2: Save for the down payment
You don't need 20%. Conventional loans go as low as 3% down, FHA at 3.5%, and VA loans at 0% for eligible veterans. Just remember: under 20% means PMI.

## Step 3: Get pre-qualified, then pre-approved
Pre-qualification is a soft estimate based on what you tell us. Pre-approval is a verified letter showing exactly how much you can borrow — sellers take it seriously.

## Step 4: Shop with your agent
Your pre-approval letter sets your max budget. Stay 10–15% below it so you have room for closing costs and the unexpected.

## Step 5: Submit an offer & lock your rate
Once your offer is accepted, lock your interest rate (typically 30–60 days). This protects you from rate hikes during underwriting.

## Step 6: Underwriting & appraisal
The lender verifies your income, assets, and orders an appraisal. Don't open new credit cards or change jobs during this period.

## Step 7: Closing
You'll sign roughly 50 pages, wire your down payment + closing costs (usually 2–5% of the loan), and get the keys.
`,
    faqs: [
      { q: "How much do I need for a down payment?", a: "As little as 0% (VA), 3.5% (FHA), or 3% (conventional). 20% avoids PMI." },
      { q: "What credit score do I need?", a: "620 for conventional, 580 for FHA. Higher scores get better rates." },
      { q: "How long does the process take?", a: "Typically 30–45 days from accepted offer to closing." },
    ],
  },
  {
    slug: "fha-vs-conventional",
    title: "FHA vs. Conventional Loans: Which Is Right for You?",
    description: "Side-by-side comparison of FHA and conventional loans — down payment, credit, PMI, and loan limits.",
    category: "Loan Programs",
    readTime: "6 min read",
    date: "2025-08-22",
    body: `## The short answer
If your credit is 700+ and you have 5%+ down, **conventional** is usually cheaper long-term. If your credit is 580–680 or you have less than 5% down, **FHA** is often easier to qualify for.

## Down payment
- **FHA:** 3.5% with a 580+ score (10% if 500–579).
- **Conventional:** 3–5% for first-time buyers, 5–20% otherwise.

## Credit score
- **FHA:** 580 minimum (some lenders go to 500).
- **Conventional:** 620 minimum, 740+ for the most competitive rate options.

## Mortgage insurance
- **FHA:** Upfront MIP (1.75% of loan) plus monthly MIP for the life of the loan if you put less than 10% down.
- **Conventional:** PMI only if you put down less than 20%, and it drops off automatically at 78% LTV.

## Loan limits
Loan limits vary by county and change annually. Contact a licensed loan officer for current limits.

## When FHA wins
- Lower credit (580–680)
- Less than 5% down
- Higher debt-to-income ratio

## When conventional wins
- 700+ credit
- 10%+ down
- Want PMI to drop off eventually
`,
    faqs: [
      { q: "Can I refinance from FHA to conventional?", a: "Yes — many borrowers do this once they reach 20% equity to drop the MIP." },
      { q: "Does FHA have income limits?", a: "No, FHA has no income cap. USDA and some first-time buyer programs do." },
    ],
  },
  {
    slug: "when-to-refinance",
    title: "When Does Refinancing Actually Make Sense in 2026?",
    description: "The math behind refinancing: breakeven, lifetime savings, and the rate drop you really need.",
    category: "Refinance",
    readTime: "5 min read",
    date: "2025-11-04",
    body: `## The old "1% rule" is outdated
Conventional wisdom says you need a 1% rate drop to refinance. That's not always true — what matters is your **breakeven point** vs. how long you'll stay in the home.

## The breakeven formula
\`Breakeven (months) = Closing costs ÷ Monthly savings\`

If your closing costs are $4,500 and you save $200/mo, you break even in 23 months. Stay longer than that and you're net positive.

## When to refinance
- Rates are 0.5%+ below your current rate
- You'll stay in the home past breakeven (usually 24–36 months)
- Your credit has improved significantly
- You want to drop PMI (now that you have 20% equity)
- You want to switch from ARM to fixed

## When NOT to refinance
- You plan to sell within 2 years
- Closing costs are >3% of the loan
- You're extending the term and adding years of interest

## Cash-out refinance
If you have equity, a cash-out refi can fund renovations or pay off high-interest debt — usually at much lower rates than personal loans or HELOCs.

Run your own numbers in our [refinance calculator](/refinance) and see if it's worth it.
`,
    faqs: [
      { q: "How much does a refinance cost?", a: "Typically 2–5% of the loan amount in closing costs, though no-cost options exist (with a higher rate)." },
      { q: "Will refinancing hurt my credit?", a: "A small temporary dip from the hard pull, usually recovered within a few months." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);