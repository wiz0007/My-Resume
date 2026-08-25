import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";

const SiteLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default SiteLayout;
