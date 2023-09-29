import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import TeamCard from "../../containers/OurTeam/TeamCard";

const ReadOnlyRow = ({
  data,
  value,
  openDialog,
  setteamName,
  setteamId,
  setMembers,
}) => {
  ////console.log("Read CAlled");
  //console.log(data);
  // ////console.log(value);
  // //set//console.log(data[value[0]]);
  const handleClick = () => {
    setteamName(data["teamName"]);
    setteamId(data["teamId"]);
    setMembers(data["userList"]);
    openDialog();
  };
  const attendace = () => {
    return (
      <td>
        {" "}
        <Button
          variant="contained"
          color="success"
          style={{
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "4px",
            margin: "5px",
          }}
        >
          Present
        </Button>
      </td>
    );
  };
  return (
    <tr>
      {value.map((ele, i) => {
        if (ele == "attendance") return attendace();
        if (ele == "team details")
          return (
            <td style={{ cursor: "pointer" }} onClick={handleClick}>
              View Details
            </td>
          );
        else return <td>{data[ele]}</td>;
      })}
    </tr>
  );
};

export default ReadOnlyRow;
