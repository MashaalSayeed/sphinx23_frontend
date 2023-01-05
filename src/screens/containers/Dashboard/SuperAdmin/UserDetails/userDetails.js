import { useState, Fragment } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import { Button, Stack, TextField } from "@mui/material";
import ReadOnlyRow from "./ReadOnlyRow";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditableRow from "./EditableRow";

// import SidebarSuperAdmin from "../../../components/Sidebar";

import Reactdom from "react-dom";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import { Avatar } from "@mui/material";
import * as xlImg from "../../../../../images/excel.png";
const UserDetails = (props) => {
  const Sdata = {
    title: "Admin Login",
    options: [
      "Profile",
      "Events",
      "Pass",
      "Payment",
      "User Details",
      "Ambassador",
    ],
  };
  const { users } = props;
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    srNo: "",
    branch: "",
    batch: "",
    club: "",
    studentID: "",
    name: "",
    CGPA: "",
    certificateGiven: "",
  });

  const [editFormData, setEditFormData] = useState({
    srNo: "",
    branch: "",
    batch: "",
    club: "",
    studentID: "",
    name: "",
    CGPA: "",
    certificateGiven: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    var id = nanoid();
    const newContact = {
      id: id,
      srNo: id,
      branch: addFormData.branch,
      batch: addFormData.batch,
      club: addFormData.club,
      studentID: addFormData.studentID,
      name: addFormData.name,
      CGPA: addFormData.CGPA,
      certificateGiven: addFormData.certificateGiven,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId.id,
      srNo: editFormData.srNo,
      branch: editFormData.branch,
      batch: editFormData.batch,
      club: editFormData.club,
      studentID: editFormData.studentID,
      name: editFormData.name,
      CGPA: editFormData.CGPA,
      certificateGiven: editFormData.certificateGiven,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      srNo: contact.srNo,
      branch: contact.branch,
      batch: contact.batch,
      club: contact.club,
      studentID: contact.studentID,
      name: contact.name,
      CGPA: contact.CGPA,
      certificateGiven: contact.certificateGiven,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div>
      {/* <SidebarSuperAdmin data={Sdata} /> */}
      <div className="app-container">
        <h2>User Details</h2>
        <div className="buttons">
          <Button variant="text">All Students</Button>
          <Button variant="text">Team Members</Button>
        </div>
        <hr />
        <Stack
          spacing={4}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="resp-m-l-r"
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            inputProps={{
              style: {
                width: "300px",
                float: "right",
              },
            }}
            label="Search"
          />

          {/* <AddCircleOutlinedIcon fontSize='large' float='right'
          style={{ color: "blue" }}
        /> */}
          <Stack direction="row" spacing="4">
            <Button
              variant="text"
              style={{
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "4px",
                margin: "5px",
              }}
            >
              <CardMembershipOutlinedIcon />
              Certification
            </Button>
            <Button
              variant="text"
              color="primary"
              startIcon={<Avatar src={xlImg.default} />}
              style={{
                // boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "4px",
                margin: "5px",
              }}
            />
            <Button
              variant="text"
              style={{
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "4px",
                margin: "5px",
              }}
            >
              <TuneOutlinedIcon />
              Filter
            </Button>
          </Stack>
        </Stack>

        <hr />

        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Email</th>
                <th>Type</th>
                <th>Passes</th>
                <th>Events</th>
                <th>Give Certificate</th>
              </tr>
            </thead>
            <tbody>
              {users.map((contact, i) => (
                <Fragment>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      user={{ ...contact, index: i + 1 }}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
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
