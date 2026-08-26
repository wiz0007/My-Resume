import React from "react";
import PageHero from "../Component/PageHero/PageHero";
import HeroStory from "../Component/HeroStory/HeroStory";
import About from "../Component/About/About";
import DeferredSection from "../Component/DeferredSection/DeferredSection";
import Education from "../Component/Education/Education";
import Trainings from "../Component/Training/Trainings";

const ProfilePage = () => (
  <>
    <PageHero
      eyebrow="Profile"
      title="Engineer with product instincts."
      summary="Computer Engineering graduate building useful, complete software."
      meta={["Full-stack", "Backend-minded", "Open to roles"]}
      variant="profile"
      videoSrc="/videos/hero-profile.mp4"
      posterSrc="/videos/posters/hero-profile.webp"
      nextId="profile-story"
    />
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

export default ProfilePage;
