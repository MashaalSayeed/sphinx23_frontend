import React, { useEffect, useRef, useState } from "react";
import upload_btn from "../../../../../images/add_img.png";
import close_btn from "../../../../../images/add_btn.png";
import TransferList from "./TransferList";
import { createPass, updatePass } from "../../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function CreateInput({ setField, label, type, value }) {
  return (
    <div className="createEvent-inputCon">
      <label className="createEvent-label">{label}</label>
      <input
        className="createEvent-input"
        type={type}
        value={value}
        // placeholder={placeholder}
        onChange={(e) => {
          setField(e.target.value);
        }}
      />
    </div>
  );
}

function PassForm({ setCreate, edit, currpass }) {
  const [passName, setPassName] = useState("First Day");
  const [amount, setAmount] = useState(null);
  const [details, setDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [passImage, setImage] = useState(null);
  const navigate = useNavigate();
  const [createStatus, setCreateStatus] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.curruser.token);
  const eventa = useSelector((state) => state.auth.events);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      ////console.log(event.target.files[0]);

      setImage(event.target.files[0]);
    }
  };
  useEffect(() => {
    if (edit == true) {
      setAmount(currpass.amount);
      setDetails(currpass.detail);
      setPassName(currpass.name);
      setImage(currpass.imageUrl);
    }
  }, []);

  const CategorySelect = () => {
    return (
      <div className="createEvent-inputCon">
        <label className="createEvent-label">Pass Name</label>
        <select
          className="createEvent-input"
          value={passName}
          onChange={(e) => {
            setPassName(e.target.value);
          }}
        >
          {/* <option value=""></option> */}
          <option value="First Day">First Day</option>
          <option value="Second Day">Second Day</option>
          <option value="Third Day">Third Day</option>
          <option value="Golden Pass">Golden Day</option>
          <option value="Platinum Pass">Platinum Pass</option>
            <option value="School Pass">School Pass</option>
        </select>
      </div>
    );
  };
  const textArea = () => {
    return (
      <div className="createEvent-inputCon">
        <label className="createEvent-label">Pass Details</label>
        <textArea
          className="createEvent-input"
          style={{ height: "110px" }}
          //   type={type}
          //   // placeholder={placeholder}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        >
          {details}
        </textArea>
      </div>
    );
  };

  const pass_img = ({ uploaded }) => {
    return (
      <div>
        {passImage == null ? (
          <div className="passImg-upload">
            <div className="pass-container">
              <input
                type={"file"}
                id="input_file"
                onChange={onImageChange}
                hidden
              />
              <label for="input_file">
                <img src={upload_btn}></img>
              </label>
              <div className="addImage-font">Add Image</div>
            </div>
          </div>
        ) : (
          <div className="createEvent-file">
            <img
              className="passImg-upload"
              src={edit ? passImage : URL.createObjectURL(passImage)}
            ></img>
            {!edit ? (
              <button
                onClick={() => setImage(null)}
                className="createEvent-edit"
              >
                Edit
              </button>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    );
  };

  const submit_pass = () => {
    const newarr = [];
    for (let i = 0; i < events.length; i++) {
      newarr.push(eventa[events[i]]._id);
    }
    const pass_Data = {
      name: passName,
      detail: details,
      amount: amount,
      eventId: newarr,
    };
    ////console.log(pass_Data);
    // const currentTime = Date.now();
    // passImage.name = currentTime;
    let formData = new FormData();
    formData.append("file", passImage);
    formData.append("body", JSON.stringify(pass_Data));
    ////console.log(formData);
    toastId.current = toast.loading("Creating Pass");
    createPass(dispatch, formData, token, setCreateStatus)
      .then((res) => {
        toast.info("Pass Added", toastStyle);
        window.location.href = "/superAdmin";
        ////console.log("PAss Added");
        ////console.log(toastId.current);
        toast.update(toastId.current, {
          render: "Pass Added",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          ...toastStyle,
        });

        setCreate(false);
      })
      .catch((err) => {
        toast.update(toastId.current, {
          render: err,
          type: "error",
          isLoading: false,
          autoClose: 2000,
          ...toastStyle,
        });
        // toast.error(err, toastStyle);
      });
  };
  const submit = () => {
    return (
      <div className="createEvent-submit" onClick={() => submit_pass()}>
        Submit
      </div>
    );
  };

  const handleEdit = () => {
    const newarr = [];
    for (let i = 0; i < events.length; i++) {
      newarr.push(eventa[events[i]]._id);
    }
    const pass_Data = {
      name: passName,
      detail: details,
      amount: amount,
      eventId: newarr,
    };
    ////console.log(pass_Data);
    toastId.current = toast.loading("Updating Pass");

    updatePass(currpass._id, pass_Data, token)
      .then((res) => {
        toast.update(toastId.current, {
          render: "Pass Updated",
          type: "success",
          isLoading: false,
          ...toastStyle,
        });
        setCreate(false);
        window.location.href = "/superAdmin/pass/" + currpass._id;
      })
      .catch((err) => {
        toast.update(toastId.current, {
          render: err,
          type: "error",
          isLoading: false,
          ...toastStyle,
        });
      });
  };

  const editbtn = () => {
    return (
      <div className="createEvent-submit" onClick={() => handleEdit()}>
        Edit
      </div>
    );
  };
  const toastId = useRef(null);

  return (
    <div className="createEvent-back">
      <button
        className="createEvent-close"
        onClick={() => {
          setCreate(false);
        }}
      >
        <img src={close_btn}></img>
      </button>
      <div className="createEvent-form">
        {createStatus == "fail" ? <>Failed</> : <></>}
        {createStatus == "posted" ? <>success</> : <></>}
        <div className="createEvent-formTitle">
          {edit ? "Edit" : "Add"} Pass
        </div>
        {pass_img({ uploaded: true })}
        <div className="createEvent-sections">
          <div className="section1">
            {CategorySelect()}
            {CreateInput({
              label: "Amount",
              setField: setAmount,
              type: "Number",
              value: amount,
            })}
            <label
              className="createEvent-label"
              style={{ fontFamily: "Montserrat", margin: "auto" }}
            >
              Add Events To Pass
            </label>

            {/* {CreateInput({
              label: "Admin",
              setField: setEventName,
            })} */}
          </div>
          <div className="section2">
            {" "}
            {textArea()}
            {/* {CreateInput({
              label: "Location",
              setField: setEventName,
            })} */}
          </div>
        </div>

        {edit ? (
          <TransferList
            setEvents={setEvents}
            edit={true}
            present={currpass.eventId}
          />
        ) : (
          <TransferList setEvents={setEvents} />
        )}

        {!edit ? submit() : editbtn()}
      </div>
    </div>
  );
}

export default PassForm;
