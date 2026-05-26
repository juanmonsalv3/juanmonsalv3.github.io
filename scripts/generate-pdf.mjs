/**
 * Post-build: generates locale-specific PDFs into dist/ using Playwright.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const port = 4321;
const host = '127.0.0.1';
const locales = ['en', 'es'];

function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      'npx',
      ['astro', 'preview', '--port', String(port), '--host', host],
      { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] },
    );

    const onData = (chunk) => {
      const text = String(chunk);
      if (text.includes(String(port)) || text.includes('previewing')) {
        resolve(proc);
      }
    };

    proc.stdout?.on('data', onData);
    proc.stderr?.on('data', onData);
    proc.on('error', reject);

    delay(20000).then(() => resolve(proc));
  });
}

async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://${host}:${port}/en/`);
      if (res.ok) return;
    } catch {
      // retry
    }
    await delay(500);
  }
  throw new Error('Preview server did not become ready');
}

async function main() {
  const preview = await startPreview();
  try {
    await waitForServer();
    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const locale of locales) {
      const url = `http://${host}:${port}/${locale}/`;
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.documentElement.classList.remove('dark'));
      await page.emulateMedia({ media: 'print', colorScheme: 'light' });
      const outFile = path.join(distDir, `resume-${locale}.pdf`);
      await page.pdf({
        path: outFile,
        format: 'A4',
        printBackground: true,
        margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' },
      });
      console.log(`Generated ${outFile}`);
    }

    await browser.close();
  } finally {
    preview.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
