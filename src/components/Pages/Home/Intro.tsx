import { Project } from '@site/types';
import { Container, Markdown } from '@site/components';

export function Intro({ data }: { data: Pick<Project, 'html'> }) {
  return (
    <div className="flex flex-col items-center justify-center scroll-mt-16" id="intro">
      <Container className="relative">
        <div className="absolute inset-y-0 left-0 bg-blue-text dark:bg-yellow-border rounded-lg w-2" />
        <Markdown html={data.html} className="md:mx-auto mx-4 ml-6" />
      </Container>
    </div>
  );
}
