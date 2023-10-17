import "../../../../styles/profile.css";
import prof from "../../../../images/user.png";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Qrcard from "./qrcard";
import styles from "../../EventsView/EventsView.module.css";
import Description from "../../EventsView/EventDetails.js";
import Results from "../../EventsView/Results.js";
import Notification from "../../EventsView/Notification.js";
import { useParams } from "react-router-dom";
import { addPassToUser, createPassPaymentRequest, getUniqueId, loginRegister, logout, updateProf } from "../../../../api";
import { useNavigate, Link } from "react-router-dom";
import Query from "../../EventsView/Query.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import useRazorpay from "react-razorpay";
import  Session  from  '../../../../Session';
import { Update } from "@mui/icons-material";
import EventCard from "../../Events/EventCard";


const Profile = () => {
  // const params = useParams();
  const [currUser,setCurr] = useState( Session.getObject("profile"));
  const navigate=useNavigate()
 const [updates,setUpdates]=useState([]);
  useEffect(() => {
    console.log(currUser)
    updateProf({setUpdates:setUpdates})
    setCurr(Session.getObject("profile"))
  }, []);

 useEffect(()=>{
   setCurr(Session.getObject("profile"))
 updates.forEach(element => {
  toast.info(element.type+" "+element.name+" has been added")
  
 }
 );

 },[updates])

 useEffect(()=>{

},[currUser])

  const [currentTab, setCurrentTab] = useState("Profile");
  const uniqueCode=getUniqueId(currUser.profile.phoneNumber)
  const [event, setEvent] = useState();
  

  useEffect(() => {
    if (currUser && !currUser.profile.isEmailVerified) {
      // toast.error("Please Complete Your Profile", toastStyle);
      navigate('/login')
     
      // props.toreg(false);
    } else if ( currUser&& !currUser.profile.isMobileNumberVerified) 
    {
      // toast.error("Please Complete Your Profile", toastStyle); 
      navigate('/login')
      // props.toreg(false);
    } 

  }, [])

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

  

  const handleBuyReq=(onePass)=>{
    //console.log(onePass)
       if (!currUser) {
      toast.error("You need to Login First", toastStyle);
      window.location.href = "/login";
      return;
    }
    if (true ) {
      // toast.current = toast.loading("Processing");
      // ConRef.current.setAttribute("disabled", true);
      // ConRef.current.style.background = "##808080";
      let userList = [];
      userList.push(currUser.profile._id);
      let body = {
        passId:onePass._id,
        userId: currUser.profile._id,
        receipt: `This is the Receipt for ${onePass.name}`,
        notes: { description: `Payment Request for ${onePass.name}` },
      };
      createPassPaymentRequest(body)
        .then((res) => {
        //console.log(res);
        //console.log(window.env);
          if (res.status) {
            toast.info('Free Created');
            //console.log('free order created')
            ////console.log(window.env);
            // let body = {
            //   pass: onePass._id,
            //   tName: "Not Applicable",
            //   userList: userList,
            //   payment: {
            //     order_id: process.env.REACT_APP_FREE_ORDER_ID,
            //     payment_id: process.env.REACT_APP_FREE_PAYMENT_ID,
            //   },
            // };
          } else {
            ////console.log(process.env.REACT_APP_RAZORPAY_ID);
            toast.info('Payment Link created');
            console.log(res)
            window.open(res.payment.paymentLink, "_blank");
            // var options = {
            //   key: process.env.REACT_APP_RAZORPAY_ID,
            //   amount: res.payment.razorpayInstance.amount,
            //   currency: res.payment.razorpayInstance.currency,
            //   name: "Sphinx",
            //   description: `Payment Request for ${onePass.name}`,

            //   order_id: res.payment.razorpayInstance.id,
            //   handler: function (response)  {
            //     ////console.log(response);
                // let body = {
                //     userId:currUser.profile._id,
                //     passId:res.pass._id,
                //     _id: res.payment._id,
                //     payId: res.payId,
                 
                // };
                // addPassToUser(body,onePass,setCurr).then((resp)=>
                // {
                //  //console.log("success")
                // }).
                // catch((err)=>{
                //   toast.info(err)
                // });
              
                
                
                
             
            //   },
            //   prefill: {
            //     //Here we are prefilling random contact
            //     contact: currUser.profile.phoneNumber,
            //     //name and email id, so while checkout
            //     name: currUser.profile.name,
            //     email: currUser.profile.email,
            //   },
            //   notes: {
            //     description: `Payment Request for ${onePass.name}`,
            //   },
            //   theme: {
            //     color: "#2300a3",
            //   },
            //   modal: {
            //     ondismiss: function () {
            //       toast.info("Payment Cancelled",toastStyle)
            //       // toast.update(toastId.current, {
            //       //   render: "Payment Cancelled",
            //       //   type: "error",
            //       //   isLoading: false,
            //       //   ...toastStyle,
            //       // });
            //       // ConRef.current.removeAttribute("disabled");
            //       // ConRef.current.style.background = btnCol;
            //     },
            //   },
            // };
            //console.log(options);
            // const razorpayObject = new Razorpay(options);
            // // razorpayObject.open();

            // // var razorpayObject = new Razorpay(options);
            // //console.log(razorpayObject);
            // razorpayObject.on("payment.failed", function (response) {
            //   ////console.log(response);
            //   toast.info("Payment Failed",toastStyle)
            //   // toast.update(toastId.current, {
            //   //   render: "Payment Failed",
            //   //   type: "error",
            //   //   isLoading: false,
            //   //   ...toastStyle,
            //   // });
            //   // ConRef.current.removeAttribute("disabled");
            //   // ConRef.current.style.background = btnCol;
            // });
            // razorpayObject.on("payment.ondismiss", function (response) {
            //   ////console.log(response);
            //  toast.info('Payment Cacelled')
            // });
            // razorpayObject.open();
          }
        })
        .catch((err) => {
          toast.error(err,toastStyle)
          throw err;
          toast.error(err,toastStyle);
          // toast.update(toastId.current, {
          //   render: err,
          //   type: "error",
          //   isLoading: false,
          //   ...toastStyle,
          // });
          // ConRef.current.removeAttribute("disabled");
          // ConRef.current.style.background = btnCol;
        });
    } else {
      // setReg(true);
    }
  }

  // const ConRef = useRef(null);
  // let token = "";
  // const toastId = useRef(null);
  // const disabledCol = "#6e9efa";
  // const btnCol = "#95FF42";
 
  const passes = useSelector((state) => state.auth.allpasses);
  const Passes=()=>{
    return <div className="passes-sec">{passCardElements}</div>
  }
  const passCardElements = passes.map((onePass, i) => {
    let owned=currUser.profile.passes.some(obj => obj.hasOwnProperty('_id') && obj._id == onePass._id);
    return (
      
       <div className="profPass">
      <img className="profPass-img" src={onePass.imageUrl}></img>
      <div className="profInfo">
        <div className="profPass-name">{onePass.name} </div>
        <div className="profPass-detail" style={{fontSize:"0.7rem"}}>{onePass.detail} </div>
        <div className="profPass-name" style={{marginTop:"auto", fontSize:"1rem",display:"flex",justifyContent:"space-between",width:"100%",marginBottom:"5px"}}>
           <span>Total</span>
           <span >Rs.{onePass.amount}</span>
        </div>
        <div className="profPass-detail" style={{marginBottom:"10px"}}>The pass will be added to your Profile section as soon as you complete the payment</div>
        <button onClick={()=>{handleBuyReq(onePass);}  } style={owned?{background:"grey", pointerEvents:"none"}:{}}> {owned?"Owned":"Proceed to Pay"} </button>
      </div>
    </div>
   
    );
  });

  const eve = currUser.profile.events
  const allEvents = useSelector((state) => state.auth.upcoming);
  const EventShow=()=>{
    return <div className="passes-sec" style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignItems:"center",left:"0"}}>{EventC}</div>
  }
  const EventC = eve.map((e, i) => {
    let data=allEvents.find(x=>x._id==e.event)
    return (
       <div className="profPass" style={{border:"none"}}>

        <EventCard card={data} index={i} category={data.category}  isOwn={true} />
     
    </div>
   
    );
  });
  //console.log(currUser)
  const Prof=()=>{ return <div className="profile-container" >
  <Qrcard Code={uniqueCode} name={currUser.profile.name} />

  <div className="user-details" >
    <img src={prof} alt="" className="user-img" />
    <p className="username" style={{textTransform:"capitalize",textShadow:"none",fontWeight:"700"}} >{currUser.profile.name}</p>
    <div className="details">
        <p>Registered email</p>
        <div className="user-email">{currUser.profile.email}</div>
        <p>College</p>
        <div className="user-number">{currUser.profile.collegeName}</div>
        <p>Registered Number</p>
        <div className="user-number">{currUser.profile.phoneNumber}</div>
      
        {currUser.profile.isAmbassador&&<div className="referral-id">Referal id: {uniqueCode}</div> }
    </div>
  </div>
</div>}
  useEffect(()=>{},[currUser]);


const tabs = {
  Profile: <Prof  />,
  "My Passes": <Passes  />,
  "My Events": <EventShow />,
};
  return (
    <div className="ud__profile">
      
      
      <div className={styles.eventsnav} style={{position:"absolute",top:"50px",zIndex:'20'}}>
        {/* <div className="nav-list">
          {
            Object.keys(tabs).map((tab) => (
              <div key={tab} className={`nav-item ${currentTab == tab ? styles.active : ""}`} onClick={() => setCurrentTab(tab)}>{tab}</div>
            ))
          }
        </div> */}
            <nav className={styles.eventsnav}>
            <ol>
              {Object.keys(tabs).map((tab) => (
                <li
                  key={tab}
                  className={currentTab == tab ? styles.active : ""}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ol>
          </nav>
            <hr style={{marginLeft:"0px"}}/>
        </div>
          {tabs[currentTab]}

     
    </div>
    
  );
};

export default Profile;
