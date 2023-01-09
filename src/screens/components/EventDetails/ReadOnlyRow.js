import React from "react";

const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{user.index}</td>
      <td>{user.email}</td>
      <td>{user.type}</td>
      <td>{user.events}</td>
      <td>{user.passes}</td>
      <td></td>
    </tr>
  );
};

export default ReadOnlyRow;
