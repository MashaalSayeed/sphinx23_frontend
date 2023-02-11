import React, { useEffect, useState } from "react";
import "../../../styles/home.css";
import grad from "../../../images/home/homeBack.png";
import stars from "../../../images/home/starsBright.png";
import pyraminds from "../../../images/home/pyramids.svg";
import logo from "../../../images/landingLogo.png";

import HomeNav from "./homeNav";
import TimeMachine from "./TimeMachine";
import { useSelector } from "react-redux";

function Landing(props) {
  const { parallax, setLand } = props;
  const curruser = useSelector((state) => state.auth.curruser);
  const [currTab, setCurrTab] = useState("Home");
  const Tabs = ["Home", "Events", "Contact"];
  console.log(curruser);
  // if (curruser != null) {
  //   Tabs.push("Profile");
  //   Tabs.push("Logout");
  // } else {
  //   Tabs.push("Login/Register");
  // }

  const [Loading, setLoading] = useState(true);
  const [Scroll, setScroll] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      // setLand(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const exitStyle = {
    animation: "exitBright 2000ms ease-in-out",
    animationFillMode: "forwards",
  };

  return (
    <div className="home-con">
      <div>
        <div
          className={Loading || !Scroll ? "landing-main" : "exit-anim"}
          onScroll={() => {
            if (!Loading && !parallax) {
              setScroll(true);
            }
          }}
          onTouchMove={() => {
            if (!Loading && !parallax) {
              setScroll(true);
            }
          }}
          onWheel={() => {
            if (!Loading && !parallax) {
              setScroll(true);
            }
          }}
        >
          <img
            className="landing-gradient"
            src={grad}
            style={
              Loading || !Scroll
                ? {}
                : {
                    animation: "exitBright 2000ms ease-in-out",
                    animationFillMode: "forwards",
                  }
            }
          ></img>
          <div
            className="stars-con"
            style={Loading || !Scroll ? {} : exitStyle}
          >
            <img className="landing-stars" src={stars}></img>
          </div>
          <div
            style={
              Loading || !Scroll
                ? {}
                : {
                    animation: "exitHide 1000ms ease-in-out",
                    animationFillMode: "forwards",
                  }
            }
            className="newNavbar"
          >
            <HomeNav
              setCurrTab={setCurrTab}
              currTab={currTab}
              Tabs={Tabs}
              landing={true}
            />
          </div>

          <div
            className={
              Loading || !Scroll ? "landing-title" : "landing-titleanim"
            }
            style={
              Loading || !Scroll
                ? {}
                : {
                    animation: "titleAnim 2000ms ease-in-out",
                    animationFillMode: "forwards",
                  }
            }
            // src={logo}
          >
            <span>S</span>
            <span>P</span>
            <span>H</span>
            <span>I</span>
            <span>N</span>
            <span>X</span>
          </div>
          <div className="landing-pyramids">
            {" "}
            {Loading || !Scroll ? (
              <div
                className="landing-line-img"
                style={
                  Loading || !Scroll
                    ? {}
                    : {
                        animation: "exitBright 2000ms ease-in-out",
                        animationFillMode: "forwards",
                      }
                }
              ></div>
            ) : (
              <></>
            )}
            {/* <div className="landing-line-img"></div> */}
            <img
              className="landing-pyramids-img"
              src={pyraminds}
              style={
                Loading || !Scroll
                  ? {}
                  : {
                      animation: "exitBright 2000ms ease-in-out",
                      animationFillMode: "forwards",
                    }
              }
            ></img>
          </div>
          <div
            className="landing-scroll"
            style={
              Loading || !Scroll
                ? {}
                : {
                    animation: "exitHide 2000ms ease-in-out",
                    animationFillMode: "forwards",
                  }
            }
          >
            <div className="landing-scroll-text">SCROLL</div>
            <div className="landing-scroll-line"></div>
          </div>
        </div>
      </div>
      {/* <div
        className={Loading || !Scroll ? "landing-title" : "landing-titleanim"}
      >
        SPHINX
      </div> */}

      {Loading || !Scroll ? (
        <></>
      ) : (
        <>
          <TimeMachine landing={true} setLand={setLand} />
        </>
      )}
    </div>
  );
}

export default Landing;
