import Seo from '../components/Seo'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getMarkdown } from '../utils/getMarkdown'
import { getAllProjects } from '../utils/projects'
import { FeaturedPersonalProjects, HeroSection, LandingIntro } from '../contents/LandingPage'
import { Project } from '../types/model'
import Layout from '../components/Layout'

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo title="Portfolio" />
      <HeroSection />
      <LandingIntro data={props.aboutData} />
      <FeaturedPersonalProjects projects={props.projects} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{ aboutData: Pick<Project, 'html'>; projects: Project[] }> = async () => {
  const projects = await getAllProjects()
  const aboutData = await getMarkdown('about')
  return {
    props: { aboutData, projects },
  }
}
