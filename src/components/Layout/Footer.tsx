import { FaCodepen, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { TechIcon } from '../Icons';
import { profileData } from '@site/config';

export const Footer = () => {
  return (
    <footer className="p-8 flex items-center justify-center flex-col space-y-4 border-t border-t-slate-700">
      <div className="flex space-x-8">
        <a
          href={profileData.codepenUrl}
          target="_blank"
          title="Codepen Profile"
          rel="noreferrer"
        >
          <FaCodepen size="24" />
        </a>
        <a
          href={profileData.githubUrl}
          target="_blank"
          title="Github Profile"
          rel="noreferrer"
        >
          <FaGithub size="24" />
        </a>
        <a
          href={profileData.linkedinUrl}
          target="_blank"
          title="Linkedin Profile"
          rel="noreferrer"
        >
          <FaLinkedinIn size="24" />
        </a>
      </div>
      <div className="h-[1px] dark:bg-white-text bg-black-primary w-1/4" />
      <div className="flex items-center justify-center flex-col text-sm">
        <div className="flex space-x-2 items-center">
          <span>&copy; {new Date().getFullYear()} - Built with</span>
          <TechIcon name="next_js" className="dark:fill-white" />
        </div>
      </div>
    </footer>
  );
};
