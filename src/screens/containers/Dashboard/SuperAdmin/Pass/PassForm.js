import React, { useEffect, useState } from "react";
import upload_btn from "../../../../../images/add_img.png";
import close_btn from "../../../../../images/add_btn.png";
import TransferList from "./TransferList";
import { createPass, updatePass } from "../../../../../api";
import { useDispatch, useSelector } from "react-redux";

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
  const [passName, setPassName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [details, setDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [passImage, setImage] = useState(null);
  const [createStatus, setCreateStatus] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.curruser.token);
  const eventa = useSelector((state) => state.auth.events);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);

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
    console.log(pass_Data);
    // const currentTime = Date.now();
    // passImage.name = currentTime;
    let formData = new FormData();
    formData.append("file", passImage);
    formData.append("body", JSON.stringify(pass_Data));
    console.log(formData);
    createPass(dispatch, formData, token, setCreateStatus);
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
    console.log(pass_Data);

    updatePass(currpass._id, pass_Data, token, setCreateStatus);
  };

  const editbtn = () => {
    return (
      <div className="createEvent-submit" onClick={() => handleEdit()}>
        Edit
      </div>
    );
  };

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
        <div className="createEvent-formTitle">Add Pass</div>
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
