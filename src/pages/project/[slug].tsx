/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { Project } from '../../types/model'
import { getMarkdown } from '../../utils/getMarkdown'
import { getAllProjectFiles } from '../../utils/projects'
import TechIcon from '../../components/Icons/TechIcon'
import Button from '../../components/Button'

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <Layout>
      <Seo title={project.meta.title} keywords={project.meta.technologies.map((t) => t.replace('_', ' '))} />
      <div className="container mx-auto flex flex-col items-center py-12 md:px-0 px-4">
        <img
          src={'/images/projects' + project.meta.thumbnail}
          alt="asdasdasd"
          width={960}
          height={520}
          className="md:min-w-[840px] md:min-h-[520px] md:max-w-4xl"
        />
        <div className="mt-8 flex space-x-4 bg-gray-100 p-2 rounded-md">
          {project.meta.technologies.map((t, idx) => (
            <span key={t + idx}>
              <TechIcon name={t} />
            </span>
          ))}
        </div>
        <article
          className="prose my-4 p-4 prose-lg md:prose-xl bg-gray-200 rounded-lg"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
        <div className="max-w-2xl flex w-full space-x-8">
          {Boolean(project.meta.liveUrl) && (
            <Button className="flex-auto" as="a" href={project.meta.liveUrl}>
              Demo
            </Button>
          )}
          {Boolean(project.meta.repoUrl) && (
            <Button className="flex-auto" as="a" href={project.meta.repoUrl}>
              Source Code
            </Button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const files = getAllProjectFiles()
  return {
    paths: files.map((file) => ({ params: { slug: file.slice(0, -3) } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultRedirect = { redirect: { destination: '/', permanent: true } }
  if (!params) return defaultRedirect
  const { slug } = params
  if (typeof slug !== 'string') return defaultRedirect
  try {
    const project = (await getMarkdown(slug, true)) as Project
    return {
      props: {
        project,
      },
    }
  } catch (error) {
    return defaultRedirect
  }
}
