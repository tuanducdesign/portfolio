/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Button } from '@site/components';
import { profileData } from '@site/config';
import { motion, useReducedMotion, Variants } from 'framer-motion';

export function HeroSection() {
  const reduce = useReducedMotion();
  const textReveal: Variants = {
    initial: { opacity: 0, y: reduce ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imgScaleDown: Variants = {
    initial: { opacity: 0, scale: reduce ? 1 : 1.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="container mx-auto flex items-center md:justify-between justify-center px-16 min-h-[100vh] md:flex-row flex-col-reverse">
      <motion.div
        initial="initial"
        animate="visible"
        variants={textReveal}
        className="flex flex-col md:space-y-8 space-y-4 md:items-start items-center"
      >
        <h1 className="md:text-6xl text-3xl font-bold leading-snug md:text-left text-center">
          Hi, I am <span className="text-blue-400">{profileData.name},</span> <br /> {profileData.highlight}
        </h1>
        <div className="flex md:space-x-4 md:flex-row space-y-3 md:space-y-0 flex-col w-full">
          <Button className="text-xl" as="a" href="#intro">
            Know More
          </Button>
          <Link href="/hire" passHref>
            <Button className="text-xl" as="a">
              Hire Me
            </Button>
          </Link>
        </div>
      </motion.div>
      <div className="md:max-w-[360px] max-w-[200px]">
        <motion.img
          initial="initial"
          animate="visible"
          variants={imgScaleDown}
          src="/images/avatar.jpg"
          alt="Avatar"
          width={360}
          height={360}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
