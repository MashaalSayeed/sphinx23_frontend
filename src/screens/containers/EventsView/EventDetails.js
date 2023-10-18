import React from "react";
import { useState, useEffect, useRef } from "react";
import eventsImg from "../../../images/event1.png";
import Register from "./Register";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRazorpay from "react-razorpay";

// import Razorpay from "razorpay";
import { createEventPaymentRequest, registerForEvent } from "../../../api";
function Description({ card }) {
  const Razorpay = useRazorpay();
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

  // useEffect(() => {
  //   loadScript("https://checkout.razorpay.com/v1/checkout.js");
  // });

  let date = new Date(card.from);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const ConRef = useRef(null);
  let token = "";
  const toastId = useRef(null);
  const disabledCol = "#6e9efa";
  const btnCol = "#95FF42";

  // const card = {
  //   title: "ROBO WAR",
  //   img: eventsImg,
  //   price: "2000",
  //   date: "22-07-23",
  //   venue: "VLTC",
  //   col: "#FF4B4B",
  //   desc: "Lorem ipsum dolor sit amet consectetur. Odio vitae ac donec aliquam. Amet dictum scelerisque velit libero donec purus amet consectetur molestie. Lectus morbi imperdiet convallis porttitor. Leo justo mi consequat rhoncus sociis consectetur. Nunc rhoncus et sed duis turpis rutrum tristique. Dui habitant senectus tempus tristique morbi varius. Aliquet porttitor elementum scelerisque amet senectus adipiscing in eu. Auctor nibh turpis et elit dictumst. Molestie sit praesent et nunc nulla etiam id risus lacinia. Ut adipiscing mi rhoncus tincidunt suscipit lectus adipiscing aliquet sit. Integer felis felis sollicitudin elementum malesuada rhoncus purus id sollicitudin. Lorem ipsum dolor sit amet consectetur. Odio vitae ac donec aliquam. Amet dictum scelerisque velit libero donec purus amet consectetur molestie. Lectus morbi imperdiet convallis porttitor. Leo justo mi consequat rhoncus sociis consectetur. Nunc rhoncus et sed duis turpis rutrum tristique. Dui habitant senectus tempus tristique morbi varius. Aliquet porttitor elementum scelerisque amet senectus adipiscing in eu. Auctor nibh turpis et elit dictumst. Molestie sit praesent et nunc nulla etiam id risus lacinia. Ut adipiscing mi rhoncus tincidunt suscipit lectus adipiscing aliquet sit. Integer felis felis sollicitudin elementum malesuada rhoncus purus id sollicitudin",
  //   qr: "",
  //   time: "12:30",
  //   date: "29-03-10",
  // };
  const [regState, setReg] = useState(false);
  const [razorpayObject, setRazorPay] = useState();
  const currUser = useSelector((state) => state.auth.curruser);
  const handleRegister = () => {
    if (card.redirectUrl != null && card.redirectUrl != "") {
      window.open(card.redirectUrl, "_blank");
    } else {
      toast.info("Registrations will be Live Soon. Stay Tuned.");
    }
    return;
    if (!currUser) {
      toast.error("You need to Login First", toastStyle);
      window.location.href = "/login";
      return;
    }
    if (card.maxTeamSize == 1) {
      toastId.current = toast.loading("Processing");
      ConRef.current.setAttribute("disabled", true);
      ConRef.current.style.background = disabledCol;
      let userList = [];
      userList.push(currUser.profile._id);
      let body = {
        eventId: card._id,
        userList: userList,
        tName: "Not Applicable",
        receipt: `This is the Receipt for ${card.name}`,
        notes: { description: `Payment Request for ${card.name}` },
      };
      createEventPaymentRequest(body)
        .then((res) => {
          ////console.log(res);
          if (!res.status) {
            ////console.log(window.env);
            let body = {
              event: card._id,
              tName: "Not Applicable",
              userList: userList,
              payment: {
                order_id: process.env.REACT_APP_FREE_ORDER_ID,
                payment_id: process.env.REACT_APP_FREE_PAYMENT_ID,
              },
            };
            let signature = "";
            registerForEvent(signature, body)
              .then((res) => {
                ////console.log(res);
                toast.update(toastId.current, {
                  render: `You have successfully registered. Your Team Id is ${res}.Remember it for your Future Reference.`,
                  type: "success",
                  isLoading: false,
                  ...toastStyle,
                });
                // props.setter(2);
                ConRef.current.removeAttribute("disabled");
                ConRef.current.style.background = btnCol;
                // alert(
                //   `You have successfully registered. Your Team Id is ${res}.Remember it for your Future Reference.`
                // );
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
            ////console.log(body);
          } else {
            ////console.log(process.env.REACT_APP_RAZORPAY_ID);
            var options = {
              key: process.env.REACT_APP_RAZORPAY_ID,
              amount: res.order.razorpayInstance.amount,
              currency: res.order.razorpayInstance.currency,
              name: "Sphinx",
              description: `Payment Request for ${card.name}`,

              order_id: res.order.razorpayInstance.id,
              handler: function (response) {
                ////console.log(response);
                let body = {
                  payment: {
                    _id: res.order._id,
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                  },
                };
                let signature = response.razorpay_signature;
                ////console.log(body);
                registerForEvent(signature, body)
                  .then((res) => {
                    ////console.log(res);
                    toast.update(toastId.current, {
                      render: `You have successfully registered. Your Team Id is ${res}.Remember it for your Future Reference.`,
                      type: "success",
                      isLoading: false,
                      ...toastStyle,
                    });
                    // props.setter(2);
                    ConRef.current.removeAttribute("disabled");
                    ConRef.current.style.background = btnCol;
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
                description: `Payment Request for ${card.name}`,
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
            ////console.log(window.env);
            const razorpayObject = new Razorpay(options);
            // razorpayObject.open();

            // var razorpayObject = new Razorpay(options);
            ////console.log(razorpayObject);
            razorpayObject.on("payment.failed", function (response) {
              ////console.log(response);
              toast.update(toastId.current, {
                render: "Payment Failed",
                type: "error",
                isLoading: false,
                ...toastStyle,
              });
              ConRef.current.removeAttribute("disabled");
              ConRef.current.style.background = btnCol;
            });
            // razorpayObject.on("payment.ondismiss", function (response) {
            //   ////console.log(response);
            //   toast.update(toastId.current, {
            //     render: "Payment Cancelled",
            //     type: "error",
            //     isLoading: false,
            //     ...toastStyle,
            //   });
            // });
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
    } else {
      setReg(false);
    }
  };
  const [iSowned,setOwn]=useState(false)
  useEffect(()=>{ 
    try{
      if(currUser)
      {
        console.log("is oWNDED")
      
       const y=currUser.profile.events.find(x=> x.event==card._id ||  x.event._id==card._id)

       console.log(currUser.profile.passes)
      
       if(y) setOwn(true)
       
      }
    }
    catch(e)
    {
      console.log(e)
    }},[])
  
  return (
    <div className="eventD-con">
      {regState && (
        <Register
          setReg={setReg}
          event={card}
          category={card.category}
          name={card.name}
        />
      )}
      <div className="eventD-sec1">
        <div className="eventD-title">{card.name}</div>
        <div className="eventD-sub">
          <div className="eventD-sub1">
            <span style={{ fontSize: "0.8rem" }}>Date</span>
            <br></br>
            3rd -5th Nov
            {/* <span style={{ fontSize: "1.4rem", fontWeight: "800" }}>
              {weekday[date.getDay()]}
            </span>
            <br></br>
            <span style={{ fontSize: "1.1rem", fontWeight: "300" }}>
              {date.getDate() +
                " " +
                monthNames[date.getUTCMonth()] +
                " " +
                date.getFullYear()}
            </span> */}
          </div>
          <div className="eventD-sub1">
            <span style={{ fontSize: "0.8rem" }}>Venue</span>
            <br></br>
            Stay Tuned!
            {/* <span style={{ fontSize: "1.4rem", fontWeight: "800" }}>
              {card.location}
            </span>
            <br></br>
            <span style={{ fontSize: "1.1rem", fontWeight: "300" }}>
              {card.time}
            </span> */}
          </div>
          <div className="eventD-sub1">
            <span style={{ fontSize: "0.8rem" }}>Rulebook</span>
            <br></br>
            <span style={{ fontSize: "1.4rem", fontWeight: "800" }}>
              <a style={{ color: "#ffc700" }} href={card.rulebook}>
                View Rulebook
              </a>
            </span>
          </div>
          {card.amount && card.amount > 0 && (
            <div className="eventD-sub1">
              <span style={{ fontSize: "0.8rem" }}>Price</span>
              <br></br>
              <span style={{ fontSize: "1.4rem", fontWeight: "800" }}>
                Rs.{card.amount}
              </span>
            </div>
          )}
        </div>
        <div className="eventD-desc">{card.description}</div>

      {
        iSowned&&
        <div className="eventD-reg" style={{background:"rgb(255, 199, 0)",color:"black"}}>
            Registered
           </div>
      }

        {/* {card.amount && card.amount > 0 && (
            <div className="eventD-sub1">
              <span style={{ fontSize: "0.8rem" }}>Price</span>
              <br></br>
              <span style={{ fontSize: "1.4rem", fontWeight: "800" }}>
                Rs.{card.amount}
              </span>
            </div>
          )} */}
       {!iSowned&& <button
          className="eventD-reg"
          ref={ConRef}
          disabled={card.status != 1}
          onClick={()=>{
           if( card.amount && card.amount > 0)
           setReg(true)
           else
           handleRegister()
          }}
        >
          {card.status == 1 ? "Register Now" : "Registrations Closed"}
        </button>}
      </div>
      <div className="eventD-sec2">
        <img src={card.imageUrl}></img>
      </div>
    </div>
  );
}

export default Description;
