import ProfileHero from "../Component/ProfileHero/ProfileHero";
import HeroStory from "../Component/HeroStory/HeroStory";
import About from "../Component/About/About";
import DeferredSection from "../Component/DeferredSection/DeferredSection";
import Education from "../Component/Education/Education";
import Trainings from "../Component/Training/Trainings";
import { useSEO } from "../hooks/useSEO";
import { SEO_DATA } from "../seo/seoConfig";

const ProfilePage = () => {
  useSEO(SEO_DATA.profile);

  return (
    <>
      <ProfileHero />
      <HeroStory />
      <DeferredSection minHeight="80svh">
        <About />
      </DeferredSection>
      <DeferredSection minHeight="55svh">
        <Education />
      </DeferredSection>
      <DeferredSection minHeight="55svh">
        <Trainings />
      </DeferredSection>
    </>
  );
};

export default ProfilePage;
