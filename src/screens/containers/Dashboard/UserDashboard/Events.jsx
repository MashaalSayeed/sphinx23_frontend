import { useState } from "react";
import "./../../../../styles/userDashboard.css";
import Event from "./Event";

const Events = () => {
	const [events, setEvents] = useState([1, 2]);

	return (
		<div className="ud__events">
			<h1 className="ud__events__title">My Events</h1>
			<hr />
			{events.map((event) => (
				<Event key={event} />
			))}
		</div>
	);
};

export default Events;
