import React from "react";

function EventCard(props) {
  const { card } = props;
  return (
    <div className="eventE-card">
      <div className="eventE-imgCon">
        <img src={card.img}></img>
      </div>
    </div>
  );
}

export default EventCard;
