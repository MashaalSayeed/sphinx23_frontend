import React, { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import Dashboard_Header from "../../../../components/Dashboard_Header";
import Pagination from "../../../../components/Pagination";
import ComplaintsTable from "./Complaints_table";
import { getQueriesByEvent } from "../../../../../api";
import { useSelector, useDispatch } from "react-redux";
function Complaints() {
  const [tabActive, setTab] = useState("All Complaints");
  const token = useSelector((state) => state.auth.curruser.token);

  ////console.log(token);
  const data = {
    header: [
      "Sr.no",
      "Query Id",
      "User Name",
      "College",
      "Email",
      "Concerned Event",
      "Status",
    ],
    value: ["index", "queryId", "name", "college", "email", "event", "status"],
  };
  const dispatch = useDispatch();
  const [currentRecords, setCurrentRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Pages, setNpage] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [status, setStatus] = useState(2);

  const getQueriesByEventHandler = (currPage) =>
    getQueriesByEvent({
      token,
      dispatch,
      tabActive,
      setCurrentRecords,
      currentPage: currPage,
      setNpage,
    });
  useEffect(() => {
    window.history.pushState(null, "Sphinx2023", "/eventAdmin/2");
  }, []);

  useEffect(() => {
    //
    if (tabActive == "All Complaints") {
      ////console.log("Tab Switched");
      setStatus(2);
      setCurrentPage(1);
      getQueriesByEventHandler(1);
      // setLoading(false);
    }
    if (tabActive == "Pending Complaints") {
      setStatus(0);
      setCurrentPage(1);
      ////console.log("Tab Switched", status);

      getQueriesByEventHandler(1);
      ////console.log("Tab Switched 1", status);
    }
    if (tabActive == "Approved Complaints") {
      setStatus(1);
      setCurrentPage(1);
      getQueriesByEventHandler(1);
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
    <>
      {Loading ? (
        <CircularProgress />
      ) : (
        <div className="super-event">
          <Dashboard_Header
            settab={setTab}
            tabactive={tabActive}
            title={"Query"}
            tabs={[
              "All Complaints",
              "Pending Complaints",
              "Approved Complaints",
            ]}
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
                    getQueriesByEventHandler(pageNo);
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
                  {currentRecords &&
                    currentRecords.map((user, i) => (
                      <React.Fragment>
                        <ComplaintsTable
                          data={{ ...user, index: i + 1 }}
                          value={data.value}
                          fetchComplaints={() =>
                            getQueriesByEventHandler(currentPage)
                          }
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
                  No Queries Found
                </div>
              )}
            </form>
          </div>

          {/* <ComplaintsTable /> */}
        </div>
      )}
    </>
  );
}

export default Complaints;
