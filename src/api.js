import { json } from "react-router-dom";
import {
  events,
  passes,
  upcoming,
  completed,
  updates,
  loginReg,
  newEvent,
  newPass,
  adminEvents,
} from "./store/modules/auth/auth.action";
const url = "http://localhost:8000";

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
export const fetchAdminEvents = async (token, dispatch) => {
  console.log("AdminEvents Fetched");
  await fetch(`${url}/events/eventadmin`, {
    headers: {
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dispatch(adminEvents(data.events));
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
  console.log(creds);
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
      console.log(data);
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

export const createEvent = async (
  dispatch,
  eventData,
  token,
  setCreateStatus
) => {
  console.log("Create Event Called");
  await fetch(`${url}/events/create`, {
    headers: {
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: eventData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        console.log(data.event);
        dispatch(newEvent(data.event));
        setCreateStatus("posted");
      } else {
        console.log(data.error);
        setCreateStatus("fail");
        // return false;
      }
    })
    .catch((error) => {
      console.log(error);
      setCreateStatus("fail");
      // return false;
    });
};

export const createPass = async (
  dispatch,
  passData,
  token,
  setCreateStatus
) => {
  console.log("Create PASS Called");
  await fetch(`${url}/passes`, {
    headers: {
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: passData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        setCreateStatus("posted");
        console.log(data.message);
      } else {
        setCreateStatus("fail");
        console.log(data.error);
      }
    })
    .catch((error) => {
      setCreateStatus("fail");
      console.log(error);
    });
};

export const getUsersByPass = async (
  passID,
  token,
  currentPage,
  setCurrentRecords,
  setNpage
) => {
  console.log("getUsersByPass");
  await fetch(`${url}/passes/users/${passID}/${currentPage}`, {
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
        setCurrentRecords(data.users);
        setNpage(data.totalPages);
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getResults = ({
  token,
  eventId,
  round,
  setCurrentRecords,
  currentPage,
  setNpage,
}) => {
  console.log("getUsersbyPage");
  fetch(`${url}/participant/results/${eventId}/${round}/${currentPage}`, {
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
        if (data.team) {
          setCurrentRecords(data.team);
          console.log(data.totalPages);
          setNpage(data.totalPages);
          return data.totalPages;
        } else {
          setCurrentRecords(data.team);
          console.log(data.totalPages);
          setNpage(data.totalPages);
          return data.totalPages;
        }
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getUsers = ({
  token,
  setCurrentRecords,
  currentPage,
  setNpage,
}) => {
  console.log("getUsersbyPage");
  fetch(`${url}/users/${currentPage}`, {
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
        if (data.user) {
          setCurrentRecords(data.user);
          console.log(data.totalPages);
          setNpage(data.totalPages);
          return data.totalPages;
        } else {
          setCurrentRecords(data.users);
          console.log(data.totalPages);
          setNpage(data.totalPages);
          return data.totalPages;
        }
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAmbassadors = ({
  token,
  setCurrentRecords,
  currentPage,
  setNpage,
}) => {
  console.log("get ambassadors");
  fetch(`${url}/ambassadors/${currentPage}`, {
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
        setCurrentRecords(data.ambassador);
        setNpage(data.totalPages);
      } else {
        console.log(data.error);
        setCurrentRecords([]);
        console.log(data.totalPages);
        setNpage(data.totalPages);
      }
    })
    .catch((error) => {
      console.log(error);
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

export const getUsersId = (token, email, setIds) => {
  fetch(`${url}/users/validatemail/${email}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data.id);
        setIds((prevState) => [...prevState, data.id]);
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateEvent = async (
  eventId,
  eventData,
  token,
  setCreateStatus
) => {
  console.log("Update Event Called");
  console.log(eventData);
  await fetch(`${url}/events/update/${eventId}`, {
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "PUT",
    body: JSON.stringify(eventData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        console.log(data.event);
        setCreateStatus("posted");
      } else {
        console.log(data.error);
        setCreateStatus("fail");
        // return false;
      }
    })
    .catch((error) => {
      console.log(error);
      setCreateStatus("fail");
      // return false;
    });
};

export const updatePass = async (passId, passData, token, setCreateStatus) => {
  console.log("Update PASS Called");
  await fetch(`${url}/passes/${passId}`, {
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "PUT",
    body: JSON.stringify(passData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        setCreateStatus("posted");
        console.log(data.message);
      } else {
        setCreateStatus("fail");
        console.log(data.error);
      }
    })
    .catch((error) => {
      setCreateStatus("fail");
      console.log(error);
    });
};

export const getTeamsByEvent = async (
  eventId,
  token,
  currentPage,
  setCurrentRecords,
  setNpage
) => {
  console.log("getTeamsByEvent");
  await fetch(`${url}/participant/teams/${eventId}/${currentPage}`, {
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
        setCurrentRecords(data.team);
        setNpage(data.totalPages);
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
