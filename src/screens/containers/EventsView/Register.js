import React from "react";
import { useState } from "react";
import styles from "./Register.module.css";
import close from "../../../images/close.png";

function Register(props) {
  const { regState, setReg } = props;
  const InputField = (props) => {
    return (
      <div className={styles.inputCon}>
        <label className={styles.inputLabel}>{props.name}</label>
        <input
          className={styles.inputField}
          //   value={props.value}
          //   onChange={(e) => {
          //     props.setValue(e.target.value);
          //   }}
        ></input>
      </div>
    );
  };
  const event = { title: "ROBOWARS", subTitle: "FLAGSHIP EVENTS" };
  const [teamName, setTeamName] = useState("");
  return (
    <div className={styles.con}>
      <button
        className={styles.close}
        onClick={() => {
          setReg(false);
        }}
      >
        <img src={close}></img>
      </button>
      <div className={styles.form}>
        <div className={styles.subTitle}>{event.subTitle}</div>
        <div className={styles.title}>{event.title}</div>
        <section className={styles.formCon}>
          <div className={styles.filedsCon}>
            {" "}
            <InputField
              name={"Team Name"}
              vaue={teamName}
              setValue={setTeamName}
            />
            <InputField
              name={"Team Name"}
              vaue={teamName}
              setValue={setTeamName}
            />
            <InputField name={"Name"} vaue={teamName} setValue={setTeamName} />
          </div>
          <div className={styles.filedsCon}>
            {" "}
            <InputField
              name={"Team Name"}
              vaue={teamName}
              setValue={setTeamName}
            />
            <InputField
              name={"Team Name"}
              vaue={teamName}
              setValue={setTeamName}
            />
            <InputField name={"Name"} vaue={teamName} setValue={setTeamName} />
          </div>

          <div className={styles.filedsCon}>
            {" "}
            <InputField
              name={"Team Name"}
              vaue={teamName}
              setValue={setTeamName}
            />
            <InputField
              name={"Team Name"}
              vaue={teamName}
              setValue={setTeamName}
            />
            <InputField name={"Name"} vaue={teamName} setValue={setTeamName} />
          </div>
        </section>
        <button className="eventD-reg" style={{ margin: "auto" }}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Register;
