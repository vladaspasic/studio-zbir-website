import type { Project } from 'zbir/sanity/projects';

import Image from 'next/image';
import { useFormatter } from 'next-intl';
import { Link } from 'zbir/i18n/navigation';

function ProjectCard({ project }: { project: Project }) {
    const format = useFormatter();
    const date = format.dateTime(project.date, {
        year: 'numeric',
        month: 'numeric',
    });

    return (
        <Link href={`/projects/${project.slug}`}>
            <Image src={project.previewImage}
                   alt={project.name}
                   width={420}
                   height={360}
                   className="block w-full rounded duration-200 hover:scale-[1.02] hover:shadow-xl"
            />

            <div className="pt-3 flex items-center justify-between">
                <p className="text-gray-700 m-0 text-xl laptop:text-2xl">
                    {project.name}
                </p>
                <p className="text-gray-900 m-0">
                    {date}
                </p>
            </div>
        </Link>
    );
}

export default function ProjectGrid({projects}: { projects: Project[] }) {
    return (
        <div className="grid gap-6 laptop:gap-8 tablet:grid-cols-2 desktop:grid-cols-3">
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}