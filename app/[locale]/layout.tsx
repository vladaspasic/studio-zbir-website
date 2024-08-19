import type { Metadata } from 'next';
import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { LOCALES } from 'zbir/i18n/locales';
import '../globals.css';

const inter = Inter({
    subsets: ['latin'],
});

interface LocaleParams {
    locale: string,
}

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
    const t = await getTranslations({ locale: params.locale });

    return {
        title: t('title'),
    };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const messages = await getMessages();

  return (
      <html lang={params.locale}>
        <body className={inter.className}>
          <NextIntlClientProvider messages={messages}>
              <header className="container mx-auto my-4">
                  <Link href={`/${params.locale}`} className="font-semibold leading-6 text-gray-800 hover:text-black transition-colors">
                      Studio Zbir
                  </Link>
              </header>

              <main className="container mx-auto">
                  {children}
              </main>

              <footer>

              </footer>
          </NextIntlClientProvider>
        </body>
      </html>
  );
}
