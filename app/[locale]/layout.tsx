import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Work_Sans } from 'next/font/google';
import classnames from 'classnames';
import Layout from 'zbir/components/Layout';
import { LOCALES } from 'zbir/i18n/locales';
import '../globals.css';

const font = Work_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ['300', '400', '500'],
});

interface LocaleParams {
    locale: string,
}

export async function generateMetadata({params}: { params: LocaleParams }): Promise<Metadata> {
    const t = await getTranslations({locale: params.locale});

    return {
        title: t('title'),
    };
}

export function generateStaticParams() {
    return LOCALES.map((locale) => ({locale}));
}

export default async function LocaleLayout({ children, params }: {
    children: React.ReactNode;
    params: LocaleParams;
}) {
    unstable_setRequestLocale(params.locale);

    const messages = await getMessages();

    return (
        <html lang={params.locale}>
            <body className={classnames(font.className, 'bg-white')}>
                <NextIntlClientProvider messages={messages}>
                    <Layout>
                        {children}
                    </Layout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
