import { Container, Layout, Seo } from '@site/components';
import { getAllSnippets } from '@site/utils';
import type { InferGetStaticPropsType } from 'next';

export default function SnippetsPage({
  snippets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo
        title="Code Snippets"
        description="Ashal Farhan code snippets and cheatsheet"
        keywords={['code', 'programming', 'webdev', 'development', 'coding']}
      >
        <link
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
          rel="preconnect"
          as="style"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
          rel="stylesheet"
        />
      </Seo>
      <Container className="max-w-prose my-12">
        <h1 className="font-bold text-5xl">Code Snippets</h1>
        <p className="text-gray-400 mt-2">
          These are collection of code snippets I&apos;ve used and saved. For
          the most is Frontend Web related, but soon I will add another.
        </p>
        <div>
          {snippets.map(snippet => (
            <div key={snippet.meta.id} className="p-4">
              <h3>{snippet.meta.title}</h3>
              <p>{snippet.meta.description}</p>
            </div>
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
