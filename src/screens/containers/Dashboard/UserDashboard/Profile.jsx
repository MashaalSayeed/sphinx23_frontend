import "../../../../styles/profile.css";
import prof from "../../../../images/user.png";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import EventCard from "../../Events/EventCard.js" 
import styles from "../../EventsView/EventsView.module.css";
import Description from "../../EventsView/EventDetails.js";
import Results from "../../EventsView/Results.js";
import Notification from "../../EventsView/Notification.js";
import { useParams } from "react-router-dom";
import { fetchOneEvent, submitQuery } from "../../../../api";
import Query from "../../EventsView/Query.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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
  const [currentTab, setCurrentTab] = useState("Description");
  // useEffect(() => {
  //   console.log("CurrUser", currUser);
  // }, [currUser]);

  const tabs = {
    Description: "Description" ,
    Results: "Result" ,
    Notification: "Notification" 
  };
  // const [currentTab, setCurrentTab] = useState("Description");
  //const [event, setEvent] = useState();
  // const toastStyle = {
  //   position: "top-right",
  //   autoClose: 2000,
  //   hideProgressBar: true,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "dark",
  // };
  // useEffect(() => {
  //   //console.log("USef Eeevt");
  //   fetchOneEvent(setEvent, params.id)
  //     .then((res) => {
  //       //console.log(res);
  //       setEvent(res);
  //       // //console.log(event);
  //     })
  //     .catch((err) => {
  //       //console.log(err);
  //     });
  // }, []);
  // const handleQuery = (query) => {
  //   if (!query.subject || !query.queryDesc) {
  //     alert("All Fields are Mandatory");
  //     return;
  //   }
  //   query.eventId = params.id;
  //   submitQuery(currUser.token, query)
  //     .then((res) => {
  //       toast.info(res, toastStyle);
  //       //console.log(res);
  //     })
  //     .catch((err) => {
  //       toast.error(err, toastStyle);
  //       //console.log(err);
  //     });
  //   //console.log(query);
  // };

  return (
    <div className="ud__profile">
      
      
      <nav className={styles.eventsnav}>
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
            <hr/>
          </nav>
      <div className="profile-container">
        <EventCard />

        <div className="user-details">
          <img src={prof} alt="" className="user-img" />
          <h3 className="username">USER NAME</h3>
          <div className="details">
              <p>Registered email</p>
              <div className="user-email">{currUser.profile.email}</div>
              <p>Registered Number</p>
              <div className="user-number">123456789</div>
              <p className="change-no">Change Number?</p>
              <div className="referral-id">Referal id: 1DF34</div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Profile;
