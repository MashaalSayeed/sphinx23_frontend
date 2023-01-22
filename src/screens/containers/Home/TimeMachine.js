import React, { useEffect, useState } from "react";
import machine from "./../../../images/home/timeMach1.png";
import Activities from "./Activities";
import Landing from "./home";
import HomeNav from "./homeNav";
import Theme from "./theme";

function TimeMachine({ notAnim, landing }) {
  const [currTab, setCurrTab] = useState("Home");
  const [animNotOver, setNotOver] = useState(true);
  const [title, setTitle] = useState(false);
  const Tabs = ["Home", "About", "Contact"];
  const handelOver = () => {
    console.log("set anim over");
    setNotOver(false);
  };
  useEffect(() => {
    if (landing) {
      setTimeout(handelOver, 3500);
    }
  }, [animNotOver]);
  useEffect(() => {
    if (!landing) setTitle(true);
  }, []);

  return (
    <div>
      <div className={notAnim ? "time-main" : "parallax-container"} id="home">
        <img
          className="machine-img"
          id="machine"
          src={machine}
          style={
            notAnim ? { animation: "none", filter: "brightness(0.4)" } : {}
          }
        ></img>
        <HomeNav
          setCurrTab={setCurrTab}
          currTab={currTab}
          Tabs={Tabs}
          notanimation={notAnim}
          landing={landing && animNotOver}
        />
        {title ? <div className="home-title"> SPHINX </div> : <></>}
        <div
          className="machine-text"
          style={notAnim ? { animation: "none", opacity: "1" } : {}}
        >
          <div className="machine-text-header">
            Let’s go on adventurous time travel{" "}
          </div>
          <div className="machine-text-sub">
            "Join us on a journey through time and space - the ultimate Time
            Travel Adventure awaits"
          </div>
        </div>
      </div>

      {!landing || !animNotOver ? (
        <>
          <Activities /> <Theme />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TimeMachine;
