import Image from 'next/image';
import Link from 'next/link';
import { TechStackBar } from '@site/components';
import { Project } from '@site/types';

const PersonalProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="ring-1 ring-offset-0 hover:ring-offset-1 ring-transparent p-2 hover:ring-white rounded-md transition-colors bg-gray-900">
      <Link href={'/project/' + project.meta.slug} passHref>
        <a>
          <Image
            src={'/images/projects' + project.meta.thumbnail}
            alt={project.meta.title}
            width={610}
            height={331}
            quality={100}
            loading="lazy"
            objectFit="contain"
            layout="responsive"
          />
          <TechStackBar title={project.meta.title} technologies={project.meta.technologies} />
        </a>
      </Link>
    </div>
  );
};

export function FeaturedPersonalProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="container flex flex-col mx-auto py-4 px-2">
      <h1 className="md:text-2xl font-bold text-xl mb-4">Personal Projects</h1>
      <div className="grid md:grid-cols-2 md:gap-12 grid-cols-1 grid-flow-row gap-8">
        {projects.map((project) => (
          <PersonalProjectCard project={project} key={project.meta.id} />
        ))}
      </div>
    </div>
  );
}
