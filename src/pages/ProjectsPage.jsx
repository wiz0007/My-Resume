import PageHero from "../Component/PageHero/PageHero";
import Projects from "../Component/Project/Project";
import ProjectInquiry from "../Component/ProjectInquiry/ProjectInquiry";

const ProjectsPage = () => (
  <>
    <PageHero
      eyebrow="Selected work"
      title="Projects as working systems."
      summary="Full-stack builds, visual tools, commerce flows, and desktop software."
      meta={["MERN", "Spring Boot", "FastAPI", "Desktop"]}
      variant="projects"
      videoSrc="/videos/hero-projects.mp4"
      posterSrc="/videos/posters/hero-projects.webp"
      nextId="projects"
    />
    <Projects />
    <ProjectInquiry />
  </>
);

export default ProjectsPage;
