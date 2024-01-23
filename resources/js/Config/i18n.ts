import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend, { type HttpBackendOptions } from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

void i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init<HttpBackendOptions>({
        backend: {
            loadPath: '/storage/locales/{{lng}}/{{ns}}.json',
        },
        fallbackLng: 'en',
        debug: false,

        interpolation: {
            escapeValue: false,
        },

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
        },
    });

export default i18n;
