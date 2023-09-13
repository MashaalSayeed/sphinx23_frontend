import React from "react";
import roboWars from "../../../images/events/roboWars.png";
import qr from "../../../images/events/qr_1.jpg";
import "../../../styles/profile.css";
function EventCard() {
  return (
    <div>
      <div class="pass">
        <img
          src={roboWars}
          alt="pass-image"
          class="pass-img"
        />
      </div>
      <div class="pass-id">
        <p class="id-text">#1DF34</p>
        <img
          src={qr}
          alt="id qr code"
          class="id-qr"
        />
      </div>
    </div>
  );
}

export default EventCard;
