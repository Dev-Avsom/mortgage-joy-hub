export const siteConfig = {
  brand: "Ensure Home Loans",
  tagline: "Your one stop shop for home loans.",
  phone: "(682) 413-1045",
  phoneHref: "tel:+16824131045",
  altPhones: [
    { label: "(682) 344-1144", href: "tel:+16823441144" },
    { label: "(682) 470-9269", href: "tel:+16824709269" },
    { label: "(682) 344-1471", href: "tel:+16823441471" },
  ],
  whatsappNumber: "16824131045",
  whatsappHref: "https://wa.me/16824131045",
  email: "contact@ensurehomeloans.com",
  assistEmail: "assist@ensurehomeloans.com",
  address: "2785 Rockbrook Dr. Suite 304, Lewisville, TX 75067",
  nmlsId: "NMLS #1666674",
};

export const whatsappLink = (msg = "Hi! I'd like to learn more about your mortgage options.") =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;

// Normalize a WhatsApp phone for wa.me links: strip non-digits and ensure
// a country code. Defaults to US (+1) when officers enter 10 local digits
// like "214-317-4830" — without this wa.me returns 404.
export function normalizeWhatsApp(input: string | null | undefined): string {
  const digits = (input ?? "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `1${digits}`;
  return digits;
}
