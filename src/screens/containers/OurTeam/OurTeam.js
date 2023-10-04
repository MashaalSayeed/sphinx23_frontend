import React, { useState, useEffect } from "react";
import "../../../styles/home.css";

import styles from "./OurTeam.module.css";

import profile from "../../../images/subhranshu.png";

import HomeNav from "../Home/homeNav";
import TeamCard from "./TeamCard";

function OurTeam() {
  const [event, setEvent] = useState();

  const [currTab, setCurrTab] = useState("aaaa");
  const Tabs = ["Home", "About", "Profile"];

  const data = {
    name: "Subhranshu Shekhar",
    group: "Design Head",
    color: "#FF51FF",
    picture: profile,
    description: "Design and Decor Head",
    socials: {
      phone: "https://wa.me/+91",
      instagram: "https://instagram.com/profile",
      facebook: "https://facebook.com/profile",
    },
  };

  return (
    <div className={styles.container}>
      <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
      <div className={styles.content}>
        <div className={styles.topsection}>
          <h1 className={styles.name}>Our Team</h1>
        </div>

        <hr />

        <div className={styles.cardgroup}>
          {Array.apply(null, Array(3)).map((_, i) => (
            <TeamCard key={i} card={{ ...data, color: "#FBF340" }} />
          ))}
        </div>
        <div className={styles.cardgroup}>
          {Array.apply(null, Array(3)).map((_, i) => (
            <TeamCard key={i} card={{ ...data, color: "#FF51FF" }} />
          ))}
        </div>
        <div className={styles.cardgroup}>
          {Array.apply(null, Array(3)).map((_, i) => (
            <TeamCard key={i} card={{ ...data, color: "#2B66FD" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurTeam;
