import type { Locale, Resume } from '../types/resume';
import resumeEn from '../../data/resume.en.json';
import resumeEs from '../../data/resume.es.json';

const resumes: Record<Locale, Resume> = {
  en: resumeEn as Resume,
  es: resumeEs as Resume,
};

export function getResume(locale: Locale): Resume {
  return resumes[locale];
}

export function formatLocation(resume: Resume, locale: Locale): string {
  const { city, country } = resume.basics.location ?? {};
  return [city, country].filter(Boolean).join(', ');
}

export function formatDateRange(
  startDate: string,
  endDate: string | undefined,
  presentLabel: string,
  locale: Locale,
): string {
  const formatter = new Intl.DateTimeFormat(locale === 'es' ? 'es-CO' : 'en-US', {
    month: 'short',
    year: 'numeric',
  });

  const parse = (value: string) => {
    const normalized = value.length === 4 ? `${value}-01` : value;
    return new Date(`${normalized}-01T00:00:00`);
  };

  const start = formatter.format(parse(startDate));
  if (!endDate) {
    return `${start} — ${presentLabel}`;
  }
  const end = formatter.format(parse(endDate));
  return `${start} — ${end}`;
}

export function getPdfPath(locale: Locale): string {
  return `/resume-${locale}.pdf`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

export function getCanonicalPath(locale: Locale): string {
  return `/${locale}/`;
}
