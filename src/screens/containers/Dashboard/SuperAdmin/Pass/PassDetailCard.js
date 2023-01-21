import { useState } from "react";
import { useSelector } from "react-redux";
import edit_img from "../../../../../images/edit.png";
import PassForm from "./PassForm";
export default function PassDetailCard(props) {
  const { pass } = props;
  const [edit, setEdit] = useState(false);
  const events = useSelector((state) => state.auth.events);
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

      <p className="passDetailCard-p">
        <h4>Amount:{pass.amount}</h4>
        <br></br>
        {pass.eventId.map((item, index) => {
          console.log(item);
        })}
        {pass.detail}
      </p>
    </div>
  );
}
