import { useState } from "react";
import "./../../../../styles/userDashboard.css";
import Event from "./Event";

const Events = () => {
  const [events, setEvents] = useState([1, 2]);

  return (
    <div className="ud__events">
      <h1 className="ud__events__title">My Registered Events</h1>
      <hr style={{ border: "1px solid #676767" }} />
      {events.map((event) => (
        <Event key={event} />
      ))}
    </div>
  );
};

export default Events;
