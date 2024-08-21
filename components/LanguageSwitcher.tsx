"use client"

import Link from 'next/link';
import { useLocale } from 'next-intl';
import Dropdown from 'zbir/components/Dropdown';
import { usePathname } from 'zbir/i18n/navigation';
import { LOCALES, LABELS } from 'zbir/i18n/locales';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <Dropdown label={LABELS[locale]} className="w-full flex laptop:inline-flex laptop:w-auto">
            {LOCALES.map(locale => (
                <Link
                    key={locale}
                    href={`/${locale}${pathname}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-black rounded hover:bg-gray-100"
                >
                    {LABELS[locale]}
                </Link>
            ))}
        </Dropdown>
    );
}