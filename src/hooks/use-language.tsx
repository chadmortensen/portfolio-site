import * as React from "react";
import { LANGUAGE_STORAGE_KEY, type LanguageCode, siteContent } from "@/lib/site-content";

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  content: (typeof siteContent)[LanguageCode];
}

const LanguageContext = React.createContext<LanguageContextValue | undefined>(undefined);

const getInitialLanguage = (): LanguageCode => {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "es" || stored === "fr") {
    return stored;
  }

  return "en";
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = React.useState<LanguageCode>(getInitialLanguage);

  const setLanguage = React.useCallback((nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      content: siteContent[language],
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
