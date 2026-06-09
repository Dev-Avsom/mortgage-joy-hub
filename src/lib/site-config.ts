import femaleAvatar from "@/assets/avatar-female.png.asset.json";
import maleAvatar from "@/assets/avatar-male.png.asset.json";

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

// Explicit female first names (lowercase). Default is male — only flag female
// when the first name is clearly feminine. Avoids misclassifying common
// male Indian names that end in "a" (Krishna, Ravi, Balachandra, etc.).
const FEMALE_NAMES = new Set<string>([
  // Western
  "sara","sarah","emily","emma","olivia","ava","mia","sophia","isabella","amelia",
  "jessica","jennifer","linda","mary","patricia","susan","karen","nancy","lisa","betty",
  "kathy","samantha",
  // South Asian
  "amita","anita","anitha","anjali","anjukumari","anuja","archana","asha","aishwarya",
  "atika","beena","bhavana","chitra","deepika","dimple","divya","durga","geeta","gita",
  "hema","indira","indradevi","ishita","jaya","jyoti","kalika","kalpana","keerthi",
  "kirithika","kirti","lakshmi","laxmi","lavanya","laya","madhuri","mamta","manisha",
  "manju","meera","munmun","nagammai","nidhi","nisha","parimala","pavani","pavithra",
  "pooja","prashanthi","pratibha","preeti","prem","radha","radhika","rajalakshmi",
  "ramya","rashmi","rekha","reema","reshma","ritu","roopa","ruchi","saileela","sakhi",
  "sangeeta","sarada","saritha","savita","seema","shalinee","shanti","sharanpreet",
  "shilpa","shobha","shreya","shweta","sireesha","sirisha","sita","smita","sneha",
  "sofiya","sonal","sonali","sonia","soumya","sowmya","sreelakshmi","sridevi",
  "srilakshmi","srilekha","srividya","subha","sunita","sunitha","supriya","surekha",
  "sushma","swathi","swati","tanvi","thanuja","uma","usha","vandana","veena","vibha",
  "vidya","vishala","yojana","laxmi","saritha","sri",
]);

// Explicit female tokens appearing anywhere in the full name (lowercase).
const FEMALE_TOKENS = new Set<string>([
  "devi","kumari","lakshmi","laxmi","priya","rani",
]);

function isLikelyFemale(name: string): boolean {
  const parts = name.trim().toLowerCase().split(/\s+/);
  const first = parts[0] ?? "";
  if (!first) return false;
  if (FEMALE_NAMES.has(first)) return true;
  for (const p of parts) {
    if (FEMALE_TOKENS.has(p)) return true;
  }
  return false;
}

export function officerAvatarUrl(name: string): string {
  return isLikelyFemale(name) ? femaleAvatar.url : maleAvatar.url;
}
