import { useState } from "react";
import "./../../../../styles/userDashboard.css";

const Query = ({ data }) => {
  const approved = true;
  const [showReply, setShowReply] = useState(false);

  const toggleShowReply = () => {
    const newShowReply = !showReply;
    setShowReply(newShowReply);
  };

  return (
    <div className="ud__query">
      <div className="ud__query__badges">
        <span>#{data.queryId}</span>
        <span>{data.isApproved ? "✅" : "⏳"}</span>
      </div>
      <h2 className="ud_query_subject">{data.subject}</h2>
      <p className="ud_query_desc">{data.queryDesc}</p>
      {showReply ? (
        <p className="ud_query_reply">
          Reply:<br></br>
          {data.responseDesc}
        </p>
      ) : (
        <></>
      )}
      {data.isApproved && (
        <button
          onClick={toggleShowReply}
          className="ud__query__show-reply-button"
        >
          {showReply ? "Hide reply" : "Show reply"}
        </button>
      )}
    </div>
  );
};

export default Query;
