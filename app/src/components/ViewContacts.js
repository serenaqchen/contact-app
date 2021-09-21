import React from "react";

//Renders the info of ONE individual contact
function ViewContacts({
  moreInfo,
  setViewDetails,
  updateContact,
  deleteContact,
  setMoreInfo,
}) {
  const [editable, setEditable] = React.useState(false);

  let initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    notes: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "updateFirst_name":
        return { ...state, first_name: action.payload };
      case "updateLast_name":
        return { ...state, last_name: action.payload };
      case "updateEmail":
        return { ...state, email: action.payload };
      case "updatePhone":
        return { ...state, phone: action.payload };
      case "updateNotes":
        return { ...state, notes: action.payload };
      case "reset":
        return {
          ...state,
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          notes: "",
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleCancelUpdate = (e) => {
    e.preventDefault();
    setViewDetails(true);
    setEditable(false);
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    for (let key in state) {
      if (state[key] === "") {
        state[key] = moreInfo[key];
      }
    }
    setMoreInfo({ ...state, contact_id: moreInfo.contact_id });
    updateContact(moreInfo.contact_id, state);
    dispatch({ type: "reset" });
    setEditable(false);
  };

  const handleDeleteeContact = (e) => {
    e.preventDefault();
    deleteContact(moreInfo.contact_id);
    dispatch({ type: "reset" });
    setMoreInfo(state)
    setEditable(false);
  };

  const updateForm = (
    <div>
      <h2>Edit Contact</h2>
      <form>
        <label htmlFor="updateFirst_name">First Name: </label>
        <input
          id="updateFirst_name"
          type="text"
          value={state.first_name || moreInfo.first_name}
          onChange={(e) =>
            dispatch({
              type: "updateFirst_name",
              payload: e.target.value,
            })
          }
        ></input>
        <label htmlFor="updateLast_name">Last Name: </label>
        <input
          id="updateLast_name"
          type="text"
          value={state.last_name || moreInfo.last_name}
          onChange={(e) =>
            dispatch({
              type: "updateLast_name",
              payload: e.target.value,
            })
          }
        ></input>
        <label htmlFor="updatePhone">Phone: </label>
        <input
          id="updatePhone"
          type="text"
          value={state.phone || moreInfo.phone}
          onChange={(e) =>
            dispatch({
              type: "updatePhone",
              payload: e.target.value,
            })
          }
        ></input>
        <label htmlFor="updateEmail">Email: </label>
        <input
          id="updateEmail"
          type="text"
          value={state.email || moreInfo.email}
          onChange={(e) =>
            dispatch({
              type: "updateEmail",
              payload: e.target.value,
            })
          }
        ></input>
        <label htmlFor="updateNotes">Notes: </label>
        <input
          type="text"
          id="updateNotes"
          value={state.notes || moreInfo.notes}
          onChange={(e) =>
            dispatch({
              type: "updateNotes",
              payload: e.target.value,
            })
          }
        />
        <button onClick={handleUpdateContact}>Update</button>
        <button onClick={handleCancelUpdate}>Cancel</button>
      </form>
    </div>
  );

  const displayMoreInfo = (
    <div>
      <h2>Contact Info</h2>
      <p>
        Name: {moreInfo.first_name} {moreInfo.last_name}
      </p>
      <p>Phone: {moreInfo.phone}</p>
      <p>Email: {moreInfo.email}</p>
      <p>Notes: {moreInfo.notes}</p>
      <br />
      <button onClick={(e) => setEditable(true)}>Edit</button>
      <button onClick={handleDeleteeContact}>Delete</button>
      <button onClick={(e) => setViewDetails(false)}>Close</button>
    </div>
  );
  return <div>{editable ? updateForm : displayMoreInfo}</div>;
}

export default ViewContacts;
