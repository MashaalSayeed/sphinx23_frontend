import React, { useState } from "react";
import create from "../../../../../images/create_event.png";
import { storage } from "../../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import EventTab from "./EventTab";
function AdminEvent() {
  const [tabactive, settab] = useState("All Events");
  const events = useSelector((state) => state.auth.events);

  return (
    <div className="super-event">
      <div className="super-title">Tech Events</div>
      <div className="super-tabmenu">
        <div className="tab-options">
          <div
            className="tab-opt"
            onClick={() => {
              settab("All Events");
            }}
            style={
              tabactive === "All Events"
                ? { color: "black" }
                : { color: "rgba(0, 0, 0, 0.6)" }
            }
          >
            {" "}
            All Events({events.length})
            {tabactive === "All Events" ? (
              <div className="tab-active"></div>
            ) : null}
          </div>
          <div
            className="tab-opt"
            onClick={() => {
              settab("Past Events");
            }}
            style={
              tabactive === "Past Events"
                ? { color: "black" }
                : { color: "rgba(0, 0, 0, 0.6)" }
            }
          >
            {" "}
            Past Events
            {tabactive === "Past Events" ? (
              <div className="tab-active"></div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="tab-line"></div>
      {/* <input type={"file"} id="eventImg"></input> */}
      <EventTab />
    </div>
  );
}

export default AdminEvent;
