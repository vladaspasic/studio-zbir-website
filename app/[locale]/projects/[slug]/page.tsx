import Image from 'next/image';
import { getFormatter, unstable_setRequestLocale } from 'next-intl/server';
import { PortableText } from '@portabletext/react'
import { lookupProjects, lookupProject } from 'zbir/sanity/projects';
import Hero from 'zbir/components/Hero';

interface PageParams {
    slug: string,
    locale: string,
}

export async function generateStaticParams() {
    const projects = await lookupProjects({});

    return projects.map(project => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: { params: PageParams }) {
    unstable_setRequestLocale(params.locale);

    const format = await getFormatter();
    const project = await lookupProject(params);

    const date = format.dateTime(project.date, {
        year: 'numeric',
        month: 'numeric',
    });

    return (
        <>
            <Hero title={project.name} subtitle={date}/>

            <div className="my-10 laptop:my-2 text-2xl">
                {project.description && (
                    <PortableText value={project.description}/>
                )}
            </div>

            <div className="my-10 laptop:my-16">
                {project.gallery.map(image => (
                    <Image
                        key={image}
                        src={image}
                        alt={project.name}
                        width={1920}
                        height={1080}
                        className="block w-full my-4"
                    />
                ))}
            </div>
        </>
    );
}