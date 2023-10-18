import React, { useEffect, useState } from "react";

import styles from "./Query.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sendIcon from "../../../images/send.png";
import questionIcon from "../../../images/question.png";
import closeIcon from "../../../images/close.png";
import { useSelector } from "react-redux";
function Query({ onSubmit }) {
  const toastStyle = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);
  const currUser = useSelector((state) => state.auth.curruser);
  const handleSubmit = () => {
    let query = { eventId: "", queryDesc: description, subject: subject };
    // ////console.log(query);
    onSubmit(query);
    setOpen(false);
  };
  const handleOpen = () => {
    if (!currUser) {
      toast.error("You need to Login First.", toastStyle);
      return;
    }

    setOpen(true);
  };

  return (
    <div className={styles.query} style={{position:"sticky",top:"0px",left:"30px"}}>
      {open ? (
        <>
          <img
            style={{ filter: "invert(1)", float: "right" }}
            className={styles.icon}
            src={closeIcon}
            onClick={() => {
              setOpen(false);
              setSubject("");
              setDescription("");
            }}
          />
          <div className={styles.popup}>
            <label for="query">Enter Query</label>
            <span>
              <input
                id="query"
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </span>
            <span>
              <textarea
                id="query"
                type="textarea"
                value={description}
                placeholder="Description"
                rows="5"
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                style={{
                  marginTop: "1vw",
                  minHeight: "100px",
                }}
              />
              <img src={sendIcon} onClick={handleSubmit} />
            </span>
          </div>
        </>
      ) : (
        <img className={styles.icon} src={questionIcon} onClick={handleOpen} />
      )}
    </div>
  );
}

export default Query;
