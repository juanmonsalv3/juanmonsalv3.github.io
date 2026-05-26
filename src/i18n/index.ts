import type { Locale, UiStrings } from '../types/resume';
import uiEn from './ui.en.json';
import uiEs from './ui.es.json';

const uiByLocale: Record<Locale, UiStrings> = {
  en: uiEn as UiStrings,
  es: uiEs as UiStrings,
};

export function getUi(locale: Locale): UiStrings {
  return uiByLocale[locale];
}

export const locales: Locale[] = ['en', 'es'];
export const defaultLocale: Locale = 'en';
