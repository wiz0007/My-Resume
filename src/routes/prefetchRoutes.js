export const routePrefetchers = {
  "/": () => import("../HomePage/HomePage"),
  "/projects": () => import("../pages/ProjectsPage"),
  "/process": () => import("../pages/ProcessPage"),
  "/skills": () => import("../pages/SkillsPage"),
  "/profile": () => import("../pages/ProfilePage"),
  "/contact": () => import("../pages/ContactPage"),
};

const warmedRoutes = new Set();

export const prefetchRoute = (path) => {
  if (warmedRoutes.has(path)) return;
  const prefetcher = routePrefetchers[path];
  if (!prefetcher) return;

  warmedRoutes.add(path);
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => prefetcher(), { timeout: 1400 });
    return;
  }

  window.setTimeout(() => prefetcher(), 120);
};
