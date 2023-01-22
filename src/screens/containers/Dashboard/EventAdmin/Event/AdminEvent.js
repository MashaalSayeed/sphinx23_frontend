import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventTab from "./EventTab";
import Dashboard_Header from "../../../../components/Dashboard_Header";
function AdminEvent() {
  const [tabActive, setTab] = useState("All Events");
  const [createEventState, setCreate] = useState(false);
  const events = useSelector((state) => state.auth.events);
  useEffect(() => {
    window.history.pushState(null, "Sphinx2023", "/eventAdmin/1");
  }, []);
  return (
    <div className="super-event">
      <Dashboard_Header
        settab={setTab}
        tabactive={tabActive}
        title={"Tech Events"}
        tabs={["All Events", "Past Events"]}
        setCreateEvent={setCreate}
      />
      {/* <input type={"file"} id="eventImg"></input> */}
      {
        {
          "All Events": (
            <section className="desktop14-about">
              <EventTab all={true} type={"eventAdmin"} />
            </section>
          ),
          "Past Events": <EventTab all={false} type={"eventAdmin"} />,
        }[tabActive]
      }
    </div>
  );
}

export default AdminEvent;
