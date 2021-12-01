import clsx from 'clsx'
import TechIcon, { IconName } from './Icons/TechIcon'

const TechStackBar = ({ technologies, hoverable = false }: { technologies: IconName[]; hoverable?: boolean }) => {
  return (
    <div className="mt-8 flex space-x-4 bg-gray-100 p-2 rounded-md">
      {technologies.map((t, idx) => (
        <span key={t + idx} className={clsx({ ['hover:scale-150 transition-transform']: hoverable })}>
          <TechIcon name={t} />
        </span>
      ))}
    </div>
  )
}

export default TechStackBar
