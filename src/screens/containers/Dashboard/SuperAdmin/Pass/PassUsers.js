import React, { useEffect, useState, Fragment } from "react";
import { getUsersByPass } from "../../../../../api";
import { useSelector } from "react-redux";
import ReadOnlyRow from "./ReadOnlyRow";
// import { Button, Stack, TextField } from "@mui/material";

function PassUsers({ pass }) {
  const [usersByPass, setUsersByPass] = useState([]);

  return (
    <div>
      <form onSubmit={() => {}} className="resp-m-l-r usertable">
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Pass ID</th>
              <th>College</th>
              <th>Student Name</th>
              <th>Mode of payment</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {usersByPass.map((user, i) => (
              <Fragment>
                <ReadOnlyRow
                  payment={{ ...user, index: i }}
                  handleEditClick={() => {}}
                  handleDeleteClick={() => {}}
                />
              </Fragment>
            ))}
          </tbody>
        </table>
        {usersByPass.length != 0 ? (
          <></>
        ) : (
          <div
            style={{
              padding: "2px",
              boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
              borderRadius: "4px",
              margin: "5px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {" "}
            No Users Found
          </div>
        )}
      </form>
    </div>
  );
}

export default PassUsers;
