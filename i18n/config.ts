import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { LOCALES } from 'zbir/i18n/locales';

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!LOCALES.includes(locale as any)) {
        return notFound();
    }

    return {
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
