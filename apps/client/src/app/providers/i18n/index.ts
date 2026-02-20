import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLocale from './locales/en.json';
import frLocale from './locales/fr.json';

// Feature locales
import { usersLocales } from '@/features/account/locales';
import { formBuilderLocales } from '@features/form-builder/locales';
import { integrationsLocales } from '@features/integrations/locales';

const resources = {
  en: {
    translation: enLocale,
    users: usersLocales.en,
    formBuilder: formBuilderLocales.en,
    integrations: integrationsLocales.en,
  },
  fr: {
    translation: frLocale,
    users: usersLocales.fr,
    formBuilder: formBuilderLocales.fr,
    integrations: integrationsLocales.fr,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translation', 'users', 'formBuilder', 'integrations'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
