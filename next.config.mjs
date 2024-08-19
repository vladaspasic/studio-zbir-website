/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/config.ts');

const nextConfig = {
    images: {
        domains: [
            'cdn.sanity.io',
            'via.placeholder.com',
        ],
    },
};

export default withNextIntl(nextConfig);
