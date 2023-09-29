import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
////console.log("Called Loader");
function Loader() {
  const load = useSelector((state) => state.auth.loading);
  return <>{load ? <CircularProgress></CircularProgress> : <></>}</>;
}
export default Loader;
