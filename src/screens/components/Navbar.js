import React from "react";
import logo from "../../images/mnitlogo.png";
import notify1 from "../../images/notify1.png";
import dummy from "../../images/dummy_user.png";

function Navbar() {
  const profile_url = null;
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img className="nav-img" src={logo} alt=""></img>
        <div className="nav-title">
          <div className="nav-mnit">MNIT</div>
          <div className="nav-text">
            Malaviya National Institue of Technology
          </div>
        </div>
      </div>
      <div className="nav-icons">
        <img className="nav-notify" src={notify1} alt=""></img>
        <img
          className="nav-profile"
          src={profile_url != null ? profile_url : dummy}
          alt=""
        ></img>
      </div>
    </div>
  );
}

export default Navbar;
