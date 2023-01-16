import React from "react";
import logo from "../../../images/home/homeLogo.png";
import burger from "../../../images/home/burger.png";

function HomeNav({ setCurrTab, currTab, Tabs }) {
  return (
    <div className="landing-navbar">
      <div className="landing-logo">
        <img src={logo}></img>
      </div>
      <div className="landing-tabs">
        {Tabs.map((value, i) => {
          return (
            <div
              className="landing-tab-link"
              key={i}
              onClick={() => {
                console.log(value);
                setCurrTab(value);
              }}
              style={
                currTab == value ? { textShadow: "0px 1px 3px #FFFFFF " } : {}
              }
            >
              {value}
            </div>
          );
        })}
      </div>
      <div className="landing-ham">
        <img src={burger}></img>
      </div>
    </div>
  );
}

export default HomeNav;
