import "../../../../styles/profile.css";
import prof from "../../../../images/user.png";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Qrcard from "./qrcard";
import styles from "../../EventsView/EventsView.module.css";
import Description from "../../EventsView/EventDetails.js";
import Results from "../../EventsView/Results.js";
import Notification from "../../EventsView/Notification.js";
import { useParams } from "react-router-dom";
import { fetchOneEvent, submitQuery } from "../../../../api";
import Query from "../../EventsView/Query.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Margin } from "@mui/icons-material";

const getReferralCode = (x) => {
  const digs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const base = digs.length
  let sign;
  if (x < 0) {
      sign = -1;
  } else if (x === 0) {
      return digs[0];
  } else {
      sign = 1;
  }
  
  x *= sign;
  const digits = [];

  while (x) {
      digits.push(digs[x % base]);
      x = Math.floor(x / base);
  }

  if (sign < 0) digits.push('-');

  digits.reverse();
  return digits.join('');
}

const Profile = () => {
  // const params = useParams();
  const currUser = useSelector((state) => state.auth.curruser);

  // useEffect(() => {
  //   console.log("CurrUser", currUser);
  // }, [currUser]);

  const tabs = {
    Profile: "" ,
    Events: "Events" ,
    Notification: "Notification" 
  };
  const [currentTab, setCurrentTab] = useState("Profile");
  const [event, setEvent] = useState();
  const toastStyle = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
 

  return (
    <div className="ud__profile">
      
      
      <nav className={styles.eventsnav} style={{position:"fixed"}}> 
            <ol>
              {Object.keys(tabs).map((tab) => (
                <li
                  key={tab}
                  className={currentTab == tab ? styles.active : ""}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ol>
            <hr style={{marginLeft:"0px"}}/>
          </nav>
      <div className="profile-container">
        {/* <Qrcard /> */}

        <div className="user-details" style={{marginTop:"60px"}} >
          <img src={prof} alt="" className="user-img" />
          <p className="username" >{currUser.profile.name}</p>
          <div className="details">
              <p>Registered email</p>
              <div className="user-email">{currUser.profile.email}</div>
              <p>Registered Number</p>
              <div className="user-number">{currUser.profile.phoneNumber}</div>
            
              {/* <div className="referral-id">Referal id: 1DF34</div> */}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Profile;
