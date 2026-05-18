import fs from 'fs';
let missing = JSON.parse(fs.readFileSync('/tmp/missing.json','utf8'));

// Clean junk
missing = missing.filter(s => {
  if (/^[,.;:()\[\]{}=<>!?&|+\-*\/\\]/.test(s)) return false;
  if (/\b(function|const|let|var|return|typeof|document\.|localStorage|window\.|console\.)\b/.test(s)) return false;
  if (/[{}=][^a-zA-Z]*$/.test(s) && s.length < 20) return false;
  if (s.includes('${')) return false;
  if (/^[A-Z]+_[A-Z_]+$/.test(s)) return false;
  // strings that look like CSS selectors or HTML
  if (/^[a-z]+:\s/.test(s) && s.split(' ').length < 3) return false;
  if (s.length < 2) return false;
  if (!/[a-zA-Z]{2}/.test(s)) return false;
  return true;
});
console.log('cleaned:', missing.length);
fs.writeFileSync('/tmp/missing-clean.json', JSON.stringify(missing, null, 2));

const dict = JSON.parse(fs.readFileSync('src/i18n/auto-es.json','utf8'));
const API_KEY = process.env.LOVABLE_API_KEY;

async function translateBatch(items) {
  const numbered = items.map((s,i) => `${i+1}. ${JSON.stringify(s)}`).join('\n');
  const prompt = `Translate each of the following English UI strings to natural, concise Spanish for a US mortgage broker website (Ensure Home Loans / HomeBridge Mortgage). Keep brand names, acronyms (NMLS, DSCR, FHA, VA, USDA, HELOC, Non-QM, Jumbo, APR, MLO, CRM, CCPA, TCPA), numbers, percentages, dollar amounts and proper nouns unchanged. Return ONLY a JSON array of ${items.length} strings, same order, no commentary, no markdown fences.

Strings:
${numbered}`;
  const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${API_KEY}`},
    body: JSON.stringify({
      model:'google/gemini-2.5-flash',
      messages:[{role:'user',content:prompt}],
      response_format:{type:'json_object'},
    }),
  });
  if(!res.ok) throw new Error(`${res.status}: ${(await res.text()).slice(0,200)}`);
  const data = await res.json();
  let c = data.choices[0].message.content.trim().replace(/^```json\s*|\s*```$/g,'');
  let arr;
  try {
    const p = JSON.parse(c);
    arr = Array.isArray(p) ? p : (Array.isArray(p.translations) ? p.translations : Object.values(p).find(v=>Array.isArray(v)));
  } catch { const m=c.match(/\[[\s\S]*\]/); if(m) arr=JSON.parse(m[0]); }
  if (!Array.isArray(arr) || arr.length !== items.length) throw new Error(`got ${arr?arr.length:'null'} expected ${items.length}`);
  return arr;
}

const BATCH = 30;
for (let i=0;i<missing.length;i+=BATCH) {
  const chunk = missing.slice(i,i+BATCH);
  process.stdout.write(`${i}-${i+chunk.length}... `);
  try {
    const out = await translateBatch(chunk);
    chunk.forEach((s,idx)=>{ dict[s] = out[idx]; });
    console.log('ok');
  } catch(e) {
    console.log('FAIL', e.message);
  }
}
fs.writeFileSync('src/i18n/auto-es.json', JSON.stringify(dict, null, 2));
console.log('dict size:', Object.keys(dict).length);
