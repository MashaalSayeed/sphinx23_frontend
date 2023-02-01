import React, { useEffect, useState } from "react";

import styles from "./Query.module.css";

import sendIcon from "../../../images/send.png";
import questionIcon from "../../../images/question.png";
import closeIcon from "../../../images/close.png";


function Query({ onSubmit }) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = () => onSubmit(query);

    return (
        <div className={styles.query}>
            {open ?
                (
                    <>
                        <img style={{ filter: "invert(1)", float: "right" }} className={styles.icon} src={closeIcon} onClick={() => setOpen(false)} />
                        <div className={styles.popup}>
                            <label for="query">Enter Query</label>
                            <span>
                                <input
                                    id="query"
                                    type="text"
                                    placeholder=""
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSubmit();
                                    }}
                                />
                                <img src={sendIcon} onClick={handleSubmit} />
                            </span>
                        </div>
                    </>
                ) : (
                    <img className={styles.icon} src={questionIcon} onClick={() => setOpen(true)} />
                )}
        </div>);
}

export default Query;