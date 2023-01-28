import React, { useEffect, useState } from "react";

import styles from "./Results.module.css";

import dummy_user from "../../../images/dummy_user.png";

function Results({ data }) {
  return (
    <section>
      <h1 className={styles.name}>{data.name}</h1>
      <br></br>
      <h3 style={{ alignSelf: "center" }}>Round 1 Results</h3>
      <table>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Rank</th>
            <th style={{ width: "25%" }}>Name</th>
            <th style={{ width: "40%" }}>College</th>
            <th style={{ width: "30%" }}>Prize</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map(({ rank, profile, college, prize }) => (
            <tr key={rank}>
              <td>{rank}</td>
              <td className={styles.cell}>
                <img
                  style={{ filter: "invert(100%)" }}
                  className={styles.profile}
                  src={dummy_user}
                />
                <span>{profile.name}</span>
              </td>
              <td>{college}</td>
              <td>{prize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Results;
