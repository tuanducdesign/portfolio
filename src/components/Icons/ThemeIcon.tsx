import { motion, type Variant } from 'framer-motion';
import { useEffect, useState } from 'react';

const hideIcon = {
  pathLength: 0,
  opacity: 0,
};

const showIcon: Variant = {
  pathLength: 1,
  opacity: 1,
  transition: {
    pathLength: { type: 'spring', duration: 1, bounce: 0, delay: 0.5 },
    opacity: { duration: 0.8 },
  },
};

const moonVariants = {
  light: hideIcon,
  dark: showIcon,
};

const sunVariants = {
  light: showIcon,
  dark: hideIcon,
};

export const ThemeIcon = ({ theme = 'dark' }: { theme?: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span className="h-6 w-6" />;
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-current"
      initial={false}
      animate={theme in sunVariants ? theme : 'dark'}
    >
      {/* Moon */}
      <motion.path
        variants={moonVariants}
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        custom={1}
      ></motion.path>
      {/* SUN */}
      <motion.circle
        variants={sunVariants}
        cx="12"
        cy="12"
        r="5"
      ></motion.circle>
      <motion.line
        variants={sunVariants}
        x1="12"
        y1="1"
        x2="12"
        y2="3"
      ></motion.line>
      <motion.line
        variants={sunVariants}
        x1="12"
        y1="21"
        x2="12"
        y2="23"
      ></motion.line>
      <motion.line
        variants={sunVariants}
        x1="4.22"
        y1="4.22"
        x2="5.64"
        y2="5.64"
      ></motion.line>
      <motion.line
        variants={sunVariants}
        x1="18.36"
        y1="18.36"
        x2="19.78"
        y2="19.78"
      ></motion.line>
      <motion.line
        variants={sunVariants}
        x1="1"
        y1="12"
        x2="3"
        y2="12"
      ></motion.line>
      <motion.line
        variants={sunVariants}
        x1="21"
        y1="12"
        x2="23"
        y2="12"
      ></motion.line>
      <motion.line
        variants={sunVariants}
        x1="4.22"
        y1="19.78"
        x2="5.64"
        y2="18.36"
      ></motion.line>
      <motion.line
        variants={sunVariants}
        x1="18.36"
        y1="5.64"
        x2="19.78"
        y2="4.22"
      ></motion.line>
    </motion.svg>
  );
};
