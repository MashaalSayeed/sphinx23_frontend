import edit from "../../../images/edit.png";

export default function AboutSection(props) {
  const { event } = props;
  return (
    <div className="aboutSection">
      <div className="aboutSec-img-btn">
        <div className="about-content">
          <img src={event.imageUrl} className="aboutSec-img" />
          <div className="event-mainDetials">
            <h3>Category: {event.category}</h3>
            <h3>From: {event.from.split("T")[0]}</h3>
            <h3>To: {event.to.split("T")[0]} </h3>
            <h3>Location: {event.location} </h3>
            <h3>Amount: {event.amount} </h3>
            <h3>
              Team Size: {event.minTeamSize} - {event.maxTeamSize}{" "}
            </h3>
          </div>
        </div>

        <button className="desktop14-edit-btn">
          <div className="desktop14-btn-inner">
            <div>
              <img src={edit}></img>
            </div>
            <p>Edit</p>
          </div>
        </button>
      </div>

      <p className="aboutSec-p">{event.description}</p>
    </div>
  );
}
