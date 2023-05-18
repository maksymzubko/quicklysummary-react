import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en/translation.json';
import ru from './ru/translation.json';
import ua from './ua/translation.json';
import jp from './jp/translation.json';

import {convertLanguageJsonToObject} from './translations';

export const translationsJson = {
    en: {
        translation: en
    },
    jp: {
        translation: jp
    },
    ru: {
        translation: ru
    },
    ua: {
        translation: ua
    }
};

convertLanguageJsonToObject(en);

export const i18n = i18next
    .use(initReactI18next)
    .init({
        resources: translationsJson,
        fallbackLng: localStorage.getItem('language') ?? 'en',
        interpolation: {
            escapeValue: false
        }
    });
