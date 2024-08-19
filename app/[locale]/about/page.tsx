import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Hero from 'zbir/components/Hero';

export default function About({ params }: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = useTranslations();

    return (
        <div>
            <Hero title={t('pages.about')} />
        </div>
    );
}
