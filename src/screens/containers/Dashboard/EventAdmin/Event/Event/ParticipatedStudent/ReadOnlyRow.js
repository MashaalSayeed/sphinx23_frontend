import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Stack, TextField } from "@mui/material"
import { Avatar } from '@mui/material';

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>
      <Button variant="contained"
        color="success" style={{
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "4px",
        margin: "5px"
      }}>Present</Button>

      </td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          <EditIcon
            style={{ color: "blue" }}
          />
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;