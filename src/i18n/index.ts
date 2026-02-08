import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

import enTranslations from './locales/en/common.json';
import esTranslations from './locales/es/common.json';

// Supported languages configuration
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', region: 'US' },
  { code: 'es', label: 'Español', region: 'CL' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code'];
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

// Get language from URL path (e.g., /en/dashboard -> en)
export const getLanguageFromPath = (): string | null => {
  const path = window.location.pathname;
  const pathLang = path.split('/')[1];
  if (SUPPORTED_LANGUAGES.some(l => l.code === pathLang)) {
    return pathLang;
  }
  return null;
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES.map(l => l.code),
    
    // Detection order: URL path > localStorage > navigator > htmlTag
    detection: {
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },

    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
