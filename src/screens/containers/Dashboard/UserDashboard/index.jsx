import "./../../../../styles/userDashboard.css";
import Events from "./Events";
import Profile from "./Profile";
import Queries from "./Queries";
import HomeNav from "../../Home/homeNav";
import { useState, useEffect } from "react";
import back from "../../../../images/userBack.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const UserDashboard = () => {
  const currUser = useSelector((state) => state.auth.curruser);

  const navigate = useNavigate();
  useEffect(() => {
    if (!currUser) {
      window.location.href = "/login";
    }
    ////console.log("USef Eeevt", currUser.token);
    if (currUser.profile.type === "superAdmin") {
      navigate("/superAdmin");
    }
    if (currUser.profile.type === "eventAdmin") {
      navigate("/eventAdmin");
    }
  }, []);
  const Tabs = ["Home", "Events", "Profile"];
  const [currTab, setCurrTab] = useState("");
  return (
    <div className="dashBack">
      <img className="dashImg" src={back}></img>{" "}
      <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
      <div className="ud__containing-grid">
        <Profile />
        {/* <Events />
        <Queries /> */}
      </div>
    </div>
  );
};

export default UserDashboard;
