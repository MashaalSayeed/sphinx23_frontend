import { color } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import theme from "../../../images/theme.png";
import HomeNav from "./homeNav";
import useIntersection from "./interSection";

function Theme(props) {
  const ref = useRef();
  const [view, setView] = useState(false);

  const [progress, setProgress] = useState(false);
  return (
    <div
      className="activity-back"
      style={{ backgroundColor: "#1e1e1e" }}
      ref={ref}
    >
      <div className="simple-scroll">
        <div className="landing-scroll-text">SCROLL</div>
        <div className="landing-scroll-line"></div>
      </div>
      <div className="activity-sections">
        <div
          className={"activity-sec2 activity-sec2-anim"}
          style={{
            background:
              "radial-gradient(62.62% 62.62% at 43.33% 37.38%, rgba(92, 49, 0, 0) 0%, rgba(0, 0, 0, 0.7) 69.27%)",
            ...(view ? { opacity: 1 } : {}),
          }}
        >
          <ParallaxProvider>
            {" "}
            <Parallax
              translateY={[0, 0]}
              translateX={progress < 0.5 ? [-60, 60, "easeInOut"] : []}
              opacity={[0.7, 1]}
              speedx={20}
              // translateY={0}
              className={"activity-sec3-img"}
              style={{ opacity: 1 }}
            >
              <img
                src={theme}
                style={{ height: "100%", objectFit: "cover" }}
              ></img>
            </Parallax>
          </ParallaxProvider>
        </div>
        <div className="activity-sec1">
          <ParallaxProvider>
            {" "}
            <Parallax
              translateY={[0, 0]}
              translateX={progress < 0.5 ? [70, -70, "easeInOut"] : []}
              opacity={progress < 0.5 ? [0.6, 1, "easeInOut"] : [1, 1]}
              // shouldAlwaysCompleteAnimation={true}
              speedx={-30}
              onProgressChange={(progress) => setProgress(progress)}
            >
              <div
                style={{
                  width: "80%",
                  marginLeft: "8%",
                  ...(view ? { opacity: 1 } : {}),
                }}
                className={"about-info activity-info-anim2"}
              >
                <div className="activity-info-sub">SPHINX ‘23</div>
                <div className="home-about-title">THEME</div>
                <div
                  className="about-Maincontent"
                  style={{ marginTop: "20px", marginBottom: "10px" }}
                >
                  Sphinx is the largest technology fest in Rajasthan, held
                  annually at the MNIT Jaipur campus. The fest attracts
                  thousands of students from all over the country, who come to
                  participate in a wide range of technical and non-technical
                  events. The event includes workshops, competitions, guest
                  lectures and exhibitions on the latest technology and
                  innovations.
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
          </ParallaxProvider>
        </div>
      </div>
    </div>
  );
}

export default Theme;
