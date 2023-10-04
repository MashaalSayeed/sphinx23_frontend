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
import HomeNav from "../../Home/homeNav";
import { useParams } from "react-router-dom";
export default function DashboardEventAdmin() {
  const Sdata = {
    title: "Event Admin",
    options: ["Profile", "Events", "Query", "Team"],
  };

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.curruser.token);
  const profile = useSelector((state) => state.auth.curruser.profile);
  const [optactive, setactive] = useState(Sdata.options[0]);
  const [isSidebar, SetSidebar] = useState(true);
  const params = useParams();
  const currtab = params.tab;
  ////console.log(currtab);

  // const [Users, setUsers] = useState([]);
  // const [Ambassadors, setAmbassadors] = useState([]);
  // const [Payments, setPayments] = useState([]);
  useEffect(() => {
    if (profile && profile.type != "eventAdmin") {
      alert("Unauthorized");
      navigate("/");
    }
    try {
      const tabNo = parseInt(currtab);
      if (tabNo >= 0 && tabNo < Sdata.options.length)
        setactive(Sdata.options[parseInt(currtab)]);
    } catch {
      ////console.log("invalid tab");
    }
    ////console.log("Event Admin cAlled");
    // getUsers("", token, setUsers);
    // getAmbassadors(token, setAmbassadors);
    // getPayments(token, setPayments);
    // ////console.log("USERS AMBASSADORS PAYMENT SET");
  }, []);
  // useEffect(() => {
  //   getUsers("", token, setUsers);
  //   getAmbassadors(token, setAmbassadors);
  //   getPayments(token, setPayments);
  //   ////console.log("USERS AMBASSADORS PAYMENT SET");
  // }, []);
  const Tabs = ["Home", "Events", "Profile"];
  const [currTab, setCurrTab] = useState("");
  return (
    <div style={{ backgroundColor: "white" }}>
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
          style={!isSidebar ? { width: "95%", margin: "auto" } : {}}
        >
          {
            {
              Profile: (
                <>
                  {/* {navigate("/eventAdmin/0")} */}
                  {/* {(window.location.href = "/eventAdmin/0")} */}
                  <UserProfile />
                  <Profile />
                </>
              ),
              Events: (
                <>
                  {/* {(window.location.href = "/eventAdmin/1")} */}
                  <AdminEvent />
                </>
              ),
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
