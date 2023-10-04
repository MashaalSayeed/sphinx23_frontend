import React, { useEffect, useRef, useState } from "react";
import machine from "./../../../images/home/timeMach1.webp";
import Activities from "./Activities";
import { ErrorBoundary } from "react-error-boundary";
import Landing from "./home";
import Ambassador from "./Ambassadors";
import HomeNav from "./homeNav";
import Theme from "./theme";
import About from "./about";
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
import { countdownTimer, useCountdown } from "./coundown";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/footer";
import ScrollIntoView from "react-scroll-into-view";
// import Ambassador from "./Amb

function TimeMachine({ notAnim, landing, setLand }) {
  const [currTab, setCurrTab] = useState("Home");
  const [animNotOver, setNotOver] = useState(true);
  const [title, setTitle] = useState(false);
  const curruser = useSelector((state) => state.auth.curruser);
  const [textIndex, setTextIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setTextIndex((textIndex + 1) % 2);
    }, 6000);
  }, [textIndex]);

  const [activeSection, setActiveSection] = useState(0);

  const handleSectionClick = (sectionNumber) => {
    setActiveSection(sectionNumber);
    const section = document.getElementById(`section-${sectionNumber}`);
    section.scrollIntoView({ behavior: "auto" });
  };

  const Tabs = ["Home", "Events", "Profile"];
  // ////console.log(curruser);
  // if (curruser != null) {
  //   Tabs.push("Profile");
  //   Tabs.push("Logout");
  // } else {
  //   Tabs.push("Login/Register");
  // }
  const handelOver = () => {
    ////console.log("set anim over");
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
  const [width, setWidth] = useState(window.innerWidth < 900 ? true : false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setScrollPos(window.pageYOffset);
  };
  const [parent] = useAutoAnimate({
    duration: 300,
    disrespectUserMotionPreference: true,
  });
  useEffect(() => {
    const handleWindowResize = () =>
      setWidth(window.innerWidth < 900 ? true : false);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  const [expiryTime, setExpiryTime] = useState("03 nov 2023 00:00:00");
  const [countdownTime, setCountdownTime] = useState({
    Days: "",
    Hours: "",
    Minutes: "",
    Seconds: "",
  });
  useEffect(() => {
    countdownTimer({
      setCountdownTime: setCountdownTime,
      expiryTime: expiryTime,
      setExpiryTime: setExpiryTime,
    });
  }, []);

  const AddZero = (val) => {
    if (val < 10) return `0${val}`;
    else return val;
  };

  return (
    <a id="home">
      {" "}
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
        <HomeNav
          setCurrTab={setCurrTab}
          currTab={currTab}
          Tabs={Tabs}
          notanimation={!landing}
          landing={landing && animNotOver}
          setLand={setLand}
        />

        <div className={notAnim ? "time-main" : "parallax-container"} id="home">
          <img
            className="machine-img"
            id="machine"
            src={machine}
            style={
              notAnim ? { animation: "none", filter: "brightness(0.4)" } : {}
            }
          ></img>
          {/* 
        {title ? <div className="home-title"> SPHINX </div> : <></>} */}

          <div
            className={`cardComp `}
            ref={parent}
            style={!landing || !animNotOver ? { animationDelay: 0 } : {}}
          >
            {textIndex == 1 && (
              <div className="timer">
                <div className={!landing ? "timer" : "timer timerAnim"}>
                  <div className="timer-ele">
                    <span>Days</span>
                    <p>{AddZero(countdownTime.Days)}</p>
                  </div>
                  <div className="timer-ele">
                    <span>Hours</span>
                    <p>{AddZero(countdownTime.Hours)}</p>
                  </div>
                  <div className="timer-ele">
                    <span>Minutes</span>
                    <p>{AddZero(countdownTime.Minutes)}</p>
                  </div>
                  <div className="timer-ele">
                    <span>Seconds</span>
                    <p>{AddZero(countdownTime.Seconds)}</p>
                  </div>
                </div>
              </div>
            )}

            {textIndex == 0 && (
              <div className="TitleSp ">
                {" "}
                <span>S</span>
                <span>P</span>
                <span>H</span>
                <span>I</span>
                <span>N</span>
                <span>X</span>{" "}
              </div>
            )}

            {/* */}
          </div>

          {/* <div className="new-animTitle"> SPHINX </div> */}
          {/* </div> */}

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
            <About
              width={width}
              activeSection={activeSection}
              handleSectionClick={handleSectionClick}
            />

            {/* <Ambassador />
          <Activities /> <Theme /> */}
            <Ambassador width={width} />
            <Activities width={width} />
            <Theme width={width} />
            <Footer setCurrTab={setCurrTab} />
          </>
        ) : (
          <></>
        )}
      </div>
    </a>
  );
}

export default TimeMachine;
