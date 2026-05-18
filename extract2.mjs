import fs from 'fs';
import { globSync } from 'glob';
const files = [
  ...globSync('src/routes/**/*.tsx'),
  ...globSync('src/components/site/**/*.tsx'),
  ...globSync('src/lib/*.ts'),
];

const strings = new Set();
const skipKeys = new Set(['className','class','key','to','href','src','id','style','type','name','role','htmlFor','rel','target','viewBox','xmlns','d','stroke','fill','width','height','strokeWidth','strokeLinecap','strokeLinejoin','preserveAspectRatio','color','aria-hidden','autoComplete','maxLength','min','max','step','pattern','inputMode','suppressHydrationWarning','source','tone','variant','size','side','align','position','direction','sizes','loading','decoding','as','method','encType','accept','noValidate','tabIndex','contentEditable','draggable','spellCheck','translate','dir','lang','from','queryKey','staleTime','cacheTime','enabled','refetchOnWindowFocus','mode','defaultValue','defaultChecked','autoFocus','readOnly','disabled','required','checked','open','hidden','animationDelay','transform','background','color','gradient']);

for (const file of files) {
  const src0 = fs.readFileSync(file, 'utf8');
  // Strip imports
  const src = src0.split('\n').filter(l => !/^\s*import\b/.test(l)).join('\n');
  // Match all string literals "..." '...' `...` (no interpolation in backticks)
  const re = /(?:^|[^\\])(["'`])((?:\\.|(?!\1).){2,300})\1/g;
  // Track context to identify skip-attrs
  let m;
  while ((m = re.exec(src)) !== null) {
    const quote = m[1];
    const val = m[2];
    if (quote === '`' && val.includes('${')) continue;
    const before = src.slice(Math.max(0, m.index-40), m.index+1);
    // skip object key like:  className: "..."
    const attrMatch = before.match(/([\w-]+)\s*[:=]\s*\{?\s*$/) || before.match(/\b([\w-]+)=\s*$/);
    if (attrMatch && skipKeys.has(attrMatch[1])) continue;
    // skip t("...") calls
    if (/\bt\(\s*$/.test(before)) continue;
    // Skip if it's an import path-like
    if (/^[@./]/.test(val)) continue;
    if (/^https?:\/\//.test(val)) continue;
    if (val.includes('oklch(') || val.includes('rgba(') || val.includes('#') && val.length<8) continue;
    if (/^[a-z][a-zA-Z0-9_-]*$/.test(val)) continue; // identifier
    if (/^[A-Z_][A-Z0-9_]*$/.test(val)) continue;
    if (!/[a-zA-Z]/.test(val)) continue;
    if (!/\s|[.!?,:]/.test(val) && val.split(/\s+/).length === 1) {
      // single word - keep only if first letter uppercase (likely UI label)
      if (!/^[A-Z]/.test(val)) continue;
    }
    // skip css-like
    if (/^[a-z-]+:\s*[a-z0-9-]+/.test(val)) continue;
    if (/^\d+(px|rem|em|%|vh|vw)/.test(val)) continue;
    // skip tailwind class strings (contain typical tw tokens)
    if (/\b(flex|grid|text-|bg-|p-|m-|gap-|rounded|border|hover:|w-|h-|min-|max-|absolute|relative|inline-|font-|leading-|tracking-|space-|items-|justify-|shrink|opacity-|shadow-|ring-|transition|duration-|animate-|backdrop-|overflow-|cursor-|select-|whitespace-|truncate|sm:|md:|lg:|xl:|2xl:)/.test(val) && val.split(' ').length > 1) continue;
    strings.add(val.trim());
  }
}

// Load existing dict
const dict = JSON.parse(fs.readFileSync('src/i18n/auto-es.json','utf8'));
const missing = [...strings].filter(s => !dict[s]).sort();
fs.writeFileSync('/tmp/missing.json', JSON.stringify(missing, null, 2));
console.log('found', strings.size, 'unique; missing translations:', missing.length);
