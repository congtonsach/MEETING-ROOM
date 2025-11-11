import React, { createContext, useState, useContext, ReactNode } from 'react';
import { vi } from '../i18n/vi';
import { en } from '../i18n/en';

type Locale = 'vi' | 'en';
type Translations = typeof vi;

const resources: Record<Locale, Translations> = {
  vi,
  en,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations, options?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('vi');

  const t = (key: keyof Translations, options?: Record<string, string | number>): string => {
    let translation = resources[locale][key] || String(key);
    if (options) {
      Object.keys(options).forEach(optionKey => {
        translation = translation.replace(`{${optionKey}}`, String(options[optionKey]));
      });
    }
    return translation;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
