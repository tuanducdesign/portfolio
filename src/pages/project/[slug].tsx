import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import {
  Container,
  Button,
  Seo,
  Layout,
  Markdown,
  BackButton,
} from '@site/components';
import { getFiles, getProject } from '@site/utils';
import { buildImageKitURL } from '@site/libs';

export default function ProjectDetail({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo
        title={project.meta.title}
        keywords={project.meta.technologies}
        description={project.meta.title}
        image={buildImageKitURL({ src: project.meta.thumbnail })}
      />
      <Container className="max-w-prose my-12">
        <BackButton />
        <h1 className="text-3xl font-bold my-4">{project.meta.title}</h1>
        <Markdown content={project.content} className="mb-8" />
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

export const getStaticPaths = () => {
  const files = getFiles('projects');
  return {
    paths: files.map(slug => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const { slug = '' } = params || {};
  const project = await getProject({ slug, withContent: true });
  return {
    props: {
      project,
    },
  };
};
