import React from "react";
import eventsImg from "../../../images/event1.png";

function EventD(props) {
  const card = {
    title: "ROBO WAR",
    img: eventsImg,
    price: "2000",
    date: "22-07-23",
    venue: "VLTC",
    col: "#FF4B4B",
    desc: "Lorem ipsum dolor sit amet consectetur. Odio vitae ac donec aliquam. Amet dictum scelerisque velit libero donec purus amet consectetur molestie. Lectus morbi imperdiet convallis porttitor. Leo justo mi consequat rhoncus sociis consectetur. Nunc rhoncus et sed duis turpis rutrum tristique. Dui habitant senectus tempus tristique morbi varius. Aliquet porttitor elementum scelerisque amet senectus adipiscing in eu. Auctor nibh turpis et elit dictumst. Molestie sit praesent et nunc nulla etiam id risus lacinia. Ut adipiscing mi rhoncus tincidunt suscipit lectus adipiscing aliquet sit. Integer felis felis sollicitudin elementum malesuada rhoncus purus id sollicitudin. Lorem ipsum dolor sit amet consectetur. Odio vitae ac donec aliquam. Amet dictum scelerisque velit libero donec purus amet consectetur molestie. Lectus morbi imperdiet convallis porttitor. Leo justo mi consequat rhoncus sociis consectetur. Nunc rhoncus et sed duis turpis rutrum tristique. Dui habitant senectus tempus tristique morbi varius. Aliquet porttitor elementum scelerisque amet senectus adipiscing in eu. Auctor nibh turpis et elit dictumst. Molestie sit praesent et nunc nulla etiam id risus lacinia. Ut adipiscing mi rhoncus tincidunt suscipit lectus adipiscing aliquet sit. Integer felis felis sollicitudin elementum malesuada rhoncus purus id sollicitudin",
    qr: "",
    time: "12:30",
    date: "29-03-10",
  };
  return (
    <div className="eventD-con">
      <div className="eventD-sec1">
        <div className="eventD-title">{card.title}</div>
        <div className="eventD-sub">
          <div className="eventD-sub1">
            <span style={{ fontSize: "0.8rem" }}>Date</span>
            <br></br>
            <span style={{ fontSize: "1.4rem", fontWeight: "800" }}>
              {"FRIDAY"}
            </span>
            <br></br>
            <span style={{ fontSize: "1.1rem", fontWeight: "300" }}>
              {card.date}
            </span>
          </div>
          <div className="eventD-sub1">
            <span style={{ fontSize: "0.8rem" }}>Venue</span>
            <br></br>
            <span style={{ fontSize: "1.4rem", fontWeight: "800" }}>
              {card.venue}
            </span>
            <br></br>
            <span style={{ fontSize: "1.1rem", fontWeight: "300" }}>
              {card.time}
            </span>
          </div>
          <div className="eventD-sub1">
            <span style={{ fontSize: "0.8rem" }}>Price</span>
            <br></br>
            <span style={{ fontSize: "1.4rem", fontWeight: "800" }}>
              Rs.{card.price}
            </span>
          </div>
        </div>
        <div className="eventD-desc">{card.desc}</div>
        <button className="eventD-reg">Register Now</button>
      </div>
      <div className="eventD-sec2">
        <img src={card.img}></img>
      </div>
    </div>
  );
}

export default EventD;
