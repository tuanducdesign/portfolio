/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps } from 'next';
import { Button, Seo, Layout, Markdown } from '@site/components';
import { Project } from '@site/types';
import { getMarkdown } from '@site/utils';
import { BiArrowBack } from 'react-icons/bi';
import Router from 'next/router';
import { getFiles } from '@site/utils/data';
import { Container } from '@site/components/Container';

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <Layout>
      <Seo
        title={project.meta.title}
        keywords={project.meta.technologies.map((t) => t.replace('_', ' '))}
      />
      <Container className="flex flex-col items-center py-4 md:py-12 md:px-0 px-4">
        <div className="md:w-2/3 w-full mb-4">
          <span
            role="button"
            title="Go Back"
            onClick={Router.back}
            className="inline-flex items-center gap-x-4 mb-8 group"
          >
            <BiArrowBack className="group-hover:-translate-x-4 transition-transform duration-500" />
            <span>Back</span>
          </span>
          <h1 className="text-4xl flex-1 text-center">{project.meta.title}</h1>
        </div>
        <img
          src={'/images/projects' + project.meta.thumbnail}
          alt={project.meta.title}
          width={960}
          height={520}
          className="md:min-w-[840px] md:min-h-[520px] md:max-w-4xl rounded-md mb-4"
        />
        <Markdown html={project.html} className="mb-8" />
        <div className="max-w-2xl flex w-full md:space-x-8 md:space-y-0 md:flex-row flex-col space-y-3">
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
