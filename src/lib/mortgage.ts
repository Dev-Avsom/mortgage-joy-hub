export interface CalcInputs {
  homePrice: number;
  downPayment: number;
  rate: number; // annual %
  termYears: number;
  propertyTaxYearly: number;
  insuranceYearly: number;
  hoaMonthly: number;
  pmiYearly: number; // annual % of loan amount
}

export interface CalcResults {
  loanAmount: number;
  monthlyPI: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  monthlyPMI: number;
  monthlyTotal: number;
  totalInterest: number;
  totalPaid: number;
  payoffDate: string;
  schedule: Array<{ year: number; principal: number; interest: number; balance: number }>;
}

export function calcMortgage(i: CalcInputs): CalcResults {
  const loanAmount = Math.max(0, i.homePrice - i.downPayment);
  const n = i.termYears * 12;
  const r = i.rate / 100 / 12;
  const monthlyPI =
    r === 0 ? loanAmount / n : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const ltv = i.homePrice > 0 ? (loanAmount / i.homePrice) * 100 : 0;
  const pmiActive = ltv > 80 ? (loanAmount * (i.pmiYearly / 100)) / 12 : 0;

  const monthlyTax = i.propertyTaxYearly / 12;
  const monthlyInsurance = i.insuranceYearly / 12;
  const monthlyHOA = i.hoaMonthly;
  const monthlyPMI = pmiActive;
  const monthlyTotal = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA + monthlyPMI;

  // Build yearly amortization
  let balance = loanAmount;
  const schedule: CalcResults["schedule"] = [];
  let totalInterest = 0;
  for (let year = 1; year <= i.termYears; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * r;
      const principal = monthlyPI - interest;
      balance = Math.max(0, balance - principal);
      yearPrincipal += principal;
      yearInterest += interest;
    }
    totalInterest += yearInterest;
    schedule.push({ year, principal: yearPrincipal, interest: yearInterest, balance });
  }

  const payoff = new Date();
  payoff.setMonth(payoff.getMonth() + n);
  const payoffDate = payoff.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return {
    loanAmount,
    monthlyPI,
    monthlyTax,
    monthlyInsurance,
    monthlyHOA,
    monthlyPMI,
    monthlyTotal,
    totalInterest,
    totalPaid: monthlyPI * n,
    payoffDate,
    schedule,
  };
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const usd2 = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
