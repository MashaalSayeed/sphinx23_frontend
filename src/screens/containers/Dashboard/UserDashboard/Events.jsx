import { useState, useEffect } from "react";
import "./../../../../styles/userDashboard.css";
import Event from "./Event";
import { fetchRegisteredEvents } from "../../../../api";
import { useSelector } from "react-redux";
const Events = () => {
  const [events, setEvents] = useState([]);
  const currUser = useSelector((state) => state.auth.curruser);

  useEffect(() => {
    ////console.log("USef Eeevt", currUser.token);
    fetchRegisteredEvents(currUser.token)
      .then((res) => {
        ////console.log(res.events);
        setEvents(res.events);
        // ////console.log(event);
      })
      .catch((err) => {
        ////console.log(err);
      });
  }, []);
////console.log(events.length)
  return (
    <div className="ud__events">
      <h1 className="ud__events__title">My Registered Events</h1>
      {/* <hr style={{ border: "1px solid #676767" }} /> */}
      {events && events.map((event) => <Event key={event._id} data={event} />)}
      {(events && events.length==0 )&& <div className="noEvent" >No Registered Events</div>}
    </div>
  );
};

export default Events;
