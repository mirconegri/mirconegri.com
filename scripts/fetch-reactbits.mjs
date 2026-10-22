import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const names = process.argv.slice(2);
for (const name of names) {
  const res = await fetch(`https://reactbits.dev/r/${name}.json`);
  if (!res.ok) {
    console.error(`FAIL ${name}: ${res.status}`);
    continue;
  }
  const item = await res.json();
  for (const file of item.files ?? []) {
    const out = join('vendor/react-bits', file.path);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, file.content);
    console.log(`ok ${out} (${file.content.length}b)`);
  }
}
