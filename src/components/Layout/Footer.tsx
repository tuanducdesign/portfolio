import { profile } from '@site/config';
import Link from 'next/link';
import { Container } from '../Container';

const internalLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '#', // TODO: add the page
    label: 'About',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/snippets',
    label: 'Snippets',
  },
];

const profileLinks = [
  {
    href: `https://twitter.com/${profile.personal.twitter}`,
    label: 'Twitter',
  },
  {
    href: `https://linkedin.com/in/${profile.personal.linkedin}`,
    label: 'LinkedIn',
  },
];

const devLinks = [
  {
    href: `https://dev.to/${profile.dev.devTo}`,
    label: 'dev.to',
  },
  {
    href: `https://wakatime.com/@${profile.dev.wakatime}`,
    label: 'WakaTime',
  },
  {
    href: `https://github.com/${profile.dev.github}`,
    label: 'GitHub',
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-t-slate-700 mb-6 md:mb-12">
      <Container className="max-w-2xl w-full grid md:grid-cols-3 gap-4 px-6 md:p-4 mt-8 text-gray-500 dark:text-gray-400">
        <div className="flex flex-col gap-4">
          {internalLinks.map(link => (
            <Link href={link.href} key={link.href + link.label} passHref>
              <a className="hover:text-gray-700 dark:hover:text-gray-500">
                {link.label}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {profileLinks.map(link => (
            <a
              className="hover:text-gray-700 dark:hover:text-gray-500"
              href={link.href}
              key={link.href + link.label}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {devLinks.map(link => (
            <a
              className="hover:text-gray-700 dark:hover:text-gray-500"
              href={link.href}
              key={link.href + link.label}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
};
