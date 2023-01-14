import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Loginscreen.css";
import backimg from "../Signup/image 6.png";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import apple from "./Vector.png";
import google from "./Google (icon — Colour).png";
import fb from "./Vectorfb.png";
// import { InputAdornment } from '@mui/material';

export default function LoginScreen() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [IsChecked, setIsChecked] = useState(false);
  let url = "https://google.com";
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
  const navigate = useNavigate();
  // const handleClick = () => {
  //   setShowPassword(prev => !prev);
  // }
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Login Successfully`);
    navigate("/home");
  };
  const moveToCreateAccount = () => {
    navigate("/sign-up");
  };
  return (
    <div classname="login-bg">
      {/* <div className='login-main'></div> */}
      <img className="backimgstyle" src={backimg}></img>
      <div className="login-main">
        <div className="login-heading">
          <h2>Log In</h2>
        </div>
        <div className="login-subtitle">
          <div className="login-subtitle-s1">
            <p>New user? </p>
          </div>

          {/* <a href={url} className="create-account">Create an account</a> */}

          <Link to="/sign-up" className="create-account">
            Create an account
          </Link>
        </div>
        <div className="formCenter">
          <form className="Form-Container" onSubmit={handleSubmit}>
            <div className="formField">
              <TextField
                id="standard-basic"
                label="E-mail"
                variant="standard"
                className="formFieldInput"
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
                // endAdornment={
                //   <InputAdornment position="end">
                //     <IconButton
                //       aria-label="toggle password visibility"
                //       onClick={handleClickShowPassword}
                //       onMouseDown={handleMouseDownPassword}
                //     >
                //       {values.showPassword ? <Visibility /> : <VisibilityOff />}
                //     </IconButton>
                //   </InputAdornment>
                // }
              />
            </div>
            <div className="checkbox">
              <label className="formFieldCheckboxLabel">
                <input
                  className="formFieldCheckbox"
                  type="checkbox"
                  name="IsChecked"
                  InputAdornment=""
                  value={IsChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />{" "}
                Remember me{" "}
              </label>

              <Link to="/forgotpass" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <Button className="formFieldButton" type="submit">
              Continue
            </Button>
          </form>
        </div>
        <div className="mid-line">
          <div className="mid-line-left"></div>

          <div className="mid-line-mid">
            <p>or</p>
          </div>

          <div className="mid-line-right"></div>
        </div>
        <div className="signin-img">
          <div className="div-signin-apple">
            <img className="signin-apple" alt="apple icon" src={apple}></img>
          </div>
          <div className="div-signin-google">
            <img className="signin-google" alt="google icon" src={google}></img>
          </div>
          <div className="div-signin-fb">
            <img className="signin-fb" alt="facebook icon" src={fb}></img>
          </div>
        </div>
      </div>
    </div>
  );
}
