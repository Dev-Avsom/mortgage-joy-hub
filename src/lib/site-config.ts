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

// Common female first names (lowercase). Extend as needed. Used to pick a
// gendered illustrated avatar when an officer has no photo.
const FEMALE_NAMES = new Set<string>([
  "dimple","durga","priya","anita","sunita","kavita","pooja","neha","ritu","sneha",
  "sara","sarah","emily","emma","olivia","ava","mia","sophia","isabella","amelia",
  "jessica","jennifer","linda","mary","patricia","susan","karen","nancy","lisa","betty",
  "anjali","aishwarya","deepika","divya","meera","radha","sita","swati","sangeeta","seema",
  "rekha","reema","reshma","shreya","shilpa","shweta","sonia","sonal","sonali","tanvi",
  "asha","usha","uma","lakshmi","laxmi","kalpana","kiran","kirti","jyoti","jaya",
  "anu","anuradha","aruna","bhavana","chitra","gita","geeta","hema","indira","ishita",
  "manju","madhuri","mamta","manisha","nisha","nidhi","preeti","pratibha","rashmi","ruchi",
  "sushma","savita","shanti","shobha","smita","supriya","vandana","veena","vidya","vibha",
]);

function isLikelyFemale(name: string): boolean {
  const first = name.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  if (!first) return false;
  if (FEMALE_NAMES.has(first)) return true;
  // Common female-name endings (heuristic; not perfect).
  return /(a|i|ee|ya|ka|ana|ina|isha|itha|priya)$/.test(first);
}

// Returns a deterministic illustrated avatar URL based on the officer's
// name. Uses DiceBear's "avataaars" style with gender-appropriate options.
export function officerAvatarUrl(name: string): string {
  const seed = encodeURIComponent(name.trim() || "officer");
  const female = isLikelyFemale(name);
  // Flat illustrated persona-style avatars (similar to the reference design):
  // soft peach background, simple face, gendered hair.
  const hair = female
    ? "long01,long02,long03,long04,long05,long06,long07,long08,long09,long10,long11,long12,long13,long14,long15,long16,long17,long18,long19,long20,long21"
    : "short01,short02,short03,short04,short05,short06,short07,short08,short09,short10,short11,short12,short13,short14,short15,short16,short17,short18,short19";
  const facialHair = female
    ? "beardMustache[0]"
    : "beardMustache[0],beardMustache[1]";
  return `https://api.dicebear.com/9.x/personas/svg?seed=${seed}&hair=${hair}&facialHair=${facialHair}&backgroundColor=fde2c9,ffd5a8,ffe5cc,f7d6b5&backgroundType=solid&radius=50`;
}
