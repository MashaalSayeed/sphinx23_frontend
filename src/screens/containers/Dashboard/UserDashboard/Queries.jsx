import { useState, useEffect } from "react";
import "./../../../../styles/userDashboard.css";
import Query from "./Query";
import { useSelector } from "react-redux";
import { fetchUserQueries } from "../../../../api";
const Queries = () => {
	const [queries, setQueries] = useState([1, 2, 3]);
	const currUser = useSelector((state) => state.auth.curruser);
	useEffect(() => {
		////console.log("USef Eeevt", currUser.token);
		fetchUserQueries(currUser.token)
			.then((res) => {
				////console.log(res);
				setQueries(res);
				// ////console.log(event);
			})
			.catch((err) => {
				////console.log(err);
			});
	}, []);
	return (
		<div className="ud__queries">
			<h1 className="ud__queries__title">My Queries</h1>
			{queries &&
				queries.map((query) => <Query key={query._id} data={query} />)}
				   {(queries && queries.length==0 )&& <div className="noEvent">No Queries Found</div>}
		</div>
	);
};

export default Queries;
