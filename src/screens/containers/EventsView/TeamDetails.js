import React, { useEffect, useState } from "react";
import styles from "./TeamDetails.module.css";
import { fetchTeam } from "../../../api";
import ProfileImage from "../../../images/user.png"


function TeamDetails({ data, userEvent }) {
  const [team, setTeam] = useState({});
  // currUser
  useEffect(() => {
    fetchTeam({ teamid: userEvent.teamId }).then((res) => {
      setTeam(res.team)
    })
  }, [])

  return (
    <section>
      <div className={styles.topsec}>
        <div className={styles.toptext}>Team: {team.teamName}</div>
        <div className={styles.toptext}>{team.teamId}</div>
      </div>

      <div>
        {
          team.userList?.map(u => (
            <div className={styles.memberlist} key={u._id}>
              <img src={ProfileImage} className={styles.memberimage} alt="Member"/>
              <div className={styles.memberdetails}>
                <div>{u.name}</div>
                <span>{u.collegeName} | {u.email}</span>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}

export default TeamDetails;
