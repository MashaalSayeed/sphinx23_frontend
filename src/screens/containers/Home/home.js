import React, { useState } from "react";
import "../../../styles/home.css";
import grad from "../../../images/home/homeBack.png";
import stars from "../../../images/home/starsBright.png";
import pyraminds from "../../../images/home/pyramids.svg";
import pyramindLine from "../../../images/home/pyramidLine.png";

import HomeNav from "./homeNav";

function Landing() {
  const [currTab, setCurrTab] = useState("Home");
  const Tabs = ["Home", "About", "Contact"];

  return (
    <div className="landing-main">
      <img className="landing-gradient" src={grad}></img>
      <div className="stars-con">
        <img className="landing-stars" src={stars}></img>
      </div>
      <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
      <div className="landing-title">SPHINX</div>
      <div className="landing-pyramids">
        {" "}
        <div className="landing-line-img"></div>
        <img className="landing-pyramids-img" src={pyraminds}></img>
      </div>
      <div className="landing-scroll">
        <div className="landing-scroll-text">SCROLL</div>
        <div className="landing-scroll-line"></div>
      </div>
    </div>
  );
}

export default Landing;
