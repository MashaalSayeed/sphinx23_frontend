import React, { useEffect, useState } from "react";
import machine from "./../../../images/home/timeMach1.png";
import Landing from "./home";
import HomeNav from "./homeNav";

function TimeMachine() {
  const [currTab, setCurrTab] = useState("Home");
  const Tabs = ["Home", "About", "Contact"];

  return (
    <div className="parallax-container" id="home">
      <img className="machine-img" id="machine" src={machine}></img>
      <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />

      <div className="machine-text">
        <div className="machine-text-header">
          Let’s go on adventurous time travel{" "}
        </div>
        <div className="machine-text-sub">
          "Join us on a journey through time and space - the ultimate Time
          Travel Adventure awaits"
        </div>
      </div>
    </div>
  );
}

export default TimeMachine;
