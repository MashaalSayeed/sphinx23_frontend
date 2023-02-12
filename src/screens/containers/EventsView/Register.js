import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./Register.module.css";
import close from "../../../images/close.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRazorpay from "react-razorpay";
// import Razorpay from "razorpay";

import { useSelector } from "react-redux";
import { createEventPaymentRequest, registerForEvent } from "../../../api";
function Register(props) {
  const Razorpay = useRazorpay();
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
  const { category, name, setReg, event } = props;
  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // };
  const minSize = event.minTeamSize,
    maxSize = event.maxTeamSize;
  const currUser = useSelector((state) => state.auth.curruser);
  const [members, setMembers] = useState(
    [...Array(maxSize)].map((x, i) => (i === 0 ? currUser.profile.email : ""))
  );
  // useEffect(() => {
  //   // let m = members;
  //   // m[0] = currUser.profile.email;
  //   // setMembers(m);
  //   loadScript("https://checkout.razorpay.com/v1/checkout.js");
  // }, []);

  // //console.log(m);

  const [c, setC] = useState([]);
  const [ids, setIds] = useState([]);
  const [userList, setUserList] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [tName, setTName] = useState("");
  const ConRef = useRef(null);
  let token = "";
  const toastId = useRef(null);
  const disabledCol = "#6e9efa";
  const btnCol = "#95FF42";
  //console.log(members);
  let a = Math.floor(maxSize / 3),
    b = maxSize % 3;
  let d = [],
    f = [],
    g = [];
  // useEffect(() => {
  //   // setC(d);
  // }, []);
  let e = 1;
  for (let i = 0; i < a; i++) {
    d.push(e);
    e += 3;
  }
  for (let i = 1; i <= b; i++) {
    f.push(a * 3 + i);
  }
  //console.log(d);
  useEffect(() => {
    let l = members.filter((x) => x !== "").length;
    if (userList.length != 0 && userList.length == l && submit) {
      let body = {
        eventId: event._id,
        userList: userList,
        tName: tName,
        receipt: `This is the Receipt for ${event.name}`,
        notes: { description: `Payment Request for ${event.name}` },
      };
      //console.log(body.userList);
      toastId.current = toast.loading("Processing");
      ConRef.current.setAttribute("disabled", true);
      ConRef.current.style.background = disabledCol;
      createEventPaymentRequest(body)
        .then((res) => {
          //console.log(res);
          if (!res.status) {
            //console.log(window.env);
            let body = {
              event: event._id,
              tName: tName,
              userList: userList,
              payment: {
                order_id: process.env.REACT_APP_FREE_ORDER_ID,
                payment_id: process.env.REACT_APP_FREE_PAYMENT_ID,
              },
            };
            //console.log(body);
            let signature = "";
            registerForEvent(signature, body)
              .then((res) => {
                //console.log(res);
                toast.update(toastId.current, {
                  render: `You have successfully registered. Your Team Id is ${res}.Remember it for your Future Reference.`,
                  type: "success",
                  isLoading: false,
                  ...toastStyle,
                });
                // props.setter(2);
                ConRef.current.removeAttribute("disabled");
                ConRef.current.style.background = btnCol;
                setSubmit(false);
                setReg(false);
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
            // //console.log(body);
          } else {
            //console.log(process.env.REACT_APP_RAZORPAY_ID);
            var options = {
              key: process.env.REACT_APP_RAZORPAY_ID,
              amount: res.order.razorpayInstance.amount,
              currency: res.order.razorpayInstance.currency,
              name: "Sphinx",
              description: `Payment Request for ${event.name}`,
              order_id: res.order.razorpayInstance.id,
              handler: function (response) {
                //console.log(response);
                let body = {
                  payment: {
                    _id: res.order._id,
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                  },
                };
                let signature = response.razorpay_signature;
                //console.log(body);
                registerForEvent(signature, body)
                  .then((res) => {
                    //console.log(res);
                    toast.update(toastId.current, {
                      render: `You have successfully registered. Your Team Id is ${res}.Remember it for your Future Reference.`,
                      type: "success",
                      isLoading: false,
                      ...toastStyle,
                    });
                    // props.setter(2);
                    ConRef.current.removeAttribute("disabled");
                    ConRef.current.style.background = btnCol;
                    setReg(false);
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
              },
              prefill: {
                //Here we are prefilling random contact
                contact: currUser.profile.phoneNumber,
                //name and email id, so while checkout
                name: currUser.profile.name,
                email: currUser.profile.email,
              },
              notes: {
                description: `Payment Request for ${event.name}`,
              },
              theme: {
                color: "#2300a3",
              },
              modal: {
                ondismiss: function () {
                  toast.update(toastId.current, {
                    render: "Payment Cancelled",
                    type: "error",
                    isLoading: false,
                    ...toastStyle,
                  });
                  ConRef.current.removeAttribute("disabled");
                  ConRef.current.style.background = btnCol;
                },
              },
            };
            //console.log(window.env);
            const razorpayObject = new Razorpay(options);
            // razorpayObject.open();

            // var razorpayObject = new Razorpay(options);
            //console.log(razorpayObject);
            razorpayObject.on("payment.failed", function (response) {
              //console.log(response);
              toast.update(toastId.current, {
                render: "Payment Failed",
                type: "error",
                isLoading: false,
                ...toastStyle,
              });
              ConRef.current.removeAttribute("disabled");
              ConRef.current.style.background = btnCol;
            });
            razorpayObject.open();
          }
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
    }
  }, [userList]);
  const getUsersId = async (email) => {
    // let userData = [];
    //console.log(process.env);
    return fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/validatemail/${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          mode: "cors",

          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          //console.log(response, "manvir");
          //console.log(response.id);
          return response.id;
        }
        throw response;
      })
      .catch((err) => {
        // toast.error(err, toastStyle);
        //console.log(err);
        throw err;
      });

    //
    // .then((data) => {
    //   if (data.success) {
    //     //console.log(data.id);
    //     //console.log(prevState);
    //     setIds([...prevState, data.id]);
    //   }
    // })
    // .catch((error) => {
    //   alert(error);
    //   // //console.log(error);
    // });
    // return userData;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(members);
    if (tName == "") {
      toast.error("Team Name is Mandatory", toastStyle);
      return;
    }
    let x = maxSize - members.filter((x) => x === "").length;
    if (x < minSize) {
      toast.error(`Team Size must be minimum ${minSize}`, toastStyle);
      return;
    }
    let entered_members = members.filter((x) => x !== "");
    //console.log(entered_members);
    // let userList = [];

    let a = [];
    // //console.log(eventCoor, "kunal");
    for (let i in entered_members) {
      try {
        let mail = entered_members[i];
        //console.log("mail", mail);
        const id = await getUsersId(mail);

        a.push(id);
      } catch (err) {
        // toast.error(err, toastStyle);
        let m = parseInt(i) + 1;
        //console.log(m);
        toast.error(`Team Member ${m} is not valid.`, toastStyle);
        return;
      }
    }
    // //console.log(admin, "ip");
    setUserList(a);
    setSubmit(true);
  };
  const InputField = (props) => {
    const [email, setEmail] = useState(props.email);
    return (
      <div className={styles.inputCon}>
        <label className={styles.inputLabel}>{props.name}</label>
        <input
          className={styles.inputField}
          disabled={props.disabled}
          value={email}
          onChange={(e) => {
            //console.log(e.target.value);
            //console.log(props.value);
            let m = members;
            m[parseInt(props.value)] = e.target.value;
            //console.log(m);
            setMembers(m);
            setEmail(e.target.value);
          }}
        ></input>
      </div>
    );
  };
  // const event = { title: "ROBOWARS", subTitle: "FLAGSHIP EVENTS" };
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
        <div className={styles.subTitle}>{category}</div>
        <div className={styles.title}>{name}</div>
        <section className={styles.formCon}>
          <div className={styles.filedsCon}>
            {" "}
            <div className={styles.inputCon}>
              <label className={styles.inputLabel}>Team Name</label>
              <input
                className={styles.inputField}
                value={tName}
                onChange={(e) => {
                  setTName(e.target.value);
                }}
              ></input>
            </div>
          </div>
          {d.map((i) => {
            return (
              <div className={styles.filedsCon}>
                {" "}
                <InputField
                  name={`TeamMember ${i}`}
                  value={i - 1}
                  disabled={i === 1 ? true : false}
                  email={members[i - 1]}
                />
                <InputField name={`TeamMember ${i + 1}`} value={i} />
                <InputField name={`TeamMember ${i + 2}`} value={i + 1} />
              </div>
            );
          })}
          <div className={styles.filedsCon}>
            {f.map((i) => {
              return (
                <InputField
                  name={`TeamMember ${i}`}
                  value={i - 1}
                  disabled={i === 1 ? true : false}
                  email={members[i - 1]}
                />
              );
            })}
          </div>
          {/* <div className={styles.filedsCon}>
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
          </div> */}
          <p>Note:Enter Registered email of all Team Members</p>
        </section>
        <button
          className="eventD-reg"
          style={{ margin: "auto" }}
          ref={ConRef}
          onClick={handleSubmit}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Register;
