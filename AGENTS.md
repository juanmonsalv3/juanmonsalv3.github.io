# AGENTS.md

Instructions for AI coding agents working in this repository.

## Project overview

Bilingual personal resume site for [juanmonsalve.dev](https://juanmonsalve.dev), built with **Astro 6**, **TypeScript**, and **Tailwind CSS v4**, deployed to **GitHub Pages**.

- **Resume content** (JSON Resume shape): `data/resume.en.json`, `data/resume.es.json`
- **UI strings** (labels, aria text, nav): `src/i18n/ui.en.json`, `src/i18n/ui.es.json`
- **Locales**: `en` (default) and `es`, routed at `/en/` and `/es/` (`/` redirects to `/en/`)
- **PDFs**: `resume-en.pdf` and `resume-es.pdf` are generated at build time into `dist/`

Human-oriented setup and deploy notes live in [README.md](README.md).

## Repository layout

| Path | Purpose |
|------|---------|
| `src/pages/en/`, `src/pages/es/` | Locale-specific page entrypoints |
| `src/layouts/BaseLayout.astro` | HTML shell, meta, theme, global styles |
| `src/components/` | Astro UI sections and icons |
| `src/lib/resume.ts` | Resume loading, date formatting, locale helpers |
| `src/i18n/index.ts` | UI string loader |
| `src/types/resume.ts` | Shared TypeScript types |
| `src/styles/global.css` | Tailwind import, CSS variables, base styles |
| `src/styles/print.css` | Print/PDF-specific rules |
| `scripts/generate-pdf.mjs` | Playwright PDF export (runs after `astro build`) |
| `public/` | Static assets (`CNAME`, favicons, images) |
| `.github/workflows/deploy.yml` | CI build and GitHub Pages deploy |

## Build, test & validation

Requires **Node.js ≥ 22.12.0** (see `package.json` `engines`).

```bash
npm install
```

```bash
npm run dev
```

- English: http://localhost:4321/en/
- Spanish: http://localhost:4321/es/

```bash
npm run build
```

Builds static output to `dist/` and generates both locale PDFs. CI also installs Playwright Chromium before build.

```bash
npm run preview
```

Serves `dist/` locally (used by the PDF script).

```bash
npm run pdf
```

Regenerates PDFs only. Requires an existing `dist/` from a prior build.

```bash
npx astro check
```

Type-check Astro/TS when changing components or config. There is no dedicated lint or test script.

## Conventions

### Bilingual changes

When editing user-visible copy or resume data, keep **both locales in sync**:

- Resume fields → update `data/resume.en.json` **and** `data/resume.es.json`
- UI labels → update `src/i18n/ui.en.json` **and** `src/i18n/ui.es.json`
- New `UiStrings` keys → extend `src/types/resume.ts` and both UI JSON files

Locale pages (`src/pages/en/index.astro`, `src/pages/es/index.astro`) should stay structurally parallel; only `locale` and imports differ.

### Astro components

- Prefer **`.astro` components** with typed props; reuse `getResume()` / `getUi()` from `src/lib/resume.ts` and `src/i18n/index.ts`.
- Icons live under `src/components/icons/` as small Astro components.
- Follow [CSS conventions & guidelines](#css-conventions--guidelines) for all styling.

### Types & data

- Resume JSON must match types in `src/types/resume.ts` (JSON Resume–inspired).
- Work entries use `highlights` for achievement bullets and `technologies` for stack tags; `basics.keyHighlights` is an optional summary bullet list.
- `languages` is required. Skill groups use `keywords` only (no self-rated levels).
- Date strings in resume JSON use `YYYY-MM` or `YYYY`; formatting is handled in `formatDateRange()` in `src/lib/resume.ts`.

### Scope of edits

- **Minimize diff scope**—match existing patterns; avoid unrelated refactors.
- Do **not** commit secrets, API keys, or real credentials.
- Do **not** create git commits or open PRs unless the user explicitly asks.

## CSS conventions & guidelines

### Stylesheet split

| File | Role |
|------|------|
| `src/styles/global.css` | Tailwind import, design tokens, base styles, reusable component classes |
| `src/styles/print.css` | `@media print` overrides for PDF export (A4, compact layout) |

Both are imported from `src/layouts/BaseLayout.astro`. There is no `tailwind.config` file—Tailwind v4 is wired via `@tailwindcss/vite` in `astro.config.mjs`.

### Design tokens (theming)

- **Semantic colors** live as CSS variables on `:root` (light) and `.dark` (dark), e.g. `--color-bg`, `--color-text`, `--color-muted`, `--color-accent`, `--color-border`.
- **Dark mode** is class-based: `document.documentElement` gets `.dark` from `ThemeToggle.astro` / inline script in `BaseLayout.astro`. Never rely on `prefers-color-scheme` alone in component CSS.
- **Do not hardcode** theme hex values in `.astro` templates. Use semantic utility classes (below) or `var(--color-*)` inside `global.css`.
- When adding a new token, define it in **both** `:root` and `.dark` in `global.css`, and override for print in `print.css` if PDF output needs it.

### Tailwind vs custom classes

**In `.astro` templates:**

- Use **Tailwind utilities** for layout, spacing, responsive breakpoints, and typography scale (`flex`, `gap-*`, `max-w-3xl`, `text-lg`, `sm:*`, etc.).
- Use **semantic utilities** from `@layer utilities` in `global.css` for anything that must track the theme:
  - Surfaces/text: `bg-app`, `bg-surface`, `bg-surface/90`, `text-primary`, `text-muted`, `text-accent`, `text-link`, `border-muted`
  - Components: `section-heading`, `card`, `skill-tag`, `tool-tag`, `btn-primary`, `btn-outline`, `btn-icon-circle`, `contact-item`, `btn-with-icon`

**In `global.css`:**

- Put shared, repeated patterns in `@layer utilities` (compose with `@apply` + `var(--color-*)`).
- Put global element rules (body, focus rings, selection) in `@layer base`.
- Register fonts in `@theme` (currently `--font-sans: "Inter", …`).

**Prefer extending existing classes** over one-off inline colors. If a pattern appears twice, add a utility in `global.css` rather than duplicating long `class` strings.

### Print & PDF

PDFs are rendered with Playwright using print media. Screen-only UI must be hidden from print:

- Add `no-print` to chrome that should not appear in PDFs (nav, footer, theme toggle, language switcher, interests section, notice banner).
- Add `no-print` to chrome that should not appear in PDFs (nav, footer, theme toggle, language switcher, notice banner).
- Use `print-contact` / `print-contact-sep` in `Header.astro` for contact lines shown only in print.
- Use `print-break-inside-avoid` on blocks that must not split across pages (experience items, skill cards, education entries).

**Print-specific layout** (font sizes, margins, section compaction, hiding decorative UI) belongs in `src/styles/print.css`, not in component templates. Print styles reset tokens to a light, ink-friendly palette and force `html` font size to `9pt`.

After CSS changes that affect PDF layout, run `npm run build` and inspect `dist/resume-en.pdf` and `dist/resume-es.pdf`.

### Accessibility & interaction

- Focus styles for links and buttons are defined globally in `@layer base` (`outline` using `var(--color-accent)`). Do not remove focus outlines without a visible replacement.
- Icon color inside interactive controls often uses `.icon` with `currentColor` or `text-accent` on hover—match existing `btn-outline` / `contact-item` patterns.
- Section anchors use `scroll-mt-24` to clear the sticky header (`SiteChrome`).

### CSS do not

- Add raw hex/rgb colors in Astro `class` attributes when a semantic token or utility already exists.
- Put screen layout rules in `print.css` or print rules in unrelated component `<style>` blocks—keep print concerns centralized.
- Add a separate CSS file without importing it from `BaseLayout.astro`.
- Use `@media (prefers-color-scheme: dark)` in component CSS; theme is controlled via `.dark` on `<html>`.

## Deployment

- **Target branch**: `main`
- Pushes to `main` run `.github/workflows/deploy.yml` (build + GitHub Pages).
- Custom domain is set via `public/CNAME` (`juanmonsalve.dev`). Avoid changing it unless requested.
- Site URL in `astro.config.mjs` (`site`) must stay consistent with production.

## Do not

- Edit generated output in `dist/` by hand—it is overwritten on every build.
- Add a third locale without updating `astro.config.mjs` `i18n`, `src/i18n/index.ts`, `src/types/resume.ts`, resume/UI JSON files, and new page routes.
- Remove or rename PDF output paths (`/resume-en.pdf`, `/resume-es.pdf`) without updating `getPdfPath()` in `src/lib/resume.ts` and `scripts/generate-pdf.mjs`.
- Change GitHub Actions deploy permissions or workflow triggers without explicit user approval.
