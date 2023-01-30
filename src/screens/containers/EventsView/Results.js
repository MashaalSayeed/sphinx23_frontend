import React, { useEffect, useState } from "react";

import styles from "./Results.module.css";

import dummy_user from "../../../images/dummy_user.png";
import { getAllResults } from "../../../api";
// import dummy_user from "../../../images/dummy_user.png"
// TODO: change to correct icon
import icon from "../../../images/edit.png";

function Query({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => onSubmit(query);

  return (
    <div className={styles.query}>
      <label for="query">Enter Query</label>
      <span>
        <input
          id="query"
          type="text"
          placeholder=""
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <img src={icon} onClick={handleSubmit} />
      </span>
    </div>
  );
}

function Results({ data }) {
  const handleSubmit = (query) => alert(query);
  const [results, setResults] = useState([]);
  const [records, setCurrentRecords] = useState([]);
  const [totalPages, setNpage] = useState();

  useEffect(() => {
    console.log(data._id);
    getAllResults(data._id)
      .then((res) => {
        console.log(res);
        console.log(data.status);
        console.log(Array(...Array(parseInt(data.status) + 1).keys()));
        setResults(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section>
      <div className={styles.topsection}>
        <h1 className={styles.name}>{data.name}</h1>
        <Query onSubmit={handleSubmit} />
      </div>

      <br></br>

      {data.status > 1 ? (
        Array(...Array(parseInt(data.status) + 1).keys()).map(
          (round, round_idx) => {
            if (round > 1) {
              return (
                <div>
                  <h3 style={{ alignSelf: "center" }}>
                    {data.ended && round == data.status
                      ? `Final Round Results`
                      : `Round ${round - 1} Results`}
                  </h3>
                  <table className={styles.rtable}>
                    <thead>
                      <tr>
                        <th className={styles.rth} style={{ width: "20%" }}>
                          S.No
                        </th>
                        <th className={styles.rth} style={{ width: "40%" }}>
                          Team Id
                        </th>
                        <th className={styles.rth} style={{ width: "40%" }}>
                          Team Name
                        </th>
                        {/* <th style={{ width: "40%" }}>College</th>
                <th style={{ width: "30%" }}>Prize</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((team, idx) => {
                        if (team.status >= round) {
                          return (
                            <tr key={team.teamId}>
                              <td className={styles.rtd}>{idx + 1}</td>
                              <td className={styles.rtd}>{team.teamId}</td>
                              {/* <td className={styles.cell}>
                          <img
                            style={{ filter: "invert(100%)" }}
                            className={styles.profile}
                            src={dummy_user}
                          />
                          <span>{profile.name}</span>
                        </td> */}
                              <td className={styles.rtd}>{team.teamName}</td>
                              {/* <td>{prize}</td> */}
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }
          }
        )
      ) : (
        <p>Event Yet to Start</p>
      )}
    </section>
  );
}

export default Results;
