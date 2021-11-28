import Button from '../components/Button'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { profileData } from '../config/profile'
import { getMarkdown } from '../utils/getMarkdown'

type HirePageProps = {
  content: {
    html: string
  }
}

export default function HirePage({ content }: HirePageProps) {
  return (
    <Layout>
      <Seo title="Hire Me!" />
      <div className="container mx-auto pb-12">
        <article
          className="prose prose-lg md:prose-xl md:mx-auto my-12 mx-4 bg-gray-200 p-4 rounded-lg shadow-lg"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
        <div className="max-w-xl mx-auto md:space-x-4 flex md:flex-row flex-col md:space-y-0 space-y-4 px-4">
          <Button className="flex-auto" as="a" href={`mailto:${profileData.email}`}>
            Mail Me
          </Button>
          <Button className="flex-auto" as="a" href={'/resume.pdf'} download={`${profileData.fullName}-Resume`}>
            My Resume
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const content = await getMarkdown('career')
  return {
    props: { content },
  }
}
