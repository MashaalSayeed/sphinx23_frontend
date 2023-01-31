import { useState } from "react";
import "./../../../../styles/userDashboard.css";

const Query = () => {
  const approved = true;
  const [showReply, setShowReply] = useState(false);

  const toggleShowReply = () => {
    const newShowReply = !showReply;
    setShowReply(newShowReply);
  };

  return (
    <div className="ud__query">
      <div className="ud__query__badges">
        <span>#128432</span>
        <span>{approved ? "✅" : "⏳"}</span>
      </div>
      <h2 className="ud_query_subject">Query Title</h2>
      <p className="ud_query_desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        incidunt libero voluptatem officia inventore delectus laborum excepturi
        at amet corrupti!
      </p>
      {showReply ? (
        <p className="ud_query_reply">
          Reply:<br></br>Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nam, illo. Porro error harum autem commodi, sed iusto eligendi
          quae maiores ipsa tempore, earum inventore atque labore at! Doloremque
          sunt iste at quidem repellat odit pariatur.
        </p>
      ) : (
        <></>
      )}
      <button
        onClick={toggleShowReply}
        className="ud__query__show-reply-button"
      >
        {showReply ? "Hide reply" : "Show reply"}
      </button>
    </div>
  );
};

export default Query;
