// import React, { useState } from "react";
// import "../../../styles/home.css";
// import grad from "../../../images/home/gradBack.png";
// import stars from "../../../images/home/starsDim.png";
// import pyraminds from "../../../images/home/homePyramid1.png";
// import logo from "../../../images/home/homeLogo.png";
// import burger from "../../../images/home/hamburger.png";

// function Landing() {
//   const [currTab, setCurrTab] = useState("Home");
//   const Tabs = ["Home", "About", "Contact"];
//   const Navbar = () => {
//     return (
//       <div className="landing-navbar">
//         <div className="landing-logo">
//           <img src={logo}></img>
//         </div>
//         <div className="landing-tabs">
//           {Tabs.map((value, i) => {
//             return (
//               <div
//                 className="landing-tab-link"
//                 key={i}
//                 onClick={() => {
//                   console.log(value);
//                   setCurrTab(value);
//                 }}
//                 style={
//                   currTab == value ? { textShadow: "0px 1px 3px #FFFFFF " } : {}
//                 }
//               >
//                 {value}
//               </div>
//             );
//           })}
//         </div>
//         <div className="landing-ham">
//           <img src={burger}></img>
//         </div>
//       </div>
//     );
//   };
//   return (
//     <div className="landing-main">
//       <img className="landing-gradient" src={grad}></img>
//       <img className="landing-stars" src={stars}></img>
//       {Navbar()}
//       <div className="landing-title">SPHINX</div>
//       <div className="landing-pyramids">
//         {" "}
//         <img src={pyraminds}></img>
//       </div>
//     </div>
//   );
// }

// export default Landing;
