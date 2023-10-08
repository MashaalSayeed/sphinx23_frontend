import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUniqueId } from "../../../../../api";

const ReadOnlyRow = ({ ambassador, handleEditClick, handleDeleteClick }) => {
  //console.log("A", ambassador);
  console.log(ambassador)
  return (
    <tr>
      <td>{ambassador && ambassador.index + 1}</td>
      <td>{ambassador.user && ambassador.user.name}</td>
      <td>{ambassador.user && ambassador.user.phoneNumber}</td>
      <td>{ambassador.user && ambassador.user.email}</td>
      <td>{ambassador.user && ambassador.user.collegeName}</td>
      <td>
        {ambassador.user &&
          (ambassador.user.uniqueID ||
            getUniqueId(ambassador.user.phoneNumber))}{" "}
      </td>
      <td>{ambassador && ambassador.profit}</td>
      <td>{ambassador && ambassador.referral}</td>

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
