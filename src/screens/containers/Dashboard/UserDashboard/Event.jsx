import "./../../../../styles/userDashboard.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

const Event = ({ data }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  let team = data.teamId;
  data = data.event;

  let date = new Date(data.from);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="ud__event">
      <img
        className="ud__event__thumbnail"
        src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.color-hex.com%2Fpalettes%2F4666.png&sp=1675173524T36d7c9eb670f126ff0d0c62c231f8fd65a4a0f13131f2849c9c1ff52c5cee3d2"
        alt="event thumbnail"
      />
      <div className="ud__event__details">
        <div>
          {" "}
          <p className="ud__event__badge">{data.category}</p>
          <div className="ud__event__title-subtitle">
            <h3 className="ud__event__title">{data.name}</h3>
          </div>
        </div>
        <div>
          {" "}
          <p className="ud_event_date">
            {" "}
            {date.getDate() +
              " " +
              monthNames[date.getUTCMonth()] +
              "," +
              date.getFullYear()}
          </p>
          <p className="ud_event_date"> {data.time}</p>
        </div>
      </div>
      <button className="ud__event__team-details-button" onClick={openDialog}>
        Team Details
      </button>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <div className="ud__event__team-details-content">
          <h3>Team Id: #{team.teamId}</h3>
          <h4 className="ud__event__team-details-title">
            Team Name: {team.teamName}
          </h4>
          <ul className="ud__event__team-details-list">
            {team.userList.map((user) => {
              return (
                <li>
                  {user.name}({user.email})
                </li>
              );
            })}
          </ul>
        </div>
      </Dialog>
    </div>
  );
};

export default Event;
