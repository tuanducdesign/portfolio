import { Seo, Layout } from '@site/components';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getAllProjects, getMarkdown } from '@site/utils';
import { FeaturedPersonalProjects, HeroSection, LandingIntro } from '@site/contents';
import { Project } from '@site/types';

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo title="Portfolio" />
      <HeroSection />
      <LandingIntro data={props.aboutData} />
      <FeaturedPersonalProjects projects={props.projects} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{ aboutData: Pick<Project, 'html'>; projects: Project[] }> = async () => {
  const projects = await getAllProjects();
  const aboutData = await getMarkdown('about');
  return {
    props: { aboutData, projects },
  };
};
