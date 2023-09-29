import React from "react";

const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) => {
  ////console.log(user);
  return (
    <tr>
      <td>{user.index + 1}</td>
      <td>{user.users[0].name}</td>
      <td>{user.users[0].collegeName}</td>
      <td>{user.users[0].email}</td>
      <td>{user.users[0].phoneNumber}</td>
      <td>{user.mode ? "Cash" : "Online"}</td>
      <td></td>
    </tr>
  );
};

export default ReadOnlyRow;
