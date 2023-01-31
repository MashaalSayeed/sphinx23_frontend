import { useState, useEffect } from "react";
import "./../../../../styles/userDashboard.css";
import Query from "./Query";

const Queries = () => {
  const [queries, setQueries] = useState([1, 2, 3]);

  return (
    <div className="ud__queries">
      <h1 className="ud__queries__title">My Queries</h1>
      {queries.map((query) => (
        <Query key={query} />
      ))}
    </div>
  );
};

export default Queries;
