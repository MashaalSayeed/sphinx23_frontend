import React from "react";
import { useState } from "react";
import HomeNav from "../Home/homeNav";
import back from "../../../images/events/back.png";
import proCat from "../../../images/events/proCat.png";
import CatCard from "./catCard";
import catCardImg from "../../../images/events/catCard.png";
import EventCard from "./EventCard";
import eventsImg from "../../../images/events/roboWars.png";

function Events() {
  const [currTab, setCurrTab] = useState("Home");
  const Tabs = ["Home", "About", "Contact"];
  const Cat = [
    { title: "Programming", icon: proCat, col: "#9672FF", back: catCardImg },
    { title: "Programming", icon: proCat, col: "#9672FF", back: catCardImg },
    { title: "Programming", icon: proCat, col: "#9672FF", back: catCardImg },
  ];
  //   const Ecat = [
  //     {
  //       title: "ROBOWAR",
  //       img: eventsImg,
  //       col: "#FF4B4B",
  //       qr: "",
  //       date: "29-03-10",
  //     },
  //     { title: "Programming", icon: proCat, col: "#9672FF", back: catCardImg },
  //     { title: "Programming", icon: proCat, col: "#9672FF", back: catCardImg },
  //   ];
  return (
    <div className="eventM-main">
      <div className="eventsM-back">
        <img src={back}></img>
      </div>

      <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
      <div className={"eventsM-title"}>EVENTS</div>
      <div className="eventsM-category-sec">
        {Cat.map((item, i) => {
          console.log();
          return <CatCard card={item} key={i} />;
        })}
      </div>
    </div>
  );
}

export default Events;
