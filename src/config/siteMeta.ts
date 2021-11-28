import { profileData } from './profile'

const siteMeta = {
  title: profileData.name,
  description: profileData.fullName,
  social: {
    twitter: profileData.twitterUsername,
  },
  image: '/images/avatar.jpg',
}

export default siteMeta
