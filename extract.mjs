import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const files = [
  ...globSync('src/routes/**/*.tsx'),
  ...globSync('src/components/site/**/*.tsx'),
  ...globSync('src/components/ui/sonner.tsx'),
];

const strings = new Set();

// Strip code blocks where we should not extract: imports, t("..."), className, key, to, href, src,
function extractFromFile(file) {
  let src = fs.readFileSync(file, 'utf8');
  // Remove import lines
  src = src.replace(/^\s*import[^\n]*\n/gm, '');
  // Remove t("...") calls - already translated
  src = src.replace(/\bt\(\s*["'`][^"'`]*["'`]\s*[\),]/g, '');
  // Remove createFileRoute(...).head / meta blocks - keep titles? skip head sections to be safe
  src = src.replace(/head:\s*\([^)]*\)\s*=>\s*\(\{[\s\S]*?\}\)\s*,/g, '');
  // Remove style/className/key/to/href/src/id/data-/aria-describedby string assignments
  const skipAttrs = ['className','class','key','to','href','src','id','style','type','name','role','data-[a-z-]+','aria-controls','aria-labelledby','aria-describedby','htmlFor','rel','target','viewBox','xmlns','d','stroke','fill','width','height','strokeWidth','strokeLinecap','strokeLinejoin','preserveAspectRatio','color','source','aria-hidden','autoComplete','maxLength','min','max','step','pattern','inputMode'];
  const re = new RegExp(`\\b(${skipAttrs.join('|')})=\\{?["'\`][^"'\`]*["'\`]\\}?`, 'g');
  src = src.replace(re, '');

  // Extract JSX text: anything between > and < that is not whitespace-only and not pure JS
  const jsxText = src.matchAll(/>([^<>{}\n]{2,}?)</g);
  for (const m of jsxText) {
    const txt = m[1].trim();
    if (!txt) continue;
    if (!/[a-zA-Z]{2}/.test(txt)) continue;
    if (txt.length > 240) continue;
    strings.add(txt);
  }

  // Extract translatable attributes
  const attrs = ['placeholder','title','alt','aria-label','label'];
  for (const a of attrs) {
    const r = new RegExp(`\\b${a}=["\`]([^"\`]{2,200})["\`]`, 'g');
    for (const m of src.matchAll(r)) {
      const v = m[1].trim();
      if (!/[a-zA-Z]{2}/.test(v)) continue;
      strings.add(v);
    }
  }

  // Extract string literals passed inside JSX braces like {"text"} or {'text'} (excluding obvious code)
  const braceStr = src.matchAll(/\{\s*["']([^"'{}\n]{4,200})["']\s*\}/g);
  for (const m of braceStr) {
    const v = m[1].trim();
    if (!/[a-zA-Z]{2}/.test(v)) continue;
    if (/^[\w-]+$/.test(v)) continue; // class name-ish
    strings.add(v);
  }
}

for (const f of files) extractFromFile(f);

// Filter junk
const blacklist = /^(true|false|null|undefined|\d+|—|\.|,|·|→|✓|×|\*)$/;
const out = [...strings]
  .filter(s => !blacklist.test(s))
  .filter(s => !/^[^a-zA-Z]*$/.test(s))
  .filter(s => !s.startsWith('http'))
  .filter(s => !s.includes('oklch('))
  .filter(s => !s.includes('rgba('))
  .filter(s => !/^[a-z][a-zA-Z0-9]*$/.test(s)) // camelCase identifiers
  .filter(s => !/^[A-Z_]+$/.test(s))
  .sort();

fs.mkdirSync('src/i18n', { recursive: true });
fs.writeFileSync('/tmp/strings.json', JSON.stringify(out, null, 2));
console.log('extracted', out.length, 'unique strings');
