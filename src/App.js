import "./App.css";
import Navbar from "./screens/components/Navbar";
import { useEffect } from "react";
import DashboardSuperAdmin from "./screens/containers/Dashboard/SuperAdmin/DashboardSuperAdmin";
import {
  fetchEvents,
  fetchPasses,
  fetchUpcoming,
  fetchCompleted,
  fetchUpdates,
  loginRegister,
  createEvent,
  createPass,
  getUsersByPass,
  getUsers,
} from "./api";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./screens/components/Footer";

function App() {
  // const token1 =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjYzYjMwM2EyZGJhMGJlNWZlMDE1YTVmOSIsImlhdCI6MTY3MjY3NzI3Nn0.B6QG9trZX_tXQ_Bx3-hBMVn96Xz2I4vqzeeVSOT_VRc";
  const creds = {
    email: "2021uec1533@mnit.ac.in",
    password: "123456",
    confirmPassword: "123456",
  };
  const dispatch = useDispatch();
  // fetchEvents(dispatch);
  // loginRegister(dispatch, creds);

  useEffect(() => {
    loginRegister(dispatch, creds);
    fetchEvents(dispatch);
    fetchPasses(dispatch);
    fetchUpcoming(dispatch);
    fetchCompleted(dispatch);
    fetchUpdates(dispatch);
  }, []);

  const curruser = useSelector((state) => state.auth.curruser);
  // createEvent(dispatch, {}, {});
  // createPass(dispatch, {}, {});
  // console.log(getUsersByPass({}, {}));
  // console.log(getUsers("", token1));

  return (
    <div className="App">
      <Navbar />
      {curruser != null ? <DashboardSuperAdmin /> : <></>}

      {/* <Footer /> */}
    </div>
  );
}

export default App;
