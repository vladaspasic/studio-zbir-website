import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { lookupProjects } from 'zbir/sanity/projects';
import Hero from 'zbir/components/Hero';
import ProjectGrid from 'zbir/components/ProjectGrid';
import Section from 'zbir/components/Section';

export default async function Home({ params }: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = await getTranslations();
    const projects = await lookupProjects(params);

    return (
        <>
            <Hero title={t('lead.title')} subtitle={t('lead.subtitle')}/>

            <Section title={t('projects.works')}>
                <ProjectGrid projects={projects}/>
            </Section>
        </>
    );
}
