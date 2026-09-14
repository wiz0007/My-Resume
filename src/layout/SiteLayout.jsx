import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import SiteFooter from "../Component/SiteFooter/SiteFooter";

const SiteLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <SiteFooter />
  </>
);

export default SiteLayout;
