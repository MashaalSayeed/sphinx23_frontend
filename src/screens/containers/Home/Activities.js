import { color } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {
  Parallax,
  ParallaxBanner,
  ParallaxProvider,
} from "react-scroll-parallax";
import pyramid from "../../../images/activityPyramid.png";
import useIntersection from "./interSection";

function Activities() {
  const ref = useRef();
  const [view, setView] = useState(false);

  const inViewport = useIntersection(ref, "-100px");
  useEffect(() => {
    if (inViewport) {
      setTimeout(() => {
        setView(true);
      }, 2000);
    }
  }, [inViewport]);
  return (
    <div className="activity-back" ref={ref}>
      <div className="simple-scroll">
        <div className="landing-scroll-text">SCROLL</div>
        <div className="activity-scroll-line"></div>
      </div>
      <div className="activity-sections">
        <div className="activity-sec1">
          <div
            style={{ width: "80%", ...(view ? { opacity: 1 } : {}) }}
            className={
              inViewport && !view
                ? "about-info activity-info-anim"
                : "about-info"
            }
            // style={}
          >
            <div className="activity-info-sub">SPHINX ‘23</div>
            <div className="home-about-title">ACTIVITIES</div>
            <div className="about-Maincontent">
              Sphinx is the largest technology fest in Rajasthan, held annually
              at the MNIT Jaipur campus. The fest attracts thousands of students
              from all over the country, who come to participate in a wide range
              of technical and non-technical events. The event includes
              workshops, competitions, guest lectures and exhibitions on the
              latest technology and innovations.
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
        </div>

        <div className={"activity-sec3"}>
          {/* <ParallaxBanner
            layers={[
              { image: "../../../images/activityPyramid.png", speed: -15 },
            ]}
            className={"activity-sec3-img"}
          /> */}
          <ParallaxProvider>
            {" "}
            <Parallax
              translateY={[80, 0]}
              opacity={[0.9, 1]}
              speed={40}
              // translateY={0}
              className={"activity-sec3-img"}
              style={{ opacity: 1 }}
            >
              <img src={pyramid}></img>
            </Parallax>
          </ParallaxProvider>
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
