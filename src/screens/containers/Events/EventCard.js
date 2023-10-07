import React from "react";
import { Link } from "react-router-dom";
function EventCard(props) {
  const styles = {
    Department:{
      backCol: "white",
      leftCol: "black",
      rightCol: "black",
    },
    Club: {
      backCol: "white",
      leftCol: "black",
      rightCol: "black",
    },
    Flagship: {
      backCol: "white",
      leftCol: "black",
      rightCol: "black",
    },
    SRC: {
      backCol: "white",
      leftCol: "black",
      rightCol: "black",
    },
    Workshops: {
      backCol: "white",
      leftCol: "black",
      rightCol: "black",
    },
    
  };
  const { card, index, category } = props;
  const curr = styles[category];
  console.log(category)
  const animDelay = (index * 6).toString() + "0ms";
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  ////console.log("/events/" + card.category + "/" + card._id);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date(card.from);
  return (
    <Link
      to={"/events/" + card.category + "/" + card._id}
      style={{ "text-decoration": "none" }}
    >
      <div className="eventE-card" style={{ animationDelay: animDelay }}>
        <div className="eventE-imgCon" style={{ background: curr.backCol }}>
          <img src={card.imageUrl}></img>
        </div>
        <div className="eventE-details" style={{ background: curr.backCol }}>
          <div className="eventE-left" style={{ color: curr.leftCol }}>
            <div className="eventE-title" style={{ fontSize: "16px" }}>
              {card.name}
            </div>
            {/* {card.amount != 0 && (
              <div className="eventE-price">
                <span style={{ fontSize: "0.7rem" }}>Price</span>
                <br></br>
                Rs.{card.amount}
              </div>
            )} */}
            <button className="eventE-register">EXPLORE</button>
          </div>
          <div className="eventE-right" style={{ color: curr.rightCol }}>
            <div className="eventE-sub">
              <div className="eventE-sub1">
                <span style={{ fontSize: "0.7rem" ,color:"black",fontWeight:"500"}}>Date</span>
                <br></br>
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "800",
                    color:"grey"
                  }}
                >
                  3rd -5th Nov
                  {/* {weekday[date.getDay()]}
                  <br></br>
                  {date.getDate() +
                    " " +
                    monthNames[date.getMonth()] +
                    " " +
                    date.getFullYear()} */}
                </span>
              </div>

              <div className="eventE-sub2" style={{ marginTop: "25px" }}>
                <span style={{ fontSize: "0.7rem",color:"black",fontWeight:"500" }}>Event Venue</span>
                <br></br>
                <span style={{ fontSize: "0.9rem", fontWeight: "800",color:"grey" }}>
                  Stay Tuned
                </span>
                {/* <span style={{ fontSize: "1.2rem", fontWeight: "800" }}>
                  {card.location}
                </span>
                <br></br>
                <span style={{ fontSize: "1.1rem", fontWeight: "300" }}>
                  {card.time}
                </span> */}
              </div>
              <div className="eventE-sub1"></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default EventCard;
