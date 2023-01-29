import React, { useState, useEffect } from "react";
import "../../../styles/home.css";
// import Navbar from "./Navbar";

import styles from "./EventsView.module.css";
import { useParams } from "react-router-dom";
import Description from "./EventDetails";
import Results from "./Results";
import Notification from "./Notification";
import { fetchOneEvent } from "../../../api";
// import Description from "./EventDetails";
import HomeNav from "../Home/homeNav";
import Register from "./Register";

function EventsView() {
  const [event, setEvent] = useState();
  const data = {
    name: "Robo war",
    results: [],
    notifications: [],
  };
  const params = useParams();
  console.log(params.id);
  useEffect(() => {
    console.log("USef Eeevt");
    fetchOneEvent(setEvent, params.id)
      .then((res) => {
        console.log(res);
        setEvent(res);
        // console.log(event);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
    Description: <Description card={event} />,
    Results: <Results data={event} />,
    Notifcation: <Notification data={event} />,
  };
  const [currentTab, setCurrentTab] = useState("Description");
  const [currTab, setCurrTab] = useState("Events");
  const Tabs = ["Home", "About", "Contact"];
  return (
    <div className={styles.container}>
      <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
      {/* <Navbar /> */}
      {event && (
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
      )}
    </div>
  );
}

export default EventsView;
