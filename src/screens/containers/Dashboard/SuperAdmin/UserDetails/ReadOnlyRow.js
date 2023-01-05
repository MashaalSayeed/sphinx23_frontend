import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{user.index}</td>
      <td>{user.email}</td>
      <td>{user.type}</td>
      <td>{user.events}</td>
      <td>{user.passes}</td>
      <td></td>
      {/* <td>LLLLLLLLLLLLLLLLLL
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          <EditIcon style={{ color: "blue" }} />
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          <DeleteIcon />
        </button> 
      </td> */}
    </tr>
  );
};

export default ReadOnlyRow;
