import React, { useEffect, useState } from "react";
import machine from "./../../../images/home/timeMach.png";
import Landing from "./home";

function TimeMachine() {
  const parallax = React.useRef(null);

  //   React.useEffect(() => {
  //     function scrollHandler() {
  //       const element = parallax.current;
  //       if (element) {
  //         console.log(element);
  //         let offset = window.pageYOffset;
  //         element.style.backgroundPositionY = offset * 0.12 + "px";
  //       }
  //     }
  //     window.addEventListener("scroll", scrollHandler);
  //     // return the function to remove the handler
  //     // which will be run whn Hero is unmounted
  //     return () => window.removeEventListener("scroll", scrollHandler);
  //   }, []);

  const [scale, setScale] = useState(1);

  const onScroll = (e) => {
    const delta = e.deltaY * 0.001;
    const newScale = scale + delta;
    if (newScale > 2.4) newScale = 2.4;
    if (newScale < 1) newScale = 1;
    console.log(newScale);
    setScale(newScale);
  };

  useEffect(() => {
    console.log("event listner");
    const machine = document.getElementById("machine");

    machine.style.scale = scale;
    // const handleScroll = (event) => {
    //   console.log("window.scrollY", window.scrollY);
    //   const element = parallax.current;
    //   if (element) {
    //     console.log(element);
    //     console.log(1 + Math.min(window.scrollY * 0.12, 1));
    //     // element.style.scale = ;
    //   }
    // };

    // window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [scale]);

  return (
    <div className="parallax-container" id="home">
      <img
        className="machine-img"
        id="machine"
        src={machine}
        ref={parallax}
      ></img>
    </div>
  );
}

export default TimeMachine;
