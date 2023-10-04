import PassCard from "./PassCard";
import vector from "../../../../../images/Vector.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import PassForm from "./PassForm";
export default function Passes() {
  const passes = useSelector((state) => state.auth.allpasses);
  ////console.log(passes);
  const [createPassBool, setCreate] = useState(false);
  const passCardElements = passes.map((onePass, i) => {
    return (
      <Link to={"pass/" + onePass._id}>
        <PassCard
          key={onePass._id}
          image={onePass.imageUrl}
          name={onePass.name}
        />
      </Link>
    );
  });
  return (
    <div className="desktop26-main">
      {createPassBool == true ? <PassForm setCreate={setCreate} /> : <></>}
      <div className="desktop26-head">
        <h3>Passes</h3>
        <button
          className="desktop26-btn desktop26-create-btn"
          onClick={() => {
            setCreate(true);
          }}
        >
          <div className="desktop26-btn-inner">
            <img src={vector}></img>
            <p>Create Pass</p>
          </div>
        </button>
      </div>

      {/* <div className="desktop24-border"></div> */}
      <div className="desktop26-Passes">{passCardElements}</div>
    </div>
  );
}
