import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Loginscreen.css";
import apple from "./Apple.png";
import google from "./Google.png";
import fb from "./Facebook.png";
import sphinxLogo from "./sphinxLogo.png";
import Fest from "./Group16.png";
import Institute from "./Group12.png";
import {
  loginRegister,
  sendVerificationMail,
  verifyMailOTP,
  sendMobileOTP,
  getUsersId,
  verifyMobileOTP,
} from "../../../api";
import { useDispatch, useSelector } from "react-redux";

import bg1 from "./bg1.png";
import bg2 from "./bg2.png";
import bg3 from "./bg3.png";
import bg4 from "./bg4.png";
import bg0 from "./bg0.png";
import Session from "../../../Session";
import { LeakRemoveTwoTone } from "@mui/icons-material";

function handleChange(event, setter) {
  // console.log("Handle Called");
  const { name, value, type, checked } = event.target;
  console.log(name, value);
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
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();
  // const profile = useSelector((state) => state.auth.curruser.profile);
  // useEffect(() => {
  //   // if (profile && !profile.isEmailVerified) {
  //   //   props.setter(2);
  //   //   props.setBg((present) => !present);
  //   // }
  //   // if (profile && profile.isEmailVerified && !profile.isMobileNumberVerified) {
  //   //   props.setter(3);
  //   //   props.setBg((present) => !present);
  //   // }
  //   // if (profile && profile.isEmailVerified && profile.isMobileNumberVerified) {
  //   //   navigate("/home");
  //   // }
  //   // //
  //   // chandra();
  //   // loginRegister(dispatch, creds);
  //   // fetchUpdates(dispatch);
  // }, []);
  function handleSubmit(event) {
    props.setBg((present) => !present);
    formData.isRegistration = false;
    console.log(formData);
    event.preventDefault();
    loginRegister(dispatch, formData)
      .then((data) => {
        console.log(data);
        alert("Success");
      })
      .catch((err) => {
        alert(err);
      });
    // alert(`Login Successfully`);
    // navigate("/eventAdmin");
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.curruser);
  useEffect(() => {
    console.log("Use Effect Called", user);
    if (user && !user.profile.isEmailVerified) {
      console.log("mail");
      sendVerificationMail()
        .then((res) => {
          alert("Mail Sent");

          props.setter(2);
          props.setBg((present) => !present);
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (
      user &&
      user.profile.isEmailVerified &&
      !user.profile.isMobileNumberVerified
    ) {
      console.log("Called");
      alert("Profile is not complete.");
      props.setter(3);
      props.setBg((present) => !present);
    }
    if (
      user &&
      user.profile.isEmailVerified &&
      user.profile.isMobileNumberVerified
    ) {
      console.log("Called");
      alert("Already Logged In");
      navigate("/home");
    }
    // chandra();
    // loginRegister(dispatch, creds);
    // fetchUpdates(dispatch);
  }, []);

  const handleSubmit = async () => {
    console.log("Called", props.formData);
    props.formData.isRegistration = true;

    loginRegister(dispatch, props.formData)
      .then((res) => {
        console.log(res);
        sendVerificationMail()
          .then((res) => {
            alert("Mail Sent");

            props.setter(2);

            props.setBg((present) => !present);
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
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
      <div className="login-form-submit-btn" onClick={handleSubmit}>
        Continue
      </div>
    </>
  );
}

function RegScreen2(props) {
  const token = useSelector((state) => state.auth.curruser.token);
  const profile = useSelector((state) => state.auth.curruser.profile);

  useEffect(() => {
    console.log("Use Effect Called", token);
    if (profile && profile.isEmailVerified) {
      props.setter(3);
      props.setBg((present) => !present);
    }
    // chandra();
    // loginRegister(dispatch, creds);
    // fetchUpdates(dispatch);
  }, []);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  let time = Session.get("time") - parseInt(Date.now() / 1000);
  const [minutes, setMinutes] = useState(parseInt(time / 60));
  const [seconds, setSeconds] = useState(parseInt(time % 60));
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  function handleSubmit() {
    console.log(otp.join(""));
    let otp_string = otp.join("");
    if (otp_string == "") alert("OTP is Required");
    else {
      let body = { otp: otp_string };

      verifyMailOTP(body)
        .then((res) => {
          alert("Verified");

          props.setter(3);
          props.setBg((present) => !present);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
  function ResetOtp() {
    console.log("called");
    sendVerificationMail()
      .then((res) => {
        alert("Mail Sent");
        let time = Session.get("time") - parseInt(Date.now() / 1000);
        setMinutes(parseInt(time / 60));
        setSeconds(parseInt(time % 60));
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <>
      <div className="login-form-title">Enter OTP</div>
      <div className="login-form-comments">{`A 6 digit code has been sent to ${profile.email}`}</div>
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
        {seconds > 0 || minutes > 0 ? (
          <p className="login-form-timer">
            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </p>
        ) : (
          <></>
        )}
      </div>
      {!(seconds > 0 || minutes > 0) ? (
        <div className="login-form-otp-resend">
          <div className="login-form-otp-resend-que">Didn't recieve code?</div>
          <Link className="login-form-otp-resend-link" onClick={ResetOtp}>
            Resend
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

function RegScreen3(props) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [sendOtp, setSendOtp] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [ambassadorId, setambassadorId] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.curruser.token);
  const handleChangeOtp = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  function ResetOtp() {
    let body = { phoneNumber: props.formData.mobile };
    sendMobileOTP(body)
      .then((res) => {
        alert("OTP Sent");
        setSendOtp(true);
        let time = Session.get("time") - parseInt(Date.now() / 1000);
        setMinutes(parseInt(time / 60));
        setSeconds(parseInt(time % 60));
      })
      .catch((err) => {
        alert(err);
      });
  }
  const handleSubmit = async () => {
    if (
      props.formData.name == "" ||
      props.formData.college == "" ||
      props.formData.mobile == ""
    )
      alert("Name,College Name and Mobile  are Mandatory");
    else if (sendOtp && otp.join("") == "") {
      alert("OTP is Mandataory");
    } else if (!sendOtp) {
      alert("Mobile Must be Verified");
    } else {
      console.log("Called", otp.join(""));
      console.log(ambassadorId);
      let body = {
        name: props.formData.name,
        collegeName: props.formData.college,
        otp: otp.join(""),
      };
      console.log(body);
      if (props.formData.campusAmbassador) {
        getUsersId(token, props.formData.campusAmbassador, setambassadorId)
          .then((res) => {
            console.log("Ambassador Correct", ambassadorId);
            body.refererId = props.formData.campusAmbassador;
            console.log(body);
            verifyMobileOTP(body)
              .then((res) => {
                alert("Registration Completed");
                navigate("/home");
              })
              .catch((err) => {
                alert(err);
              });
          })
          .catch((err) => {
            alert("Referer is Invalid");
            setambassadorId([]);
          });
      } else {
        verifyMobileOTP(body)
          .then((res) => {
            console.log("Registration Completed");
          })
          .catch((err) => {
            alert(err);
          });
      }

      console.log(body);
      props.setBg((present) => !present);
    }
  };

  const sendOTP = () => {
    console.log(props.formData.mobile);

    let body = { phoneNumber: props.formData.mobile };
    sendMobileOTP(body)
      .then((res) => {
        alert("OTP Sent");
        setSendOtp(true);
        let time = Session.get("time") - parseInt(Date.now() / 1000);
        setMinutes(parseInt(time / 60));
        setSeconds(parseInt(time % 60));
      })
      .catch((err) => {
        alert(err);
      });

    // if (props.formData.mobile.length) setSendOtp(true);
  };
  useEffect(() => {
    if (sendOtp) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, sendOtp]);
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
          type="text"
          value={props.formData.name}
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
          type="text"
          value={props.formData.college}
          onChange={(e) => {
            handleChange(e, props.setFormData);
          }}
        />
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label" htmlFor="college">
          Campus Ambassador
        </label>
        <input
          className="login-form-text-inputs"
          name="campusAmbassador"
          type="text"
          value={props.formData.campusAmbassador}
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
          type="tel"
          pattern="[1-9][0-9]{9}"
          value={props.formData.mobile}
          onChange={(e) => {
            handleChange(e, props.setFormData);
          }}
        />
      </div>
      {!sendOtp && (
        <div className="login-form-input-grp">
          <Link
            className="login-form-text-label login-form-otp-resend-link"
            style={{ fontSize: "0.9rem" }}
            htmlFor="mobile"
            onClick={sendOTP}
          >
            Verify Mobile
          </Link>
        </div>
      )}
      {/* <div className="login-form-bio">
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
      </div> */}
      {sendOtp ? (
        <>
          {" "}
          <div className="login-form-text-label" style={{ fontSize: "0.8rem" }}>
            Enter OTP
          </div>
          <div className="login-form-text-label">{`A 6 digit code has been sent to ${props.formData.mobile}`}</div>
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
                  onChange={(e) => handleChangeOtp(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              );
            })}
          </div>
          <div className="login-form-otp-resend">
            {seconds > 0 || minutes > 0 ? (
              <p className="login-form-timer">
                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
            ) : (
              <></>
            )}
          </div>
          {!(seconds > 0 || minutes > 0) ? (
            <div className="login-form-otp-resend">
              <div className="login-form-otp-resend-que">
                Didn't recieve code?
              </div>
              <Link className="login-form-otp-resend-link" onClick={ResetOtp}>
                Resend
              </Link>
            </div>
          ) : (
            <></>
          )}
          {/* <div className="login-form-otp-resend">
            <Link
              className="login-form-otp-resend-link"
              style={{
                fontSize: "0.9rem",
                background: "white",
              }}
              onClick={() => {}}
            >
              SUBMIT
            </Link>
          </div> */}
        </>
      ) : (
        <></>
      )}

      <div className="login-form-submit-btn" onClick={handleSubmit}>
        Submit
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
    campusAmbassador: "",
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
