import React, { useState } from "react";
import create from "../../../../images/create_event.png";
function SuperEvent() {
  const [tabactive, settab] = useState("All Events");

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
          >
            {" "}
            All Events(30)
            {tabactive === "All Events" ? (
              <div className="tab-active"></div>
            ) : null}
          </div>
          <div
            className="tab-opt"
            onClick={() => {
              settab("Past Events");
            }}
          >
            {" "}
            Past Events
            {tabactive === "Past Events" ? (
              <div className="tab-active"></div>
            ) : null}
          </div>
        </div>
        <div className="tab-function">
          <button className="create-event">
            <img className="create-icon" alt="" src={create}></img>
            <span className="create-text">Create Event</span>
          </button>
        </div>
      </div>
      <div className="tab-line"></div>
    </div>
  );
}

export default SuperEvent;
