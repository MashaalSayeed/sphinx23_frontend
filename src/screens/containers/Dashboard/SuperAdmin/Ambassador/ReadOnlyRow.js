import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadOnlyRow = ({ ambassador, handleEditClick, handleDeleteClick }) => {
  console.log(ambassador);
  return (
    <tr>
      <td>{ambassador.index + 1}</td>
      <td>{ambassador.user.name}</td>
      <td>{ambassador.user.phoneNumber}</td>
      <td>{ambassador.user.email}</td>
      <td>{ambassador.user.collegeName}</td>
      <td>{ambassador.profit}</td>

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
