import "./App.css";
import Navbar from "./screens/components/Navbar";
import { useEffect, useState } from "react";
import DashboardSuperAdmin from "./screens/containers/Dashboard/SuperAdmin/DashboardSuperAdmin";
import "./styles/footer.css";
import "./styles/desktop27.css";
import "./styles/deskr.css";
import "./styles/createEvent.css";
import "./styles/activity.css";
import "./styles/home.css";
import "./styles/abut.css";
import "./styles/about.css";
import "./styles/events.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./screens/components/Footer";
import PassDetail from "./screens/containers/Dashboard/SuperAdmin/Pass/PassDetail";
import CreatePass from "./screens/containers/Dashboard/SuperAdmin/Pass/createPass";
import EventDetails from "./screens/components/EventDetails/EventDetails";
import DashboardEventAdmin from "./screens/containers/Dashboard/EventAdmin/DashboardEventAdmin";
import LoginScreen from "./screens/containers/Login/LoginScreen";
import Landing from "./screens/containers/Home/home";
import TimeMachine from "./screens/containers/Home/TimeMachine";
import About from "./screens/containers/Home/about";
import Activities from "./screens/containers/Home/Activities";
import Theme from "./screens/containers/Home/theme";
import { Home } from "@mui/icons-material";
import Events from "./screens/containers/Events/events";
import EventsView from "./screens/containers/EventsView/EventsView";
import EventsCat from "./screens/containers/Events/EventsCat";
import Ambassador from "./screens/containers/Home/Ambassadors";

function App() {
  // const token1 =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjYzYjMwM2EyZGJhMGJlNWZlMDE1YTVmOSIsImlhdCI6MTY3MjY3NzI3Nn0.B6QG9trZX_tXQ_Bx3-hBMVn96Xz2I4vqzeeVSOT_VRc";
  // const creds = {
  //   email: "namujain266@gmail.com",
  //   password: "Naman",
  //   confirmPassword: "Naman",
  // };
  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const dispatch = useDispatch();
  // fetchEvents(dispatch);
  // loginRegister(dispatch, creds);

  useEffect(() => {
    // chandra();
    // loginRegister(dispatch, creds);
    fetchEvents(dispatch)
      .then((res) => {
        console.log("Events Fetched");
      })
      .catch((err) => {
        toast.error(err, toastStyle);
        // alert(err);
      });
    fetchPasses(dispatch);
    fetchUpcoming(dispatch);
    fetchCompleted(dispatch);
    // fetchUpdates(dispatch);
  }, []);

  const curruser = useSelector((state) => state.auth.curruser);
  // createEvent(dispatch, {}, {});
  // createPass(dispatch, {}, {});
  // console.log(getUsersByPass({}, {}));
  // console.log(getUsers("", token1));

  return (
    // <div className="App">
    //   <Navbar />
    //   {curruser != null ? <DashboardSuperAdmin /> : <></>}

    //   {/* <Footer /> */}

    // </div>
    <div className="App">
      {/* <TimeMachine /> */}

      {/* <Navbar /> */}
      {/* <Landing /> */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginScreen />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/home" element={<TimeMachine notAnim={true} />} />
          <Route path="/about" element={<About />} />
          <Route path="/events/:cat" element={<EventsCat />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:cat/:id" element={<EventsView />} />

          {curruser != null ? (
            <>
              <Route
                path="/eventAdmin/:tab?"
                element={<DashboardEventAdmin />}
              />
              <Route path="/superAdmin/" element={<DashboardSuperAdmin />} />
              <Route
                path="/superAdmin/pass/:id/:tab?"
                element={<PassDetail />}
              ></Route>
              <Route
                path="/eventDetails/event/:id/:tab?"
                element={<EventDetails />}
              ></Route>
              <Route
                path="/superAdmin/createPass"
                element={<CreatePass />}
              ></Route>
            </>
          ) : (
            <></>
          )}
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
