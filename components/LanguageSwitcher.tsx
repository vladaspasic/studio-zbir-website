import Link from 'next/link';
import { useLocale } from 'next-intl';
import Dropdown from 'zbir/components/Dropdown';
import { LOCALES, LABELS } from 'zbir/i18n/locales';

export default function LanguageSwitcher() {
    const locale = useLocale();

    return (
        <Dropdown label={LABELS[locale]}>
            {LOCALES.map(locale => (
                <Link
                    key={locale}
                    href={`/${locale}`}
                    className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                    {LABELS[locale]}
                </Link>
            ))}
        </Dropdown>
    );
}