import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
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
      <h1 className="text-3xl font-bold md:text-4xl">Get in touch</h1>
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
        </div>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">A loan officer will reply within one business hour.</p>
          <div className="mt-5">
            <LeadForm source="contact" submitLabel="Send message" />
          </div>
        </Card>
      </div>
    </div>
  );
}
