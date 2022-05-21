import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import {
  Container,
  Button,
  Seo,
  Layout,
  Markdown,
  ArrowLeft,
} from '@site/components';
import { getFiles, getProject } from '@site/utils';
import Link from 'next/link';

export default function ProjectDetail({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo
        title={project.meta.title}
        keywords={project.meta.technologies}
        description={project.meta.title}
        image={project.meta.thumbnail}
      />
      <Container className="py-4 md:py-12 md:px-0 px-4 max-w-prose">
        <div className="w-full mb-4">
          <Link href="/" passHref>
            <a
              title="Go Back"
              className="inline-flex items-center gap-x-4 mb-8 group"
            >
              <ArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" />
              <span>Back</span>
            </a>
          </Link>
          <h1 className="text-4xl flex-1">{project.meta.title}</h1>
        </div>
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
    paths: files.map(file => ({ params: { slug: file.slice(0, -3) } })),
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
