import React, { useEffect } from "react";
import { useState } from "react";
import HomeNav from "../Home/homeNav";
import back from "../../../images/events/back.png";
import proCat from "../../../images/events/proCat.png";
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

  const Tabs = ["Home", "Events", "Contact"];
  //console.log(curruser);
  // if (curruser != null) {
  //   Tabs.push("Profile");
  //   Tabs.push("Logout");
  // } else {
  //   Tabs.push("Login/Register");
  // }
  const Cat = [
    { title: "Flagship", icon: proCat, col: "#9672FF", back: tech },
    { title: "Club", icon: proCat, col: "#9672FF", back: catCardImg },
    { title: "Branch", icon: proCat, col: "#9672FF", back: edm },
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
          //console.log();
          return <CatCard card={item} key={i} index={i} />;
        })}
      </div>
    </div>
  );
}

export default Events;
