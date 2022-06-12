import { allPosts, allProjects } from '@content';
import {
  Container,
  Seo,
  Layout,
  ProjectCard,
  Hero,
  PostCard,
} from '@site/components';
import { pick } from '@site/utils';
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
        <h2 className="md:text-3xl font-bold text-2xl">Featured Posts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4 my-6 mb-16">
          {posts.map(post => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>
        <h2 className="md:text-3xl font-bold text-2xl">Personal Projects</h2>
        <div className="grid lg:grid-cols-2 lg:gap-8 gap-4 my-6">
          {projects.map(project => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => ({
  props: {
    projects: allProjects.map(project =>
      pick(project, ['description', 'title', 'slug', 'technologies']),
    ),
    posts: allPosts
      .filter(post => post.featured)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      .map(post =>
        pick(post, ['title', 'slug', 'publishedAt', 'cover', 'placeholder']),
      ),
  },
});
