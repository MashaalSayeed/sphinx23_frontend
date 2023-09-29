import React, { useState, useRef } from "react";
import { Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useSelector } from "react-redux";
import { red } from "@mui/material/colors";
import dropdown from "../../../../../images/akar-icons_chevron-down.png";
import dropdownsubmit from "../../../../../images/material-symbols_chat-rounded.png";
import "../../../../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitQueryResponse } from "../../../../../api";
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
const ComplaintsTable = ({ data, value, fetchComplaints }) => {
  ////console.log(data);
  ////console.log(value);
  ////console.log(data[value[0]]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [fetchbutton, setfetchbutton] = useState(false);
  // const [reply, setReply] = useState("");
  const token = useSelector((state) => state.auth.curruser.token);
  const [open, setOpen] = useState(false);
  const complaintReplyTextArea = useRef();

  // const handleReplyChange = (e) => {
  //   ////console.log("Text", e.target.value);
  //   setReply(e.target.value);
  // };

  function OpenPopUp({ isApproved, id, response }) {
    const handleSubmit = (event) => {
      event.preventDefault();
      const reply = complaintReplyTextArea.current.value;
      ////console.log(reply);
      let body = { queryId: id, responseDesc: reply };

      submitQueryResponse(token, body)
        .then((res) => {
          toast.info("Query Resolved", toastStyle);
          window.location.href = "/eventAdmin/2";
        })
        .catch((err) => {
          toast.error(err, toastStyle);
        });

      // fetchComplaints();
    };
    return (
      <td colSpan={8} className="Form-Container">
        <div className="Form-sub-Container">
          <h4>{subject}</h4>
          <p>Description:{description}</p>
          {isApproved && <p>Response:{response}</p>}
        </div>
        {open && (
          <TextareaAutosize
            aria-label="minimum height"
            ref={complaintReplyTextArea}
            minRows={7}
            maxRows={10}
            placeholder="Reply to Query"
            style={{ width: "90%", margin: "1%", marginLeft: "4em" }}
          />
        )}
        {!isApproved && (
          <button
            className="Pop-up-submit"
            style={{ width: "10%" }}
            onClick={open ? handleSubmit : handleReply}
          >
            <div className="Pop-up-submit-icon">
              <img src={dropdownsubmit} alt="Image"></img>
            </div>

            <div className="Pop-up-submit-text">
              <p>{open ? "Submit" : "Reply"}</p>
            </div>
          </button>
        )}
      </td>
    );
  }
  const handleReply = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const status = (isApproved, subject, text) => {
    const handleClick = () => {
      ////console.log("icon-clicked");
      setfetchbutton(!fetchbutton);
      setOpen(false);
      setSubject(subject);
      setDescription(text);
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
            color: isApproved ? "#038400" : "#FFE0C2",
            backgroundColor: isApproved ? "#C8FFBF" : "#FF0000",
            cursor: "auto",
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
          {isApproved ? "Approved" : "Pending"}
        </Button>
        <img
          src={dropdown}
          style={{
            cursor: "pointer",
          }}
          onClick={handleClick}
          alt="image"
        ></img>
      </td>
    );
  };
  return (
    <>
      <tr>
        {value.map((ele, i) => {
          if (ele == "status")
            return status(
              data["isApproved"],
              data["subject"],
              data["queryDesc"]
            );
          else if (ele == "name") return <td>{data["user"].name}</td>;
          else if (ele == "email") return <td>{data["user"].email}</td>;
          else if (ele == "college") return <td>{data["user"].collegeName}</td>;
          else if (ele == "event") return <td>{data["event"].name}</td>;
          else if (ele == "queryId") return <td>{`#${data[ele]}`}</td>;
          else return <td>{data[ele]}</td>;
        })}
      </tr>
      <tr className="Pop-Up-Screen">
        {fetchbutton && (
          <OpenPopUp
            isApproved={data["isApproved"]}
            id={data["_id"]}
            response={data["responseDesc"]}
          />
        )}
      </tr>
    </>
  );
};

export default ComplaintsTable;
