/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container, Button, Seo, Layout, Markdown } from '@site/components';
import { Project } from '@site/types';
import { getFiles, getMarkdown } from '@site/utils';
import { BiArrowBack } from 'react-icons/bi';
import Router from 'next/router';

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <Layout>
      <Seo
        title={project.meta.title}
        keywords={project.meta.technologies.map((t) => t.replace('_', ' '))}
        description={project.meta.title}
        image={project.meta.thumbnail}
      />
      <Container className="flex flex-col items-center py-4 md:py-12 md:px-0 px-4 max-w-prose">
        <div className="w-full mb-4">
          <span
            role="button"
            title="Go Back"
            onClick={Router.back}
            className="inline-flex items-center gap-x-4 mb-8 group"
          >
            <BiArrowBack className="group-hover:-translate-x-4 transition-transform duration-500" />
            <span>Back</span>
          </span>
          <h1 className="text-4xl flex-1">{project.meta.title}</h1>
        </div>
        <Markdown html={project.html} className="mb-8" />
        <div className="flex w-full md:gap-x-8 md:gap-y-0 md:flex-row flex-col gap-y-3">
          {Boolean(project.meta.liveUrl) && (
            <Button className="flex-auto" as="a" href={project.meta.liveUrl}>
              Demo
            </Button>
          )}
          {Boolean(project.meta.repoUrl) && (
            <Button className="flex-auto" as="a" href={project.meta.repoUrl}>
              Source Code
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const files = getFiles('projects');
  return {
    paths: files.map((file) => ({ params: { slug: file.slice(0, -3) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultRedirect = { redirect: { destination: '/', permanent: true } };
  if (!params) return defaultRedirect;
  const { slug } = params;
  if (typeof slug !== 'string') return defaultRedirect;
  try {
    const project = await getMarkdown<Project>({
      slug,
      dir: 'projects',
    });
    return {
      props: {
        project,
      },
    };
  } catch {
    return defaultRedirect;
  }
};
