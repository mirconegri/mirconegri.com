import { mkdirSync, writeFileSync } from 'node:fs';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const api = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap';
const css = await (await fetch(api, { headers: { 'User-Agent': UA } })).text();

for (const [, subset, body] of css.matchAll(/\/\*\s*([a-z0-9-]+)\s*\*\/\s*@font-face\s*{([^}]*)}/gi)) {
  if (subset !== 'latin') continue;
  const style = /font-style:\s*(\w+)/.exec(body)?.[1] ?? 'normal';
  const src = /url\((https:[^)]+\.woff2)\)/.exec(body)?.[1];
  if (!src) continue;
  const file = style === 'italic' ? 'instrument-serif-italic.woff2' : 'instrument-serif-400.woff2';
  const bytes = Buffer.from(await (await fetch(src)).arrayBuffer());
  mkdirSync('fonts/instrument-serif', { recursive: true });
  writeFileSync(`fonts/instrument-serif/${file}`, bytes);
  console.log(`ok ${file} ${(bytes.length / 1024).toFixed(1)}kb`);
}
