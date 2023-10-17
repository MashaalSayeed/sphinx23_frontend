import React, { useState, useEffect } from "react";
import "../../../styles/home.css";
// import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./EventsView.module.css";
import { useParams } from "react-router-dom";
import Description from "./EventDetails";
import Results from "./Results";
import Notification from "./Notification";
import { fetchOneEvent, submitQuery } from "../../../api";
import { useSelector } from "react-redux";
// import Description from "./EventDetails";
import HomeNav from "../Home/homeNav";
import Register from "./Register";
import Query from "./Query";



function EventsView() {
  const [event, setEvent] = useState();
  const params = useParams();
  const toastStyle = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  ////console.log(params.id);
  const currUser = useSelector((state) => state.auth.curruser);
  useEffect(() => {
    ////console.log("USef Eeevt");
    fetchOneEvent(setEvent, params.id)
      .then((res) => {
        ////console.log(res);
        setEvent(res);
        // ////console.log(event);
      })
      .catch((err) => {
        ////console.log(err);
      });
  }, []);

  // TODO: handle query
  const handleQuery = (query) => {
    if (!query.subject || !query.queryDesc) {
      alert("All Fields are Mandatory");
      return;
    }
    query.eventId = params.id;
    submitQuery(currUser.token, query)
      .then((res) => {
        toast.info(res, toastStyle);
        ////console.log(res);
      })
      .catch((err) => {
        toast.error(err, toastStyle);
        ////console.log(err);
      });
    ////console.log(query);
  };

  const tabs = {
    Description: <Description card={event} />,
    Results: <Results data={event} />,
    Notifcation: <Notification data={event} />,
  };
  const [currentTab, setCurrentTab] = useState("Description");
  const [currTab, setCurrTab] = useState("");
  const Tabs = ["Home", "Events", "Profile"];

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

          <nav className={styles.eventsnav}>
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
            {/* <Query onSubmit={handleQuery} /> */}
          </nav>

          <hr />

          {tabs[currentTab]}
        </div>
      )}
    </div>
  );
}

export default EventsView;
