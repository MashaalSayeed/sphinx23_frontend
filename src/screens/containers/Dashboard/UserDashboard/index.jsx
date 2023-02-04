import "./../../../../styles/userDashboard.css";
import Events from "./Events";
import Profile from "./Profile";
import Queries from "./Queries";
import HomeNav from "../../Home/homeNav";
import { useState } from "react";

const UserDashboard = () => {
  const Tabs = ["Home", "Events", "Contact"];
  const [currTab, setCurrTab] = useState("");
  return (
    <div>
      {" "}
      <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
      <div className="ud__containing-grid">
        <Profile />
        <Events />
        <Queries />
      </div>
    </div>
  );
};

export default UserDashboard;
