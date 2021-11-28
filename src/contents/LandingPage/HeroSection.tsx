import Image from 'next/image'
import Link from 'next/link'
import Button from '../../components/Button'
import { profileData } from '../../config/profile'

export function HeroSection() {
  return (
    <div className="container mx-auto flex items-center md:justify-between justify-center px-16 min-h-[100vh] md:flex-row flex-col-reverse">
      <div className="flex flex-col md:space-y-8 space-y-4 md:items-start items-center">
        <h1 className="md:text-6xl text-3xl font-bold leading-snug md:text-left text-center">
          Hi, I am <span className="text-blue-400">{profileData.name},</span> <br /> {profileData.highlight}
        </h1>
        <div className="flex space-x-4">
          <Button className="text-xl" as="a" href="#intro">
            Know More
          </Button>
          <Link href="/hire" passHref>
            <Button className="text-xl" as="a">
              Hire Me
            </Button>
          </Link>
        </div>
      </div>
      <div className="md:max-w-[360px] max-w-[200px]">
        <Image src="/images/avatar.jpg" alt="Avatar" width={360} height={360} className="rounded-full" />
      </div>
    </div>
  )
}
