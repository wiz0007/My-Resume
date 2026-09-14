import { Navigate, Routes, Route } from "react-router-dom";
import SiteLayout from "../layout/SiteLayout";
import HomePage from "../HomePage/HomePage";
import ContactPage from "../pages/ContactPage";
import ProcessPage from "../pages/ProcessPage";
import ProfilePage from "../pages/ProfilePage";
import ProjectsPage from "../pages/ProjectsPage";
import SkillsPage from "../pages/SkillsPage";

const AllRoutes = () => (
  <Routes>
    <Route element={<SiteLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/process" element={<ProcessPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AllRoutes;
