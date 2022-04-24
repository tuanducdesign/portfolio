import Image from 'next/image';
import Link from 'next/link';
import { TechStackBar } from '@site/components';
import { Project } from '@site/types/model';

const PersonalProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="hover:shadow-lg hover:scale-105 transition">
      <Link href={'/project/' + project.meta.slug}>
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
          <div>
            <h1 className="md:text-2xl text-lg p-1 font-bold">{project.meta.title}</h1>
            <TechStackBar technologies={project.meta.technologies} />
          </div>
        </a>
      </Link>
    </div>
  );
};

export function FeaturedPersonalProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="container flex flex-col mx-auto md:p-24 p-8">
      <h1 className="md:text-3xl font-bold text-xl">Personal Projects</h1>
      <div className="grid md:grid-cols-2 md:gap-12 grid-cols-1 grid-flow-row gap-8">
        {projects.map((project) => (
          <PersonalProjectCard project={project} key={project.meta.id} />
        ))}
      </div>
    </div>
  );
}
