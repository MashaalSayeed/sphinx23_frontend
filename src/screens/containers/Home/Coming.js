import React, { useEffect } from "react";
import { useState } from "react";
import HomeNav from "../Home/homeNav";
import back from "../../../images/events/back.png";

import { useSelector } from "react-redux";
import Footer from "../../components/Footer/footer";

function Coming() {
  const [currTab, setCurrTab] = useState("");
  const curruser = useSelector((state) => state.auth.curruser);

  const Tabs = ["Home", "Events", "Profile"];
  //console.log(curruser);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="eventM-main">
      <div class="circle circle-hide"></div>
      <div className="eventsM-back">
        <img src={back} alt=""></img>
      </div>
      <div className="eventsM-back-overlay"></div>
      <HomeNav
        setCurrTab={setCurrTab}
        currTab={currTab}
        Tabs={Tabs}
        notanimation={false}
        landing={false}
        setLand={() => {}}
      />
      <div
        className={"eventsM-title"}
        style={{
          margin: "auto",
          top: 0,
          bottom: 0,
          height: "fit-content",
          zIndex: 50,
        }}
      >
        COMING SOON
      </div>
      <div style={{ position: "absolute", top: "100vh", width: "100vw" }}>
        {" "}
        <Footer setCurrTab={setCurrTab} />
      </div>
    </div>
  );
}

export default Coming;
