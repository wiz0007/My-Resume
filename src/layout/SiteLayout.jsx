import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import SiteFooter from "../Component/SiteFooter/SiteFooter";
import RouteFallback from "../routes/RouteFallback";
import ErrorBoundary from "../Component/ErrorBoundary/ErrorBoundary";

const SiteLayout = () => (
  <>
    <Navbar />
    <ErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
    <SiteFooter />
  </>
);

export default SiteLayout;
