import i18n from 'i18next';
import { english } from "@localization";
import { getCurrentEnvironment } from "@utils";
import { initReactI18next } from 'react-i18next';
import { APP_LANGUAGES, APP_ENVIRONMENTS } from '@localTypes';



i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        fallbackLng: APP_LANGUAGES.ENGLISH,
        debug: APP_ENVIRONMENTS.DEVELOPMENT === getCurrentEnvironment(),
        interpolation: {
            escapeValue: false,
        },
        resources: {
            [APP_LANGUAGES.ENGLISH]: {
                translation: english
            }
        }
    })


export default i18n;