import "./App.css";
import Navbar from "./screens/components/Navbar";
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
} from "./api";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  fetchEvents(dispatch);
  fetchPasses(dispatch);
  fetchUpcoming(dispatch);
  fetchCompleted(dispatch);
  fetchUpdates(dispatch);
  //loginRegister(dispatch, {});
  // createEvent(dispatch, {}, {});
  // createPass(dispatch, {}, {});

  return (
    <div className="App">
      <Navbar />
      <DashboardSuperAdmin />
    </div>
  );
}

export default App;
