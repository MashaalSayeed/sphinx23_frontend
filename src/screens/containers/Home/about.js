import React, { useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import HomeNav from "./homeNav";
import back from "../../../images/about/PyramidBack.png";
import Front from "../../../images/about/PyramidFront.png";
import useIntersection from "./interSection";
export default function About() {
  const [currTab, setCurrTab] = useState("About");
  // const ref = useRef(null);
  const Tabs = ["Home", "About", "Contact"];
  const [progress, setProgress] = useState(0);
  // useIntersection(ref, "-100px");
  return (
    <div className="about-page">
      {/* <HomeNav
        setCurrTab={setCurrTab}
        currTab={currTab}
        Tabs={Tabs}
        notanimation={true}
      /> */}
      <Parallax
        translateY={progress < 0.5 ? [50, -50] : [0, 0]}
        scale={progress < 0.5 ? [1.3, 0.7] : [1]}
        opacity={[0.7, 1]}
        onProgressChange={(progress) => {
          setProgress(progress);
        }}
        speed={60}
        className="about-page-background-img"
        style={{ opacity: 1 }}
        shouldAlwaysCompleteAnimation={true}
      >
        <img
          src={back}
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
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
      <div className="about-page-bg-overlay"></div>
      <div className="about-page-content">
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
      </div>

      {/* <div className="scroll-down-prompt"></div> */}
    </div>
  );
}
