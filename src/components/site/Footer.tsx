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
        </div>
        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/calculator" className="text-muted-foreground hover:text-primary">Mortgage Calculator</Link></li>
            <li><Link to="/loan-programs" className="text-muted-foreground hover:text-primary">Loan Programs</Link></li>
            <li><Link to="/loan-officers" className="text-muted-foreground hover:text-primary">Our Loan Officers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
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
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.brand}. Equal Housing Lender.
      </div>
    </footer>
  );
}
