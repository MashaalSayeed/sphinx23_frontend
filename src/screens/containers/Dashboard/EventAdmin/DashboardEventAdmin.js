import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/Sidebar";
import { useSelector } from "react-redux";
import { getUsers, getAmbassadors, getPayments } from "../../../../api";
import AdminEvent from "./Event/AdminEvent";
import TeamTab from "./Team/TeamTab";
import UserProfile from "./Profile/UserProfile";
import Profile from "./Profile/Profile";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Complaints from "./Complaints/Complaints";
import { useNavigate } from "react-router-dom";
export default function DashboardEventAdmin() {
  const Sdata = {
    title: "Event Admin",
    options: ["Profile", "Events", "Query", "Team"],
  };
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.curruser.token);
  const profile = useSelector((state) => state.auth.curruser.profile);
  const [optactive, setactive] = useState(Sdata.options[1]);
  const [isSidebar, SetSidebar] = useState(true);
  // const [Users, setUsers] = useState([]);
  // const [Ambassadors, setAmbassadors] = useState([]);
  // const [Payments, setPayments] = useState([]);
  useEffect(() => {
    if (profile && profile.type != "eventAdmin") {
      alert("Unauthorized");
      navigate("/");
    }

    // getUsers("", token, setUsers);
    // getAmbassadors(token, setAmbassadors);
    // getPayments(token, setPayments);
    // console.log("USERS AMBASSADORS PAYMENT SET");
  }, []);
  // useEffect(() => {
  //   getUsers("", token, setUsers);
  //   getAmbassadors(token, setAmbassadors);
  //   getPayments(token, setPayments);
  //   console.log("USERS AMBASSADORS PAYMENT SET");
  // }, []);
  return (
    <div>
      <Navbar />

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
          style={!isSidebar ? { width: "95%", margin: "auto" } : {}}
        >
          {
            {
              Profile: (
                <>
                  <UserProfile />
                  <Profile />
                </>
              ),
              Events: <AdminEvent />,
              Query: <Complaints />,
              Team: <TeamTab />,
            }[optactive]
          }
        </div>{" "}
      </div>
      <Footer />
    </div>
  );
}
