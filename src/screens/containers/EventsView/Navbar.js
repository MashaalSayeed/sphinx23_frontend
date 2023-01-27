import React, { useEffect } from "react";
import logo from "../../../images/home/homeLogo.png";
import burger from "../../../images/home/burger.png";

function Navbar() {
  return (
    <div className="landing-navbar-notAnim">
      <div className="landing-logo">
        <img src={logo}></img>
      </div>
      <div className="landing-ham">
        <img src={burger}></img>
      </div>
    </div>
  );
}

export default Navbar;
