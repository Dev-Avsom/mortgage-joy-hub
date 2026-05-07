export interface LoanProgram {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  bestFor: string[];
  highlights: { label: string; value: string }[];
  requirements: string[];
  pros: string[];
  cons: string[];
  faqs: { q: string; a: string }[];
}

export const LOAN_PROGRAMS: LoanProgram[] = [
  {
    slug: "conventional",
    name: "Conventional Loan",
    shortName: "Conventional",
    tagline: "The most popular loan in America — flexible, competitive, and built for the long haul.",
    description:
      "Conventional loans are mortgages not backed by a government agency. They follow guidelines set by Fannie Mae and Freddie Mac and offer the broadest range of terms, down payments, and property types.",
    bestFor: ["Buyers with 620+ credit", "Steady W‑2 or self‑employed income", "Primary, second home, or investment"],
    highlights: [
      { label: "Min down payment", value: "3%" },
      { label: "Min credit score", value: "620" },
      { label: "Max loan (2025)", value: "$806,500" },
      { label: "PMI", value: "Removable at 80% LTV" },
    ],
    requirements: [
      "Credit score 620 or higher",
      "Debt‑to‑income ratio typically under 45%",
      "2 years of stable employment history",
      "Down payment from savings, gift funds, or sale proceeds",
    ],
    pros: ["No upfront mortgage insurance", "PMI drops off automatically at 78% LTV", "Available on 1‑4 unit properties", "Wide range of fixed and ARM terms"],
    cons: ["Stricter credit requirements than FHA", "PMI required if down payment <20%"],
    faqs: [
      { q: "Can I put down only 3%?", a: "Yes — through Fannie Mae HomeReady and Freddie Mac Home Possible programs, qualified first‑time buyers can put as little as 3% down." },
      { q: "When does PMI go away?", a: "PMI is automatically cancelled when your loan balance reaches 78% of the original home value, or you can request removal at 80% LTV." },
    ],
  },
  {
    slug: "fha",
    name: "FHA Loan",
    shortName: "FHA",
    tagline: "Government‑backed loans designed for first‑time buyers and credit‑building borrowers.",
    description:
      "FHA loans are insured by the Federal Housing Administration and require lower down payments and credit scores than most conventional loans, making homeownership more accessible.",
    bestFor: ["First‑time homebuyers", "Credit scores 580–680", "Buyers with limited savings"],
    highlights: [
      { label: "Min down payment", value: "3.5%" },
      { label: "Min credit score", value: "580" },
      { label: "Max loan (most areas)", value: "$524,225" },
      { label: "Mortgage Insurance", value: "Upfront 1.75% + monthly" },
    ],
    requirements: [
      "Credit score 580+ (3.5% down) or 500–579 (10% down)",
      "DTI typically under 50% with compensating factors",
      "Property must be primary residence",
      "Home must meet FHA minimum property standards",
    ],
    pros: ["Low 3.5% down payment", "Flexible credit guidelines", "Gift funds allowed for full down payment", "Assumable by future buyers"],
    cons: ["Mortgage insurance for life of loan (in most cases)", "Loan limits lower than conventional", "Property condition requirements"],
    faqs: [
      { q: "Can I refinance out of FHA mortgage insurance?", a: "Yes. Once you have 20% equity, you can refinance into a conventional loan and drop FHA mortgage insurance entirely." },
      { q: "Can I use an FHA loan for a fixer‑upper?", a: "Yes — the FHA 203(k) loan program lets you finance both the purchase and renovation in a single loan." },
    ],
  },
  {
    slug: "va",
    name: "VA Loan",
    shortName: "VA",
    tagline: "Zero‑down financing for veterans, active‑duty service members, and eligible spouses.",
    description:
      "VA loans are guaranteed by the U.S. Department of Veterans Affairs. They offer no down payment, no monthly mortgage insurance, and the most competitive rates in the market for those who've served.",
    bestFor: ["Active‑duty military", "Veterans with VA eligibility", "Surviving spouses"],
    highlights: [
      { label: "Down payment", value: "$0" },
      { label: "Min credit score", value: "580 (lender)" },
      { label: "Mortgage insurance", value: "None" },
      { label: "Funding fee", value: "1.25% – 3.3%" },
    ],
    requirements: [
      "Valid Certificate of Eligibility (COE)",
      "Property must be primary residence",
      "Meet VA minimum property requirements",
      "Sufficient income and acceptable credit",
    ],
    pros: ["No down payment required", "No PMI ever", "Below‑market interest rates", "Limits on closing costs", "Reusable benefit"],
    cons: ["VA funding fee (waived for disabled veterans)", "Property must meet VA appraisal standards", "Primary residence only"],
    faqs: [
      { q: "Is the VA funding fee waived for disabled veterans?", a: "Yes — veterans receiving VA disability compensation are exempt from the funding fee." },
      { q: "Can I use my VA loan more than once?", a: "Absolutely. The VA benefit is reusable and you can even have two VA loans at the same time in some cases." },
    ],
  },
  {
    slug: "jumbo",
    name: "Jumbo Loan",
    shortName: "Jumbo",
    tagline: "Financing above conforming loan limits for higher‑value properties.",
    description:
      "Jumbo loans exceed the conforming loan limit set by Fannie Mae and Freddie Mac. They allow buyers to finance luxury and high‑cost market homes with competitive rates.",
    bestFor: ["Buyers in high‑cost markets", "Loan amounts above $806,500", "Strong credit & income borrowers"],
    highlights: [
      { label: "Min down payment", value: "10%" },
      { label: "Min credit score", value: "700" },
      { label: "Max loan amount", value: "Up to $3M+" },
      { label: "Reserves", value: "6–12 months typical" },
    ],
    requirements: [
      "Credit score 700 or higher (740+ for best rates)",
      "DTI under 43%",
      "Cash reserves of 6–12 months PITI",
      "Two appraisals may be required for loans > $1M",
    ],
    pros: ["Finance high‑value homes in one loan", "Competitive rates for strong borrowers", "Fixed and ARM options", "No PMI on most programs"],
    cons: ["Stricter qualification standards", "Larger down payments required", "More documentation"],
    faqs: [
      { q: "Are jumbo rates higher than conforming?", a: "Historically yes, but in recent years jumbo rates have often been competitive with — or even lower than — conforming rates for well‑qualified borrowers." },
      { q: "Can I get a jumbo loan with 10% down?", a: "Yes — we have programs that allow 10% down up to $1.5M with no PMI for qualified borrowers." },
    ],
  },
  {
    slug: "usda",
    name: "USDA Loan",
    shortName: "USDA",
    tagline: "100% financing for eligible homes in rural and suburban areas.",
    description:
      "USDA loans are backed by the U.S. Department of Agriculture and offer zero down payment financing for moderate‑income buyers in eligible rural and suburban areas.",
    bestFor: ["Buyers in rural or suburban areas", "Moderate‑income households", "First‑time buyers with no down payment"],
    highlights: [
      { label: "Down payment", value: "$0" },
      { label: "Min credit score", value: "640" },
      { label: "Income limit", value: "115% of area median" },
      { label: "Guarantee fee", value: "1% upfront + 0.35% annual" },
    ],
    requirements: [
      "Property in USDA‑eligible area",
      "Household income within USDA limits",
      "Credit score 640+ for streamlined approval",
      "Primary residence only",
    ],
    pros: ["No down payment needed", "Lower mortgage insurance than FHA", "Below‑market interest rates", "Closing costs can be financed"],
    cons: ["Income limits apply", "Geographic restrictions", "Primary residence only"],
    faqs: [
      { q: "How do I check if a property is USDA‑eligible?", a: "We can look it up for you, or you can use the USDA's eligibility map at eligibility.sc.egov.usda.gov." },
      { q: "Are USDA loans only for farms?", a: "No — most USDA loans are for typical single‑family homes in towns and suburbs that fall just outside major metro areas." },
    ],
  },
  {
    slug: "dscr",
    name: "DSCR Loan",
    shortName: "DSCR",
    tagline: "Investment property financing qualified by rental income, not personal income.",
    description:
      "DSCR (Debt Service Coverage Ratio) loans qualify investors based on the property's rental cash flow rather than personal income — perfect for self‑employed investors and those scaling a portfolio.",
    bestFor: ["Real estate investors", "Self‑employed buyers", "LLC and entity purchases"],
    highlights: [
      { label: "Min down payment", value: "20%" },
      { label: "Min credit score", value: "660" },
      { label: "Min DSCR", value: "1.00 – 1.25" },
      { label: "Loan amount", value: "Up to $3M" },
    ],
    requirements: [
      "Property rental income covers mortgage payment (DSCR ≥ 1.0)",
      "20–25% down payment",
      "Credit score 660+",
      "Can close in LLC or personal name",
    ],
    pros: ["No personal income docs (no W‑2, tax returns)", "No DTI calculation", "Unlimited number of properties", "Fast closings (3–4 weeks)"],
    cons: ["Higher rates than conventional", "Larger down payment required", "Investment properties only"],
    faqs: [
      { q: "What DSCR ratio do I need?", a: "Most programs require a DSCR of 1.00 (rent equals payment) or higher. The best rates are at 1.25+." },
      { q: "Can I close in my LLC?", a: "Yes — DSCR loans are designed for entity ownership and we can close in your LLC, LP, or trust." },
    ],
  },
  {
    slug: "bank-statement",
    name: "Bank Statement Loan",
    shortName: "Bank Statement",
    tagline: "Self‑employed mortgages qualified by deposits, not tax returns.",
    description:
      "Bank statement loans qualify self‑employed borrowers using 12 or 24 months of personal or business bank statements instead of W‑2s and tax returns. Perfect for business owners with strong cash flow but write‑offs that hurt taxable income.",
    bestFor: ["Self‑employed business owners", "1099 contractors", "Real estate professionals"],
    highlights: [
      { label: "Min down payment", value: "10%" },
      { label: "Min credit score", value: "660" },
      { label: "Statements", value: "12 or 24 months" },
      { label: "Max loan", value: "Up to $3M" },
    ],
    requirements: [
      "Self‑employed for 2+ years",
      "12 or 24 months of bank statements",
      "Credit score 660+",
      "10–20% down payment",
    ],
    pros: ["No tax returns required", "Use real cash flow, not taxable income", "Available for primary, second home, or investment", "Higher loan amounts available"],
    cons: ["Higher rates than conventional", "Larger down payment", "Detailed bank statement review"],
    faqs: [
      { q: "How is income calculated?", a: "We use your deposits over 12 or 24 months and apply an expense factor to determine qualifying income." },
      { q: "Can I use business and personal statements?", a: "Yes — we can use either or a combination depending on the program and which paints the strongest picture." },
    ],
  },
  {
    slug: "heloc",
    name: "HELOC & Home Equity",
    shortName: "HELOC",
    tagline: "Tap into your home's equity for renovations, debt consolidation, or major expenses.",
    description:
      "A Home Equity Line of Credit (HELOC) lets you borrow against your home's equity as a revolving credit line. Home equity loans give you a fixed lump sum. Both let you keep your low first‑mortgage rate intact.",
    bestFor: ["Homeowners with 20%+ equity", "Renovation financing", "Debt consolidation"],
    highlights: [
      { label: "Max CLTV", value: "90%" },
      { label: "Min credit score", value: "680" },
      { label: "Draw period", value: "10 years" },
      { label: "Repayment", value: "20 years" },
    ],
    requirements: [
      "20%+ equity in your home",
      "Credit score 680+",
      "DTI typically under 43%",
      "Stable income & employment",
    ],
    pros: ["Keep your existing low first‑mortgage rate", "Borrow only what you need (HELOC)", "Interest may be tax‑deductible", "Flexible repayment options"],
    cons: ["Variable rates on HELOCs", "Home is collateral", "Closing costs apply"],
    faqs: [
      { q: "HELOC vs cash‑out refinance — which is better?", a: "If your first mortgage rate is below 5%, a HELOC almost always wins. Cash‑out refis make sense when you need a large fixed sum and rates are favorable." },
      { q: "How fast can I close?", a: "Most HELOCs close in 2–3 weeks." },
    ],
  },
];

export const getProgram = (slug: string) => LOAN_PROGRAMS.find((p) => p.slug === slug);