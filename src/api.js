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
  const dummy = {
    email: "2021uec1533@mnit.ac.in",
    password: "123456",
    confirmPassword: "123456",
  };
  creds = dummy;
  console.log("Login Called");
  await fetch(`${url}/users`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(dummy),
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
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjYzYjMwM2EyZGJhMGJlNWZlMDE1YTVmOSIsImlhdCI6MTY3Mjc2NTgxMn0.Qnlbq4MgW7B-1zFr3ra0hh9fNkKRWi3mTC9txTSCABI";
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
    body: JSON.stringify(dummy),
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
  const dummy = {
    name: "Second Day",
    detail: "Demo Pass",
    amount: 400,
    eventId: ["63b40575f6d5f6bad291012b"],
  };
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjYzYjMwM2EyZGJhMGJlNWZlMDE1YTVmOSIsImlhdCI6MTY3Mjc2NTgxMn0.Qnlbq4MgW7B-1zFr3ra0hh9fNkKRWi3mTC9txTSCABI";
  passData = dummy;
  console.log("Create PASS Called");
  await fetch(`${url}/passes`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(dummy),
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
