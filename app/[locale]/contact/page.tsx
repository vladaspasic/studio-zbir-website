import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { LuPhone, LuMail } from 'react-icons/lu';
import ContactForm from 'zbir/components/ContactForm';
import Hero from 'zbir/components/Hero';
import Section from 'zbir/components/Section';
import { SocialLinks } from 'zbir/components/Layout';

export default function Contact({params}: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = useTranslations();

    return (
        <div>
            <Hero title={t('pages.contact')} subtitle={t('contact.subtitle')}/>

            <Section className="grid gap-10 tablet:grid-cols-2">
                <aside>
                    <p className="text-gray-800">
                        {t('contact.cta')}
                    </p>
                    <p className="flex items-center mt-8 mb-3">
                        <LuPhone size="1.5rem"/>
                        <a href="tel:+381062222222" className="ml-3 font-light font-xl hover:underline">
                            +381062222222
                        </a>
                    </p>
                    <p className="flex items-center mb-8">
                        <LuMail size="1.5rem"/>
                        <a href="mailto:contact@zbir.studio" className="ml-3 font-light font-xl hover:underline">
                            contact@zbir.studio
                        </a>
                    </p>

                    <p className="text-gray-800">
                        {t('contact.social.lead')}
                    </p>

                    <SocialLinks className="mt-6"/>
                </aside>

                <ContactForm />
            </Section>

            <Section>

            </Section>
        </div>
    );
}
