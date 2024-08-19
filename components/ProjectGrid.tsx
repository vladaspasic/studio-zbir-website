import type { Project } from 'zbir/sanity/projects';

import Image from 'next/image';
import { useFormatter } from 'next-intl';
import { Link } from 'zbir/i18n/navigation';
import styles from './ProjectCard.module.css';

function ProjectCard({ project }: { project: Project }) {
    const format = useFormatter();
    const date = format.dateTime(project.date, {
        year: 'numeric',
        month: 'numeric',
    });

    return (
        <Link href={`/projects/${project.slug}`} className={styles['project-card']}>
            <Image src={project.previewImage}
                   alt={project.name}
                   width={420}
                   height={360}
                   className="block w-full"
            />

            <div className={styles['project-description']}>
                <div className="text-center text-white">
                    <p className="font-semibold mb-3 text-2xl laptop:text-3xl">
                        {project.name}
                    </p>
                    <p className="font-light text-xl laptop:text-2xl">
                        {date}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default function ProjectGrid({projects}: { projects: Project[] }) {
    return (
        <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}