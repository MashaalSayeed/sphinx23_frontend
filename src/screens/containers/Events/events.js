import React, { useEffect } from "react";
import { useState } from "react";
import HomeNav from "../Home/homeNav";
import back from "../../../images/events/back.png";
import proCat from "../../../images/events/proCat.png";
import CatCard from "./catCard";
import catCardImg from "../../../images/events/catCard.png";
import EventCard from "./EventCard";
import eventsImg from "../../../images/events/roboWars.png";

function Events() {
  const [currTab, setCurrTab] = useState("About us");
  const Tabs = ["Home", "Events", "Contact us"];
  const Cat = [
    { title: "Tech", icon: proCat, col: "#9672FF", back: catCardImg },
    { title: "Cultural", icon: proCat, col: "#9672FF", back: catCardImg },
    { title: "EDM", icon: proCat, col: "#9672FF", back: catCardImg },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const Ecat = [
    {
      title: "ROBO WAR",
      img: eventsImg,
      price: "2000",
      date: "22-07-23",
      venue: "VLTC",
      col: "#FF4B4B",
      qr: "",
      time: "12:30",
      date: "29-03-10",
    },
    {
      title: "ROBO WAR",
      img: eventsImg,
      price: "2000",
      date: "22-07-23",
      venue: "VLTC",
      col: "#FF4B4B",
      qr: "",
      date: "29-03-10",
    },
    {
      title: "ROBO WAR",
      img: eventsImg,
      price: "2000",
      date: "22-07-23",
      venue: "VLTC",
      col: "#FF4B4B",
      qr: "",
      date: "29-03-10",
    },
  ];
  return (
    <div className="eventM-main">
      <div class="circle circle-hide"></div>
      <div className="eventsM-back">
        <img src={back}></img>
      </div>
      <div className="eventsM-back-overlay"></div>
      <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
      <div className={"eventsM-title"}>EVENTS</div>
      <div className="eventsM-category-sec">
        {Cat.map((item, i) => {
          console.log();
          return <CatCard card={item} key={i} index={i} />;
        })}
      </div>
    </div>
  );
}

export default Events;
