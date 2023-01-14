import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import OtpInput from "react-otp-input";
// import  DatePicker  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./detailscreen.css";
import styled from "styled-components";
import backimg from "../Signup/image 6.png";

function AddDetailscreen() {
  const [Name, setName] = useState("");
  const [otp, setotp] = useState("");
  const [mobNumber, setmobNumber] = useState("");

  const [College, setCollege] = useState("");
  const [Ambassador, setAmbassador] = useState("");
  // const [value, setValue] = useState(new Date())

  const Button = styled.button`
    background-color: #1968ff;
    color: white;
    font-size: 14px;
    padding: 10px 80px;
    outline: none;
    border: none;
    border-radius: 4px;
    width: 80%;
    cursor: pointer;
    margin-top: 2.5em;
  `;
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`signup Successfully`);
  };
  const handleChange = (otp) => {
    setotp(otp);
  };

  return (
    <div classname="detail-bg">
      {/* <div className='detail-main'></div> */}
      <img className="backimgstyle-detail" src={backimg}></img>
      <div className="detail-main">
        <div className="detail-heading">
          <h2>Add Details</h2>
        </div>

        <div className="formCenter-detail">
          <form className="Form-Container-detail" onSubmit={handleSubmit}>
            <div className="formField-detail">
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                className="formFieldInput"
                name="name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </div>

            <div className="formField-detail">
              <div className="formField-subdetail">
                <div className="formField-subdetail1">
                  <TextField
                    id="standard-basic"
                    label="Mob. Number"
                    variant="standard"
                    className="formFieldInput"
                    name="Mob"
                    type="text"
                    value={mobNumber}
                    onChange={(e) => setmobNumber(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="formField-subdetail2">
                  <p>Enter Otp</p>
                  <OtpInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={6}
                    separator={<span>--</span>}
                  />
                </div>
              </div>
            </div>
            <div className="formField-detail">
              <TextField
                id="standard-basic"
                label="College"
                variant="standard"
                className="formFieldInput"
                name="college"
                type="text"
                value={College}
                onChange={(e) => setCollege(e.target.value)}
                fullWidth
              />
            </div>
            <div className="formField-detail">
              <TextField
                id="standard-basic"
                label="Ambassador"
                variant="standard"
                className="formFieldInput"
                name="College"
                type="text"
                value={Ambassador}
                onChange={(e) => setAmbassador(e.target.value)}
                fullWidth
              />
            </div>
          </form>
          <Button className="formFieldButton-detail" type="submit">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddDetailscreen;
