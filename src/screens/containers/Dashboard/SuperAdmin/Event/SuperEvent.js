import React, { useState } from "react";
import create from "../../../../../images/create_event.png";
import { storage } from "../../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import EventTab from "./EventTab";
function SuperEvent() {
  const [tabactive, settab] = useState("All Events");
  const events = useSelector((state) => state.auth.events);
  const onUpload = () => {
    const file = document.getElementById("eventImg");
    const storageRef = ref(storage, `events/pass2`);
    if (file != null) {
      const uploadTask = uploadBytesResumable(storageRef, file.files[0]);
      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
          });
        }
      );
    }
  };

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
        <div className="tab-function">
          <button className="create-event" onClick={() => {}}>
            <img className="create-icon" alt="" src={create}></img>
            <span className="create-text">Create Event</span>
          </button>
        </div>
      </div>
      <div className="tab-line"></div>
      {/* <input type={"file"} id="eventImg"></input> */}
      <EventTab />
    </div>
  );
}

export default SuperEvent;
