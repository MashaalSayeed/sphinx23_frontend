import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function EventTab() {
  const events = useSelector((state) => state.auth.events);
  console.log("Event_tab");
  return (
    <div className="eventTab-main">
      {events.map((opt, i) => (
        <Link to={"/eventDetails/event/" + opt.name} className="event-link">
          <div className="eventTab-Ecard" key={i}>
            <img className="Ecard-img" src={opt.imageUrl}></img>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EventTab;
