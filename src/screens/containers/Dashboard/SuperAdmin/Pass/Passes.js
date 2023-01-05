import { PassData } from "./PassData";
import PassCard from "./PassCard";
import vector from "../../../../../images/Vector.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Passes() {
  const passes = useSelector((state) => state.auth.allpasses);
  console.log(passes);
  const passCardElements = passes.map((onePass, i) => {
    return (
      <Link to={"superAdmin/pass/" + onePass.name}>
        <PassCard key={i} image={onePass.imageUrl} />
      </Link>
    );
  });
  return (
    <div className="desktop26-main">
      <div className="desktop26-head">
        <h3>Passes</h3>
        <button className="desktop26-btn desktop26-create-btn">
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
