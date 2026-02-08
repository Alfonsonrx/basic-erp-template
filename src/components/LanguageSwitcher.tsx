import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { setLocale, type LocaleState } from '../reduxStore/locale/localeSlice';
import type { RootState } from '../types';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../i18n';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state.locale);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    const languageConfig = SUPPORTED_LANGUAGES.find(l => l.code === newLang);
    if (!languageConfig) return;

    const newRegion = languageConfig.region;

    // Update i18n language
    i18n.changeLanguage(newLang);

    // Update Redux store
    dispatch(setLocale({ language: newLang, region: newRegion }));

    // Update URL if language prefix is present
    if (lang && ['en', 'es'].includes(lang)) {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(`/${lang}/`, `/${newLang}/`);
      navigate(newPath, { replace: true });
    }
  };

  const currentLang = i18n.language || locale.language;

  return (
    <div className="relative inline-flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        aria-label={t('language.select')}
      >
        {SUPPORTED_LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
      <div className="absolute right-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
