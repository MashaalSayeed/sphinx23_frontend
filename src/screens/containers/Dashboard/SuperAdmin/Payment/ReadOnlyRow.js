import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadOnlyRow = ({ payment, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{payment.index}</td>
      <td>{payment.email}</td>
      <td>{payment.type == 0 ? "Event" : "Pass"}</td>
      <td>{payment.type == 0 ? payment.event : payment.pass}</td>
      <td>{payment.createdAt}</td>
      <td>{payment.mode == 0 ? "Online" : "Cash"}</td>
      <td>{payment.amount}</td>
      <td>{payment.status ? "Success" : "Failed"}</td>
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
