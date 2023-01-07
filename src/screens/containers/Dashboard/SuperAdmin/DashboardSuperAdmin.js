import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/Sidebar";
import SuperEvent from "./Event/SuperEvent";
import UserDetails from "./UserDetails/userDetails";
import Payment from "./Payment/payment";
import Ambassador from "./Ambassador/ambassador";
import { useSelector } from "react-redux";
import { getUsers, getAmbassadors, getPayments } from "../../../../api";
import Passes from "./Pass/Passes";

export default function DashboardSuperAdmin() {
  const Sdata = {
    title: "Admin Login",
    options: [
      "Profile",
      "Events",
      "Pass",
      "Payment",
      "User Details",
      "Ambassador",
    ],
  };
  const token = useSelector((state) => state.auth.curruser.token);
  const [optactive, setactive] = useState(Sdata.options[1]);
  const [Users, setUsers] = useState([]);
  const [Ambassadors, setAmbassadors] = useState([]);
  const [Payments, setPayments] = useState([]);

  useEffect(() => {
    getUsers("", token, setUsers);
    getAmbassadors(token, setAmbassadors);
    getPayments(token, setPayments);
    console.log("USERS AMBASSADORS PAYMENT SET");
  }, []);
  return (
    <div>
      <div className="space-top"></div>
      <SidebarAdmin data={Sdata} optactive={optactive} setactive={setactive} />
      <div className="super-main">
        {
          {
            Profile: <></>,
            Events: <SuperEvent />,
            Pass: <Passes />,
            Payment: <Payment payments={Payments} />,
            "User Details": <UserDetails users={Users} />,
            Ambassador: <Ambassador ambassadors={Ambassadors} />,
          }[optactive]
        }
      </div>
    </div>
  );
}
