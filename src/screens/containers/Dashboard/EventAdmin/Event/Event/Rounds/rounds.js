import { useState, Fragment } from 'react';
import './App.css';
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import { Button, Stack, TextField } from "@mui/material"
import ReadOnlyRow from "./ReadOnlyRow";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditableRow from "./EditableRow";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Reactdom from "react-dom";
// import { DataDesktop14 } from '../DataDesktop14';

const Rounds = (props) => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
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

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
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
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
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
  // const [roundCompleted, setRoundCompleted] = useState(props.DataDesktop14[props.id].rndCmpltd)
  const nextRoundClickHandler = () => {
    console.log(props.dataDesktop);
    props.setDataDesktop(props.dataDesktop + 1);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <div>
        <Button onClick={nextRoundClickHandler} color="success" variant="contained">Move to next round</Button>
        <Button color="secondary" variant="contained">Decide winner</Button>
      </div>
      <div className="app-container">
        <Stack spacing={4} direction='row' alignItems="center" justifyContent="space-between" className='resp-m-l-r'>
          {/* <TextField
            id="outlined-basic"
            variant="outlined"
            inputProps={{
              style: {
                width: "250px",
                height: "20px",
                float: "right"
              },
            }}
            label="Search"
          /> */}
          <div>
            <button
              type="button"
              onClick={(event) => handleEditClick(event, contacts[0])}
            >
              <EditIcon
                style={{ color: "blue" }}
              />
            </button>
            {/* <button type="button" onClick={() => handleDeleteClick(contacts[0].id)}>
              <DeleteIcon />
            </button> */}
          </div>
        </Stack>
        <hr />
        <form onSubmit={handleEditFormSubmit} className='resp-m-l-r'>
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Team ID</th>
                <th>Team Name</th>
                <th>College</th>
                <th>Team Leader Name</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, idx) => (
                <>
                  {contact.round >= props.rd ? <Fragment>
                    {editContactId === contact.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment> : <></>}

                </>
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

export default Rounds;