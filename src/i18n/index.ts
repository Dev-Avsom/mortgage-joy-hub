import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import es from "./locales/es.json";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: { en: { translation: en }, es: { translation: es } },
      fallbackLng: "en",
      supportedLngs: ["en", "es"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        lookupLocalStorage: "site-lang",
        caches: ["localStorage"],
      },
      react: { useSuspense: false },
    });
}

if (typeof document !== "undefined") {
  const setLang = (lng: string) => {
    document.documentElement.lang = lng.startsWith("es") ? "es" : "en";
  };
  setLang(i18n.resolvedLanguage || i18n.language || "en");
  i18n.on("languageChanged", setLang);
}

export default i18n;
