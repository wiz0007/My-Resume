import { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import SiteLayout from "../layout/SiteLayout";
import { lazyWithRetry } from "../utils/lazyWithRetry";

const HomePage = lazyWithRetry(() => import("../HomePage/HomePage"));
const ContactPage = lazyWithRetry(() => import("../pages/ContactPage"));
const ProcessPage = lazyWithRetry(() => import("../pages/ProcessPage"));
const ProfilePage = lazyWithRetry(() => import("../pages/ProfilePage"));
const ProjectsPage = lazyWithRetry(() => import("../pages/ProjectsPage"));
const SkillsPage = lazyWithRetry(() => import("../pages/SkillsPage"));

const ResumeRedirect = () => {
  useEffect(() => {
    window.location.replace("/Ayushmaan_Mishra-Resume.pdf");
  }, []);
  return null;
};

const AllRoutes = () => (
  <Routes>
    <Route element={<SiteLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/process" element={<ProcessPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/resume" element={<ResumeRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AllRoutes;
