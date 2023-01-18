import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAdminEvents } from "../../../../../api";
function EventTab({ all }) {
  const url = "http://localhost:8000";
  const token = useSelector((state) => state.auth.curruser.token);
  const dispatch = useDispatch();
  useEffect(() => {
    // chandra();
    fetchAdminEvents(token, dispatch);
  }, []);

  const events = useSelector((state) => state.auth.adminevents);

  console.log(events);
  console.log("Event_tab");
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
                </div>
              </Link>
            )
        )}
    </div>
  );
}

export default EventTab;
