import React, { useEffect, useRef, useState } from "react";
import upload_btn from "../../../../../images/add_img.png";
import close_btn from "../../../../../images/add_btn.png";
import InputTag from "./InputTag";
import { createEvent, fetchOneEvent, updateEvent } from "../../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { ConstructionOutlined } from "@mui/icons-material";
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

function CreateEvent({ setCreate, editSuperAdmin, currEvent }) {
  const url = "https://sphinx-372511.de.r.appspot.com/api";
  const userType =
    useSelector((state) => state.auth.curruser.profile.type) === "superAdmin";
  const disabled = editSuperAdmin ? !userType : false;
  ////console.log(userType);
  ////console.log(currEvent);

  const navigate = useNavigate();
  const [submitV, setSubmit] = useState(false);
  const [eventName, setEventName] = useState(null);
  const [category, setCategory] = useState("Flagship");
  const [details, setDetails] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [freeForMNIT, setfreeforMNIT] = useState(false);
  const [eventCoor, setEventCoor] = useState([]);
  const [eventCoorIds, setEventCoorId] = useState([]);
  const [minTeamSize, setMinTeam] = useState(null);
  const [maxTeamSize, setMaxTeam] = useState(null);
  const [event, setEvent] = useState();
  const [status, setStatus] = useState();
  const [amount, setAmount] = useState(null);
  const [rulebook, setRulebook] = useState("");
  const [location, setLocation] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [adminId, setAdminId] = useState([]);
  const [update, setUpdate] = useState([]);
  const [updateList, setUpdateList] = useState([]);
  const [createStatus, setCreateStatus] = useState(null);
  const [eventImage, setImage] = useState(null);
  const [redirectUrl, setRedirect] = useState(null);
  const token = useSelector((state) => state.auth.curruser.token);
  ////console.log(token);
  const dispatch = useDispatch();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  function CreateInput({
    placeholder,
    setField,
    label,
    type,
    value,
    disabled,
  }) {
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
          disabled={disabled}
        />
      </div>
    );
  }
  useEffect(() => {
    if (editSuperAdmin == true) {
      fetchOneEvent(setEvent, currEvent._id)
        .then((res) => {
          setEventName(res.name);
          setAdmin(res.admin.email);
          setAmount(res.amount);
          setCategory(res.category);
          setDate(res.from.split("T")[0]);
          setDetails(res.description);
          setMinTeam(res.minTeamSize);
          setMaxTeam(res.maxTeamSize);
          setImage(res.imageUrl);
          setLocation(res.location);
          setTime(res.time);
          setfreeforMNIT(res.freeForMNIT);
          setStatus(res.status);
          setRulebook(res.rulebook);
          setRedirect(res.redirectUrl);
          let a = [];
          for (let i in res.coordinators) {
            try {
              let mail = res.coordinators[i].email;
              ////console.log("mail", mail);
              //const id = await getUsersId(token, mail);
              a.push(mail);
            } catch (err) {
              toast.error(err, toastStyle);
              return;
            }
          }
          //console.log(a);
          setEventCoor(a);

          // const arr = currEvent.updates.map(({ message }) => {
          //   return { message: message };
          // });
          setUpdateList(res.updates);
          ////console.log(updateList);
        })
        .catch((err) => {
          ////console.log(err);
        });
      // ////console.log(currEvent.from.split("T")[0]);
      // ////console.log(currEvent.description);
    }
  }, []);
  useEffect(() => {
    if (submitV) post_Create();
  }, [adminId]);
  useEffect(() => {
    // if (submitV) post_Create();
  }, [eventCoor]);
  const categories = ["Flagship", "Club", "Department","SRC","Workshops"];
  // useEffect(() => {
  //   post_Create();
  // }, [eventCoorIds]);

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
          disabled={editSuperAdmin ? !userType : false}
        >
          {/* <option value=""></option> */}
          {categories.map((category) => {
            return <option value={category}>{category}</option>;
          })}
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
          disabled={editSuperAdmin ? !userType : false}
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
    ////console.log(setEventCoorId);
    setEventCoorId([]);
    let a = [];
    ////console.log(eventCoor, "kunal");
    for (let i in eventCoor) {
      try {
        let mail = eventCoor[i];
        ////console.log("mail", mail);
        //console.log(mail);
        const id = await getUsersId(token, mail);
        a.push(id);
      } catch (err) {
        toast.error(err, toastStyle);
      }
    }
    ////console.log(admin, "ip");
    setEventCoorId(a);
    if (!admin) {
      toast.error("Admin is Required.", toastStyle);
      return;
    }
    try {
      const id = await getUsersId(token, admin);
      if (!id) {
        toast.error("Admin Invalid", toastStyle);
        return;
      }
      setAdminId([id]);
      setSubmit(true);
      // post_Create();
    } catch (err) {
      toast.error("Admin not Valid", toastStyle);
    }
  };
  const toastId = useRef(null);
  const post_Create = () => {
    ////console.log(eventCoorIds);
    ////console.log(adminId, "POST CALLED");
    const CoorsIds = Array.from(new Set(eventCoorIds));
    ////console.log(CoorsIds);
    if (adminId.length == 0) {
      toast.info("No admin ids found", toastStyle);
      return;
    }
    ////console.log(adminId[0]);
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
      freeForMNIT: freeForMNIT,
      minTeamSize: minTeamSize,
      maxTeamSize: maxTeamSize,
      rulebook: rulebook,
      redirectUrl: redirectUrl,
      // imageUrl: "", //
    };
    //console.log(event_Data);
    let formData = new FormData();
    formData.append("file", eventImage);
    formData.append("body", JSON.stringify(event_Data));
    ////console.log(formData);

    toastId.current = toast.loading("Creating Event");
    submitRef.current.setAttribute("disabled", true);
    createEvent(dispatch, formData, token)
      .then((res) => {
        ////console.log(res);
        toast.update(toastId.current, {
          render: "Created Event",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          ...toastStyle,
        });
        submitRef.current.removeAttribute("disabled");
        // toast.info("Created Event", toastStyle);
        setCreate(false);
        // window.location.href = "/superAdmin";
      })
      .catch((err) => {
        ////console.log(err);
        toast.update(toastId.current, {
          render: err,
          type: "error",
          isLoading: false,
          autoClose: 2000,
          ...toastStyle,
        });
        submitRef.current.removeAttribute("disabled");
        // toast.error(err, toastStyle);
      });
  };

  const submit = () => {
    return (
      <button
        className="createEvent-submit"
        onClick={() => submit_Event()}
        ref={submitRef}
      >
        Submit
      </button>
    );
  };

  const handleEdit = async () => {
    const event_Data = {
      name: eventName,
      description: details,
      category: category,
      from: date,
      time: time,
      location: location,
      coordinators: [],
      admin: "",
      updates:
        update.length != 0
          ? [...updateList, { message: update, timestamp: Date.now() }]
          : [...updateList],
      status: status,
      ended: false,
      amount: amount,
      freeForMNIT: freeForMNIT,
      minTeamSize: minTeamSize,
      rulebook: rulebook,
      maxTeamSize: maxTeamSize,
      redirectUrl: redirectUrl,
      // imageUrl: "", //
    };
    if (!admin) {
      toast.error("Admin is Required.", toastStyle);
      return;
    }
    try {
      const id = await getUsersId(token, admin);
      if (!id) {
        toast.error("Admin Invalid", toastStyle);
        return;
      }
      //console.log(id);
      event_Data.admin = id;
      let a = [];
      ////console.log(eventCoor, "kunal");
      for (let i in eventCoor) {
        try {
          let mail = eventCoor[i];
          ////console.log("mail", mail);
          const id = await getUsersId(token, mail);
          a.push(id);
        } catch (err) {
          toast.error(err, toastStyle);
          return;
        }
      }
      event_Data.coordinators = a;
      toastId.current = toast.loading("Updating Event");
      submitRef.current.setAttribute("disabled", true);
      updateEvent(currEvent._id, event_Data, token, setCreateStatus)
        .then((res) => {
          ////console.log("Event Updated");
          toast.update(toastId.current, {
            render: "Event Updated",
            type: "success",
            isLoading: false,
            autoClose: 2000,
            ...toastStyle,
          });
          submitRef.current.removeAttribute("disabled");
          // navigate(`/eventDetails/event/${currEvent._id}`);
          ////console.log(`/eventDetails/event/${currEvent._id}`);
          setCreate(false);
          window.location.href = `/eventDetails/event/${currEvent._id}`;
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
      // setAdminId([id]);
      // setSubmit(true);
      // post_Create();
    } catch (err) {
      toast.error("Admin not Valid", toastStyle);
    }

    //console.log(event_Data);

    ////console.log(event_Data);
  };
  const edit = () => {
    return (
      <button
        className="createEvent-submit"
        onClick={() => handleEdit()}
        ref={submitRef}
      >
        Edit
      </button>
    );
  };

  const getUsersId = async (token, email) => {
    // let userData = [];
    //console.log("called");
    return fetch(`${url}/users/validatemail/${email}`, {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        ////console.log(response, "manvir");
        //console.log(response.id);
        return response.id;
      })
      .catch((err) => {
        //console.log(err);
        toast.error(err, toastStyle);
      });

    //
    // .then((data) => {
    //   if (data.success) {
    //     ////console.log(data.id);
    //     ////console.log(prevState);
    //     setIds([...prevState, data.id]);
    //   }
    // })
    // .catch((error) => {
    //   alert(error);
    //   // ////console.log(error);
    // });
    // return userData;
  };
  // ////console.log(eventCoorIds);
  const submitRef = useRef(null);
  ////console.log(eventCoor);
  return (
    <div className="createEvent-back">
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
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
              disabled: disabled,
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

            {editSuperAdmin ? (
              <div className="createEvent-Taglist">
                {" "}
                <label className="createEvent-label">
                  {"Event Coordinators"}
                </label>
                <InputTag
                  disabled={disabled}
                  setEventCoor={setEventCoor}
                  useData={eventCoor}
                />
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
              disabled: disabled,
            })}
            {CreateInput({
              label: "Max Team Size",
              setField: setMaxTeam,
              type: "Number",
              value: maxTeamSize,
              disabled: disabled,
            })}
            {CreateInput({
              label: "Rulebook URL",
              setField: setRulebook,
              value: rulebook,
              disabled: disabled,
            })}
            {CreateInput({
              label: "Amount",
              setField: setAmount,
              type: "Number",
              value: amount,
              disabled: disabled,
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
              disabled: disabled,
            })}
            <div
              className="createEvent-inputCon"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {" "}
              <input
                className="-checkbox"
                type={"checkbox"}
                name="freeForMnit"
                style={{ marginRight: "5px" }}
                checked={freeForMNIT}
                onChange={(e) => {
                  setfreeforMNIT(!freeForMNIT);
                }}
                disabled={editSuperAdmin ? !userType : false}
              />
              <label className="createEvent-label" htmlFor="remember">
                Free For Mnit
              </label>
            </div>
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
            {CreateInput({
              label: "Redirect URL",
              setField: setRedirect,
              value: redirectUrl,
              disabled: disabled,
            })}
            {editSuperAdmin ? edit() : submit()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
