import AboutSection from "./EventAbout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useState } from "react";
import Dashboard_Header from "../Dashboard_Header";
import EventTeams from "./EventTeams";
export default function EventDetails() {
  const [tabActive, setTab] = useState("About");
  console.log("Event Called");
  const params = useParams();
  const eventName = params.id;
  const event = useSelector((state) => state.auth.events);
  const currevent = event.find((x) => x.name === eventName);
  const allAboutCardElements = <AboutSection event={currevent} />;

  return (
    <div>
      <div className="space-top"></div>
      <Dashboard_Header
        settab={setTab}
        tabactive={tabActive}
        title={currevent.name}
        tabs={["About", "Registered Teams"]}
      />
      <div className="desktop14-sections">
        {
          {
            About: (
              <section className="desktop14-about">
                {allAboutCardElements}
              </section>
            ),
            "Registered Teams": <EventTeams />,
          }[tabActive]
        }
      </div>
    </div>
  );
}
