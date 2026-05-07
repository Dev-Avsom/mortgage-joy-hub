export const siteConfig = {
  brand: "HomeBridge Mortgage",
  tagline: "Smarter home loans, made simple.",
  phone: "+1 (555) 201-3000",
  phoneHref: "tel:+15552013000",
  whatsappNumber: "15552013000",
  whatsappHref: "https://wa.me/15552013000",
  email: "hello@homebridge-mortgage.example",
  address: "1200 Oak Street, Suite 400, Austin, TX 78701",
  nmlsId: "NMLS #123456",
};

export const whatsappLink = (msg = "Hi! I'd like to learn more about your mortgage options.") =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
