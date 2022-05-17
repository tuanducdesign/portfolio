import { IconName } from '@site/components';

export type MarkdownResult<T = Record<string, unknown>> = {
  html: string;
  meta: {
    slug: string;
    id: string;
  } & T;
};

export type ProjectMeta = {
  title: string;
  liveUrl?: string;
  repoUrl: string;
  thumbnail: string;
  technologies: IconName[];
};

export type PostMeta = {
  title: string;
  description: string;
  tags: string[];
};

export type Project = MarkdownResult<ProjectMeta>;

export type Post = MarkdownResult<PostMeta>;
