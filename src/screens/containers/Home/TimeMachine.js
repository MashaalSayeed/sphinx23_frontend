import React, { useEffect, useRef, useState } from "react";
import machine from "./../../../images/home/timeMach1.png";
import Activities from "./Activities";
import { ErrorBoundary } from "react-error-boundary";
import Landing from "./home";
import Ambassador from "./Ambassadors";
import HomeNav from "./homeNav";
import Theme from "./theme";
import About from "./about";
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
// import Ambassador from "./Amb

function TimeMachine({ notAnim, landing }) {
  const [currTab, setCurrTab] = useState("Home");
  const [animNotOver, setNotOver] = useState(true);
  const [title, setTitle] = useState(false);
  const Tabs = ["Home", "About us", "Contact us"];
  const handelOver = () => {
    console.log("set anim over");
    setNotOver(false);
  };
  useEffect(() => {
    if (landing) {
      setTimeout(handelOver, 3600);
    }
  }, [animNotOver]);
  useEffect(() => {
    if (!landing) setTitle(true);
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* {!animNotOver && (
        <ParallaxBanner
          layers={[
            {
              children: <Landing parallax={true} />,
              // translateY: [0, 0],
              // translateX: [0, 0],
              scale: [2, 0],
              speedx: 40,
              // shouldAlwaysCompleteAnimation: true,
            },
            {
              children: (
                <img
                  className="machine-img"
                  id="machine"
                  src={machine}
                  style={
                    notAnim
                      ? { animation: "none", filter: "brightness(0.4)" }
                      : {}
                  }
                ></img>
              ),
              scale: [9, 1],
              speedx: -40,
              // shouldAlwaysCompleteAnimation: true,
            },
          ]}
          // translateY={0}
          // className={"activity-sec3-img"}
          style={{ opacity: 1, height: "100vh" }}
        ></ParallaxBanner>
      )} */}

      <div className={notAnim ? "time-main" : "parallax-container"} id="home">
        <img
          className="machine-img"
          id="machine"
          src={machine}
          style={
            notAnim ? { animation: "none", filter: "brightness(0.4)" } : {}
          }
        ></img>
        <HomeNav
          setCurrTab={setCurrTab}
          currTab={currTab}
          Tabs={Tabs}
          notanimation={notAnim}
          landing={landing && animNotOver}
        />
        {title ? <div className="home-title"> SPHINX </div> : <></>}
        <div
          className="machine-text"
          style={notAnim ? { animation: "none", opacity: "1" } : {}}
        >
          <div className="machine-text-header">
            Let’s go on adventurous time travel{" "}
          </div>
          <div className="machine-text-sub">
            "Join us on a journey through time and space - the ultimate Time
            Travel Adventure awaits"
          </div>
        </div>
      </div>

      {!landing || !animNotOver ? (
        <>
          <About />
          {/* <Ambassador />
          <Activities /> <Theme /> */}
          <Ambassador />
          <Activities />
          <Theme />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TimeMachine;
