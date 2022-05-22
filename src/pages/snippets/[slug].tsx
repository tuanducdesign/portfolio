import {
  ChevronLeft,
  Container,
  Layout,
  Markdown,
  Seo,
} from '@site/components';
import { getFiles, getSnippet } from '@site/utils';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

export default function SnippetPage({
  snippet,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo
        title={snippet.meta.title}
        description={snippet.meta.description}
        keywords={snippet.meta.tags}
        image={snippet.meta.icon}
      />
      <Container className="max-w-prose my-12">
        <Link href="/snippets" passHref>
          <a title="Go Back" className="inline-flex items-center gap-x-4 group">
            <ChevronLeft className="group-hover:-translate-x-2 transition-transform duration-300" />
            <span>Back</span>
          </a>
        </Link>
        <div className="flex mt-2 items-start">
          <div className="flex-1">
            <h1 className="font-bold text-3xl">{snippet.meta.title}</h1>
            <p className="text-gray-400 mt-2">{snippet.meta.description}</p>
          </div>
          <img
            src={snippet.meta.icon}
            width={36}
            height={36}
            alt={snippet.meta.tags.join(', ')}
          />
        </div>
        <hr />
        <Markdown content={snippet.content} className="mt-8" />
      </Container>
    </Layout>
  );
}

export const getStaticPaths = () => {
  const files = getFiles('snippets');
  return {
    paths: files.map(slug => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const { slug = '' } = params || {};
  const snippet = await getSnippet({ slug, withContent: true });
  return {
    props: {
      snippet,
    },
  };
};
