import Link from 'next/link';
import { TechStackBar } from '@site/components';
import { Project } from '@site/types';
import { getImgProps } from '@site/helpers';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="rounded-md group">
      <Link href={'/project/' + project.meta.slug} passHref>
        <a>
          <div className="group-hover:ring-offset-8 group-hover:ring-blue-text dark:group-hover:ring-yellow-border ring-2 rounded-md ring-transparent dark:ring-offset-black-primary transition-all">
            <img
              alt={project.meta.title}
              {...getImgProps({
                src: project.meta.thumbnail,
                widths: [480, 840, 1100],
                sizes: [
                  '(max-width: 560px) 100vw',
                  '(min-width: 561px) and (max-width: 840px) 80vw',
                  '(min-width: 841px) 60vw',
                  '480px',
                ],
                transform: {
                  aspectRatio: '4:3',
                },
              })}
              loading="lazy"
              className="w-full object-contain rounded-md"
            />
          </div>
          <TechStackBar
            title={project.meta.title}
            technologies={project.meta.technologies}
          />
        </a>
      </Link>
    </div>
  );
};
