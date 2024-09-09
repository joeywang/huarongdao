import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en.json';
import zh from '../public/locales/zh.json';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    lng: 'zh', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;