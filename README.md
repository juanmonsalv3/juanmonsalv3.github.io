# Juan Monsalve — Resume Site

Modern bilingual resume site for [juanmonsalve.dev](https://juanmonsalve.dev), built with Astro and deployed to GitHub Pages.

## Stack

- [Astro](https://astro.build) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [JSON Resume](https://jsonresume.org) data in `data/resume.en.json` and `data/resume.es.json`
- Playwright for build-time PDF export

## Development

```bash
npm install
npm run dev
```

- English: http://localhost:4321/en/
- Spanish: http://localhost:4321/es/

## Build

```bash
npm run build
```

Builds the static site to `dist/` and generates `resume-en.pdf` and `resume-es.pdf`.

## Content

Edit resume content in:

- `data/resume.en.json`
- `data/resume.es.json`

UI labels (section titles, buttons) live in:

- `src/i18n/ui.en.json`
- `src/i18n/ui.es.json`

## Legacy migration

If you still have Jekyll `_data/*.yml` files:

```bash
node scripts/migrate-yaml-to-resume.mjs
```

## Deploy

Pushes to `main` trigger GitHub Actions (`.github/workflows/deploy.yml`) to build and publish to GitHub Pages. Custom domain is configured via `public/CNAME`.
