import React, { useRef, useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import HomeNav from "./homeNav";
import back from "../../../images/about/PyramidBack.png";
import aboutMob from "../../../images/aboutMob.png";
// import aboutMob from "../../../images/about/PyramidFront.png";
// import useIntersection from "./interSection";
import { useEffect } from "react";
import useIntersection from "./interSection";
export default function About(props) {
  const { width } = props;
  const [currTab, setCurrTab] = useState("About");
  // const ref = useRef(null);
  const Tabs = ["Home", "About", "Contact"];
  const [progress, setProgress] = useState(0);

  const MobileViewAnimText = {
    translateY: progress < 0.5 ? [100, -100, "easeInOut"] : [0, 0],
    translateX: [-100, 100],
    opacity: progress < 0.5 ? [0.0, 1, "easeInOut"] : [1, 1],
    // shouldAlwaysCompleteAnimation={true}
    speedx: 30,
  };

  return (
    <div className="about-page">
      <Parallax
        translateY={progress < 0.5 ? [50, -50] : [0, 0]}
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
        opacity={progress < 0.48 ? [0.6, 1, "easeInOut"] : [1, 1]}
        translateY={[0, 0]}
        speed={60}
        shouldAlwaysCompleteAnimation={true}
        className="about-page-content"
      >
        <div className="about-page-content-text">
          <div className="about-page--text-head">ABOUT US</div>
          <div className="about-page--text-body">
            Sphinx is the largest technology fest in Rajasthan, held annually at
            the MNIT Jaipur campus. The fest attracts thousands of students from
            all over the country, who come to participate in a wide range of
            technical and non-technical events. The event includes workshops,
            competitions, guest lectures and exhibitions on the latest
            technology and innovations.{" "}
          </div>
          <div className="about-page--text-button">Learn More</div>
        </div>
      </Parallax>
      {/* <div className="scroll-down-prompt"></div> */}
    </div>
  );
}
