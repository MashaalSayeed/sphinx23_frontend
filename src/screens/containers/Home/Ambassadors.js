import { color } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import ambassador from "../../../images/ambassador.png";
import ambMobile from "../../../images/ambMobile.png";
import ConR from "../../../images/ambCon.png";
import HomeNav from "./homeNav";
import useIntersection from "./interSection";

function Ambassador(props) {
  const [currTab, setCurrTab] = useState("ambassador");
  const Tabs = ["Home", "About", "Contact"];
  const ref = useRef();
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [view, setView] = useState(false);
  // const [width, setWidth] = useState(false);
  const { width } = props;

  const MobileViewAnimImg = {
    translateY: [0, 0],
    translateX: [0, 0],
    opacity: progress < 0.5 ? [0.0, 1, "easeInOut"] : [1, 1],
    // shouldAlwaysCompleteAnimation={true}
    speedx: 2,
  };
  const MobileViewAnimText = {
    translateY: progress2 < 0.5 ? [60, -60] : [0, 0],
    translateX: [0, 0],
    opacity: progress2 < 0.5 ? [0.0, 1, "easeInOut"] : [1, 1],
    // shouldAlwaysCompleteAnimation={true}
    speedx: 30,
  };

  return (
    <div className="activity-back amb-back" ref={ref}>
      {/* <HomeNav
        setCurrTab={setCurrTab}
        currTab={currTab}
        Tabs={Tabs}
        notanimation={true}
      /> */}

      <div className="simple-scroll">
        <div className="landing-scroll-text">SCROLL</div>
        <div className="landing-scroll-line"></div>
      </div>
      <div className="activity-sections">
        {!width && (
          <div
            className={
              !view ? "activity-sec2 activity-sec2-anim" : "activity-sec2"
            }
            style={{
              background:
                "radial-gradient(62.62% 62.62% at 43.33% 37.38%, rgba(92, 49, 0, 0) 0%, rgba(0, 0, 0, 0.7) 69.27%)",
              ...(view && { opacity: 1 }),
            }}
          >
            (
            <Parallax
              translateY={width ? MobileViewAnimText.translateY : [0, 0]}
              translateX={
                width
                  ? MobileViewAnimText.translateX
                  : progress < 0.5
                  ? [-60, 60, "easeInOut"]
                  : []
              }
              opacity={[0.7, 1]}
              speedx={20}
              // translateY={0}
              onProgressChange={(progress) => setProgress(progress)}
              shouldAlwaysCompleteAnimation={true}
              className={"activity-sec3-img mobileResp-Amb2"}
              style={{ opacity: 1 }}
            >
              <img
                src={ambassador}
                style={{ height: "100%", objectFit: "cover" }}
              ></img>
            </Parallax>
            )
          </div>
        )}
        {width && (
          <Parallax
            translateY={[0, 0]}
            translateX={[0, 0]}
            opacity={[0.1, 1]}
            speedx={20}
            className={"activity-sec3-img mobileResp-Amb2"}
            onProgressChange={(progress) => {
              setProgress(progress);
            }}
          >
            <img src={ambMobile}></img>
          </Parallax>
        )}
        <div className="activity-sec1 mobileResp-Amb1">
          {" "}
          <Parallax
            translateY={width ? MobileViewAnimText.translateY : [0, 0]}
            translateX={
              !width
                ? progress2 < 0.5
                  ? [60, -60, "easeInOut"]
                  : [0, 0]
                : [0, 0]
            }
            opacity={progress2 < 0.495 ? [0.6, 1, "easeInOut"] : [1, 1]}
            shouldAlwaysCompleteAnimation={true}
            speedx={-20}
            // className={width ? "theme-para" : ""}
            style={{ height: "100%" }}
            onProgressChange={(progress2) => setProgress2(progress2)}
          >
            <div className="campInfo">
              <div className="activity-info-sub">SPHINX ‘23</div>
              <div className=" amb-title">
                CAMPUS
                <br></br>
                <span style={{ color: "#FFA20F" }}>AMBASSADOR</span>
              </div>

              <div className="about-Maincontent amb-Maincontent">
                Sphinx is the largest technology fest in Rajasthan, held
                annually at the MNIT Jaipur campus. The fest attracts thousands
                of students from all over the country, who come to participate
                in a wide range of technical and non-technical events. The event
                includes workshops, competitions, guest lectures and exhibitions
                on the latest technology and innovations.
              </div>
              <button
                className="home-about-btn"
                style={{
                  background: "#FFA20F",
                  color: "white",
                  padding: "10px 25px",
                }}
              >
                Learn More
              </button>
            </div>
          </Parallax>
          <img className="amb-conL" src={ConR}></img>
          <img className="amb-con" src={ConR}></img>
        </div>
      </div>
    </div>
  );
}

export default Ambassador;
