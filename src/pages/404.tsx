import { Button, Container, Layout, Seo } from '@site/components';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo title="Not Found" />
      <Container className="flex flex-col items-center justify-center min-h-[calc(100vh_-_3.5rem)]">
        <h1 className="text-9xl">404</h1>
        <h2 className="text-xl mb-4">Page not found</h2>
        <p className="mb-8">This page not found (deleted or never exists).</p>
        <Link href="/">
          <Button>Take Me Home</Button>
        </Link>
      </Container>
    </Layout>
  );
}
