import React from "react";
import event from "../../../../images/event1.png";
import { useSelector } from "react-redux";

function EventTab() {
  const event_l = useSelector((state) => state.auth.events);
  console.log("Event_tab");
  console.log(event_l);
  const events = [
    { img: require("../../../../images/event1.png") },
    { img: require("../../../../images/event2.png") },
  ];
  return (
    <div className="eventTab-main">
      {events.map((opt, i) => (
        <div className="eventTab-Ecard" key={i}>
          <img className="Ecard-img" src={opt.img}></img>
        </div>
      ))}
    </div>
  );
}

export default EventTab;
