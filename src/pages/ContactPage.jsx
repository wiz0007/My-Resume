import ContactHero from "../Component/ContactHero/ContactHero";
import Contact from "../Component/Contact/Contact";
import { useSEO } from "../hooks/useSEO";
import { SEO_DATA } from "../seo/seoConfig";

const ContactPage = () => {
  useSEO(SEO_DATA.contact);

  return (
    <>
      <ContactHero />
      <Contact />
    </>
  );
};

export default ContactPage;
