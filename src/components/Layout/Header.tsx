import Link from 'next/link';
import { Container } from '../Container';
import { BrandIcon, ThemeIcon } from '../Icons';
import { Button } from '../Button';
import { useTheme } from '@site/utils';

export const Header = () => {
  const { theme, toggle: toggleDarkMode } = useTheme();
  return (
    <header className="flex sticky top-0 z-50 backdrop-blur-sm border-b border-b-slate-700 h-14">
      <Container className="flex justify-between items-center px-2 md:px-0">
        <Link
          href="/"
          className="font-bold text-3xl italic text-dark-primary dark:text-light-primary inline-flex items-center"
          title="Home"
        >
          <BrandIcon />
        </Link>
        <Button
          title="Switch Theme"
          color="unstyled"
          className="flex items-center justify-center !p-2"
          onClick={toggleDarkMode}
          aria-label="Toggle theme"
        >
          <ThemeIcon theme={theme} />
        </Button>
      </Container>
    </header>
  );
};
