import { color } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import theme from "../../../images/theme.png";
import themeBack from "../../../images/themeMob.png";
import ConR from "../../../images/ambCon.png";
import HomeNav from "./homeNav";
import useIntersection from "./interSection";
import { RandomReveal } from "react-random-reveal";

function Theme(props) {
  const { width } = props;
  const ref = useRef();
  const [view, setView] = useState(false);
  const [progress, setProgress] = useState(false);
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const random = (value, interval) => {
    // return <>{value}</>;
    return (
      <RandomReveal
        isPlaying
        duration={1}
        revealDuration={1}
        revealEasing="linear"
        updateInterval={interval}
        characterSet={alphabet}
        characters={value}
        ignoreCharacterSet={[" "]}
        // onComplete={() => {
        //   setHover("");
        // }}
      />
    );
  };
  return (
    <div className="activity-back amb-back" ref={ref}>
      <div className="simple-scroll">
        <div className="landing-scroll-text">SCROLL</div>
        <div className="landing-scroll-line"></div>
      </div>
      <div className="activity-sections">
        {!width && (
          <div
            className={"activity-sec2 activity-sec2-anim"}
            style={{
              background:
                "radial-gradient(62.62% 62.62% at 43.33% 37.38%, rgba(92, 49, 0, 0) 0%, rgba(0, 0, 0, 0.7) 69.27%)",
              opacity: 1,
            }}
          >
            <Parallax
              translateY={[0, 0]}
              translateX={progress < 0.5 ? [-60, 60, "easeInOut"] : []}
              opacity={[0.7, 1]}
              speedx={20}
              // translateY={0}
              className={"activity-sec3-img"}
              style={{ opacity: 1 }}
              onProgressChange={(progress) => setProgress(progress)}
            >
              <img
                src={theme}
                style={{ height: "100%", objectFit: "cover" }}
              ></img>
            </Parallax>
          </div>
        )}
        <div className="activity-sec1 mobileResp-Amb1">
          <Parallax
            translateY={width ? (progress < 0.5 ? [40, -40] : [0, 0]) : [0, 0]}
            translateX={
              !width ? (progress < 0.5 ? [60, -60, "easeInOut"] : [0, 0]) : []
            }
            opacity={
              progress < (width ? 0.3 : 0.4) ? [0.6, 1, "easeInOut"] : [1, 1]
            }
            // shouldAlwaysCompleteAnimation={true}
            speedx={-30}
            // className={"theme-para"}
            style={{ height: "100%" }}
            onProgressChange={(progress) => setProgress(progress)}
          >
            <div className="campInfo">
              <div className="activity-info-sub">
                {" "}
                {progress > (width ? 0.1 : 0.4) ? random("THEME") : <> THEME</>}
              </div>
              <div className="home-about-title">
                {" "}
                {progress > (width ? 0.3 : 0.2) ? (
                  random("ARE WE ACTUALLY EVOLVING?")
                ) : (
                  <> ARE WE ACTUALLY EVOLVING?</>
                )}
              </div>
              <div
                className="about-Maincontent"
                style={{ marginTop: "20px", marginBottom: "10px" }}
              >
                Sphinx is the largest techno-management fest of Rajasthan and it
                has been the face of technical prowess of Malaviya National
                Institute of Technology, Jaipur. Technological advancements have
                always boiled down to that one 'right question' asked at the
                'right time'. As mankind stands on the brink of tapping into the
                world of AI, ready to take its next giant leap, this SPHINX
                2023, we compel you to question 'the reality of technological
                evolution'. <br></br>
                <br></br>With the ever changing needs of mankind, we developed
                our technology accordingly. Ancient civilizations have always
                held a special fascination for people, with their rich history
                and enthralling mysteries that transport us back in time, and
                they've all had their contribution at shaping the world as we
                know it today. Ancient Egyptians were great mathematicians,
                knowing how to perform calculations and there's evidence proving
                they were the first to come up with the concept of basic
                fractions. They had knowledge in geometry and they made use of
                these skills to help them take accurate measurements and build
                their impressive monuments. Just think about the Great Pyramids
                and the mathematical and geometrical knowledge this civilization
                had to possess in order to build such massive structures.
              </div>
              {/* <button
                className="home-about-btn"
                style={{
                  background: "#FFA20F",
                  color: "white",
                  padding: "10px 25px",
                }}
              >
                Learn More
              </button> */}
            </div>
          </Parallax>
        </div>
        {width && (
          <Parallax
            translateY={[0, 0]}
            translateX={[0, 0]}
            opacity={[0.1, 1]}
            speedx={20}
            className={"activity-sec3-img mobileResp-Amb2"}
            onProgressChange={(progress) => setProgress(progress)}
          >
            <img src={themeBack}></img>
          </Parallax>
        )}
        {width && (
          <>
            {" "}
            <img className="amb-conL" src={ConR}></img>
            <img className="amb-con" src={ConR}></img>
          </>
        )}
      </div>
    </div>
  );
}

export default Theme;
