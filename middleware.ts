import createMiddleware from 'next-intl/middleware';
import { LOCALES, DEFAULT_LOCALE } from 'zbir/i18n/locales';

export default createMiddleware({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    localeDetection: false,
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(sr|en)/:path*']
};
