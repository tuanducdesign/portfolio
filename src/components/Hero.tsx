import Link from 'next/link';
import { Container, Button } from '@site/components';
import { profile } from '@site/config';

export function Hero() {
  return (
    <Container className="flex items-center justify-center h-[calc(100vh_-_3.5rem)]">
      <div className="flex flex-col md:gap-y-4 gap-y-2 items-center relative">
        <h1 className="md:text-6xl text-4xl font-bold lg:text-left text-center w-full">
          Hi!&nbsp;
          <span className="inline-block motion-safe:animate-waving-hand origin-bottom-right">
            👋
          </span>
          <span className="md:inline block">
            &nbsp;I&apos;m&nbsp;
            <span className="text-primary">{profile.name}</span>
          </span>
        </h1>
        <p className="md:text-2xl font-semibold text-lg text-neutral lg:text-left text-center max-w-[720px] motion-safe:animate-fade-up">
          {profile.highlight}
        </p>
        <div className="flex gap-4 lg:flex-row flex-col w-full relative top-4 motion-safe:animate-fade-up">
          <Link href="/hire" passHref>
            <Button className="text-xl" as="a">
              Hire Me
            </Button>
          </Link>
          <Link href="/blog" passHref>
            <Button className="text-xl" as="a">
              Blog
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
