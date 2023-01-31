import "./../../../../styles/userDashboard.css";

const Profile = () => {
	return (
		<div className="ud__profile">
			<img
				className="ud__profile__image"
				src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
				alt="profile"
			/>
			<div className="ud__profile__name">
				<h1>FirstName LastName</h1>
				<h3>College</h3>
			</div>
		</div>
	);
};

export default Profile;
