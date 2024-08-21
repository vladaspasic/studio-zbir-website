import { DEFAULT_LOCALE } from 'zbir/i18n/locales';

interface Translation<T> {
    _key: string,
    value: T,
}

/**
 * Sanity uses the `sanity-plugin-internationalized-array` plugin to add translation to string, text or
 * block fields. The field is formatted like so:
 * ```json
 * [
 *   { _key: 'en', value: 'English text' },
 *   { _key: 'rs', value: 'Serbian text'}
 * ]
 * ```
 * This method attempts to extract the value for the supplied language.
 *
 * @param translations list of translations located in the Sanity Document field
 * @param language     language for which the translated value would be extracted
 */
export function extractTranslation<T>(translations: Translation<T>[], language: string = DEFAULT_LOCALE): T | null {
    if (!translations || translations.length === 0) {
        return null;
    }

    let translation = translations.find(it => it._key === language);

    if (translation === undefined) {
        translation = translations[0];
    }

    return translation ? translation.value : null;
}