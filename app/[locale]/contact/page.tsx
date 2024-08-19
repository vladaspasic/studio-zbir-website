import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Contact({ params }: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = useTranslations();

    return (
        <div>
            <h1 className="text-3xl font-bold laptop:text-6xl mb-5">
                {t('pages.contact')}
            </h1>
        </div>
    );
}
