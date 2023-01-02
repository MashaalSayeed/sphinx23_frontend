import React from "react";
import SidebarSuperAdmin from "../../../components/Sidebar";
import EventTab from "./EventTab";
import SuperEvent from "./SuperEvent";

export default function DashboardSuperAdmin() {
  const Sdata = {
    title: "Admin Login",
    options: ["Profile", "Events", "Pass", "Payment", "User Details"],
  };
  return (
    <div>
      <div className="space-top"></div>
      <SidebarSuperAdmin data={Sdata} />
      <div className="super-main">
        <SuperEvent />
        <EventTab />
      </div>
    </div>
  );
}
