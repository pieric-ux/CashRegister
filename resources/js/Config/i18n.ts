import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend, { type HttpBackendOptions } from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

void i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpBackend)
    .init<HttpBackendOptions>({
        backend: {
            loadPath: '/storage/locales/{{lng}}/{{ns}}.json',
        },
        fallbackLng: {
            default: ['en'],
        },
        debug: false,

        interpolation: {
            escapeValue: false,
        },

        detection: {
            order: ['navigator', 'htmlTag', 'cookie', 'localStorage', 'querystring'],

            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            lookupQuerystring: 'lng',

            caches: ['localStorage', 'cookie'],
            excludeCacheFor: ['cimode'],

            cookieMinutes: 60 * 2,

            htmlTag: document.documentElement,

            cookieOptions: {
                path: '/',
                sameSite: 'lax',
            },
        },
    });

export default i18n;
