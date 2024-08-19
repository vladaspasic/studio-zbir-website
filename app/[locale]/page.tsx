import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Home({ params }: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = useTranslations('lead');

    return (
        <div>
            <h1 className="text-3xl font-bold laptop:text-6xl mb-5">
                {t('title')}
            </h1>
            <p className="text-xl font-semibold laptop:text-3xl">
                {t('subtitle')}
            </p>
        </div>
    );
}
