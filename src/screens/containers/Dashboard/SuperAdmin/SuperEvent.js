import React, { useState } from "react";
import create from "../../../../images/create_event.png";
import { storage } from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function SuperEvent() {
  const [tabactive, settab] = useState("All Events");

  const onUpload = () => {
    const storageRef = ref(storage, "events/event");
    const file = document.getElementById("eventImg");
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
          <button className="create-event" onClick={onUpload}>
            <img className="create-icon" alt="" src={create}></img>
            <span className="create-text">Create Event</span>
          </button>
        </div>
      </div>
      <div className="tab-line"></div>
      <input type={"file"} id="eventImg"></input>
    </div>
  );
}

export default SuperEvent;
