import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SiteLayout from "../layout/SiteLayout";
import RouteFallback from "./RouteFallback";

const HomePage = lazy(() => import("../HomePage/HomePage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const ProcessPage = lazy(() => import("../pages/ProcessPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));
const SkillsPage = lazy(() => import("../pages/SkillsPage"));

const AllRoutes = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
