import React from "react";
import excel_png from "../../images/excel.png";
import certify_png from "../../images/certify.png";
import create from "../../images/create_event.png";
import add_btn from "../../images/add_btn.png";

function createEventBtn(setCreateEvent) {
  return (
    <button
      className="create-event"
      onClick={() => {
        ////console.log("setTrues");
        setCreateEvent(true);
      }}
    >
      <img className="create-icon" alt="" src={create}></img>
      <span className="create-text">Create Event</span>
    </button>
  );
}
function addBtn() {
  return (
    <div className="add-btn">
      <img src={add_btn}></img>
    </div>
  );
}

function Dashboard_Header(props) {
  const {
    settab,
    tabactive,
    title,
    tabs,
    excel,
    certify,
    createEventBool,
    addBtnBool,
    dashBool,
    paginate,
    setCreateEvent,
  } = props;
  ////console.log(tabs);
  return (
    <div className="dashboard-header">
      {" "}
      <div className="super-title">{title}</div>
      <div className="super-tabmenu">
        <div className="tab-options">
          {tabs.map((tab, i) => (
            <div
              className="tab-opt"
              onClick={() => {
                settab(tab);
              }}
              style={
                tabactive === tab
                  ? { color: "black" }
                  : { color: "rgba(0, 0, 0, 0.6)" }
              }
              key={i}
            >
              {tab}
              {tabactive === tab ? <div className="tab-active"></div> : null}
            </div>
          ))}
        </div>
        <div className="tab-function">
          {/* {certify && (
            <button className="certification-btn" onClick={() => {}}>
              <img src={certify_png} className=""></img>
              <span>Certification</span>
            </button>
          )}
          {addBtnBool && addBtn()}
          {excel && (
            <button className="excel-btn" onClick={() => {}}>
              <img src={excel_png}></img>
            </button>
          )} */}
          {createEventBool && createEventBtn(setCreateEvent)}
        </div>
      </div>
      <div className="tab-line"></div>
      {dashBool && (
        <>
          <div className="dashboard-function">
            <div className="dashboard-paginate"> {paginate}</div>
            <div className="dashboard-icons">
              {certify && (
                <button className="certification-btn" onClick={() => {}}>
                  <img src={certify_png} className=""></img>
                  <span>Certification</span>
                </button>
              )}
              {addBtnBool && addBtn()}
              {excel && (
                <button className="excel-btn" onClick={() => {}}>
                  <img src={excel_png}></img>
                </button>
              )}
            </div>
          </div>
          <div className="tab-line"></div>
        </>
      )}
    </div>
  );
}

export default Dashboard_Header;
