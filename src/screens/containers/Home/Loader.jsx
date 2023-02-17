import React from "react";
import load from '../../../images/splashn.gif'

import { styled } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = styled((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  rootBackground: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
    backgroundColor: "white",
    opacity: 0.8,
    display: "grid",
    placeItems: "center",
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <div className="loader">
      <img src={load} className="loader-back"></img>{" "}
      {/* <div
        style={{
          // do your styles depending on your needs.
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      
        <CircularProgress color="inherit" style={{ height: "100%" }} />
      </div> */}
    </div>
  );
}
