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
import { getUniqueId, loginRegister, logout } from "../../../../api";
import { useNavigate, Link } from "react-router-dom";
import Query from "../../EventsView/Query.js";
import "react-toastify/dist/ReactToastify.css";
import Session from "../../../../Session";

const Profile = () => {
  // const params = useParams();
  const currUser = Session.getObject("profile");
  const navigate=useNavigate()

  useEffect(() => {
    console.log("CurrUser", currUser);
  }, []);


  const [currentTab, setCurrentTab] = useState("Profile");
  const uniqueCode=getUniqueId(currUser.profile.phoneNumber)
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

  useEffect(() => {
    if (currUser && !currUser.profile.isEmailVerified) {
      // toast.error("Please Complete Your Profile", toastStyle);
      navigate('/login')
     
      // props.toreg(false);
    } else if ( currUser&& !currUser.profile.isMobileNumberVerified) 
    {
      // toast.error("Please Complete Your Profile", toastStyle); 
      navigate('/login')
      // props.toreg(false);
    } 

  }, [])
 
  const passes = useSelector((state) => state.auth.allpasses);
  const Passes=()=>{
    return <div className="passes-sec">{passCardElements}</div>
  }
  const passCardElements = passes.map((onePass, i) => {
    return (
      
       <div className="profPass">
      <img className="profPass-img" src={onePass.imageUrl}></img>
      <div className="profInfo">
        <div className="profPass-name">{onePass.name} </div>
        <div className="profPass-detail">{onePass.desc} </div>
        <div className="profPass-name" style={{fontSize:"1rem"}}>
           <span>Total</span>
           <span >Rs.{onePass.amount}</span>
        </div>
        <div className="profPass-detail">The pass will be added to your Profile section as soon as you complete the payment</div>
        <button>Proceed to Pay </button>
      </div>
    </div>
   
    );
  });
  
  const Prof=()=>{ return <div className="profile-container" >
  <Qrcard Code={uniqueCode} name={currUser.profile.name} />

  <div className="user-details" >
    <img src={prof} alt="" className="user-img" />
    <p className="username" style={{textTransform:"capitalize",textShadow:"none",fontWeight:"700"}} >{currUser.profile.name}</p>
    <div className="details">
        <p>Registered email</p>
        <div className="user-email">{currUser.profile.email}</div>
        <p>Registered Number</p>
        <div className="user-number">{currUser.profile.phoneNumber}</div>
      
        {currUser.profile.isAmbassador&& <div className="referral-id">Referal id: {uniqueCode}</div>}
    </div>
  </div>
</div>}



const tabs = {
  Profile: <Prof  />,
  "My Passes": <Passes data={event} />,
  // Notifcation: <Notification data={event} />,
};

  return (
    <div className="ud__profile">
      
      
      <div className={styles.eventsnav} style={{position:"absolute",top:"50px",zIndex:'20'}}>
        {/* <div className="nav-list">
          {
            Object.keys(tabs).map((tab) => (
              <div key={tab} className={`nav-item ${currentTab == tab ? styles.active : ""}`} onClick={() => setCurrentTab(tab)}>{tab}</div>
            ))
          }
        </div> */}
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
          </nav>
            <hr style={{marginLeft:"0px"}}/>
        </div>
          {tabs[currentTab]}

     
    </div>
    
  );
};

export default Profile;
