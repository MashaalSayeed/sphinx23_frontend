import { color } from "@mui/system";
import React, { useState } from "react";
import pyramid from "../../../images/activityPyramid.png";
import HomeNav from "./homeNav";

function Activities() {
  return (
    <div className="activity-back">
      <div className="simple-scroll">
        <div className="landing-scroll-text">SCROLL</div>
        <div className="activity-scroll-line"></div>
      </div>
      <div className="activity-sections">
        <div className="activity-sec1">
          <div className="about-info" style={{ width: "80%" }}>
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
        <div className="activity-sec2">
          <img src={pyramid}></img>
        </div>
      </div>
    </div>
  );
}

export default Activities;
