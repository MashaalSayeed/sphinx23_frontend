import React from "react";

function CatCard(props) {
  const { card, index } = props;

  const animDelay = (index * 6).toString() + "0ms";

  return (
    <div className="eventM-catCard" style={{ animationDelay: animDelay }}>
      <img className="eventM-catCard-img" src={card.back}></img>
      <div className="eventM-catCard-overlay">
        <img className="eventM-catCard-icon" src={card.icon}></img>
        <div className="catCard-text">
          <div className="catCard-category">Category</div>
          <div className="catCard-title"> {card.title}</div>
        </div>
      </div>
    </div>
  );
}

export default CatCard;
