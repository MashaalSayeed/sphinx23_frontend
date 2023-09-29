import React, { useEffect, useState, Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import Dialog from "@mui/material/Dialog";
function EventTeams(props) {
  const { currentRecords } = props;
  const data = {
    header: ["Sr.no", "TeamID", "Team Name", "Round Status", "Team Details"],
    value: ["index", "teamId", "teamName", "status", "team details"],
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [teamName, setteamName] = useState("");
  const [teamId, setteamId] = useState("");
  const [members, setMembers] = useState([]);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  ////console.log(data.header);
  return (
    <div>
      <form onSubmit={() => {}} className="resp-m-l-r teams">
        <table>
          <thead>
            <tr>
              {data.header.map((value, i) => (
                <th>{value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((user, i) => (
              <Fragment>
                <ReadOnlyRow
                  data={{ ...user, index: i + 1 }}
                  value={data.value}
                  openDialog={openDialog}
                  setteamName={setteamName}
                  setteamId={setteamId}
                  setMembers={setMembers}
                  handleEditClick={() => {}}
                  handleDeleteClick={() => {}}
                />
              </Fragment>
            ))}
          </tbody>
        </table>
        {currentRecords.length != 0 ? (
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
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <div className="ud__event__team-details-content">
          <h3>Team Id: #{teamId}</h3>
          <h4 className="ud__event__team-details-title">
            Team Name: {teamName}
          </h4>
          <ul className="ud__event__team-details-list">
            {members &&
              members.map((user) => {
                return (
                  <li>
                    {user.name}({user.email})
                  </li>
                );
              })}
          </ul>
        </div>
      </Dialog>
      ;
    </div>
  );
}

export default EventTeams;
