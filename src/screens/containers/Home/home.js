import React, { useState } from "react";
import "../../../styles/home.css";
import grad from "../../../images/home/homeBack.png";
import stars from "../../../images/home/starsBright.png";
import pyraminds from "../../../images/home/pyramids.svg";
import pyramindLine from "../../../images/home/pyramidLine.png";
import logo from "../../../images/home/homeLogo.png";
import burger from "../../../images/home/burger.png";

function Landing() {
  const [currTab, setCurrTab] = useState("Home");
  const Tabs = ["Home", "About", "Contact"];

  const Navbar = () => {
    return (
      <div className="landing-navbar">
        <div className="landing-logo">
          <img src={logo}></img>
        </div>
        <div className="landing-tabs">
          {Tabs.map((value, i) => {
            return (
              <div
                className="landing-tab-link"
                key={i}
                onClick={() => {
                  console.log(value);
                  setCurrTab(value);
                }}
                style={
                  currTab == value ? { textShadow: "0px 1px 3px #FFFFFF " } : {}
                }
              >
                {value}
              </div>
            );
          })}
        </div>
        <div className="landing-ham">
          <img src={burger}></img>
        </div>
      </div>
    );
  };

  return (
    <div className="landing-main">
      <img className="landing-gradient" src={grad}></img>
      <div className="stars-con">
        <img className="landing-stars" src={stars}></img>
      </div>
      {Navbar()}
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
