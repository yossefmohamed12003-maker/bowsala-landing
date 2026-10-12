// Renders every src/*.html ad to exports/<name>.png at native size.
// Usage: node render.mjs [name-filter]
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { createServer } from 'node:http';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = new URL('./src/', import.meta.url).pathname;
// SCALE=2 renders @2x (2160px wide) into exports@2x/
const scale = Number(process.env.SCALE || 1);
const out = new URL(scale > 1 ? `./exports@${scale}x/` : './exports/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2' };

const server = createServer(async (req, res) => {
  try {
    const body = await readFile(join(root, decodeURIComponent(req.url.split('?')[0])));
    res.writeHead(200, { 'content-type': types[extname(req.url)] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const port = server.address().port;

await mkdir(out, { recursive: true });
const filter = process.argv[2] || '';
const pages = (await readdir(root)).filter((f) => f.endsWith('.html') && f.includes(filter));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const f of pages) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: scale });
  await page.goto(`http://localhost:${port}/${f}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.querySelectorAll('.photo[data-src]')].every((p) => p.dataset.ready));
  const gaps = await page.evaluate(() => [...document.querySelectorAll('.photo[data-src]')].filter((b) => {
    const i = b.querySelector('img'), r = b.getBoundingClientRect(), q = i.getBoundingClientRect();
    return q.left > r.left + 0.5 || q.top > r.top + 0.5 || q.right < r.right - 0.5 || q.bottom < r.bottom - 0.5;
  }).map((b) => b.dataset.src));
  if (gaps.length) console.warn('  WARNING photo does not fill its box:', f, gaps);
  await page.locator('.ad').screenshot({ path: join(out, f.replace('.html', '.png')) });
  console.log('rendered', f);
  await page.close();
}
await browser.close();
server.close();
