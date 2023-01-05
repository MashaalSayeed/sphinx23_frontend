import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.index}</td>
      <td>{contact.college}</td>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.profit}</td>
      <td></td>
      {/* <td></td>
      <td></td> */}
      {/* <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          <EditIcon 
            style={{ color: "blue" }}
          />
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          <DeleteIcon/>
        </button>
      </td> */}
    </tr>
  );
};

export default ReadOnlyRow;
