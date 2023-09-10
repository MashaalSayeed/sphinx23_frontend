import "./../../../../styles/userDashboard.css";
import prof from "../../../../images/user.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
    //console.log("USef Eeevt", currUser.token);
  }, [currUser]);

  return (
    <div className="ud__profile">
      <img className="ud__profile__image" src={prof} alt="profile" />
      <div className="ud__profile__name">
        <h1 className="ud__profile__name_h1">{currUser.profile.name}</h1>
        <h3 className="ud__profile__name_h3">{currUser.profile.collegeName}</h3>
        { 
          currUser.profile.isAmbassador && <h3 className="ud__profile__name_h3">Referal Code: {getReferralCode(currUser.profile.phoneNumber)}</h3>
        }
      </div>
    </div>
  );
};

export default Profile;
