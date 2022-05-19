import Link from 'next/link';
import { TechStackBar } from '@site/components';
import { Project } from '@site/types';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="rounded-md group">
      <Link href={'/project/' + project.meta.slug} passHref>
        <a>
          <div className="group-hover:ring-offset-8 group-hover:ring-blue-text dark:group-hover:ring-yellow-border ring-2 rounded-md ring-transparent dark:ring-offset-black-primary transition-all">
            <img
              src={project.meta.thumbnail}
              alt={project.meta.title}
              height={331}
              loading="lazy"
              className="h-[280px] mx-auto overflow-hidden object-contain max-w-full"
            />
          </div>
          <TechStackBar title={project.meta.title} technologies={project.meta.technologies} />
        </a>
      </Link>
    </div>
  );
};

/*
eslint 
   @next/next/no-img-element: 0
*/
