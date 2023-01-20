import React from "react";
import { Button, Stack, TextField } from "@mui/material";

const ReadOnlyRow = ({ data, value }) => {
  console.log("Read CAlled");
  // console.log(data);
  // console.log(value);
  // console.log(data[value[0]]);

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
        else return <td>{data[ele]}</td>;
      })}
    </tr>
  );
};

export default ReadOnlyRow;
