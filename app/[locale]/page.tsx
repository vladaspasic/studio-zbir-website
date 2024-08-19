import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Hero from 'zbir/components/Hero';

export default function Home({ params }: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = useTranslations('lead');

    return (
        <div>
            <Hero title={t('title')} subtitle={t('subtitle')} />
        </div>
    );
}
