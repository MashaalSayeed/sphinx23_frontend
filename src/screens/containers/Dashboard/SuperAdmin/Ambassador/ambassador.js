import { useState, Fragment } from "react";
import "./App.css";
import { nanoid } from "nanoid";

import { Button, Stack, TextField } from "@mui/material";
import ReadOnlyRow from "./ReadOnlyRow";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditableRow from "./EditableRow";

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import { Avatar } from "@mui/material";

import * as xlImg from "../../../../../images/excel.png";
import Reactdom from "react-dom";

const Ambassador = (props) => {
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
  const { ambassadors } = props;
  // const [addFormData, setAddFormData] = useState({
  //   fullName: "",
  //   address: "",
  //   phoneNumber: "",
  //   email: "",
  // });

  // const [editFormData, setEditFormData] = useState({
  //   fullName: "",
  //   address: "",
  //   phoneNumber: "",
  //   email: "",
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

  //   const newContact = {
  //     id: nanoid(),
  //     fullName: addFormData.fullName,
  //     address: addFormData.address,
  //     phoneNumber: addFormData.phoneNumber,
  //     email: addFormData.email,
  //   };

  //   const newContacts = [...contacts, newContact];
  //   setContacts(newContacts);
  // };

  // const handleEditFormSubmit = (event) => {
  //   event.preventDefault();

  //   const editedContact = {
  //     id: editContactId,
  //     fullName: editFormData.fullName,
  //     address: editFormData.address,
  //     phoneNumber: editFormData.phoneNumber,
  //     email: editFormData.email,
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
  //     fullName: contact.fullName,
  //     address: contact.address,
  //     phoneNumber: contact.phoneNumber,
  //     email: contact.email,
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

  return (
    <div>
      <div className="app-container">
        <h2 className="h2-Heading">Ambassador</h2>
        <div className="buttons">
          <Button variant="text">Ambassadors</Button>
          <Button variant="text">Profit</Button>
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
                width: "250px",
                height: "20px",
                float: "right",
              },
            }}
            label="Search"
          />
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

        <form onSubmit={() => {}} className="resp-m-l-r">
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>College</th>
                <th>Name</th>
                <th>Email</th>
                <th>Profit</th>
                <th></th>
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

export default Ambassador;
