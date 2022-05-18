import { Project } from '@site/types';
import { Container, Markdown } from '@site/components';

export function Intro({ data }: { data: Pick<Project, 'html'> }) {
  return (
    <div className="flex flex-col items-center justify-center scroll-mt-16" id="intro">
      <Container className="relative px-2 md:px-4 max-w-prose">
        <div className="absolute inset-y-0 -left-2 md:-left-4 bg-gray-text w-1 md:w-2" />
        <Markdown html={data.html} className="md:prose-lg mx-auto" />
      </Container>
    </div>
  );
}
