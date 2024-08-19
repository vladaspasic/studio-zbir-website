import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Home({ params }: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = useTranslations();

    return (
        <div>
            <h1 className="text-3xl font-bold laptop:text-6xl mb-5">
                {t('lead.title')}
            </h1>
            <p className="text-xl font-semibold laptop:text-3xl">
                {t('lead.subtitle')}
            </p>
        </div>
    );
}
