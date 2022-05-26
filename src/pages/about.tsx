import { allPages } from '@content';
import { Container, Layout, Markdown, Seo } from '@site/components';
import type { InferGetStaticPropsType } from 'next';

export default function AboutPage({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo title="About" />
      <Container>
        <Markdown
          content={content}
          className="max-w-prose mx-auto my-16 md:my-20"
        />
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const page = allPages.find(page => page._raw.flattenedPath === 'about');
  if (!page) {
    throw new Error("Content for page 'about' not found");
  }
  return {
    props: { content: page.body.html },
  };
};
