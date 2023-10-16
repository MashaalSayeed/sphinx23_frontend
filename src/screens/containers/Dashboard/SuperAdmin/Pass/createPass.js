import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { storage } from "../../../../../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";
import { createPass } from "../../../../../api";

function CreatePass() {
  const currUser = useSelector((state) => state.auth.curruser.profile);
  const token = useSelector((state) => state.auth.curruser.token);

  const events = useSelector((state) => state.auth.events);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [err, seterr] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const [PassData, setPassData] = useState({
    name: "First Day",
    amount: 0,
    detail: null,
    imageUrl: null,
    eventId: [],
  });

  const [checkedState, setCheckedState] = useState(
    new Array(events.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const onCoverUpload = async () => {
    const file = document.getElementById("pass-img");
    ////console.log("upload image");
    const new_Arr = [];
    checkedState.map((item, index) => {
      ////console.log(item);
      if (item) {
        ////console.log(events[index]._id);
        new_Arr.push(events[index]._id);
      }
    });
    setPassData({
      ...PassData,
      eventId: new_Arr,
    });

    // if (file != null && file.files.length > 0) {
    //   const storageRef = ref(storage, `passes/${file.files[0].lastModified}`);
    //   const uploadTask = uploadBytesResumable(storageRef, file.files[0]).then(
    //     () => {
    //       getDownloadURL(storageRef).then(async (downloadURL) => {
    //         ////console.log(downloadURL);
    //         setPassData({ ...PassData, imageUrl: downloadURL });
    //         handleSubmit(downloadURL);
    //       });
    //     }
    //   );
    // } else {
    //   seterr("Please Select Pass Cover");
    // }
  };

  const handleSubmit = async (downloadURL) => {
    ////console.log(downloadURL);
    seterr(null);
    if (PassData.amount <= 0) seterr("Amount Not Valid");
    else if (PassData.name == null) seterr("Pass Name Cannot be Null");
    else if (PassData.detail == null) seterr("Details Cannot be Null");
    else if (PassData.imageUrl == null) {
      ////console.log(PassData.eventId);
      ////console.log(PassData);
      seterr("Upload Failed Please Try Again");
    } else {
      ////console.log(PassData);
      seterr(null);
      seterr("Success");
    }
  };
  ////console.log(PassData);
  return (
    <div className="passDetailCard-main">
      <div className="space-top"></div>
      {currUser != null && currUser.type == "superAdmin" ? (
        <div className="createPass">
          <h3 className="desktop27-head">
            <form>
              <select
                onChange={(event) =>
                  setPassData({ ...PassData, name: event.target.value })
                }
                value={PassData.name}
              >
                <option value="First Day">First Day</option>
                <option value="Second Day">Second Day</option>
                <option value="Third Day">Third Day</option>
                <option value="Golden Pass">Golden Pass</option>
                <option value="Platinum Pass">Platinum Pass</option>
                <option value="School Pass">School Pass</option>
              </select>
            </form>
          </h3>
          {image != null ? (
            <img src={image} className="createPass-img" alt="preview image" />
          ) : (
            <></>
          )}
          <input type="file" onChange={onImageChange} id="pass-img" hidden />
          <label for="pass-img" className="creatPass-upload">
            Upload Pass Cover
          </label>

          <input
            type="number"
            className="createPass-amount"
            placeholder="Amount (INR)"
            onChange={(e) => {
              setPassData({ ...PassData, amount: e.target.valueAsNumber });
            }}
          />
          <div className="createPass-Add-event">
            <h4 className="add_event-title">Add Events</h4>
            <ul className="events-list">
              {events.map((event, index) => {
                return (
                  <li key={event._id}>
                    <div className="events-list-item">
                      <img className="Ecard-img" src={event.imageUrl}></img>

                      <div className="checkbox-pass">
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={event.name}
                          value={event.name}
                          checked={checkedState[index]}
                          onChange={() => handleOnChange(index)}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>
                          {event.name}
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <textarea
            className="createPass-details"
            onChange={(e) => {
              setPassData({ ...PassData, detail: e.target.value });
            }}
            placeholder="Pass Details"
          ></textarea>

          <button className="creatPass-upload" onClick={onCoverUpload}>
            Submit
          </button>
          {err != null ? <>{err}</> : <></>}
        </div>
      ) : (
        <>NOT ALLOWED</>
      )}
    </div>
  );
}

export default CreatePass;
