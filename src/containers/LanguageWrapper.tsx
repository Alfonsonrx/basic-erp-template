import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "@/i18n";
import { setLanguage } from "@reduxStore/locale/localeSlice";

/**
 * LanguageWrapper validates URL language prefix and syncs it with i18n.
 * 
 * - If /:lang/ is valid → syncs i18n and renders children
 * - If /:lang/ is invalid (e.g., /settings, /profile) → redirects to /:validLang/:originalPath
 */
function LanguageWrapper() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the lang parameter is a valid language code
  const isValidLang = lang && SUPPORTED_LANGUAGES.some((l) => l.code === lang);

  useEffect(() => {
    if (!lang) return;

    if (!isValidLang) {
      // Lang is not valid (e.g., "settings", "profile", "auth")
      // Redirect to the same path with proper language prefix
      const targetLang = SUPPORTED_LANGUAGES.some((l) => l.code === i18n.language)
        ? i18n.language
        : DEFAULT_LANGUAGE;
      
      // Build new path: /targetLang/rest/of/path
      const newPath = `/${targetLang}${location.pathname}${location.search}${location.hash}`;
      
      // Replace to avoid history entry for the wrong URL
      navigate(newPath, { replace: true });
      return;
    }

    // Valid language: sync with i18n and Redux
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      dispatch(setLanguage(lang));
    }
  }, [lang, isValidLang, i18n, dispatch, location.pathname, location.search, location.hash, navigate]);

  // Only render outlet if we have a valid language
  // Otherwise render nothing while redirect happens
  if (!isValidLang) {
    return null; // or a loading spinner
  }

  return <Outlet />;
}

export default LanguageWrapper;
