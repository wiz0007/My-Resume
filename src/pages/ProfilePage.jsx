import ProfileHero from "../Component/ProfileHero/ProfileHero";
import ProfileDossier from "../Component/ProfileDossier/ProfileDossier";
import Education from "../Component/Education/Education";
import Trainings from "../Component/Training/Trainings";
import { useSEO } from "../hooks/useSEO";
import { SEO_DATA } from "../seo/seoConfig";

const ProfilePage = () => {
  useSEO(SEO_DATA.profile);

  return (
    <>
      <ProfileHero />
      <ProfileDossier />
      <Education />
      <Trainings />
    </>
  );
};

export default ProfilePage;
