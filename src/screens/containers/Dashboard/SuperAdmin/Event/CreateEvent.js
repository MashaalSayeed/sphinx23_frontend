import React, { useEffect, useState } from "react";
import upload_btn from "../../../../../images/add_img.png";
import close_btn from "../../../../../images/add_btn.png";
import InputTag from "./InputTag";
import { createEvent, getUsersId, updateEvent } from "../../../../../api";
import { useDispatch, useSelector } from "react-redux";

function CreateInput({ placeholder, setField, label, type, value }) {
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

function CreateEvent({ setCreate, editSuperAdmin, currEvent }) {
  console.log(currEvent);
  const [eventName, setEventName] = useState(null);
  const [category, setCategory] = useState("Tech");
  const [details, setDetails] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [eventCoor, setEventCoor] = useState([]);
  const [eventCoorIds, setEventCoorId] = useState([]);
  const [minTeamSize, setMinTeam] = useState(null);
  const [maxTeamSize, setMaxTeam] = useState(null);
  const [amount, setAmount] = useState(null);
  const [location, setLocation] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [adminId, setAdminId] = useState([]);
  const [update, setUpdate] = useState([]);
  const [updateList, setUpdateList] = useState([]);
  const [createStatus, setCreateStatus] = useState(null);
  const [eventImage, setImage] = useState(null);
  const token = useSelector((state) => state.auth.curruser.token);
  const dispatch = useDispatch();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  useEffect(() => {
    if (editSuperAdmin == true) {
      console.log(currEvent.from.split("T")[0]);
      console.log(currEvent.description);
      setEventName(currEvent.name);
      setAdmin(currEvent.admin.email);
      setAmount(currEvent.amount);
      setCategory(currEvent.category);
      setDate(currEvent.from.split("T")[0]);
      setDetails(currEvent.description);
      setMinTeam(currEvent.minTeamSize);
      setMaxTeam(currEvent.maxTeamSize);
      setImage(currEvent.imageUrl);
      setLocation(currEvent.location);
      setTime(currEvent.time);
      const arr = currEvent.updates.map(({ message }) => {
        return { message: message };
      });
      setUpdateList(arr);
    }
  }, []);

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
          value={details}
          //   type={type}
          // placeholder={details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        >
          {details}
        </textArea>
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
            <img
              className="eventImg-upload"
              src={
                editSuperAdmin ? eventImage : URL.createObjectURL(eventImage)
              }
            ></img>
            {!editSuperAdmin ? (
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

  const submit_Event = async () => {
    eventCoor.forEach((mail) => {
      getUsersId(token, mail, setEventCoorId);
    });
    getUsersId(token, admin, setAdminId);

    post_Create();
  };

  const post_Create = () => {
    console.log(eventCoorIds);
    const CoorsIds = Array.from(new Set(eventCoorIds));
    console.log(CoorsIds);
    const event_Data = {
      name: eventName,
      description: details,
      category: category,
      from: date,
      time: time,
      location: location,
      coordinators: CoorsIds,
      admin: adminId[0],
      updates: [],
      status: 1,
      ended: false,
      amount: amount,
      freeForMNIT: true,
      minTeamSize: minTeamSize,
      maxTeamSize: maxTeamSize,
      // imageUrl: "", //
    };
    console.log(event_Data);
    let formData = new FormData();
    formData.append("file", eventImage);
    formData.append("body", JSON.stringify(event_Data));
    console.log(formData);
    createEvent(dispatch, formData, token, setCreateStatus);
  };

  const submit = () => {
    return (
      <div className="createEvent-submit" onClick={() => submit_Event()}>
        Submit
      </div>
    );
  };
  const handleEdit = () => {
    const event_Data = {
      name: eventName,
      description: details,
      category: category,
      from: date,
      time: time,
      location: location,
      // coordinators: CoorsId,
      // admin: adminId[0],
      updates: [...updateList, { message: update }],
      status: 1,
      ended: false,
      amount: amount,
      freeForMNIT: true,
      minTeamSize: minTeamSize,
      maxTeamSize: maxTeamSize,
      // imageUrl: "", //
    };
    updateEvent(currEvent._id, event_Data, token, setCreateStatus);
    console.log(event_Data);
  };
  const edit = () => {
    return (
      <div className="createEvent-submit" onClick={() => handleEdit()}>
        Edit
      </div>
    );
  };
  // console.log(eventCoorIds);
  console.log(eventCoor);
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
        {createStatus == "posted" ? (
          () => {
            setCreate(false);
            return <>success</>;
          }
        ) : (
          <></>
        )}
        <div className="createEvent-formTitle">
          {editSuperAdmin ? "Edit Event" : "Add Event"}
        </div>
        <div className="createEvent-sections">
          <div className="section1">
            {CreateInput({
              label: "Event Name",
              setField: setEventName,
              value: eventName,
            })}
            {CategorySelect()}
            {CreateInput({
              label: "Event Date",
              setField: setDate,
              type: "Date",
              value: date,
            })}
            {CreateInput({
              label: "Event Time",
              setField: setTime,
              type: "Time",
              value: time,
            })}

            {!editSuperAdmin ? (
              <div className="createEvent-Taglist">
                {" "}
                <label className="createEvent-label">
                  {"Event Coordinators"}
                </label>
                <InputTag setEventCoor={setEventCoor} useData={eventCoor} />
              </div>
            ) : (
              <></>
            )}
            {/* {coor_List()} */}
            {/* {CreateInput({
              label: "Event Coordinators",
              setField: setEventName,
            })} */}
            {CreateInput({
              label: "Min Team Size",
              setField: setMinTeam,
              type: "Number",
              value: minTeamSize,
            })}
            {CreateInput({
              label: "Max Team Size",
              setField: setMaxTeam,
              type: "Number",
              value: maxTeamSize,
            })}
            {CreateInput({
              label: "Amount",
              setField: setAmount,
              type: "Number",
              value: amount,
            })}

            {editSuperAdmin ? (
              <div style={{ marginTop: "40px" }}>
                {CreateInput({
                  label: "Updates",
                  setField: setUpdate,
                })}
              </div>
            ) : (
              <></>
            )}
            {/* {editSuperAdmin ? (
              <></>
            ) :  */}

            {CreateInput({
              label: "Admin",
              setField: setAdmin,
              value: admin,
            })}
          </div>
          <div className="section2">
            {" "}
            {event_img({ uploaded: true })}
            {textArea()}
            {CreateInput({
              label: "Location",
              setField: setLocation,
              value: location,
            })}
            {editSuperAdmin ? edit() : submit()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
