/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Button } from '@site/components';
import { profileData } from '@site/config';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { Container } from '@site/components/Container';

export function Hero() {
  const reduce = useReducedMotion();

  const textReveal: Variants = {
    initial: { opacity: 0, y: reduce ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const wavingHand: Variants = {
    initial: { rotateZ: reduce ? 0 : 30, transformOrigin: 'bottom right' },
    animate: { rotateZ: 0, transformOrigin: 'bottom right' },
  };
  return (
    <Container className="flex items-center justify-center min-h-[92vh]">
      <motion.div
        initial="initial"
        animate="visible"
        variants={textReveal}
        className="flex flex-col md:gap-y-4 gap-y-2 items-center relative"
      >
        <div>
          <h1 className="md:text-6xl text-4xl font-bold md:text-left text-center w-full">
            Hi!&nbsp;
            <motion.span
              transition={{ repeat: 6, repeatType: 'reverse', repeatDelay: 0, duration: 0.2 }}
              variants={wavingHand}
              initial="initial"
              animate="animate"
              className="inline-block"
            >
              👋
            </motion.span>
            <span className="md:inline block">
              &nbsp;I&apos;m <span className="text-blue-text">{profileData.name}</span>
            </span>
          </h1>
          <motion.p
            initial="initial"
            animate="visible"
            variants={textReveal}
            className="md:text-2xl font-semibold text-lg text-gray-text md:text-left text-center max-w-[720px]"
          >
            {profileData.highlight}
          </motion.p>
        </div>
        <motion.div
          initial="initial"
          animate="visible"
          variants={textReveal}
          className="flex md:gap-x-4 md:flex-row gap-y-3 md:gap-y-0 flex-col w-full relative top-4"
        >
          <Button className="text-xl" as="a" href="#intro">
            Know More
          </Button>
          <Link href="/hire" passHref>
            <Button className="text-xl" as="a">
              Hire Me
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </Container>
  );
}
