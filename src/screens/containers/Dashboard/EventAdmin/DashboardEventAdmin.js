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

export default function DashboardEventAdmin() {
  const Sdata = {
    title: "Event Admin",
    options: ["Profile", "Events", "Complaints", "Team"],
  };
  const token = useSelector((state) => state.auth.curruser.token);
  const [optactive, setactive] = useState(Sdata.options[1]);
  const [isSidebar, SetSidebar] = useState(true);
  // const [Users, setUsers] = useState([]);
  // const [Ambassadors, setAmbassadors] = useState([]);
  // const [Payments, setPayments] = useState([]);

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
              Complaints: <></>,
              Team: <TeamTab />,
            }[optactive]
          }
        </div>{" "}
      </div>
      <Footer />
    </div>
  );
}
