import { useState, Fragment } from "react";

import ReadOnlyRow from "./ReadOnlyRow";

import Dashboard_Header from "../../../../components/Dashboard_Header";
import Pagination from "../../../../components/Pagination";

const Ambassador = (props) => {
  const [tabActive, setTab] = useState("");
  const { ambassadors } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = ambassadors.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(ambassadors.length / recordsPerPage);

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
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />
        <form onSubmit={() => {}} className="resp-m-l-r">
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>College</th>
                <th>Name</th>
                <th>Email</th>
                <th>Profit</th>
              </tr>
            </thead>

            <tbody>
              {ambassadors.map((ambassador, i) => (
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
          {ambassadors.length != 0 ? (
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
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
