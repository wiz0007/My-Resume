import React from "react";
import PageHero from "../Component/PageHero/PageHero";
import Process from "../Component/Process/Process";

const ProcessPage = () => (
  <>
    <PageHero
      eyebrow="Build method"
      title="Brief to shipped software."
      summary="A compact view of how I plan, build, validate, and refine."
      meta={["Discover", "Architect", "Build", "Improve"]}
      variant="process"
      videoSrc="/videos/hero-process.mp4"
      posterSrc="/videos/posters/hero-process.webp"
      nextId="process"
    />
    <Process />
  </>
);

export default ProcessPage;
