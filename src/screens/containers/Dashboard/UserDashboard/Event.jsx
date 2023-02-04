import "./../../../../styles/userDashboard.css";

const Event = ({ data }) => {
  console.log(data);
  let date = new Date(data.from);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="ud__event">
      <img
        className="ud__event__thumbnail"
        src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.color-hex.com%2Fpalettes%2F4666.png&sp=1675173524T36d7c9eb670f126ff0d0c62c231f8fd65a4a0f13131f2849c9c1ff52c5cee3d2"
        alt="event thumbnail"
      />
      <div className="ud__event__details">
        <div className="ud__event__title-subtitle">
          <p className="ud__event__badge">{data.category}</p>
          <h3 className="ud__event__title">{data.name}</h3>
          {/* <h4 className="ud__event__subtitle">By ZINE</h4> */}
        </div>
        <div>
          {" "}
          <p className="ud_event_date">
            {" "}
            {date.getDate() +
              " " +
              monthNames[date.getUTCMonth()] +
              "," +
              date.getFullYear()}
          </p>
          <p className="ud_event_date"> {data.time}</p>
        </div>
      </div>
      <button className="ud__event__team-details-button">Team Details</button>
    </div>
  );
};

export default Event;
