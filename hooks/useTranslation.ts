import { useCallback } from 'react';
import en from '../locales/en.json';

// Add more languages as needed
const translations = { en };

export function useTranslation() {
  // You can expand this to support language switching
  const currentLanguage = 'en';

  const t = useCallback((key: string) => {
    return translations[currentLanguage][key] || key;
  }, [currentLanguage]);

  return { t };
}