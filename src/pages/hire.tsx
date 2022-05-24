import { Seo, Layout, Button, Markdown, Container } from '@site/components';
import { profile } from '@site/config';
import { parseMarkdown } from '@site/libs';
import { getFileContent } from '@site/utils';
import type { InferGetStaticPropsType } from 'next';

export default function HirePage({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo title="Hire Me!" />
      <Container className="max-w-prose mx-auto my-20">
        <Markdown content={content} />
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <Button
            className="flex-auto"
            as="a"
            href={`mailto:${profile.personal.email}`}
          >
            Mail Me
          </Button>
          <Button
            className="flex-auto"
            as="a"
            href="/resume.pdf"
            download={`${profile.fullName}-Resume`}
          >
            My Resume
          </Button>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const raw = getFileContent({
    filename: 'career',
  });
  const content = await parseMarkdown(raw);
  return {
    props: { content },
  };
};
