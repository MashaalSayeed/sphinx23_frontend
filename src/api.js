import {
  events,
  passes,
  upcoming,
  completed,
  updates,
  loginReg,
  newEvent,
  newPass,
} from "./store/modules/auth/auth.action";
const url = "http://192.168.56.1:8000";

export const fetchEvents = async (dispatch) => {
  console.log("Events Fetched");
  await fetch(`${url}/events`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(events(data.events));
    });
};

export const fetchUpcoming = async (dispatch) => {
  console.log("upcoming Fetched");
  await fetch(`${url}/events/upcoming`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(upcoming(data.events));
    });
};

export const fetchCompleted = async (dispatch) => {
  console.log("Completed Fetched");
  await fetch(`${url}/events/completed`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(completed(data.events));
    });
};

export const fetchUpdates = async (dispatch) => {
  console.log("Updates Fetched");
  await fetch(`${url}/events/updates`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(updates(data.updates));
    });
};

export const fetchPasses = async (dispatch) => {
  console.log("Passes Fetched");
  await fetch(`${url}/passes`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(passes(data.pass));
    });
};

export const loginRegister = async (dispatch, creds) => {
  console.log("Login Called");
  await fetch(`${url}/users`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(creds),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const profile = { token: data.token, profile: data.profile };
        console.log(profile);
        dispatch(loginReg(profile));
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      console.log("Login Failed");
    });
};

export const createEvent = async (dispatch, eventData, token) => {
  const dummy = {
    name: "New Show",
    description: "this is going to be the best",
    category: "Cultural",
    from: "2023-03-09",
    to: "2023-03-12",
    location: "OAT",
    coordinators: ["63b44e39d5788fb1946061bd"],
    admin: "63b44e39d5788fb1946061bd",
    updates: [{ message: "Coming Soon...." }],
    status: 1,
    ended: false,
    amount: 1200,
    freeForMNIT: true,
    minTeamSize: 2,
    maxTeamSize: 4,
  };
  eventData = dummy;
  console.log("Create Event Called");
  await fetch(`${url}/events/create`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(eventData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        console.log(data.event);
        dispatch(newEvent(data.event));
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createPass = async (dispatch, passData, token) => {
  console.log("Create PASS Called");
  await fetch(`${url}/passes`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(passData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        console.log(data.message);
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUsersByPass = async (passID, token, setUsersByPass) => {
  console.log("getUsersByPass");
  await fetch(`${url}/passes/users/${passID}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        console.log(data.users);
        setUsersByPass(data.users);
      } else {
        console.log(data.error);
        setUsersByPass([]);
      }
    })
    .catch((error) => {
      console.log(error);
      setUsersByPass([]);
    });
};

export const getUsers = (userID, token, setUsers) => {
  console.log("getUsers");
  fetch(`${url}/users/${userID}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        console.log(data);
        if (data.user) setUsers(data.user);
        else {
          setUsers(data.users);
        }
      } else {
        console.log(data.error);
        setUsers([]);
      }
    })
    .catch((error) => {
      console.log(error);
      setUsers([]);
    });
};

export const getAmbassadors = (token, setAmbassadors) => {
  console.log("getUsers");
  fetch(`${url}/ambassadors`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        console.log(data.success);
        setAmbassadors(data.ambassador);
      } else {
        console.log(data.error);
        setAmbassadors([]);
      }
    })
    .catch((error) => {
      console.log(error);
      setAmbassadors([]);
    });
};

export const getPayments = (token, setPayments) => {
  console.log("getUsers");
  fetch(`${url}/payment/userby`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        console.log(data.message);
        setPayments(data.payments);
      } else {
        console.log(data.error);
        setPayments([]);
      }
    })
    .catch((error) => {
      console.log(error);
      setPayments([]);
    });
};
