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
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import { Home, RouteTwoTone } from "@mui/icons-material";
import Events from "./screens/containers/Events/events";
import EventsView from "./screens/containers/EventsView/EventsView";
import EventsCat from "./screens/containers/Events/EventsCat";
import Ambassador from "./screens/containers/Home/Ambassadors";
import { ParallaxProvider } from "react-scroll-parallax";
import UserDashboard from "./screens/containers/Dashboard/UserDashboard";
//import Test from "../src/screens/containers/Test";
import { useRef } from "react";
import OurTeam from "./screens/containers/OurTeam/OurTeam";
import AmbassadorM from "./screens/containers/Home/AmbassadorM";
import Coming from "./screens/containers/Home/Coming";

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
  // const [scrollEl, setScrollElement] = useState < HTMLDivElement > null;
  // const ref = useRef < HTMLDivElement > null;
  // useEffect(() => {
  //   setScrollElement(ref.current);
  // }, []);
  const [land, setLand] = useState(true);

  const curruser = useSelector((state) => state.auth.curruser);
  useEffect(() => {
    console.log(land);
  }, [land]);
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
    <BrowserRouter>
      <ParallaxProvider>
        {" "}
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

          <Routes>
            {/* <Route index element={<Landing />} />
            <Route path="/" element={<TimeMachine notAnim={true} />} /> */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/ambassador" element={<AmbassadorM />} />
            {/* <Route path="/ourteam" element={<OurTeam />} /> */}
            {/* <Route path="/home" element={<TimeMachine notAnim={true} />} /> */}
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/events/:cat" element={<EventsCat />} />
            <Route path="/comming" element={<Coming />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:cat/:id" element={<EventsView />} />

            {/* <Route path="/test" element={<Test />} /> */}
            {land ? (
              <Route exact path="/" element={<Landing setLand={setLand} />} />
            ) : (
              <Route exact path="/" element={<TimeMachine notAnim={true} />} />
            )}
            {curruser != null ? (
              <>
                <Route path="/dashboard" element={<UserDashboard />} />
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

          {/* <Footer /> */}
        </div>
      </ParallaxProvider>
    </BrowserRouter>
  );
}

export default App;
