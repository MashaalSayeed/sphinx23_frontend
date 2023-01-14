import React, { Fragment, useState } from "react";
import close_img from "../../../images/close.png";
import edit_img from "../../../images/edit1.png";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import ReadOnlyRow from "./ReadOnlyRow";
function Results() {
  // const currentRecords = [{ name: "rupesh", mobileNumber: "8076240766" }];
  console.log("called results");
  const token = useSelector((state) => state.auth.curruser.token);
  const [currentRecords, setCurrentRecords] = useState([
    {
      id: 21,
      name: "old team",
      college: "MNIT",
      leader: "Phoneix",
      staus: 1,
    },
  ]);
  const [close, setClose] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [Pages, setNpage] = useState(1);
  const ResultsPaginate = () => {
    return (
      <Pagination
        nPages={Pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        apiCall={() => {}}
      />
    );
  };

  const data = {
    header: ["Sr.no", "Team ID", "Team Name", "College", "Team Leader"],
    value: ["index", "id", "name", "college", "leader"],
  };
  const status = 2;
  const Rdata = [
    {
      id: 34,
      name: "new team",
      college: "MNIT",
      leader: "SKY",
      staus: 2,
    },
    {
      id: 21,
      name: "old team",
      college: "MNIT",
      leader: "Phoneix",
      staus: 1,
    },
  ];

  const decide_winers = () => {
    return (
      <div
        className="createEvent-submit"
        style={{ marginTop: "0px", margin: "0px 6px" }}
        onClick={() => {}}
      >
        Decide Winners
      </div>
    );
  };
  const close_btn = () => {
    return (
      <div
        onClick={() => {
          setClose(!close);
        }}
        className="close-result"
      >
        <img src={close ? edit_img : close_img}></img>
      </div>
    );
  };

  const roundBtn = (roundNo) => {
    return <button className="Rounds-btn">Round {roundNo}</button>;
  };

  const roundTab = () => {
    const arr = Array.from({ length: status }, (_, index) => index + 1);
    return (
      <div className="roundTab">
        {arr.map(() => {
          return roundBtn();
        })}
      </div>
    );
  };

  return (
    <div>
      <div style={{ margin: "0px 15px" }}>
        <div className="dashboard-function">
          <div className="dashboard-paginate"> {ResultsPaginate()}</div>
          <div className="dashboard-icons">
            {close_btn()}
            {decide_winers()}
          </div>
        </div>
        <div className="tab-line"></div>
      </div>

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
                  data={{ ...user, index: i }}
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

export default Results;
