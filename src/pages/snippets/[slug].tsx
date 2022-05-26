import { allSnippets } from '@content';
import { BackButton, Container, Layout, Markdown, Seo } from '@site/components';
import { pick } from '@site/helpers';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export default function SnippetPage({
  snippet,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo
        title={snippet.title}
        description={snippet.description}
        keywords={snippet.tags}
        image={snippet.icon}
      />
      <Container className="max-w-prose my-12">
        <BackButton />
        <div className="flex mt-2 items-start">
          <div className="flex-1">
            <h1 className="font-bold text-3xl">{snippet.title}</h1>
            <p className="text-neutral mt-2">{snippet.description}</p>
          </div>
          <img
            src={snippet.icon}
            width={36}
            height={36}
            alt={snippet.tags.join(', ')}
          />
        </div>
        <hr />
        <Markdown content={snippet.body.html} className="mt-8" />
      </Container>
    </Layout>
  );
}

export const getStaticPaths = () => ({
  paths: allSnippets.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const { slug = '' } = params || {};
  const snippet = allSnippets.find(snippet => snippet.slug === slug);
  if (!snippet) {
    throw new Error(`Snippet with slug ${slug} not found`);
  }
  return {
    props: {
      snippet: pick(snippet, ['title', 'body', 'tags', 'description', 'icon']),
    },
  };
};
