/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps } from 'next';
import { TechStackBar, Button, Seo, Layout } from '@site/components';
import { Project } from '@site/types';
import { getAllProjectFiles, getMarkdown } from '@site/utils';

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <Layout>
      <Seo title={project.meta.title} keywords={project.meta.technologies.map((t) => t.replace('_', ' '))} />
      <div className="container mx-auto flex flex-col items-center py-12 md:px-0 px-4">
        <img
          src={'/images/projects' + project.meta.thumbnail}
          alt="asdasdasd"
          width={960}
          height={520}
          className="md:min-w-[840px] md:min-h-[520px] md:max-w-4xl"
        />
        <TechStackBar technologies={project.meta.technologies} />
        <article
          className="prose my-4 p-4 prose-md md:prose-xl bg-gray-200 rounded-lg"
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
