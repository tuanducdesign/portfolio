import { ReactNode } from 'react'
import { FaCodepen, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { profileData } from '../../config/profile'
import TechIcon from '../Icons/TechIcon'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-[100vw] flex flex-col bg-gray-900 text-white">
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-700 p-8 flex items-center justify-center flex-col space-y-4">
        <div className="flex space-x-8">
          <a href={profileData.codepenUrl}>
            <FaCodepen size="24" />
          </a>
          <a href={profileData.githubUrl}>
            <FaGithub size="24" />
          </a>
          <a href={profileData.linkedinUrl}>
            <FaLinkedinIn size="24" />
          </a>
        </div>
        <div className="h-[1px] bg-white w-1/4" />
        <div className="flex items-center justify-center flex-col text-sm">
          <div className="flex space-x-2 items-center">
            <span>&copy; {new Date().getFullYear()} - Built with</span>
            <TechIcon name="next_js" />
          </div>
          <div className="flex items-center space-x-2">
            <span>Developed by</span>
            <span className="text-blue-400">{profileData.fullName}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
