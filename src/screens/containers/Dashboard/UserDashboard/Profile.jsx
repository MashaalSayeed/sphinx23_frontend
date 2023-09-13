import "./../../../../styles/profile.css";
import prof from "../../../../images/user.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import EventCard from "../../Events/EventCard.js"

const getReferralCode = (x) => {
  const digs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const base = digs.length
  let sign;
  if (x < 0) {
      sign = -1;
  } else if (x === 0) {
      return digs[0];
  } else {
      sign = 1;
  }
  
  x *= sign;
  const digits = [];

  while (x) {
      digits.push(digs[x % base]);
      x = Math.floor(x / base);
  }

  if (sign < 0) digits.push('-');

  digits.reverse();
  return digits.join('');
}

const Profile = () => {
  const currUser = useSelector((state) => state.auth.curruser);
  useEffect(() => {
    console.log("CurrUser", currUser);
  }, [currUser]);

  return (
    <div className="ud__profile">
      <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item">
          <a class="active" href="#">Profile</a>
        </li>
        <li class="nav-item">
          <a href="#">My Passes</a>
        </li>
        <li class="nav-item">
          <a href="#">My Events</a>
        </li>
        <li class="nav-item">
          <a href="#">Notification</a>
        </li>
      </ul>
    </nav>
    <div className="profile-container">

       <div className="pass-container">
        <div className="pass">
          <img src="img/roboWars.png" alt="pass-image" class="pass-img" />
        </div>
        <div className="pass-id">
          <p className="id-text">#1DF34</p>
          <img src="img/qr.jpg" alt="id qr code" class="id-qr" />
        </div>
      </div> 
      <div className="user-details">
        <img src={prof} alt="" className="user-img" />
        <h3 className="username">USER NAME</h3>
        <div className="details">
          <p>Registered email</p>
          <div className="user-email">{currUser.profile.email}</div>
          <p>Registered Number</p>
          <div className="user-number">123456789</div>
          <p className="change-no">Change Number?</p>
          <div className="referral-id">Referal id: 1DF34</div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Profile;
