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
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function EventsCat() {
  const [Ecat, setECat] = useState([]);
  const params = useParams();
  const categories = new Map([
    ["Flagship", 0],
    ["Club", 1],
    ["Department", 2],
    ['Research',3],
    ['Workshops',4]
  ]);
 
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    let category = categories.get(params.cat);
    console.log(params.cat);
    console.log(category);
    if (category === undefined) {
      alert("Category Invalid");
      return;
    }
    fetchEventsByCategory(category)
      .then((res) => {
        setECat(res);
        if (res.length == 0) {
          navigate("/comming");
        }
      })
      .catch((err) => {
        ////console.log(err);
      });
  }, []);

  const [currTab, setCurrTab] = useState("EventsCat");
  const Tabs = ["Home", "Events", "Profile"];

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
          ////console.log(item);
          return (
            <EventCard card={item} key={i} index={i} category={item.category} />
          );
        })}
      </div>
    </div>
  );
}

export default EventsCat;
