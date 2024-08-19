import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { lookupProjects } from 'zbir/sanity/projects';
import Hero from 'zbir/components/Hero';
import ProjectGrid from 'zbir/components/ProjectGrid';

export default async function Home({ params }: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = await getTranslations('lead');
    const projects = await lookupProjects(params);

    return (
        <>
            <Hero title={t('title')} subtitle={t('subtitle')}/>

            <article className="my-10 laptop:my-16">
                <header className="mb-6">
                    <p className="text-xl laptop:text-2xl font-semibold">Work</p>
                </header>

                <ProjectGrid projects={projects}/>
            </article>
        </>
    );
}
