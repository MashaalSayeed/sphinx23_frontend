import PassDetailCard from "./PassDetailCard";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../desktop27.css";
import PassUsers from "./PassUsers";

export default function PassDetail() {
  const params = useParams();
  const passName = params.id;
  const passes = useSelector((state) => state.auth.allpasses);
  const passNames = {
    "First Day": "Cleopetra Pass",
    "Second Day": "Cleopetra Pass",
    "Third Day": "Cleopetra Pass",
    "Golden Pass": "Cleopetra Pass",
  };
  const currpass = passes.find((x) => x.name === passName);

  console.log(passName);
  const [inAboutTab, setInAboutTab] = useState(true);
  const [inRegStudentTab, setInRegStudentEventTab] = useState(false);
  const passNo = 0;

  function changeToRegStudentTab() {
    setInRegStudentEventTab(true);
    setInAboutTab(false);
  }
  function changeToAboutTab() {
    setInRegStudentEventTab(false);
    setInAboutTab(true);
  }
  return (
    <div className="desktop27-main">
      <div className="space-top"></div>
      <h3 className="desktop27-head">
        {passName + ": " + passNames[passName]}
      </h3>

      <div className="desktop27-tabChangebtn">
        <button
          className="desktop27-btn"
          onClick={changeToAboutTab}
          style={{
            borderBottom: inAboutTab ? "2px solid blue" : "none",
            color: !inAboutTab ? "rgba(0,0,0,0.6)" : "",
          }}
        >
          About
        </button>
        <button
          className="desktop27-btn"
          onClick={changeToRegStudentTab}
          style={{
            borderBottom: inRegStudentTab ? "2px solid blue" : "none",
            color: !inRegStudentTab ? "rgba(0,0,0,0.6)" : "",
          }}
        >
          Registered Students
        </button>
      </div>

      <div className="desktop27-border"></div>

      {inAboutTab && (
        <div className="desktop27-passDetail">
          <PassDetailCard pass={currpass} />
        </div>
      )}
      {inRegStudentTab && (
        <div className="desktop27-userDetail">
          <PassUsers pass={currpass} />
        </div>
      )}
    </div>
  );
}
