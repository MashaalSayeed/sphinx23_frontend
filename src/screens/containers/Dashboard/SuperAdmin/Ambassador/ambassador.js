import { useState, Fragment, useEffect } from "react";

import ReadOnlyRow from "./ReadOnlyRow";

import Dashboard_Header from "../../../../components/Dashboard_Header";
import Pagination from "../../../../components/Pagination";
import { getAmbassadors } from "../../../../../api";
import { useSelector } from "react-redux";

const Ambassador = (props) => {
  const [tabActive, setTab] = useState("");
  const { ambassadors } = props;

  // const [currentPage, setCurrentPage] = useState(1);

  // const [recordsPerPage] = useState(1);
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = ambassadors.slice(
  //   indexOfFirstRecord,
  //   indexOfLastRecord
  // );
  // const nPages = Math.ceil(ambassadors.length / recordsPerPage);
  const [currentRecords, setCurrentRecords] = useState([]);
  const token = useSelector((state) => state.auth.curruser.token);
  const [currentPage, setCurrentPage] = useState(1);
  const [Pages, setNpage] = useState(0);

  useEffect(() => {
    getAmbassadors({
      token: token,
      currentPage: currentPage,
      setCurrentRecords: setCurrentRecords,
      setNpage: setNpage,
    });
  }, []);
  ////console.log(Pages);
  return (
    <div>
      <div className="app-container">
        <Dashboard_Header
          settab={setTab}
          tabactive={tabActive}
          title={"Ambassadors"}
          tabs={[]}
          excel={true}
          certify={true}
          dashBool={true}
          paginate={
            typeof Pages != "undefined" ? (
              <Pagination
                nPages={Pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setCurrentRecords={setCurrentRecords}
                apiCall={(pageNo) => {
                  getAmbassadors({
                    token: token,
                    currentPage: pageNo,
                    setCurrentRecords: setCurrentRecords,
                    setNpage: setNpage,
                  });
                }}
              />
            ) : (
              <></>
            )
          }
        />
        <form onSubmit={() => {}} className="resp-m-l-r">
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>College Name</th>
                <th>UID</th>
                <th>Profit</th>
                <th>Referrals</th>
              </tr>
            </thead>

            <tbody>
              {currentRecords &&
                currentRecords.map((ambassador, i) => (
                  <Fragment>
                    {/* {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : ( */}
                    <ReadOnlyRow ambassador={{ ...ambassador, index: i }} />
                    {/* )} */}
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
              No Ambassadors Found
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Ambassador;
