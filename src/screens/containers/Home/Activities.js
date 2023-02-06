import { color } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
import pyramid from "../../../images/activityPyramid.png";
import useIntersection from "./interSection";

function Activities(props) {
  const { width } = props;
  const ref = useRef();
  const [view, setView] = useState(false);
  const [progress, setProgress] = useState(false);

  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setScrollPos(window.pageYOffset);
  };

  const MobileViewAnim = {
    translateY: [0, 0],
    translateX: [0, 0],
    opacity: progress < 0.5 ? [0.0, 1, "easeInOut"] : [1, 1],
    // shouldAlwaysCompleteAnimation={true}
    speedx: 2,
  };

  return (
    <div className="activity-back" ref={ref}>
      <div className="simple-scroll">
        <div className="landing-scroll-text">SCROLL</div>
        <div className="activity-scroll-line"></div>
      </div>
      <div className="activity-sections">
        <div className="activity-sec1">
          <Parallax
            translateY={[0, 0]}
            translateX={
              width
                ? MobileViewAnim.translateX
                : progress < 0.5
                ? [-50, 50, "easeInOut"]
                : []
            }
            opacity={
              width
                ? MobileViewAnim.opacity
                : progress < 0.5
                ? [0.6, 1, "easeInOut"]
                : [1, 1]
            }
            // shouldAlwaysCompleteAnimation={true}
            speedx={-30}
            onProgressChange={(progress) => setProgress(progress)}
          >
            <div
              style={{
                width: "80%",
                ...(view ? { opacity: 1 } : { opacity: 1 }),
              }}
              className={"about-info"}
              // style={}
            >
              <div className="activity-info-sub">SPHINX ‘23</div>
              <div className="home-about-title">ACTIVITIES</div>
              <div className="about-Maincontent">
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
                Explore
              </button>
            </div>
          </Parallax>
        </div>

        <div
          className={"activity-sec3"}
          style={
            width
              ? {
                  height: "100vh",
                  background: `linear-gradient(180deg, #000000 40.63%, #0F0900  ${
                    120000 / scrollPos < 48 ? 48 : 120000 / scrollPos
                  }%, #FF9B02 ${
                    170000 / scrollPos < 80 ? 80 : 170000 / scrollPos
                  }%, #FFE194 100%)`,
                }
              : {
                  // gradient(180deg, #000000 40.63%, #0F0900 51.56%, #FF9B02 85.42%, #FFE194 100%);
                  //   background: `linear-gradient(${scrollPos / 2}deg,
                  //   rgba(255,0,0,${
                  //     scrollPos / 10000 > 0.5 ? 0.5 : scrollPos / 10000
                  //   }),
                  //   rgba(0,255,0,${
                  //     scrollPos / 10000 > 0.5 ? 0.5 : scrollPos / 10000
                  //   })
                  // )`,
                }
          }
        >
          {/* <ParallaxBanner
            layers={[
              { image: "../../../images/activityPyramid.png", speed: -15 },
            ]}
            className={"activity-sec3-img"}
          /> */}
          <Parallax
            // translateY={[0, 0]}
            translateY={progress < 0.497 ? [100, -100, "easeInOut"] : [0, 0]}
            // opacity={progress < 0.5 ? [0.9, 1, "easeInOut"] : [1, 1]}
            speed={10}
            // translateY={0}
            onProgressChange={(progress) => {
              setProgress(progress);
            }}
            className={"activity-sec3-img"}
            style={{ opacity: 1 }}
          >
            <img src={pyramid}></img>
          </Parallax>
        </div>

        {/* <div
          className={
            inViewport && !view
              ? "activity-sec2 activity-sec2-anim"
              : "activity-sec2"
          }
          style={view ? { opacity: 1 } : { opacity: 1 }}
        >
          <img src={pyramid}></img>
        </div> */}
      </div>
    </div>
  );
}

export default Activities;
