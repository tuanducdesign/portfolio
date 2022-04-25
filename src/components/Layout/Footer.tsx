import { FaCodepen, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { TechIcon } from '../Icons';
import { profileData } from '@site/config';

export const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 bg-gray-100 p-8 flex items-center justify-center flex-col space-y-4">
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
      <div className="h-[1px] dark:bg-white bg-gray-800 w-1/4" />
      <div className="flex items-center justify-center flex-col text-sm">
        <div className="flex space-x-2 items-center">
          <span>&copy; {new Date().getFullYear()} - Built with</span>
          <TechIcon name="next_js" className="dark:fill-white" />
        </div>
        <div className="flex items-center space-x-2">
          <span>Developed by</span>
          <span className="text-blue-400">{profileData.fullName}</span>
        </div>
      </div>
    </footer>
  );
};
