import { useSelector } from "react-redux";
export default function PassDetailCard(props) {
  const { pass } = props;
  const events = useSelector((state) => state.auth.events);
  return (
    <div className="passDetailCard-main">
      <img className="passDetailCard-img" src={pass.imageUrl}></img>

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
