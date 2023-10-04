import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function EventTab(props) {
  const { all } = props;
  const events = useSelector((state) => state.auth.events);
  // const eventp = useSelector((state) => state.auth.completed);
  // ////console.log(eventp);
  // const events = all ? eventa : eventp;
  ////console.log("Event_tab");
  return (
    <div className="eventTab-main">
      {events &&
        events.map(
          (opt, i) =>
            opt.ended == !all && (
              <Link
                to={"/eventDetails/event/" + opt._id}
                className="event-link"
              >
                <div className="eventTab-Ecard" key={i}>
                  <img className="Ecard-img" src={opt.imageUrl}></img>
                  <div className="Ecard-title">{opt.name}</div>
                </div>
              </Link>
            )
        )}
    </div>
  );
}

export default EventTab;
