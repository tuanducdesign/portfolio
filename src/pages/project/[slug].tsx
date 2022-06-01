import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import {
  Container,
  Button,
  Seo,
  Layout,
  Markdown,
  BackButton,
} from '@site/components';
import { buildImageKitURL } from '@site/libs';
import { allProjects } from '@content';
import { pick } from '@site/utils';

export default function ProjectDetail({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo
        title={project.title}
        keywords={project.technologies}
        description={project.title}
        image={buildImageKitURL({
          src: project.thumbnail,
          width: 420,
          aspectRatio: '4:3',
        })}
      />
      <Container className="max-w-prose my-12">
        <BackButton />
        <h1 className="text-3xl font-bold my-4">{project.title}</h1>
        <Markdown content={project.body.html} className="mb-8" />
        <div className="flex w-full md:gap-x-8 md:gap-y-0 md:flex-row flex-col gap-y-3">
          {Boolean(project.liveUrl) && (
            <Button className="flex-auto" as="a" href={project.liveUrl}>
              Demo
            </Button>
          )}
          {Boolean(project.repoUrl) && (
            <Button className="flex-auto" as="a" href={project.repoUrl}>
              Source Code
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticPaths = () => ({
  paths: allProjects.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const { slug = '' } = params || {};
  const project = allProjects.find(project => project.slug === slug);
  if (!project) {
    throw new Error(`Project with slug ${slug} not found`);
  }
  return {
    props: {
      project: pick(project, [
        'title',
        'body',
        'liveUrl',
        'repoUrl',
        'technologies',
        'thumbnail',
      ]),
    },
  };
};
