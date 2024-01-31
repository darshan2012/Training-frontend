import React from "react";
import logo from "../components/osllogo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to={"/"}>
        <img className="logo" src={logo} />
      </Link>
    </>
  );
}

export default Logo;
