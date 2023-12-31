import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: '/storage/locales/{{lng}}/{{ns}}.json',
        },
        fallbackLng: 'en',
        debug: false,

        interpolation: {
            escapeValue: false,
        },

        load: 'languageOnly',

        detection: {
            order: [
                'querystring',
                'cookie',
                'localStorage',
                'navigator',
                'htmlTag',
                'path',
                'subdomain',
            ],

            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',

            caches: ['localStorage', 'cookie'],
            excludeCacheFor: ['cimode'],

            cookieMinutes: 60 * 2,

            cookieOptions: {
                path: '/',
                secure: false,
                sameSite: 'strict',
            },

            convertDetectedLanguage: (lng) => lng.split('-')[0],
        },
    });

export default i18n;
