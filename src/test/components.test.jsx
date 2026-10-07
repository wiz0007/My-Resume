import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// Page imports
import HomePage from "../HomePage/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import ProcessPage from "../pages/ProcessPage";
import SkillsPage from "../pages/SkillsPage";
import ProfilePage from "../pages/ProfilePage";
import ContactPage from "../pages/ContactPage";

// Global Layout components
import Navbar from "../Component/Navbar/Navbar";
import SiteFooter from "../Component/SiteFooter/SiteFooter";

// Component imports
import HomeGateway from "../Component/HomeGateway/HomeGateway";
import ProjectsHero from "../Component/ProjectsHero/ProjectsHero";
import ProcessHero from "../Component/ProcessHero/ProcessHero";
import SkillsHero from "../Component/SkillsHero/SkillsHero";
import ProfileHero from "../Component/ProfileHero/ProfileHero";
import ContactHero from "../Component/ContactHero/ContactHero";
import Project from "../Component/Project/Project";
import ProjectInquiry from "../Component/ProjectInquiry/ProjectInquiry";
import SkillsArchitecture from "../Component/SkillsArchitecture/SkillsArchitecture";
import SkillsMobile from "../Component/Skills/SkillsMobile";
import ProfileDossier from "../Component/ProfileDossier/ProfileDossier";
import Education from "../Component/Education/Education";
import Trainings from "../Component/Training/Trainings";
import Contact from "../Component/Contact/Contact";

// Helper wrapper for routing
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Component Runtime Smoke & Reference Integrity Suite", () => {
  describe("Layout & Navigation", () => {
    it("renders Navbar without errors", () => {
      const { container } = renderWithRouter(<Navbar />);
      expect(container).toBeDefined();
    });

    it("renders SiteFooter without errors", () => {
      const { container } = renderWithRouter(<SiteFooter />);
      expect(container).toBeDefined();
    });
  });

  describe("Heros & HomeGateway", () => {
    it("renders HomeGateway and all preview graphics without ReferenceError", () => {
      const { container } = renderWithRouter(<HomeGateway />);
      expect(container).toBeDefined();
      expect(container.querySelectorAll("a").length).toBeGreaterThan(0);
    });

    it("renders ProjectsHero without errors", () => {
      const { container } = renderWithRouter(<ProjectsHero />);
      expect(container).toBeDefined();
    });

    it("renders ProcessHero without errors", () => {
      const { container } = renderWithRouter(<ProcessHero />);
      expect(container).toBeDefined();
    });

    it("renders SkillsHero without errors", () => {
      const { container } = renderWithRouter(<SkillsHero />);
      expect(container).toBeDefined();
    });

    it("renders ProfileHero without errors", () => {
      const { container } = renderWithRouter(<ProfileHero />);
      expect(container).toBeDefined();
    });

    it("renders ContactHero without errors", () => {
      const { container } = renderWithRouter(<ContactHero />);
      expect(container).toBeDefined();
    });
  });

  describe("Body & Feature Components", () => {
    it("renders Project bento showcase without errors", () => {
      const { container } = renderWithRouter(<Project />);
      expect(container).toBeDefined();
    });

    it("renders ProjectInquiry without errors", () => {
      const { container } = renderWithRouter(<ProjectInquiry />);
      expect(container).toBeDefined();
    });

    it("renders SkillsArchitecture rail without errors", () => {
      const { container } = renderWithRouter(<SkillsArchitecture />);
      expect(container).toBeDefined();
    });

    it("renders SkillsMobile accordion without errors", () => {
      const { container } = renderWithRouter(<SkillsMobile />);
      expect(container).toBeDefined();
    });

    it("renders ProfileDossier execution pipeline without errors", () => {
      const { container } = renderWithRouter(<ProfileDossier />);
      expect(container).toBeDefined();
    });

    it("renders Education timeline without errors", () => {
      const { container } = renderWithRouter(<Education />);
      expect(container).toBeDefined();
    });

    it("renders Trainings credential matrix without errors", () => {
      const { container } = renderWithRouter(<Trainings />);
      expect(container).toBeDefined();
    });

    it("renders Contact form and channels without errors", () => {
      const { container } = renderWithRouter(<Contact />);
      expect(container).toBeDefined();
    });
  });

  describe("Full Page Smoke Tests", () => {
    it("renders HomePage without errors", () => {
      const { container } = renderWithRouter(<HomePage />);
      expect(container).toBeDefined();
    });

    it("renders ProjectsPage without errors", () => {
      const { container } = renderWithRouter(<ProjectsPage />);
      expect(container).toBeDefined();
    });

    it("renders ProcessPage without errors", () => {
      const { container } = renderWithRouter(<ProcessPage />);
      expect(container).toBeDefined();
    });

    it("renders SkillsPage without errors", () => {
      const { container } = renderWithRouter(<SkillsPage />);
      expect(container).toBeDefined();
    });

    it("renders ProfilePage without errors", () => {
      const { container } = renderWithRouter(<ProfilePage />);
      expect(container).toBeDefined();
    });

    it("renders ContactPage without errors", () => {
      const { container } = renderWithRouter(<ContactPage />);
      expect(container).toBeDefined();
    });
  });
});
