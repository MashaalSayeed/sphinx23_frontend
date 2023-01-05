import { passDetailData } from "./Data";
export default function PassDetailCard(props) {
  const { pass } = props;
  return (
    <div className="passDetailCard-main">
      <img className="passDetailCard-img" src={pass.imageUrl}></img>
      <p className="passDetailCard-p">{pass.detail}</p>
    </div>
  );
}
