import React from "react";

function EventCard(props) {
  const styles = [
    { backCol: "#FF4B4B", leftCol: "white", rightCol: "#FFC700" },
    { backCol: "#2E2D2D", leftCol: "white", rightCol: "#FFC700" },
    { backCol: "white", leftCol: "#2D2D2D", rightCol: "#FFC700" },
  ];
  const { card, index } = props;
  const curr = styles[index % 3];
  return (
    <div className="eventE-card">
      <div className="eventE-imgCon" style={{ background: curr.backCol }}>
        <img src={card.img}></img>
      </div>
      <div className="eventE-details" style={{ background: curr.backCol }}>
        <div className="eventE-left" style={{ color: curr.leftCol }}>
          <div className="eventE-title">{card.title}</div>
          <div className="eventE-price">
            <span style={{ fontSize: "0.7rem" }}>Price</span>
            <br></br>
            Rs.{card.price}
          </div>
          <button className="eventE-register">Register</button>
        </div>
        <div className="eventE-right" style={{ color: curr.rightCol }}>
          <div className="eventE-sub">
            <div className="eventE-sub1">
              <span style={{ fontSize: "0.7rem" }}>Date</span>
              <br></br>
              <span style={{ fontSize: "1.2rem", fontWeight: "800" }}>
                {card.date}
              </span>
            </div>
            <div className="eventE-sub2">
              <span style={{ fontSize: "0.7rem" }}>Venue</span>
              <br></br>
              <span style={{ fontSize: "1.2rem", fontWeight: "800" }}>
                {card.venue}
              </span>
              <br></br>
              <span style={{ fontSize: "1.1rem", fontWeight: "300" }}>
                {card.time}
              </span>
            </div>
            <div className="eventE-sub1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
