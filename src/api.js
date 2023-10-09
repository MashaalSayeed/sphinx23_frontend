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
import { toast } from "react-toastify";

// const url = "http://localhost:8000/api";
// const url = "https://sphinx-backend.onrender.com/api";
const url = "https://sphinx-372511.de.r.appspot.com/api";

export const fetchEvents = async (dispatch) => {
  ////console.log("Events Fetched");
  await fetch(`${url}/events`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(events(data.events));
    })
    .catch((err) => {
      throw err;
    });
};
export const editUser = async (body) => {
  ////console.log("Edit Called");

  let token = Session.getObject("profile").token;
  ////console.log(token);
  let id = Session.getObject("profile").profile._id;
  //console.log(body);
  return fetch(`${url}/users/${id}`, {
    method: "PUT",
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        let profile = Session.getObject("profile");
        profile.profile.isAmbassador = true;
        Session.setObject("profile", profile);
        ////console.log(profile);
        return data.success;
      }
      throw data;
    })
    .catch((err) => {
      throw err;
    });
};
export const logout = async () => {
  ////console.log("Events Fetched");
  let token = Session.get("profile").token;
  return fetch(`${url}/users/logout`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.success;
      throw data;
    })
    .catch((err) => {
      throw err;
    });
};
export const fetchEventsByCategory = async (category) => {
  //console.log(category);
  return fetch(`${url}/events/category/${category}`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.events;
      throw data;
    })
    .catch((err) => {
      throw err;
    });
};
export const fetchAdminEvents = async (token, dispatch) => {
  ////console.log("AdminEvents Fetched");
  return fetch(`${url}/events/eventadmin`, {
    headers: {
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      ////console.log(data);

      dispatch(adminEvents(data.events));
      return data.events;
    })
    .catch((err) => {
      throw err;
    });
};
export const fetchRegisteredEvents = async (token) => {
  ////console.log("AdminEvents Fetched", Session.get("profile").token);
  return fetch(`${url}/events/registeredEvents`, {
    headers: {
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      ////console.log(data.events);

      return data.events;
    })
    .catch((err) => {
      throw err;
    });
};
export const fetchUserQueries = async (token) => {
  ////console.log("AdminEvents Fetched", Session.get("profile").token);
  return fetch(`${url}/queries/uid`, {
    headers: {
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      ////console.log(data.queries);

      return data.queries;
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchUpcoming = async (dispatch) => {
  ////console.log("upcoming Fetched");
  await fetch(`${url}/events/upcoming`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(upcoming(data.events));
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchCompleted = async (dispatch) => {
  ////console.log("Completed Fetched");
  await fetch(`${url}/events/completed`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(completed(data.events));
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchUpdates = async (dispatch) => {
  ////console.log("Updates Fetched");
  await fetch(`${url}/events/updates`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(updates(data.updates));
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchPasses = async (dispatch) => {
  ////console.log("Passes Fetched");
  await fetch(`${url}/passes`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(passes(data.pass));
    })
    .catch((err) => {
      throw err;
    });
};
export const createEventPaymentRequest = async (body) => {
  ////console.log("Event Fetched", body.userList);
  return fetch(`${url}/payment/event`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + Session.getObject("profile").token,
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // setEvent(data.event);
        ////console.log(data);
        return data;
      }
      throw data;
    })
    .catch((err) => {
      throw err;
    });
};
export const createPassPaymentRequest = async (body) => {
  ////console.log("Event Fetched", body.userList);
  return fetch(`${url}/payment/pass`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + Session.getObject("profile").token,
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error != undefined) {
        toast.error(data.error);
        return;
      }

      return data;
      //console.log(data);
      // throw data;
    })
    .catch((err) => {
      toast.error(err.code);
      // //console.log(err);
      // throw err;
    });
};

export const addPassToUser = async (body, signature, onePass, setCurr) => {
  ////console.log("Event Fetched", body.userList);
  return fetch(`${url}/passes/user`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + Session.getObject("profile").token,
      "x-razorpay-signature": signature,
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      if (response.status == 400) {
        toast.error(response.statusText);
        toast.error(response.text);
      }
      if (response.status === 401) toast.error(response.json());
      return response.json();
    })
    .then((data) => {
      if (data.error != undefined) {
        toast.error(data.error);
        return;
      }
      if (data.success != undefined) {
        toast.success("Pass Added to Your Profile.");
        let prof = Session.getObject("profile");
        prof.profile.passes.push(onePass);
        //console.log(prof);
        setCurr(prof);
        Session.setObject("profile", prof);
        return data;
      }
      return data;
      //console.log(data);
      // throw data;
    })
    .catch((err) => {
      toast.error(err.code);
      // //console.log(err);
      // throw err;
    });
};

export const registerForEvent = async (signature, body) => {
  ////console.log("Event Fetched");
  return fetch(`${url}/events/register`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + Session.getObject("profile").token,
      "x-razorpay-signature": signature,
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // setEvent(data.event);
        ////console.log(data);
        return data.success;
      }
      throw data;
    })
    .catch((err) => {
      throw err;
    });
};
export const fetchOneEvent = async (setEvent, eventId) => {
  ////console.log("Event Fetched");
  return fetch(`${url}/events/${eventId}`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setEvent(data.event);
        ////console.log(data);
        return data.event;
      }
      throw data;
    })
    .catch((err) => {
      throw err;
    });
};
export const fetchOnePass = async (setPass, passId) => {
  ////console.log("Pass Fetched", passId);
  await fetch(`${url}/passes/${passId}`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      ////console.log(data.pass);
      setPass(data.pass);
    })
    .catch((err) => {
      throw err;
    });
};
export const verifyMailOTP = async (body) => {
  ////console.log(Session.getObject("profile").token);
  ////console.log(body);
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
      ////console.log(data);
      if (data.success) {
        ////console.log(data);
        let profile = Session.getObject("profile");
        profile.profile = data.profile;
        ////console.log(profile);
        Session.setObject("profile", profile);
        Session.remove("time");
        return data.success;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // ////console.log(error);
    });
};

export const verifyMobileOTP = async (body) => {
  ////console.log(Session.getObject("profile").token);
  ////console.log(body);
  await fetch(`${url}/verification/verifyMobileOTP`, {
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
      ////console.log(data);
      if (data.success) {
        ////console.log(data);
        let profile = Session.getObject("profile");
        profile.profile = data.profile;
        ////console.log(profile);
        Session.setObject("profile", profile);
        Session.remove("time");
        return data.success;
      } else {
        throw data;
      }
    })
    .catch((error) => {
      ////console.log("ERROR");
      throw error;
      // window.location.href = "/";
      // ////console.log(error);
    });
};
export const sendMobileOTP = async (data) => {
  ////console.log(Session.getObject("profile").token);

  await fetch(`${url}/verification/sendMobileOTP`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      ////console.log(data);
      if (data.success) {
        Session.set("time", data.time);
        return data.time;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // ////console.log(error);
    });
};

export const sendForgotOTP = async (body) => {
  // ////console.log(Session.getObject("profile").token);
  ////console.log(body);
  return fetch(`${url}/verification/sendForgotOTP`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      // Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      ////console.log(data);
      if (data.success) {
        // Session.set("time", data.time);
        return data.time;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // ////console.log(error);
    });
};

export const resetPassword = async (body) => {
  ////console.log(Session.getObject("profile").token);

  return fetch(`${url}/verification/resetPassword`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      // Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      ////console.log(data);
      if (data.success) {
        return data.success;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // ////console.log(error);
    });
};
export const verifyForgotOTP = async (body) => {
  ////console.log(Session.getObject("profile").token);
  // //console.log("FOrhot");
  return fetch(`${url}/verification/verifyForgotOTP`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      // Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      ////console.log(data);
      if (data.success) {
        return data.token;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // ////console.log(error);
    });
};
export const sendVerificationMail = async () => {
  ////console.log(Session.getObject("profile").token);

  return fetch(`${url}/verification/sendEmailOTP`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      ////console.log(data);
      if (data.success) {
        Session.set("time", data.time);
        return data.time;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // ////console.log(error);
    });
};

export const loginRegister = async (dispatch, creds) => {
  ////console.log("Login Called");
  ////console.log(creds);
  return fetch(`${url}/users`, {
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
      ////console.log(data);
      if (data.success) {
        const profile = { token: data.token, profile: data.profile };
        ////console.log(data.success);
        dispatch(loginReg(profile));
        return data;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // ////console.log(error);
    });
};

export const createEvent = async (dispatch, eventData, token) => {
  ////console.log("Create Event Called", token);
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
      if (data.success) {
        ////console.log(data.event);
        dispatch(newEvent(data.event));
        return data;
      } else {
        throw data;
        // return false;
      }
    })
    .catch((error) => {
      throw error;

      // return false;
    });
};

export const addTeamsToRound = async (token, body) => {
  ////console.log("Create PASS Called");
  // ////console.log(data.event);
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
      if (data.success) {
        ////console.log(data);
        // alert(data.success);
        window.location.href = "/eventDetails/event/" + body.event + "/2";
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const addResults = async (token, body) => {
  ////console.log("Add Results Called");
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
      if (data.success) {
        ////console.log(data);
        // alert(data.success);
        window.location.href = "/eventDetails/event/" + body.event + "/2";
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const createPass = async (
  dispatch,
  passData,
  token,
  setCreateStatus
) => {
  ////console.log("Create PASS Called");
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
      ////console.log(data);
      if (data.success) {
        // alert(data.success);
        return data.success;
      } else {
        throw data;
      }
    })
    .catch((error) => {
      ////console.log("PAss", error);
      throw error;
    });
};

export const submitQuery = async (token, body) => {
  ////console.log("getUsersByPass");
  return fetch(`${url}/queries/create`, {
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
      if (data.success) {
        // alert(data.message);
        return data.success;
      } else {
        throw data;
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const submitQueryResponse = async (token, body) => {
  ////console.log("getUsersByPass");
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
      if (data.success) {
        // alert(data.message);
        return data;
      } else {
        throw data;
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const getUsersByPass = async (
  passID,
  token,
  currentPage,
  setCurrentRecords,
  setNpage
) => {
  ////console.log("getUsersByPass");
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
      if (data.success) {
        ////console.log(data.users);
        setCurrentRecords(data.users);
        setNpage(data.totalPages);
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const getAllResults = (eventId) => {
  ////console.log("getUsersbyPage");
  return fetch(`${url}/participant/resultsAll/${eventId}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",

      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        ////console.log(data);
        if (data.team) {
          return data.team;
        }
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const getUpdatesForEvent = (eventId) => {
  ////console.log("getUsersbyPage");
  return fetch(`${url}/events/updatesEvent/${eventId}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",

      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        ////console.log(data);

        return data.updates;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
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
  ////console.log("getUsersbyPage");
  return fetch(
    `${url}/participant/results/${eventId}/${round}/${currentPage}`,
    {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        ////console.log(data);
        if (data.team) {
          setCurrentRecords(data.team);
          ////console.log(data.totalPages);
          setNpage(data.totalPages);
          return data.team;
        }
      }
    })
    .catch((error) => {
      throw error;
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
  ////console.log("getUsersbyPage", token);
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
      ////console.log(data);
      if (data.queries) {
        dispatch(loading(true));
        setCurrentRecords(data.queries);
        ////console.log(status, currentPage, data.queries);
        setNpage(data.totalPages);
        dispatch(loading(false));
        return data.totalPages;
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const getUsers = ({
  token,
  setCurrentRecords,
  currentPage,
  setNpage,
  setCount,
  setValid,
  sortType
}) => {
  ////console.log("getUsersbyPage");
  fetch(`${url}/users/${currentPage}/${sortType}`, {
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
        ////console.log(data);
        if (data.users) {
          setCurrentRecords(data.users);
          setCount(data.count);
          setCount(data.validC);
          ////console.log(data.totalPages);
          setNpage(data.totalPages);
          return data.totalPages;
        }
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const getAmbassadors = ({
  token,
  setCurrentRecords,
  currentPage,
  setNpage,
}) => {
  ////console.log("get ambassadors");
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
      if (data.success) {
        ////console.log(data.success);
        ////console.log(data);
        //console.log(data);
        setCurrentRecords(data.ambassador);
        setNpage(data.totalPages);
        return data.success;
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const getPayments = (token, setPayments) => {
  ////console.log("getUsers");
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
      if (data.success) {
        ////console.log(data.message);
        setPayments(data.payments);
      }
    })
    .catch((error) => {
      setPayments([]);
      throw error;
    });
};

export const getUsersId = async (token, email, setIds) => {
  return fetch(`${url}/users/validatemail/${email}`, {
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
        ////console.log(data.id);
        // ////console.log(setIds);
        // ////console.log(setIds);
        setIds((prevState) => [...prevState, data.id]);
        return data.id;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // ////console.log(error);
    });
  // return userData;
};

export const isValidAmbassador = async (token, code, setIds) => {
  return fetch(`${url}/users/validateambassador/${code}`, {
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
        ////console.log(data.id);
        // ////console.log(setIds);
        // ////console.log(setIds);
        setIds((prevState) => [...prevState, data.id]);
        return data.id;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // ////console.log(error);
    });
  // return userData;
};

export const updateEvent = async (
  eventId,
  eventData,
  token,
  setCreateStatus
) => {
  ////console.log("Update Event Called");
  ////console.log(eventData);
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
      if (data.success) {
        return data.success;
        // alert(data.success);
      } else {
        throw data;
      }
    })
    .catch((error) => {
      throw error;
      // return false;
    });
};

export const updatePass = async (passId, passData, token) => {
  ////console.log("Update PASS Called");
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
      if (data.success) {
        return data.pass;
      } else {
        throw data;
      }
    })
    .catch((error) => {
      throw error;
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
  ////console.log(eventId, profile.profile.token);
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
      if (data.success) {
        ////console.log(data);
        setCurrentRecords(data.team);
        setNpage(data.totalPages);
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const getUniqueId = (x) => {
  const digs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const base = digs.length;
  let sign;
  if (x < 0) {
    sign = -1;
  } else if (x === 0) {
    return digs[0];
  } else {
    sign = 1;
  }

  x *= sign;
  const digits = [];

  while (x) {
    digits.push(digs[x % base]);
    x = Math.floor(x / base);
  }

  if (sign < 0) digits.push("-");

  digits.reverse();
  return digits.join("");
};
