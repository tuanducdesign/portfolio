import Link from 'next/link';
import { Project } from '@site/types';
import { Card } from './Card';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={'/project/' + project.meta.slug} passHref>
      <a>
        <Card>
          <div className="font-bold text-lg leading-loose">
            {project.meta.title}
          </div>
          <p className="text-neutral">{project.meta.description}</p>
          <ul className="flex gap-2 flex-wrap">
            {project.meta.technologies.map((tech, idx) => (
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
