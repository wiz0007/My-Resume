import SkillsArchitecture from "../Component/SkillsArchitecture/SkillsArchitecture";
import SkillsHero from "../Component/SkillsHero/SkillsHero";
import Skills from "../Component/Skills/Skills";
import { useSEO } from "../hooks/useSEO";
import { SEO_DATA } from "../seo/seoConfig";

const SkillsPage = () => {
  useSEO(SEO_DATA.skills);

  return (
    <>
      <SkillsHero />
      <SkillsArchitecture />
      <Skills />
    </>
  );
};

export default SkillsPage;
