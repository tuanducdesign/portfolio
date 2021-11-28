import TechIcon from '../../components/Icons/TechIcon'
import { Project } from '../../types/model'

export function LandingIntro({ data }: { data: Pick<Project, 'html'> }) {
  return (
    <div
      className="bg-blue-200 min-h-screen flex flex-col items-center justify-center relative md:py-8 py-4"
      id="intro"
    >
      <h1 className="uppercase font-bold text-3xl text-center text-black">About Me</h1>
      <article
        className="prose prose-lg md:prose-xl md:mx-auto my-12 mx-4 bg-gray-200 p-4 rounded-lg shadow-lg"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
      <TechIcon name="typescript" className="absolute md:block hidden top-24 right-24" size={32} />
      <TechIcon name="javascript" className="absolute md:block hidden top-24 left-24" size={32} />
      <TechIcon name="node_js" className="absolute md:block hidden bottom-24 left-24" size={32} />
      <TechIcon name="graphql" className="absolute md:block hidden bottom-24 right-24" size={32} />
    </div>
  )
}
