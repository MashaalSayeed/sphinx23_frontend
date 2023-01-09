import { useState, Fragment } from "react";

import { nanoid } from "nanoid";

import { Button, Stack, TextField } from "@mui/material";
import ReadOnlyRow from "./ReadOnlyRow";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditableRow from "./EditableRow";

const Payment = (props) => {
  const { payments } = props;
  // const [contacts, setContacts] = useState(data);
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
        <h2 className="h2-Heading">Payments</h2>
        <div className="buttons">
          <Button variant="text">Payment sent</Button>
          <Button variant="text">Payment received</Button>
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
          <div>
            <AddCircleOutlinedIcon
              fontSize="large"
              float="right"
              style={{ color: "blue" }}
            />
            <PictureAsPdfIcon fontSize="large" style={{ color: "blue" }} />
          </div>
        </Stack>

        <hr />

        <form onSubmit={() => {}} className="resp-m-l-r">
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Email</th>
                <th>Type</th>
                <th>Event/Pass</th>
                <th>Date and Time</th>
                <th>Mode of payment</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, i) => (
                <Fragment>
                  {/* {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : ( */}
                  <ReadOnlyRow
                    payment={{ ...payment, index: i }}
                    handleEditClick={() => {}}
                    handleDeleteClick={() => {}}
                  />
                  {/* )} */}
                </Fragment>
              ))}
            </tbody>
          </table>
          {payments.length != 0 ? (
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
              No Payments Found
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

export default Payment;
