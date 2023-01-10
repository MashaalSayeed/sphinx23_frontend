import React, { useState } from "react";
import upload_btn from "../../../../../images/add_img.png";
import close_btn from "../../../../../images/add_btn.png";

function CreateInput({ placeholder, setField, label, type }) {
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

function CreateEvent({ setCreate }) {
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
        <label className="createEvent-label">Event Category</label>
        <select
          className="createEvent-input"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {/* <option value=""></option> */}
          <option value="Tech">Tech</option>
          <option value="Cultural">Cultural</option>
          <option value="EDM">EDM</option>
        </select>
      </div>
    );
  };
  const textArea = () => {
    return (
      <div className="createEvent-inputCon">
        <label className="createEvent-label">Event Details</label>
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

  const event_img = ({ uploaded }) => {
    return (
      <div>
        {eventImage == null ? (
          <div className="eventImg-upload">
            <div className="event-container">
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
            <img className="eventImg-upload" src={eventImage}></img>
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
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  /*TAG LIST*/
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const coor_List = () => {
    return (
      <div className="createEvent-inputCon">
        <label className="createEvent-label">{"Event Coordinators"}</label>
        <div className="container">
          {tags.map((tag, index) => (
            <div className="tag">
              <div className="tag">{tag}</div>
              <button onClick={() => deleteTag(index)}>x</button>
            </div>
          ))}
          <input
            className="createEvent-input"
            value={input}
            placeholder="Enter a tag"
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onChange}
            //   type={type}
            // placeholder={placeholder}
            //   onChange={(e) => {
            //     setField(e.target.value);
            //   }}
          />
        </div>
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
        <div className="createEvent-formTitle">Add Events</div>
        <div className="createEvent-sections">
          <div className="section1">
            {CreateInput({ label: "Event Name", setField: setEventName })}
            {CategorySelect()}
            {CreateInput({
              label: "Event Date",
              setField: setEventName,
              type: "Date",
            })}
            {CreateInput({
              label: "Event Time",
              setField: setEventName,
              type: "Time",
            })}
            {coor_List()}
            {/* {CreateInput({
              label: "Event Coordinators",
              setField: setEventName,
            })} */}
            {CreateInput({
              label: "Min Team Size",
              setField: setEventName,
            })}
            {CreateInput({
              label: "Max Team Size",
              setField: setEventName,
            })}
            {CreateInput({
              label: "Amount",
              setField: setEventName,
            })}
            {CreateInput({
              label: "Admin",
              setField: setEventName,
            })}
          </div>
          <div className="section2">
            {" "}
            {event_img({ uploaded: true })}
            {textArea()}
            {CreateInput({
              label: "Location",
              setField: setEventName,
            })}
            {submit()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
