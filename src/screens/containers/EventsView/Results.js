import React, { useEffect, useState } from "react";

import styles from "./Results.module.css"

import dummy_user from "../../../images/dummy_user.png"
// TODO: change to correct icon
import icon from "../../../images/edit.png"

function Query({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => onSubmit(query);

  return (
    <div className={styles.query}>
      <label for="query">Enter Query</label>
      <span>
        <input id="query" type="text" placeholder=""
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSubmit()
          }} />
        <img src={icon} onClick={handleSubmit} />
      </span>
    </div>
  )
}


function Results({ data }) {
  // TODO: handle query
  const handleSubmit = (query) => alert(query);

  return (
    <section>
      <div className={styles.topsection}>
        <h1 className={styles.name}>{data.name}</h1>
        <Query onSubmit={handleSubmit} />
      </div>
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
              <td>
                <img style={{ filter: "invert(100%)" }} className={styles.profile} src={dummy_user} />
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
