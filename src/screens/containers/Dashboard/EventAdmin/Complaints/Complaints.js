import React, { useEffect, useState } from "react";

import Dashboard_Header from "../../../../components/Dashboard_Header";
import Pagination from "../../../../components/Pagination";
import ComplaintsTable from "./Complaints_table";

function Complaints() {
  // useEffect(() => {}, [tabActive]);
  const [tabActive, setTab] = useState("All Complaints");

  const data = {
    header: [
      "Sr.no",
      "Ticket Id",
      "College",
      "Student ID",
      "Name",
      "Concerned To",
      "Subject",
      "status",
    ],
    value: [
      "index",
      "id",
      "college",
      "Institute_id",
      "name",
      "topic",
      "sub",
      "Status",
    ],
  };

  const [currentRecords, setCurrentRecords] = useState([
    {
      id: "#1227",
      college: "MNIT",
      Institute_id: "2021uec1527",
      name: "Ankit",
      topic: "Ted Talk Team",
      sub: "Registration Error",
    },
    {
      id: "#1227",
      college: "MNIT",
      Institute_id: "2021uec1527",
      name: "Ankit",
      topic: "Ted Talk Team",
      sub: "Registration Error",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Pages, setNpage] = useState(1);

  useEffect(() => {
    if (tabActive == "All Complaints") {
    } // get all complaints
    if (tabActive == "Pending Complaints") {
    } //get pending compliants
    if (tabActive == "Approved Complaints") {
    } //get approved complaints

    // getUsersByPass(
    //   currpass._id,
    //   token,
    //   currentPage,
    //   setCurrentRecords,
    //   setNpage
    // );
  }, [tabActive]);

  return (
    <div className="super-event">
      <Dashboard_Header
        settab={setTab}
        tabactive={tabActive}
        title={"Query"}
        tabs={["All Complaints", "Pending Complaints", "Approved Complaints"]}
        createEventBool={false}
        excel={true}
        dashBool={true}
        paginate={
          typeof Pages != "undefined" ? (
            <Pagination
              nPages={Pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              apiCall={(pageNo) => {
                // getUsersByPass(
                //   currpass._id,
                //   token,
                //   pageNo,
                //   setCurrentRecords,
                //   setNpage
                // );
              }}
            />
          ) : (
            <></>
          )
        }
      />
      {/* <input type={"file"} id="eventImg"></input> */}
      <div>
        <form onSubmit={() => {}} className="resp-m-l-r teams">
          <table>
            <thead>
              <tr>
                {data.header.map((value, i) => (
                  <>
                    <th>{value}</th>
                  </>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentRecords.map((user, i) => (
                <React.Fragment>
                  <ComplaintsTable
                    data={{ ...user, index: i }}
                    value={data.value}
                  />
                </React.Fragment>
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
              No Teams Found
            </div>
          )}
        </form>
      </div>

      {/* <ComplaintsTable /> */}
    </div>
  );
}

export default Complaints;
