import React, { useEffect, useState, Fragment } from "react";
// import { getUsersByPass } from "../../../../../../api";
import { useSelector } from "react-redux";
import ReadOnlyRow from "./ReadOnlyRow";
// import { Button, Stack, TextField } from "@mui/material";

function EventTeams({ pass }) {
  const [teamsByEvent, setTeamsByEvent] = useState([]);
  //   const token = useSelector((state) => state.auth.curruser.token);
  //   useEffect(() => {
  //     getUsersByPass(pass._id, token, setUsersByPass);
  //     console.log("USERS AMBASSADORS PAYMENT SET");
  //   }, []);
  return (
    <div>
      <form onSubmit={() => {}} className="resp-m-l-r teams">
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Team Name</th>
              <th>College</th>

              <th>Members</th>
              <th>Staus</th>
            </tr>
          </thead>
          <tbody>
            {teamsByEvent.map((user, i) => (
              <Fragment>
                <ReadOnlyRow
                  payment={{ ...user, index: i }}
                  handleEditClick={() => {}}
                  handleDeleteClick={() => {}}
                />
              </Fragment>
            ))}
          </tbody>
        </table>
        {teamsByEvent.length != 0 ? (
          <></>
        ) : (
          <div
            style={{
              padding: "2px",
              boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
              borderRadius: "4px",
              margin: "5px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {" "}
            No Teams Found
          </div>
        )}
      </form>
    </div>
  );
}

export default EventTeams;
