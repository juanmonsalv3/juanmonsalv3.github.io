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
const astroBin = path.join(root, 'node_modules', 'astro', 'bin', 'astro.mjs');
const port = 4321;
const host = '127.0.0.1';
const locales = ['en', 'es'];

function startPreview() {
  return spawn(
    process.execPath,
    [astroBin, 'preview', '--port', String(port), '--host', host],
    { cwd: root, detached: true, stdio: 'ignore' },
  );
}

async function stopPreview(proc) {
  if (!proc?.pid) return;

  try {
    process.kill(-proc.pid, 'SIGKILL');
  } catch {
    try {
      proc.kill('SIGKILL');
    } catch {
      // already dead
    }
  }

  await new Promise((resolve) => {
    const timeout = setTimeout(resolve, 3000);
    proc.on('exit', () => {
      clearTimeout(timeout);
      resolve();
    });
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
  const preview = startPreview();
  let browser;

  try {
    await waitForServer();
    browser = await chromium.launch();
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
        preferCSSPageSize: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
      });
      console.log(`Generated ${outFile}`);
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    await stopPreview(preview);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
