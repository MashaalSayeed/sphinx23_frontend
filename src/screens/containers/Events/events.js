import React, { useEffect } from "react";
import { useState } from "react";
import HomeNav from "../Home/homeNav";
import back from "../../../images/events/back.png";
import Worki from "../../../images/events/wicon.svg";
import club from "../../../images/events/club.svg";
import dept from "../../../images/events/dep.svg";
import flag from "../../../images/events/flag.svg";
import src from "../../../images/events/src.svg";
import srcback from "../../../images/events/srcback.png";
import wback from "../../../images/events/workback.png";
import CatCard from "./catCard";
import catCardImg from "../../../images/events/catCard.png";
import tech from "../../../images/events/techC.png";
import edm from "../../../images/events/edmC.png";
import EventCard from "./EventCard";
import eventsImg from "../../../images/events/roboWars.png";
import { useSelector } from "react-redux";

function Events() {
  const [currTab, setCurrTab] = useState("Events");
  const curruser = useSelector((state) => state.auth.curruser);

  const Tabs = ["Home", "Events", "Profile"];
  ////console.log(curruser);
  // if (curruser != null) {
  //   Tabs.push("Profile");
  //   Tabs.push("Logout");
  // } else {
  //   Tabs.push("Login/Register");
  // }
  const Cat = [
    { title: "Flagship", icon: flag, col: "white", back: tech },
    { title: "Club", icon: club, col: "white", back: catCardImg },
    { title: "Department", icon: dept, col: "white", back: edm },
    { title: "Research", icon: src, col: "white", back: srcback },
    { title: "Workshops", icon: Worki, col: "white", back: wback }
  ];
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
      <div className={"eventsM-title"}>CATEGORY</div>
      <div className="eventsM-category-sec">
        {Cat.map((item, i) => {
          ////console.log();
          return <CatCard card={item} key={i} index={i} />;
        })}
      </div>
    </div>
  );
}

export default Events;
