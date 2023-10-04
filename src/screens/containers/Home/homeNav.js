import React, { useEffect } from "react";
import logo from "../../../images/home/homeLogo.png";
import burger from "../../../images/home/burger.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/modules/auth/auth.action";
import Session from "../../../Session";
import { useState } from "react";
import Menu from "./menu";
import { useSelector } from "react-redux";
import disableScroll from "disable-scroll";

function HomeNav({
  setStatus,
  setCurrTab,
  currTab,
  Tabs,
  notanimation,
  landing,
  setLand,
  setMenuStatus,
}) {
  const navigate = useNavigate();

  const currUser = useSelector((state) => state.auth.curruser);

  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (currTab == "Events" || currTab == "EVENTS") navigate("/events");
    if (currTab == "PROFILE" || currTab == "Profile") {
      if (currUser) navigate("/dashboard");
      else {
        navigate("/login");
      }
    }
    if (currTab == "AMBASSADOR") navigate("/ambassador");
    if (currTab == "Contact") {
      // navigate("/");
      window.location.href = "#contact";
    }

    if (currTab == "SCHEDULE") navigate("/comming");

    if (currTab == "TEAM") navigate("/comming");
    if (currTab == "SPONSORS") navigate("/comming");
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
        ////console.log("not function");
      }
    }
    if (!landing) {
      ////console.log(currTab);
      if (currTab == "Home" || currTab == "HOME") navigate("/");
    }
  }, [currTab]);

  useEffect(() => {
    try {
      setStatus(menu);
    } catch {}
  }, [menu]);

  menu ? disableScroll.on() && setLand(false) : disableScroll.off();

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
        <img src={logo} style={{ width: "80%" }}></img>
      </div>
      <div className="landing-tabs">
        {Tabs.map((value, i) => {
          return (
            <div
              className="landing-tab-link"
              key={i}
              onClick={() => {
                ////console.log(value);
                setCurrTab(value);
                setStatus(false);
                // setMenuStatus(false);
              }}
              style={
                currTab == value
                  ? {
                      textShadow: "0px 0px 0px #FFFFFF ",

                      color: "#c9c9c9",
                    }
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
        style={{ cursor: "pointer" }}
      >
        <img src={burger}></img>
      </div>
    </div>
  );
}

export default HomeNav;
