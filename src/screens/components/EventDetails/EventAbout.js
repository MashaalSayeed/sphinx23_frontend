import edit from "../../../images/edit.png";
import CreateEvent from "../../containers/Dashboard/SuperAdmin/Event/CreateEvent";
import { useSelector } from "react-redux";
import { useState } from "react";
import { render } from "@testing-library/react";

export default function AboutSection(props) {
  const { event } = props;
  ////console.log(event.ended);
  const curruser = useSelector((state) => state.auth.curruser);
  const [editEvent, setEdit] = useState(false);
  const type = curruser.profile.type;
  const handleEdit = () => {
    ////console.log("handle edit event");
  };
  return (
    <div className="aboutSection">
      <div className="aboutSec-img-btn">
        {editEvent == true ? (
          <CreateEvent
            setCreate={setEdit}
            editSuperAdmin={true}
            currEvent={event}
          />
        ) : (
          <></>
        )}
        <div className="about-content">
          <img
            src={event.imageUrl}
            className="aboutSec-img"
            style={{ height: "50%", width: "50%" }}
          />
          <div className="event-mainDetials">
            <h3>Category: {event.category}</h3>
            <h3>From: {event.from.split("T")[0]}</h3>
            <h3>Time: {event.time} </h3>
            <h3>Location: {event.location} </h3>
            <h3>Amount: {event.amount} </h3>
            <h3>
              Team Size: {event.minTeamSize} - {event.maxTeamSize}{" "}
            </h3>
          </div>
        </div>

        {!event.ended && (
          <button
            className="desktop14-edit-btn"
            onClick={() => {
              setEdit(true);
              handleEdit();
            }}
          >
            <div className="desktop14-btn-inner">
              <div>
                <img src={edit}></img>
              </div>
              <p>Edit</p>
            </div>
          </button>
        )}
        <button
          className="desktop14-edit-btn"
          style={{ padding: "4px" }}
          onClick={() => {
            window.location.href = event.rulebook;
          }}
        >
          <div className="desktop14-btn-inner">
            <p>View Rulebook</p>
          </div>
        </button>
      </div>

      <p className="aboutSec-p">{event.description}</p>
    </div>
  );
}
