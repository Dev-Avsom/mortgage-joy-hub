import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="font-bold text-primary">{siteConfig.brand}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{siteConfig.tagline}</p>
          <p className="mt-2 text-xs text-muted-foreground">{siteConfig.nmlsId}</p>
          <a
            href={`https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/${siteConfig.nmlsId.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-xs text-primary hover:underline"
          >
            Verify on NMLS Consumer Access →
          </a>
          <div className="mt-4 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground/80">
            <span aria-hidden className="grid h-6 w-6 place-items-center rounded-sm bg-primary text-primary-foreground font-bold">=</span>
            Equal Housing Lender
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/calculator" className="text-muted-foreground hover:text-primary">Mortgage Calculator</Link></li>
            <li><Link to="/affordability" className="text-muted-foreground hover:text-primary">Affordability Calculator</Link></li>
            <li><Link to="/refinance" className="text-muted-foreground hover:text-primary">Refinance Calculator</Link></li>
            <li><Link to="/loan-programs" className="text-muted-foreground hover:text-primary">Loan Programs</Link></li>
            <li><Link to="/loan-officers" className="text-muted-foreground hover:text-primary">Our Loan Officers</Link></li>
            <li><Link to="/learn" className="text-muted-foreground hover:text-primary">Learning Center</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            <li><Link to="/get-prequalified" className="text-muted-foreground hover:text-primary">Get Pre-qualified</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.email}</li>
            <li>{siteConfig.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-6 text-xs text-muted-foreground">
          <p>
            <strong className="text-foreground/80">Disclosures:</strong> {siteConfig.brand} is a licensed mortgage
            lender. {siteConfig.nmlsId}. All loans are subject to credit approval, underwriting guidelines,
            and property qualification. Rates, terms, and fees are subject to change without notice.
            Programs, rates, and conditions are subject to change without notice. Not a commitment to lend.
            Equal Housing Lender. State licenses available upon request.
          </p>
          <p>
            By submitting your information, you consent to be contacted by {siteConfig.brand} via phone, SMS,
            or email about loan products. Message and data rates may apply. Consent is not a condition of service.
            See our Privacy Policy for details on TCPA compliance.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <span>© {new Date().getFullYear()} {siteConfig.brand}. All rights reserved.</span>
            <span className="space-x-3">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Licensing</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
