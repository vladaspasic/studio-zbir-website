import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { lookupProjects } from 'zbir/sanity/projects';
import Hero from 'zbir/components/Hero';
import ProjectGrid from 'zbir/components/ProjectGrid';

export default async function Projects({ params }: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = await getTranslations();
    const projects = await lookupProjects(params);

    return (
        <div>
            <Hero title={t('pages.projects')}/>

            <div className="my-10 laptop:my-20">
                <ProjectGrid projects={projects}/>
            </div>
        </div>
    );
}
