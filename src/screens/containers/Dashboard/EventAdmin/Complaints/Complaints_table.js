import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import dropdown from "../../../../../images/akar-icons_chevron-down.png";
import dropdownsubmit from "../../../../../images/material-symbols_chat-rounded.png";
import "../../../../../App.css";
const ComplaintsTable = ({ data, value }) => {
  console.log(data);
  console.log(value);
  console.log(data[value[0]]);
  const [Status, setStatus] = useState("Pending");
  const [fetchbutton, setfetchbutton] = useState(false);
  const [buttonbg, setbuttonbg] = useState("#FFE0C2");
  const [buttontext, setbuttontext] = useState("#FF0000");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Sent Successfully`);
    setStatus("Approved");
    setbuttonbg("#C8FFBF");
    setbuttontext("#038400");
  };
  function OpenPopUp() {
    return (
      <td colSpan={8} className="Form-Container">
        <div className="Form-sub-Container">
          <h4>Registration Error</h4>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
            eligend esse dolorem repellat iusto placeat, praesentium atque
            laudantium? Officia rerum quam nisi sequi beatae! Tempore iusto
            tempora fuga beatae sed.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
            facilis delectus pariatur quidem, excepturi nihil incidunt
            minusdolorem ullam deserunt expedita iusto rerum voluptas iure autem
            officiis, cum provident ab.
          </p>
        </div>
        <div className="Pop-up-submit">
          <div className="Pop-up-submit-icon">
            <img src={dropdownsubmit} onClick={handleSubmit} alt="Image"></img>
          </div>
          <div className="Pop-up-submit-text">
            <p>Reply</p>
          </div>
        </div>
      </td>
    );
  }

  const status = () => {
    const handleClick = () => {
      console.log("icon-clicked");
      setfetchbutton(!fetchbutton);
    };

    return (
      <td className="Drop-Down">
        {" "}
        <Button
          variant="contained"
          style={{
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.8)",
            borderRadius: "4px",
            margin: "5px",
            color: buttontext,
            backgroundColor: buttonbg,
          }}
        >
          {/* <Dropdown title={Status} 
          variant="contained"
          style={{
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.8)",
            borderRadius: "4px",
            margin: "5px",
            color:"#8B0000",
            backgroundColor:"#ffcccb"
          }} >
        
        </Dropdown> */}
          {Status}
        </Button>
        <img src={dropdown} onClick={handleClick} alt="image"></img>
      </td>
    );
  };
  return (
    <>
      <tr>
        {value.map((ele, i) => {
          if (ele == "Status") return status();
          else return <td key={i}>{data[ele]}</td>;
        })}
      </tr>
      <tr className="Pop-Up-Screen"> {fetchbutton && <OpenPopUp />}</tr>
    </>
  );
};

export default ComplaintsTable;
