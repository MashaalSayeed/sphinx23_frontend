import React, { useState } from "react";
import create from "../../../../../images/create_event.png";
// import { storage } from "../../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import EventTab from "./EventTab";
import Dashboard_Header from "../../../../components/Dashboard_Header";
import CreateEvent from "./CreateEvent";
function SuperEvent() {
  const [tabActive, setTab] = useState("All Events");
  const [createEventState, setCreate] = useState(false);

  return (
    <div className="super-event">
      <Dashboard_Header
        settab={setTab}
        tabactive={tabActive}
        title={"Tech Events"}
        tabs={["All Events", "Past Events"]}
        createEventBool={true}
        setCreateEvent={setCreate}
      />
      {/* <input type={"file"} id="eventImg"></input> */}

      {createEventState == true ? <CreateEvent setCreate={setCreate} /> : <></>}

      {
        {
          "All Events": (
            <section className="desktop14-about">
              <EventTab all={true} />
            </section>
          ),
          "Past Events": <EventTab all={false} />,
        }[tabActive]
      }
    </div>
  );
}

export default SuperEvent;
