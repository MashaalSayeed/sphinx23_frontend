import React, { useEffect, useState } from "react";

function UserProfile() {
  // const [tabactive, settab] = useState("All Events");
  useEffect(() => {
    window.history.pushState(null, "Sphinx2023", "/eventAdmin/0");
  }, []);

  return (
    <div className="user-event">
      <div className="user-title">User Profile</div>
      <div className="user-tabmenu">
        <div className="tab-function"></div>
      </div>
      <div className="tab-line"></div>
    </div>
  );
}

export default UserProfile;
