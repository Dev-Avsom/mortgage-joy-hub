import fs from 'fs';

let strings = JSON.parse(fs.readFileSync('/tmp/strings.json', 'utf8'));
// Remove obvious JS code leakage
strings = strings.filter(s =>
  !/[&|]{2}|=>|==|!=|\b(const|let|var|function|return|typeof)\b|Number\.|\.length|\.map\(|\.filter\(|console\./.test(s)
  && !/^[=<>!+\-*\/]/.test(s)
  && !/^\d+\s*&&/.test(s)
);

// Existing es.json keys (translations already done) - we'll merge
const en = JSON.parse(fs.readFileSync('src/i18n/locales/en.json','utf8'));
const es = JSON.parse(fs.readFileSync('src/i18n/locales/es.json','utf8'));

// Build flat existing en->es map from those nested locales
function flatten(obj, prefix='', out={}) {
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v && typeof v === 'object') flatten(v, prefix+k+'.', out);
    else out[prefix+k] = v;
  }
  return out;
}
const flatEn = flatten(en);
const flatEs = flatten(es);
const existingMap = {};
for (const key of Object.keys(flatEn)) {
  if (typeof flatEn[key] === 'string' && typeof flatEs[key] === 'string') existingMap[flatEn[key]] = flatEs[key];
}

// Strings still needing translation
const toTranslate = strings.filter(s => !existingMap[s]);
console.log('total', strings.length, 'need translation', toTranslate.length);

// Batch translate via Lovable AI Gateway
const API_KEY = process.env.LOVABLE_API_KEY;
async function translateBatch(items) {
  const numbered = items.map((s,i) => `${i+1}. ${s}`).join('\n');
  const prompt = `Translate each of the following English UI strings to natural, concise Spanish for a US mortgage broker website. Keep brand names ("Ensure Home Loans", "HomeBridge", "NMLS", "DSCR", "FHA", "VA", "USDA", "HELOC", "Non-QM", "Jumbo"), numbers, percentages, dollar amounts, and proper nouns unchanged. Return ONLY a JSON array of strings of the same length, in the same order, with no commentary.

Strings:
${numbered}`;

  const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`AI gateway ${res.status}: ${txt.slice(0,300)}`);
  }
  const data = await res.json();
  let content = data.choices[0].message.content.trim();
  // Strip code fences
  content = content.replace(/^```json\s*|\s*```$/g, '').trim();
  // Find array in object
  let arr;
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) arr = parsed;
    else if (Array.isArray(parsed.translations)) arr = parsed.translations;
    else arr = Object.values(parsed).find(v => Array.isArray(v));
  } catch (e) {
    // Try to extract array
    const m = content.match(/\[[\s\S]*\]/);
    if (m) arr = JSON.parse(m[0]);
  }
  if (!Array.isArray(arr) || arr.length !== items.length) {
    throw new Error(`Expected array of ${items.length}, got ${arr ? arr.length : 'null'}`);
  }
  return arr;
}

const result = { ...existingMap };
const BATCH = 40;
for (let i = 0; i < toTranslate.length; i += BATCH) {
  const chunk = toTranslate.slice(i, i+BATCH);
  process.stdout.write(`batch ${i}-${i+chunk.length}... `);
  try {
    const out = await translateBatch(chunk);
    chunk.forEach((s, idx) => { result[s] = out[idx]; });
    console.log('ok');
  } catch (e) {
    console.log('FAIL', e.message);
    // fallback identity
    chunk.forEach(s => { if (!result[s]) result[s] = s; });
  }
}

fs.writeFileSync('src/i18n/auto-es.json', JSON.stringify(result, null, 2));
console.log('wrote', Object.keys(result).length, 'translations');
