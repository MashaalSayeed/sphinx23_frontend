import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import edit_img from "../../../../../images/edit.png";
import PassForm from "./PassForm";
import { fetchEvents } from "../../../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function PassDetailCard(props) {
  const { pass } = props;
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
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
  ////console.log(pass);
  // useEffect(() => {
  //   fetchEvents(dispatch)
  //     .then((res) => {
  //       ////console.log("Events Fetched");
  //     })
  //     .catch((err) => {
  //       toast.error(err, toastStyle);
  //       // alert(err);
  //     });
  // }, []);
  // const events = useSelector((state) => state.auth.events);
  return (
    <div className="passDetailCard-main">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img className="passDetailCard-img" src={pass.imageUrl}></img>
        {edit == true ? (
          <PassForm setCreate={setEdit} edit={true} currpass={pass} />
        ) : (
          <></>
        )}
        <button
          className="desktop14-edit-btn"
          onClick={() => {
            setEdit(true);
          }}
          style={{ marginTop: "30px" }}
        >
          <div className="desktop14-btn-inner">
            <div style={{ display: "flex" }}>
              <img src={edit_img} style={{ margin: "auto" }}></img>
            </div>
            <p>Edit</p>
          </div>
        </button>
      </div>

      <p className="passDetailCard-p" style={{ padding: "10px" }}>
        <h4>Amount:{pass.amount}</h4>
        <br></br>
        {pass.detail}
        <br></br>
        <ul>
          <h4>Events Covered are:</h4>
          {pass.eventId.map((item, index) => {
            ////console.log(item);
            {
              /* const a = events.find((x) => x._id == item); */
            }
            return (
              <li>
                {item["name"]} <br></br>{" "}
              </li>
            );
          })}
        </ul>
        <br></br>
      </p>
    </div>
  );
}
