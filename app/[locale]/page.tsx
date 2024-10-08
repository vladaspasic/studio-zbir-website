import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LuInspect } from 'react-icons/lu';
import { lookupProjects } from 'zbir/sanity/projects';
import { lookupSections } from 'zbir/sanity/sections';
import { Link } from 'zbir/components/Button';
import Hero from 'zbir/components/Hero';
import Approach from 'zbir/components/Approach';
import ProjectGrid from 'zbir/components/ProjectGrid';
import Section from 'zbir/components/Section';
import Service from 'zbir/components/Service';

const LIMIT = 6;

export default async function Home({ params }: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = await getTranslations();
    const projects = await lookupProjects({ locale: params.locale, limit: LIMIT });
    const sections = await lookupSections(params);

    const approaches = sections.filter(it => it.type === 'approach');
    const services = sections.filter(it => it.type === 'services');

    return (
        <>
            <Hero title={t('lead.title')} subtitle={t('lead.subtitle')}/>

            <Section title={t('projects.works')}>
                <ProjectGrid projects={projects}/>

                {projects.length == LIMIT && (
                    <footer className="text-center my-8">
                        <Link href="/projects">
                        <span className="mr-2">
                            {t('projects.see-more')}
                        </span>
                            <LuInspect size="1.25rem"/>
                        </Link>
                    </footer>
                )}
            </Section>

            <Section>
                <p className="text-xl font-light px-6 py-10 leading-relaxed text-gray-800 bg-gray-50 rounded-md">
                    {t('sections.intro')}
                </p>
            </Section>

            <Section title={t('sections.approaches')}>
                <div className="grid gap-4 tablet:gap-6 tablet:grid-cols-2">
                    {approaches.map(section => (
                        <Approach key={section.id} section={section}/>
                    ))}
                </div>
            </Section>

            <Section title={t('sections.services')}>
                <div className="grid gap-4 tablet:gap-6 tablet:grid-cols-3">
                    {services.map(section => (
                        <Service key={section.id} section={section}/>
                    ))}
                </div>
            </Section>
        </>
    );
}
