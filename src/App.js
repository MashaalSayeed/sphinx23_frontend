import logo from "./logo.svg";
import "./App.css";
import Navbar from "./screens/components/Navbar";
import DashboardSuperAdmin from "./screens/containers/Dashboard/SuperAdmin/DashboardSuperAdmin";

function App() {
  return (
    <div className="App">
      <Navbar />
      <DashboardSuperAdmin />
    </div>
  );
}

export default App;
