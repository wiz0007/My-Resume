import ProjectsHero from "../Component/ProjectsHero/ProjectsHero";
import Projects from "../Component/Project/Project";
import ProjectInquiry from "../Component/ProjectInquiry/ProjectInquiry";
import { useSEO } from "../hooks/useSEO";
import { SEO_DATA } from "../seo/seoConfig";

const ProjectsPage = () => {
  useSEO(SEO_DATA.projects);

  return (
    <>
      <ProjectsHero />
      <Projects />
      <ProjectInquiry />
    </>
  );
};

export default ProjectsPage;
