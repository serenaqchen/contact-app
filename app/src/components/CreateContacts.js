import React from "react";

//Renders a form for the user to add a new contact
function CreateContacts({ addContact }) {
  //creating initial state of the form
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    notes: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "editFirst_name":
        return { ...state, first_name: action.payload };
      case "editLast_name":
        return { ...state, last_name: action.payload };
      case "editEmail":
        return { ...state, email: action.payload };
      case "editPhone":
        return { ...state, phone: action.payload };
      case "editNotes":
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

  const handleAddContact = (e) => {
    e.preventDefault();
    addContact(state);
    dispatch({ type: "reset" });
  };

  return (
    <div>
      <h1>Add Contact</h1>
      <form onSubmit={handleAddContact}>
        <label htmlFor="first_name">First Name: </label>
        <input
          id="first_name"
          value={state.first_name}
          onChange={(e) =>
            dispatch({
              type: "editFirst_name",
              payload: e.target.value,
            })
          }
        />
        <br />
        <br />
        <label htmlFor="last_name">Last Name: </label>
        <input
          id="last_name"
          value={state.last_name}
          onChange={(e) =>
            dispatch({
              type: "editLast_name",
              payload: e.target.value,
            })
          }
        />
        <br />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          value={state.email}
          onChange={(e) =>
            dispatch({
              type: "editEmail",
              payload: e.target.value,
            })
          }
        />
        <br />
        <br />
        <label htmlFor="phone">Phone: </label>
        <input
          id="phone"
          value={state.phone}
          onChange={(e) =>
            dispatch({
              type: "editPhone",
              payload: e.target.value,
            })
          }
        />
        <br />
        <br />
        <label htmlFor="notes">Notes: </label>
        <input
          type="text"
          id="notes"
          value={state.notes}
          onChange={(e) =>
            dispatch({
              type: "editNotes",
              payload: e.target.value,
            })
          }
        />
        <br />
        <br />
        <button>Add Contacts</button>
      </form>
    </div>
  );
}

export default CreateContacts;
