import Hero from '../Component/Hero/Hero'
import HomeProfile from '../Component/HomeProfile/HomeProfile'
import HomeGateway from '../Component/HomeGateway/HomeGateway'
import { useSEO } from '../hooks/useSEO'
import { SEO_DATA } from '../seo/seoConfig'

const HomePage = () => {
  useSEO(SEO_DATA.home)

  return (
    <div>
      <Hero/>
      <HomeProfile/>
      <HomeGateway/>
    </div>
  )
}

export default HomePage
