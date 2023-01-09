import { useState, Fragment } from "react";

import ReadOnlyRow from "./ReadOnlyRow";

import Dashboard_Header from "../../../../components/Dashboard_Header";

const Ambassador = (props) => {
  const [tabActive, setTab] = useState("");
  const { ambassadors } = props;
  // const [addFormData, setAddFormData] = useState({
  //   fullName: "",
  //   address: "",
  //   phoneNumber: "",
  //   email: "",
  // });

  // const [editFormData, setEditFormData] = useState({
  //   fullName: "",
  //   address: "",
  //   phoneNumber: "",
  //   email: "",
  // });

  // const [editContactId, setEditContactId] = useState(null);

  // const handleAddFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...addFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setAddFormData(newFormData);
  // };

  // const handleEditFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...editFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setEditFormData(newFormData);
  // };

  // const handleAddFormSubmit = (event) => {
  //   event.preventDefault();

  //   const newContact = {
  //     id: nanoid(),
  //     fullName: addFormData.fullName,
  //     address: addFormData.address,
  //     phoneNumber: addFormData.phoneNumber,
  //     email: addFormData.email,
  //   };

  //   const newContacts = [...contacts, newContact];
  //   setContacts(newContacts);
  // };

  // const handleEditFormSubmit = (event) => {
  //   event.preventDefault();

  //   const editedContact = {
  //     id: editContactId,
  //     fullName: editFormData.fullName,
  //     address: editFormData.address,
  //     phoneNumber: editFormData.phoneNumber,
  //     email: editFormData.email,
  //   };

  //   const newContacts = [...contacts];

  //   const index = contacts.findIndex((contact) => contact.id === editContactId);

  //   newContacts[index] = editedContact;

  //   setContacts(newContacts);
  //   setEditContactId(null);
  // };

  // const handleEditClick = (event, contact) => {
  //   event.preventDefault();
  //   setEditContactId(contact.id);

  //   const formValues = {
  //     fullName: contact.fullName,
  //     address: contact.address,
  //     phoneNumber: contact.phoneNumber,
  //     email: contact.email,
  //   };

  //   setEditFormData(formValues);
  // };

  // const handleCancelClick = () => {
  //   setEditContactId(null);
  // };

  // const handleDeleteClick = (contactId) => {
  //   const newContacts = [...contacts];

  //   const index = contacts.findIndex((contact) => contact.id === contactId);

  //   newContacts.splice(index, 1);

  //   setContacts(newContacts);
  // };

  return (
    <div>
      <div className="app-container">
        <Dashboard_Header
          settab={setTab}
          tabactive={tabActive}
          title={"Ambassadors"}
          tabs={[]}
          excel={true}
          certify={true}
        />
        <form onSubmit={() => {}} className="resp-m-l-r">
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>College</th>
                <th>Name</th>
                <th>Email</th>
                <th>Profit</th>
              </tr>
            </thead>

            <tbody>
              {ambassadors.map((ambassador, i) => (
                <Fragment>
                  {/* {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : ( */}
                  <ReadOnlyRow ambassador={{ ...ambassador, index: i }} />
                  {/* )} */}
                </Fragment>
              ))}
            </tbody>
          </table>
          {ambassadors.length != 0 ? (
            <></>
          ) : (
            <div
              style={{
                padding: "2px",
                boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
                borderRadius: "4px",
                margin: "5px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {" "}
              No Ambassadors Found
            </div>
          )}
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

export default Ambassador;
