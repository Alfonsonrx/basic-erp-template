import { Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "@/i18n";

/**
 * LanguageRedirect handles routes without a language prefix.
 * It redirects to the same path with the appropriate language prefix.
 * 
 * Examples:
 * - /profile -> /en/profile
 * - /settings -> /es/settings  (if Spanish is preferred)
 * - /auth/login -> /en/auth/login
 */
function LanguageRedirect() {
  const location = useLocation();
  const { i18n } = useTranslation();

  // Determine target language: use i18n language if valid, otherwise default
  const targetLang = SUPPORTED_LANGUAGES.some((l) => l.code === i18n.language)
    ? i18n.language
    : DEFAULT_LANGUAGE;

  // Build new path with language prefix, preserving query params and hash
  const newPath = `/${targetLang}${location.pathname}${location.search}${location.hash}`;
  return <Navigate to={newPath} replace />;
}

export default LanguageRedirect;
