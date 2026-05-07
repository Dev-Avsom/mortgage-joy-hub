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

/** Standard 28%/36% DTI affordability calc */
export function calcAffordability(opts: {
  annualIncome: number;
  monthlyDebts: number;
  rate: number;
  termYears: number;
  downPayment: number;
  taxRate?: number; // % of home value yearly
  insRate?: number; // % of home value yearly
}) {
  const { annualIncome, monthlyDebts, rate, termYears, downPayment } = opts;
  const taxRate = opts.taxRate ?? 1.1;
  const insRate = opts.insRate ?? 0.4;

  const monthlyIncome = annualIncome / 12;
  // Conservative: total housing + debts shouldn't exceed 36% of gross
  const maxHousing = monthlyIncome * 0.36 - monthlyDebts;
  const r = rate / 100 / 12;
  const n = termYears * 12;

  // Solve: payment = housing where housing = PI + (price * (tax+ins)/12)
  // PI per $1 of loan
  const piPerDollar = r === 0 ? 1 / n : (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const tiPerDollar = (taxRate + insRate) / 100 / 12;

  // maxHousing = loan*piPerDollar + price*tiPerDollar, loan = price - down
  // maxHousing + down*piPerDollar = price * (piPerDollar + tiPerDollar)
  const maxPrice =
    piPerDollar + tiPerDollar > 0
      ? (maxHousing + downPayment * piPerDollar) / (piPerDollar + tiPerDollar)
      : 0;

  const safePrice = Math.max(downPayment, maxPrice);
  const loan = Math.max(0, safePrice - downPayment);
  const monthlyPI = loan * piPerDollar;
  const monthlyTax = (safePrice * taxRate) / 100 / 12;
  const monthlyIns = (safePrice * insRate) / 100 / 12;

  return {
    maxPrice: safePrice,
    loanAmount: loan,
    monthlyPI,
    monthlyTax,
    monthlyIns,
    monthlyTotal: monthlyPI + monthlyTax + monthlyIns,
    maxHousing,
  };
}

/** Refinance comparison */
export function calcRefi(opts: {
  currentBalance: number;
  currentRate: number;
  currentMonthsLeft: number;
  newRate: number;
  newTermYears: number;
  closingCosts: number;
}) {
  const monthlyPay = (bal: number, rate: number, n: number) => {
    const r = rate / 100 / 12;
    return r === 0 ? bal / n : (bal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };
  const currentPayment = monthlyPay(opts.currentBalance, opts.currentRate, opts.currentMonthsLeft);
  const newPayment = monthlyPay(opts.currentBalance, opts.newRate, opts.newTermYears * 12);
  const monthlySavings = currentPayment - newPayment;
  const breakevenMonths = monthlySavings > 0 ? Math.ceil(opts.closingCosts / monthlySavings) : Infinity;

  // Lifetime interest
  const totalCurrentInterest = currentPayment * opts.currentMonthsLeft - opts.currentBalance;
  const totalNewInterest = newPayment * opts.newTermYears * 12 - opts.currentBalance;

  return {
    currentPayment,
    newPayment,
    monthlySavings,
    breakevenMonths,
    totalCurrentInterest,
    totalNewInterest,
    lifetimeSavings: totalCurrentInterest - totalNewInterest - opts.closingCosts,
  };
}
