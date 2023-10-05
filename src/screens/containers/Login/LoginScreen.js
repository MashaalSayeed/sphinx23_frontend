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
  sendForgotOTP,
  verifyForgotOTP,
  resetPassword,
  isValidAmbassador,
} from "../../../api";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Creatable, { useCreatable } from "react-select/creatable";
import bg1 from "./bg1.png";
import bg3 from "./bg3.png";
import bg4 from "./bg4.png";
import bg0 from "./bg0.png";
import Session from "../../../Session";
import { LeakRemoveTwoTone } from "@mui/icons-material";
import { useRef } from "react";
import HomeNav from "../Home/homeNav";
import { loginReg } from "../../../store/modules/auth/auth.action";

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
// const disabledCol = "#6e9efa";
const disabledCol = "#6ea613;";
// const btnCol = "#1968ff";
const btnCol = "#C1FF5C";

function handleChange(event, setter) {
  // ////console.log("Handle Called");
  const { name, value, type, checked } = event.target;
  ////console.log(name, value);
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
      </div>
      <div className="login-social-icon-container">
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
    ////console.log(response);
    let body = {
      email: response.profileObj.email,
      password: response.googleId,
      isRegistration: false,
    };
    ////console.log(body);
    props.setBg((present) => !present);

    loginRegister(dispatch, body)
      .then((data) => {
        ////console.log(data);
        // alert("Success");
        if (!data.profile.isEmailVerified) {
          toast.error("Please Complete Your Profile", toastStyle);
          props.toreg(false);
        } else if (!data.profile.isMobileNumberVerified) {
          toast.error("Please Complete Your Profile", toastStyle);
          props.toreg(false);
        } else {
          toast.info("Success", toastStyle);
          navigate("/dashboard");
        }
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
  }, []);
  let profile = useSelector((state) => state.auth.curruser);
  useEffect(() => {
    if (!profile) return;
    profile = profile.profile;
    if (profile && !profile.isEmailVerified) {
      props.toreg(false);
      props.setBg((present) => !present);
    }
    if (profile && profile.isEmailVerified && !profile.isMobileNumberVerified) {
      props.toreg(false);
      props.setBg((present) => !present);
    }
    if (profile && profile.isEmailVerified && profile.isMobileNumberVerified) {
      navigate("/");
    }
    //
    // chandra();
    // loginRegister(dispatch, creds);
    // fetchUpdates(dispatch);
  }, []);
  function handleSubmit(event) {
    props.setBg((present) => !present);
    formData.isRegistration = false;
    ////console.log(formData);
    event.preventDefault();
    loginRegister(dispatch, formData)
      .then((data) => {
        ////console.log(data.profile);
        if (!data.profile.isEmailVerified) {
          toast.error("Please Complete Your Profile", toastStyle);
          props.toreg(false);
        } else if (!data.profile.isMobileNumberVerified) {
          // toast.error("Please Complete Your Profile", toastStyle);
          props.toreg(false);
        } else {
          toast.info("Success", toastStyle);
          navigate("/dashboard");
        }
        // alert("Success");
      })
      .catch((err) => {
        toast.error(err, toastStyle);
      });
    // alert(`Login Successfully`);
    // navigate("/eventAdmin");
  }

  const PassRef = useRef(null);
  const LoginRef = useRef(null);
  const [forgot, setForgot] = useState(false);
  return (
    <>
      {!forgot && (
        <>
          <div className="login-form-title">Log in</div>
          <div className="login-form-signup">
            <div className="login-form-signup-que">New User?</div>
            <Link
              className="login-form-signup-link"
              style={{
                textDecoration: "underline",
              }}
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
                  ////console.log(e);
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
                  ////console.log(e);
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
              <div className="login-form-forgot-pass" onClick={setForgot}>
                Forgot Password?
              </div>
            </div>
          </div>
          <button
            className="login-form-submit-btn"
            ref={LoginRef}
            onClick={handleSubmit}
            onKeyDown={(e) => {
              ////console.log(e);
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
      )}
      {forgot && <ForgotPass />}
    </>
  );
}

function RegScreen1(props) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.curruser);
  const handleSuccess = (response) => {
    ////console.log(response);
    let body = {
      email: response.profileObj.email,
      password: response.googleId,
      isRegistration: true,
    };
    ////console.log(body);
    props.setBg((present) => !present);

    loginRegister(dispatch, body)
      .then((res) => {
        ////console.log(res);
        ////console.log("mail");
        // toast.info("Sending Mail", toastStyle);
        toastId.current = toast.loading("Sending Mail");
        ConRef.current.setAttribute("disabled", true);
        ConRef.current.style.background = disabledCol;

        sendVerificationMail()
          .then((res) => {
            // alert("Mail Sent");
            // toast.success("Mail Sent", toastStyle);
            toast.update(toastId.current, {
              render: "Mail Sent",
              type: "success",
              isLoading: false,
              ...toastStyle,
            });
            props.setter(2);
            ConRef.current.removeAttribute("disabled");
            ConRef.current.style.background = btnCol;
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
            ConRef.current.style.background = btnCol;
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
    ////console.log("Use Effect Called", user);
    if (user && !user.profile.isEmailVerified) {
      ////console.log("mail");
      // toast.info("Sending Mail", toastStyle);
      toastId.current = toast.loading("Sending Mail");
      ConRef.current.setAttribute("disabled", true);
      ConRef.current.style.background = disabledCol;
      sendVerificationMail()
        .then((res) => {
          toast.update(toastId.current, {
            render: "Mail Sent",
            type: "success",
            isLoading: false,
            ...toastStyle,
          });
          ConRef.current.removeAttribute("disabled");
          ConRef.current.style.background = btnCol;
          props.setter(2);
          props.setBg((present) => !present);
        })
        .catch((err) => {
          // toast.error(err, toastStyle);
          ConRef.current.removeAttribute("disabled");
          ConRef.current.style.background = btnCol;
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
      ////console.log("Called");
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
      ////console.log("Called");
      toast.info("Already Logged In", toastStyle);
      // alert("Already Logged In");
      navigate("/");
    }
    function start() {
      // gapi.client.init({
      //   clientId: clientId,
      //   scope: "",
      // });
    }
    gapi.load("client:auth2", start);
    // chandra();
    // loginRegister(dispatch, creds);
    // fetchUpdates(dispatch);
  }, []);
  const toastId = useRef(null);

  const handleSubmit = async () => {
    ////console.log("Called", props.formData);
    props.formData.isRegistration = true;

    loginRegister(dispatch, props.formData)
      .then((res) => {
        ////console.log(res);
        // toast.info("Sending Mail", toastStyle);
        toastId.current = toast.loading("Sending Mail");
        ConRef.current.setAttribute("disabled", true);
        ConRef.current.style.background = disabledCol;
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
            ConRef.current.style.background = btnCol;
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
            ConRef.current.style.background = btnCol;
          });
      })
      .catch((err) => {
        // toast.error(err, toastStyle);
        toast.error(err, toastStyle);
        ConRef.current.style.background = btnCol;
        ConRef.current.removeAttribute("disabled");
      });
  };
  const PassRef = useRef(null);
  const ConRef = useRef(null);

  return (
    <>
      <div className="login-form-title">Create an Account</div>
      <div className="login-form-sub-title">Sign-up with email</div>
      <div className="login-form-signup">
        <div className="login-form-signup-que">Already have an account?</div>
        <Link
          className="login-form-signup-link"
          style={{ textDecoration: "underline" }}
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
              ////console.log(e);
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
              ////console.log(e);
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
      <Seprator />
      <SocialIcons
        handleSuccess={handleSuccess}
        handleFailure={handleFailure}
        isRegistration={true}
      />
    </>
  );
}

function RegScreen2(props) {
  const token = useSelector((state) => state.auth.curruser.token);
  const profile = useSelector((state) => state.auth.curruser.profile);

  useEffect(() => {
    ////console.log("Use Effect Called", token);
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
    ////console.log(element.previousSibling);
    ////console.log("delete");
    if (element.previousSibling) {
      ////console.log("delete");
      element.previousSibling.focus();
    }
  };
  const conRef = useRef(null);
  function handleSubmit() {
    ////console.log(otp.join(""));
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
    ////console.log("called");
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
      <div className="login-form-otp-resend" style={{ color: "white" }}>
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
        <div className="login-form-otp-resend" style={{ color: "white" }}>
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
    ////console.log(element.previousSibling);
    ////console.log("delete");
    if (element.previousSibling) {
      ////console.log("delete");
      element.previousSibling.focus();
    }
  };
  function ResetOtp() {
    let body = {
      phoneNumber: props.formData.mobile,
    };
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
  const submitRef = useRef(null);
  const user = useSelector((state) => state.auth.curruser);
  // //console.log(user)

  const dispact = useDispatch();
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
      ////console.log("Called", otp.join(""));
      ////console.log(ambassadorId);
      let body = {
        name: props.formData.name,
        collegeName: props.formData.college,
        otp: otp.join(""),
      };
      ////console.log(body);
      if (props.formData.campusAmbassador) {
        isValidAmbassador(
          token,
          props.formData.campusAmbassador,
          setambassadorId
        );
        isValidAmbassador(
          token,
          props.formData.campusAmbassador,
          setambassadorId
        )
          .then((res) => {
            ////console.log("Ambassador Correct", ambassadorId);
            // if(!res.isAmbassador)
            body.refererId = props.formData.campusAmbassador;
            ////console.log(body);
            verifyMobileOTP(body)
              .then((res) => {
                // alert("Registration Completed");

                // const profile= { ...user, profile: res.profile }
                // Session.setObject("profile", profile);
                // //console.log(profile)

                // dispact(loginReg(profile))
                toast.info("Registration Completed", toastStyle);
                navigate("/");
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
            // alert("Registration Completed");
            //console.log("complete")
            // const profile= { ...user, profile: res.profile }
            // Session.setObject("profile", profile);

            // //console.log(profile)
            // dispact(loginReg(profile))
            toast.info("Registration Completed", toastStyle);
            //console.log("calledNavigate")
            navigate("/");

            // //console.log(profile)

            // navigate("/dashboard");
          })
          .catch((err) => {
            toast.error(err, toastStyle);
          });
      }

      ////console.log(body);
      props.setBg((present) => !present);
    }
  };
  const toastId = useRef(null);
  const sendOTP = () => {
    ////console.log(props.formData.mobile);
    if (props.formData.mobile.length != 10) {
      toast.info("Mobile No. must be of length 10.", toastStyle);
      return;
    }

    toastId.current = toast.loading("Sending OTP");
    let body = {
      phoneNumber: props.formData.mobile,
    };
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
        setSendOtp(false);
        let time = Session.get("time") - parseInt(Date.now() / 1000);
        setMinutes(parseInt(time / 60));
        setSeconds(parseInt(time % 60));
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
    if (!sendOtp) submitRef.current.style.background = "#1a686f";
    if (sendOtp) {
      submitRef.current.style.background = btnCol;
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
  const colleges = [
    {
      value: "mnit",
      label: "Malviya National Institute of Technology, Jaipur",
    },
    {
      value: "bits",
      label: "Birla Institute of Technology, Pilani",
    },
    {
      value: "muj",
      label: "Manipal University Jaipur",
    },
    {
      value: "uor",
      label: "University of Rajasthan",
    },
    {
      value: "jnu",
      label: "Jaipur National University",
    },
    {
      value: "iitd",
      label: "Indian Institute of Technology, Delhi",
    },
    {
      value: "iitb",
      label: "Indian Institute of Technology, Bombay",
    },
    {
      value: "iitj",
      label: "Indian Institute of Technology, Jodhpur",
    },
    {
      value: "mnnit",
      label: "Motilal Nehru National Institute of Technology, Allahabad",
    },
    {
      value: "mc",
      label: "Maharaja College, Jaipur",
    },
    {
      value: "jecrc",
      label: "Jaipur Engineering College and Research Centre",
    },
    {
      value: "pu",
      label: "Poornima University, Jaipur",
    },
    {
      value: "auj",
      label: "Amity University, Jaipur",
    },
  ].sort((a, b) => {
    let one = a.label.toLowerCase();
    let sec = b.label.toLowerCase();
    return one < sec ? -1 : one > sec ? 1 : 0;
  });
  // useEffect(() => {
  //   //console.log(
  //     "college: ",
  //     props.formData.college
  //   );
  // }, [props.formData.college]);
  const handleCollegeName = (obj) => {
    props.setFormData((prevFormData) => ({
      ...prevFormData,
      college: obj.label,
    }));
  };
  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "black",
      height: "100%",
    }),
  };
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
            ////console.log(e);
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
        <div
          style={{
            width: "100%",
            height: "2rem",
            marginBottom: "8px",
          }}
        >
          <Creatable
            //value={props.formData.college}
            options={colleges}
            onChange={(value) => handleCollegeName(value)}
            styles={selectStyles}
            placeholder="Enter..."
            required={true}
          />
        </div>
        {/* <input
          ref={clgRef}
          className="login-form-text-inputs"
          name="college"
          type="text"
          value={props.formData.college}
          onChange={(e) => {
            handleChange(e, props.setFormData);
          }}
          onKeyDown={(e) => {
            ////console.log(e);
            if (e.key === "Enter") ambRef.current.focus();
          }}
        /> */}
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label" htmlFor="college">
          Referrer ID
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
            ////console.log(e);
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
            ////console.log(e);
            if (e.key === "Enter") verifyRef.current.click();
          }}
        />
      </div>
      {/* {!sendOtp && (
        <div className="login-form-input-grp">
          <Link
            className="login-form-text-label login-form-otp-resend-link"
            style={{ fontSize: "0.9rem" ,backgroundColor:"#C1FF5C",padding:"10px",color:"black",boxShadow:"white",borderRadius:"5px" }}
            htmlFor="mobile"
            onClick={() => {
              sendOTP();
            }} // call send otp
            ref={verifyRef}
          >
            Verify Mobile
          </Link>
        </div>
      )} */}
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
                  style={{ marginTop: "5px" }}
                  inputMode="numeric"
                  name="otp"
                  type="tel"
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
        </>
      ) : (
        <></>
      )}
      {!sendOtp && (
        <Link
          className="login-form-submit-btn"
          disabled={!sendOtp}
          style={
            !sendOtp
              ? {
                  background: btnCol,
                  textDecoration: "none",
                  textAlign: "center",
                }
              : { background: btnCol }
          }
          onClick={sendOTP} // call send otp
          ref={verifyRef}
        >
          Verify Mobile
        </Link>
      )}

      <button
        className="login-form-submit-btn"
        disabled={!sendOtp}
        style={
          !sendOtp
            ? { background: disabledCol, display: "none" }
            : { background: btnCol }
        }
        ref={submitRef}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}

function ForgotPass() {
  const [sent, setSent] = useState(false);
  const [userId, setUserId] = useState([]);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const ConRef = useRef(null);
  let token = "";
  const toastId = useRef(null);
  const sendOTP = () => {
    getUsersId(token, email, setUserId)
      .then((res) => {
        toastId.current = toast.loading("Sending Mail");
        ConRef.current.setAttribute("disabled", true);
        ConRef.current.style.background = disabledCol;
        setId(res);
        let body = { id: res };
        ////console.log("Body", body);
        sendForgotOTP(body)
          .then((resp) => {
            ////console.log(resp);
            toast.update(toastId.current, {
              render: "Mail Sent",
              type: "success",
              isLoading: false,
              ...toastStyle,
            });
            // props.setter(2);
            ConRef.current.removeAttribute("disabled");
            ConRef.current.style.background = btnCol;
            let time = resp - parseInt(Date.now() / 1000);
            setMinutes(parseInt(time / 60));
            setSeconds(parseInt(time % 60));
            setSent(true);
          })
          .catch((err) => {
            toast.update(toastId.current, {
              render: err,
              type: "error",
              isLoading: false,
              ...toastStyle,
            });
            ConRef.current.removeAttribute("disabled");
            ConRef.current.style.background = btnCol;
          });
      })
      .catch((err) => {
        toast.error(err, toastStyle);
        ConRef.current.removeAttribute("disabled");
        ConRef.current.style.background = btnCol;
      });
    // setSent(true);
  };
  const resendOTP = () => {
    let body = { id: id };
    toastId.current = toast.loading("Sending Mail");
    setOtp(new Array(6).fill(""));
    sendForgotOTP(body)
      .then((resp) => {
        ////console.log(resp);
        toast.update(toastId.current, {
          render: "Mail Sent",
          type: "success",
          isLoading: false,
          ...toastStyle,
        });
        let time = resp - parseInt(Date.now() / 1000);
        setMinutes(parseInt(time / 60));
        setSeconds(parseInt(time % 60));
        setSent(true);
      })
      .catch((err) => {
        toast.error(err, toastStyle);
      });
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [password, setPassword] = useState("");
  // let time = Session.get("time") - parseInt(Date.now() / 1000);
  const [secret, setSecret] = useState("");
  const handleChangeOtp = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.value == "") return false;

    if (element.nextSibling) {
      element.nextSibling.focus();
    } else {
      if (conRef.current) conRef.current.focus();
    }
  };
  const handleOTPVerify = () => {
    let body = { id: id, otp: otp.join("") };
    // //console.log(body);
    verifyForgotOTP(body)
      .then((res) => {
        // //console.log(res);
        toast.info("Verified", toastStyle);
        setSecret(res);
        setVerify(true);
      })
      .catch((err) => {
        ////console.log(err);
        toast.error(err, toastStyle);
      });
  };
  const handleResetPassword = () => {
    ////console.log(secret, password);
    let body = {
      secret: secret,
      password: password,
      id: id,
    };
    resetPassword(body)
      .then((res) => {
        ////console.log(res);
        toast.info(res, toastStyle);
        window.location.href = "/";
      })
      .catch((err) => {
        toast.error(err, toastStyle);
      });
  };
  const handleBackChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
    ////console.log(element.previousSibling);
    ////console.log("delete");
    if (element.previousSibling) {
      ////console.log("delete");
      element.previousSibling.focus();
    }
  };
  useEffect(() => {
    if (sent) {
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
  }, [seconds, sent]);
  const conRef = useRef(null);
  const [verified, setVerify] = useState(false);
  return (
    <>
      <div className="login-form-title">Recover Password</div>
      {!sent && (
        <div className="login-form-input-grp">
          <label className="login-form-text-label" htmlFor="name">
            Email
          </label>
          <input
            className="login-form-text-inputs"
            name="email"
            autoFocus
            type="text"
            required={true}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      )}

      {sent && !verified ? (
        <>
          {" "}
          <div className="login-form-text-label" style={{ fontSize: "0.8rem" }}>
            Enter OTP
          </div>
          <div className="login-form-text-label">{`A 6 digit code has been sent to ${email}`}</div>
          <div className="login-form-otp-row">
            {otp.map((data, index) => {
              return (
                <input
                  id="standard-basic"
                  variant="standard"
                  className="login-form-otp-cell"
                  name="otp"
                  type="tel"
                  key={index}
                  inputmode="numeric"
                  value={data}
                  maxLength="1"
                  style={{ width: "2rem" }}
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
              <Link className="login-form-otp-resend-link" onClick={resendOTP}>
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
      {!sent && (
        <button
          className="login-form-submit-btn"
          // disabled={!sendOtp}
          ref={ConRef}
          onClick={sendOTP}
        >
          Send OTP
        </button>
      )}
      {verified && (
        <div className="login-form-input-grp">
          <label className="login-form-text-label" htmlFor="password">
            New Password
          </label>
          <input
            className="login-form-text-inputs"
            name="password"
            type={"password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              ////console.log(e);
              if (e.key === "Enter") conRef.current.focus();
            }}
          />
        </div>
      )}
      {sent && !verified && (
        <button
          className="login-form-submit-btn"
          // disabled={!sendOtp}
          onClick={handleOTPVerify}
        >
          Verify
        </button>
      )}
      {sent && verified && (
        <button
          className="login-form-submit-btn"
          // disabled={!sendOtp}
          onClick={handleResetPassword}
        >
          Change Password
        </button>
      )}
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
  const arr = [bg0, bg1, bg3, bg4];
  const [currentTab, setCurrentTab] = useState("Description");
  const [currTab, setCurrTab] = useState("");
  const Tabs = ["Home", "Events", "Profile"];

  return (
    <div
      className="login-container"
      id="bgChange"
      style={{
        backgroundImage: `url(${arr[parseInt(Math.random() * 4)]})`,
      }}
    >
      <HomeNav
        setCurrTab={setCurrTab}
        currTab={currTab}
        Tabs={Tabs}
        notanimation={true}
        landing={false}
        setLand={() => {}}
      />
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
                // <ForgotPass />
                <Login toreg={setRegistered} setBg={setBg} />
              ) : (
                // <ForgotPass />
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
