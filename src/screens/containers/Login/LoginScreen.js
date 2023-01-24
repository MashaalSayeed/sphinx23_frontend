import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Loginscreen.css";
import apple from "./Apple.png";
import google from "./Google.png";
import fb from "./Facebook.png";
import sphinxLogo from "./sphinxLogo.png";
import Fest from "./Group16.png";
import axios from "axios";
import Institute from "./Group12.png";
import { gapi } from "gapi-script";
import {
  loginRegister,
  sendVerificationMail,
  verifyMailOTP,
  sendMobileOTP,
  getUsersId,
  verifyMobileOTP,
} from "../../../api";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import bg1 from "./bg1.png";
import bg2 from "./bg2.png";
import bg3 from "./bg3.png";
import bg4 from "./bg4.png";
import bg0 from "./bg0.png";
import Session from "../../../Session";
import { LeakRemoveTwoTone } from "@mui/icons-material";
import { useRef } from "react";

const toastStyle = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

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

function SocialIcons({ handleSuccess, handleFailure, isRegistration }) {
  return (
    <div className="login-social-icons-row">
      {/* <div className="login-social-icon-container" onClick={handleGoogleLogin}>
        <img
          className="login-social-icons"
          src={google}
          style={{ scale: "1.50" }}
        />
      </div> */}
      {/* <div className="login-social-icon-container">
        <img className="login-social-icons" src={apple} />
      </div>
      <div className="login-social-icon-container">
        <img className="login-social-icons" src={fb} />
      </div> */}

      <GoogleLogin
        clientId="253528649688-tps0nfasvoejaetbbk429hmukssg9h9v.apps.googleusercontent.com"
        buttonText={isRegistration ? "Signup with Google" : "Login with Google"}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
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

  const handleSuccess = (response) => {
    console.log(response);
    let body = {
      email: response.profileObj.email,
      password: response.googleId,
      isRegistration: false,
    };
    console.log(body);
    props.setBg((present) => !present);

    loginRegister(dispatch, body)
      .then((data) => {
        console.log(data);
        // alert("Success");
        toast.info("Success", toastStyle);
      })
      .catch((err) => {
        // toast.error(err, toastStyle);
        toast.error(err, toastStyle);
      });
  };
  const handleFailure = (err) => {
    toast.error(err, toastStyle);
    // toast.error(err, toastStyle);
  };
  const navigate = useNavigate();
  const clientId =
    "253528649688-tps0nfasvoejaetbbk429hmukssg9h9v.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
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
        // alert("Success");
        toast.info("Success", toastStyle);
      })
      .catch((err) => {
        toast.error(err, toastStyle);
      });
    // alert(`Login Successfully`);
    // navigate("/eventAdmin");
  }
  const PassRef = useRef(null);
  const LoginRef = useRef(null);
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
            autoFocus
            className="login-form-text-inputs"
            name="email"
            type="email"
            onKeyDown={(e) => {
              console.log(e);
              if (e.key === "Enter") PassRef.current.focus();
            }}
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
            ref={PassRef}
            className="login-form-text-inputs"
            name="password"
            type={"password"}
            value={formData.password}
            onChange={(e) => {
              handleChange(e, setFormData);
            }}
            onKeyDown={(e) => {
              console.log(e);
              if (e.key === "Enter") LoginRef.current.focus();
            }}
          />
        </div>
        <div className="login-form-side-options">
          <div className="login-form-side-options-check">
            {/* <input
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
            </label> */}
          </div>
          <Link className="login-form-forgot-pass">Forgot Password?</Link>
        </div>
      </div>
      <button
        className="login-form-submit-btn"
        ref={LoginRef}
        onClick={handleSubmit}
        onKeyDown={(e) => {
          console.log(e);
          if (e.key === "Enter") handleSubmit();
        }}
      >
        Login
      </button>
      <Seprator />
      <SocialIcons
        handleSuccess={handleSuccess}
        handleFailure={handleFailure}
        isRegistration={false}
      />
    </>
  );
}

function RegScreen1(props) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.curruser);
  const handleSuccess = (response) => {
    console.log(response);
    let body = {
      email: response.profileObj.email,
      password: response.googleId,
      isRegistration: true,
    };
    console.log(body);
    props.setBg((present) => !present);

    loginRegister(dispatch, body)
      .then((res) => {
        console.log(res);
        console.log("mail");
        // toast.info("Sending Mail", toastStyle);
        toastId.current = toast.loading("Sending Mail");
        ConRef.current.setAttribute("disabled", true);

        sendVerificationMail()
          .then((res) => {
            // alert("Mail Sent");
            // toast.success("Mail Sent", toastStyle);
            toast.update(toastId.current, {
              render: "Mail Sent",
              type: "success",
              isLoading: false,
            });
            props.setter(2);
            ConRef.current.removeAttribute("disabled");
            props.setBg((present) => !present);
          })
          .catch((err) => {
            toast.error(err, toastStyle);
            toast.update(toastId.current, {
              render: err,
              type: "error",
              isLoading: false,
            });
            ConRef.current.removeAttribute("disabled");
            // toast.error(err, toastStyle);
          });
      })
      .catch((err) => {
        // toast.error(err, toastStyle);
        toast.error(err, toastStyle);
      });
  };
  const handleFailure = (err) => {
    toast.error(err, toastStyle);
    // toast.error(err, toastStyle);
  };
  const styleToast = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const navigate = useNavigate();
  const clientId =
    "253528649688-tps0nfasvoejaetbbk429hmukssg9h9v.apps.googleusercontent.com";

  useEffect(() => {
    console.log("Use Effect Called", user);
    if (user && !user.profile.isEmailVerified) {
      console.log("mail");
      // toast.info("Sending Mail", toastStyle);
      toastId.current = toast.loading("Sending Mail");
      ConRef.current.setAttribute("disabled", true);
      sendVerificationMail()
        .then((res) => {
          toast.update(toastId.current, {
            render: "Mail Sent",
            type: "success",
            isLoading: false,
            ...toastStyle,
          });
          ConRef.current.removeAttribute("disabled");
          props.setter(2);
          props.setBg((present) => !present);
        })
        .catch((err) => {
          // toast.error(err, toastStyle);
          ConRef.current.removeAttribute("disabled");
          // toast.error(err, toastStyle);
          toast.update(toastId.current, {
            render: err,
            type: "error",
            isLoading: false,
            ...toastStyle,
          });
        });
    }
    if (
      user &&
      user.profile.isEmailVerified &&
      !user.profile.isMobileNumberVerified
    ) {
      console.log("Called");
      toast.info("Profile is not complete.", toastStyle);
      // alert("Profile is not complete.");
      props.setter(3);
      props.setBg((present) => !present);
    }
    if (
      user &&
      user.profile.isEmailVerified &&
      user.profile.isMobileNumberVerified
    ) {
      console.log("Called");
      toast.info("Already Logged In", toastStyle);
      // alert("Already Logged In");
      navigate("/home");
    }
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
    // chandra();
    // loginRegister(dispatch, creds);
    // fetchUpdates(dispatch);
  }, []);
  const toastId = useRef(null);

  const handleSubmit = async () => {
    console.log("Called", props.formData);
    props.formData.isRegistration = true;

    loginRegister(dispatch, props.formData)
      .then((res) => {
        console.log(res);
        // toast.info("Sending Mail", toastStyle);
        toastId.current = toast.loading("Sending Mail");
        ConRef.current.setAttribute("disabled", true);
        sendVerificationMail()
          .then((res) => {
            // alert("Mail Sent");
            toast.update(toastId.current, {
              render: "Mail Sent",
              type: "success",
              isLoading: false,
              ...toastStyle,
            });
            // toast.success("Mail Sent", {
            //   position: "top-right",
            //   autoClose: 3000,
            //   hideProgressBar: true,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "dark",
            // });
            props.setter(2);
            ConRef.current.removeAttribute("disabled");
            props.setBg((present) => !present);
          })
          .catch((err) => {
            // toast.error(err, toastStyle);
            // toast.error(err, toastStyle);
            toast.update(toastId.current, {
              render: err,
              type: "error",
              isLoading: false,
              ...toastStyle,
            });
            ConRef.current.removeAttribute("disabled");
          });
      })
      .catch((err) => {
        // toast.error(err, toastStyle);
        toast.error(err, toastStyle);
        ConRef.current.removeAttribute("disabled");
      });
  };
  const PassRef = useRef(null);
  const ConRef = useRef(null);

  return (
    <>
      <div className="login-form-title">Create an Account</div>
      <SocialIcons
        handleSuccess={handleSuccess}
        handleFailure={handleFailure}
        isRegistration={true}
      />
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
            autoFocus
            type="email"
            value={props.formData.email}
            onKeyDown={(e) => {
              console.log(e);
              if (e.key === "Enter") PassRef.current.focus();
            }}
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
            ref={PassRef}
            className="login-form-text-inputs"
            name="password"
            type={"password"}
            value={props.formData.password}
            onChange={(e) => {
              handleChange(e, props.setFormData);
            }}
            onKeyDown={(e) => {
              console.log(e);
              if (e.key === "Enter") ConRef.current.focus();
            }}
          />
        </div>
      </div>
      <button
        ref={ConRef}
        className="login-form-submit-btn"
        onClick={handleSubmit}
      >
        Continue
      </button>
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
    if (element.value == "") return false;

    if (element.nextSibling) {
      element.nextSibling.focus();
    } else {
      conRef.current.focus();
    }
  };
  const handleBackChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
    console.log(element.previousSibling);
    console.log("delete");
    if (element.previousSibling) {
      console.log("delete");
      element.previousSibling.focus();
    }
  };
  const conRef = useRef(null);
  function handleSubmit() {
    console.log(otp.join(""));
    let otp_string = otp.join("");
    if (otp_string == "") toast.info("OTP is Required", toastStyle);
    else {
      let body = { otp: otp_string };

      verifyMailOTP(body)
        .then((res) => {
          // alert("Verified");
          toast.info("Verified", toastStyle);
          props.setter(3);
          props.setBg((present) => !present);
        })
        .catch((err) => {
          toast.error(err, toastStyle);
          // toast.error(err, toastStyle);
        });
    }
  }
  function ResetOtp() {
    console.log("called");
    sendVerificationMail()
      .then((res) => {
        // alert("Mail Sent");
        toast.info("Mail Sent", toastStyle);
        setOtp(new Array(6).fill(""));
        let time = Session.get("time") - parseInt(Date.now() / 1000);
        setMinutes(parseInt(time / 60));
        setSeconds(parseInt(time % 60));
      })
      .catch((err) => {
        toast.error(err, toastStyle);
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
              onKeyDown={(e) => {
                if (e.key === "Backspace" || e.key === "Delete")
                  handleBackChange(e.target, index);
              }}
            />
          );
        })}
      </div>

      <button
        className="login-form-submit-btn"
        onClick={handleSubmit}
        ref={conRef}
      >
        Continue
      </button>
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
  const verifyRef = useRef(null);
  const clgRef = useRef(null);
  const ambRef = useRef(null);
  const mobRef = useRef(null);

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.curruser.token);
  const handleChangeOtp = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.value == "") return false;
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleBackChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
    console.log(element.previousSibling);
    console.log("delete");
    if (element.previousSibling) {
      console.log("delete");
      element.previousSibling.focus();
    }
  };
  function ResetOtp() {
    let body = { phoneNumber: props.formData.mobile };
    toastId.current = toast.loading("Sending OTP");
    sendMobileOTP(body)
      .then((res) => {
        // alert("OTP Sent");
        // toast.info("OTP Sent", toastStyle);
        // setSendOtp(true);
        toast.update(toastId.current, {
          render: "OTP Sent",
          type: "success",
          isLoading: false,
          ...toastStyle,
        });
        setOtp(new Array(6).fill(""));
        let time = Session.get("time") - parseInt(Date.now() / 1000);
        setMinutes(parseInt(time / 60));
        setSeconds(parseInt(time % 60));
      })
      .catch((err) => {
        // toast.error(err, toastStyle);
        toast.update(toastId.current, {
          render: err,
          type: "error",
          isLoading: false,
          ...toastStyle,
        });
      });
  }
  const handleSubmit = async () => {
    if (props.formData.name == "") toast.info("Name Required", toastStyle);
    else if (props.formData.college == "")
      toast.info("College Required", toastStyle);
    else if (props.formData.mobile == "")
      toast.info("Mobile No. Required", toastStyle);
    else if (sendOtp && otp.join("") == "") {
      toast.info("OTP is Mandataory", toastStyle);
      // alert("OTP is Mandataory");
    } else if (!sendOtp) {
      toast.info("Mobile Must be Verified", toastStyle);
      // alert("Mobile Must be Verified");
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
                toast.info("Registration Completed", toastStyle);
                // alert("Registration Completed");
                navigate("/home");
              })
              .catch((err) => {
                toast.error(err, toastStyle);
              });
          })
          .catch((err) => {
            toast.info("Referer is Invalid", toastStyle);
            // alert("Referer is Invalid");
            setambassadorId([]);
          });
      } else {
        verifyMobileOTP(body)
          .then((res) => {
            toast.info("Registration Completed", toastStyle);
            // alert("Registration Completed");
            navigate("/home");
          })
          .catch((err) => {
            toast.error(err, toastStyle);
          });
      }

      console.log(body);
      props.setBg((present) => !present);
    }
  };
  const toastId = useRef(null);
  const sendOTP = () => {
    console.log(props.formData.mobile);
    toastId.current = toast.loading("Sending OTP");
    let body = { phoneNumber: props.formData.mobile };
    sendMobileOTP(body)
      .then((res) => {
        toast.update(toastId.current, {
          render: "OTP Sent",
          type: "success",
          isLoading: false,
          ...toastStyle,
        });
        // toast.info("OTP Sent", toastStyle);
        // alert("OTP Sent");
        setSendOtp(true);
        let time = Session.get("time") - parseInt(Date.now() / 1000);
        setMinutes(parseInt(time / 60));
        setSeconds(parseInt(time % 60));
      })
      .catch((err) => {
        toast.update(toastId.current, {
          render: err,
          type: "error",
          isLoading: false,
          ...toastStyle,
        });
        // toast.error(err, toastStyle);
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
          Name *
        </label>
        <input
          className="login-form-text-inputs"
          name="name"
          onKeyDown={(e) => {
            console.log(e);
            if (e.key === "Enter") clgRef.current.focus();
          }}
          autoFocus
          type="text"
          value={props.formData.name}
          onChange={(e) => {
            handleChange(e, props.setFormData);
          }}
          required={true}
        />
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label" htmlFor="college">
          College *
        </label>
        <input
          ref={clgRef}
          className="login-form-text-inputs"
          name="college"
          type="text"
          value={props.formData.college}
          onChange={(e) => {
            handleChange(e, props.setFormData);
          }}
          onKeyDown={(e) => {
            console.log(e);
            if (e.key === "Enter") ambRef.current.focus();
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
          ref={ambRef}
          value={props.formData.campusAmbassador}
          onChange={(e) => {
            handleChange(e, props.setFormData);
          }}
          onKeyDown={(e) => {
            console.log(e);
            if (e.key === "Enter") mobRef.current.focus();
          }}
        />
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label" htmlFor="mobile">
          Mobile *
        </label>
        <input
          className="login-form-text-inputs"
          name="mobile"
          ref={mobRef}
          type="tel"
          pattern="[1-9][0-9]{9}"
          value={props.formData.mobile}
          onChange={(e) => {
            handleChange(e, props.setFormData);
          }}
          onKeyDown={(e) => {
            console.log(e);
            if (e.key === "Enter") verifyRef.current.click();
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
            ref={verifyRef}
          >
            Verify Mobile
          </Link>
        </div>
      )}
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
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" || e.key === "Delete")
                      handleBackChange(e.target, index);
                  }}
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

      <button
        className="login-form-submit-btn"
        disabled={!sendOtp}
        onClick={handleSubmit}
      >
        Submit
      </button>
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
  const arr = [bg0, bg1, bg2, bg3, bg4];

  return (
    <div
      className="login-container"
      id="bgChange"
      style={{ backgroundImage: `url(${arr[parseInt(Math.random() * 5)]})` }}
    >
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

// https://accounts.google.com/o/oauth2/v2/auth?
//  scope=https://www.googleapis.com/auth/drive.metadata.readonly&
//  include_granted_scopes=true&
//  response_type=token&
//  redirect_uri=http://localhost:3000/&
//  client_id=253528649688-tps0nfasvoejaetbbk429hmukssg9h9v.apps.googleusercontent.com
