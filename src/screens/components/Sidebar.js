import React, { useState } from "react";
import toggle from "../../images/toggle.png";

function SidebarAdmin(props) {
  const { data, optactive, setactive, isSidebar, SetSidebar } = props;

  return (
    <>
      {isSidebar ? (
        <div className={"sidebar"}>
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
          <div className="sidebar-options">
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
                {optactive === opt ? (
                  <div className="sidebar-active"></div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            SetSidebar(!isSidebar);
          }}
          className="closed-sidebar"
        >
          <div className="closed-sidebarLine"></div>
          <div className="closed-sidebarLine"></div>
          <div className="closed-sidebarLine"></div>
        </div>
      )}
    </>
  );
}

export default SidebarAdmin;
