import { IconName } from '../components/Icons/TechIcon'

export type ProjectMeta = {
  title: string
  liveUrl?: string
  repoUrl: string
  thumbnail: string
  id: string
  slug: string
  technologies: IconName[]
}

export type Project = {
  html: string
  meta: ProjectMeta
}
