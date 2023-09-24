import React from "react";
import roboWars from "../../../../images/events/roboWars.png";
import qr from "../../../../images/events/qr_1.jpg";
import "../../../../styles/profile.css";
import QRCode from "react-qr-code";
function Qrcard({Code,name}) {
  return (
    <div>
      <div class="pass" style={{display:"flex",flexDirection:"column" ,justifyItems:"center",alignContent:"center",height:"300px"}} >
     
  <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={Code}
    viewBox={`0 0 256 256`}
  />
  <br></br>
  <p class="id-text" style={{fontSize:"1.5rem",margin:"auto",letterSpacing:"0.6rem",fontFamily:"wity2"}}>#{Code}</p>
      </div>
      <div class="pass-id">
       
      <p class="id-text" style={{fontSize:"1.5rem",fontFamily:"wity2",margin:"auto"}}>{name}</p>
      </div>
    </div>
  );
}

export default Qrcard;
