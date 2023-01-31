import "./../../../../styles/userDashboard.css";
import Events from "./Events";
import Profile from "./Profile";
import Queries from "./Queries";

const UserDashboard = () => {
	return (
		<div className="ud__containing-grid">
			<Profile />
			<Events />
			<Queries />
		</div>
	);
};

export default UserDashboard;
