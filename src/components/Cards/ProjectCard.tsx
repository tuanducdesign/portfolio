import Link from 'next/link';
import type { Project } from '@content';
import { Card } from './Card';

export const ProjectCard = ({
  project,
}: {
  project: Pick<Project, 'description' | 'title' | 'slug' | 'technologies'>;
}) => {
  return (
    <Link href={'/project/' + project.slug} passHref>
      <a>
        <Card>
          <div className="font-bold text-lg leading-loose">{project.title}</div>
          <p className="text-neutral">{project.description}</p>
          <ul className="flex gap-2 flex-wrap">
            {project.technologies.map((tech, idx) => (
              <li key={tech + idx} className="p-1">
                <span className="text-secondary dark:text-primary">#</span>
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </Card>
      </a>
    </Link>
  );
};
