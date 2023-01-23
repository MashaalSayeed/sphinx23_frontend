import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";

function TeamTab() {
  const adminEvents = useSelector((state) => state.auth.adminevents);
  const [team, setTeam] = useState([]);
  useEffect(() => {
    window.history.pushState(null, "Admin Events", "/eventAdmin/3");

    adminEvents.forEach((event) => {
      event.coordinators.forEach((coordinator) => {
        coordinator.event = event.name;
        console.log(coordinator);
        setTeam((state) => [...state, coordinator]);
      });
    });
  }, []);
  console.log(team);
  // const teams = [
  //   {
  //     name: "Rupesh yadav",
  //     post: "Event Organiser",
  //     imgUrl:
  //       "https://media.licdn.com/dms/image/D4D03AQFnaeb4IzqasQ/profile-displayphoto-shrink_100_100/0/1669526446412?e=1678320000&v=beta&t=IXuJo78eBrYlw-dZqZ_EAIp1RxGugTYi7UvXrRQM6eY",
  //   },
  //   {
  //     name: "Harshit sandilya",
  //     post: "Event Organiser",
  //     imgUrl:
  //       "https://media.licdn.com/dms/image/C5603AQFbXmjYtnK0jQ/profile-displayphoto-shrink_100_100/0/1645708565518?e=1678320000&v=beta&t=REnncv8IPn1PFgf5RTlkdXoxav0jk-o1NDBkXyFfnoE",
  //   },
  //   {
  //     name: "Abhishek Yadav",
  //     post: "Event Cordinator",
  //     imgUrl:
  //       "https://media.licdn.com/dms/image/C5603AQFbXmjYtnK0jQ/profile-displayphoto-shrink_100_100/0/1645708565518?e=1678320000&v=beta&t=REnncv8IPn1PFgf5RTlkdXoxav0jk-o1NDBkXyFfnoE",
  //   },
  //   {
  //     name: "Abhishek Yadav",
  //     post: "Event Cordinator",
  //     imgUrl:
  //       "https://media.licdn.com/dms/image/C5603AQFbXmjYtnK0jQ/profile-displayphoto-shrink_100_100/0/1645708565518?e=1678320000&v=beta&t=REnncv8IPn1PFgf5RTlkdXoxav0jk-o1NDBkXyFfnoE",
  //   },
  //   {
  //     name: "Abhishek Yadav",
  //     post: "Event Cordinator",
  //     imgUrl:
  //       "https://media.licdn.com/dms/image/C5603AQFbXmjYtnK0jQ/profile-displayphoto-shrink_100_100/0/1645708565518?e=1678320000&v=beta&t=REnncv8IPn1PFgf5RTlkdXoxav0jk-o1NDBkXyFfnoE",
  //   },
  //   {
  //     name: "Abhishek Yadav",
  //     post: "Event Cordinator",
  //     imgUrl:
  //       "https://media.licdn.com/dms/image/C5603AQFbXmjYtnK0jQ/profile-displayphoto-shrink_100_100/0/1645708565518?e=1678320000&v=beta&t=REnncv8IPn1PFgf5RTlkdXoxav0jk-o1NDBkXyFfnoE",
  //   },
  //   {
  //     name: "Abhishek Yadav",
  //     post: "Event Cordinator",
  //     imgUrl:
  //       "https://media.licdn.com/dms/image/C5603AQFbXmjYtnK0jQ/profile-displayphoto-shrink_100_100/0/1645708565518?e=1678320000&v=beta&t=REnncv8IPn1PFgf5RTlkdXoxav0jk-o1NDBkXyFfnoE",
  //   },
  // ];
  return (
    <div className="teamTab-main">
      <div className="teamTab-heading">
        <h2>Teams</h2>
      </div>
      <div className="teamTab-main-element">
        {team.map((opt, i) => (
          <div className="Team-frame" key={i}>
            <img
              className="team-member-img"
              src="https://media.licdn.com/dms/image/C5603AQFbXmjYtnK0jQ/profile-displayphoto-shrink_100_100/0/1645708565518?e=1678320000&v=beta&t=REnncv8IPn1PFgf5RTlkdXoxav0jk-o1NDBkXyFfnoE"
            ></img>
            <div className="team-member-post">
              <h3>{opt.name}</h3>
              <p>{opt.event}</p>
              <p>{opt.phoneNumber}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="teamtab-addIcon">
        {/* <Fab
          style={{ marginTop: 300, marginLeft: 500 }}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab> */}
      </div>
    </div>
  );
}

export default TeamTab;
