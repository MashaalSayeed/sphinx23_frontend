import Session from "../../../Session";
let profile = Session.getObject("profile") || null;
////console.log(profile);
const initialState = {
  curruser: Session.getObject("profile") ? Session.getObject("profile") : null,
  events: [],
  adminevents: [],
  upcoming: [],
  ongoing: [],
  completed: [],
  updates: [],
  allpasses: [],
  userpasses: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN_REGISTER":
      return { ...state, curruser: payload };
    case "SET_LOADING":
      return { ...state, loading: payload };
    case "LOGOUT":
      return { ...state, curruser: null };
    case "FETCH_EVENTS":
      return { ...state, events: payload };
    case "FETCH_ADMIN_EVENTS":
      return { ...state, adminevents: payload };
    case "ADD_EVENTS":
      return { ...state, events: state.events.concat(payload) };
    case "ADD_PASS":
      return { ...state, allpasses: state.allpasses.concat(payload) };
    case "FETCH_UPCOMING":
      return { ...state, upcoming: payload };
    case "FETCH_COMPLETED":
      return { ...state, completed: payload };
    case "FETCH_UPDATES":
      return { ...state, updates: payload };
    case "FETCH_PASSES":
      return { ...state, allpasses: payload };
    case "USER_PASSES":
      return { ...state, userpasses: payload };

    default:
      return state;
  }
};
