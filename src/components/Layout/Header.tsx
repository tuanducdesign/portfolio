import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Container } from '../Container';
import { BrandIcon, ThemeIcon } from '../Icons';
import { Button } from '../Button';

export const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const toggleDarkMode = () => {
    setTheme(isDark ? 'light' : 'dark');
  };
  return (
    <header className="flex sticky top-0 z-50 backdrop-blur-sm border-b border-b-slate-700 h-14">
      <Container className="flex justify-between items-center px-2 md:px-0">
        <Link href="/" passHref>
          <a
            className="font-bold text-3xl italic text-black-primary dark:text-white-text inline-flex items-center"
            title="Home"
          >
            <BrandIcon />
          </a>
        </Link>
        <Button
          title="Switch Theme"
          color="unstyled"
          className="flex items-center justify-center !p-2"
          onClick={toggleDarkMode}
        >
          <ThemeIcon theme={resolvedTheme} />
        </Button>
      </Container>
    </header>
  );
};
