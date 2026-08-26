import React from "react";
import PageHero from "../Component/PageHero/PageHero";
import Contact from "../Component/Contact/Contact";

const ContactPage = () => (
  <>
    <PageHero
      eyebrow="Contact"
      title="Let’s build something useful."
      summary="Open to full-stack, frontend, backend, and software engineering opportunities."
      meta={["Roles", "Collaboration", "Technical conversations"]}
      variant="contact"
      videoSrc="/videos/hero-contact.mp4"
      posterSrc="/videos/posters/hero-contact.webp"
      nextId="contact"
    />
    <Contact />
  </>
);

export default ContactPage;
