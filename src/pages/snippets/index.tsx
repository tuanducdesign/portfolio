import { Container, Layout, Seo } from '@site/components';
import { buildImageKitURL } from '@site/libs';
import { getAllSnippets } from '@site/utils';
import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

export default function SnippetsPage({
  snippets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo
        title="Code Snippets"
        description="Ashal Farhan code snippets and cheatsheet"
        keywords={[
          'code',
          'programming',
          'webdev',
          'development',
          'coding',
          'snippets',
        ]}
        image={buildImageKitURL({
          src: '/projects/project9_-Slq5rX9o.jpg',
        })}
      >
        <link href="https://cdn.jsdelivr.net" rel="preconnect" />
      </Seo>
      <Container className="max-w-2xl w-full my-12 px-4">
        <h1 className="font-bold text-4xl">Code Snippets</h1>
        <p className="text-gray-400 mt-2">
          These are collection of code snippets I&apos;ve used and saved.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {snippets.map(snippet => (
            <Link
              href={'/snippets/' + snippet.meta.slug}
              key={snippet.meta.id}
              passHref
            >
              <a className="rounded-lg p-4 dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors relative">
                <img
                  src={snippet.meta.icon}
                  className="mb-2 absolute top-2 right-2"
                  width={24}
                  height={24}
                  alt={snippet.meta.tags.join(', ')}
                />
                <h3 className="font-bold text-xl">{snippet.meta.title}</h3>
                <p className="text-sm text-gray-400">
                  {snippet.meta.description}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const snippets = await getAllSnippets();
  return {
    props: { snippets },
  };
}
