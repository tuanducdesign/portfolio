import { allSnippets } from '@content';
import { Container, Layout, Seo } from '@site/components';
import { pick } from '@site/utils';
import { buildImageKitURL } from '@site/libs';
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
          width: 420,
          aspectRatio: '4:3',
        })}
      >
        <link href="https://cdn.jsdelivr.net" rel="preconnect" />
      </Seo>
      <Container className="max-w-2xl w-full my-12 px-4">
        <h1 className="font-bold text-4xl">Code Snippets</h1>
        <p className="text-neutral mt-2">
          These are collection of code snippets I&apos;ve used and saved.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {snippets.map(snippet => (
            <Link
              href={'/snippets/' + snippet.slug}
              key={snippet.title}
              passHref
            >
              <a className="rounded-lg p-3 dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors relative">
                <img
                  src={snippet.icon}
                  className="mb-2 absolute top-3 right-3"
                  width={24}
                  height={24}
                  alt={snippet.tags.join(', ')}
                />
                <h3 className="font-bold text-xl">{snippet.title}</h3>
                <p className="text-sm text-neutral">{snippet.description}</p>
              </a>
            </Link>
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = () => ({
  props: {
    snippets: allSnippets.map(snippet =>
      pick(snippet, ['slug', 'icon', 'title', 'tags', 'description']),
    ),
  },
});
