import React, { useEffect, useState } from "react";
import EventD from "../Events/EventDetails";
import styles from "./Description.module.css";

function Description({ data }) {
  console.log(data);
  return (
    <section>
      <h1 className={styles.name}>Description</h1>
      <EventD card={data} />
    </section>
  );
}

export default Description;
