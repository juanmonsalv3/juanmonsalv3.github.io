import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './translations/en.json';
import es from './translations/es.json';

const resources = {
  en:{
    translation: en,
    nativeName: 'English'
  },
  es:{
    translation: es,
    nativeName: 'Español'
  }
};

i18next.use(initReactI18next).use(LanguageDetector).init({
  fallbackLng: 'en',
  debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  resources
});

export const languages = resources;