import React, { useState } from "react";
import "../../../styles/home.css";
import styles from "./EventsView.module.css";
import Results from "./Results";
import Notification from "./Notification";
import Description from "./EventDetails";
import HomeNav from "../Home/homeNav";
import Register from "./Register";

function EventsView() {
  const data = {
    name: "Robo war",
    results: [],
    notifications: [],
  };

  const [currTab, setCurrTab] = useState("events");
  const Tabs = ["Home", "About", "Contact"];

  // TODO: remove when fetching data
  for (let i = 0; i < 5; i++) {
    data.results.push({
      rank: i + 1,
      profile: {
        name: "Subhranshu Shekhar",
        picture: null,
      },
      college: "MNIT Jaipur",
      prize: "Rs 10000",
    });
    data.notifications.push({
      rank: i,
      color: "orange",
      text: "Event has started",
      date: new Date(),
    });
  }

  const tabs = {
    Description: <Description />,
    Results: <Results data={data} />,
    Notifcation: <Notification data={data} />,
  };
  const [currentTab, setCurrentTab] = useState("Results");

  return (
    <div className={styles.container}>
      <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
      <div className={styles.content}>
        <p className={styles.breadcrumb}>
          Categories &gt; Events
          <span> &gt; {currentTab}</span>
        </p>

        <nav>
          <ol>
            {Object.keys(tabs).map((tab) => (
              <li
                key={tab}
                className={currentTab == tab ? styles.active : ""}
                onClick={() => setCurrentTab(tab)}
              >
                {tab}
              </li>
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
