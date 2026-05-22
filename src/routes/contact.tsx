import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Phone, MessageCircle, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — HomeBridge Mortgage" },
      { name: "description", content: "Reach our mortgage team by phone, WhatsApp, email, or contact form." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Get in Touch</h1>
      <p className="mt-2 text-muted-foreground">
        We're here 7 days a week. Reach out the way that works for you.
      </p>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <Card className="p-5">
            <a href={siteConfig.phoneHref} className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <div className="text-xs uppercase text-muted-foreground">Call</div>
                <div className="font-semibold">{siteConfig.phone}</div>
              </div>
            </a>
          </Card>
          <Card className="p-5">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-[oklch(0.62_0.16_150)]" />
              <div>
                <div className="text-xs uppercase text-muted-foreground">WhatsApp</div>
                <div className="font-semibold">Chat with us</div>
              </div>
            </a>
          </Card>
          <Card className="p-5">
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <div className="text-xs uppercase text-muted-foreground">Email</div>
                <div className="font-semibold">{siteConfig.email}</div>
              </div>
            </a>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <div className="text-xs uppercase text-muted-foreground">Office</div>
                <div className="font-semibold">{siteConfig.address}</div>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">#</div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Social</div>
                <div className="mt-1 flex gap-2">
                  <a href="https://www.instagram.com/ensurehomeloansllc/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram className="h-4 w-4" /></a>
                  <a href="https://www.facebook.com/Ensurehomeloans/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook className="h-4 w-4" /></a>
                  <a href="https://www.linkedin.com/company/ensure-home-loans/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /></a>
                  <a href="https://www.youtube.com/@EnsureHomeLoansLLC" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors"><Youtube className="h-4 w-4" /></a>
                </div>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3346.3534600691755!2d-96.98225662569315!3d32.99445557284462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c2fb79dfd82c7%3A0x2e50cdc279a57df3!2sEnsure%20Home%20Loans%20LLC!5e0!3m2!1sen!2sin!4v1779358715706!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ensure Home Loans office location"
            />
          </Card>
        </div>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Send Us a Message</h2>
          <p className="mt-1 text-sm text-muted-foreground">A loan officer will reply within one business hour.</p>
          <div className="mt-5">
            <LeadForm source="contact" submitLabel="Send message" />
          </div>
        </Card>
      </div>
    </div>
  );
}
