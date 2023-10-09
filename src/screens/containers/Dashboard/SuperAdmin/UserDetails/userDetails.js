import { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import Dashboard_Header from "../../../../components/Dashboard_Header";
import Pagination from "../../../../components/Pagination";
import { getUsers } from "../../../../../api";
import { useSelector } from "react-redux";

const UserDetails = (props) => {
  const { users } = props;
  const [tabActive, setTab] = useState("All Students");
  const [contacts, setContacts] = useState(null);
  const [currentRecords, setCurrentRecords] = useState([]);
  const token = useSelector((state) => state.auth.curruser.token);
  // const [addFormData, setAddFormData] = useState({
  //   srNo: "",
  //   branch: "",
  //   batch: "",
  //   club: "",
  //   studentID: "",
  //   name: "",
  //   CGPA: "",
  //   certificateGiven: "",
  // });

  // const [editFormData, setEditFormData] = useState({
  //   srNo: "",
  //   branch: "",
  //   batch: "",
  //   club: "",
  //   studentID: "",
  //   name: "",
  //   CGPA: "",
  //   certificateGiven: "",
  // });

  // const [editContactId, setEditContactId] = useState(null);

  // const handleAddFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...addFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setAddFormData(newFormData);
  // };

  // const handleEditFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...editFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setEditFormData(newFormData);
  // };

  // const handleAddFormSubmit = (event) => {
  //   event.preventDefault();
  //   var id = nanoid();
  //   const newContact = {
  //     id: id,
  //     srNo: id,
  //     branch: addFormData.branch,
  //     batch: addFormData.batch,
  //     club: addFormData.club,
  //     studentID: addFormData.studentID,
  //     name: addFormData.name,
  //     CGPA: addFormData.CGPA,
  //     certificateGiven: addFormData.certificateGiven,
  //   };

  //   const newContacts = [...contacts, newContact];
  //   setContacts(newContacts);
  // };

  // const handleEditFormSubmit = (event) => {
  //   event.preventDefault();

  //   const editedContact = {
  //     id: editContactId.id,
  //     srNo: editFormData.srNo,
  //     branch: editFormData.branch,
  //     batch: editFormData.batch,
  //     club: editFormData.club,
  //     studentID: editFormData.studentID,
  //     name: editFormData.name,
  //     CGPA: editFormData.CGPA,
  //     certificateGiven: editFormData.certificateGiven,
  //   };

  //   const newContacts = [...contacts];

  //   const index = contacts.findIndex((contact) => contact.id === editContactId);

  //   newContacts[index] = editedContact;

  //   setContacts(newContacts);
  //   setEditContactId(null);
  // };

  // const handleEditClick = (event, contact) => {
  //   event.preventDefault();
  //   setEditContactId(contact.id);

  //   const formValues = {
  //     srNo: contact.srNo,
  //     branch: contact.branch,
  //     batch: contact.batch,
  //     club: contact.club,
  //     studentID: contact.studentID,
  //     name: contact.name,
  //     CGPA: contact.CGPA,
  //     certificateGiven: contact.certificateGiven,
  //   };

  //   setEditFormData(formValues);
  // };

  // const handleCancelClick = () => {
  //   setEditContactId(null);
  // };

  // const handleDeleteClick = (contactId) => {
  //   const newContacts = [...contacts];

  //   const index = contacts.findIndex((contact) => contact.id === contactId);

  //   newContacts.splice(index, 1);

  //   setContacts(newContacts);
  // };

  const [currentPage, setCurrentPage] = useState(1);
  const [Pages, setNpage] = useState(1);
  const [sort,setSort]=useState(1);
  const [count,setCount]=useState(0);
  const [validC,setValid]=useState(0);
  // const [recordsPerPage] = useState(1);
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  useEffect(() => {
    getUsers({
      token: token,
      currentPage: currentPage,
      sortType:sort,
      setCount:setCount,
      setValid:setValid,
      setCurrentRecords: setCurrentRecords,
      setNpage: setNpage,
    });
  }, [sort]);
  ////console.log(currentRecords);
  ////console.log(Pages);

  return (
    <div>
      
      <div className="app-container">
      <h5 style={{color:"black"}}>Total Registration: {validC}</h5>
      <h5 style={{color:"black"}}>Completed Registration: {count}</h5>
      <label style={{color:"black",marginTop:"10px"}}>
      Sort By:
      <select name="selectedSort" style={{marginLeft:"20px"}} onChange={(e)=>{setSort(e.target.value)}}> 
        <option value={1}>Time</option>
        <option value={2}>College</option>
        <option value={3}>Name</option>
      </select>
    </label>
        <Dashboard_Header
          settab={setTab}
          tabactive={tabActive}
          title={"User Details"}
          tabs={["All Students", "Team Members"]}
          excel={true}
          certify={true}
          paginate={
            typeof Pages != "undefined" ? (
              <Pagination
                nPages={Pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                apiCall={(pageNo) => {
                  getUsers({
                    token: token,
                    currentPage: pageNo,
                    sortType:sort,
                    setCurrentRecords: setCurrentRecords,
                    setNpage: setNpage,
                  });
                }}
              />
            ) : (
              <></>
            )
          }
          dashBool={true}
        />
     
        <form onSubmit={() => {}}>
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Mobile No.</th>
                <th>College</th>
                {/* <th>Give Certificate</th> */}
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((contact, i) => (
                <Fragment>
                  {false ? (
                    <></>
                  ) : (
                    // <EditableRow
                    //   editFormData={editFormData}
                    //   handleEditFormChange={handleEditFormChange}
                    //   handleCancelClick={handleCancelClick}
                    // />
                    <ReadOnlyRow
                      user={{ ...contact, index: i + 1 }}
                      // handleEditClick={handleEditClick}
                      // handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>

      {/* <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder=" Serial no."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder=" Purpose"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder=" Event"
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Paid to"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form> */}
    </div>
  );
};

export default UserDetails;
