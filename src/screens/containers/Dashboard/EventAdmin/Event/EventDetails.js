import AboutSection from "./EventAbout";
import "../deskr.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useState } from "react";
export default function EventDetails() {
  console.log("Event Called");
  const params = useParams();
  const eventName = params.id;
  const event = useSelector((state) => state.auth.events);
  const currevent = event.find((x) => x.name === eventName);
  const [inAboutTab, setInAboutTab] = useState(true);
  const [inParticipatedStudentTab, setInParticipatedStudentEventTab] =
    useState(false);
  const [inResultTab, setInResultTab] = useState(false);
  const allAboutCardElements = <AboutSection event={currevent} />;

  function changeToParticipatedStudentTab() {
    setInParticipatedStudentEventTab(true);
    setInAboutTab(false);
    setInResultTab(false);
  }
  function changeToAboutTab() {
    setInParticipatedStudentEventTab(false);
    setInAboutTab(true);
    setInResultTab(false);
  }
  function changeToResultTab() {
    setInParticipatedStudentEventTab(false);
    setInAboutTab(false);
    setInResultTab(true);
  }

  return (
    <div className="desktop14-main">
      <div className="space-top"></div>
      <h3 className="desktop14-head">{currevent.name}</h3>

      <div className="desktop14-btns">
        <div className="desktop24-tabChangebtn">
          <button
            className="desktop14-btn"
            onClick={changeToAboutTab}
            style={{
              borderBottom: inAboutTab ? "2px solid blue" : "none",
              color: inAboutTab ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)",
            }}
          >
            About
          </button>

          <button
            className="desktop14-btn"
            onClick={changeToParticipatedStudentTab}
            style={{
              borderBottom: inParticipatedStudentTab
                ? "2px solid blue"
                : "none",
              color: inParticipatedStudentTab
                ? "rgba(0,0,0,0.8)"
                : "rgba(0,0,0,0.6)",
            }}
          >
            Participated Students
          </button>

          <button
            className="desktop14-btn"
            onClick={changeToResultTab}
            style={{
              borderBottom: inResultTab ? "2px solid blue" : "none",
              color: inResultTab ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)",
            }}
          >
            Results
          </button>
        </div>
      </div>
      <div className="desktop14-border"></div>
      <div className="desktop14-sections">
        {inAboutTab && (
          <section className="desktop14-about">{allAboutCardElements}</section>
        )}
        {inParticipatedStudentTab && (
          <section className="desktop14-part-students"></section>
        )}
        {inResultTab && <section className="desktop14-results"></section>}
      </div>
    </div>
  );
}
