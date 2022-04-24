import { IconName } from '@site/components';

export type ProjectMeta = {
  title: string;
  liveUrl?: string;
  repoUrl: string;
  thumbnail: string;
  id: string;
  slug: string;
  technologies: IconName[];
};

export type Project = {
  html: string;
  meta: ProjectMeta;
};
