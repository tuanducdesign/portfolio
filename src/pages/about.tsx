import { Container, Layout, Markdown, Seo } from '@site/components';
import { parseMarkdown } from '@site/libs';
import { getFileContent } from '@site/utils';
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
  const raw = getFileContent({
    filename: 'about',
  });
  const content = await parseMarkdown(raw);
  return {
    props: { content },
  };
};
