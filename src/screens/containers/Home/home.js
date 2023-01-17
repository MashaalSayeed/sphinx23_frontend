import React, { useEffect, useState } from "react";
import "../../../styles/home.css";
import grad from "../../../images/home/homeBack.png";
import stars from "../../../images/home/starsBright.png";
import pyraminds from "../../../images/home/pyramids.svg";
import pyramindLine from "../../../images/home/pyramidLine.png";

import HomeNav from "./homeNav";
import TimeMachine from "./TimeMachine";

function Landing() {
  const [currTab, setCurrTab] = useState("Home");
  const Tabs = ["Home", "About", "Contact"];
  const [Loading, setLoading] = useState(true);
  const [Scroll, setScroll] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        className={Loading || !Scroll ? "landing-main" : "exit-anim"}
        onWheel={() => {
          if (!Loading) {
            setScroll(true);
          }
        }}
      >
        <img className="landing-gradient" src={grad}></img>
        <div className="stars-con">
          <img className="landing-stars" src={stars}></img>
        </div>
        <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
        <div className="landing-title">SPHINX</div>
        <div className="landing-pyramids">
          {" "}
          {Loading || !Scroll ? (
            <div className="landing-line-img"></div>
          ) : (
            <></>
          )}
          {/* <div className="landing-line-img"></div> */}
          <img className="landing-pyramids-img" src={pyraminds}></img>
        </div>
        <div className="landing-scroll">
          <div className="landing-scroll-text">SCROLL</div>
          <div className="landing-scroll-line"></div>
        </div>
      </div>
      {Loading || !Scroll ? (
        <></>
      ) : (
        <>
          <TimeMachine />
        </>
      )}
    </>
  );
}

export default Landing;
