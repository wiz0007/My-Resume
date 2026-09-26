import ProcessHero from "../Component/ProcessHero/ProcessHero";
import Process from "../Component/Process/Process";
import { useSEO } from "../hooks/useSEO";
import { SEO_DATA } from "../seo/seoConfig";

const ProcessPage = () => {
  useSEO(SEO_DATA.process);

  return (
    <>
      <ProcessHero />
      <Process />
    </>
  );
};

export default ProcessPage;
