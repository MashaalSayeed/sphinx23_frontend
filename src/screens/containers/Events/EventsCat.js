import React from "react";
import { useState } from "react";
import HomeNav from "../Home/homeNav";
import back from "../../../images/events/back.png";
import proCat from "../../../images/events/proCat.png";
import CatCard from "./catCard";
import catCardImg from "../../../images/events/catCard.png";
import EventCard from "./EventCard";
import eventsImg from "../../../images/events/roboWars.png";
import { fetchEventsByCategory } from "../../../api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
function EventsCat() {
  const [Ecat, setECat] = useState([]);
  const params = useParams();
  const categories = new Map([
    ["Tech", 0],
    ["Cultural", 1],
    ["EDM", 2],
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let category = categories.get(params.cat);
    console.log(category);
    if (category === undefined) {
      alert("Category Invalid");
      return;
    }
    fetchEventsByCategory(category)
      .then((res) => {
        setECat(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [currTab, setCurrTab] = useState("EventsCat");
  const Tabs = ["Home", "Events", "Contact"];

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
        {Ecat.map((item, i) => {
          console.log(item);
          return <EventCard card={item} key={i} index={i} />;
        })}
      </div>
    </div>
  );
}

export default EventsCat;
