import React, { useState } from "react";
import toggle from "../../images/toggle.png";

function SidebarAdmin(props) {
  const { data, optactive, setactive, isSidebar, SetSidebar } = props;

  return (
    <div className={isSidebar ? "sidebar" : `sidebar sidebar-exit`}>
      <div className="sidebar-header">
        <div className="sidebar-title">{data.title}</div>
        <img
          className={
            isSidebar ? "sidebar-toggle rotate0" : `sidebar-toggle rotate`
          }
          src={toggle}
          onClick={() => {
            SetSidebar(!isSidebar);
          }}
        ></img>
      </div>
      <div className={isSidebar ? "sidebar-options" : `sidebar-options exit`}>
        {data.options.map((opt, i) => (
          <div
            className={`sidebar-opt`}
            id={opt}
            key={i}
            onClick={() => {
              setactive(opt);
            }}
          >
            {opt}
            {optactive === opt ? <div className="sidebar-active"></div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarAdmin;
