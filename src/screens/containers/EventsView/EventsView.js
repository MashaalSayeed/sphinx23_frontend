import React, { useEffect, useState } from "react";
import "../../../styles/home.css";
import Navbar from "./Navbar";

import styles from "./EventsView.module.css"

import Description from "./Description";
import Results from "./Results";
import Notification from "./Notification";

function EventsView() {
  const data = {
    name: "Robo war",
    results: []
  }

  // TODO: remove when fetching data
  for (let i = 0; i < 5; i++)
    data.results.push(
      {
        rank: i + 1,
        profile: {
          name: "Subhranshu Shekhar",
          picture: null,
        },
        college: "MNIT Jaipur",
        prize: "Rs 10000",
      }
    )

  const tabs = {
    "Description": (<Description />),
    "Results": (<Results data={data} />),
    "Notifcation": (<Notification />),
  }
  const [currentTab, setCurrentTab] = useState("Results");



  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <p className={styles.breadcrumb}>Categories &gt; Events
          <span> &gt; {currentTab}</span>
        </p>

        <nav>
          <ol>
            {Object.keys(tabs).map(tab => (
              <li
                key={tab}
                className={currentTab == tab ? styles.active : ""}
                onClick={() => setCurrentTab(tab)}
              >{tab}</li>
            ))}
          </ol>
        </nav>

        <hr />

        {tabs[currentTab]}
      </div>
    </div>
  );
}

export default EventsView;
