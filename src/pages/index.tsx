import { Container, Seo, Layout, ProjectCard, Intro, Hero } from '@site/components';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getAllProjects, getMarkdown } from '@site/utils';
import { Project } from '@site/types';

export default function Home({
  aboutData,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo />
      <Hero />
      <Intro data={aboutData} />
      <Container className="flex flex-col py-10 px-2">
        <h1 className="md:text-2xl font-bold text-xl mb-6">Personal Projects</h1>
        <div className="grid md:grid-cols-2 md:gap-12 grid-cols-1 grid-flow-row gap-8">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.meta.id} />
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{
  aboutData: Pick<Project, 'html'>;
  projects: Project[];
}> = async () => {
  const projects = await getAllProjects();
  const aboutData = await getMarkdown({
    slug: 'about',
  });
  return {
    props: { aboutData, projects },
  };
};
