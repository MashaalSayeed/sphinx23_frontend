import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) => {
  ////console.log(user);
  return (
    <tr>
      <td>{user.index}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.type[0].toUpperCase() + user.type.slice(1)}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.collegeName}</td>

      {/* <td>{user.events}</td>
      <td>{user.passes}</td> */}
      {/* <td>
        <button className="certification-btn" onClick={() => {}}>
          <span>Certify</span>
        </button>
      </td> */}
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
