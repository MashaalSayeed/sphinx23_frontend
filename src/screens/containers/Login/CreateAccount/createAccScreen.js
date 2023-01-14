import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backimg from "../Signup/image 6.png";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import apple from "../Login/Vector.png";
import google from "../Login/Google (icon — Colour).png";
import fb from "../Login/Vectorfb.png";
import "./createScreen.css";

function CreateAccScreen() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  let url = "https://google.com";
  const Button = styled.button`
    background-color: #1968ff;
    color: white;
    font-size: 14px;
    padding: 10px 80px;
    outline: none;
    border: none;
    border-radius: 4px;
    width: 75%;
    cursor: pointer;
    margin-top: 2.5em;
  `;
  const navigate = useNavigate();
  // const handleClick = () => {
  //   setShowPassword(prev => !prev);
  // }
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Signup Successfully`);
    // window.location.href = "./otp";
    navigate("/otp");
  };
  return (
    <div classname="create-bg">
      {/* <div className='create-main'></div> */}
      <img className="backimgstyle-create" src={backimg}></img>
      <div className="create-main">
        <div className="create-heading">
          <h2>Create an Account</h2>
        </div>
        <div className="create-img">
          <div className="div-create-apple">
            <img className="create-apple" alt="apple icon" src={apple}></img>
          </div>
          <div className="div-create-google">
            <img className="create-google" alt="google icon" src={google}></img>
          </div>
          <div className="div-create-fb">
            <img className="create-fb" alt="facebook icon" src={fb}></img>
          </div>
        </div>
        <div className="mid-line-create">
          <div className="mid-line-create-left"></div>

          <div className="mid-line-mid-create">
            <p>or</p>
          </div>

          <div className="mid-line-create-right"></div>
        </div>
        <div className="create-sub-subtitle">
          <h4>Sign up with email</h4>
        </div>
        <div className="create-subtitle">
          <div className="create-subtitle-s1">
            <p>Already have an account? </p>
          </div>

          <a href="/sign-in" className="create-create-account">
            Sign in
          </a>
        </div>
        <div className="formCenter-create">
          <form className="Form-Container-create" onSubmit={handleSubmit}>
            <div className="formField-create">
              <TextField
                id="standard-basic"
                label="E-mail"
                variant="standard"
                className="formFieldInput-create"
                name="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </div>

            <div className="formField">
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                name="password"
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>

            <Button className="formFieldButton" type="submit">
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccScreen;
