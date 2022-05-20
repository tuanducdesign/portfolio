import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Container } from '../Container';
import { BrandIcon, ThemeIcon } from '../Icons';

export const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const toggleDarkMode = () => {
    setTheme(isDark ? 'light' : 'dark');
  };
  return (
    <header className="flex sticky top-0 z-50 backdrop-blur-sm border-b border-b-slate-700">
      <Container className="flex justify-between items-center py-2 px-2">
        <Link href="/" passHref>
          <a
            className="font-bold text-3xl italic text-black-primary dark:text-white-text inline-flex items-center"
            title="Home"
          >
            <BrandIcon />
          </a>
        </Link>
        <button
          title="Switch Theme"
          className="rounded-lg flex items-center justify-center p-2"
          onClick={toggleDarkMode}
        >
          <ThemeIcon theme={resolvedTheme} />
        </button>
      </Container>
    </header>
  );
};
