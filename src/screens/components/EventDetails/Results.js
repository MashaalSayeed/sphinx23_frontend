import React, { Fragment, useEffect, useState } from "react";
import close_img from "../../../images/close.png";
import edit_img from "../../../images/edit1.png";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import ReadOnlyRow from "./ReadOnlyRow";
import { getResults, addTeamsToRound, addResults } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastStyle = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
function Results({ event }) {
  // const currentRecords = [{ name: "rupesh", mobileNumber: "8076240766" }];

  const token = useSelector((state) => state.auth.curruser.token);
  ////console.log(token);
  const [currentRecords, setCurrentRecords] = useState([]);
  // {
  //   id: 21,
  //   name: "old team",
  //   college: "MNIT",
  //   leader: "Phoneix",
  //   staus: 1,
  // },
  // {
  //   id: 34,
  //   name: "new team",
  //   college: "MNIT",
  //   leader: "SKY",
  //   staus: 2,
  // },
  // {
  //   id: 38,
  //   name: "GREED",
  //   college: "MNIT",
  //   leader: "SKY",
  //   staus: 2,
  // },

  const [close, setClose] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [completeCurrentResults, setCompleteCurrentResults] = useState([]);
  const [Pages, setNpage] = useState(1);
  const [decide, setDecide] = useState(false);
  const status = event.status;
  const [currRound, setRound] = useState(1);
  const [currResultRound, setResultRound] = useState(1);
  // const [check, setCheck] = useState(0);
  const ResultsPaginate = () => {
    return (
      <Pagination
        nPages={Pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        apiCall={(pageNo) => {
          getResults({
            eventId: event._id,
            round: currRound,

            token: token,
            currentPage: pageNo,
            setCurrentRecords: setCurrentRecords,
            setNpage: setNpage,
          });
        }}
      />
    );
  };

  const data = {
    header: ["Sr.no", "Team ID", "Team Name"],
    value: ["index", "teamId", "teamName"],
  };

  // const Rdata = [
  //   {
  //     id: 21,
  //     name: "old team",
  //     college: "MNIT",
  //     leader: "Phoneix",
  //     staus: 1,
  //   },
  //   {
  //     id: 34,
  //     name: "new team",
  //     college: "MNIT",
  //     leader: "SKY",
  //     staus: 2,
  //   },
  //   {
  //     id: 38,
  //     name: "GREED",
  //     college: "MNIT",
  //     leader: "SKY",
  //     staus: 4,
  //   },
  // ];

  const decide_winers = () => {
    return (
      <div
        className="createEvent-submit"
        style={{ marginTop: "0px", margin: "0px 6px" }}
        onClick={() => {
          setDecide(true);
        }}
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

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    ////console.log("toggle called");
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleRound = (roundNo) => {
    setCurrentPage(1);
    setRound(roundNo);

    //change the currentRecords According to the roundNo;
  };
  const handleResultRound = (roundNo) => {
    ////console.log("Round", roundNo);

    setResultRound(roundNo);
  };

  const roundBtn = (roundNo, editable) => {
    return (
      <button
        className={
          (!editable && roundNo == currRound) ||
          (editable && roundNo == currResultRound)
            ? "roundBtn activeRound"
            : "roundBtn "
        }
        onClick={() => {
          editable ? handleResultRound(roundNo) : handleRound(roundNo);
        }}
      >
        Round {roundNo}
      </button>
    );
  };

  const roundTab = (editable) => {
    const arr = Array.from({ length: status }, (_, index) => index + 1);
    return (
      <div className="roundTab">
        {arr.map((i) => {
          return roundBtn(i, editable);
        })}
      </div>
    );
  };
  const handleResultUpdate = (complete) => {
    ////console.log("Callled");
    ////console.log(checked);
    var teamIds = [];
    checked.forEach((index) => {
      teamIds.push(completeCurrentResults[index]._id);
    });
    var body = { event: event._id, teamIds, complete };
    if (currResultRound == event.status) {
      ////console.log("Latest Results");
      addResults(token, body)
        .then((res) => {
          toast.info("Results Added Successfully.", toastStyle);
        })
        .catch((err) => {
          toast.error(err, toastStyle);
          // alert(err);
        });
    } else {
      addTeamsToRound(token, body)
        .then((res) => {
          toast.info("Results Updated Successfully.", toastStyle);
        })
        .catch((err) => {
          toast.error(err, toastStyle);
          // alert(err);
        });
    }
  };

  const CheckTeam = (value) => {
    ////console.log(completeCurrentResults[value], currResultRound);
    var flag =
      currResultRound < event.status &&
      completeCurrentResults[value].status > currResultRound;
    // setCheck(flag);
    return (
      <div className="team-chk">
        <input
          type={"checkbox"}
          checked={flag ? flag : checked.includes(value)}
          disabled={flag}
          onChange={handleToggle(value)}
        ></input>
        <label className="chk-label">
          {" "}
          {completeCurrentResults[value].teamName}
        </label>
      </div>
    );
  };

  const DecidePop = () => {
    return (
      <div className="createEvent-back">
        <button
          className=" close-decide"
          onClick={() => {
            setDecide(false);
          }}
        >
          <img src={close_img}></img>
        </button>
        <div
          className="createEvent-form"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {<div>{roundTab(true)}</div>}
          <div className="decideWindow">
            {completeCurrentResults.map((value, i) => {
              return CheckTeam(i);
            })}
          </div>
          <div className="decide-bottom">
            <button
              className="decideNext"
              onClick={() => handleResultUpdate(false)}
            >
              Move To Next Round
            </button>
            {currResultRound == event.status && (
              <button
                className="decideWinners"
                onClick={() => handleResultUpdate(true)}
              >
                Declare Winners
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
  // getResults({
  //   eventId: event._id,
  //   round: event.status,

  //   token: token,
  //   currentPage: 0,
  //   setCurrentRecords: setCompleteCurrentResults,
  // });
  useEffect(() => {
    checked.forEach((element) => {
      handleToggle(element);
    });
    setChecked([]);
    ////console.log("use effect");
    ////console.log(currRound);
    getResults({
      eventId: event._id,
      round: currRound,

      token: token,
      currentPage: currentPage,
      setCurrentRecords: setCurrentRecords,
      setNpage: setNpage,
    });

    getResults({
      eventId: event._id,
      round: currResultRound,

      token: token,
      currentPage: 0,
      setCurrentRecords: setCompleteCurrentResults,
    });

    // Rdata.forEach((element) => {
    //   ////console.log(element.staus);
    //   if (element.staus >= currRound) {
    //     newdata.push(element);
    //   }
    // });
    // ////console.log(newdata);
    // setCurrentRecords(newdata);
  }, [currRound, currResultRound]);
  // ////console.log(currentRecords);
  return (
    <div>
      {decide ? DecidePop() : <></>}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div style={{ margin: "0px 15px" }}>
        <div className="dashboard-function">
          <div className="dashboard-paginate"> {ResultsPaginate()}</div>
          <div className="dashboard-icons">
            {/* {close_btn()} */}
            {!event.ended && decide_winers()}
          </div>
        </div>
        {roundTab(false)}
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
                  data={{ ...user, index: i + 1 }}
                  value={data.value}
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
