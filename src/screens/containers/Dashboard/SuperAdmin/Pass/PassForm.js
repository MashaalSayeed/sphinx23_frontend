import React, { useState } from "react";
import upload_btn from "../../../../../images/add_img.png";
import close_btn from "../../../../../images/add_btn.png";

function CreateInput({ setField, label, type }) {
  return (
    <div className="createEvent-inputCon">
      <label className="createEvent-label">{label}</label>
      <input
        className="createEvent-input"
        type={type}
        // placeholder={placeholder}
        onChange={(e) => {
          setField(e.target.value);
        }}
      />
    </div>
  );
}

function PassForm({ setCreate }) {
  const [createEventData, setEventData] = useState({});
  const [eventName, setEventName] = useState({});
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [eventImage, setImage] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const CategorySelect = () => {
    return (
      <div className="createEvent-inputCon">
        <label className="createEvent-label">Pass Name</label>
        <select
          className="createEvent-input"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {/* <option value=""></option> */}
          <option value="First Day">First Day</option>
          <option value="Second Day">Second Day</option>
          <option value="Third Day">Third Day</option>
          <option value="Golden Pass">Third Day</option>
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
        />
      </div>
    );
  };

  const pass_img = ({ uploaded }) => {
    return (
      <div>
        {eventImage == null ? (
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
            <img className="passImg-upload" src={eventImage}></img>
            <button onClick={() => setImage(null)} className="createEvent-edit">
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  const submit = () => {
    return (
      <div className="createEvent-submit" onClick={() => {}}>
        Submit
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
        <div className="createEvent-formTitle">Add Pass</div>
        {pass_img({ uploaded: true })}
        <div className="createEvent-sections">
          <div className="section1">
            {CategorySelect()}
            {CreateInput({
              label: "Amount",
              setField: setEventName,
              type: "Number",
            })}
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
        {submit()}
      </div>
    </div>
  );
}

export default PassForm;
