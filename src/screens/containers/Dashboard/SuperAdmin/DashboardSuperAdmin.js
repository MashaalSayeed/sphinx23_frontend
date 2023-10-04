import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/Sidebar";
import SuperEvent from "./Event/SuperEvent";
import UserDetails from "./UserDetails/userDetails";
import Payment from "./Payment/payment";
import Ambassador from "./Ambassador/ambassador";
import { useSelector } from "react-redux";
import { getUsers, getAmbassadors, getPayments } from "../../../../api";
import Passes from "./Pass/Passes";
import Profile from "./Profile/Profile";
import UserProfile from "./Profile/UserProfile";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate, Navigate } from "react-router-dom";
import HomeNav from "../../Home/homeNav";

export default function DashboardSuperAdmin() {
  const [isSidebar, SetSidebar] = useState(true);
  const Sdata = {
    title: "Admin Login",
    options: ["Profile", "Events", "Pass", "User Details", "Ambassador"],
  };
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.curruser.token);
  const profile = useSelector((state) => state.auth.curruser.profile);
  const [optactive, setactive] = useState(Sdata.options[1]);
  const [Users, setUsers] = useState([]);
  const [Ambassadors, setAmbassadors] = useState([]);
  const [Payments, setPayments] = useState([]);

  useEffect(() => {
    if (profile && profile.type != "superAdmin") {
      alert("Unauthorized");
      navigate("/");
    }

    // getUsers("", token, setUsers);
    // getAmbassadors(token, setAmbassadors);
    // getPayments(token, setPayments);
    // ////console.log("USERS AMBASSADORS PAYMENT SET");
  }, []);
  const Tabs = ["Home", "Events", "Profile"];
  const [currTab, setCurrTab] = useState("");
  return (
    <div style={{ backgroundColor: "white" }}>
      {" "}
      <div style={{ background: "black" }}>
        {" "}
        <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
      </div>
      <div className="space-top"></div>
      <div className="super-mainCon">
        <SidebarAdmin
          data={Sdata}
          optactive={optactive}
          setactive={setactive}
          isSidebar={isSidebar}
          SetSidebar={SetSidebar}
        />
        <div
          className="super-main"
          style={!isSidebar ? { width: "98%", margin: "auto" } : {}}
        >
          {
            {
              Profile: (
                <>
                  <UserProfile></UserProfile>
                  <Profile />
                </>
              ),
              Events: <SuperEvent />,
              Pass: <Passes />,
              // Payment: <Payment payments={Payments} />,
              "User Details": <UserDetails users={Users} />,
              Ambassador: <Ambassador ambassadors={Ambassadors} />,
            }[optactive]
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
