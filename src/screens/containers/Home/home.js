import React from "react";
import "../../../styles/home.css";
import grad from "../../../images/home/gradBack.png";

function Landing() {
  return (
    <div className="landing-main">
      <img className="landing-gradient" src={grad}></img>
    </div>
  );
}

export default Landing;
