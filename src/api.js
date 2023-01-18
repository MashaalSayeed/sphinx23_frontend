import { Widgets } from "@mui/icons-material";
import { json } from "react-router-dom";
import { useSelector } from "react-redux";
import Session from "./Session";
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
  loading,
} from "./store/modules/auth/auth.action";
import { queries } from "@testing-library/react";
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
export const fetchOneEvent = async (setEvent, eventId) => {
  console.log("Event Fetched");
  await fetch(`${url}/events/${eventId}`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setEvent(data.event);
    });
};
export const verifyMailOTP = async (body) => {
  console.log(Session.getObject("profile").token);
  console.log(body);
  await fetch(`${url}/verification/verifyEmailOTP`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        console.log(data);
        return data.success;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // console.log(error);
    });
};
export const sendVerificationMail = async () => {
  console.log(Session.getObject("profile").token);

  await fetch(`${url}/verification/sendEmailOTP`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        Session.set("time", data.time);
        return data.time;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // console.log(error);
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
        console.log(data.success);
        dispatch(loginReg(profile));
        return data.success;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // console.log(error);
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

export const addTeamsToRound = async (token, body) => {
  console.log("Create PASS Called");
  // console.log(data.event);
  await fetch(`${url}/events/edit_result`, {
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        console.log(data);
        alert(data.message);
        window.location.href = "/eventDetails/event/" + body.event;
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};
export const addResults = async (token, body) => {
  console.log("Add Results Called");
  await fetch(`${url}/events/add_result`, {
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        console.log(data);
        alert(data.message);
        window.location.href = "/eventDetails/event/" + body.event;
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      alert(error.message);
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
export const submitQueryResponse = async (token, body) => {
  console.log("getUsersByPass");
  await fetch(`${url}/queries/update`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == null) {
        alert(data.message);
      } else {
        console.log(data.error);
        alert(data.error);
      }
    })
    .catch((error) => {
      alert(error.message);
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
export const getQueriesByEvent = ({
  token,
  dispatch,
  tabActive,
  setCurrentRecords,
  currentPage,
  setNpage,
}) => {
  let status;
  if (tabActive == "Pending Complaints") {
    status = 0;
  } else if (tabActive == "Approved Complaints") {
    status = 1;
  } else {
    status = 2;
  }
  console.log("getUsersbyPage", token);
  fetch(`${url}/queries/eid/${currentPage}/${status}`, {
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
        if (data.queries) {
          dispatch(loading(true));
          setCurrentRecords(data.queries);
          console.log(status, currentPage, data.queries);
          setNpage(data.totalPages);
          dispatch(loading(false));
          return data.totalPages;
        } else {
          setCurrentRecords(data.queries);
          console.log(data.totalPages);
          setNpage(data.totalPages);
        }
      } else {
        console.log(data.error);
        alert(data.error.message);
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
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
        console.log(data);
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
  let profile = Session.getObject("profile");
  console.log(eventId, profile.profile.token);
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
