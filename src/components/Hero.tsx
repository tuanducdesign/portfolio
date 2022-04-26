/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Button } from '@site/components';
import { profileData } from '@site/config';
import { motion, useReducedMotion, Variants } from 'framer-motion';

export function Hero() {
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
    <div className="container mx-auto flex items-center md:justify-between justify-center px-16 min-h-[100vh] md:flex-row flex-col-reverse gap-y-4">
      <motion.div
        initial="initial"
        animate="visible"
        variants={textReveal}
        className="flex flex-col md:gap-y-4 gap-y-2 md:items-start items-center max-w-[640px]"
      >
        <div>
          <h1 className="md:text-6xl text-3xl font-bold md:text-left text-center">Hi! 👋</h1>
          <p className="md:text-6xl text-2xl font-bold md:text-left text-center">
            I am <span className="text-blue-400">{profileData.name}.</span>
          </p>
          <p className="md:text-2xl text-lg text-gray-500 md:text-left text-center">{profileData.highlight}</p>
        </div>
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
