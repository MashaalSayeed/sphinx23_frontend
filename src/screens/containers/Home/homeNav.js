import React, { useEffect } from "react";
import logo from "../../../images/home/homeLogo.png";
import burger from "../../../images/home/burger.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/modules/auth/auth.action";
import Session from "../../../Session";
import { useState } from "react";
import Menu from "./menu";

function HomeNav({
  setCurrTab,
  currTab,
  Tabs,
  notanimation,
  landing,
  setLand,
}) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (currTab == "Events") navigate("/events");
    if (currTab == "Profile") navigate("/dashboard");
    if (currTab == "Logout") {
      //callLogout
      Session.remove("profile");
      logout();
      navigate("/");
    }
    if (currTab != "Home") {
      try {
        setLand(false);
      } catch {
        console.log("not function");
      }
    }
    if (!landing) {
      console.log(currTab);
      if (currTab == "Home") navigate("/");
    }
  }, [currTab]);
  return (
    <div
      className={notanimation ? "landing-navbar-notAnim" : "landing-navbar"}
      style={landing ? { WebkitAnimationDelay: "2.4s" } : {}}
    >
      {menu && (
        <Menu
          menu={menu}
          setMenu={setMenu}
          currTab={currTab}
          setCurrTab={setCurrTab}
        />
      )}
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
                currTab == value
                  ? { textShadow: "0px 0px 0px #FFFFFF ", color: "#c9c9c9" }
                  : {}
              }
            >
              {value}
            </div>
          );
        })}
      </div>
      <div
        className="landing-ham"
        onClick={() => {
          setMenu(true);
        }}
      >
        <img src={burger}></img>
      </div>
    </div>
  );
}

export default HomeNav;
