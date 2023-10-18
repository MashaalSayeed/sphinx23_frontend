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

  // ////console.log(m);

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
  ////console.log(members);
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
  ////console.log(d);
   const PaymentLink= (a)=> {
    console.log("Called link")
    let l = a.filter((x) => x !== "").length;
   
    if (a.length != 0 && a.length == l ) {
      let body = {
        eventId: event._id,
        userList: a,
        tName: tName,
        receipt: `This is the Receipt for ${event.name}`,
        notes: { description: `Payment Request for ${event.name}` },
      };
      ////console.log(body.userList);
      // toastId.current = toast.loading("Processing");
      ConRef.current.setAttribute("disabled", true);
      ConRef.current.style.background = disabledCol;
      console.log("called url")
      createEventPaymentRequest(body)
        .then((res) => {
          if (res) {
            toast.info('Payment Link created');
            console.log(res)
            window.open(res.payment.paymentLink, "_blank");
          } else {
            console.log("errorr ")
            console.log(res);

         
          }

        })
        .catch((err) => {
          console.log("catch error",err)
          toast.update(toastId.current, {
            render: err,
            type: "error",
            isLoading: false,
            ...toastStyle,
          });
     
        });
    }
  }
  const getUsersId = async (email) => {
    // let userData = [];
    console.log(email);
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
          ////console.log(response, "manvir");
          ////console.log(response.id);
          return response.id;
        }
        throw response;
      })
      .catch((err) => {
        // toast.error(err, toastStyle);
       
        throw err;
      });

    //
    // .then((data) => {
    //   if (data.success) {
    //     ////console.log(data.id);
    //     ////console.log(prevState);
    //     setIds([...prevState, data.id]);
    //   }
    // })
    // .catch((error) => {
    //   alert(error);
    //   // ////console.log(error);
    // });
    // return userData;
  };
  const handleSubmit = async (e) => {
    if(e) e.preventDefault();
    ////console.log(members);
    if (maxSize > 1 && tName == "") {
      toast.error("Team Name is Mandatory", toastStyle);
      return;
    }
    let x = maxSize - members.filter((x) => x === "").length;
    if (x < minSize) {
      toast.error(`Team Size must be minimum ${minSize}`, toastStyle);
      return;
    }
    let entered_members = members.filter((x) => x !== "");
    ////console.log(entered_members);
    // let userList = [];

    let a = [];
    // ////console.log(eventCoor, "kunal");
    for (let i in entered_members) {
      try {
        let mail = entered_members[i];
        ////console.log("mail", mail);
        const id = await getUsersId(mail);

        a.push(id);
      } catch (err) 
      {
        toast.error(err, toastStyle);
        let m = parseInt(i) + 1;
        ////console.log(m);
        let mem = members;
        mem[m-1] = "";
       
        setMembers(mem);
        
        toast.error(`Team Member ${m} is not valid.`, toastStyle);
        return;
      }
    }
    // ////console.log(admin, "ip");
    setUserList(a);
    setSubmit(true);
    PaymentLink(a);
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
          placeholder={"Registered Email ID"}
          onChange={(e) => {
            ////console.log(e.target.value);
            ////console.log(props.value);
            let m = members;
            m[parseInt(props.value)] = e.target.value;
            ////console.log(m);
            setMembers(m);
            setEmail(e.target.value);
          }}
        ></input>
      </div>
    );
  };
  useEffect(()=>{
    console.log("weee")
    if(event.maxTeamSize==1)
    {
    
      handleSubmit().then(()=>{setReg(false)})
      
     
    }
  },[])
  // const event = { title: "ROBOWARS", subTitle: "FLAGSHIP EVENTS" };
  const [teamName, setTeamName] = useState("");
  return (
    <div className={styles.con} style={event.maxTeamSize==1?{display:"none"}:{}}>
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
          {/* <p><b>Note:</b> Enter Registered email of all Team Members</p> */}
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
