import React from "react";

import { useSelector } from "react-redux";

function EventTab() {
  const events = useSelector((state) => state.auth.events);
  console.log("Event_tab");
  return (
    <div className="eventTab-main">
      {events.map((opt, i) => (
        <div className="eventTab-Ecard" key={i}>
          <img className="Ecard-img" src={opt.imageUrl}></img>
        </div>
      ))}
    </div>
  );
}

export default EventTab;
