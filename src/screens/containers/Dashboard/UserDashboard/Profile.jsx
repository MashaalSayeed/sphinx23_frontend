import "./../../../../styles/userDashboard.css";
import prof from '../../../../images/user.png'
import { useSelector } from "react-redux";

const Profile = () => {
	const currUser = useSelector((state) => state.auth.curruser);
	console.log(currUser);
	return (
		<div className="ud__profile">
			<img
				className="ud__profile__image"
				src={prof}
				alt="profile"
			/>
			<div className="ud__profile__name">
				<h1 className="ud__profile__name_h1">{currUser.profile.name}</h1>
				<h3 className="ud__profile__name_h3">{currUser.profile.collegeName}</h3>
			</div>
		</div>
	);
};

export default Profile;
