import React from "react";
import { Link } from "react-router-dom";
function CatCard(props) {
  const { card, index } = props;
  // //console.log("Clic", card.title);
  const animDelay = (index * 6).toString() + "0ms";

  return (
    <Link to={"/events/" + card.title} style={{ "text-decoration": "none",marginBottom:"30px" }}>
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
    </Link>
  );
}

export default CatCard;
