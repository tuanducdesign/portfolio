import { Container, Seo, Layout, ProjectCard, Hero } from '@site/components';
import { getAllProjects } from '@site/utils';
import type { InferGetStaticPropsType } from 'next';

export default function Home({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo description="Ashal Farhan Portfolio" />
      <Hero />
      <Container className="flex flex-col mb-10 px-2">
        <h1 className="md:text-2xl font-bold text-xl mb-6">
          Personal Projects
        </h1>
        <div className="grid md:grid-cols-2 md:gap-12 grid-cols-1 grid-flow-row gap-8">
          {projects.map(project => (
            <ProjectCard project={project} key={project.meta.id} />
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const projects = await getAllProjects();
  return {
    props: {
      projects,
    },
  };
};
