import {
  Container,
  Seo,
  Layout,
  ProjectCard,
  Hero,
  PostCard,
} from '@site/components';
import { getAllPosts, getAllProjects } from '@site/utils';
import type { InferGetStaticPropsType } from 'next';

export default function Home({
  projects,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo description="Ashal Farhan Portfolio" />
      <Hero />
      <Container className="flex flex-col mb-10">
        <h1 className="md:text-3xl font-bold text-2xl">Featured Posts</h1>
        <div className="grid md:grid-cols-2 md:gap-12 grid-cols-1 grid-flow-row gap-8 my-6">
          {posts.map(post => (
            <PostCard meta={post.meta} key={post.meta.id} />
          ))}
        </div>
        <h1 className="md:text-3xl font-bold text-2xl">Personal Projects</h1>
        <div className="grid md:grid-cols-2 md:gap-12 grid-cols-1 grid-flow-row gap-8 my-6">
          {projects.map(project => (
            <ProjectCard project={project} key={project.meta.id} />
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const projects = await getAllProjects();
  const posts = await getAllPosts();
  return {
    props: {
      projects,
      posts: posts.filter(post => post.meta.featured),
    },
  };
};
