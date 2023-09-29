import React, { useEffect, useState, Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow";

function EventStudents({ currentRecords }) {
  // const currentRecords = [{ name: "rupesh", mobileNumber: "8076240766" }];
  ////console.log("Called");
  const data = {
    header: ["Sr.no", "TeamID", "Team Name", "Round Status"],
    value: ["index", "teamId", "teamName", "status"],
  };
  ////console.log(currentRecords);

  return (
    <div>
      <form onSubmit={() => {}} className="resp-m-l-r teams">
        <table>
          <thead>
            <tr>
              {data.header.map((value, i) => (
                <th>{value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((user, i) => (
              <Fragment>
                <ReadOnlyRow
                  data={{ ...user, index: i + 1 }}
                  value={data.value}
                  handleEditClick={() => {}}
                  handleDeleteClick={() => {}}
                />
              </Fragment>
            ))}
          </tbody>
        </table>
        {currentRecords.length != 0 ? (
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
            {"No data found"}
          </div>
        )}
      </form>
    </div>
  );
}

export default EventStudents;
