import React, { useRef, useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import HomeNav from "./homeNav";
import back from "../../../images/about/PyramidBack.png";
import aboutMob from "../../../images/aboutMob.png";
import { RandomReveal } from "react-random-reveal";
// import aboutMob from "../../../images/about/PyramidFront.png";
// import useIntersection from "./interSection";
import { useEffect } from "react";
import useIntersection from "./interSection";
export default function About(props) {
  const { width } = props;
  const [currTab, setCurrTab] = useState("About");
  // const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  const MobileViewAnimText = {
    translateY: progress < 0.5 ? [100, -100, "easeInOut"] : [0, 0],
    translateX: [-100, 100],
    opacity: progress < 0.5 ? [0.0, 1, "easeInOut"] : [1, 1],
    // shouldAlwaysCompleteAnimation={true}
    speedx: 30,
  };

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
        // onComplete={() => {
        //   setHover("");
        // }}
      />
    );
  };

  return (
    <a id="about">
      {" "}
      <div className="about-page">
        <Parallax
          translateY={progress < 0.5 ? [0, 0] : [0, 0]}
          scale={progress < 0.5 ? [1.3, 0.7] : [1]}
          opacity={[0.7, 1]}
          onProgressChange={(progress) => {
            setProgress(progress);
          }}
          speed={60}
          style={{ opacity: 1 }}
          className={
            width
              ? "about-page-para about-page-background-img"
              : " about-page-background-img"
          }
          shouldAlwaysCompleteAnimation={true}
        >
          {/* <div
      className={
        width
          ? !view
            ? "about-page-para about-page-background-img"
            : " about-page-para about-page-background-img  about-page-background-img-anim"
          : " about-page-background-img"
      }
      ref={imageRef}
    > */}
          <img
            src={width ? aboutMob : back}
            style={
              width
                ? {}
                : {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }
            }
          ></img>
          {/* <img
        src={Front}
        style={{ width: "100%", height: "100vh", objectFit: "cover" }}
      ></img> */}
          {/* <div className="about-page-background-img"> */}
          {/* <div className="about-page-side-rectangle"></div>
      <div className="about-page-center-rectangle"></div> */}
          {/* </div> */}
          {/* <div></div> */}
        </Parallax>

        {/* <div className="about-page-background-img">
      <div className="about-page-side-rectangle"></div>
      <div className="about-page-center-rectangle"></div>
    </div> */}
        {!width && <div className="about-page-bg-overlay"></div>}

        <Parallax
          opacity={
            progress < (width ? 0.34 : 0.48) ? [0.6, 1, "easeInOut"] : [1, 1]
          }
          translateX={
            !width ? (progress < 0.5 ? [-60, 60, "easeInOut"] : []) : [0, 0]
          }
          translateY={[0, 0]}
          speed={60}
          shouldAlwaysCompleteAnimation={true}
          className="about-page-content"
        >
          <div className="about-page-content-text">
            <div className="about-page--text-head">
              {" "}
              {progress > (width ? 0.1 : 0.4) ? (
                random("ABOUT US")
              ) : (
                <> ABOUT US</>
              )}{" "}
            </div>
            <div className="about-page--text-body">
              Malaviya National Institute of Technology Jaipur, an institute of
              national importance, is a place for nurturing academic excellence,
              personal and professional pursuits of an individual. Established
              in 1963, the institute is known for its ability to provide an
              all-round growth and development space to the students.<br></br>
              <br></br> Sphinx, the annual techno-management fest of MNIT
              Jaipur, is one of the most awaited events of the country. With the
              view of achieving the purpose of the institute, the event provides
              an unparalleled platform to learn, grow, excel, ideate and
              innovate. The three-day long event consists of brain racking
              competitions, insightful talk shows, workshops, training sessions
              and magnificent pronites. Over the past years, Sphinx has been the
              driving force to bring out that hidden ‘Tech-Beast’ inside the
              enthusiasts and we aim to continue to do so.
            </div>
            {/* <div className="about-page--text-button">Learn More</div> */}
          </div>
        </Parallax>
        {/* <div className="scroll-down-prompt"></div> */}
      </div>
    </a>
  );
}
