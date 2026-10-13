// Renders src/story-overlay_9x16.html as a transparent 1080×1920 PNG for ffmpeg.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const root = new URL('../src/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  try { const b = await readFile(join(root, req.url)); res.writeHead(200, { 'content-type': types[extname(req.url)] || 'application/octet-stream' }); res.end(b); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto(`http://localhost:${server.address().port}/story-overlay_9x16.html`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: new URL('./overlay.png', import.meta.url).pathname, omitBackground: true });
await browser.close(); server.close();
console.log('overlay.png');
