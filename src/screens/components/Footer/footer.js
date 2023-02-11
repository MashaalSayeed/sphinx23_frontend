import React from "react";

import styles from "./footer.module.css";
import { useNavigate } from "react-router-dom";
import pyramid from "../../../images/footer/pyramid.svg";
import logo from "../../../images/footer/logo.png";
import mysterybox from "../../../images/footer/mysterybox.png";
import insta from "../../../images/insta.png";
import facebook from "../../../images/facebook.png";
import arrow from "../../../images/arrow.png";
import arrow2 from "../../../images/arrow2.png";
import linkedin from "../../../images/linkedin.png";
import barCode from "../../../images/barCode.png";
import { Navigate } from "react-router-dom";
const links = [
  {
    icon: insta,
    link: "https://instagram.com/sphinx_mnit?igshid=YmMyMTA2M2Y=",
  },
  { icon: facebook, link: "https://www.facebook.com/sphinxMNIT" },
  {
    icon: linkedin,
    link: "https://www.linkedin.com/company/sphinx-mnit-jaipur/",
  },
];

function StayInLoop() {
  return (
    <div className={styles.col1}>
      <img className={styles.logo} src={logo} />
      <h1>Stay In Loop</h1>
      <div className={styles.inputCon}>
        <input
          className={styles.input}
          placeholder="Enter your Email ID "
        ></input>
        <img src={arrow2}></img>
      </div>

      <img className={styles.mysterybox} src={mysterybox} />
    </div>
  );
}

function QuickLinks() {
  const links = {
    Events: "events",
    Dashboard: "dashboard",
    // Schedule: "#",
    // FAQs: "#",
    // "Our Team": "#",
    "Campus Ambassador": "ambassador",
    // Sponsors: "#",
    "About us": "#about",
  };

  return (
    <div className={styles.col2}>
      <img src={pyramid} />
      <div
        className={styles.gradLine}
        style={{
          height: "2px",
          padding: "0px",
          marginBottom: "10px",
          marginTop: "-3px",
        }}
      ></div>
      <div>
        <h1>Quick Links</h1>
        <ul>
          {Object.keys(links).map((link, i) => (
            <li key={i}>
              <a href={links[link]}>{link}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GetInTouch({ setCurrTab }) {
  const navigate = useNavigate();
  return (
    <div className={styles.col3}>
      <div className={styles.getintouch}>
        <h1>Get In Touch</h1>
        <p>sphinx@mnit.ac.in</p>
        <div className={styles.socials}>
          {links.map((value, i) => {
            return (
              <a className={styles.Sicons} href={value.link}>
                <img src={value.icon} />
              </a>
            );
          })}
        </div>
        <a href="#home">
          {" "}
          <div onClick={setCurrTab("home")} className={styles.arrow}>
            <img src={arrow}></img>
          </div>
        </a>
      </div>
      {/* <div className={styles.gradLine}></div> */}
      <div className={styles.scanit}>
        <img src={barCode}></img>
        <span> Scan it To know it</span>
      </div>
    </div>
  );
}

function Footer({ setCurrTab }) {
  return (
    <a id="contact">
      {" "}
      <div className={styles.container}>
        <div className={styles.gradLine2}></div>
        <div className={styles.contents}>
          <StayInLoop />
          <QuickLinks />
          <GetInTouch setCurrTab={setCurrTab} />
        </div>
        {/* <div className={styles.credits}>
      <p>Designed by SUBU</p>
    </div> */}
      </div>
    </a>
  );
}

export default Footer;
