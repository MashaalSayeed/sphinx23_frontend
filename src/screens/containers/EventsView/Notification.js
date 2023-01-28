import React, { useEffect, useState } from "react";

import styles from "./Notification.module.css"

function formatDate(date) {
  const locale = "en-IN";
  const timeStr = date.toLocaleString(locale, {
    minute: "numeric",
    hour: "numeric",
    hour12: true
  });
  const dateStr = date.toLocaleString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
  return `${timeStr}, ${dateStr}`
};

function Notification({ data }) {
  return (
    <section>
      <ul className={styles.notifications}>

        {data.notifications.map(({ rank, color, text, date }) => (
          <li key={rank}>
            <span class={styles.dot} style={{ backgroundColor: color }}></span>
            <div class={styles.details}>
              <p>{text}</p>
              <span>{formatDate(date)}</span>
            </div>
          </li>
        ))}
        
      </ul>
    </section>
  );
}

export default Notification;
