import { color } from "@mui/system";
import React, { useState } from "react";
import ambassador from "../../../images/ambassador.png";
import ConR from "../../../images/ambCon.png";
import HomeNav from "./homeNav";

function Ambassador() {
  const [currTab, setCurrTab] = useState("ambassador");
  const Tabs = ["Home", "About", "Contact"];
  return (
    <div className="activity-back" style={{ backgroundColor: "#1e1e1e" }}>
      <HomeNav
        setCurrTab={setCurrTab}
        currTab={currTab}
        Tabs={Tabs}
        notanimation={true}
      />

      <div className="simple-scroll">
        <div className="landing-scroll-text">SCROLL</div>
        <div className="landing-scroll-line"></div>
      </div>
      <div className="activity-sections">
        <div
          className="activity-sec2"
          style={{
            background:
              "radial-gradient(62.62% 62.62% at 43.33% 37.38%, rgba(92, 49, 0, 0) 0%, rgba(0, 0, 0, 0.7) 69.27%)",
          }}
        >
          <img
            src={ambassador}
            style={{ height: "100%", objectFit: "cover" }}
          ></img>
        </div>
        <div className="activity-sec1">
          <div
            className="about-info"
            style={{ width: "80%", marginLeft: "8%" }}
          >
            <div className="activity-info-sub">SPHINX ‘23</div>
            <div
              className="home-about-title"
              style={{
                fontSize: "3rem",
                lineHeight: "3.2rem",
                letterSpacing: "0.4rem",
              }}
            >
              CAMPUS
              <br></br>
              <span style={{ color: "#FFA20F" }}>AMBASSADOR</span>
            </div>

            <div
              className="about-Maincontent"
              style={{ marginTop: "20px", marginBottom: "10px" }}
            >
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
              Learn More
            </button>
          </div>
          <img className="amb-conL" src={ConR}></img>
          <img className="amb-con" src={ConR}></img>
        </div>
      </div>
    </div>
  );
}

export default Ambassador;
