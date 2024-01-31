import React from "react";
import Table from "react-bootstrap/Table";
import { Outlet,useLocation } from "react-router-dom";
import Back from "./Back";
import Logo from "./Logo";
import FooterComp from "./FooterComp";


function Layout() {
  const location = useLocation();
  return (
    <>
    {/* {location.pathname != '/' &&
      <Back />
      
    } */}
    <Logo   />  
      <Outlet />
      <FooterComp />
    </>
  );
}
export default Layout;
