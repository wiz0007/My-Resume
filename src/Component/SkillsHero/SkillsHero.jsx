import React from "react";
import PageHero from "../PageHero/PageHero";

const featuredStack = [
  "React",
  "TypeScript",
  "Node",
  "Spring Boot",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "JWT",
];

const SkillsHero = () => (
  <PageHero
    eyebrow="Skills"
    title="Stack, grouped by product layers."
    summary="Interface, services, data, security, tools, and programming fundamentals."
    meta={featuredStack}
    variant="skills"
    videoSrc="/videos/hero-skills.mp4"
    posterSrc="/videos/posters/hero-skills.webp"
    nextId="skills-architecture"
  />
);

export default SkillsHero;
