import React, { useEffect, useState } from "react";
import { getUpdatesForEvent } from "../../../api";
import styles from "./Notification.module.css";

function formatDate(datef) {
  let date = new Date(datef);
  const locale = "en-IN";
  const timeStr = date.toLocaleString(locale, {
    minute: "numeric",
    hour: "numeric",
    hour12: true,
  });
  const dateStr = date.toLocaleString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${timeStr}, ${dateStr}`;
}

function Notification({ data }) {
  const [updates, setUpdates] = useState([]);
  useEffect(() => {
    ////console.log("USef Eeevt");
    getUpdatesForEvent(data._id)
      .then((res) => {
        ////console.log(res);
        setUpdates(res);
        // ////console.log(event);
      })
      .catch((err) => {
        ////console.log(err);
      });
  }, []);
  return (
    <section>
      <ul className={styles.notifications}>
        {updates &&
          updates.map((update, idx) => (
            <li key={idx}>
              <span
                class={styles.dot}
                style={{ backgroundColor: "orange" }}
              ></span>
              <div className={styles.details}>
                <p>{update.message}</p>
                <span>{formatDate(update.timestamp)}</span>
              </div>
            </li>
          ))}
        {updates.length == 0 ? <p>No Updates</p> : <></>}
      </ul>
    </section>
  );
}

export default Notification;
