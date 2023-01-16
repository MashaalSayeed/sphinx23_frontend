import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Loginscreen.css";
import apple from "./Apple.png";
import google from "./Google.png";
import fb from "./Facebook.png";
import sphinxLogo from "./sphinxLogo.png";
import Fest from "./Group16.png";
import Institute from "./Group12.png";
import bg1 from "./bg1.png";
import bg2 from "./bg2.png";
import bg3 from "./bg3.png";
import bg4 from "./bg4.png";
import bg0 from "./bg0.png";

function handleChange(event, setter) {
  const { name, value, type, checked } = event.target;
  setter((prevformData) => ({
    ...prevformData,
    [name]: type === "checkbox" ? checked : value,
  }));
}

function Seprator() {
  return (
    <div className="login-form-seprator">
      <div className="login-form-seprator-line"></div>
      <div className="login-form-seprator-text">or</div>
      <div className="login-form-seprator-line"></div>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="login-social-icons-row">
      <div className="login-social-icon-container">
        <img className="login-social-icons" src={google} />
      </div>
      <div className="login-social-icon-container">
        <img className="login-social-icons" src={apple} />
      </div>
      <div className="login-social-icon-container">
        <img className="login-social-icons" src={fb} />
      </div>
    </div>
  );
}

function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();
  function handleSubmit(event) {
    props.setBg((present) => !present);
    console.log(formData);
    event.preventDefault();

    alert(`Login Successfully`);
    navigate("/home");
  }

  return (
    <>
      <div className="login-form-title">Log in</div>
      <div className="login-form-signup">
        <div className="login-form-signup-que">New User?</div>
        <Link
          className="login-form-signup-link"
          onClick={() => {
            props.toreg(false);
          }}
        >
          Create an account
        </Link>
      </div>
      <div className="login-form-inputs">
        <div className="login-form-input-grp">
          <label className="login-form-text-label" htmlFor="email">
            Email
          </label>
          <input
            className="login-form-text-inputs"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e, setFormData);
            }}
          />
        </div>
        <div className="login-form-input-grp">
          <label className="login-form-text-label" htmlFor="password">
            Password
          </label>
          <input
            className="login-form-text-inputs"
            name="password"
            type={"password"}
            value={formData.password}
            onChange={(e) => {
              handleChange(e, setFormData);
            }}
          />
        </div>
        <div className="login-form-side-options">
          <div className="login-form-side-options-check">
            <input
              className="login-form-checkbox"
              type={"checkbox"}
              name="remember"
              checked={formData.remember}
              onChange={(e) => {
                handleChange(e, setFormData);
              }}
            />
            <label className="login-form-checkbox-label" htmlFor="remember">
              Remember me
            </label>
          </div>
          <Link className="login-form-forgot-pass">Forgot Password?</Link>
        </div>
      </div>
      <div className="login-form-submit-btn" onClick={handleSubmit}>
        Continue
      </div>
      <Seprator />
      <SocialIcons />
    </>
  );
}

function RegScreen1(props) {
  return (
    <>
      <div className="login-form-title">Create an Account</div>
      <SocialIcons />
      <Seprator />
      <div className="login-form-sub-title">Sign-up with email</div>
      <div className="login-form-signup">
        <div className="login-form-signup-que">Already have an account?</div>
        <Link
          className="login-form-signup-link"
          onClick={() => {
            props.toreg(true);
          }}
        >
          Sign in
        </Link>
      </div>
      <div className="login-form-inputs">
        <div className="login-form-input-grp">
          <label className="login-form-text-label" htmlFor="email">
            Email
          </label>
          <input
            className="login-form-text-inputs"
            name="email"
            type="email"
            value={props.formData.email}
            onChange={(e) => {
              handleChange(e, props.setFormData);
            }}
          />
        </div>
        <div className="login-form-input-grp">
          <label className="login-form-text-label" htmlFor="password">
            Password
          </label>
          <input
            className="login-form-text-inputs"
            name="password"
            type={"password"}
            value={props.formData.password}
            onChange={(e) => {
              handleChange(e, props.setFormData);
            }}
          />
        </div>
      </div>
      <div
        className="login-form-submit-btn"
        onClick={() => {
          props.setter(2);
          props.setBg((present) => !present);
        }}
      >
        Continue
      </div>
    </>
  );
}

function RegScreen2(props) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  function handleSubmit() {
    props.setter(3);
    props.setBg((present) => !present);
  }
  return (
    <>
      <div className="login-form-title">Enter OTP</div>
      <div className="login-form-comments">{`A 6 digit code has been sent to ${props.formData.email}`}</div>
      <div className="login-form-otp-row">
        {otp.map((data, index) => {
          return (
            <input
              id="standard-basic"
              variant="standard"
              className="login-form-otp-cell"
              name="otp"
              type="text"
              key={index}
              value={data}
              maxLength="1"
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          );
        })}
      </div>
      <div className="login-form-submit-btn" onClick={handleSubmit}>
        Continue
      </div>
      <div className="login-form-otp-resend">
        <div className="login-form-otp-resend-que">Didn't recieve code?</div>
        <Link className="login-form-otp-resend-link" onClick={() => {}}>
          Resend
        </Link>
      </div>
    </>
  );
}

function RegScreen3(props) {
  return (
    <>
      <div className="login-form-title">Add Details</div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label" htmlFor="name">
          Name
        </label>
        <input
          className="login-form-text-inputs"
          name="name"
          type={"text"}
          value={props.formData.name}
          onChange={(e) => {
            handleChange(e, props.setFormData);
          }}
        />
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label" htmlFor="mobile">
          Mobile
        </label>
        <input
          className="login-form-text-inputs"
          name="mobile"
          type={"tel"}
          value={props.formData.mobile}
          onChange={(e) => {
            handleChange(e, props.setFormData);
          }}
        />
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label" htmlFor="college">
          College
        </label>
        <input
          className="login-form-text-inputs"
          name="college"
          type={"text"}
          value={props.formData.college}
          onChange={(e) => {
            handleChange(e, props.setFormData);
          }}
        />
      </div>
      <div className="login-form-bio">
        <div className="login-form-input-grp">
          <label className="login-form-text-label" htmlFor="gender">
            Gender
          </label>
          <input
            className="login-form-text-inputs"
            name="gender"
            type={"text"}
            value={props.formData.gender}
            onChange={(e) => {
              handleChange(e, props.setFormData);
            }}
          />
        </div>
        <div className="login-form-input-grp">
          <label className="login-form-text-label" htmlFor="dob">
            Date-of-Birth
          </label>
          <input
            className="login-form-text-inputs"
            name="dob"
            type={"date"}
            value={props.formData.date}
            onChange={(e) => {
              handleChange(e, props.setFormData);
            }}
          />
        </div>
      </div>
      <div
        className="login-form-submit-btn"
        onClick={() => {
          props.setBg((present) => !present);
        }}
      >
        Continue
      </div>
    </>
  );
}

function selector(x, setter, formData, setFormData, toreg, setBg) {
  switch (x) {
    case 1:
      return (
        <RegScreen1
          setter={setter}
          formData={formData}
          setFormData={setFormData}
          toreg={toreg}
          setBg={setBg}
        />
      );
    case 2:
      return <RegScreen2 setter={setter} formData={formData} setBg={setBg} />;
    case 3:
      return (
        <RegScreen3
          formData={formData}
          setFormData={setFormData}
          setBg={setBg}
        />
      );
  }
}

function Registration(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
    college: "",
    gender: "",
    dob: "",
  });
  const [stepCount, setStepCount] = useState(1);
  return (
    <>
      <div className="login-form-step-counter">Step {stepCount} of 3</div>
      {selector(
        stepCount,
        setStepCount,
        formData,
        setFormData,
        props.toreg,
        props.setBg
      )}
    </>
  );
}

export default function LoginScreen() {
  const [bgchange, setBg] = useState(true);
  const [registered, setRegistered] = useState(true);
  //   const arr = ["./bg0.png", "./bg1.png", "./bg2.png", "./bg3.png", "./bg4.png"];
  //   const element = document.getElementById("bgChange");
  //   element.style.backgroundImage = `url('./bg0.png')`;
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 5);
    // const element = document.getElementById("bgChange");
    // element.style.backgroundImage = `url(${arr[randomNumber]})`;
  }, [bgchange, registered]);

  return (
    <div className="login-container" id="bgChange">
      <div className="login-image-darken">
        <div className="login-logo-container">
          <img className="login-logo-img" src={sphinxLogo} />
          <div className="login-logo-text">
            <img className="login-logo-institute" src={Institute}></img>
            <img className="login-logo-fest" src={Fest}></img>
          </div>
        </div>
        <div className="login-form-container">
          <div className="login-form-body">
            <div className="login-form-content">
              {registered ? (
                <Login toreg={setRegistered} setBg={setBg} />
              ) : (
                <Registration toreg={setRegistered} setBg={setBg} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
