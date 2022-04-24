/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps } from 'next';
import { TechStackBar, Button, Seo, Layout } from '@site/components';
import { Project } from '@site/types';
import { getAllProjectFiles, getMarkdown } from '@site/utils';
import { BiArrowBack } from 'react-icons/bi';
import Router from 'next/router';

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <Layout>
      <Seo title={project.meta.title} keywords={project.meta.technologies.map((t) => t.replace('_', ' '))} />
      <div className="container mx-auto flex flex-col items-center py-4 md:py-12 md:px-0 px-4">
        <div className="md:w-2/3 w-full mb-4">
          <span role="button" onClick={Router.back} className="inline-flex items-center p-4 gap-x-4">
            <BiArrowBack />
            <span>Back</span>
          </span>
          <div className="flex flex-col md:flex-row items-center">
            <h1 className="text-3xl flex-1">{project.meta.title}</h1>
            <TechStackBar technologies={project.meta.technologies} />
          </div>
        </div>
        <img
          src={'/images/projects' + project.meta.thumbnail}
          alt={project.meta.title}
          width={960}
          height={520}
          className="md:min-w-[840px] md:min-h-[520px] md:max-w-4xl rounded-md"
        />
        <article
          className="prose my-8 prose-lg prose-cyan text-white prose-headings:text-white prose-code:text-blue-300"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
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
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const files = getAllProjectFiles();
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
    const project = (await getMarkdown(slug, true)) as Project;
    return {
      props: {
        project,
      },
    };
  } catch {
    return defaultRedirect;
  }
};
